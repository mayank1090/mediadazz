"use client"

import React from 'react'
import { LuSearch } from 'react-icons/lu'
import { GoShareAndroid } from "react-icons/go";

const UpperSearch = () => {
  return (
    <div className='mt-[5.5rem] lg:mt-28  p-6 flex justify-between  md:py-7 lg:px-24 xl:px-[7.75rem] '>
           <form
                    role="search"
                    aria-label="Search media"
                    className="flex items-stretch gap-[0.875rem] w-full lg:w-[70%] xl:w-[60%]"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <label htmlFor="hero-search" className="sr-only">
                      Search by media type, location, or audience
                    </label>
                    <div className="relative w-full flex gap-2.5">
                      <LuSearch
                        aria-hidden="true"
                        className="pointer-events-none hidden md:block absolute left-[1.125rem] top-1/2 -translate-y-1/2 text-balck"
                        size={24}
                      />
                      <input
                        id="hero-search"
                        name="q"
                        type="search"
                        placeholder="Search by Media type, Location or Audience"
                        className="w-full rounded-xl border outline-none border-[#EEEEEE] bg-white px-[1.125rem] md:pl-[3.25rem] md:pr-4 text-gray-800 shadow-[0px 4px 40px 0px #0000001A] placeholder:text-[#6B7280] placeholder:font-medium placeholder:text-sm placeholder:lg:text-lg"
                      />
                    </div>
                    <button
                      type="submit"
                      className="rounded-xl hidden md:block whitespace-nowrap font-satoshi bg-white text-brand px-5 py-[1.125rem] text-pretty text-xl font-bold  border border-brand hover:md:scale-[1.02]  outline-none  transition-all duration-300 ease-in-out transform"
                    >
                      Search
                    </button>
                     <button
                      type="submit"
                      className="rounded-xl md:hidden whitespace-nowrap font-satoshi bg-brand py-4 px-[1.125rem] text-pretty text-xl font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <LuSearch className=" text-white h-5 w-5"/>
                    </button>
                  </form>
                  <button className='p-[1.125rem] lg:block hidden rounded-lg border-[#EEEEEE] border'>
                    <GoShareAndroid className='w-6 h-6 text-black'/>
                  </button>
    </div>
  )
}

export default UpperSearch