"use client";
import React, { useContext, useEffect } from 'react';
import Inputitem from './inputitem';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Import icons
import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/DestinationContext';

function Searchsection() {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  useEffect(() => {
    console.log('Source:', source);
    console.log('Destination:', destination);
  }, [source, destination]);

  return (
    <div className='p-2 md:p-6 border-[2px] rounded-xl'>
      <p className='text-[20px] font-bold'>Get a Ride</p>
      <div className="space-y-2 mt-4">
        <Inputitem placeholder="Pickup Location" icon={<FaMapMarkerAlt />} type="source" />
        <Inputitem placeholder="Dropoff Location" icon={<FaMapMarkerAlt />} type="destination" />
        <button className='p-3 bg-black w-full mt-5 text-white rounded-lg'>Search</button>
      </div>
    </div>
  );
}

export default Searchsection;