import React from "react";
import Image from "next/image";
import bulb from "../../../public/bulb.svg";
import { FaStar } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";

interface MediaDazzInsight {
  status: string;
  reason: string;
}

interface AudienceInsight {
  audience_type: string;
  reason: string;
}

interface InsightsProps {
  isLoggedIn: boolean;
  mediadazzInsights?: MediaDazzInsight[];
  audienceInsights?: AudienceInsight[];
}

const Insights = ({ isLoggedIn, mediadazzInsights = [], audienceInsights = [] }: InsightsProps) => {
  // Filter insights with status "true" for MediaDazz Insights
  const validMediaDazzInsights = mediadazzInsights.filter(insight => insight.status === "true");
  
  return (
    <>
      <div>
        <h2 className="gap-3.5 flex items-center text-2xl font-bold font-satoshi ">
          <Image src={bulb} alt="bulb " className="w-6 h-6" />
          MediaDazz Insights
        </h2>
        <div className={`${!isLoggedIn ? "min-h-60" : "min-h-0"} relative mt-6 lg:mt-7 border-[#EEEEEE] border rounded-2xl`}>
          {validMediaDazzInsights.length > 0 ? (
            validMediaDazzInsights.map((insight, index) => (
              <div 
                key={index} 
                className={`px-6 py-[1.125rem] ${index < validMediaDazzInsights.length - 1 ? 'border-b border-[#EEEEEE]' : ''} flex items-center gap-2.5`}
              >
                <FaStar className="text-brand w-4" />
                <h4 className="font-medium font-satoshi text-base">
                  {insight.reason}
                </h4>
              </div>
            ))
          ) : (
            // Fallback to default insights if no data
            <>
              <div className="px-6 py-[1.125rem] border-b border-[#EEEEEE] flex items-center gap-2.5">
                <FaStar className="text-brand w-4" />
                <h4 className="font-medium font-satoshi text-base">
                  Premium approach road with strong brand recall
                </h4>
              </div>
              <div className="px-6 py-[1.125rem] border-b border-[#EEEEEE] flex items-center gap-2.5">
                <FaStar className="text-brand w-4" />
                <h4 className="font-medium font-satoshi text-base">
                  High nighttime impact with 24/7 illumination
                </h4>
              </div>
              <div className="px-6 py-[1.125rem] flex items-center gap-2.5">
                <FaStar className="text-brand w-4" />
                <h4 className="font-medium font-satoshi text-base">
                  Consistent traffic flow ensures repeated exposures
                </h4>
              </div>
            </>
          )}
            {!isLoggedIn && (
      <div className="absolute z-10 w-full h-full top-0 left-0 min-h-28 flex flex-col items-center justify-center bg-[#0000000D] backdrop-blur-md  px-4 py-8">
        <h3 className="font-bold font-satoshi text-center text-lg md:text-2xl mb-2">Log in to view all Insights</h3>
        <p className="text-[#6B7280] text-center text-sm md:text-base mb-5">Bunch of Public insights backed by Data at your Fingertips</p>
        <button className="bg-brand text-white font-bold font-satoshi rounded-lg px-8 py-3 text-base md:text-lg">Log in</button>
      </div>
    )}
        </div>
      </div>
      <h2 className="gap-3.5 flex items-center text-2xl font-bold font-satoshi ">
        <IoIosPeople className="w-6 h-6" />
        Who You'll Reach Most Effectively
      </h2>
      <div className={`${!isLoggedIn ? "min-h-60" : "min-h-0"} relative mt-6 lg:mt-7 flex flex-wrap gap-3 lg:gap-3.5 `}>
        {audienceInsights.length > 0 ? (
          audienceInsights.map((insight, index) => (
            <div key={index} className="py-[1.125rem] px-6 bg-white rounded-full border border-[#EEEEEE] font-medium font-satoshi text-base">
              {insight.audience_type}
            </div>
          ))
        ) : (
          // Fallback to default audiences if no data
          <>
            <div className="py-[1.125rem] px-6 bg-white rounded-full border border-[#EEEEEE] font-medium font-satoshi text-base">
              Commuters
            </div>
            <div className="py-[1.125rem] px-6 bg-white rounded-full border border-[#EEEEEE] font-medium font-satoshi text-base">
            Residents
            </div>
            <div className="py-[1.125rem] px-6 bg-white rounded-full border border-[#EEEEEE] font-medium font-satoshi text-base">
            Shoppers
            </div>
            <div className="py-[1.125rem] px-6 bg-white rounded-full border border-[#EEEEEE] font-medium font-satoshi text-base">
            Tourists
            </div>
          </>
        )}
         {!isLoggedIn && (
      <div className="absolute z-10 w-full h-full top-0 left-0 min-h-28 flex flex-col items-center justify-center bg-[#0000000D] backdrop-blur-md  px-4 py-8">
        <h3 className="font-bold font-satoshi text-center text-lg md:text-2xl mb-2">Log in to view all Insights</h3>
        <p className="text-[#6B7280] text-center text-sm md:text-base mb-5">Bunch of Public insights backed by Data at your Fingertips</p>
        <button className="bg-brand text-white font-bold font-satoshi rounded-lg px-8 py-3 text-base md:text-lg">Log in</button>
      </div>
    )}
      </div>
    </>
  );
};

export default Insights;
