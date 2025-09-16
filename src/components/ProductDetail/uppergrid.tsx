import React from 'react'
import Tvicon from "../../../public/TV.svg"
import Image from 'next/image'

const Uppergrid = () => {
  return (
    <div className='grid grid-cols-2 bg-white rounded-[0.75rem] lg:rounded-[0.875rem] overflow-hidden border border-[#EEEEEE]'>
      <div className="p-1.5 lg:p-2 border border-[rgb(238,238,238)] flex items-center gap-2.5 lg:gap-3.5">
       <div className="p-3.5 lg:p-[1.375rem] shrink-0">
        <Image src={Tvicon} alt='tv-media' className='w-[1.125rem] h-[1.125rem] lg:w-6 lg:h-6 shrink-0'/>
       </div>
       <div className="">
        <p className="text-[0.625rem] font-satoshi md:text-sm text-[#6B7280] font-medium lg:text-base ">Display</p>
        <h3 className="pt-1 lg:pt-1.5 font-satoshi font-bold text-xs md:text-base lg:text-lg">LED</h3>
       </div>
      </div>
      <div className="p-1.5 lg:p-2 border border-[#EEEEEE] flex items-center gap-2.5 lg:gap-3.5">
       <div className="p-3.5 lg:p-[1.375rem] shrink-0">
        <Image src={Tvicon} alt='tv-media' className='w-[1.125rem] h-[1.125rem] lg:w-6 lg:h-6 shrink-0'/>
       </div>
       <div className="">
        <p className="text-[0.625rem] font-satoshi md:text-sm text-[#6B7280] font-medium lg:text-base ">Location</p>
        <h3 className="pt-1 lg:pt-1.5 font-satoshi font-bold text-xs md:text-base lg:text-lg">Deira, Dubai</h3>
       </div>
      </div>
      <div className="p-1.5 lg:p-2 border border-[#EEEEEE] flex items-center gap-2.5 lg:gap-3.5">
       <div className="p-3.5 lg:p-[1.375rem] shrink-0">
        <Image src={Tvicon} alt='tv-media' className='w-[1.125rem] h-[1.125rem] lg:w-6 lg:h-6 shrink-0'/>
       </div>
       <div className="">
        <p className="text-[0.625rem] font-satoshi md:text-sm text-[#6B7280] lg:text-base font-medium ">Reach</p>
        <h3 className="pt-1 lg:pt-1.5 font-satoshi font-bold text-xs md:text-base lg:text-lg">150,000 / <span className='font-medium text-[#6B7280]'>Foot Traffic </span></h3>
       </div>
      </div>
      <div className="p-1.5 lg:p-2 border border-[#EEEEEE] flex items-center gap-2.5 lg:gap-3.5">
       <div className="p-3.5 lg:p-[1.375rem] shrink-0">
        <Image src={Tvicon} alt='tv-media' className='w-[1.125rem] h-[1.125rem] lg:w-6 lg:h-6 shrink-0'/>
       </div>
       <div className="">
        <p className="text-[0.625rem] font-satoshi md:text-sm text-[#6B7280] font-medium lg:text-base ">Size</p>
        <h3 className="pt-1 lg:pt-1.5 font-satoshi font-bold text-xs md:text-base lg:text-lg">16 X 9 m2</h3>
       </div>
      </div>
      
    </div>
  )
}

export default Uppergrid