'use client';

import { ChargersMap } from "./ChargersMap";
import { useEffect, useState, Suspense } from "react";
import { Libraries, LoadScript } from "@react-google-maps/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Clock } from "lucide-react";
import SessionList from "../history/SessionList";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const libraries: Libraries = ['drawing', 'places'];

const exampleJson = {
    "id": "497c8686-dd40-44d3-93a3-8b95942adb56",
    "city": "San Francisco",
    "evse": [
        {
            "uid": "0158a4fd-6370-453a-b570-57b77d58c668",
            "images": [],
            "status": "UNKNOWN",
            "evse_id": "2IMV-02",
            "connectors": [
                {
                    "id": "b26619eb-b532-4cb6-a12c-9d795a15e527",
                    "format": "CABLE",
                    "voltage": 90,
                    "amperage": 80,
                    "standard": "IEC_62196_T1",
                    "tariff_id": "c49ae855-a2bb-44ba-a5bf-6eaa5eeaf02b",
                    "power_type": "AC_3_PHASE",
                    "tariff_ids": null,
                    "max_voltage": null,
                    "last_updated": "2025-05-07T15:34:47+00:00",
                    "max_amperage": null,
                    "max_electric_power": null,
                    "terms_and_conditions": null
                }
            ],
            "directions": [],
            "coordinates": {
                "latitude": "37.76831436157227",
                "longitude": "-122.4018020629883"
            },
            "floor_level": null,
            "capabilities": [
                "REMOTE_START_STOP_CAPABLE"
            ],
            "last_updated": "2025-05-07T15:34:47+00:00",
            "status_schedule": [],
            "physical_reference": "2IMV-02 Design D",
            "parking_restrictions": []
        },
        {
            "uid": "1f703127-3c48-4a94-a74a-70c851b0e411",
            "images": [],
            "status": "UNKNOWN",
            "evse_id": "2IMV-05",
            "connectors": [
                {
                    "id": "a7854284-e2e6-42b1-a663-b4561be5dda0",
                    "format": "CABLE",
                    "voltage": 90,
                    "amperage": 80,
                    "standard": "IEC_62196_T1",
                    "tariff_id": "c49ae855-a2bb-44ba-a5bf-6eaa5eeaf02b",
                    "power_type": "AC_3_PHASE",
                    "tariff_ids": null,
                    "max_voltage": null,
                    "last_updated": "2025-05-07T15:34:47+00:00",
                    "max_amperage": null,
                    "max_electric_power": null,
                    "terms_and_conditions": null
                }
            ],
            "directions": [],
            "coordinates": {
                "latitude": "37.76824951171875",
                "longitude": "-122.4017639160156"
            },
            "floor_level": null,
            "capabilities": [
                "REMOTE_START_STOP_CAPABLE"
            ],
            "last_updated": "2025-05-07T15:34:47+00:00",
            "status_schedule": [],
            "physical_reference": "2IMV-05 Design D",
            "parking_restrictions": []
        },
        {
            "uid": "5511b57c-4e16-46cb-bd95-d6c1f147e54a",
            "images": [],
            "status": "AVAILABLE",
            "evse_id": "2IMV-06",
            "connectors": [
                {
                    "id": "f0911e9d-1b3b-436d-96db-84e3b1181f2b",
                    "format": "CABLE",
                    "voltage": 90,
                    "amperage": 80,
                    "standard": "IEC_62196_T1",
                    "tariff_id": "c49ae855-a2bb-44ba-a5bf-6eaa5eeaf02b",
                    "power_type": "AC_3_PHASE",
                    "tariff_ids": null,
                    "max_voltage": null,
                    "last_updated": "2025-05-07T15:34:47+00:00",
                    "max_amperage": null,
                    "max_electric_power": null,
                    "terms_and_conditions": null
                }
            ],
            "directions": [],
            "coordinates": {
                "latitude": "37.76824951171875",
                "longitude": "-122.401741027832"
            },
            "floor_level": null,
            "capabilities": [
                "REMOTE_START_STOP_CAPABLE"
            ],
            "last_updated": "2025-05-07T15:34:47+00:00",
            "status_schedule": [],
            "physical_reference": "2IMV-06 Design D",
            "parking_restrictions": []
        },
        {
            "uid": "565d0b35-aaa3-4f1e-ace7-c9ea14c6985c",
            "images": [],
            "status": "UNKNOWN",
            "evse_id": "2IMV-05*2",
            "connectors": [
                {
                    "id": "3cae46d1-4255-411a-9f39-7c78dcb6b4ec",
                    "format": "CABLE",
                    "voltage": 90,
                    "amperage": 80,
                    "standard": "IEC_62196_T1",
                    "tariff_id": "c49ae855-a2bb-44ba-a5bf-6eaa5eeaf02b",
                    "power_type": "AC_3_PHASE",
                    "tariff_ids": null,
                    "max_voltage": null,
                    "last_updated": "2025-05-07T15:34:47+00:00",
                    "max_amperage": null,
                    "max_electric_power": null,
                    "terms_and_conditions": null
                }
            ],
            "directions": [],
            "coordinates": {
                "latitude": "37.76824951171875",
                "longitude": "-122.401741027832"
            },
            "floor_level": null,
            "capabilities": [
                "REMOTE_START_STOP_CAPABLE"
            ],
            "last_updated": "2025-05-07T15:34:47+00:00",
            "status_schedule": [],
            "physical_reference": "2IMV-05-2 Design",
            "parking_restrictions": []
        },
        {
            "uid": "5b8d6700-763c-4ab7-b774-3f847ae82c9b",
            "images": [],
            "status": "UNKNOWN",
            "evse_id": "2IMV-17",
            "connectors": [
                {
                    "id": "22f639db-e6eb-454a-ae83-6260e7ee347d",
                    "format": "CABLE",
                    "voltage": 500,
                    "amperage": 100,
                    "standard": "IEC_62196_T1_COMBO",
                    "tariff_id": "32ac7298-daae-4a6c-bc35-3d3601fee8c0",
                    "power_type": "DC",
                    "tariff_ids": null,
                    "max_voltage": null,
                    "last_updated": "2025-05-07T15:34:47+00:00",
                    "max_amperage": null,
                    "max_electric_power": null,
                    "terms_and_conditions": null
                }
            ],
            "directions": [],
            "coordinates": {
                "latitude": "37.76823425292969",
                "longitude": "-122.4017868041992"
            },
            "floor_level": null,
            "capabilities": [
                "REMOTE_START_STOP_CAPABLE"
            ],
            "last_updated": "2025-05-07T15:34:47+00:00",
            "status_schedule": [],
            "physical_reference": "2IMV-17 Design D",
            "parking_restrictions": []
        },
        {
            "uid": "5caf5b1c-8536-4e03-a510-3c693cbc5e64",
            "images": [],
            "status": "UNKNOWN",
            "evse_id": "2IMV-16",
            "connectors": [
                {
                    "id": "f8244533-46ef-40f6-abbd-a121e0a3bf21",
                    "format": "CABLE",
                    "voltage": 120,
                    "amperage": 80,
                    "standard": "IEC_62196_T1",
                    "tariff_id": "c49ae855-a2bb-44ba-a5bf-6eaa5eeaf02b",
                    "power_type": "AC_3_PHASE",
                    "tariff_ids": null,
                    "max_voltage": null,
                    "last_updated": "2025-05-07T15:34:47+00:00",
                    "max_amperage": null,
                    "max_electric_power": null,
                    "terms_and_conditions": null
                }
            ],
            "directions": [],
            "coordinates": {
                "latitude": "37.76824951171875",
                "longitude": "-122.4016723632812"
            },
            "floor_level": null,
            "capabilities": [
                "REMOTE_START_STOP_CAPABLE"
            ],
            "last_updated": "2025-05-07T15:34:47+00:00",
            "status_schedule": [],
            "physical_reference": "2IMV-16 Design D",
            "parking_restrictions": []
        },
        {
            "uid": "66142c7e-320d-46fc-9a31-8ad8a48ea58c",
            "images": [],
            "status": "CHARGING",
            "evse_id": "2IMV-01",
            "connectors": [
                {
                    "id": "3d3ce865-3202-4ac3-a85f-024874788995",
                    "format": "CABLE",
                    "voltage": 120,
                    "amperage": 80,
                    "standard": "IEC_62196_T1",
                    "tariff_id": null,
                    "power_type": "AC_3_PHASE",
                    "tariff_ids": null,
                    "max_voltage": null,
                    "last_updated": "2025-05-07T15:34:47+00:00",
                    "max_amperage": null,
                    "max_electric_power": null,
                    "terms_and_conditions": null
                }
            ],
            "directions": [],
            "coordinates": {
                "latitude": "37.76824951171875",
                "longitude": "-122.40180969238281"
            },
            "floor_level": null,
            "capabilities": [
                "REMOTE_START_STOP_CAPABLE"
            ],
            "last_updated": "2025-05-07T15:34:47+00:00",
            "status_schedule": [],
            "physical_reference": "2IMV-01 Design D",
            "parking_restrictions": []
        },
        {
            "uid": "84b58d65-ea1e-4b29-bb20-a6aba47f1737",
            "images": [],
            "status": "UNKNOWN",
            "evse_id": "2IMV-06*2",
            "connectors": [
                {
                    "id": "b2fed824-7e61-45f6-9a86-12244d8111ba",
                    "format": "CABLE",
                    "voltage": 90,
                    "amperage": 80,
                    "standard": "IEC_62196_T1",
                    "tariff_id": "c49ae855-a2bb-44ba-a5bf-6eaa5eeaf02b",
                    "power_type": "AC_3_PHASE",
                    "tariff_ids": null,
                    "max_voltage": null,
                    "last_updated": "2025-05-07T15:34:47+00:00",
                    "max_amperage": null,
                    "max_electric_power": null,
                    "terms_and_conditions": null
                }
            ],
            "directions": [],
            "coordinates": {
                "latitude": "37.76824951171875",
                "longitude": "-122.4016952514648"
            },
            "floor_level": null,
            "capabilities": [
                "REMOTE_START_STOP_CAPABLE"
            ],
            "last_updated": "2025-05-07T15:34:47+00:00",
            "status_schedule": [],
            "physical_reference": "2IMV-06-2 Design",
            "parking_restrictions": []
        },
        {
            "uid": "acbdb563-b20c-4c3e-ab26-dcf5ca501339",
            "images": [],
            "status": "CHARGING",
            "evse_id": "2IMV-03",
            "connectors": [
                {
                    "id": "10cce5b7-fe9d-4d22-bcd9-0ddf765bbcdd",
                    "format": "CABLE",
                    "voltage": 120,
                    "amperage": 80,
                    "standard": "IEC_62196_T1",
                    "tariff_id": "c49ae855-a2bb-44ba-a5bf-6eaa5eeaf02b",
                    "power_type": "AC_3_PHASE",
                    "tariff_ids": null,
                    "max_voltage": null,
                    "last_updated": "2025-05-07T15:34:47+00:00",
                    "max_amperage": null,
                    "max_electric_power": null,
                    "terms_and_conditions": null
                }
            ],
            "directions": [],
            "coordinates": {
                "latitude": "37.76824951171875",
                "longitude": "-122.4017868041992"
            },
            "floor_level": null,
            "capabilities": [
                "REMOTE_START_STOP_CAPABLE"
            ],
            "last_updated": "2025-05-07T15:34:47+00:00",
            "status_schedule": [],
            "physical_reference": "2IMV-03 Design D",
            "parking_restrictions": []
        },
        {
            "uid": "b9359703-d1cb-4731-9825-bf800f43719e",
            "images": [],
            "status": "AVAILABLE",
            "evse_id": "2IMV-17",
            "connectors": [
                {
                    "id": "9d66c49e-c2da-4b93-b511-b7a038d3e53d",
                    "format": "CABLE",
                    "voltage": 500,
                    "amperage": 100,
                    "standard": "IEC_62196_T1_COMBO",
                    "tariff_id": "32ac7298-daae-4a6c-bc35-3d3601fee8c0",
                    "power_type": "DC",
                    "tariff_ids": null,
                    "max_voltage": null,
                    "last_updated": "2025-05-07T15:34:47+00:00",
                    "max_amperage": null,
                    "max_electric_power": null,
                    "terms_and_conditions": null
                }
            ],
            "directions": [],
            "coordinates": {
                "latitude": "37.76824951171875",
                "longitude": "-122.4016494750977"
            },
            "floor_level": null,
            "capabilities": [
                "REMOTE_START_STOP_CAPABLE"
            ],
            "last_updated": "2025-05-07T15:34:47+00:00",
            "status_schedule": [],
            "physical_reference": "2IMV-17 Design D",
            "parking_restrictions": []
        },
        {
            "uid": "dcf2cd1c-9edf-4864-a9b1-07b8bbb9c5a4",
            "images": [],
            "status": "UNKNOWN",
            "evse_id": "2IMV-06*1",
            "connectors": [
                {
                    "id": "db5a9a86-49e2-4324-94b1-512b98fb2c80",
                    "format": "CABLE",
                    "voltage": 90,
                    "amperage": 80,
                    "standard": "IEC_62196_T1",
                    "tariff_id": "c49ae855-a2bb-44ba-a5bf-6eaa5eeaf02b",
                    "power_type": "AC_3_PHASE",
                    "tariff_ids": null,
                    "max_voltage": null,
                    "last_updated": "2025-05-07T15:34:47+00:00",
                    "max_amperage": null,
                    "max_electric_power": null,
                    "terms_and_conditions": null
                }
            ],
            "directions": [],
            "coordinates": {
                "latitude": "37.76824951171875",
                "longitude": "-122.4017181396484"
            },
            "floor_level": null,
            "capabilities": [
                "REMOTE_START_STOP_CAPABLE"
            ],
            "last_updated": "2025-05-07T15:34:47+00:00",
            "status_schedule": [],
            "physical_reference": "2IMV-06-1 Design",
            "parking_restrictions": []
        },
        {
            "uid": "e99d37f8-989f-4547-9452-5d37b3903565",
            "images": [],
            "status": "UNKNOWN",
            "evse_id": "2IMV-05*1",
            "connectors": [
                {
                    "id": "7ac31799-b91e-40f2-bb43-62613f92a47f",
                    "format": "CABLE",
                    "voltage": 90,
                    "amperage": 80,
                    "standard": "IEC_62196_T1",
                    "tariff_id": "c49ae855-a2bb-44ba-a5bf-6eaa5eeaf02b",
                    "power_type": "AC_3_PHASE",
                    "tariff_ids": null,
                    "max_voltage": null,
                    "last_updated": "2025-05-07T15:34:47+00:00",
                    "max_amperage": null,
                    "max_electric_power": null,
                    "terms_and_conditions": null
                }
            ],
            "directions": [],
            "coordinates": {
                "latitude": "37.76824951171875",
                "longitude": "-122.4017639160156"
            },
            "floor_level": null,
            "capabilities": [
                "REMOTE_START_STOP_CAPABLE"
            ],
            "last_updated": "2025-05-07T15:34:47+00:00",
            "status_schedule": [],
            "physical_reference": "2IMV-05-1 Design",
            "parking_restrictions": []
        }
    ],
    "name": null,
    "type": "UNKNOWN",
    "owner": null,
    "state": null,
    "images": [],
    "address": "155 De Haro",
    "country": "US",
    "publish": true,
    "operator": {
        "name": "Shell Recharge"
    },
    "party_id": "SRC",
    "time_zone": null,
    "directions": [],
    "energy_mix": null,
    "facilities": null,
    "coordinates": {
        "latitude": "37.76824951171875",
        "longitude": "-122.40180969238281"
    },
    "postal_code": "00000",
    "suboperator": null,
    "country_code": "US",
    "last_updated": "2025-05-07T15:34:47+00:00",
    "parking_type": null,
    "spec_version": "2.1.1",
    "opening_times": null,
    "related_locations": [],
    "publish_allowed_to": null,
    "charging_when_closed": true
}

function ChargersMapPage() {
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
    const [markerLibrary, setMarkerLibrary] = useState<any>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const pageSize = 50;
    const [isLoading, setIsLoading] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState({ current: 0, total: 0 });
    const [totalLocations, setTotalLocations] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [dbLocations, setDbLocations] = useState<any[]>([]);
    const [pins, setPins] = useState<any[]>([]);
    const [groupedPins, setGroupedPins] = useState<any[]>([]);
    const [evsePins, setEvsePins] = useState<any[]>([]);
    const [showAllPins, setShowAllPins] = useState(false);
    const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
    const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
    const [isUpdatingLocation, setIsUpdatingLocation] = useState(false);
    const [isStartingSession, setIsStartingSession] = useState(false);

    const [prevLocation, setPrevLocation] = useState<any | null>(null);

    const [selectedEvse, setSelectedEvse] = useState<any | null>(null);

    const searchParams = useSearchParams();
    const [emaCode, setEmaCode] = useState<string | null>(null);

    // Tabs
    const [activeTab, setActiveTab] = useState('overview');

    // Selected pin and location details section
    const [selectedPin, setSelectedPin] = useState<any | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
    const [locationDetailsExpanded, setLocationDetailsExpanded] = useState(false);
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null); // Track which group is selected for coloring

    // Bottom sheet state
    const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);

    // Map Bounds
    const [mapBounds, setMapBounds] = useState<{ north: number, south: number, east: number, west: number } | null>(null);
    const [boundsChanged, setBoundsChanged] = useState(false);

    // Search
    const [isSearching, setIsSearching] = useState(false);
    const [triggerSearch, setTriggerSearch] = useState(false);

    // Ask user for location
    const [userLocation, setUserLocation] = useState<{ latitude: number, longitude: number, accuracy: number } | null>(null);

    // Add state to track the location watcher
    const [locationWatchId, setLocationWatchId] = useState<number | null>(null);
    const [isLocationTracking, setIsLocationTracking] = useState(false);
    const [locationError, setLocationError] = useState<string | null>(null);

    // Sessions modal state
    const [showSessionsModal, setShowSessionsModal] = useState(false);
    const [sessions, setSessions] = useState<any[]>([]);
    const [sessionEventSource, setSessionEventSource] = useState<EventSource | null>(null);
    const [sseConnectionStatus, setSseConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');

    // Function to start location tracking
    const startLocationTracking = () => {
        if (navigator.geolocation && !locationWatchId) {
            setLocationError(null);
            setIsLocationTracking(true);
            
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    });
                    setLocationError(null);
                },
                (error) => {
                    console.error('Error getting user location:', error);
                    
                    let errorMessage = 'Unknown location error';
                    let shouldStopTracking = false;
                    
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            // Check if it's the secure origin error
                            if (error.message.includes('secure origins') || error.message.includes('Only secure origins are allowed')) {
                                errorMessage = 'Location requires HTTPS. Demo mode - location features limited.';
                                shouldStopTracking = true;
                            } else {
                                errorMessage = 'Location access denied by user';
                                shouldStopTracking = true;
                            }
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = 'Location information unavailable';
                            // Continue tracking, this might be temporary
                            break;
                        case error.TIMEOUT:
                            errorMessage = 'Location request timed out - will continue trying';
                            // Don't stop tracking on timeout, watchPosition will keep trying
                            break;
                    }
                    
                    setLocationError(errorMessage);
                    
                    if (shouldStopTracking) {
                        setIsLocationTracking(false);
                    }
                },
                {
                    enableHighAccuracy: true, // Use GPS if available
                    timeout: 15000, // Increased to 15 seconds timeout per request
                    maximumAge: 60000 // Accept cached location up to 60 seconds old
                }
            );
            
            setLocationWatchId(watchId);
        }
    };

    // Function to stop location tracking
    const stopLocationTracking = () => {
        if (locationWatchId !== null) {
            navigator.geolocation.clearWatch(locationWatchId);
            setLocationWatchId(null);
            setIsLocationTracking(false);
        }
    };

    useEffect(() => {
        // DEMO MODE: Set user location near the example charging stations in San Francisco
        // This avoids geolocation HTTPS issues and provides a consistent demo experience
        const demoLocation = {
            latitude: 37.7695, // A few blocks from the charging stations
            longitude: -122.4050, // A few blocks from the charging stations  
            accuracy: 25 // Good accuracy for demo
        };
        
        console.log('Setting demo user location:', demoLocation);
        setUserLocation(demoLocation);
        setLocationError(null);
        
        // Don't start actual geolocation tracking in demo mode
        // startLocationTracking();
        
        // Cleanup function to stop watching location when component unmounts
        return () => {
            stopLocationTracking();
        };
    }, []);

    const handleTabChange = (value: string) => {
        setActiveTab(value);
        if (selectedPin?.isGrouped && !selectedPin?.isEvse) {
            if (showAllPins) {
                // If we're already showing individual chargers, hide them
                setShowAllPins(false);
                setEvsePins([]);
                setSelectedLocationId(null);
            } else {
                // Show EVSE pins for all locations in the group
                setShowAllPins(true);
                const allEvsePins: any[] = [];
                selectedPin.locations?.forEach((location: any) => {
                    const locationEvsePins = generateEvsePinsFromLocation(location);
                    allEvsePins.push(...locationEvsePins);
                });
                setEvsePins(allEvsePins);
                setSelectedLocationId(selectedPin.locations?.[0]?.id || null);
            }
        }
    }

    // Check if a location has any fast chargers (L3+)
    const hasFastChargers = (location: any): boolean => {
        if (!location.evse) return false;
        
        return location.evse.some((evse: any) => {
            if (!evse.connectors) return false;
            return evse.connectors.some((connector: any) => {
                const powerType = (connector.power_type || '').toUpperCase();
                return powerType === 'DC' || powerType.startsWith('DC');
            });
        });
    };

    // Group locations by address and party_id
    const groupLocationsByAddress = (locations: any[]) => {
        const groupedLocations = new Map();
        
        locations.forEach((location) => {
            const groupKey = `${location.address}_${location.party_id}`;
            
            if (!groupedLocations.has(groupKey)) {
                groupedLocations.set(groupKey, {
                    groupId: groupKey,
                    address: location.address,
                    city: location.city,
                    party_id: location.party_id,
                    operator: location.operator,
                    coordinates: location.coordinates,
                    locations: [],
                    evseCount: 0,
                    availableCount: 0,
                    chargingCount: 0,
                    unknownCount: 0,
                    hasFastChargers: false,
                    distance_km: location.distance_km
                });
            }
            
            const group = groupedLocations.get(groupKey);
            group.locations.push(location);
            
            // Check if this location has any fast chargers and update the group
            if (hasFastChargers(location)) {
                group.hasFastChargers = true;
            }
            
            // Count EVSEs in this location
            const evseCount = location.evse ? location.evse.length : 0;
            group.evseCount += evseCount;
            
            // Count statuses
            location.evse?.forEach((evse: any) => {
                const status = evse.status?.toLowerCase() || 'unknown';
                if (status === 'available') group.availableCount++;
                else if (status === 'charging') group.chargingCount++;
                else group.unknownCount++;
            });

            // Update distance_km to use the closest location's distance
            if (location.distance_km < group.distance_km) {
                group.distance_km = location.distance_km;
            }
        });
        
        return Array.from(groupedLocations.values());
    };

    // Generate EVSE pins from a location
    const generateEvsePinsFromLocation = (location: any) => {
        if (!location.evse || !Array.isArray(location.evse)) {
            return [];
        }

        return location.evse.map((evse: any) => ({
            uid: evse.uid,
            latitude: evse.coordinates?.latitude || location.coordinates?.latitude,
            longitude: evse.coordinates?.longitude || location.coordinates?.longitude,
            evseData: evse,
            locationData: location,
            connectorCount: evse.connectors ? evse.connectors.length : 0,
            status: evse.status,
            physical_reference: evse.physical_reference,
            isEvse: true, // Flag to identify EVSE pins
            hasFastChargers: evse.connectors?.some((connector: any) => {
                const powerType = (connector.power_type || '').toUpperCase();
                return powerType === 'DC' || powerType.startsWith('DC');
            }) || false
        }));
    };

    // Helper function to calculate distance between two coordinates using Haversine formula
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
        const R = 6371; // Earth's radius in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c; // Distance in kilometers
        return distance;
    };

    useEffect(() => {
        const loadExampleData = async () => {
            setIsLoading(true);  
            if (!userLocation) {
                console.warn('User location not found');
                setIsLoading(false);
                return;
            }

            try {
                console.log('Loading example data...');
                
                // Use the example data and add distance calculation
                const locationWithDistance = {
                    ...exampleJson,
                    distance_km: calculateDistance(
                        userLocation.latitude,
                        userLocation.longitude,
                        Number(exampleJson.coordinates.latitude),
                        Number(exampleJson.coordinates.longitude)
                    )
                };
                
                const allLocations = [locationWithDistance];
                
                console.log('Loaded example locations:', allLocations);
                setDbLocations(allLocations);
                
                // Create all individual pins
                const allPins = allLocations.map((location: any) => ({
                    latitude: location.coordinates.latitude,
                    longitude: location.coordinates.longitude,
                    count: location.evse ? location.evse.length : 0,
                    locationData: location,
                    isGrouped: false,
                    hasFastChargers: hasFastChargers(location)
                }));
                setPins(allPins);
                
                // Create grouped pins
                const groupedLocations = groupLocationsByAddress(allLocations);
                const groupedPinsArray = groupedLocations.map((group: any) => ({
                    groupId: group.groupId,
                    latitude: group.coordinates.latitude,
                    longitude: group.coordinates.longitude,
                    count: group.evseCount,
                    availableCount: group.availableCount,
                    chargingCount: group.chargingCount,
                    unknownCount: group.unknownCount,
                    locationData: group,
                    locations: group.locations,
                    isGrouped: true,
                    hasFastChargers: group.hasFastChargers,
                    distance_km: group.distance_km
                }));
                setGroupedPins(groupedPinsArray);
                console.log('Example grouped pins:', groupedPinsArray[0]);

                if (groupedPinsArray.length > 0) {
                    // Select the example location
                    const exampleGroup = groupedPinsArray[0];
                    
                    // Set as selected
                    setSelectedPin(exampleGroup);
                    setSelectedLocation(exampleGroup.locationData);
                    setLocationDetailsExpanded(true);
                    
                    // Center map on example location
                    if (map) {
                        setTimeout(() => {
                            map.setCenter({
                                lat: Number(exampleGroup.latitude),
                                lng: Number(exampleGroup.longitude)
                            });
                            map.setZoom(15);
                        }, 500); // 500ms delay
                    }
                }
                
                console.log('Successfully loaded example data');
                
            } catch (e) {
                console.error('Error loading example data:', e);
                toast.error("Failed to load charging locations. Please try refreshing the page.", {
                    position: 'top-center',
                    duration: 5000,
                });
            }
            
            setIsLoading(false);
        };

        console.log('useEffect triggered')
        if (!prevLocation && userLocation) {
            setPrevLocation(userLocation);
            loadExampleData();
        }

        if (prevLocation && userLocation) {
            // Detect distance between prevLocation and userLocation
            const distanceKm = calculateDistance(
                prevLocation.latitude,
                prevLocation.longitude,
                userLocation.latitude,
                userLocation.longitude
            );
            
            console.log(`Distance moved: ${distanceKm.toFixed(3)} km`);
            
            // If user has moved more than 100 meters (0.1 km), refresh locations
            const MOVEMENT_THRESHOLD_KM = 0.1;
            
            if (distanceKm >= MOVEMENT_THRESHOLD_KM) {
                console.log(`User moved ${distanceKm.toFixed(3)} km, refreshing locations...`);
                setPrevLocation(userLocation);
                
                // Clear current selection when user moves significantly
                setSelectedLocation(null);
                setSelectedPin(null);
                setActiveGroupId(null);
                setShowAllPins(false);
                setEvsePins([]);
                setSelectedLocationId(null);
                setSelectedGroupId(null);
                setIsBottomSheetExpanded(false);
                
                // Reload example data based on current position
                loadExampleData();
            }
        }
    }, [pageSize, userLocation]);

    // Fetch the latest status of a location using our API route
    const fetchLocationStatus = async (location: any) => {
        if (!location || !location.id || !location.party_id || !location.country_code) {
            console.error('Missing required location data for status update');
            return null;
        }
        
        setIsUpdatingLocation(true);
        
        try {
            // DEMO MODE: Instead of making API calls, return the existing location data
            // In a real app, this would fetch fresh status from the API
            console.log('Demo mode: Using existing location data instead of API call');
            
            // Add a small delay to simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Return the existing location data
            return location;
        } catch (error) {
            console.error('Error in demo location status:', error);
            return location; // Fallback to existing data
        } finally {
            setIsUpdatingLocation(false);
        }
    };

    // Update the handleSelectPin function to reset bottom sheet state
    const handleSelectPin = async (pin: any) => {
        console.log("handleSelectPin: ", pin);
        setSelectedPin(pin);
        setIsBottomSheetExpanded(false); // Reset to collapsed state when selecting new pin
        
        let locationToShow = pin.locationData;
        let shouldUpdateGroupedPin = false;

        // console.log('handleSelectPin: ', pin);
        
        // Clear any existing EVSE pins and reset showAllPins when selecting a new pin
        setEvsePins([]);
        setSelectedLocationId(null);
        setShowAllPins(false);
        console.log("pin", pin);
        if (pin.isEvse) {
            // If an EVSE pin is selected, just show its details
            locationToShow = pin.locationData;
            setSelectedLocation(locationToShow);
            setLocationDetailsExpanded(true);
            return;
        }
        
        if (pin.isGrouped) {
            // If a grouped pin is selected, track its group ID
            setActiveGroupId(pin.groupId);
            setSelectedGroupId(pin.groupId);
            
            // For grouped pins, we'll need to update each location in the group
            if (pin.locations && pin.locations.length > 0) {
                const updatedLocations = [];
                
                // Update stats for tracking changes
                let availableCount = 0;
                let chargingCount = 0;
                let unknownCount = 0;
                
                for (const location of pin.locations) {
                    const updatedLocation = await fetchLocationStatus(location);
                    
                    if (updatedLocation) {
                        updatedLocations.push(updatedLocation);
                        
                        // Count statuses
                        updatedLocation.evse?.forEach((evse: any) => {
                            const status = evse.status?.toLowerCase() || 'unknown';
                            if (status === 'available') availableCount++;
                            else if (status === 'charging') chargingCount++;
                            else unknownCount++;
                        });
                    } else {
                        // Keep original if update failed
                        updatedLocations.push(location);
                        
                        // Count existing statuses
                        location.evse?.forEach((evse: any) => {
                            const status = evse.status?.toLowerCase() || 'unknown';
                            if (status === 'available') availableCount++;
                            else if (status === 'charging') chargingCount++;
                            else unknownCount++;
                        });
                    }
                }
                
                // Update the pin's locations with the fresh data
                if (updatedLocations.length > 0) {
                    pin.locations = updatedLocations;
                    
                    // Update counts
                    pin.availableCount = availableCount;
                    pin.chargingCount = chargingCount;
                    pin.unknownCount = unknownCount;
                    
                    shouldUpdateGroupedPin = true;
                }
                
                locationToShow = pin.locationData;
            }
        } else {
            // For individual pins, just update the single location
            const updatedLocation = await fetchLocationStatus(pin.locationData);
            
            if (updatedLocation) {
                pin.locationData = updatedLocation;
                locationToShow = updatedLocation;
            }
        }
        
        setSelectedLocation(locationToShow);
        setLocationDetailsExpanded(true);
        setIsBottomSheetExpanded(true);
        
        // If we updated a grouped pin, update the groupedPins state
        if (shouldUpdateGroupedPin) {
            setGroupedPins(prevGroupedPins => {
                return prevGroupedPins.map(groupedPin => 
                    groupedPin.groupId === pin.groupId ? pin : groupedPin
                );
            });
        }
    };
    
    // Select which pins to display based on state
    const getVisiblePins = () => {
        if (!activeGroupId) {
            // Show only grouped pins when no group is active
            return groupedPins.map(pin => ({
                ...pin,
                // Mark selected pin as selected (for green color)
                isSelected: pin.groupId === selectedGroupId
            }));
        } else {
            // Show the grouped pins for all locations
            const otherGroupPins = groupedPins
                .filter(pin => pin.groupId !== activeGroupId)
                .map(pin => ({
                    ...pin,
                    isSelected: pin.groupId === selectedGroupId && !showAllPins
                }));
            
            if (showAllPins && evsePins.length > 0) {
                // If showing all pins and we have EVSE pins, show EVSE pins instead of location pins
                return [...otherGroupPins, ...evsePins];
            } else if (showAllPins) {
                // If showing all pins for the active group, add individual pins
                const activeGroupPins = pins.filter(pin => {
                    const location = pin.locationData;
                    const pinGroupId = `${location.address}_${location.party_id}`;
                    return pinGroupId === activeGroupId;
                }).map(pin => ({
                    ...pin,
                    isActive: true, // Mark these pins as active for orange coloring
                    isSelected: false // Individual pins in expanded view aren't "selected"
                }));
                
                return [...otherGroupPins, ...activeGroupPins];
            } else {
                // If not showing individual pins, include the active group's pin
                const activeGroupPin = groupedPins.find(pin => pin.groupId === activeGroupId);
                if (activeGroupPin) {
                    return [...otherGroupPins, {
                        ...activeGroupPin,
                        isSelected: true // Explicitly mark as selected
                    }];
                }
                return otherGroupPins;
            }
        }
    };
    
    // Toggle between showing all pins or just grouped pins
    const togglePinDisplay = () => {
        setShowAllPins(!showAllPins);
    };
    
    // Calculate availability statistics
    const getAvailabilityStats = () => {
        if (selectedPin?.isEvse) {
            // For EVSE pins, just return the status of the single EVSE
            const status = selectedPin.status?.toLowerCase() || 'unknown';
            return {
                available: status === 'available' ? 1 : 0,
                charging: status === 'charging' ? 1 : 0,
                unknown: status === 'unknown' ? 1 : 0,
                total: 1
            };
        }
        
        if (selectedPin?.isGrouped) {
            return {
                available: selectedPin.availableCount || 0,
                charging: selectedPin.chargingCount || 0,
                unknown: selectedPin.unknownCount || 0,
                total: selectedPin.count || 0
            };
        }
        
        if (!selectedLocation?.evse) return { available: 0, charging: 0, unknown: 0, total: 0 };
        
        const stats = selectedLocation.evse.reduce((acc: any, evse: any) => {
            const status = evse.status?.toLowerCase() || 'unknown';
            acc[status] = (acc[status] || 0) + 1;
            acc.total += 1;
            return acc;
        }, { available: 0, charging: 0, unknown: 0, total: 0 });
        
        return stats;
    };
    
    // Get connector types
    const getConnectorTypes = () => {
        if (selectedPin?.isEvse) {
            // For EVSE pins, get connector types from the single EVSE
            const types = new Set<string>();
            selectedPin.evseData?.connectors?.forEach((connector: any) => {
                if (connector.standard) {
                    types.add(connector.standard);
                }
            });
            return Array.from(types);
        }
        
        if (selectedPin?.isGrouped) {
            const types = new Set<string>();
            selectedPin.locations.forEach((location: any) => {
                location.evse?.forEach((evse: any) => {
                    evse.connectors?.forEach((connector: any) => {
                        if (connector.standard) {
                            types.add(connector.standard);
                        }
                    });
                });
            });
            return Array.from(types);
        }
        
        if (!selectedLocation?.evse) return [];
        
        const types = new Set<string>();
        selectedLocation.evse.forEach((evse: any) => {
            evse.connectors?.forEach((connector: any) => {
                if (connector.standard) {
                    types.add(connector.standard);
                }
            });
        });
        
        return Array.from(types);
    };
    
    // Calculate power levels
    const getPowerLevels = () => {
        const calculateLevels = (location: any) => {
            // Track min and max kW for each charging level
            const levelRanges: {[key: string]: {min: number, max: number}} = {
                'L1': {min: Infinity, max: 0},
                'L2': {min: Infinity, max: 0},
                'L3': {min: Infinity, max: 0}
            };
            
            // Track which levels are present
            const levelsPresent = new Set<string>();
            
            location.evse?.forEach((evse: any) => {
                evse.connectors?.forEach((connector: any) => {
                    const { voltage, amperage, power_type } = connector;
                    if (!voltage || !amperage) return;  // skip if missing data
                
                    // normalize and compute kW
                    const type = (power_type || '').toUpperCase();  
                    const kW = (voltage * amperage) / 1000;
                
                    let level;
                    switch (type) {
                        case 'DC':
                        // anything DC is fast‐charge
                        level = 'L3';
                        break;
                
                        case 'AC_1_PHASE':
                        case 'AC_2_PHASE':
                        case 'AC_2_PHASE_SPLIT':
                        case 'AC_3_PHASE':
                        case '':           // blank fallback
                        // all of these are AC — decide by throughput
                        level = kW <= 2
                            ? 'L1'         // up to ~2 kW ≈ true Level 1
                            : 'L2';        // above that, treat as Level 2
                        break;
                
                        default:
                        // any other weird type, fall back on voltage test
                        if (type.startsWith('DC')) {
                            level = 'L3';
                        } else if (voltage <= 120 && amperage <= 16) {
                            level = 'L1';
                        } else {
                            level = 'L2';
                        }
                    }
                
                    // now update your stats
                    if (kW < levelRanges[level].min) levelRanges[level].min = kW;
                    if (kW > levelRanges[level].max) levelRanges[level].max = kW;
                    levelsPresent.add(level);
                });
            });
            
            return { levelRanges, levelsPresent };
        };
        
        let levelRanges: {[key: string]: {min: number, max: number}} = {
            'L1': {min: Infinity, max: 0},
            'L2': {min: Infinity, max: 0},
            'L3': {min: Infinity, max: 0}
        };
        
        let levelsPresent = new Set<string>();
        
        if (selectedPin?.isEvse) {
            // For EVSE pins, calculate levels from the single EVSE
            const mockLocation = { evse: [selectedPin.evseData] };
            const result = calculateLevels(mockLocation);
            levelRanges = result.levelRanges;
            levelsPresent = result.levelsPresent;
        } else if (selectedPin?.isGrouped) {
            selectedPin.locations.forEach((location: any) => {
                const result = calculateLevels(location);
                
                // Merge results
                for (const level of result.levelsPresent) {
                    levelsPresent.add(level);
                    levelRanges[level].min = Math.min(levelRanges[level].min, result.levelRanges[level].min);
                    levelRanges[level].max = Math.max(levelRanges[level].max, result.levelRanges[level].max);
                }
            });
        } else if (selectedLocation?.evse) {
            const result = calculateLevels(selectedLocation);
            levelRanges = result.levelRanges;
            levelsPresent = result.levelsPresent;
        } else {
            return [];
        }
        
        // Convert to array format for display
        const result = Array.from(levelsPresent).map(level => {
            const range = levelRanges[level];
            const minKw = range.min.toFixed(1);
            const maxKw = range.max.toFixed(1);
            
            return {
                level,
                description: level === 'L1' ? 'Slow' : level === 'L2' ? 'Normal' : 'Fast',
                // If min and max are very close, just show one value
                kW: Math.abs(range.max - range.min) < 0.5 
                    ? `${minKw} kW` 
                    : `${minKw} - ${maxKw} kW`
            };
        });
        
        // Sort by level (L1, L2, L3)
        return result.sort((a, b) => a.level.localeCompare(b.level));
    };
    

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMounted(true);
        }
    }, []);

      
    // Set up Server-Sent Events for real-time session updates
    const startSessionSSE = () => {
        console.log('Starting SSE connection for session updates');
        setSseConnectionStatus('connecting');
        
        // Create EventSource connection
        const eventSource = new EventSource('/api/ocpi/activation/get-sessions-stream', {
            withCredentials: true
        });

        // Handle session updates
        eventSource.addEventListener('sessions', (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('SSE sessions event:', data.type, data);
                
                if (data.type === 'initial') {
                    // Initial session data load
                    console.log('SSE: Received initial sessions:', data.sessions);
                    setSessions(data.sessions || []);
                    setEmaCode(data.emaCode);
                } else if (data.type === 'update') {
                    // Real-time session update
                    console.log('SSE: Session update:', data.eventType, data.session);
                    
                    setSessions(currentSessions => {
                        switch (data.eventType) {
                            case 'INSERT':
                                // Add new session if it doesn't already exist
                                const existingSession = currentSessions.find(s => s.id === data.session.id);
                                if (!existingSession) {
                                    console.log('SSE: Adding new session:', data.session);
                                    return [...currentSessions, data.session];
                                }
                                return currentSessions;
                                
                            case 'UPDATE':
                                // Update existing session
                                console.log('SSE: Updating session:', data.session);
                                return currentSessions.map(s => 
                                    s.id === data.session.id ? data.session : s
                                );
                                
                            case 'DELETE':
                                // Remove deleted session
                                console.log('SSE: Removing session:', data.session);
                                return currentSessions.filter(s => s.id !== data.session.id);
                                
                            default:
                                return currentSessions;
                        }
                    });
                }
            } catch (error) {
                console.error('Error parsing SSE sessions data:', error);
            }
        });

        // Handle connection status
        eventSource.addEventListener('status', (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('SSE status:', data);
                if (data.type === 'connected') {
                    setSseConnectionStatus('connected');
                }
            } catch (error) {
                console.error('Error parsing SSE status data:', error);
            }
        });

        // Handle errors
        eventSource.addEventListener('error', (event) => {
            console.error('SSE error:', event);
            setSseConnectionStatus('disconnected');
            
            // EventSource will automatically try to reconnect
        });

        // Handle keepalive
        eventSource.addEventListener('keepalive', (event) => {
            // Just to keep connection alive, no action needed
            console.log('SSE keepalive received');
        });

        // Connection opened
        eventSource.onopen = () => {
            console.log('SSE connection opened');
            setSseConnectionStatus('connected');
        };

        // Store the EventSource instance
        setSessionEventSource(eventSource);
    };

    // Note: fetchInitialSessions is no longer needed - SSE handles initial data load

    // Cleanup function to close SSE connection
    const stopSessionSSE = () => {
        if (sessionEventSource) {
            console.log('Closing SSE connection');
            sessionEventSource.close();
            setSessionEventSource(null);
            setSseConnectionStatus('disconnected');
        }
    };


    const handleStartSession = () => {
        if (activeTab === 'overview' || !selectedEvse) {
            handleTabChange('chargers');
            toast.error("Please select a charger to start a session", {
                position: 'top-center',
                duration: 3000,
                className: 'bg-red-500 text-white'
            });
        } else if (selectedEvse.uid === 'unknown') {
            startUnknownSession();
        } else {
            startSession();
        }
    }

    const startUnknownSession = async () => {
        setIsStartingSession(true);
        try {
            // DEMO MODE: Simulate successful session start instead of making API call
            console.log('Demo mode: Simulating unknown session start');
            
            // Add realistic delay to simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simulate successful response
            const data = { status_code: 1000 };
            console.log('Demo Response from Just Plug Client:', data);

            if (data.status_code === 1000) {
                console.log('Demo session started successfully!');
                toast.success("Demo session started successfully. Please verify your vehicle is charging.", {
                    position: 'top-center',
                    duration: 3000,
                    className: 'bg-green-500 text-white'
                });
                setShowSessionsModal(true);
                
                // In demo mode, no real SSE updates
                console.log('Demo session started successfully - no real-time updates in demo');
            }
        } catch (error: any) {
            console.error('Error in demo session start:', error);
            toast.error("Demo session failed. This is just a demo!", {
                position: 'top-center',
                duration: 3000,
                className: 'bg-red-500 text-white'
            });
        } finally {
            setIsStartingSession(false);
        }
    }

    const startSession = async () => {
        // Country code, party_id, location_id, evse_uid
        if (!selectedEvse || !selectedPin) {
            toast.error("Please select a charger to start a session", {
                position: 'top-center',
                duration: 3000,
                className: 'bg-red-500 text-white'
            });
            return;
        }

        const selectedLocation = selectedPin.locations.find((location: any) => location.evse.find((evse: any) => evse.uid === selectedEvse.uid));
        console.log("Demo selectedLocation: ", selectedLocation);
        const override = {
            country_code: selectedLocation.country_code,
            party_id: selectedLocation.party_id,
            location_id: selectedLocation.id,
            evse_uid: selectedEvse.uid
        }

        console.log("Demo override: ", override);
        setIsStartingSession(true);
        try {
            // DEMO MODE: Simulate successful session start instead of making API call
            console.log('Demo mode: Simulating specific charger session start');
            
            // Add realistic delay to simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simulate successful response
            const data = { status_code: 1000 };
            console.log('Demo Response from Just Plug Client:', data);

            if (data.status_code === 1000) {
                console.log('Demo session started successfully!');
                toast.success(`Demo session started on charger ${selectedEvse.physical_reference}. Please verify your vehicle is charging.`, {
                    position: 'top-center',
                    duration: 4000,
                    className: 'bg-green-500 text-white'
                });
                setShowSessionsModal(true);
                
                // In demo mode, no real SSE updates
                console.log('Demo session started successfully - no real-time updates in demo');
            }
        } catch (error: any) {
            console.error('Error in demo session start:', error);
            toast.error("Demo session failed. This is just a demo!", {
                position: 'top-center',
                duration: 3000,
                className: 'bg-red-500 text-white'
            });
        } finally {
            setIsStartingSession(false);
        }
    }
    	// Start SSE connection when component mounts
	useEffect(() => {
		// DEMO MODE: SSE connection disabled for demo purposes
		// startSessionSSE();
		
		// Set connection status to disconnected for demo
		setSseConnectionStatus('disconnected');
		
		// Cleanup SSE on unmount
		return () => {
			stopSessionSSE();
		};
	}, []);

    // Cleanup SSE connection on component unmount
    useEffect(() => {
        return () => {
            stopSessionSSE();
        };
    }, [sessionEventSource]);

    const availabilityStats = getAvailabilityStats();
    const connectorTypes = getConnectorTypes();
    const powerLevels = getPowerLevels();

    // Map human-readable names for connector standards
    const connectorNames: {[key: string]: string} = {
        'IEC_62196_T1': 'J1772 (Type 1)',
        'IEC_62196_T1_COMBO': 'CCS1',
        'IEC_62196_T2': 'Type 2',
        'IEC_62196_T2_COMBO': 'CCS2',
        'CHADEMO': 'CHAdeMO',
        'TESLA': 'Tesla'
    };

    // Get status badge color
    const getStatusColor = (status: string) => {
        switch(status.toLowerCase()) {
            case 'available': return 'bg-green-500';
            case 'charging': return 'bg-blue-500';
            case 'unknown': return 'bg-gray-400';
            default: return 'bg-gray-400';
        }
    };

    useEffect(() => {
        console.log("selectedEvse", selectedEvse);
    }, [selectedEvse]);
    
    // Get visible chargers for the chargers tab
    const getVisibleChargers = () => {
        if (selectedPin?.isEvse) {
            // For EVSE pins, just return the single EVSE
            return [selectedPin.evseData];
        } else if (selectedPin?.isGrouped) {
            // For grouped pins, collect all EVSEs from all locations
            const allEvses: any[] = [];
            selectedPin.locations.forEach((location: any) => {
                location.evse?.forEach((evse: any) => {
                    // Add location info to each EVSE for reference
                    allEvses.push({
                        ...evse,
                        locationName: location.name || location.address,
                        locationAddress: location.address
                    });
                });
            });
            return allEvses;
        } else if (selectedLocation?.evse) {
            return selectedLocation.evse;
        }
        return [];
    };

    // Add a refresh function to manually update the current location
    const refreshCurrentLocation = async () => {
        if (!selectedPin) return;
        
        // Use the same logic as in handleSelectPin
        await handleSelectPin(selectedPin);
    };

    const handleBottomSheetExpanded = (expanded: boolean) => {
        setActiveTab('overview');
        setIsBottomSheetExpanded(expanded);
    }

    return (
        <LoadScript
            googleMapsApiKey={googleMapsApiKey}
            libraries={libraries}
        >
            <div className="h-screen w-screen relative">
                {/* Map layer (bottom) */}
                <div className="relative w-full h-full z-0">
                    <ChargersMap
                        map={map}
                        setMap={setMap}
                        isMounted={isMounted}
                        mapId={"DEMO_MAP_ID"}
                        pins={getVisiblePins()}
                        selectedPin={selectedPin}
                        onSelectPin={handleSelectPin}
                        userLocation={{
                            lat: userLocation?.latitude, 
                            lng: userLocation?.longitude,
                            accuracy: userLocation?.accuracy
                        }}
                        selectedEvse={selectedEvse}
                        onSelectEvse={setSelectedEvse}
                    />
                </div>

                {/* Sessions Button and Connection Status - Top Right */}
                <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                    <Button
                        onClick={() => setShowSessionsModal(true)}
                        className="bg-white text-gray-800 hover:bg-gray-50 shadow-lg border border-gray-200"
                        size="sm"
                    >
                        <Clock className="h-4 w-4 mr-2" />
                        Sessions
                    </Button>
                    
                    {/* SSE Connection Status Indicator */}
                    <div className="flex items-center justify-end">
                        <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium shadow-sm ${
                            sseConnectionStatus === 'connected' 
                                ? 'bg-green-100 text-green-800 border border-green-200' 
                                : sseConnectionStatus === 'connecting'
                                    ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                    : 'bg-red-100 text-red-800 border border-red-200'
                        }`}>
                            <div className={`w-2 h-2 rounded-full mr-1 ${
                                sseConnectionStatus === 'connected' 
                                    ? 'bg-green-500' 
                                    : sseConnectionStatus === 'connecting'
                                        ? 'bg-yellow-500 animate-pulse'
                                        : 'bg-red-500'
                            }`}></div>
                            {sseConnectionStatus === 'connected' && 'Live'}
                            {sseConnectionStatus === 'connecting' && 'Connecting...'}
                            {sseConnectionStatus === 'disconnected' && 'Offline'}
                        </div>
                    </div>
                </div>
                
                {/* Bottom Sheet UI layer */}
                {selectedLocation && (
                    <div className={`absolute left-0 right-0 z-10 transition-all duration-300 ease-in-out ${
                        isBottomSheetExpanded ? 'bottom-0' : 'bottom-0'
                    }`}>
                        <div className="bg-white rounded-t-xl shadow-2xl border-t border-gray-200 max-h-[85vh] overflow-hidden flex flex-col">
                            {/* Collapsed Header - Always Visible */}
                            <div 
                                className="p-4 cursor-pointer border-b border-gray-100"
                                onClick={() => handleBottomSheetExpanded(!isBottomSheetExpanded)}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex-1">
                                        {selectedPin?.isEvse ? (
                                            <>
                                                <p className="font-semibold text-lg leading-tight">
                                                    {selectedPin.physical_reference}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {selectedLocation.address}, {selectedLocation.city}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {selectedLocation.operator?.name?.replace(/_/g, ' ')}
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="font-semibold text-lg leading-tight">
                                                    {selectedLocation.address}, {selectedLocation.city}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {selectedLocation.operator?.name?.replace(/_/g, ' ')}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {/* Expand/Collapse Indicator */}
                                        <div className={`transform transition-transform duration-200 ${
                                            isBottomSheetExpanded ? 'rotate-180' : 'rotate-0'
                                        }`}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                        {/* Close Button */}
                                        <button 
                                            className="text-lg text-destructive font-bold ml-2 p-1"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedLocation(null);
                                                setActiveGroupId(null);
                                                setShowAllPins(false);
                                                handleBottomSheetExpanded(false);
                                                setEvsePins([]);
                                                setSelectedLocationId(null);
                                                setSelectedPin(null);
                                                setSelectedEvse(null);
                                                setSelectedGroupId(null);
                                            }}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Handle/Drag indicator */}
                                <div className="flex justify-center mt-2">
                                    <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
                                </div>
                            </div>

                            {/* Expanded Content */}
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden flex flex-col ${
                                isBottomSheetExpanded ? 'max-h-[60vh] opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                                <div className="overflow-y-auto flex-1">
                                    <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={handleTabChange}>
                                        <div className="px-4 pt-2">
                                            <TabsList className="w-full">
                                                <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                                                <TabsTrigger value="chargers" className="flex-1">Chargers</TabsTrigger>
                                            </TabsList>
                                        </div>
                                        <div className="p-4">
                                            <TabsContent value="overview" className="space-y-4 mt-0 flex-1 overflow-y-auto">
                                                <div>
                                                    <p className="text-sm font-medium mb-2">Charger Availability</p>
                                                    <div className="flex space-x-2">
                                                        {isUpdatingLocation ? (
                                                            <div className="flex items-center">
                                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent mr-2"></div>
                                                                <span className="text-xs">Updating status...</span>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <Badge className="bg-green-500">{availabilityStats.available} Available</Badge>
                                                                <Badge className="bg-blue-500">{availabilityStats.charging} Charging</Badge>
                                                                <Badge className="bg-gray-400">{availabilityStats.unknown} Unknown</Badge>
                                                                <Button 
                                                                    variant="ghost" 
                                                                    size="sm" 
                                                                    className="p-0 h-6 ml-2" 
                                                                    onClick={refreshCurrentLocation}
                                                                    disabled={isUpdatingLocation}
                                                                >
                                                                    <RefreshCw className="h-4 w-4" />
                                                                </Button>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                <div>
                                                    <h3 className="text-sm font-medium mb-2">Connector Types</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {connectorTypes.map((type, index) => (
                                                            <Badge key={index} variant="outline">
                                                                {connectorNames[type] || type}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                                
                                                <div>
                                                    <h3 className="text-sm font-medium mb-2">Power Levels</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {powerLevels.map((power, index) => (
                                                            <Badge key={index} variant="outline">
                                                                {power.level} ({power.description}): {power.kW}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                                
                                                {/* {selectedPin?.isGrouped && !selectedPin?.isEvse && (
                                                    <div className="mt-4">
                                                        <Button 
                                                            variant="outline" 
                                                            onClick={() => {
                                                                if (showAllPins) {
                                                                    // If we're already showing individual chargers, hide them
                                                                    setShowAllPins(false);
                                                                    setEvsePins([]);
                                                                    setSelectedLocationId(null);
                                                                } else {
                                                                    // Show EVSE pins for all locations in the group
                                                                    setShowAllPins(true);
                                                                    const allEvsePins: any[] = [];
                                                                    selectedPin.locations?.forEach((location: any) => {
                                                                        const locationEvsePins = generateEvsePinsFromLocation(location);
                                                                        allEvsePins.push(...locationEvsePins);
                                                                    });
                                                                    setEvsePins(allEvsePins);
                                                                    setSelectedLocationId(selectedPin.locations?.[0]?.id || null);
                                                                }
                                                            }}
                                                            className="w-full"
                                                        >
                                                            {showAllPins ? "Hide Individual Chargers" : "Show Individual Chargers"}
                                                        </Button>
                                                    </div>
                                                )} */}
                                            </TabsContent>
                                            
                                            <TabsContent value="chargers" className="space-y-2 mt-0 flex-1 flex flex-col">
                                                <div className="flex-1 overflow-y-auto min-h-0">
                                                    {<Badge variant='secondary' className="w-full flex justify-center mb-2 bg-curo-green/50">
                                                        <div className="flex flex-col items-center gap-1">
                                                            <p className="text-sm font-medium">Select the charging station you want to start</p>
                                                            <p className="text-xs text-gray-500">Please note that statuses may be inaccurate</p>
                                                        </div>
                                                    </Badge>}
                                                    {isUpdatingLocation ? (
                                                        <div className="flex justify-center items-center py-8">
                                                            <div className="h-6 w-6 animate-spin rounded-full border-4 border-primary border-t-transparent mr-3"></div>
                                                            <span>Updating charger status...</span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                        {getVisibleChargers().map((evse: any) => (
                                                            <div 
                                                                key={evse.uid} 
                                                                className={`flex justify-between items-center py-2 border-b ${selectedEvse?.uid === evse.uid ? 'bg-curo-green p-2' : ''}`}
                                                                onClick={() => selectedEvse?.uid === evse.uid ? setSelectedEvse(null) : setSelectedEvse(evse)}
                                                            >
                                                                <div>
                                                                    <div className="font-medium">{evse.physical_reference}</div>
                                                                    {evse.locationName && (
                                                                        <div className="text-sm text-gray-500">{evse.locationName}</div>
                                                                    )}
                                                                </div>
                                                                <Badge className={`${getStatusColor(evse.status)} text-xs font-normal`}>
                                                                    {evse.status}
                                                                </Badge>
                                                            </div>
                                                        ))}
                                                        <div 
                                                            key={'unknown'} 
                                                            className={`flex justify-between items-center py-2 border-b ${selectedEvse?.uid === 'unknown' ? 'bg-curo-green p-2' : ''}`}
                                                            onClick={() => selectedEvse?.uid === 'unknown' ? setSelectedEvse(null) : setSelectedEvse({uid: 'unknown'})}
                                                        >
                                                            <div>
                                                                <div className="font-medium">{`I don't see my charger`}</div>
                                                                <div className="text-sm text-gray-500">{`Select this option and press 'Start Charging Session' if you don't see your charger or can't find it in the above list. We will find it for you.`}</div>
                                                            </div>
                                                        </div>
                                                        </>
                                                    )}
                                                </div>
                                            </TabsContent>
                                        </div>
                                    </Tabs>
                                    
                                    {/* Start Charging Button - Only shown when expanded */}
                                    <div className="p-4 border-t border-gray-100 flex-shrink-0 bg-white">
                                        <Button size="lg" className="w-full" onClick={handleStartSession} disabled={isStartingSession || (activeTab === 'chargers' && !selectedEvse)}>
                                            <span>{isStartingSession ? "Starting Session..." : "Start Charging Session"}</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Sessions Modal */}
                <SessionList 
                    sessions={sessions}
                    isVisible={showSessionsModal}
                    onClose={() => setShowSessionsModal(false)}
                    fetchSessions={async (date_from: string, date_to: string, isPolling?: boolean) => {
                        // Sessions are automatically updated via SSE, no manual fetch needed
                        console.log('Session fetch requested, but SSE handles this automatically');
                    }}
                />
            </div>
        </LoadScript>
    )
};

// Wrap with Suspense to handle useSearchParams
export default function DiscoverPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ChargersMapPage />
        </Suspense>
    );
}