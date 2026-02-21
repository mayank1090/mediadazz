import React from 'react';
import { PiTarget } from "react-icons/pi";

interface TargetAudienceItem {
  audience?: string;
  [key: string]: unknown;
}

interface TargetAudienceProps {
  isLoggedIn: boolean;
  targetAudienceList?: TargetAudienceItem[];
}

// Icon mapping for different audience types
const getAudienceIcon = (audience: string): string => {
  const iconMap: Record<string, string> = {
    'Commuters': '👣',
    'Drivers': '🚗',
    'Residents': '🏠',
    'Shoppers': '🛍️',
    'Tourists': '✈️',
    'Families': '👨‍👩‍👧‍👦',
    'Students': '🎓',
    'Corporate Executives': '💼',
    'Business Travelers': '💼',
    'Parents': '👨‍👩‍👦',
    'Health & Fitness Enthusiasts': '💪',
    'Expatriates': '🌍',
    'Public Transport Users': '🚌',
    'Car Owners': '🚙',
    'Delivery Drivers': '📦',
    'Domestic Travellers': '🧳',
    'Healthcare Professionals': '⚕️',
    'Pedestrians': '🚶',
    'Sports Enthusiasts': '⚽',
    'Real Estate Investors': '🏘️',
    'Technology Enthusiasts': '💻',
    'Hotel Guests': '🏨',
    'Event Attendees': '🎪',
    'Small Business Owners': '🏪',
    'Maritime Professionals': '⚓',
    'Engineers': '🔧',
    'Media Professionals': '📺',
    'Software Developers and Programmers': '💻',
  };
  
  return iconMap[audience] || '👥';
};

const TargetAudience = ({ isLoggedIn, targetAudienceList = [] }: TargetAudienceProps) => {
  // If no data, show empty state or fallback
  if (!targetAudienceList || targetAudienceList.length === 0) {
    return null;
  }
  
  return (
    <div> <div>  <h2 className="gap-3.5 flex items-center text-2xl font-bold font-satoshi ">
    <PiTarget className="w-6 h-6" />
    Target Audience Insights
  </h2>
   <div className={`mt-6 lg:mt-7 gap-3.5 grid grid-cols-1 lg:grid-cols-2 ${!isLoggedIn ? "min-h-60" : "min-h-0"} relative`}>
  { targetAudienceList?.map((item, index) => {
    const audienceRaw = item.audience || item.title || 'Audience';
    const audience = typeof audienceRaw === 'string' ? audienceRaw : String(audienceRaw);
    return (
      <div key={index} className="py-3 px-5  border border-[#EEEEEE] bg-white rounded-[0.625rem] flex items-center gap-4 lg:gap-[1.125rem]">
       <div className="p-2.5 rounded-full overflow-hidden shrink-0">
        <p className='text-3xl font-bold'>{getAudienceIcon(audience)}</p>
       </div>
       <div className="">
       <h3 className="pb-1 font-satoshi font-bold text-sm ">{audience}</h3>
        {typeof item.description === 'string' || typeof item.description === 'number' ? (
  <p>{item.description}</p>
) : null}
       </div>
      </div>
    );
  })}
       {!isLoggedIn && (
      <div className="absolute z-10 w-full h-full top-0 left-0 min-h-28 flex flex-col items-center justify-center bg-[#0000000D] backdrop-blur-md  px-4 py-8">
        <h3 className="font-bold font-satoshi text-center text-lg md:text-2xl mb-2">Log in to view all Insights</h3>
        <p className="text-[#6B7280] text-center text-sm md:text-base mb-5">Bunch of Public insights backed by Data at your Fingertips</p>
        <button className="bg-brand text-white font-bold font-satoshi rounded-lg px-8 py-3 text-base md:text-lg">Log in</button>
      </div>
    )}
   </div>
    </div></div>
  )
}

export default TargetAudience