import React from 'react'
import Image from 'next/image';
import campaign from "../../../public/campaigns.png"
import campone from "../../../public/campone.svg";
import camptwo from "../../../public/camptwo.svg";
import campthree from "../../../public/campthree.svg";
import campbenefitone from "../../../public/campbenefitone.svg";
import campbenefittwo from "../../../public/campbenefittwo.svg";
import campbenefitthree from "../../../public/campbenefitthree.svg";
import campbenefitfour from "../../../public/campbenefitforth.svg";
import Planyourcampaign from '@/components/Planyourcampaign';
import logosample from "../../../public/Logosample.svg"
import Campaigns from '@/components/Campaigns';
import { BsCheckCircleFill } from "react-icons/bs";

const dummyText = [
    {
        icon: campbenefitone,
        title: "Save Time and Effort",
        description: "The traditional way of buying media is slow and fragmented, consisting of calling sales reps, chasing rates, and endless negotiating. With MediaDazz, you fill in one simple form and instantly reach a network of media owners who are ready to pitch relevant options."
    },
     {
        icon: campbenefittwo,
        title: "Access a Wide Range of Media Options",
        description: "From billboards on Sheikh Zayed Road to digital screens in Dubai Mall, TV prime-time slots, or Instagram influencer partnerships, MediaDazz brings every kind of media together under one roof. You get a 360° view of what’s available in your market."
    },
     {
        icon: campbenefitthree,
        title: "Get Unbeatable Pricing",
        description: "Because multiple media owners respond to your brief, you can compare offers side-by-side and choose the one that gives you the best reach, cost, and creativity for your budget."
    },
     {
        icon: campbenefitfour,
        title: "Verified Media Owners Only",
        description: "Every media owner on MediaDazz goes through a verification process. This ensures you only receive proposals from genuine, authorized vendors, reducing the risk of fraud or wasted spend."
    },

]

const problems = [
  {text: "😕 Endless back-and-forth calls" },
  { text: "😕 Limited to vendors you already know" },
  { text: "😕 Opaque pricing & hidden commissions" },
  { text: "😕 Slow turnarounds" },
  { text: "😕 Hard to compare different media types" },
];

const benefits = [
  { icon: <BsCheckCircleFill className="text-[#22C55E] inline mr-2 lg:mr-3" />, text: "Submit one form, get multiple proposals" },
  { icon: <BsCheckCircleFill className="text-[#22C55E] inline mr-2 lg:mr-3" />, text: "Access a nationwide network of verified media owners" },
  { icon: <BsCheckCircleFill className="text-[#22C55E] inline mr-2 lg:mr-3" />, text: "Transparent proposals with clear cost models" },
  { icon: <BsCheckCircleFill className="text-[#22C55E] inline mr-2 lg:mr-3" />, text: "Quick responses from vendors who want your business" },
  { icon: <BsCheckCircleFill className="text-[#22C55E] inline mr-2 lg:mr-3" />, text: "Side-by-side comparison across OOH, TV, digital, print, influencers, and more" },
];

const campaignsPage = () => {

    return (
        <div className="">
            <div className='mt-[5.5rem] lg:mt-28  px-6 pt-14 flex flex-col-reverse gap-10 md:gap-12 md:flex-row justify-between md:items-center  md:py-16 lg:px-24 xl:px-[7.75rem] '>
                <div className="md:flex-1">
                    <p className="font-satoshi font-bold xl:text-[4rem] xl:leading-[5.25rem] text-4xl md:text-5xl"><span className='text-brand'>Get the best</span> available media spaces for your campaign.</p>
                    <h5 className="text-sm pt-7 md:pt-10 xl:pt-12 font-medium md:text-base font-satoshi text-[#6B7280] lg:text-2xl">Get expert recommendations for your brand from UAE’s leading verified media owners.</h5>
                </div>
                <Image src={campaign} alt='campaign' className='md:w-[40%] md:shrink-0' />
            </div>
            <div className="px-6 py-14 md:pt-8 md:pb-16 lg:px-24 xl:px-[7.75rem] ">
                <div className=" gap-4 md:gap-6 grid sm:grid-cols-2 md:grid-cols-3">
                    <div className="px-6 md:px-8 md:py-7 py-5 border border-[#EEEEEE] rounded-[0.875rem] ">
                        <div className="w-14 h-14 md:w-[4.5rem] md:h-[4.5rem] rounded-full flex items-center justify-center bg-[#FFEAE1]">
                            <div className="w-11 h-11 md:w-[3.75rem] md:h-[3.75rem] rounded-full flex items-center justify-center bg-brand ">
                                <Image src={campone} alt="advantages" className="md:h-9 md:w-9 w-7 h-7 " />
                            </div>
                        </div>
                        <div className="mt-4 md:mt-6 flex flex-col gap-1.5 md:gap-2">
                            <h3 className="font-satoshi font-bold text-base md:text-xl">Tailored Media Proposal</h3>
                            <h4 className="text-[#6B7280] font-medium font-satoshi text-sm md:text-lg">Stay updated about the performance of your ad campaign</h4>
                        </div>
                    </div>
                    <div className="px-6 md:px-8 md:py-7 py-5 border border-[#EEEEEE] rounded-[0.875rem] ">
                        <div className="w-14 h-14 md:w-[4.5rem] md:h-[4.5rem] rounded-full flex items-center justify-center bg-[#FFEAE1]">
                            <div className="w-11 h-11 md:w-[3.75rem] md:h-[3.75rem] rounded-full flex items-center justify-center bg-brand ">
                                <Image src={camptwo} alt="advantages" className="md:h-9 md:w-9 w-7 h-7 " />
                            </div>
                        </div>
                        <div className="mt-4 md:mt-6 flex flex-col gap-1.5 md:gap-2">
                            <h3 className="font-satoshi font-bold text-base md:text-xl">Transparent Pricing</h3>
                            <h4 className="text-[#6B7280] font-medium font-satoshi text-sm md:text-lg">Get the right media for your campaigns at the best prices</h4>
                        </div>
                    </div>
                    <div className="px-6 md:px-8 md:py-7 py-5 border border-[#EEEEEE] rounded-[0.875rem] ">
                        <div className="w-14 h-14 md:w-[4.5rem] md:h-[4.5rem] rounded-full flex items-center justify-center bg-[#FFEAE1]">
                            <div className="w-11 h-11 md:w-[3.75rem] md:h-[3.75rem] rounded-full flex items-center justify-center bg-brand ">
                                <Image src={campthree} alt="advantages" className="md:h-9 md:w-9 w-7 h-7 " />
                            </div>
                        </div>
                        <div className="mt-4 md:mt-6 flex flex-col gap-1.5 md:gap-2">
                            <h3 className="font-satoshi font-bold text-base md:text-xl">Expanded Media Network</h3>
                            <h4 className="text-[#6B7280] font-medium font-satoshi text-sm md:text-lg">Get recommendations and reviews to make your campaign better</h4>
                        </div>
                    </div>
                </div>
                <h3 className=" pt-8 md:pt-12 text-center lg:pt-16 font-satoshi text-sm text-[#6B7280] font-medium lg:text-2xl md:text-xl ">Submit a single <span className='font-bold text-black'>campaign brief</span> and receive a tailored proposal with media from top vendors across <span className='font-bold text-black'>OOH, TV, radio, print, digital, and many more channels, as per your preference.</span></h3>
            </div>
            <div className="px-6 md:bg-[#FAFAFA] py-14 lg:py-20 md:pt-8 md:pb-16 lg:px-24 xl:px-[7.75rem] ">

                <div className="space-y-6 md:space-y-3.5">
                    <p className="text-xs md:text-sm font-bold font-satoshi text-brand">BENEFITS</p>
                    <h2 className="font-bold text-4xl lg:text-5xl font-satoshi">Why Use MediaDazz for Your Campaign?</h2>
                    <h4 className="font-medium text-sm lg:text-lg font-satoshi text-[#6B7280]">Discover the widest network of media spaces across all channels.</h4>
                </div>
                <div className="mt-6 md:mt-12 lg:mt-16 flex flex-col gap-7 md:gap-3.5">
                 {dummyText.map((item, index)=>
                 <div key={index} className="rounded-xl md:rounded-[0.625rem] p-3 md:p-2.5 flex gap-1.5 md:gap-2.5 flex-col md:flex-row md:items-center border border-[#EEEEEE] bg-white">
                        <div className="bg-[#FFEAE1] py-9 md:p-9 rounded-lg shrink-0 ">
                            <Image src={item?.icon} alt="benefitone" className='h-12 w-12 mx-auto shrink-0' />
                        </div>
                        <div className="p-3 md:p-3.5">
                            <h3 className="font-bold text-xl font-satoshi">{item?.title}</h3>
                            <h5 className="pt-2.5 md:pt-2 text-base md:text-lg font-medium font-satoshi text-[#6B7280]">{item?.description}</h5>
                        </div>
                    </div>)}   
                </div>
            </div>
            <Planyourcampaign/>
            <div className="px-6  py-14 lg:py-20 md:pt-8 md:pb-16 lg:px-24 xl:px-[7.75rem] ">

                <div className="space-y-6 md:space-y-3.5">
                    <p className="text-xs md:text-sm font-bold font-satoshi text-brand">ADVANTAGE</p>
                    <h2 className="font-bold text-4xl lg:text-5xl font-satoshi">How MediaDazz Gives You an Advantage</h2>
                    <h4 className="font-medium text-sm lg:text-lg font-satoshi text-[#6B7280]">MediaDazz is the UAE’s first all-in-one media marketplace where marketers, advertisers, and business owners can easily connect with verified media owners across all categories. Whether you’re planning a nationwide campaign or a hyper-local activation, MediaDazz can help you find, compare, and book the right media for your brand with just a few clicks.</h4>
                </div>

                <div className="flex gap-12 flex-col lg:flex-row mt-16">
                    <div className="border flex-1 border-[#EEEEEE] rounded-[0.875rem] overflow-hidden">
                        <p className="py-6 md:py-8 bg-[#FAFAFA] px-4 text-lg md:text-xl font-bold font-satoshi text-center">Traditional Media Buying</p>
                        {problems.map((item, index) => (
                            <div key={index} className="p-6 font-medium text-base font-satoshi border-b border-[#EEEEEE] last:border-b-0">{item.text}</div>
                        ))}
                    </div>
                    <p className="font-bold text-[2rem] text-center font-satoshi lg:mt-[1.875rem]">Vs</p>
                     <div className="border flex-1 border-[#EEEEEE] rounded-[0.875rem] overflow-hidden">
                        <p className="py-6 md:py-8 bg-[#FFEAE1] px-4 text-lg md:text-xl font-bold font-satoshi text-center"><Image src={logosample} alt="benefit icon" className='h-7 mx-auto shrink-0' /></p>
                        {benefits.map((item, index) => (
                            <div key={index} className="p-6 font-medium text-base lg:text-xl font-satoshi border-b border-[#EEEEEE] last:border-b-0">
                              <span>{item.icon}</span>{item.text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Campaigns heading='Your brand deserves to shine where it matters most'  buttonText='Request a Custom plan'/>
        </div>
    )
}

export default campaignsPage