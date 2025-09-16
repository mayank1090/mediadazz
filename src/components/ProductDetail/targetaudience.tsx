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

const TargetAudience = () => {
  return (
    <div> <div>  <h2 className="gap-3.5 flex items-center text-2xl font-bold font-satoshi ">
    <PiTarget className="w-6 h-6" />
    Target Audience Insights
  </h2>
   <div className="mt-6 lg:mt-7 gap-3.5 grid grid-cols-1 lg:grid-cols-2">
  { data?.map((item, index)=><div key={index} className="py-3 px-5  border border-[#EEEEEE] bg-white rounded-[0.625rem] flex items-center gap-4 lg:gap-[1.125rem]">
       <div className="p-2.5 rounded-full overflow-hidden shrink-0">
        <p className='text-3xl font-bold'>{item?.icon}</p>
       </div>
       <div className="">
       <h3 className="pb-1 font-satoshi font-bold text-sm ">{item?.heading}</h3>
        <p className=" font-satoshi text-sm text-[#6B7280] ">{item?.discription}</p>
       
       </div>
      </div>)}
      
   </div>
    </div></div>
  )
}

export default TargetAudience