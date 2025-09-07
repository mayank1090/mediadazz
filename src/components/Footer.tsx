import NavLogo from "../../public/footerLogo.svg";
import { FaLinkedinIn } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { FaArrowUp } from "react-icons/fa";
import Image from "next/image";

export default function Footer (){
    return<>
    <div className="px-6 py-11 lg:py-[5.25rem] bg-black lg:px-24 xl:px-[7.5rem]">
        <div className="flex flex-col gap-8 lg:gap-28 md:flex-row justify-between">
            <div className="">
                <Image src={NavLogo} alt="footerLogo" className="w-[55%] text-white"/>
                <h3 className="font-medium mt-3 lg:mt-3.5 font-satoshi text-xs lg:text-sm text-white">Advertise Anywhere. From One Place</h3>
                <div className="mt-5 lg:mt-7 flex gap-1.5 lg:gap-2">
                    <div className="bg-[#FFFFFF1A] rounded-full h-[1.875rem] w-[1.875rem] lg:w-10 lg:h-10 p-1.5 lg:p-2 flex items-center justify-center">
                    <FaLinkedinIn className="w-[1.125rem] h-[1.125rem] lg:h-6 lg:w-6 text-white"/>
                    </div>
                    <div className="bg-[#FFFFFF1A] rounded-full h-[1.875rem] w-[1.875rem] lg:w-10 lg:h-10 p-1.5 lg:p-2 flex items-center justify-center">
                    <AiFillInstagram className="w-[1.125rem] h-[1.125rem] lg:h-6 lg:w-6 text-white"/>
                    </div>
                    <div className="bg-[#FFFFFF1A] rounded-full h-[1.875rem] w-[1.875rem] lg:w-10 lg:h-10 p-1.5 lg:p-2 flex items-center justify-center">
                    <FaYoutube className="w-[1.125rem] h-[1.125rem] lg:h-6 lg:w-6 text-white"/>
                    </div>
                </div>
                <div className="mt-9 lg:mt-12 flex gap-6 lg:gap-8">
                    <div className="">
                        <h2 className="font-satoshi text-xs text-white font-medium md:text-sm lg:text-base">FOR Marketers</h2>
                        <button className="mt-2.5 lg:mt-3.5 text-sm text-white font-bold lg:text-lg py-2.5 px-3.5 lg:py-4 lg:px-[1.125rem] bg-brand rounded-md lg:rounded-lg">
                        Get Started
                        </button>
                    </div>
                    <div className="">
                        <h2 className="font-satoshi text-xs text-white font-medium md:text-sm lg:text-base">FOR Media owners</h2>
                        <button className="mt-2.5 lg:mt-3.5 py-2.5 px-3.5 font-bold lg:py-4 text-sm lg:text-lg lg:px-[1.125rem] bg-[#FFEAE1] text-brand rounded-md lg:rounded-lg">
                        Join Mediadazz
                        </button>
                    </div>

                </div>
                <div className="mt-9 lg:mt-12 flex flex-col gap-1.5 lg:gap-2">
                    <p className="font-medium font-satoshi text-xs lg:text-sm text-white flex items-center gap-2.5 lg:gap-3"> <span><CiLocationOn className="h-3 w-3 lg:w-4 lg:h-4 text-white"/></span> Universe, Galaxies 16018, Milky Way.</p>
                    <p className="font-medium font-satoshi text-xs lg:text-sm text-white flex items-center gap-2.5 lg:gap-3"> <span><IoCallOutline className="h-3 w-3 lg:w-4 lg:h-4 text-white"/></span> (062) 818-2620</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-16 lg:gap-[5.25rem]">
                <div className="space-y-[1.125rem] lg:space-y-6">
                    <h4 className="font-medium font-satoshi text-xs lg:text-base text-white uppercase">Categories</h4>
                    <p className="text-[#FAFAFAB2] font-medium font-satoshi text-xs lg:text-base cursor-pointer ">Outdoor & OOH Media</p>
                    <p className="text-[#FAFAFAB2] font-medium font-satoshi text-xs lg:text-base cursor-pointer ">Print Media</p>
                    <p className="text-[#FAFAFAB2] font-medium font-satoshi text-xs lg:text-base cursor-pointer ">FM Radio</p>
                    <p className="text-[#FAFAFAB2] font-medium font-satoshi text-xs lg:text-base cursor-pointer ">TV Channels</p>
                    <p className="text-[#FAFAFAB2] font-medium font-satoshi text-xs lg:text-base cursor-pointer ">Social Media</p>
                    <p className="text-[#FAFAFAB2] font-medium font-satoshi text-xs lg:text-base cursor-pointer ">Events</p>
                    <p className="text-[#FAFAFAB2] font-medium font-satoshi text-xs lg:text-base cursor-pointer ">PR</p>
                    <p className="text-[#FAFAFAB2] font-medium font-satoshi text-xs lg:text-base cursor-pointer ">Direct</p>
                </div>
                <div className="space-y-[1.125rem] lg:space-y-6">
                <h4 className="font-medium font-satoshi text-xs lg:text-base text-white uppercase">GET TO KNOW US</h4>
                <p className="text-[#FAFAFAB2] font-medium font-satoshi text-xs lg:text-base cursor-pointer  ">Privacy Policy</p>
                <p className="text-[#FAFAFAB2] font-medium font-satoshi text-xs lg:text-base cursor-pointer ">Help Center</p>
                <p className="text-[#FAFAFAB2] font-medium font-satoshi text-xs lg:text-base cursor-pointer ">Blogs</p>
                <p className="text-[#FAFAFAB2] font-medium font-satoshi text-xs lg:text-base cursor-pointer ">Benefits</p>
                <p className="text-[#FAFAFAB2] font-medium font-satoshi text-xs lg:text-base cursor-pointer ">FAQs</p>
                <p className="text-[#FAFAFAB2] font-medium font-satoshi text-xs lg:text-base cursor-pointer ">Careers</p>
                <p className="text-[#FAFAFAB2] font-medium font-satoshi text-xs lg:text-base cursor-pointer ">Login</p>
                <p className="text-[#FAFAFAB2] font-medium font-satoshi text-xs lg:text-base cursor-pointer ">Sign Up</p>
                </div>
            </div>

           
        </div>
        <button className="flex items-center mt-7 lg:mt-9 text-white gap-2 lg:gap-2.5 font-bold font-satoshi text-xs lg:text-sm "><span className="h-6 w-6 lg:h-8 lg:w-8 border border-[#E7E8EA] rounded-full flex items-center justify-center">
            <FaArrowUp className="h-3 w-3 lg:w-5 lg:h-5 text-white font-normal"/>
            </span>Scroll to top</button>
            <div className="pt-6 lg:pt-8 mt-7 lg:mt-9 border-t border-[#FFFFFF26] flex flex-col md:flex-row gap-[1.125rem] justify-between">
                <h5 className="text-xs lg:text-sm text-[#6B7280] font-satoshi">©2025 – MediaDazz.com. All Rights Reserved.</h5>
                <div className="flex justify-between gap-2 md:justify-baseline md:gap-28">
                <h5 className="text-xs lg:text-sm text-[#6B7280] font-satoshi cursor-pointer">Term and Conditions</h5>
                <h5 className="text-xs lg:text-sm text-[#6B7280] font-satoshi cursor-pointer">Privacy Policy</h5>
                </div>
            </div>
    </div>
    </>
}