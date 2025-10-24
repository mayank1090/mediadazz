"use client"

import 'leaflet/dist/leaflet.css'                // <-- added
import dynamic from "next/dynamic";
import type * as Leaflet from 'leaflet';

// Replace direct imports with dynamic import
const MapContainer = dynamic(
  () => import("react-leaflet").then(mod => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then(mod => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then(mod => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then(mod => mod.Popup),
  { ssr: false }
);

// Also import Leaflet dynamically if you use it directly
// const L = typeof window !== "undefined" ? require("leaflet") : null;

import { LuSearch } from 'react-icons/lu'
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { useState, useRef, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoChevronUpOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Image from 'next/image';
import outdoor from "../../../public/outdoor.svg"
import React from 'react';
import { ImageCarousel } from '@/components/Category/ImageCarousel';
import Filteroptions from '@/components/Category/Filteroptions';
import CategoryCatalogue from '@/components/Category/CategoryCatalogue';
import Listingcarousel from '@/components/listingcarousel';
import UpperSearch from '@/components/ProductDetail/upperSearch';
import firstimage from "../../../public/first.svg";
import HeartButton from '@/components/HeartButton'
import { LuUserRound } from "react-icons/lu";
import CartButton from '@/components/CartButton'
import { LiaCarSolid } from "react-icons/lia";
import mapmarkerinactive from "../../../public/mapmarkerinactive.png"
import mapmarkeractive from "../../../public/mapmarkeractive.png"
import { TbMapSearch } from "react-icons/tb";
  
export default function CategoryPage () {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Featured');
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
   const [isMapOpen, setIsMapOpen] = useState(false);

  const [inactiveIcon, setInactiveIcon] = useState<Leaflet.Icon | null>(null);
  const [activeIcon, setActiveIcon] = useState<Leaflet.Icon | null>(null);

  const listings = [
    { id: 1, title: 'Mirdif city center Rd.- Tripoli', category: 'Billboards', audience: 'Students, Tourists, Shoppers …', reach: '5,00,000 cars / day', left: '45%', top: '22%', img: outdoor, lat: 25.2067, lng: 55.2793 },
    { id: 2, title: 'City Center Bridge', category: 'Billboards', audience: 'Commuters, Travelers', reach: '3,50,000 cars / day', left: '60%', top: '42%', img: outdoor, lat: 25.2090, lng: 55.2735 },
    { id: 3, title: 'Downtown Corner', category: 'Unipole', audience: 'Shoppers, Diners', reach: '2,00,000 cars / day', left: '30%', top: '60%', img: outdoor, lat: 25.2050, lng: 55.2670 },
    // add more sample listings or fetch dynamically
  ];

  const sortOptions = [
    'Featured',
    'Price: Low to High',
    'Price: High to Low',
    'Newest',
    'Most Popular',
    'Rating'
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSortSelect = (option: string) => {
    setSelectedSort(option);
    setIsDropdownOpen(false);
    // Here you can add your sorting logic
    console.log('Sorting by:', option);
  };

  useEffect(() => {
    setIsMounted(true);
    console.log("Breadcrumb/Category Section mounted");
  
    return () => {
      console.log("Breadcrumb/Category Section unmounted");
    };
  }, []);

  useEffect(() => {
    // Only run on client
    (async () => {
      const leaflet = await import('leaflet');
      // Fix default marker icons
      delete (leaflet.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      // create image icons
      setInactiveIcon(leaflet.icon({
        iconUrl: '/mapmarkerinactive.png',
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36],
        className: 'map-marker-inactive'
      }));

      setActiveIcon(leaflet.icon({
        iconUrl: '/mapmarkeractive.png',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
        className: 'map-marker-active'
      }));

      // setL(leaflet); // Remove this line
    })();
  }, []);

  return (
    <div>
           <div className='mt-[5.5rem] lg:mt-28  p-6 flex justify-between lg:items-center  md:py-7 lg:px-24 xl:px-[7.75rem] '>
          <UpperSearch/>
                  <div className='lg:block hidden relative' ref={dropdownRef}>
                    <button 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className='rounded-lg border-[#EEEEEE] border lg:p-2 xl:px-3.5 xl:py-3 flex items-center gap-3'
                    >
                      <div className='p-1.5 bg-[#EEEEEE] rounded-full flex items-center justify-center'>
                        <HiOutlineArrowsUpDown className='w-4 h-4'/>
                      </div>
                      <div className='flex flex-col gap-0.5 items-start'>
                        <span className='text-xs text-[#6B7280] font-medium font-satoshi'>Sort by</span>
                        <span className='text-sm xl:text-base font-medium font-satoshi'>{selectedSort}</span>
                      </div>
                      <div className='ml-auto'>
                        <IoIosArrowDown className='w-5 h-5' />
                      </div>
                    </button>
                    
                    {isMounted && isDropdownOpen && (
                      <div className='absolute top-full right-0 mt-2 w-64 bg-white rounded-lg border border-gray-200 shadow-lg z-50'>
                        <div className='py-2'>
                          {sortOptions.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleSortSelect(option)}
                              className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                                selectedSort === option 
                                  ? 'text-blue-600 font-semibold bg-blue-50' 
                                  : 'text-gray-700'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
    </div>

    <div className="px-6 pt-6 pb-[3.375rem] bg-[#FAFAFA] lg:px-24 xl:px-[7.75rem] lg:pb-[7.75rem]">
    <div className="flex gap-2 md:gap-2.5 items-center">
            <p className="font-satoshi text-xs md:text-sm text-[#6B7280] font-medium">Home</p>
            <MdOutlineKeyboardArrowRight className='w-3 h-3 md:h-4 md:w-4'/>
            <p className="font-satoshi text-xs md:text-sm text-[#6B7280] font-medium">Outdoor & OOH Media</p>
        </div>
        <div className="mt-8 md:flex gap-6 justify-between items-center">
            <div className="flex gap-[1.125rem] lg:gap-6 items-center">
                <div className="p-[1.125rem] border-2 border-brand rounded-lg lg:rounded-[0.625rem] shrink-0">
                 <Image src={outdoor} alt='outdoor' className='w-6 h-6 shrink-0'/>
                </div>
                <div className="flex flex-col gap-2.5 lg:gap-3">
                    <p className="font-medium font-satoshi text-base lg:text-lg ">Outdoor & OOH Media</p>
                    <h4 className="text-[#6B7280] text-base font-medium font-satoshi">19 Sub-Categories</h4>
                </div>
            </div>

          <div className="flex mt-6 md:mt-0 gap-2 items-center">  
            <button
              onClick={() => { setActiveListingId(null); setIsMapOpen(true); }}
               className='rounded-lg border-[#EEEEEE] bg-white border px-3 py-2 md:px-4 md:py-3 flex items-center gap-2 shadow-sm'
               aria-label="View on maps"
             >
               <TbMapSearch className="w-4 h-4 md:h-6 md:w-6 text-gray-700" />
               <span className='text-sm md:text-base font-medium font-satoshi'>View on maps</span>
             </button>

            <button 
             onClick={() => setIsFilterOpen(true)}
              className='rounded-lg md:hidden border-[#EEEEEE] bg-white border px-2 py-2 md:px-3.5 md:py-3 flex items-center gap-1 md:gap-3'
            >
                <span className='text-sm md:text-base font-medium font-satoshi'>Filter</span>
              <div className='ml-auto'>
                <IoIosArrowDown className='md:w-5 md:h-5 w-3 h-3' />
              </div>
            </button>
        </div>
        </div>

       <ImageCarousel/>
       <div className="flex gap-12 mt-12">
        <div className="max-w-[25%] shrink-0 hidden md:block"><Filteroptions/></div>
        <div className="flex-1">
          <h4 className="font-medium text-base font-satoshi text-[#6B7280] mb-8">Showing 1 - 24 of 556 Spaces</h4>
         <div className="hidden lg:block"> <CategoryCatalogue/></div>
         <div className="lg:hidden"><Listingcarousel/></div>
        </div>
       </div>
    </div>

    {/* NEW: Map overlay that highlights multiple listings and shows hover card */}
    {isMapOpen && (
      <div className="fixed inset-0 z-[120] flex items-start justify-center">
        {/* dim background */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => { setIsMapOpen(false); setActiveListingId(null); }}
        />

        {/* Map container */}
        <div className="relative w-[95vw] h-[85vh] mt-12 bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Close */}
          <button
            className="absolute right-4 top-4 z-40 h-8 w-8 bg-white flex items-center justify-center rounded-full shadow"
            onClick={() => { setIsMapOpen(false); setActiveListingId(null); }}
            aria-label="Close map"
          >
            ×
          </button>

          {/* REAL Leaflet map (uses listings[].lat / listings[].lng) */}
          <div className="absolute inset-0">
            {/*
              MapContainer must be rendered client-side (page is "use client").
              Markers show Popup on hover (openPopup / closePopup) and on click we set activeListingId.
            */}
            <MapContainer
              center={[listings[0].lat, listings[0].lng]}
              zoom={14}
              style={{ height: '100%', width: '100%' }}
              className="z-0"
              key={`map-${isMapOpen ? 'open' : 'closed'}`}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {listings.map((l) => {
                return (
                  <Marker
                    key={l.id}
                    position={[l.lat, l.lng]}
                    icon={activeListingId === l.id ? activeIcon : inactiveIcon}
                    eventHandlers={{
                      // remove mouseover/mouseout so popup does NOT show on hover
                      click: () => {
                        // clicking marker will open its Popup by default
                        // use activeListingId for any additional UI state you need
                        setActiveListingId((cur) => (cur === l.id ? null : l.id));
                      },
                    }}
                  >
                    <Popup offset={[0, -10]}>
                      {/* existing popup card content */}
                      <div
                        className=" flex flex-col  cursor-pointer lg:mt-0 rounded-tr-[0.875rem] rounded-tl-[0.875rem] overflow-hidden  w-[302px]"
                      >
                        <div className="w-full relative overflow-hidden ">
                          <Image
                            width={100}
                            height={100}
                            src={firstimage}
                            alt="Featured listing"
                            className="w-full h-[235px] max-h-full object-cover object-center"
                          />
                          <HeartButton itemId={`billboard-${l.id}`} />
                        </div>
                        <div className="flex flex-col">
                          <div className="py-4 px-6 flex-1 shrink-0  border border-[#EEEEEE] border-t-0 gap-2">
                            <h4 className="font-satoshi font-medium text-[10px] text-brand">
                              {l.category ?? 'Outdoor & OOH Media'}
                            </h4>
                            <h3 className="font-satoshi font-bold text-base mt-2">
                              {l.title ?? 'Static Billboard'}
                            </h3>
                          </div>
                          <div className="px-6 py-2.5 border border-[#EEEEEE] border-t-0">
                            <p className="font-medium !my-0 font-satoshi text-xs text-[#6B7280]">
                              Audience
                            </p>
                            <div className="flex mt-1.5 gap-2.5 items-center">
                              <div className="p-1.5  h-6 w-6 flex justify-center items-center bg-[#EEEEEE] rounded-full">
                                <LuUserRound className="w-[1.125rem] h-[1.125rem]" />
                              </div>
                              <span className="font-bold text-sm font-satoshi truncate block max-w-full">
                                {l.audience ?? 'Commuters, Drivers'}
                              </span>
                            </div>
                          </div>
                          <div className="px-6 py-3 border flex justify-between items-center  border-[#EEEEEE] border-t-0 rounded-bl-[0.7875rem] rounded-br-[0.7875rem]">
                            <div className="flex gap-2 items-center">
                              <div className=" h-6 w-6 flex justify-center items-center bg-[#EEEEEE] rounded-full">
                                <LiaCarSolid className="w-[1.125rem] h-[1.125rem]" />
                              </div>
                              <p className="font-bold !my-0 text-sm font-satoshi">
                                {'1000'}
                                <span className="font-medium font-satoshi text-xs ml-2 text-[#6B7280]">
                                  Cars / day
                                </span>
                              </p>
                            </div>
                            <CartButton setCartOpen={setCartOpen} />
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                )
              })}
            </MapContainer>
          </div>
        </div>
      </div>
    )}

    {isFilterOpen && (
  <div className="fixed inset-0 z-[100] flex md:hidden">
    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/40"
      onClick={() => setIsFilterOpen(false)}
    />
    {/* Drawer */}
    <div className="relative bg-white h-full w-[90vw] max-w-xs shadow-2xl animate-slideInLeft">
      <div className="flex justify-end p-4">
        <button
          onClick={() => setIsFilterOpen(false)}
          className="text-2xl font-bold"
          aria-label="Close filter"
        >
          &times;
        </button>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-4rem)] px-4 pb-8">
        <Filteroptions />
      </div>
    </div>
  </div>
)}
    </div>
  )
}
