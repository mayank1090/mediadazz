"use client";

import React from 'react'

import { useRouter } from "next/navigation";
import { LuUser } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";
import Campaigns from '@/components/Campaigns';

const ContactUs = () => {
    const router = useRouter();
    return (
        <>
        <div className="py-[3.375rem] px-6 lg:p-24  xl:p-[7.75rem]">
            <div className="flex flex-col gap-3.5 text-center md:items-center ">
                <h3 className="font-satoshi font-bold text-xs md:text-sm text-brand">Contact Us</h3>
                <h2 className="font-satoshi font-bold text-4xl lg:text-4xl xl:text-5xl ">We’d Love to Hear From You</h2>
                <p className="font-satoshi lg:text-lg md:text-base max-w-3xl  font-medium text-xs text-[#6B7280] md:mt-2.5 ">Share your thoughts, suggestions, or any questions you may have with us. Your input helps us improve and enhance our services to better meet your needs.</p>
            </div>
            <div className="w-full max-w-3xl mx-auto mt-10 lg:mt-16 space-y-8">
                <div className=" space-y-5">
                    <div>
                        <label className="block text-base font-medium font-satoshi mb-3">Full Name</label>
                        <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
                            <LuUser className="h-6 w-6 mr-2" />
                            <input type="text" placeholder="Enter full name" className="w-full  placeholder-[#6B7280] outline-none font-satoshi" ></input>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-5">
                        <div className='flex-1'>
                            <label className="block text-base font-medium font-satoshi mb-3">Phone Number</label>
                            <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
                                <select className=" pr-[1.125rem] flex outline-none mr-[1.125rem] items-center font-satoshi text-base lg:text-lg font-medium">
                                    <option value="+971">+971</option>
                                    <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                    <option value="+91">+91</option>
                                </select>
                                <input type="text" placeholder="Phone Number" className="w-full  placeholder-[#6B7280] outline-none font-satoshi" ></input>
                            </div>
                        </div>
                        <div className='flex-1'>
                            <label className="block text-base font-medium font-satoshi mb-3">Email Address</label>
                            <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
                                <HiOutlineMail className="h-6 w-6 mr-2" />
                                <input type="email" placeholder="Enter business email" className="w-full  placeholder-[#6B7280] outline-none font-satoshi" ></input>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-5">
                        <div className='flex-1'>
                            <label className="block text-base font-medium font-satoshi mb-3">Query</label>
                            <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
                                <select className="w-full placeholder-[#6B7280] outline-none font-satoshi">
                                    <option value="">Select media</option>
                                    <option>Billboard</option>
                                    <option>Digital Screen</option>
                                    <option>TV Network</option>
                                    <option>Radio Station</option>
                                    <option>Print Platform</option>
                                    <option>Social Media Channel</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex-1'>
                            <label className="block text-base font-medium font-satoshi mb-3">Feild Name</label>
                            <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
                                <select className="w-full placeholder-[#6B7280] outline-none font-satoshi">
                                    <option value="">Select</option>
                                    <option>1-5</option>
                                    <option>6-20</option>
                                    <option>21-50</option>
                                    <option>51+</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-base font-medium font-satoshi mb-3">Message</label>
                        <textarea rows={3} placeholder="Creative formats, event tie-ins, sponsorships, language preferences, etc." className="w-full px-4 py-4 rounded-lg border border-[#EEEEEE]"></textarea>
                    </div>
                </div>
                 <button className='bg-brand text-white font-satoshi font-bold text-xl py-5  w-full rounded-lg'>Save</button>
            </div>
        </div>
        <Campaigns heading='Your brand deserves to shine where it matters most' buttonText='Request a Custom plan' />
        </>
    )
}

export default ContactUs