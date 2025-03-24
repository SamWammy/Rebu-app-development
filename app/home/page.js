"use client";
import { UserButton } from '@clerk/nextjs';
import SearchSection from '../../components/Home/searchsection';
import GoogleMapsSection from '../../components/Home/GoogleMapsSection';
import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/DestinationContext';
import { useState, useEffect } from 'react';
import { LoadScript } from '@react-google-maps/api';

export default function HomePage() {
  const [source, setSource] = useState(null); 
  const [destination, setDestination] = useState(null); 

  useEffect(() => {
    console.log('Source:', source);
    console.log('Destination:', destination);
  }, [source, destination]);

  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <LoadScript 
        libraries={['places']}
        googleMapsApiKey='Removed from github for privacy, will update later'>
        <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-5'>
          <div>
            <SearchSection />
          </div>
          <div className='col-span-2'>
            <GoogleMapsSection />
          </div>
        </div>
        </LoadScript>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}
