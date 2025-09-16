'use client';

import UpperSearch from '@/components/ProductDetail/upperSearch'
import React from 'react';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import outdoor from "../../../public/outdoor.svg";
import Image from 'next/image';
import { CiHeart } from "react-icons/ci";
import market from "../../../public/marketforth.png"
import showmedia from "../../../public/showmedia.svg"
import Uppergrid from '@/components/ProductDetail/uppergrid';
import Insights from '@/components/ProductDetail/insights';
import BusinessCategory from '@/components/ProductDetail/businesscategory';
import { PiClockCountdownLight } from "react-icons/pi";
import Pointstoconsider from '@/components/ProductDetail/pointstoconsider';
import dynamic from 'next/dynamic';

const Productmap = dynamic(
  () => import('@/components/ProductDetail/productmap').then((mod) => mod.Productmap),
  { ssr: false }
);
import TargetAudience from '@/components/ProductDetail/targetaudience';
import Marketfriendly from '@/components/ProductDetail/Marketfriendly';
import { ProductFAQ } from '@/components/ProductDetail/ProductFAQ';
import FeatureListing from '@/components/FeaturedListing';
import Campaigns from '@/components/Campaigns';
import { IoPricetagOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";

const ProductDetail = () => {
  return (
    <div>
      <UpperSearch/>
      <div className="px-6 pt-6 pb-[3.375rem] bg-[#FAFAFA] lg:px-24 xl:px-[7.75rem] lg:pb-[7.75rem]">
        <div className="flex gap-2 md:gap-2.5 items-center">
            <p className="font-satoshi text-xs md:text-sm text-[#6B7280] font-medium">Home</p>
            <MdOutlineKeyboardArrowRight className='w-3 h-3 md:h-4 md:w-4'/>
            <p className="font-satoshi text-xs md:text-sm text-[#6B7280] font-medium">Outdoor & OOH Media</p>
            <MdOutlineKeyboardArrowRight className='w-3 h-3 md:h-4 md:w-4'/>
            <p className="font-satoshi text-xs md:text-sm text-[#6B7280] font-medium">LED Unipole</p>
        </div>
        <div className="mt-8 flex gap-6 justify-between items-center">
            <div className="flex gap-[1.125rem] lg:gap-6 items-center">
                <div className="p-5 border-2 border-brand rounded-lg lg:rounded-[0.625rem] shrink-0">
                 <Image src={outdoor} alt='outdoor' className='w-7 h-7 shrink-0'/>
                </div>
                <div className="flex flex-col gap-2.5 lg:gap-3">
                    <p className="font-medium font-satoshi text-xs lg:text-base text-brand ">Billboards</p>
                    <p className="font-medium font-satoshi text-base lg:text-[1.75rem] ">LED Unipole on Deira Al Maktoum Bridge Road </p>
                </div>
            </div>

            <button className='bg-white border-[#EEEEEE] border rounded-full p-3 lg:p-4'>
                <CiHeart className='h-[1.125rem] w-[1.125rem] lg:w-6 lg:h-6'/>
            </button>
        </div>

        <div className="flex gap-5 min-h-[15.625rem] lg:min-h-[31.25rem] mt-12">
            <Image src={market} alt='market' className='rounded-[0.875rem] shrink-0 w-[62%] object-cover object-center '/>
            <div className="flex flex-col gap-5 relative ">
            <Image src={market} alt='market' className='rounded-[0.875rem]  flex-1 object-cover object-center '/>
            <Image src={market} alt='market' className='rounded-[0.875rem]  flex-1 object-cover object-center'/>
            <button className='py-2.5 px-4 shadow-[box-shadow: 0px 4px 40px 0px #0000001A] rounded-lg  hidden absolute bottom-0 right-0 lg:flex items-center gap-2.5 bg-white mr-4 mb-4 font-bold font-satoshi text-base'>
              <Image src={showmedia} alt='show media' className='w-[1.125rem] h-[1.125rem]'/>
              Show all Media</button>
            </div>
        </div>
        <div className="mt-6 md:mt-10 lg:mt-12 flex gap-8">
          <div className="lg:w-[65%] lg:shrink-0 space-y-9 lg:space-y-12">
            <Uppergrid/>
            <div className="">
            <h3 className='font-bold font-satoshi text-xl '>About this Media</h3>
            <p className="text-base mt-5 font-medium font-satoshi lg:text-lg text-[#6B7280]">High-visibility LED unipole positioned on the Maktoum Bridge to Deira City Centre route, capturing commuters, shoppers, and tourists with long dwell times and premium sightlines.It’s located near The Canadian University and Shangri La Hotel behind of Sheikh Zayed Road also very close the world famous Burj Khalifa. It can be seen by all traffic coming from Diyafa Street, Bur Dubai towards Mazaya Centre, Safa Park & Sheikh Zayed Road.</p>
          </div>
          <Insights/>
          <BusinessCategory/>
          <div className="">
          <h2 className="gap-3.5 flex items-center text-2xl font-bold font-satoshi ">
    <PiClockCountdownLight className="w-6 h-6" />
    Past Brands & Industries Featured
  </h2>
          <div className="flex flex-wrap gap-3.5 mt-6 lg:mt-7">
       {["Automotive OEMs","Premium Retail","Real Estate Developers","Telecom & Devices","Banks & Fintech"].map((item, index)=><div key={index}  className="flex-wrap py-[1.125rem] px-6 bg-white text-center shrink-0  rounded-full border border-[#EEEEEE] font-medium font-satoshi text-base">
          {item}
        </div>)}
      </div>
          </div>
          <Pointstoconsider/>
          <Productmap/>
          <TargetAudience/>
          <Marketfriendly/>
          <ProductFAQ/>
          </div>
          <div className="lg:flex  hidden flex-col gap-6 w-full">
            <button className='font-medium text-xl font-satoshi flex justify-center gap-2 items-center border border-[#EEEEEE] w-full rounded-lg py-2 bg-white'><IoPricetagOutline className='w-5 h-5'/>Price on Request</button>
            <button className="px-[1.125rem] text-white cursor-pointer py-4 bg-brand w-full rounded-lg text-xl font-satoshi font-bold mx-auto justify-center hover:md:bg-gradient-to-r hover:md:from-orange-600 hover:md:to-orange-700 hover:md:shadow-lg flex items-center  hover:md:shadow-orange-500/25 hover:md:scale-[1.02]  outline-none  transition-all duration-300 ease-in-out transform gap-2.5"><span className='flex items-center gap-1'> <FaPlus/> <IoMdCart/> </span>Add to cart</button>
          </div>
        </div>
      </div>
      <FeatureListing/>
      <Campaigns heading='Your brand deserves to shine where it matters most'  buttonText='Request a Custom plan'/>
    </div>
  )
}

export default ProductDetail

