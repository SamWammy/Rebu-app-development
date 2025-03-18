"use client";
import React, { useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/DestinationContext';

const GooglePlacesAutocomplete = dynamic(
  () => import('react-google-places-autocomplete'),
  { ssr: false }
);

function Inputitem({ placeholder, icon, type }) {
  const [value, setValue] = useState(null);
  const { setSource } = useContext(SourceContext);
  const { setDestination } = useContext(DestinationContext); // Use setDestination consistently

  const getlatAndLng = (place, type) => {
    const placeId = place.value.place_id;

    if (window.google && window.google.maps) {
      const service = new window.google.maps.places.PlacesService(document.createElement('div'));

      service.getDetails({ placeId }, (place, status) => {
        if (status === 'OK' && place.geometry && place.geometry.location) {
          const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name,
          };

          if (type === 'source') {
            setSource(location);
          } else {
            setDestination(location); // Use setDestination consistently
          }
        } else {
          console.error('Error fetching place details:', status);
        }
      });
    } else {
      console.error('Google Maps API is not loaded.');
    }
  };

  return (
    <div className="bg-slate-200 flex items-center border border-gray-300 rounded-lg p-3 hover:border-gray-400 focus-within:border-blue-500">
      {icon && <span className="text-gray-500 mr-2">{icon}</span>}
      <GooglePlacesAutocomplete
        
        selectProps={{
          value,
          onChange: (place) => {
            getlatAndLng(place, type);
            setValue(place);
          },
          placeholder: placeholder,
          isClearable: true,
          className: 'w-full',
          styles: {
            control: (provided) => ({
              ...provided,
              border: 'none',
              boxShadow: 'none',
              width: '100%',
              background: 'transparent',
            }),
            placeholder: (provided) => ({
              ...provided,
              color: '#6B7280',
            }),
          },
        }}
      />
    </div>
  );
}

export default Inputitem;