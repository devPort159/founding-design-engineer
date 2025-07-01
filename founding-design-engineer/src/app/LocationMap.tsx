import { useRef, useState, useEffect } from "react";
import { loadGoogleMapsApi } from '../components/GoogleMapsLoader'

// Map component with draggable marker
export const LocationMap = ({ 
    latitude, 
    longitude, 
    accuracy, 
    draggable = false, 
    onLocationChange 
}: { 
    latitude: number, 
    longitude: number, 
    accuracy: number,
    draggable?: boolean,
    onLocationChange?: (lat: number, lng: number) => void
}) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [marker, setMarker] = useState<google.maps.marker.AdvancedMarkerElement | null>(null);
    const [accuracyCircle, setAccuracyCircle] = useState<google.maps.Circle | null>(null);

    // Reference to the marker library import
    const [markerLibrary, setMarkerLibrary] = useState<{
        AdvancedMarkerElement: any,
        PinElement: any
    } | null>(null);

    useEffect(() => {
        loadGoogleMapsApi().then(async () => {
            const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as any;
            setMarkerLibrary({ AdvancedMarkerElement, PinElement });
            setMapLoaded(true);
        }).catch(err => {
            console.error("Error loading Google Maps API:", err);
        });
    }, []);

    useEffect(() => {
        if (mapLoaded && mapRef.current && !map && markerLibrary) {
            const mapInstance = new google.maps.Map(mapRef.current, {
                center: { lat: latitude, lng: longitude },
                zoom: 19,
                mapTypeId: google.maps.MapTypeId.HYBRID,
                mapTypeControl: true,
                streetViewControl: false,
                fullscreenControl: false,
                mapId: 'DEMO_MAP_ID'
            });
            setMap(mapInstance);

            // Create a marker at the location
            const markerInstance = new markerLibrary.AdvancedMarkerElement({
                position: { lat: latitude, lng: longitude },
                map: mapInstance,
                title: 'Your location',
                gmpDraggable: draggable,
            });
            setMarker(markerInstance);

            // Create a circle showing accuracy radius
            const circleInstance = new google.maps.Circle({
                strokeColor: '#3b82f6',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#3b82f6',
                fillOpacity: 0.15,
                map: mapInstance,
                center: { lat: latitude, lng: longitude },
                radius: accuracy
            });
            setAccuracyCircle(circleInstance);

            // Add drag event listener if marker is draggable
            if (draggable && onLocationChange) {
                google.maps.event.addListener(markerInstance, 'dragend', () => {
                    const position = markerInstance.position;
                    console.log('Drag end', position);
                    if (position) {
                        const newLat = position.lat;
                        const newLng = position.lng;
                        
                        // Update circle position
                        circleInstance.setCenter(position);
                        
                        // Notify parent component
                        onLocationChange(newLat, newLng);
                    }
                });
            }
        }
    }, [mapLoaded, latitude, longitude, accuracy, draggable, onLocationChange, map, markerLibrary]);

    // Update marker and circle positions when coordinates change
    useEffect(() => {
        if (map && marker && accuracyCircle) {
            const position = { lat: latitude, lng: longitude };
            marker.position = position;
            accuracyCircle.setCenter(position);
            accuracyCircle.setRadius(accuracy);
            map.setCenter(position);
        }
    }, [latitude, longitude, accuracy, map, marker, accuracyCircle]);

    return (
        <div className="w-full h-[400px] rounded-md overflow-hidden relative">
            <div ref={mapRef} className="w-full h-full"></div>
            {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
                    <p>Loading map...</p>
                </div>
            )}
        </div>
    );
};