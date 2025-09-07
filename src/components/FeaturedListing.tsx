import { CiHeart } from "react-icons/ci";
import Image from "next/image";
import first from "../../public/first.svg"
import { LuUserRound } from "react-icons/lu";
import { LiaCarSolid } from "react-icons/lia";
import { GoPlus } from "react-icons/go";
import { FaCartShopping } from "react-icons/fa6";

export default function FeatureListing (){
    return(<>
    <div className="py-[3.375rem] px-6 lg:p-24 xl:p-[7.75rem] lg:pr-0 xl:pr-0">
        <div className="flex flex-col gap-3.5 ">
        <h3 className="font-satoshi font-bold text-sm text-brand">HIGHLIGHTS</h3>
        <h2 className="font-satoshi mt-2.5 font-bold text-[2rem] lg:text-4xl xl:text-5xl leading-[2.625rem]">Featured Listings in Dubai</h2>
        <p className="font-satoshi lg:text-xl xl:text-[1.375rem] font-medium text-base text-[#6B7280]">Top-performing ad spaces, handpicked to give your brand maximum visibility</p>
        </div>
     <div className="md:grid grid-cols-2 lg:flex lg:overflow-x-scroll  no-scrollbar gap-3.5 lg:gap-6 lg:mt-16 lg:last:mr-6">
        <div className="mt-14 lg:mt-0 rounded-tr-[0.875rem] rounded-tl-[0.875rem] overflow-hidden lg:min-w-[320px] xl:min-w-[404px]">
            <div className="w-full max-h-[314px] relative overflow-hidden ">
            <Image src={first} alt="Featured listing" className="w-full h-full max-h-full object-cover object-center" />
             <button className="h-10 w-10 absolute top-0 right-0 rounded-full mt-[1.375rem]  mr-[1.375rem] bg-white flex items-center justify-center">
               
                <CiHeart className="text-[#6B7280] h-4 w-4"/>
             </button>
            </div>
            <div className="py-5 px-8  border border-[#EEEEEE] border-t-0 gap-2.5">
                <h4 className="font-satoshi font-medium text-sm text-brand">Billboards</h4>
                <h3 className="font-satoshi font-bold text-xl mt-2.5">Mirdif city center Rd.- Tripoli </h3>
            </div>
            <div className="px-8 py-3.5 border border-[#EEEEEE] border-t-0">
                <p className="font-medium font-satoshi text-base text-[#6B7280]">Audience</p>
                <div className="flex mt-1.5 gap-2.5">
                    <div className="p-1.5  h-[1.875rem] w-[1.875rem] flex justify-center items-center bg-[#EEEEEE] rounded-full">
                        <LuUserRound className="w-[1.125rem] h-[1.125rem]"/>
                       
                    </div>
                    <span className="font-bold text-lg font-satoshi">Students, Tourists, Shoppers ...</span>
                </div>
            </div>
            <div className="px-8 py-3.5 border flex justify-between items-center  border-[#EEEEEE] border-t-0 rounded-bl-[0.7875rem] rounded-br-[0.7875rem]">
                <div className="flex gap-2.5">
                    <div className="p-1.5  h-[1.875rem] w-[1.875rem] flex justify-center items-center bg-[#EEEEEE] rounded-full">
                        <LiaCarSolid className="w-[1.125rem] h-[1.125rem]"/>
                    </div>
                    <p className="font-bold text-lg font-satoshi">5,00,000 <span className="font-medium font-satoshi text-base ml-2 text-[#6B7280]">cars / day</span></p>
                </div>
                <button className="px-3 py-2 bg-brand flex items-center overflow-hidden rounded-lg ">
              <GoPlus className="text-white h-4 w-4"/>
              <FaCartShopping className="text-white h-5 w-5"/>
                </button>
            </div>
        </div>
        <div className="mt-14 lg:mt-0 rounded-tr-[0.875rem] rounded-tl-[0.875rem] overflow-hidden lg:min-w-[320px] xl:min-w-[404px]">
            <div className="w-full max-h-[314px] relative overflow-hidden ">
            <Image src={first} alt="Featured listing" className="w-full h-full max-h-full object-cover object-center" />
             <button className="h-10 w-10 absolute top-0 right-0 rounded-full mt-[1.375rem]  mr-[1.375rem] bg-white flex items-center justify-center">
               
                <CiHeart className="text-[#6B7280] h-4 w-4"/>
             </button>
            </div>
            <div className="py-5 px-8  border border-[#EEEEEE] border-t-0 gap-2.5">
                <h4 className="font-satoshi font-medium text-sm text-brand">Billboards</h4>
                <h3 className="font-satoshi font-bold text-xl mt-2.5">Mirdif city center Rd.- Tripoli </h3>
            </div>
            <div className="px-8 py-3.5 border border-[#EEEEEE] border-t-0">
                <p className="font-medium font-satoshi text-base text-[#6B7280]">Audience</p>
                <div className="flex mt-1.5 gap-2.5">
                    <div className="p-1.5  h-[1.875rem] w-[1.875rem] flex justify-center items-center bg-[#EEEEEE] rounded-full">
                        <LuUserRound className="w-[1.125rem] h-[1.125rem]"/>
                       
                    </div>
                    <span className="font-bold text-lg font-satoshi">Students, Tourists, Shoppers ...</span>
                </div>
            </div>
            <div className="px-8 py-3.5 border flex justify-between items-center  border-[#EEEEEE] border-t-0 rounded-bl-[0.7875rem] rounded-br-[0.7875rem]">
                <div className="flex gap-2.5">
                    <div className="p-1.5  h-[1.875rem] w-[1.875rem] flex justify-center items-center bg-[#EEEEEE] rounded-full">
                        <LiaCarSolid className="w-[1.125rem] h-[1.125rem]"/>
                    </div>
                    <p className="font-bold text-lg font-satoshi">5,00,000 <span className="font-medium font-satoshi text-base ml-2 text-[#6B7280]">cars / day</span></p>
                </div>
                <button className="px-3 py-2 bg-brand flex items-center overflow-hidden rounded-lg ">
              <GoPlus className="text-white h-4 w-4"/>
              <FaCartShopping className="text-white h-5 w-5"/>
                </button>
            </div>
        </div>
        <div className="mt-14 lg:mt-0 rounded-tr-[0.875rem] rounded-tl-[0.875rem] overflow-hidden lg:min-w-[320px] xl:min-w-[404px] ">
            <div className="w-full max-h-[314px] relative overflow-hidden ">
            <Image src={first} alt="Featured listing" className="w-full h-full max-h-full object-cover object-center" />
             <button className="h-10 w-10 absolute top-0 right-0 rounded-full mt-[1.375rem]  mr-[1.375rem] bg-white flex items-center justify-center">
               
                <CiHeart className="text-[#6B7280] h-4 w-4"/>
             </button>
            </div>
            <div className="py-5 px-8  border border-[#EEEEEE] border-t-0 gap-2.5">
                <h4 className="font-satoshi font-medium text-sm text-brand">Billboards</h4>
                <h3 className="font-satoshi font-bold text-xl mt-2.5">Mirdif city center Rd.- Tripoli </h3>
            </div>
            <div className="px-8 py-3.5 border border-[#EEEEEE] border-t-0">
                <p className="font-medium font-satoshi text-base text-[#6B7280]">Audience</p>
                <div className="flex mt-1.5 gap-2.5">
                    <div className="p-1.5  h-[1.875rem] w-[1.875rem] flex justify-center items-center bg-[#EEEEEE] rounded-full">
                        <LuUserRound className="w-[1.125rem] h-[1.125rem]"/>
                       
                    </div>
                    <span className="font-bold text-lg font-satoshi">Students, Tourists, Shoppers ...</span>
                </div>
            </div>
            <div className="px-8 py-3.5 border flex justify-between items-center  border-[#EEEEEE] border-t-0 rounded-bl-[0.7875rem] rounded-br-[0.7875rem]">
                <div className="flex gap-2.5">
                    <div className="p-1.5  h-[1.875rem] w-[1.875rem] flex justify-center items-center bg-[#EEEEEE] rounded-full">
                        <LiaCarSolid className="w-[1.125rem] h-[1.125rem]"/>
                    </div>
                    <p className="font-bold text-lg font-satoshi">5,00,000 <span className="font-medium font-satoshi text-base ml-2 text-[#6B7280]">cars / day</span></p>
                </div>
                <button className="px-3 py-2 bg-brand flex items-center overflow-hidden rounded-lg ">
              <GoPlus className="text-white h-4 w-4"/>
              <FaCartShopping className="text-white h-5 w-5"/>
                </button>
            </div>
        </div>
        <div className="mt-14 lg:mt-0 rounded-tr-[0.875rem] rounded-tl-[0.875rem] overflow-hidden lg:min-w-[320px] xl:min-w-[404px]">
            <div className="w-full max-h-[314px] relative overflow-hidden ">
            <Image src={first} alt="Featured listing" className="w-full h-full max-h-full object-cover object-center" />
             <button className="h-10 w-10 absolute top-0 right-0 rounded-full mt-[1.375rem]  mr-[1.375rem] bg-white flex items-center justify-center">
               
                <CiHeart className="text-[#6B7280] h-4 w-4"/>
             </button>
            </div>
            <div className="py-5 px-8  border border-[#EEEEEE] border-t-0 gap-2.5">
                <h4 className="font-satoshi font-medium text-sm text-brand">Billboards</h4>
                <h3 className="font-satoshi font-bold text-xl mt-2.5">Mirdif city center Rd.- Tripoli </h3>
            </div>
            <div className="px-8 py-3.5 border border-[#EEEEEE] border-t-0">
                <p className="font-medium font-satoshi text-base text-[#6B7280]">Audience</p>
                <div className="flex mt-1.5 gap-2.5">
                    <div className="p-1.5  h-[1.875rem] w-[1.875rem] flex justify-center items-center bg-[#EEEEEE] rounded-full">
                        <LuUserRound className="w-[1.125rem] h-[1.125rem]"/>
                       
                    </div>
                    <span className="font-bold text-lg font-satoshi">Students, Tourists, Shoppers ...</span>
                </div>
            </div>
            <div className="px-8 py-3.5 border flex justify-between items-center  border-[#EEEEEE] border-t-0 rounded-bl-[0.7875rem] rounded-br-[0.7875rem]">
                <div className="flex gap-2.5">
                    <div className="p-1.5  h-[1.875rem] w-[1.875rem] flex justify-center items-center bg-[#EEEEEE] rounded-full">
                        <LiaCarSolid className="w-[1.125rem] h-[1.125rem]"/>
                    </div>
                    <p className="font-bold text-lg font-satoshi">5,00,000 <span className="font-medium font-satoshi text-base ml-2 text-[#6B7280]">cars / day</span></p>
                </div>
                <button className="px-3 py-2 bg-brand flex items-center overflow-hidden rounded-lg ">
              <GoPlus className="text-white h-4 w-4"/>
              <FaCartShopping className="text-white h-5 w-5"/>
                </button>
            </div>
        </div>
        </div>
    </div>
    </>)
}