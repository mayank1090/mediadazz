"use client"

import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { useState, useRef, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoChevronUpOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Image from 'next/image';
import outdoor from "../../../../public/billboard.jpg"
import React from 'react';
import { ImageCarousel } from '@/components/Category/ImageCarousel';
import Filteroptions from '@/components/Category/Filteroptions';
import CategoryCatalogue from '@/components/Category/CategoryCatalogue';
import Listingcarousel from '@/components/listingcarousel';
import UpperSearch from '@/components/ProductDetail/upperSearch';
import Pagination from '@/components/Category/Pagination';
import { useGetCategoryQuery } from '@/store/categoryApi';
import { useParams } from 'next/navigation';

 const sortOptions = [
    'Featured',
    'Price: Low to High',
    'Price: High to Low',
    'Newest',
    'Most Popular',
    'Rating'
  ];

  // Helper function to decode HTML entities
  const decodeHtmlEntities = (text: string | undefined): string => {
    if (!text) return '';
    if (typeof window === 'undefined') return text; // SSR safety
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

const SubCategory = () => {
  const params = useParams();
  const categoryName = (params?.slug as string) || 'outdoor-ooh-media'; // Get category from URL path segment
  const subcategoryName = (params?.subcategory as string) || 'billboards'; // Get subcategory from URL path segment

     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
      const [selectedSort, setSelectedSort] = useState('Featured');
      const [isMounted, setIsMounted] = useState(false);
      const dropdownRef = useRef<HTMLDivElement>(null);
      const [isFilterOpen, setIsFilterOpen] = useState(false);
      const [currentPage, setCurrentPage] = useState(1);
      const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

      // Optional: Define custom mapping from component filter keys to API keys
      const filterKeyMapping: Record<string, string> = {
        'Sub-Category': 'subcategory',
        'Locality': 'locality',
        'Audience': 'audience',
        'Nationality': 'nationality',
        'Income': 'income',
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

      // Fetch category data using RTK Query with category_type: 'subcategory'
      const { data: categoryData, isLoading, error } = useGetCategoryQuery({
        category: subcategoryName,
        category_type: 'subcategory',
        page: currentPage,
        filters: filtersToSend,
      });

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
  }, []);

  // Reset filters and page when category changes
  useEffect(() => {
    setSelectedFilters({});
    setCurrentPage(1);
  }, [subcategoryName]);

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
            <p className="font-satoshi text-xs md:text-sm text-[#6B7280] font-medium">Outdoor & OOH Media</p>
            <MdOutlineKeyboardArrowRight className='w-3 h-3 md:h-4 md:w-4'/>
            <p className="font-satoshi text-xs md:text-sm text-[#6B7280] font-medium">Billboards</p>
        </div>
       <div className="flex gap-8 items-center mt-8 lg:flex-row flex-col">
        <div className=" w-full lg:w-[20%] shrink-0">
        <Image 
          src={categoryData?.sub_category_image || categoryData?.sub_category_details?.sub_category_image || outdoor} 
          alt='outdoor' 
          className=' h-full w-full object-cover object-center rounded-lg '
          width={400}
          height={300}
        />
        </div>
        <div className="">
            <h4 className="font-bold font-satoshi text-2xl ">
              {decodeHtmlEntities(categoryData?.heading || categoryData?.sub_category_details?.heading)}
            </h4>
            <h6 className="font-satoshi text-base pt-1.5 font-medium text-[#6B7280]">
              {decodeHtmlEntities(categoryData?.sub_heading || categoryData?.sub_category_details?.sub_heading)}
            </h6>
        </div>
       </div>
       <div className="flex gap-12 mt-12">
        <div className="w-[25%] shrink-0 hidden md:block">
          <Filteroptions 
            category_name={categoryName} 
            category_type="subcategory"
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
          category_type="subcategory"
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

export default SubCategory