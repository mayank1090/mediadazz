"use client";

import { LuUser } from "react-icons/lu";
import { HiMiniUserGroup } from "react-icons/hi2";
import { HiOutlineMail } from "react-icons/hi";
import { useRouter } from "next/navigation";


export default function Planyourcampaign (){

    const router = useRouter();
    return(<>
     <div className="py-[3.375rem] px-6 lg:p-24  xl:p-[7.75rem]">
     <div className="flex flex-col gap-3.5 text-center md:items-center ">
        <h3 className="font-satoshi font-bold text-xs md:text-sm text-brand">Campaign form</h3>
        <h2 className="font-satoshi font-bold text-4xl lg:text-4xl xl:text-5xl ">Plan your Campaign</h2>
        <p className="font-satoshi lg:text-lg md:text-base  font-medium text-xs text-[#6B7280] md:mt-2.5 ">Use the MediaDazz campaign brief form to get offers from multiple <span className="font-bold text-black">billboard companies, digital OOH providers, TV ad networks, radio stations, print publishers, influencer marketing agencies, and many more.</span> Submit your requirements in the form and get a proposal tailored to your <span className="font-bold text-black">budget, target audience, and campaign goals.</span></p>
        </div>
         <div className="w-full max-w-4xl mx-auto mt-10 lg:mt-16 space-y-8">
  {/* Contact Information */}
  <div className="bg-white rounded-[0.625rem] overflow-hidden border border-[#EEEEEE]">
    <h4 className="font-satoshi font-bold text-lg lg:text-xl text-black py-3.5 px-6 bg-[#FAFAFA]">Contact Information</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-4 md:gap-5">
      <div>
        <label className="block text-base font-medium font-satoshi mb-3">Mobile No.</label>
        <div className="flex">
          <span className=" px-[1.125rem] flex items-center rounded-l-[0.625rem] border border-[#EEEEEE] font-satoshi text-base lg:text-lg font-medium">+971</span>
          <input type="text" placeholder="Phone Number" className="w-full px-[1.125rem] py-4 rounded-r-[0.625rem] border border-l-0 outline-none border-[#EEEEEE] placeholder-[#6B7280] font-satoshi" />
        </div>
      </div>
      <div>
        <label className="block text-base font-medium font-satoshi mb-3">Full Name</label>
        <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
            <LuUser className="h-6 w-6 mr-2"/>
        <input type="text" placeholder="Enter full name" className="w-full  placeholder-[#6B7280] outline-none font-satoshi" ></input>
        </div>
      </div>
      <div>
        <label className="block text-base font-medium font-satoshi mb-3">Company Name</label>
        <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
            <HiMiniUserGroup className="h-6 w-6 mr-2"/>
        <input type="text" placeholder="Enter full name" className="w-full  placeholder-[#6B7280] outline-none font-satoshi" ></input>
        </div>
      </div>
       <div>
        <label className="block text-base font-medium font-satoshi mb-3">Email Address</label>
        <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
            <HiOutlineMail className="h-6 w-6 mr-2"/>
        <input type="text" placeholder="Enter full name" className="w-full  placeholder-[#6B7280] outline-none font-satoshi" ></input>
        </div>
      </div>
    </div>
  </div>

  {/* Campaign Overview */}

  <div className="bg-white rounded-[0.625rem] overflow-hidden border border-[#EEEEEE]">
    <h4 className="font-satoshi font-bold text-lg lg:text-xl text-black py-3.5 px-6 bg-[#FAFAFA]">Campaign Overview</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-4 md:gap-5">
        <div>
        <label className="block text-base font-medium font-satoshi mb-3">Campaign Title</label>
        <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
        <input type="text" placeholder="e.g., “New Product Launch in Dubai, Q4 2025”" className="w-full  placeholder-[#6B7280] outline-none font-satoshi" ></input>
        </div>
      </div>
      <div>
        <label className="block text-base font-medium font-satoshi mb-3">Campaign Objective</label>
        <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
        <select className="w-full  placeholder-[#6B7280] outline-none font-satoshi" >
              <option value="">Select your Objective</option>
        </select>
        </div>
      </div>
      <div className="md:col-span-2">
        <label className="block text-base font-medium font-satoshi mb-3">Target Audience</label>
        <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
        <input type="text" placeholder="Demographics, customer segments, or industries you want to reach" className="w-full  placeholder-[#6B7280] outline-none font-satoshi" ></input>
        </div>
      </div>
    </div>
  </div>

  {/* Media Preferences 1 */}

  {/* Media Preferences 2 */}
<div className="bg-white rounded-[0.625rem] overflow-hidden border border-[#EEEEEE]">
    <h4 className="font-satoshi font-bold text-lg lg:text-xl text-black py-3.5 px-6 bg-[#FAFAFA]">Media Preferences</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-4 md:gap-5">
      <div>
        <label className="block text-base font-medium font-satoshi mb-3">Estimated Budget Range</label>
        <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
        <select className="w-full  placeholder-[#6B7280] outline-none font-satoshi" >
              <option value="">Select Budget Range</option>
        </select>
        </div>
      </div>
      <div className="md:col-span-2">
        <label className="block text-base font-medium font-satoshi mb-3">Special Requirements</label>
        <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
        <input type="text" placeholder="Creative formats, event tie-ins, sponsorships, language preferences, etc." className="w-full  placeholder-[#6B7280] outline-none font-satoshi" ></input>
        </div>
      </div>
    </div>
  </div>
    <div className="flex items-center justify-center ">
      <input type="checkbox" id="agree" className="w-5 h-5 accent-brand" />
      <label htmlFor="agree" className="ml-4 text-base md:text-lg font-medium lg:text-xl font-satoshi">I agree to be contacted by MediaDazz for the purpose of receiving proposals for my campaign.</label>
    </div>
    <div className="flex justify-center">
    <button onClick={() => router.push('/campaigns')} className="px-8 mx-auto w-full sm:w-fit py-5 bg-brand mt-14 font-satoshi rounded-lg text-lg md:text-[1.375rem] font-bold text-white hover:md:bg-gradient-to-r hover:md:from-orange-600 hover:md:to-orange-700 hover:md:shadow-lg hover:md:shadow-orange-500/25 hover:md:scale-[1.02]  outline-none  transition-all duration-300 ease-in-out transform">Submit My Campaign Brief</button>
    </div>
</div>
     </div>

   
{/* Submit Button (already present) */}

    </>)
}