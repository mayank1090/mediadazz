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

const Marketfriendly = () => {
  return (
    <div className=''>
        <h2 className="gap-3.5 flex items-center text-2xl font-bold font-satoshi ">
        Marketer-Friendly Details
  </h2>
  <div className="mt-[1.125rem] md:mt-6 lg:mt-7 flex flex-col lg:flex-row gap-4 lg:gap-5">
   {mockData.map((item, index)=><div key={index} className="p-5 flex-1 flex flex-col gap-5 bg-white border-[#EEEEEE] border rounded-2xl">
        <h5 className="font-bold font-satoshi text-base">{item.mainhead}</h5>
       {item?.points.map((item, index)=><h3 key={index} className="flex  gap-1 font-medium font-satoshi text-xs"><GoDotFill className='text-brand text-base shrink-0'/>{item}</h3>)} 
    </div>) }
  </div>
    </div>
  )
}

export default Marketfriendly