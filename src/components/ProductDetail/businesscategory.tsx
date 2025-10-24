import React from 'react'
import { IoBagHandleOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { LiaCarSolid } from "react-icons/lia";

const BusinessCategory= ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <div>  <h2 className="gap-3.5 flex items-center text-2xl font-bold font-satoshi ">
    <IoBagHandleOutline className="w-6 h-6" />
    Business Categories Best Suited
  </h2>
   <div className={` ${!isLoggedIn ? "min-h-60" : "min-h-0"} relative mt-6 lg:mt-7 gap-3.5 grid grid-cols-1 lg:grid-cols-2`}>
  { [1,2,3,4,5,6,7,8].map((item, index)=><div  key={index} className="p-6  border border-[#EEEEEE] bg-white rounded-[0.625rem] flex items-center gap-4 lg:gap-[1.125rem]">
       <div className="p-2.5 rounded-full overflow-hidden bg-[#FFEAE1] shrink-0">
        <LiaCarSolid className=' text-brand w-6 h-6 shrink-0'/>
       </div>
       <div className="">
       <h3 className="pb-1 font-satoshi font-bold text-xs md:text-base lg:text-lg">Automotive</h3>
        <p className="text-[0.625rem] font-satoshi md:text-sm text-[#6B7280] font-medium lg:text-base ">Model launches, test-drive offers</p>
       
       </div>
      </div>)}
      {!isLoggedIn && (
      <div className="absolute z-10 w-full h-full top-0 left-0 min-h-28 flex flex-col items-center justify-center bg-[#0000000D] backdrop-blur-md  px-4 py-8">
        <h3 className="font-bold font-satoshi text-center text-lg md:text-2xl mb-2">Log in to view all Insights</h3>
        <p className="text-[#6B7280] text-center text-sm md:text-base mb-5">Bunch of Public insights backed by Data at your Fingertips</p>
        <button className="bg-brand text-white font-bold font-satoshi rounded-lg px-8 py-3 text-base md:text-lg">Log in</button>
      </div>
    )}
      
   </div>
    </div>
  )
}

export default BusinessCategory
