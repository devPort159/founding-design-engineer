'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
    const [passcode, setPasscode] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        // Demo mode - accept any passcode
        setTimeout(() => {
            router.push(`/discover`)
            setIsLoading(false)
        }, 1000) // Add a small delay to simulate validation
    }
    
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-start p-4 bg-background">
            <noscript>
                <div className="w-full max-w-md mx-auto mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    <h2 className="font-bold mb-2">JavaScript Required</h2>
                    <p>This application requires JavaScript to function properly. Please enable JavaScript in your Safari settings:</p>
                    <ol className="mt-2 ml-4 list-decimal">
                        <li>Open Settings app</li>
                        <li>Scroll down and tap Safari</li>
                        <li>Tap Advanced</li>
                        <li>Enable JavaScript</li>
                    </ol>
                </div>
            </noscript>
            <Image className="mb-4" src="/CuroLogoWithName.svg" alt="Curo Logo" width={120} height={120} />
            <div className="flex flex-grow items-center justify-center">
                <Card className="w-full max-w-md mx-auto shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl md:text-3xl text-center">
                            Enter Activation Code
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                inputMode="numeric"
                                //pattern="[0-9]*"
                                value={passcode}
                                onChange={(e) => setPasscode(e.target.value)}
                                placeholder="Enter passcode"
                                className="w-full text-base flex h-10 rounded-md border border-slate-200 bg-white px-3 py-2 ring-offset-white placeholder:text-Gray disabled:cursor-not-allowed disabled:opacity-50"
                                style={{ fontSize: '16px' }}
                            />
                            {error && <p className="text-destructive text-sm">{error}</p>}
                            <Button 
                                type="submit" 
                                className="w-full h-12 text-base"
                                disabled={isLoading || !passcode.trim()}
                            >
                                {isLoading ? 'Validating...' : 'Submit'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}