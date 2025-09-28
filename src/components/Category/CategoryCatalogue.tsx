import HeartButton from "../HeartButton";
import CartButton from "../CartButton";
import first from "../../../public/first.svg"
import Image from "next/image";
import { LuUserRound } from "react-icons/lu";
import { IoPricetagsOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { FaCartShopping } from "react-icons/fa6";
import { useState } from "react";
import MediaCartModal from "../MediaCartModal";
import { FaCircleCheck } from "react-icons/fa6";

const CategoryCatalogue = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
    <div className="space-y-5">
      {[1,2,3].map((_, index) => (
        <div key={index} className="bg-white rounded-lg border border-[#EEEEEE] cursor-pointer flex ">
        <div className="w-full shrink-0 max-w-[35%] relative overflow-hidden ">
        <Image src={first} alt="Featured listing" className="w-full h-full max-h-full object-cover object-center" />
         <HeartButton itemId="billboard-1" />
        </div>
        <div className="flex-1 p-6 flex flex-col justify-center">
        <div className="flex flex-col gap-1.5">
            <h4 className="font-satoshi font-medium text-sm text-brand">Billboards</h4>
            <h3 className="font-satoshi font-medium text-base ">Mirdif city center Rd.- Tripoli </h3>
        </div>
        <div className="flex flex-wrap gap-2 mt-5">
        <div className="flex items-center w-fit p-1 pr-4 gap-1.5 border border-[#EEEEEE] rounded-full">
                <div className="p-1.5 bg-[#EEEEEE] rounded-full">
                    <LuUserRound className="w-4 h-4"/>
                   
                </div>
                <span className="font-medium text-sm font-satoshi">Deira</span>
            </div>
            <div className="flex items-center w-fit p-1 pr-4 gap-1.5 border border-[#EEEEEE] rounded-full">
                <div className="p-1.5 bg-[#EEEEEE] rounded-full">
                    <LuUserRound className="w-4 h-4"/>
                   
                </div>
                <p className="font-medium text-sm font-satoshi">150,000 <span className="text-[#6B7280]">/ Foot Traffic</span></p>
            </div>
            <div className="flex items-center w-fit p-1 pr-4 gap-1.5 border border-[#EEEEEE] rounded-full">
                <div className="p-1.5 bg-[#EEEEEE] rounded-full">
                    <LuUserRound className="w-4 h-4"/>
                   
                </div>
                <span className="font-medium text-sm font-satoshi">LED</span>
            </div>
            <div className="flex items-center w-fit p-1 pr-4 gap-1.5 border border-[#EEEEEE] rounded-full">
                <div className="p-1.5 bg-[#EEEEEE] rounded-full">
                    <LuUserRound className="w-4 h-4"/>
                   
                </div>
                <span className="font-medium text-sm font-satoshi">16 X 9 m2</span>
            </div>
            </div>
       <div className="flex justify-between items-baseline-last gap-6 mt-6">
        <div className="flex gap-2 items-center">
       <IoPricetagsOutline className="w-[1.125rem] h-[1.125rem]"/>
       <p className="text-sm font-medium font-satoshi">Price on Request</p>
        </div>

       {index===0?
       <button
          className="px-4 py-3 rounded-full bg-[#DCFCE7] font-bold text-base font-satoshi flex gap-2.5 items-center"
        >
        
          <span className="xl:block hidden text-sm font-medium">Added to media Cart</span>
            
            <FaCircleCheck className="w-5 h-5 text-[#22C55E]"/>
            <FaCartShopping className="w-5 h-5 xl:hidden text-[#22C55E]"/>
        </button>
        :<button
          className="px-4 py-3 rounded-lg bg-brand font-bold text-base font-satoshi text-white flex gap-2.5 items-center"
          onClick={() => setCartOpen(true)}
        >
          <div className="flex ">
            <GoPlus className="w-4 h-4 text-white"/>
            <FaCartShopping className="w-5 h-5 text-white"/>
          </div>
          <span className="xl:block hidden">Add to media Cart</span>
        </button>} 
       </div>
        </div>
        </div>
      ))}
    </div>
    <MediaCartModal open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}

export default CategoryCatalogue