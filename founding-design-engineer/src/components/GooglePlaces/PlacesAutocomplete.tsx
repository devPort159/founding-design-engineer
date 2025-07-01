import { useEffect } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Input } from '@/components/ui/input';

// Places Autocomplete component
export function PlacesAutocomplete({ 
    value, 
    onChange, 
    onSelectAddress 
}: { 
    value: string, 
    onChange: (value: string) => void,
    onSelectAddress?: (address: string, lat: number, lng: number) => void
}) {
    const {
        ready,
        value: inputValue,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            componentRestrictions: { country: 'us' },
        },
        debounce: 300,
        defaultValue: value,
    });

    // useEffect(() => {
    //     setValue(value);
    // }, [value, setValue]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onChange(e.target.value);
    };

    const handleSelect = async (suggestion: { description: string }) => {
        setValue(suggestion.description, false);
        onChange(suggestion.description);
        clearSuggestions();
        
        if (onSelectAddress) {
            try {
                const results = await getGeocode({ address: suggestion.description });
                const { lat, lng } = await getLatLng(results[0]);
                onSelectAddress(suggestion.description, lat, lng);
            } catch (error) {
                console.error("Error getting geocode: ", error);
            }
        }
    };

    return (
        <div className="relative">
            <Input
                type="text"
                value={inputValue}
                onChange={handleInput}
                disabled={!ready}
                placeholder="Enter target address"
                className="w-full"
            />
            {status === 'OK' && (
                <ul className="absolute z-10 w-full bg-white shadow-lg rounded-md mt-1 border">
                    {data.map((suggestion) => {
                        const { place_id, description } = suggestion;
                        return (
                            <li
                                key={place_id}
                                onClick={() => handleSelect(suggestion)}
                                className="p-2 cursor-pointer hover:bg-gray-100"
                            >
                                {description}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
} 