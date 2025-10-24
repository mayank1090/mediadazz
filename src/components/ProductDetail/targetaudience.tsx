import React from 'react';
import { PiTarget } from "react-icons/pi";

const data=[{
    icon:"👣",
    heading:"Commuters",
    discription:"Daily repetition builds frequency"

},
{
    icon:"💼",
    heading:"Business travelers",
    discription:"Route connects to key districts"

},
{
    icon:"🛍️",
    heading:"Shoppers",
    discription:"Proximity to malls and shops"

},
{
    icon:"🏠",
    heading:"Residents",
    discription:"Neighborhood coverage and recall"

}]

const TargetAudience = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <div> <div>  <h2 className="gap-3.5 flex items-center text-2xl font-bold font-satoshi ">
    <PiTarget className="w-6 h-6" />
    Target Audience Insights
  </h2>
   <div className={`mt-6 lg:mt-7 gap-3.5 grid grid-cols-1 lg:grid-cols-2 ${!isLoggedIn ? "min-h-60" : "min-h-0"} relative`}>
  { data?.map((item, index)=><div key={index} className="py-3 px-5  border border-[#EEEEEE] bg-white rounded-[0.625rem] flex items-center gap-4 lg:gap-[1.125rem]">
       <div className="p-2.5 rounded-full overflow-hidden shrink-0">
        <p className='text-3xl font-bold'>{item?.icon}</p>
       </div>
       <div className="">
       <h3 className="pb-1 font-satoshi font-bold text-sm ">{item?.heading}</h3>
        <p className=" font-satoshi text-sm text-[#6B7280] ">{item?.discription}</p>
       
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
    </div></div>
  )
}

export default TargetAudience