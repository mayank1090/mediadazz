import React from 'react';
import blogOne from "../../../public/blogone.png";
import Image from 'next/image';
import campone from "../../../public/campone.svg";
import camptwo from "../../../public/camptwo.svg";
import campthree from "../../../public/campthree.svg";
import aboutone from "../../../public/aboutone.png";
import abouttwo from "../../../public/abouttwo.png";
import aboutthree from "../../../public/aboutthree.png";
import { BsArrowRight } from "react-icons/bs";
import whyusone from "../../../public/whyusone.svg";
import whyustwo from "../../../public/whyustwo.svg";
import whyusthree from "../../../public/whyusthree.svg";
import FAQ from '@/components/FAQ';
import Campaigns from '@/components/Campaigns';

const dummyText = [
    {
        icon: whyusone,
        title: "Transparency you can trust",
        description: ["We share every detail clearly, from pricing to placements, so you always know what you’re paying for.",
  <> <strong>No hidden charges or last-minute surprises</strong>—just complete honesty and clarity in everything we do.</>]
    },
    {
        icon: whyustwo,
        title: "Simplicity that Works",
        description: ["Our platform is built to make advertising smooth, intuitive, and easy for everyone, even first-time users.",
"We handle the complexity behind the scenes so you can focus only on results, not processes."]
    },
    {
        icon: whyusthree,
        title: "More Sales",
        description: ["With data-driven insights, we help you plan campaigns that are precise, targeted, and highly effective.",
"Advanced tools ensure your brand reaches the right people at the right time for maximum impact."]
    }

]


const whyMedia = [
    {
        id: 1,
        img: aboutone,
        title: "For Agencies",
        desc: "Streamline campaign management with smarter tools that save time, reduce complexity, and deliver results for your clients.",
        points: ["Transparent process", "Simplified campaign management", "Transparent media buying"]
    },
    {
        id: 2,
        img: abouttwo,
        title: "For Business",
        desc: "Reach your audience faster with simple, transparent, and effective advertising solutions tailored for growth.",
        points: ["Drive measurable growth", "Reach the right audience", "Easy & Transparent Advertising"]
    },
    {
        id: 3,
        img: aboutthree,
        title: "For Media Owners",
        desc: "Showcase your media spaces with ease and transparency while connecting with the right brands and maximizing returns.",
        points: ["List & Manage Spaces easily", "Connect with trusted Advertisers", "Maximize revenue potential"]
    },
]

const AboutUsPage = () => {
    return (
        <>
            < div className='mt-[5.5rem] lg:mt-28  px-6 pt-14 flex flex-col gap-6 md:gap-16 justify-between md:items-center  md:py-16 lg:py-[5.375rem] lg:px-24 xl:px-[7.75rem] '>
                <div className="flex items-center justify-center w-full">
                    <div className="text-center">
                        <h1 className="font-satoshi mx-auto lg:leading-[5.25rem] md:leading-16 text-[2.375rem] leading-12 md:text-5xl lg:text-[4rem] font-bold text-black ">
                            About Media<span className='text-brand'>Dazz</span>
                        </h1>
                        <p className="mt-3.5 md:mt-5 lg:max-w-[80%] mx-auto lg:mt-6 text-base md:text-xl lg:text-2xl font-medium font-satoshi text-[#6B7280] sm:text-lg">
                            Learn who we are, what we do, and why MediaDazz is making advertising clearer and more effective.
                        </p>
                    </div>
                </div>
                <Image src={blogOne} alt="aboutus" className='w-full rounded-[0.625rem] md:rounded-[0.875rem] max-h-[520px]' />
            </div>
            <div className="px-6  flex flex-col md:flex-row  md:items-stretch gap-11 md:gap-14 lg:gap-20 py-14 lg:py-20 md:pt-8 md:pb-16 lg:px-24 xl:px-[7.75rem] ">
                <div className="flex-1">
                    <div className="space-y-6 md:space-y-3.5 ">
                        <p className="text-xs md:text-sm font-bold font-satoshi text-brand">OUR MISSION</p>
                        <h2 className="font-bold text-4xl lg:text-5xl font-satoshi">We Believe Reaching Your Customers Should be Easier</h2>
                        <h4 className="font-medium text-sm lg:text-lg font-satoshi text-[#6B7280]">MediaDazz was built to remove the complexity from advertising. By combining technology with transparency, we help businesses, agencies, and media owners connect seamlessly.</h4>
                    </div>
                    <div className="flex gap-4 md:gap-5 mt-10">
                        <button className='rounded-md md:rounded-lg border border-[#EEEEEE] py-3 px-4 md:py-4 md:px-5 text-sm md:text-lg font-medium font-satoshi'>Inquire now</button>
                        <button className='rounded-md md:rounded-lg bg-brand py-3 px-4 md:py-4 md:px-5 text-sm md:text-lg font-bold text-white font-satoshi'>Learn more</button>
                    </div>
                </div>
                <div className="flex-1">
                    <Image src={blogOne} alt="aboutus" className="w-full h-full object-cover object-center rounded-xl md:rounded-2xl" />
                </div>

            </div>
            <div className="px-6  py-14 lg:py-20 md:pt-8 md:pb-16 lg:px-24 xl:px-[7.75rem] ">

                <div className="space-y-6 md:space-y-3.5 flex flex-col justify-center text-center">
                    <p className="text-xs md:text-sm font-bold font-satoshi text-brand">WHAT</p>
                    <h2 className="font-bold text-4xl lg:text-5xl font-satoshi">What We Do ?</h2>
                    <h4 className="font-medium text-sm lg:text-lg font-satoshi text-[#6B7280]">Why listing your media spaces on MediaDazz gives you more reach, more leads, and more sales.</h4>
                </div>

                <div className=" gap-6 grid md:grid-cols-2  mt-10 md:mt-14 lg:mt-16">
                    <div className="px-6 md:px-8 md:py-7 py-5 border border-[#EEEEEE] rounded-[0.875rem] ">
                        <div className="w-14 h-14 md:w-[4.5rem] md:h-[4.5rem] rounded-full flex items-center justify-center bg-[#FFEAE1]">
                            <div className="w-11 h-11 md:w-[3.75rem] md:h-[3.75rem] rounded-full flex items-center justify-center bg-brand ">
                                <Image src={campone} alt="advantages" className="md:h-9 md:w-9 w-7 h-7 " />
                            </div>
                        </div>
                        <div className="mt-4 md:mt-6 flex flex-col gap-1.5 md:gap-2">
                            <h3 className="font-satoshi font-bold text-base md:text-xl">No listing fees</h3>
                            <h4 className="text-[#6B7280] font-medium font-satoshi text-sm md:text-lg">Join MediaDazz at no upfront cost. List your inventory, showcase your assets, and reach thousands of marketers and business owners who are actively searching for spaces to advertise on.</h4>
                        </div>
                    </div>
                    <div className="px-6 md:px-8 md:py-7 py-5 border border-[#EEEEEE] rounded-[0.875rem] ">
                        <div className="w-14 h-14 md:w-[4.5rem] md:h-[4.5rem] rounded-full flex items-center justify-center bg-[#FFEAE1]">
                            <div className="w-11 h-11 md:w-[3.75rem] md:h-[3.75rem] rounded-full flex items-center justify-center bg-brand ">
                                <Image src={camptwo} alt="advantages" className="md:h-9 md:w-9 w-7 h-7 " />
                            </div>
                        </div>
                        <div className="mt-4 md:mt-6 flex flex-col gap-1.5 md:gap-2">
                            <h3 className="font-satoshi font-bold text-base md:text-xl">Reach thousands of potential clients</h3>
                            <h4 className="text-[#6B7280] font-medium font-satoshi text-sm md:text-lg">Gain exposure to marketers, SMEs, agencies, and global brands actively searching for advertising options in Dubai, the UAE, and beyond.</h4>
                        </div>
                    </div>
                    <div className="px-6 md:px-8 md:py-7 py-5 border border-[#EEEEEE] rounded-[0.875rem] ">
                        <div className="w-14 h-14 md:w-[4.5rem] md:h-[4.5rem] rounded-full flex items-center justify-center bg-[#FFEAE1]">
                            <div className="w-11 h-11 md:w-[3.75rem] md:h-[3.75rem] rounded-full flex items-center justify-center bg-brand ">
                                <Image src={campthree} alt="advantages" className="md:h-9 md:w-9 w-7 h-7 " />
                            </div>
                        </div>
                        <div className="mt-4 md:mt-6 flex flex-col gap-1.5 md:gap-2">
                            <h3 className="font-satoshi font-bold text-base md:text-xl">A space for all kinds of media</h3>
                            <h4 className="text-[#6B7280] font-medium font-satoshi text-sm md:text-lg">Whether you own outdoor billboards, digital signage, radio slots, TV airtime, influencer channels, or print spaces, MediaDazz brings every format together under one roof.</h4>
                        </div>
                    </div>
                    <div className="px-6 md:px-8 md:py-7 py-5 border border-[#EEEEEE] rounded-[0.875rem] ">
                        <div className="w-14 h-14 md:w-[4.5rem] md:h-[4.5rem] rounded-full flex items-center justify-center bg-[#FFEAE1]">
                            <div className="w-11 h-11 md:w-[3.75rem] md:h-[3.75rem] rounded-full flex items-center justify-center bg-brand ">
                                <Image src={campthree} alt="advantages" className="md:h-9 md:w-9 w-7 h-7 " />
                            </div>
                        </div>
                        <div className="mt-4 md:mt-6 flex flex-col gap-1.5 md:gap-2">
                            <h3 className="font-satoshi font-bold text-base md:text-xl">Manage your inventory</h3>
                            <h4 className="text-[#6B7280] font-medium font-satoshi text-sm md:text-lg">Easily upload, update, and track your media assets. From availability calendars to rate cards, you stay in control of how your media is presented and sold.</h4>
                        </div>
                    </div>
                </div>

            </div>
            <div className="px-6 py-14 lg:py-20 md:pt-8 md:pb-16 lg:px-24 xl:px-[7.75rem] ">

                <div className="space-y-6 md:space-y-3.5 flex flex-col justify-center text-center">
                    <p className="text-xs md:text-sm font-bold font-satoshi text-brand">Why Us</p>
                    <h2 className="font-bold text-4xl lg:text-5xl font-satoshi">Why MediaDazz ?</h2>
                    <h4 className="font-medium text-sm lg:text-lg font-satoshi text-[#6B7280]">.Designed for businesses, agencies, and media owners.</h4>
                </div>

                <div className=" gap-6 grid md:grid-cols-2 lg:grid-cols-3 mt-10 md:mt-14 lg:mt-16">
                {whyMedia.map((item)=>  <div key={item.id} className=" pt-8 border flex flex-col border-[#EEEEEE] rounded-[0.875rem] ">
                      <div className=''>
                        <div className=" mx-6 md:mx-8 p-2 border-[0.5px] border-brand rounded-full w-fit">

                            <Image src={item.img} alt="advantages" className="h-9 w-9 " />
                        </div>
                        <div className="px-6 md:px-8 pb-8 mt-4 md:mt-6 flex flex-col gap-1.5 md:gap-2">
                            <h3 className="font-satoshi font-bold text-2xl">{item.title}</h3>
                            <h4 className="text-[#6B7280] font-normal font-satoshi text-sm md:text-base">{item.desc}</h4>
                        </div>
                        </div>
                       {item.points.map((point, index)=>  <div key={index} className="px-8 flex-1 py-6 border-t  border-[#EEEEEE] items-center flex gap-2.5">
                            <BsArrowRight className='text-brand w-6' />
                            <p className="text-lg font-medium font-satoshi ">{point}</p>
                        </div>)} 
                     
                    </div>
                )}    
              
                </div>

            </div>
             <div className="px-6 py-14 lg:py-20 md:pt-8 md:pb-16 lg:px-24 xl:px-[7.75rem] ">
            
                            <div className="space-y-6 md:space-y-3.5 flex flex-col justify-center text-center">
                                <p className="text-xs md:text-sm font-bold font-satoshi text-brand">Why Us</p>
                                <h2 className="font-bold text-4xl lg:text-5xl font-satoshi">Why People Love MediaDazz ❤️</h2>
                                <h4 className="font-medium text-sm lg:text-lg font-satoshi text-[#6B7280]">Built on clarity, trust, and growth.</h4>
                            </div>
                            <div className="mt-6 md:mt-12 lg:mt-16 flex flex-col gap-7 md:gap-3.5">
                                {dummyText.map((item, index) =>
                                    <div key={index} className="rounded-xl md:rounded-[0.625rem] p-3 md:p-2.5 flex gap-1.5 md:gap-2.5 flex-col md:flex-row md:items-center border border-[#EEEEEE] bg-white">
                                        <div className="bg-[#FFEAE1] py-9 md:p-9 rounded-lg shrink-0 ">
                                            <Image src={item?.icon} alt="benefitone" className='h-12 w-12 mx-auto shrink-0' />
                                        </div>
                                        <div className="p-3 md:p-3.5">
                                            <h3 className="font-bold text-xl font-satoshi">{item?.title}</h3>
                                           <ul className='list-disc mt-2 ml-5'>
                                         {item.description.map((des,index) => <li className='text-lg font-satoshi' key={index}>{des}</li>)} 
                                           </ul>
                                        </div>
                                    </div>)}
                            </div>
                        </div>
                        <FAQ/>
                         <Campaigns heading='Your brand deserves to shine where it matters most' buttonText='Request a Custom plan' />
        </>
    )
}

export default AboutUsPage