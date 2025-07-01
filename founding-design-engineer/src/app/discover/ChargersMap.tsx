'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Libraries, Circle } from "@react-google-maps/api";

interface MapComponentProps {
    map: google.maps.Map | null;
    setMap: (map: google.maps.Map | null) => void;
    isMounted: boolean;
    mapId: string; // Add mapId prop
    pins: any[];
    selectedPin: any | null; // Add this prop
    onSelectPin: (pin: any) => void;
    userLocation: any | null;
    selectedEvse: any | null;
    onSelectEvse: (evse: any) => void;
}

// Define types for advanced markers
type AdvancedMarkerType = any;
type PinElementType = any;
type MarkerRegistryType = Map<string, AdvancedMarkerType>;

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: 37.7749,
    lng: -122.4194
};

// Generate a stable marker ID for each pin
const getMarkerId = (pin: any): string => {
    if (pin.isEvse) {
        return `evse_${pin.uid}`;
    } else if (pin.isGrouped) {
        return `group_${pin.groupId}`;
    } else {
        // Use unique identifiers from the pin's location data
        const location = pin.locationData;
        const evseId = location.evse_id || location.uid || 'unknown';
        return `individual_${evseId}_${location.id || Math.random().toString(36).substring(2, 9)}`;
    }
};

// Helper function to determine if a pin represents a fast charger (L3+)
const isFastCharger = (pin: any): boolean => {
    if (!pin) return false;
    
    // Use the hasFastChargers property if available
    if (pin.hasFastChargers !== undefined) {
        return pin.hasFastChargers;
    }
    
    if (!pin.locationData) return false;
    
    // For grouped pins, check if any charger in the group is fast
    if (pin.isGrouped && pin.locations) {
        return pin.locations.some((location: any) => {
            if (!location.evse) return false;
            return location.evse.some((evse: any) => {
                if (!evse.connectors) return false;
                return evse.connectors.some((connector: any) => {
                    const powerType = (connector.power_type || '').toUpperCase();
                    return powerType === 'DC' || powerType.startsWith('DC');
                });
            });
        });
    }
    
    // For individual pins
    const location = pin.locationData;
    if (!location.evse) return false;
    
    return location.evse.some((evse: any) => {
        if (!evse.connectors) return false;
        return evse.connectors.some((connector: any) => {
            const powerType = (connector.power_type || '').toUpperCase();
            return powerType === 'DC' || powerType.startsWith('DC');
        });
    });
};

    

export const ChargersMap = React.memo<MapComponentProps>(({
    map,
    setMap,
    isMounted,
    mapId,
    pins,
    selectedPin,
    onSelectPin,
    userLocation,
    selectedEvse,
    onSelectEvse
}) => {
    // Use a persistent marker registry instead of a state array
    const markerRegistry = useRef<MarkerRegistryType>(new Map());
    const [markerLibrary, setMarkerLibrary] = useState<{
        AdvancedMarkerElement: any,
        PinElement: any
    } | null>(null);
    const [startLocation, setStartLocation] = useState<any>(center);
    const userLocationOverlay = useRef<any>(null);
    
    // Keep track of the last set of pin IDs to identify changes
    const lastPinIds = useRef<Set<string>>(new Set());

    useEffect(() => {
        // Only update startLocation on initial mount or if it hasn't been set yet
        if (userLocation && startLocation === center && userLocation.lat && userLocation.lng) {
            setStartLocation(userLocation);
        }
    }, [userLocation, startLocation]);

    // Load the marker library
    useEffect(() => {
        if (isMounted && map && !markerLibrary) {
            const loadMarkerLibrary = async () => {
                try {
                    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as any;
                    setMarkerLibrary({ AdvancedMarkerElement, PinElement });
                } catch (error) {
                    console.error("Error loading marker library:", error);
                }
            };
            loadMarkerLibrary();
        }
    }, [isMounted, map, markerLibrary]);

    // Create marker element SVG
    const createMarkerElement = (pin: any): HTMLDivElement => {
        const isSelected = pin.isSelected === true;
        const isActive = pin.isActive === true;
        const isGrouped = pin.isGrouped === true;
        const isEvse = pin.isEvse === true;
        const isFast = isFastCharger(pin);
        const isSelectedEvse = selectedEvse?.uid === pin.uid;
        
        const element = document.createElement('div');
        
        // Determine fill color based on conditions
        let fillColor;
        let textColor;
        const strokeColor = '#FFFFFF';
        let zIndex = 1;
        
        if (isSelected) {
            fillColor = '#F97316';
            textColor = '#000000';
        } else if (isActive) {
            fillColor = isFast ? '#4FE11580' : '#7B7B7B80';
            textColor = isFast ? '#000000' : '#000000';
        } else if (isGrouped) {
            // For grouped pins - green if any charger is fast, otherwise grey
            fillColor = isFast ? '#4FE115' : '#7B7B7B';
            textColor = isFast ? '#000000' : '#000000';
        } else if (isEvse && !selectedEvse) {
            // For EVSE pins - color based on status
            const status = pin.status?.toLowerCase() || 'unknown';
            switch (status) {
                case 'available':
                    fillColor = '#4FE115'; // Green
                    textColor = '#000000';
                    break;
                case 'charging':
                    fillColor = '#2196F3'; // Blue
                    textColor = '#FFFFFF';
                    break;
                case 'occupied':
                    fillColor = '#FF9800'; // Orange
                    textColor = '#000000';
                    break;
                case 'out_of_order':
                case 'faulted':
                    fillColor = '#F44336'; // Red
                    textColor = '#FFFFFF';
                    break;
                default:
                    fillColor = '#9E9E9E'; // Grey for unknown
                    textColor = '#000000';
            }
        } else if (isEvse && selectedEvse) {
            if (isSelectedEvse) {
                fillColor = '#4FE115';
                textColor = '#000000';
                zIndex = 1000;
            } else {
                fillColor = '#7B7B7B';
                textColor = '#000000';
            }
            
        } else {
            // For individual pins (when group is split) - semi-transparent green or grey
            fillColor = isFast ? '#4FE11580' : '#7B7B7B80';
            textColor = isFast ? '#000000' : '#000000';
        }
        
        if (isEvse) {
            // Create a square marker for EVSE pins
            const connectorCount = pin.connectorCount || 1;
            const displayText = '' //connectorCount > 1 ? connectorCount.toString() : '';
            
            element.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="4" 
                          fill="${fillColor}" 
                          stroke="${strokeColor}" 
                          stroke-width="2" />
                    ${displayText ? `<text x="16" y="20" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" fill="${textColor}">${displayText}</text>` : ''}
                </svg>
            `;
        } else {
            // Create the standard pin marker for location pins
            const count = pin.count || 0;
            element.innerHTML = `
                <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 0C8.059 0 0 8.059 0 18C0 31.5 18 48 18 48C18 48 36 31.5 36 18C36 8.059 27.941 0 18 0Z" 
                          fill="${fillColor}" />
                    <circle cx="18" cy="18" r="14" fill="white" />
                    <text x="18" y="23" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="${textColor}">${count}</text>
                </svg>
            `;
        }
        
        // Add subtle animation for grouped pins to draw attention
        if (isGrouped) {
            element.style.transform = 'scale(1.1)';  // Make grouped pins slightly larger
        }
        element.style.cursor = 'pointer';
        return element;
    };
    
    // Update an existing marker's appearance without recreating it
    const updateMarkerAppearance = (marker: AdvancedMarkerType, pin: any): void => {
        if (!marker) return;
        
        const element = createMarkerElement(pin);
        marker.content = element;
        
        // Update z-index based on selection state and fast charging capability
        const isSelected = pin.isSelected === true;
        const isActive = pin.isActive === true;
        const isFast = isFastCharger(pin);
        
        // Fast chargers get a higher z-index within their category
        let zIndex = 1;
        if (isSelected) {
            zIndex = 1000;
        } else if (isActive) {
            zIndex = isFast ? 600 : 500;
        } else {
            zIndex = isFast ? 200 : 100;
        }
        
        marker.zIndex = zIndex;
    };
    
    // Create a new marker and add it to the registry
    const createMarker = (pin: any): AdvancedMarkerType => {
        if (!map || !markerLibrary) return null;
        
        const lat = Number(pin.latitude) || 0;
        const lng = Number(pin.longitude) || 0;
        const element = createMarkerElement(pin);
        const isSelected = pin.isSelected === true;
        const isActive = pin.isActive === true;
        const isFast = isFastCharger(pin);
        
        // Fast chargers get a higher z-index within their category
        let zIndex = 1;
        if (isSelected) {
            zIndex = 1000;
        } else if (isActive) {
            zIndex = isFast ? 600 : 500;
        } else {
            zIndex = isFast ? 200 : 100;
        }
        
        // Create appropriate title based on pin type
        let title;
        if (pin.isEvse) {
            title = `${pin.physical_reference} - ${pin.status} (${pin.connectorCount} connector${pin.connectorCount !== 1 ? 's' : ''})`;
        } else {
            title = `Location with ${pin.count} charging points`;
        }

        // Create the advanced marker
        const marker = new markerLibrary.AdvancedMarkerElement({
            position: { lat, lng },
            map: map,
            title: title,
            content: element,
            zIndex: zIndex
        });
        
        // Add click handler only for non-EVSE pins
        if (!pin.isEvse) {
            marker.addListener('gmp-click', () => {
                if (onSelectPin) {
                    onSelectPin(pin);
                }
            });
        }
        if (pin.isEvse) {
            marker.addListener('gmp-click', () => {
                if (onSelectEvse) {
                    onSelectEvse(pin);
                }
            });
        }
        
        return marker;
    };
    
    // Efficient marker management
    useEffect(() => {
        if (!map || !markerLibrary) return;
        
        // Get all current pin IDs
        const currentPinIds = new Set(pins.map(getMarkerId));
        
        // 1. Remove markers that are no longer present
        for (const [id, marker] of markerRegistry.current.entries()) {
            if (!currentPinIds.has(id)) {
                marker.map = null; // Remove from map
                markerRegistry.current.delete(id);
            }
        }
        
        // 2. Update existing or create new markers
        pins.forEach(pin => {
            const id = getMarkerId(pin);
            
            if (markerRegistry.current.has(id)) {
                // Update existing marker
                updateMarkerAppearance(markerRegistry.current.get(id), pin);
            } else {
                // Create new marker
                const marker = createMarker(pin);
                if (marker) {
                    markerRegistry.current.set(id, marker);
                }
            }
        });
        
        // Update last pin IDs for next comparison
        lastPinIds.current = currentPinIds;
        
    }, [map, pins, markerLibrary, onSelectPin]);
    
    // Clean up markers on unmount
    useEffect(() => {
        return () => {
            // Remove all markers from the map
            for (const marker of markerRegistry.current.values()) {
                marker.map = null;
            }
            markerRegistry.current.clear();
            
            // Remove user location overlay
            if (userLocationOverlay.current) {
                userLocationOverlay.current.setMap(null);
                userLocationOverlay.current = null;
            }
        };
    }, []);

    // Handle user location marker
    useEffect(() => {
        if (!map || !userLocation || !userLocation.lat || !userLocation.lng || typeof google === 'undefined') {
            // Remove existing overlay if no user location
            if (userLocationOverlay.current) {
                userLocationOverlay.current.setMap(null);
                userLocationOverlay.current = null;
            }
            return;
        }

        // Define the custom overlay class inside useEffect to ensure google.maps is available
        class UserLocationOverlay extends google.maps.OverlayView {
            private position: google.maps.LatLng;
            private accuracy: number;
            private div: HTMLDivElement | null = null;

            constructor(position: google.maps.LatLng, accuracy: number) {
                super();
                this.position = position;
                this.accuracy = accuracy;
            }

            onAdd() {
                this.div = document.createElement('div');
                this.div.style.position = 'absolute';
                this.div.style.transform = 'translate(-50%, -50%)';
                this.div.style.pointerEvents = 'none'; // Don't interfere with map interactions
                
                const panes = this.getPanes();
                if (panes) {
                    // Use floatPane instead of overlayLayer to ensure it appears above markers
                    panes.floatPane.appendChild(this.div);
                }
            }

            draw() {
                if (!this.div) return;
                
                const overlayProjection = this.getProjection();
                if (!overlayProjection) return;
                
                const pos = overlayProjection.fromLatLngToDivPixel(this.position);
                if (!pos) return;
                
                // Calculate the pixel radius based on accuracy
                const zoom = this.getMap()?.getZoom() || 15;
                const metersPerPixel = 156543.03392 * Math.cos(this.position.lat() * Math.PI / 180) / Math.pow(2, zoom);
                const pixelRadius = this.accuracy / metersPerPixel;
                
                // Update div position and size
                this.div.style.left = pos.x + 'px';
                this.div.style.top = pos.y + 'px';
                this.div.style.width = (pixelRadius * 2) + 'px';
                this.div.style.height = (pixelRadius * 2) + 'px';
                
                // Create the visual representation
                this.div.innerHTML = `
                    <div style="
                        position: relative;
                        width: 100%;
                        height: 100%;
                        pointer-events: none;
                    ">
                        <!-- Accuracy circle -->
                        <div style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 100%;
                            height: 100%;
                            background-color: rgba(33, 150, 243, 0.15);
                            border: 2px solid rgba(33, 150, 243, 0.3);
                            border-radius: 50%;
                        "></div>
                        <!-- User dot -->
                        <div style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 16px;
                            height: 16px;
                            background-color: #2196F3;
                            border: 3px solid white;
                            border-radius: 50%;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                            z-index: 1;
                        "></div>
                    </div>
                `;
            }

            onRemove() {
                if (this.div && this.div.parentElement) {
                    this.div.parentElement.removeChild(this.div);
                    this.div = null;
                }
            }

            updatePosition(position: google.maps.LatLng, accuracy: number) {
                this.position = position;
                this.accuracy = accuracy;
                this.draw();
            }
        }

        const position = new google.maps.LatLng(userLocation.lat, userLocation.lng);
        const accuracy = userLocation.accuracy || 50; // Default to 50m if no accuracy provided

        if (userLocationOverlay.current) {
            // Update existing overlay
            userLocationOverlay.current.updatePosition(position, accuracy);
        } else {
            // Create new overlay
            userLocationOverlay.current = new UserLocationOverlay(position, accuracy);
            userLocationOverlay.current.setMap(map);
        }

        // Listen for zoom changes to redraw the overlay
        const zoomListener = map.addListener('zoom_changed', () => {
            if (userLocationOverlay.current) {
                userLocationOverlay.current.draw();
            }
        });

        return () => {
            google.maps.event.removeListener(zoomListener);
        };
    }, [map, userLocation]);

    // Center and zoom map when a pin is selected
    useEffect(() => {
        if (!map || !selectedPin) return;
        
        const lat = Number(selectedPin.latitude) || 0;
        const lng = Number(selectedPin.longitude) || 0;
        
        if (lat && lng) {
            // Animate to the selected location
            map.panTo({ lat: lat - 0.0002, lng }); // Offset slightly upward by subtracting a small amount from latitude
            
            // Set an appropriate zoom level (15 is good for seeing the location detail)
            setTimeout(() => {
                map.setZoom(20);
            }, 300); // Small delay to allow pan animation to start
        }
    }, [map, selectedPin]);

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={startLocation}
            zoom={14}
            onLoad={(map) => setMap(map)}
            options={{
                disableDefaultUI: true,
                mapTypeControl: true,
                streetViewControl: false,
                fullscreenControl: false,
                mapId: mapId
            }}
        >
        </GoogleMap>
    );
});

ChargersMap.displayName = 'ChargersMap';
