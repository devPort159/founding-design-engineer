'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info, RotateCw, CheckCircle } from "lucide-react"
import { PlacesAutocomplete } from '../components/GooglePlaces/PlacesAutocomplete'
import { LocationMap } from './LocationMap'
import Image from 'next/image'

export default function ActivationDashboard() {
    // Timeout for easier updating
    const TIMEOUT = 5000;
    const TIMEOUT_SECONDS = 5;

    // Passcode validation states
    const [passcode, setPasscode] = useState('')
    const [isValidated, setIsValidated] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // Location tracking states
    const [locationTrackingStarted, setLocationTrackingStarted] = useState(false)
    const [timerRunning, setTimerRunning] = useState(false)
    const [timeRemaining, setTimeRemaining] = useState(TIMEOUT_SECONDS)
    const [timerProgress, setTimerProgress] = useState(0)
    const [locationFound, setLocationFound] = useState(false)
    const [location, setLocation] = useState<{latitude: number, longitude: number} | null>(null)
    const [accuracy, setAccuracy] = useState<number>(50) // Default accuracy in meters
    const [bestAccuracy, setBestAccuracy] = useState<number>(Infinity)
    const [bestLocation, setBestLocation] = useState<{latitude: number, longitude: number} | null>(null)
    
    const [readingsCount, setReadingsCount] = useState<number>(0)
    const [showAddressInput, setShowAddressInput] = useState(false)
    const [address, setAddress] = useState('')
    const [shouldConfirmLocation, setShouldConfirmLocation] = useState(false)

    const [sessionStarted, setSessionStarted] = useState(false)
    
    	// Add state for location permission
	const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt' | 'unknown'>('unknown')

	
	// Check initial location permission on mount
	useEffect(() => {
		checkLocationPermission()
	}, [])
    
    // Function to check location permission
    const checkLocationPermission = async () => {
        if (!('permissions' in navigator)) {
            // Can't check permissions, assume prompt
            setLocationPermission('prompt')
            return
        }
        
        try {
            const result = await navigator.permissions.query({ name: 'geolocation' as PermissionName })
            setLocationPermission(result.state as 'granted' | 'denied' | 'prompt')
            
            // Listen for permission changes
            result.addEventListener('change', () => {
                setLocationPermission(result.state as 'granted' | 'denied' | 'prompt')
            })
        } catch (err) {
            console.error('Error checking location permission:', err)
            setLocationPermission('prompt') // Default to prompt if error
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        setIsValidated(true);
    }

    const startLocationTracking = () => {
        // First check permissions
        if (locationPermission === 'granted') {
            // Permission already granted, start tracking
            initiateLocationTracking()
        } else if (locationPermission === 'prompt') {
            // Permission not decided yet, request it
            requestLocationPermission()
        		} else {
			// Permission denied, show notification
			setLocationTrackingStarted(true)
		}
    }
    
    // Function to request location permission explicitly
    const requestLocationPermission = () => {
        console.log('Requesting location permission');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('Location permission granted');
                // Permission granted
                setLocationPermission('granted')
                initiateLocationTracking()
            },
            			(err) => {
				console.log('Error requesting location permission', err);
				// Permission denied or error
				setLocationPermission('denied')
				setLocationTrackingStarted(true)
			},
            { timeout: TIMEOUT, enableHighAccuracy: true }
        )
    }
    
    // Actual function to start tracking once permission is granted
    const initiateLocationTracking = () => {
        setLocationTrackingStarted(true)
        setTimerRunning(true)
        setTimeRemaining(TIMEOUT_SECONDS)
        setTimerProgress(0)
        setLocationFound(false)
        setBestAccuracy(Infinity)
        setReadingsCount(0)
        setShowAddressInput(false)
        setBestLocation(null)
        setShouldConfirmLocation(false)
    }
    
    // Function to skip to manual address entry
    const useManualAddressEntry = () => {
        setLocationTrackingStarted(true)
        setTimerRunning(false)
        setShowAddressInput(true)
    }

    // Function to handle geolocation errors
    const handleGeolocationError = (error: GeolocationPositionError) => {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                // Check if it's the secure origin error
                if (error.message.includes('secure origins') || error.message.includes('Only secure origins are allowed')) {
                    return "Location requires HTTPS. For this demo, please enter your address manually.";
                }
                return "Location access denied. Please enable location services in your settings.";
            case error.POSITION_UNAVAILABLE:
                return "Location information is unavailable. Please try again in an open area.";
            case error.TIMEOUT:
                return "Location request timed out. Please try again.";
            default:
                return "An unknown error occurred getting your location.";
        }
    };

    // Handle address selection from autocomplete
    const handleAddressSelect = (selectedAddress: string, lat: number, lng: number) => {
        setAddress(selectedAddress);
        setLocation({ latitude: lat, longitude: lng });
        setBestLocation({ latitude: lat, longitude: lng });
        setLocationFound(true);
        setShouldConfirmLocation(true);
    };

    // Handle pin drag on map
    const handleLocationChange = (lat: number, lng: number) => {
        if (bestLocation) {
            setBestLocation({
                latitude: lat,
                longitude: lng
            });
        }
    };

    	// Confirm location and proceed
	const confirmLocation = () => {
		// Here you would call your API to save the location
		console.log('Location confirmed:', bestLocation);
		if (bestLocation) {
			setSessionStarted(true)
		}
	};

    // Timer effect
    useEffect(() => {
        if (timerRunning && timeRemaining > 0) {
            const interval = setInterval(() => {
                setTimeRemaining(prev => prev - 1);
                setTimerProgress(prev => prev + (100 / TIMEOUT_SECONDS));
            }, 1000);
            
            return () => clearInterval(interval);
        } else if (timerRunning && timeRemaining === 0) {
            setTimerRunning(false);
            
            // Check if we found a good location
            if (bestLocation) {
                setShouldConfirmLocation(true);
            } else {
                // No location found, show address input
                setShowAddressInput(true);
            }
        }
    }, [timerRunning, timeRemaining, bestLocation]);

    // Geolocation effect
    useEffect(() => {
        if (!locationTrackingStarted) return;
        
        // DEMO MODE: Use hardcoded location near San Francisco charging stations
        // This avoids HTTPS geolocation issues for demo purposes
        const demoLocation = {
            latitude: 37.7695, // A few blocks from the charging stations
            longitude: -122.4050, // A few blocks from the charging stations
        };
        
        // Simulate finding location after a short delay
        const simulationTimer = setTimeout(() => {
            if (timeRemaining > 0) {
                setLocation(demoLocation);
                setBestLocation(demoLocation);
                setLocationFound(true);
                setAccuracy(25); // Good accuracy for demo
                setBestAccuracy(25);
                setReadingsCount(1);
                
                console.log('Demo location set:', demoLocation);
                
                // Stop the timer and show confirmation
                setTimeout(() => {
                    setTimerRunning(false);
                    setShouldConfirmLocation(true);
                }, 1000); // Let it show "found" for 1 second
            }
        }, 2000); // Show "searching" for 2 seconds
        
        // Cleanup function for demo mode
        return () => {
            clearTimeout(simulationTimer);
        };
    }, [locationTrackingStarted, timeRemaining]);

    // Different views based on state
    const renderPasscodeForm = () => (
        <Card className="w-full max-w-md mx-auto shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl md:text-3xl text-center">
                    Enter Activation Code
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        placeholder="Enter passcode"
                        className="w-full"
                        autoFocus
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
    );

    const renderStartSession = () => (
        <div className="w-full max-w-md mx-auto text-center flex flex-col items-center">
            <Button 
                onClick={startLocationTracking} 
                className="w-full max-w-xs h-16 text-xl"
                size="lg"
            >
                Start Session
            </Button>
        </div>
    );

    	const renderAddressInput = () => (
		<div className="space-y-4">
			<h3 className="text-lg font-medium">Enter Your Address</h3>
			<PlacesAutocomplete 
				value={address}
				onChange={setAddress}
				onSelectAddress={handleAddressSelect}
			/>
            
            {location && (
                <div className="mt-4">
                    <LocationMap 
                        latitude={location.latitude} 
                        longitude={location.longitude} 
                        accuracy={50}
                        draggable={true}
                        onLocationChange={handleLocationChange}
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                        You can drag the pin to adjust your exact location
                    </p>
                    <Button 
                        onClick={confirmLocation}
                        className="w-full mt-4"
                    >
                        Start Session
                    </Button>
                </div>
            )}
        </div>
    )

    // Update the renderLocationTracking function to prevent showing two maps
    const renderLocationTracking = () => (
        <Card className="w-full h-full max-w-lg mx-auto shadow-lg flex flex-col">
            <CardHeader>
                
                <CardTitle className="text-xl md:text-2xl">
                    Start Your Charging Session
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow">                
                {timerRunning && <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                            {timerRunning ? 'Finding your location...' : 'Location tracking complete'}
                        </span>
                        {timerRunning && (
                            <span className="text-sm font-medium">{timeRemaining}s</span>
                        )}
                    </div>
                    <Progress 
                        value={timerProgress} 
                        className="h-2"
                    />
                </div>}

                {locationFound && (
                    <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-600">
                            Location signal found (Accuracy: {accuracy?.toFixed(1)}m)
                        </span>
                    </div>
                )}

                {/* Show map from GPS only if not showing address input */}
                {!timerRunning && locationFound && bestLocation && !showAddressInput && (
                    <div className="space-y-4 h-full flex flex-col">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Your Location</h3>
                            <span className="text-sm text-muted-foreground">
                                {bestAccuracy !== Infinity ? `${bestAccuracy.toFixed(1)}m accuracy` : ''}
                            </span>
                        </div>
                        
                        <div className="flex-grow">
                            <LocationMap 
                                latitude={bestLocation.latitude} 
                                longitude={bestLocation.longitude} 
                                accuracy={bestAccuracy !== Infinity ? bestAccuracy : 50}
                                draggable={shouldConfirmLocation}
                                onLocationChange={handleLocationChange}
                            />
                        </div>
                        
                        {shouldConfirmLocation && (
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    You can drag the pin to adjust your exact location
                                </p>
                                <Button 
                                    disabled={sessionStarted}
                                    onClick={confirmLocation}
                                    className="w-full"
                                >
                                    Start Session
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {showAddressInput && renderAddressInput()}
            </CardContent>
            {timerRunning && (
                <CardFooter className="text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                        <RotateCw className="h-4 w-4 animate-spin" />
                        <span>Getting the most accurate location possible...</span>
                    </div>
                </CardFooter>
            )}
        </Card>
    );

    // Add a component for permission request
    const renderPermissionRequest = () => (
        <Card className="w-full max-w-md mx-auto shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl md:text-2xl text-center">
                    Location Access Required
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Alert variant="default" className="bg-amber-50 border-amber-200">
                    <Info className="h-4 w-4 text-amber-500" />
                    <AlertTitle>Permission Required</AlertTitle>
                    <AlertDescription>
                        To start your session, we need access to your location. This helps us provide you with the most accurate service.
                    </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-1 gap-4 pt-2">
                    <Button 
                        onClick={requestLocationPermission}
                        className="w-full"
                    >
                        Give Location Access
                    </Button>
                    <Button 
                        onClick={useManualAddressEntry}
                        variant="outline"
                        className="w-full"
                    >
                        Enter Address Manually
                    </Button>
                </div>
            </CardContent>
        </Card>
    )

    // Main render logic
    return (
        <div className="w-full min-h-screen h-full flex flex-col items-center justify-start p-4 bg-background">
            <Image className="mb-4" src="/CuroLogoWithName.svg" alt="Curo Logo" width={120} height={120} />
            <div className="w-full h-full flex flex-grow items-center justify-center">
                {!isValidated ? (
                    renderPasscodeForm()
                ) : !locationTrackingStarted ? (
                    renderStartSession()
                ) : locationPermission === 'denied' && !showAddressInput ? (
                    renderPermissionRequest()
                ) : (
                    renderLocationTracking()
                )}
            </div>
        </div>

    )
}