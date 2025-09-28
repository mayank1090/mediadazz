"use client";
import Image from "next/image";
import { useState } from "react";
import { IoPricetagsOutline } from "react-icons/io5";
import { PiMoneyWavy } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import Calendar from "@/components/OrderSummaryCalendar";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import HeartButton from "@/components/HeartButton";
import { LuUserRound } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";
import { CiHeart } from "react-icons/ci";
import { IoMdCart } from "react-icons/io";
import { FaPlus } from "react-icons/fa";    
import { IoPricetagOutline } from "react-icons/io5";
import InquiryReceivedModal from "@/components/InquiryReceivedModal";

const cartItems = [
    {
        id: 1,
        image: "/first.svg",
        category: "Billboards",
        title: "LED Unipole on Deira Al Maktoum Bridge Road Maktoum Bridge to Deira City Center route",
        location: "Dubai - Deira",
        price: "Price on Request",
    },
    {
        id: 2,
        image: "/first.svg",
        category: "Billboards",
        title: "Three double-sided billboards on Sheikh Zayed Road",
        location: "Dubai - Deira",
        price: "Price on Request",
    },
];

export default function OrderSummaryPage() {
    const [selectedDates, setSelectedDates] = useState<{ [key: number]: Date[] }>({});
    const [planning, setPlanning] = useState("");
    const [budget, setBudget] = useState("");
    const [needCreative, setNeedCreative] = useState(false);
    const [showInquiryModal, setShowInquiryModal] = useState(false); // <-- Add this

    return (
        <div className="bg-[#FAFAFA] p-6 md:py-7 lg:px-24 xl:px-[7.75rem] mt-[5.5rem] lg:mt-28">
            <div className="max-w-7xl mx-auto py-6 md:py-12 flex flex-col md:flex-row gap-6  lg:gap-8">
                {/* Left: Cart Items */}
                <div className="flex-1 flex flex-col">
                    <div className="flex gap-2 md:gap-2.5 items-center">
                        <p className="font-satoshi text-xs md:text-sm text-[#6B7280] font-medium">Home</p>
                        <MdOutlineKeyboardArrowRight className='w-3 h-3 md:h-4 md:w-4' />
                        <p className="font-satoshi text-xs md:text-sm text-[#6B7280] font-medium">MediaCart</p>
                        <MdOutlineKeyboardArrowRight className='w-3 h-3 md:h-4 md:w-4' />
                        <p className="font-satoshi text-xs md:text-sm text-[#6B7280] font-medium">Order Summary</p>
                    </div>
                    <h2 className="font-satoshi font-bold text-2xl  mb-1.5 mt-8">Order Summary</h2>
                    <span className="text-[#6B7280] text-base font-satoshi mb-5 lg:mb-8 block">{cartItems.length} AdSpace</span>
                    <div className="rounded-lg flex-1  no-scrollbar ">
                        {cartItems.map((item, index) => (
                            <div
                                key={index}
                                className="p-2.5 bg-white border-b border-[#EEEEEE] last:border-b-0"
                            >
                                <div className="bg-white rounded-lg cursor-pointer flex xl:flex-row flex-col ">
                                    <div className="w-full shrink-0 xl:max-w-[25%] relative overflow-hidden ">
                                        <Image
                                            src={item.image}
                                            alt="Featured listing"
                                            width={300} // or your preferred width
                                            height={200} // or your preferred height
                                            className="w-full h-full max-h-[200px] object-cover rounded-lg object-center"
                                        />
                                    </div>
                                    <div className="flex-1 p-3.5 flex flex-col justify-center">
                                        <div className="flex flex-col gap-2.5">
                                            <h4 className="font-satoshi font-medium text-sm text-brand">{item.category}</h4>
                                            <h3 className="font-satoshi font-bold text-lg  lg:text-xl ">{item.title}</h3>
                                        </div>
                                            <div className="flex items-center gap-2.5 mt-4">
                                                <SlLocationPin className="w-4 h-4 text-brand" />
                                                <span className="font-medium text-sm font-satoshi">{item.location}</span>
                                            </div>
                                            <div className="lg:hidden mt-[1.125rem]">
                                                 <Calendar
                                                selectedDates={selectedDates[item.id] || []}
                                                onChange={(dates: Date[]) => setSelectedDates(prev => ({
                                                    ...prev,
                                                    [item.id]: dates
                                                }))}
                                                 onApplyAll={(dates: Date[]) => {
                                                    // Apply to all cart items
                                                    const all: { [key: number]: Date[] } = {};
                                                    cartItems.forEach(item => {
                                                      all[item.id] = dates;
                                                    });
                                                    setSelectedDates(all);
                                                  }}
                                            />
                                            </div>

                                        <div className="flex justify-between items-center gap-6 mt-[1.125rem]">
                                              
                                            <div className="flex items-center gap-3.5">
                                                <div className="hidden lg:block">
                                                 <Calendar
                                                selectedDates={selectedDates[item.id] || []}
                                                onChange={(dates: Date[]) => setSelectedDates(prev => ({
                                                    ...prev,
                                                    [item.id]: dates
                                                }))}
                                                onApplyAll={(dates: Date[]) => {
                                                    // Apply to all cart items
                                                    const all: { [key: number]: Date[] } = {};
                                                    cartItems.forEach(item => {
                                                      all[item.id] = dates;
                                                    });
                                                    setSelectedDates(all);
                                                  }}
                                            />
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <IoPricetagsOutline className="w-[1.125rem] h-[1.125rem]" />
                                                <p className="text-sm font-medium font-satoshi">Price on Request</p>
                                            </div>
                                           
                                            </div>
                                            <div className="flex items-center gap-3.5">
                                                <div className="p-2.5 rounded-full border border-[#EEEEEE]">
                                                    <CiHeart className="w-5 h-5 cursor-pointer text-[#6B7280] hover:text-red-600 transition" />
                                                </div>
                                                <div className="p-2.5 rounded-lg bg-[#FEE2E2]">
                                                <IoTrashOutline className="w-5 h-5 cursor-pointer text-[#EF4444]" />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Right: Summary */}
                <div className="flex-col flex md:w-[350px] space-y-[1.125rem]">
                <div className="w-full  flex-shrink-0 bg-white rounded-xl border border-[#EEEEEE] flex flex-col  ">
                    <div className="py-6 px-8">
                        <span className="font-satoshi font-medium text-base mb-4 block">Planning for</span>
                        <div className="flex flex-col gap-4">
                            {["Less than 3 Months", "3 - 6 Months", "6 - 9 Months", "9 - 12 Months"].map((option) => (
                                <label key={option} className="flex items-center gap-2.5 text-[#6B7280] text-base font-medium font-satoshi cursor-pointer">
                                    <input
                                        type="radio"
                                        name="planning"
                                        value={option}
                                        checked={planning === option}
                                        onChange={() => setPlanning(option)}
                                        className="accent-brand"
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="md:flex hidden items-center justify-between border border-[#EEEEEE] rounded-lg px-6 py-5">
                        <span className="flex items-center gap-2 font-satoshi font-medium text-base">
                            <PiMoneyWavy className="w-5 h-5" />
                            Total Price
                        </span>
                        <span className="font-satoshi font-bold text-base">0 AED</span>
                    </div>
                    <div className="px-6 py-5 hidden md:block">
                        <span className="font-satoshi font-medium text-base mb-2 block">Est. Budget for this Campaign</span>
                        <div className="flex items-center border border-[#EEEEEE] rounded-lg px-[1.125rem] py-4">
                            <input
                                type="number"
                                placeholder="Amount"
                                value={budget}
                                onChange={e => setBudget(e.target.value)}
                                className="flex-1 outline-none font-satoshi text-base"
                            />
                            <span className="ml-2 font-satoshi text-lg font-medium">AED</span>
                        </div>
                    </div>
                    <label className="md:flex hidden gap-3.5  text-base font-medium font-satoshi cursor-pointer p-6">
                        <input
                            type="checkbox"
                            checked={needCreative}
                            onChange={e => setNeedCreative(e.target.checked)}
                            className="accent-brand w-5 h-5 mt-1.5"
                        />
                        I need ad creatives to be designed for my campaign.
                    </label>
                    </div>
                    {/* Desktop Submit Inquiry Button */}
                    <button
                        className="w-full md:block hidden bg-brand text-white font-bold font-satoshi text-lg rounded-xl py-4"
                        onClick={() => setShowInquiryModal(true)}
                    >
                        Submit Inquiry
                    </button>
                    <p className="text-sm font-medium text-[#6B7280] px-5 py-4">
                        MediaDazz adheres to the highest standards of client data and information protection. To Know more, read our <a href="#" className="underline text-black">Privacy Policy</a> here.
                    </p>
                    </div>
                
            </div>
             
       <div className="fixed  bottom-0 md:hidden top-auto  lg:bottom-auto lg:top-28 left-0 right-0 z-10 bg-white backdrop-blur">
          <div className="px-6 py-5 lg:px-24 xl:px-[7.75rem] flex justify-between gap-6 xl:gap-6 items-center">

            <div className="flex justify-between w-full lg:w-auto lg:justify-items-start lg:flex-none  items-center gap-3 sm:gap-6">
              <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-4">
                        <span className="flex items-center gap-2 font-satoshi font-medium text-sm text-[#6B7280]">
                            <PiMoneyWavy className="w-5 h-5" />
                            Total Price
                        </span>
                        <span className="font-satoshi font-bold text-base">0 AED</span>
                    </div>
              <button
                        className="px-[1.125rem] flex-1 lg:flex-none  text-white cursor-pointer py-3 sm:py-4 bg-brand rounded-lg text-base xl:text-xl font-satoshi font-bold mx-auto justify-center hover:md:bg-gradient-to-r hover:md:from-orange-600 hover:md:to-orange-700 hover:md:shadow-lg flex items-center  hover:md:shadow-orange-500/25 hover:md:scale-[1.02]  outline-none  transition-all duration-300 ease-in-out transform gap-2.5"
                        onClick={() => setShowInquiryModal(true)}
                    >
                        Submit Inquiry
                    </button>
            </div>
          </div>
        </div>

        {/* Inquiry Received Modal */}
            {showInquiryModal && (
                <InquiryReceivedModal
                    onClose={() => setShowInquiryModal(false)}
                    count={cartItems.length}
                />
            )}
        </div>
    );
}