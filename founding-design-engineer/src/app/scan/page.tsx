'use client'

import { useRouter } from 'next/navigation'
import BarcodeScanner from 'react-qr-barcode-scanner'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function ScanPage() {
	const router = useRouter()
	const [scanError, setScanError] = useState<string | null>(null)
	const [debugLogs, setDebugLogs] = useState<string[]>([])
	const scannerRef = useRef<any>(null)
	
	const addLog = (message: string) => {
		console.log('[QR Scanner]', message)
		setDebugLogs(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`])
	}

	// Test camera access directly to get better error info
	useEffect(() => {
		addLog('Testing direct camera access...')
		
		const testCamera = async () => {
			try {
				// Test basic camera access
				const stream = await navigator.mediaDevices.getUserMedia({ 
					video: { facingMode: { ideal: 'environment' } } 
				})
				addLog('✓ Camera access granted')
				
				// Check available devices
				const devices = await navigator.mediaDevices.enumerateDevices()
				const videoDevices = devices.filter(d => d.kind === 'videoinput')
				addLog(`Found ${videoDevices.length} camera(s)`)
				
				// Stop the test stream
				stream.getTracks().forEach(track => track.stop())
			} catch (error: any) {
				addLog(`✗ Direct camera test failed: ${error.name}: ${error.message}`)
				
				// Try with less strict constraints
				try {
					const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true })
					addLog('✓ Fallback camera access (any camera) worked')
					fallbackStream.getTracks().forEach(track => track.stop())
				} catch (fallbackError: any) {
					addLog(`✗ Even fallback failed: ${fallbackError.name}: ${fallbackError.message}`)
				}
			}
		}
		
		testCamera()
	}, [])

	const handleUpdate = (error: any, result: any) => {
		if (result) {
			const raw = result.text.trim()
			addLog(`QR detected: ${raw.substring(0, 50)}...`)
			// Only accept URLs that start with the expected PowerFlex pattern
			const prefix = 'https://powerflex.io/home/scan/'
			if (raw.startsWith(prefix)) {
				const evseUid = raw.split('/').pop() ?? ''
				if (evseUid) {
					addLog(`PowerFlex EVSE UID extracted: ${evseUid}`)
					router.push(`/activate/discover?evse=${encodeURIComponent(evseUid)}`)
					return
				}
			}
			// If the QR is not the expected format, show an error once
			setScanError('Unsupported QR-code – please scan a PowerFlex charger code.')
			addLog('QR code rejected: not PowerFlex format')
		} else if (error && !scanError) {
			// Camera or decoding errors
			const errorMsg = `${error.name || 'UnknownError'}: ${error.message || 'Camera error'}`
			addLog(`Error: ${errorMsg}`)
			setScanError(errorMsg)
		}
	}

	const handleError = (error: any) => {
		const errorMsg = `Camera Error - ${error.name || 'UnknownError'}: ${error.message || 'Unknown camera error'}`
		addLog(errorMsg)
		setScanError(errorMsg)
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen w-screen gap-4 bg-black text-white">
			<div className="w-full max-w-sm aspect-square overflow-hidden rounded-lg">
				<BarcodeScanner
					width={400}
					height={400}
					facingMode="environment"
					onUpdate={handleUpdate}
					onError={handleError}
				/>
			</div>
			{scanError && <p className="text-red-500 text-center text-sm px-4">{scanError}</p>}
			
			{/* Debug logs - visible on screen */}
			<div className="w-full max-w-sm bg-gray-900 rounded p-2 text-xs">
				<div className="text-gray-400 mb-1">Debug Log:</div>
				{debugLogs.length === 0 ? (
					<div className="text-gray-500">Initializing camera...</div>
				) : (
					debugLogs.map((log, i) => (
						<div key={i} className="text-green-400 font-mono text-xs">{log}</div>
					))
				)}
			</div>
			
			<Button variant="outline" onClick={() => router.back()}>
				Cancel
			</Button>
		</div>
	)
} 