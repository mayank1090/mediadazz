import React from 'react'
import { GoDotFill } from "react-icons/go";

const mockData=[{
    mainhead:"Booking & Availability",
    points:["Available by day, week, or month, flexible durations","Ad loops: 8-10 slots per minute; bulk discounts on long term runs","Price: On request: custom quotes based on campaignength and creative rotations."]
},
{
    mainhead:"Creative Guidelines",
    points:["Dimensions: 16 m × 9 m, artwork to full scale at 300 dpi digital RGB).","Formats: MP4, JPEG, PNG; animations max 15 seconds.","Rotations: Up to 4 different creatives per day (subject to schedule)."]
},
{
    mainhead:"Measurement & Analytics",
    points:["Daily impression estimates based on traffic data (foot + vehicular).","Demographic profiling from nearby retail and transit analytics (e.g., tourist vs local).","Interactive features: QR codes, NFC tags, or custom promo codes can be integrated to drive tracking and campaigns."]
}
]

const Marketfriendly = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <div className=''>
        <h2 className="gap-3.5 flex items-center text-2xl font-bold font-satoshi ">
        Marketer-Friendly Details
  </h2>
  <div className={`mt-[1.125rem] md:mt-6 lg:mt-7 flex flex-col lg:flex-row gap-4 lg:gap-5 ${!isLoggedIn ? "min-h-60" : "min-h-0"} relative`}>
   {mockData.map((item, index)=><div key={index} className="p-5 flex-1 flex flex-col gap-5 bg-white border-[#EEEEEE] border rounded-2xl">
        <h5 className="font-bold font-satoshi text-base">{item.mainhead}</h5>
       {item?.points.map((item, index)=><h3 key={index} className="flex  gap-1 font-medium font-satoshi text-xs"><GoDotFill className='text-brand text-base shrink-0'/>{item}</h3>)} 
    </div>) }
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

export default Marketfriendly