"use client"

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



export default function CategoryPage () {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Featured');
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);



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
            {/* <MdOutlineKeyboardArrowRight className='w-3 h-3 md:h-4 md:w-4'/>
            <p className="font-satoshi text-xs md:text-sm text-[#6B7280] font-medium">LED Unipole</p> */}
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
                    //   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className='rounded-lg border-[#EEEEEE] bg-white border px-2 py-2 md:px-3.5 md:py-3 flex items-center gap-1 md:gap-3'
                    >
                     
                        <span className='text-sm md:text-base font-medium font-satoshi'>View all</span>
                     
                      <div className='ml-auto'>
                        <IoIosArrowDown className='md:w-5 md:h-5 w-3 h-3' />
                      </div>
                    </button >
                      <button 
                    //   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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
