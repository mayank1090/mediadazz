'use client';

import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { RiExternalLinkLine } from "react-icons/ri";

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface ProductmapProps {
  latitude?: number;
  longitude?: number;
  locationName?: string;
}

export const Productmap = ({ 
  latitude = 40.7128, 
  longitude = -74.0060, 
  locationName = "New York, NY" 
}: ProductmapProps) => {
  return (
    <div className='bg-white rounded-2xl lg:rounded-[1.125rem] p-4 lg:p-6'>
      <h3 className='flex items-center gap-3 text-xl font-bold font-satoshi mb-4'>
        <FaLocationDot className='text-brand w-4'/>
        Map
      </h3>
      
      <div className="h-64 lg:h-80 w-full max-w-full rounded-lg overflow-hidden">
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          style={{ height: '100%', width: '100%' ,}}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]}>
            <Popup>
              <div className="text-center">
                <strong>{locationName}</strong>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <button className='border font-bold text-sm font-satoshi mt-5 lg:border-2 w-full rounded-lg border-[#E0E0E0] py-2 flex justify-center text-[#6B7280] items-center gap-2.5'>
        <RiExternalLinkLine className='w-[0.875rem] h-[0.875rem]'/>
        Open in Google Maps
      </button>
    </div>
  )
}
