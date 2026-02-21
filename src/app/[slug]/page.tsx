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
import Pagination from '@/components/Category/Pagination';
import { useGetCategoryQuery } from '@/store/categoryApi';
import UpperSearch from '@/components/ProductDetail/upperSearch';
import firstimage from "../../../public/first.svg";
import WishlistHeartButton from '@/components/WishlistHeartButton'
import { LuUserRound } from "react-icons/lu";
import CartButton from '@/components/CartButton'
import { useGetWishlistQuery } from '@/store/authApi';
import { LiaCarSolid } from "react-icons/lia";
import mapmarkerinactive from "../../../public/mapmarkerinactive.png"
import mapmarkeractive from "../../../public/mapmarkeractive.png"
import { TbMapSearch } from "react-icons/tb";
import { useParams } from 'next/navigation';
  
export default function CategoryPage () {
  const params = useParams();
  const slug = params?.slug as string;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Featured');
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
   const [isMapOpen, setIsMapOpen] = useState(false);
   const [CartOpen, setCartOpen] = useState(false)
   const [currentPage, setCurrentPage] = useState(1);
   const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
   
   // Get category from slug or use default
   const category = slug || 'fm-radio';
   const categoryName = slug || 'fm-radio';
   
   // Helper function to format slug: replace hyphens with spaces and capitalize words
   const formatCategoryName = (slugName: string | undefined): string => {
     if (!slugName) return '';
     return slugName
       .split('-')
       .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
       .join(' ');
   };
   
   const formattedCategoryName = formatCategoryName(slug);
   
   // Optional: Define custom mapping from component filter keys to API keys
   // If not provided, keys will be transformed automatically (lowercase, remove spaces/hyphens)
   // You can customize this mapping based on your API requirements
   const filterKeyMapping: Record<string, string> = {
     'Sub-Category': 'subcategory',
     'Locality': 'locality',
     'Audience': 'audience',
     'Nationality': 'nationality',
     'Income': 'income',
     // Add more mappings as needed, or leave empty to use auto-transformation
   };
   
   // Dynamically transform filter format from component format to API format
   const transformFiltersToAPI = (
     filters: Record<string, string[]>,
     mapping?: Record<string, string>
   ): Record<string, string[]> => {
     const apiFilters: Record<string, string[]> = {};
     
     Object.entries(filters).forEach(([key, values]) => {
       if (values && values.length > 0) {
         // Use custom mapping if provided, otherwise auto-transform
         let apiKey: string;
         if (mapping && mapping[key]) {
           apiKey = mapping[key];
         } else {
           // Auto-transform: lowercase, remove spaces and hyphens
           apiKey = key
             .toLowerCase()
             .replace(/\s+/g, '') // Remove spaces
             .replace(/-/g, ''); // Remove hyphens
         }
         
         apiFilters[apiKey] = values;
       }
     });
     
     return apiFilters;
   };
   
   // Transform filters to API format
   const apiFilters = transformFiltersToAPI(selectedFilters, filterKeyMapping);
   
   // Only include filters object if at least one filter is selected
   const filtersToSend = Object.keys(apiFilters).length > 0 ? apiFilters : undefined;

   console.log(filtersToSend);
   
  // Fetch category data using RTK Query
  const { data: categoryData, isLoading, error } = useGetCategoryQuery({
    category: category,
    category_type: 'category',
    page: currentPage,
    filters: filtersToSend,
  });

  // Fetch wishlist to determine if items are in wishlist
  const { data: wishlistData } = useGetWishlistQuery();
  
  // Create a Set of product URLs that are in the wishlist for O(1) lookup
  const wishlistProductIds = new Set(
    wishlistData?.wishlist_data?.map((item) => item.product_slug) || []
  );

  const [inactiveIcon, setInactiveIcon] = useState<Leaflet.Icon | null>(null);
  const [activeIcon, setActiveIcon] = useState<Leaflet.Icon | null>(null);

  const [activeListingId, setActiveListingId] = useState<string | null>(null);

  // Convert API listings to map format, filtering out listings without coordinates
  const mapListings = categoryData?.product_list?.listings
    ?.filter((listing) => listing.listing_latitude && listing.listing_longitude)
    .map((listing, index) => ({
      id: listing.listing_url || `listing-${index}`,
      title: listing.listing_title,
      category: listing.listing_category,
      audience: listing.listing_list?.reach_type || 'N/A',
      reach: listing.listing_list?.reach_count 
        ? `${listing.listing_list.reach_count} ${listing.listing_list.reach_type || ''}`
        : 'N/A',
      img: listing.listing_image || outdoor,
      lat: listing.listing_latitude!,
      lng: listing.listing_longitude!,
      listing: listing, // Store full listing object for popup
    })) || [];

  // Default center (Dubai) if no listings with coordinates
  const mapCenter: [number, number] = mapListings.length > 0
    ? [mapListings[0].lat, mapListings[0].lng]
    : [25.2048, 55.2708]; // Dubai coordinates

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

  // Reset filters and page when category changes
  useEffect(() => {
    setSelectedFilters({});
    setCurrentPage(1);
  }, [category]);

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

  // Show full-page loader while API call is in progress
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-sm text-gray-600 font-satoshi">Loading...</p>
        </div>
      </div>
    );
  }

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
            <p className="font-satoshi text-xs md:text-sm text-[#6B7280] font-medium">{formattedCategoryName || 'Category'}</p>
        </div>
        <div className="mt-8 md:flex gap-6 justify-between items-center">
            <div className="flex gap-[1.125rem] lg:gap-6 items-center">
                <div className="p-[1.125rem] border-2 border-brand rounded-lg lg:rounded-[0.625rem] shrink-0">
                 <Image src={outdoor} alt='outdoor' className='w-6 h-6 shrink-0'/>
                </div>
                <div className="flex flex-col gap-2.5 lg:gap-3">
                    <p className="font-medium font-satoshi text-base lg:text-lg ">{formattedCategoryName || 'Category'}</p>
                    <h4 className="text-[#6B7280] text-base font-medium font-satoshi">{categoryData?.sub_category_list?.length || 0} Sub-Categories</h4>
                </div>
            </div>

          <div className="flex mt-6 md:mt-0 gap-2 items-center">  
            <button
              onClick={() => { setActiveListingId(null); setIsMapOpen(true); }}
               disabled={mapListings.length === 0}
               className={`rounded-lg border-[#EEEEEE] bg-white border px-3 py-2 md:px-4 md:py-3 flex items-center gap-2 shadow-sm ${
                 mapListings.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
               }`}
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

       <ImageCarousel  data={categoryData?.sub_category_list || []} 
  basePath="/category/[slug]"/>
  
       <div className="flex gap-12 mt-12">
        <div className="w-[25%] shrink-0 hidden md:block">
          <Filteroptions 
            category_name={categoryName} 
            category_type="category"
            selectedFilters={selectedFilters}
            onFiltersChange={(filters) => {
              setSelectedFilters(filters);
              setCurrentPage(1); // Reset to first page when filters change
            }}
          />
        </div>
        <div className="flex-1">
          {error ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-sm text-red-600 font-satoshi">Error loading listings. Please try again.</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <h4 className="font-medium text-base font-satoshi text-[#6B7280]">
                  Showing {categoryData?.product_list?.listings?.length ? ((currentPage - 1) * 10 + 1) : 0} - {categoryData?.product_list?.listings?.length ? Math.min(currentPage * 10, categoryData.total_count) : 0} of {categoryData?.total_count || 0} Spaces
                </h4>
                {categoryData && categoryData.total_pages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={categoryData.total_pages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </div>
              <div className="hidden lg:block">
                <CategoryCatalogue listings={categoryData?.product_list?.listings || []} />
              </div>
              <div className="lg:hidden">
                <Listingcarousel listings={categoryData?.product_list?.listings || []} />
              </div>
              {categoryData && categoryData.total_pages > 1 && (
                <div className="mt-8 flex justify-end">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={categoryData.total_pages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
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
            {mapListings.length > 0 ? (
              <MapContainer
                center={mapCenter}
                zoom={14}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
                key={`map-${isMapOpen ? 'open' : 'closed'}`}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {mapListings.map((l) => {
                  const listing = l.listing;
                  return (
                    <Marker
                      key={l.id}
                      position={[l.lat, l.lng]}
                      icon={
                        activeListingId === l.id
                          ? activeIcon ?? undefined
                          : inactiveIcon ?? undefined
                      }
                      eventHandlers={{
                        click: () => {
                          setActiveListingId((cur) => (cur === l.id ? null : l.id));
                        },
                      }}
                    >
                      <Popup offset={[0, -10]}>
                        <div
                          className=" flex flex-col  cursor-pointer lg:mt-0 rounded-tr-[0.875rem] rounded-tl-[0.875rem] overflow-hidden  w-[302px]"
                        >
                          <div className="w-full relative overflow-hidden ">
                            <Image
                              width={100}
                              height={100}
                              src={listing.listing_image || firstimage}
                              alt={listing.listing_title || "Featured listing"}
                              className="w-full h-[235px] max-h-full object-cover object-center"
                            />
                            <WishlistHeartButton 
                              isInWishlist={listing.listing_url ? wishlistProductIds.has(listing.listing_url) : false} 
                              productId={listing.listing_url || ""} 
                            />
                          </div>
                          <div className="flex flex-col">
                            <div className="py-4 px-6 flex-1 shrink-0  border border-[#EEEEEE] border-t-0 gap-2">
                              <h4 className="font-satoshi font-medium text-[10px] text-brand">
                                {listing.listing_category ?? 'Category'}
                              </h4>
                              <h3 className="font-satoshi font-bold text-base mt-2">
                                {listing.listing_title ?? 'Untitled Listing'}
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
                                  {listing.listing_list?.reach_type || 'N/A'}
                                </span>
                              </div>
                            </div>
                            <div className="px-6 py-3 border flex justify-between items-center  border-[#EEEEEE] border-t-0 rounded-bl-[0.7875rem] rounded-br-[0.7875rem]">
                              <div className="flex gap-2 items-center">
                                <div className=" h-6 w-6 flex justify-center items-center bg-[#EEEEEE] rounded-full">
                                  <LiaCarSolid className="w-[1.125rem] h-[1.125rem]" />
                                </div>
                                <p className="font-bold !my-0 text-sm font-satoshi">
                                  {listing.listing_list?.reach_count || 'N/A'}
                                  {listing.listing_list?.reach_type && (
                                    <span className="font-medium font-satoshi text-xs ml-2 text-[#6B7280]">
                                      {listing.listing_list.reach_type}
                                    </span>
                                  )}
                                </p>
                              </div>
                              <CartButton product_id={listing.listing_url || ""} />
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  )
                })}
              </MapContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-gray-600 font-satoshi">No listings with location data available.</p>
              </div>
            )}
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
        <Filteroptions 
          category_name={categoryName} 
          category_type="category"
          selectedFilters={selectedFilters}
          onFiltersChange={(filters) => {
            setSelectedFilters(filters);
            setCurrentPage(1); // Reset to first page when filters change
          }}
        />
      </div>
    </div>
  </div>
)}
    </div>
  )
}
