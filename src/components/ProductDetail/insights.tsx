import React from "react";
import Image from "next/image";
import bulb from "../../../public/bulb.svg";
import { FaStar } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";

const Insights = () => {
  return (
    <>
      <div>
        <h2 className="gap-3.5 flex items-center text-2xl font-bold font-satoshi ">
          <Image src={bulb} alt="bulb " className="w-6 h-6" />
          MediaDazz Insights
        </h2>
        <div className="mt-6 lg:mt-7 border-[#EEEEEE] border rounded-2xl">
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
        </div>
      </div>
      <h2 className="gap-3.5 flex items-center text-2xl font-bold font-satoshi ">
        <IoIosPeople className="w-6 h-6" />
        Who You’ll Reach Most Effectively
      </h2>
      <div className="mt-6 lg:mt-7 flex flex-wrap gap-3 lg:gap-3.5 ">
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
      </div>
    </>
  );
};

export default Insights;
