import Image from "next/image";
import first from "../../public/first.svg"
import { LuUserRound } from "react-icons/lu";
import { LiaCarSolid } from "react-icons/lia";
import HeartButton from "./HeartButton";
import CartButton from "./CartButton";

const Listingcarousel = () => {
  return (
    <div className="md:grid grid-cols-2 lg:flex lg:overflow-x-scroll  no-scrollbar gap-3.5 lg:gap-6 lg:mt-16 lg:last:mr-6">
    <div className="mt-14 lg:mt-0 rounded-tr-[0.875rem] rounded-tl-[0.875rem] overflow-hidden  lg:min-w-[404px]">
        <div className="w-full max-h-[314px] relative overflow-hidden ">
        <Image src={first} alt="Featured listing" className="w-full h-full max-h-full object-cover object-center" />
         <HeartButton itemId="billboard-1" />
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
            <CartButton />
        </div>
    </div>
    <div className="mt-14 lg:mt-0 rounded-tr-[0.875rem] rounded-tl-[0.875rem] overflow-hidden  lg:min-w-[404px]">
        <div className="w-full max-h-[314px] relative overflow-hidden ">
        <Image src={first} alt="Featured listing" className="w-full h-full max-h-full object-cover object-center" />
         <HeartButton itemId="billboard-2" />
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
            <CartButton />
        </div>
    </div>
    <div className="mt-14 lg:mt-0 rounded-tr-[0.875rem] rounded-tl-[0.875rem] overflow-hidden  lg:min-w-[404px] ">
        <div className="w-full max-h-[314px] relative overflow-hidden ">
        <Image src={first} alt="Featured listing" className="w-full h-full max-h-full object-cover object-center" />
         <HeartButton itemId="billboard-3" />
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
            <CartButton />
        </div>
    </div>
    <div className="mt-14 lg:mt-0 rounded-tr-[0.875rem] rounded-tl-[0.875rem] overflow-hidden  lg:min-w-[404px]">
        <div className="w-full max-h-[314px] relative overflow-hidden ">
        <Image src={first} alt="Featured listing" className="w-full h-full max-h-full object-cover object-center" />
         <HeartButton itemId="billboard-4" />
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
            <CartButton />
        </div>
    </div>
    </div>
  )
}

export default Listingcarousel