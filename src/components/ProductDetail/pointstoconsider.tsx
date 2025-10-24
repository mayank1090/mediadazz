import React from 'react'
import { LiaListSolid } from "react-icons/lia";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiAdvertisementLine } from "react-icons/ri";

const Pointstoconsider = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <div>
         <h2 className="gap-3.5 flex items-center text-2xl font-bold font-satoshi ">
    <LiaListSolid className="w-6 h-6" />
    Points to Consider
  </h2>
  <div className={`${!isLoggedIn ? "min-h-60" : "min-h-0"} relative mt-6 lg:mt-7 border-[#EEEEEE] border bg-white rounded-2xl`}>
          <div className="p-6 border-b border-[#EEEEEE] flex items-center gap-2.5">
            <FaArrowRightLong className="text-brand w-6 shrink-0" />
            <h4 className="font-medium font-satoshi text-base">
            Creative should use bold contrast and short copy for distance legibility.
            </h4>
          </div>
          <div className="p-6 border-b border-[#EEEEEE] flex items-center gap-2.5">
            <FaArrowRightLong className="text-brand w-6 shrink-0" />
            <h4 className="font-medium font-satoshi text-base">
            Plan for dynamic rotations and day-parting if required.
            </h4>
          </div>
          <div className="p-6 border-b border-[#EEEEEE] flex items-center gap-2.5">
            <FaArrowRightLong className="text-brand w-6 shrink-0" />
            <h4 className="font-medium font-satoshi text-base">
            Coordinate with nearby events for incremental lifts.
            </h4>
          </div>
          <div className="p-6  flex items-center gap-2.5">
            <FaArrowRightLong className="text-brand w-6 shrink-0" />
            <h4 className="font-medium font-satoshi text-base">
            Peak impact during evening hours with illuminated display.
            </h4>
          </div>
          {!isLoggedIn && (
      <div className="absolute z-10 w-full h-full top-0 left-0 min-h-28 flex flex-col items-center justify-center bg-[#0000000D] backdrop-blur-md  px-4 py-8">
        <h3 className="font-bold font-satoshi text-center text-lg md:text-2xl mb-2">Log in to view all Insights</h3>
        <p className="text-[#6B7280] text-center text-sm md:text-base mb-5">Bunch of Public insights backed by Data at your Fingertips</p>
        <button className="bg-brand text-white font-bold font-satoshi rounded-lg px-8 py-3 text-base md:text-lg">Log in</button>
      </div>
    )}
        </div>
        <div className="mt-6 md:mt-10 lg:mt-12">
        <h2 className="gap-3.5 flex items-center text-2xl font-bold font-satoshi ">
    <RiAdvertisementLine className="w-6 h-6" />
    Why Advertise in Deira?
  </h2>
  <div className={`${!isLoggedIn ? "min-h-60" : "min-h-0"} relative mt-6 lg:mt-7 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5`}>
    <div className="bg-white rounded-2xl border-[#EEEEEE]  p-4 lg:p-[1.125rem] font-medium font-satoshi text-base">
    🎯 Dense Indian population
    </div>
    <div className="bg-white rounded-2xl border-[#EEEEEE]  p-4 lg:p-[1.125rem] font-medium font-satoshi text-base">
    🎯 Tourist hotspots and retail zones
    </div>
    {!isLoggedIn && (
      <div className="absolute z-10 w-full h-full top-0 left-0 min-h-28 flex flex-col items-center justify-center bg-[#0000000D] backdrop-blur-md  px-4 py-8">
        <h3 className="font-bold font-satoshi text-center text-lg md:text-2xl mb-2">Log in to view all Insights</h3>
        <p className="text-[#6B7280] text-center text-sm md:text-base mb-5">Bunch of Public insights backed by Data at your Fingertips</p>
        <button className="bg-brand text-white font-bold font-satoshi rounded-lg px-8 py-3 text-base md:text-lg">Log in</button>
      </div>
    )}

  </div>
        </div>
    </div>
  )
}

export default Pointstoconsider