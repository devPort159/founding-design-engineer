// src/components/GoogleMapsLoader.ts
export const loadGoogleMapsApi = (): Promise<void> => {
    // If already loaded with drawing library, return a resolved promise
    if (window.google && window.google.maps && window.google.maps.drawing) {
      return Promise.resolve();
    }
    
    // If we already have a loading promise, return it
    if ((window as any).__googleMapsPromise) {
      return (window as any).__googleMapsPromise;
    }
    
    // Create a new loading promise
    const promise = new Promise<void>((resolve) => {
        // Remove any existing script
        const existingScript = document.getElementById('google-maps-script');
        if (existingScript) {
            existingScript.remove();
        }
        
        const script = document.createElement('script');
        script.id = 'google-maps-script';
        // Include all libraries you need across the app
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=drawing,places,marker`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            // Verify the drawing library is available
            if (window.google && window.google.maps && window.google.maps.drawing) {
                resolve();
            } else {
                console.error('Google Maps drawing library failed to load, retrying...');
                // If drawing isn't loaded, try again with a short timeout
                setTimeout(() => {
                    if (window.google && window.google.maps && window.google.maps.drawing) {
                        resolve();
                    } else {
                        console.error('Google Maps drawing library still not available after retry');
                        resolve(); // Resolve anyway to prevent hanging
                    }
                }, 1000);
            }
        };
        document.head.appendChild(script);
    });
    
    // Store promise on window for reuse
    (window as any).__googleMapsPromise = promise;
    return promise;
};