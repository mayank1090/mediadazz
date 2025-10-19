import React from 'react'
import joinone from "../../../public/joinone.svg";
import jointwo from "../../../public/jointwo.svg";
import jointhree from "../../../public/jointhree.svg";
import Image from 'next/image';
import { LuUser } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";
import { RiContactsBook3Line } from "react-icons/ri";
import { TfiLayoutMediaLeftAlt } from "react-icons/tfi";
import { PiListNumbers } from "react-icons/pi";
import campone from "../../../public/campone.svg";
import camptwo from "../../../public/camptwo.svg";
import campthree from "../../../public/campthree.svg";
import blogOne from "../../../public/blogone.png";
import benefitone from "../../../public/benefitone.svg";
import benefittwo from "../../../public/benefittwo.svg";
import benefitthree from "../../../public/benefitthree.svg";
import benefitfour from "../../../public/benefitforth.svg";  
import benefitfive from "../../../public/benefitfive.svg";
import benefitsix from "../../../public/benefitsix.svg";  
import benefitseven from "../../../public/benefitseven.svg";
import benefiteight from "../../../public/benefiteight.svg";  
import benefitnine from "../../../public/benefitnine.svg";
import benefitten from "../../../public/benefitten.svg";
import { BsArrowRight } from "react-icons/bs";
import FAQ from '@/components/FAQ';
import Campaigns from '@/components/Campaigns';

const dummyText = [
  {
    icon: joinone,
    title: "More Reach",
    description: <>"MediaDazz connects you to advertisers beyond your current network. From local businesses and startups to multinational brands, our platform ensures your media assets are<strong className='text-black'> discoverable by decision-makers across industries.</strong> This means you don’t just depend on your sales team. Your spaces are always working to attract new clients."</>
  },
  {
    icon: jointwo,
    title: "More Leads",
    description: <>"Every campaign brief submitted on MediaDazz becomes a potential lead for you. When marketers share their requirements, you can <strong className='text-black'> respond with tailored proposals </strong> that match their goals. This gives you qualified leads from businesses with real budgets and clear intent to advertise."</>
  },
  {
    icon: jointhree,
    title: "More Sales",
    description: <>"More visibility and more leads naturally translate into more sales. With MediaDazz, you spend less time prospecting and more time closing. By tapping into a marketplace of advertisers who are already in buying mode, you can<strong className='text-black'> increase inventory fill rates</strong>, reduce unsold space, and grow your revenue."</>
  }

]

const mediadazzBenifits=[
  {
    "id": benefitone,
    "title": "Outdoor Advertising (OOH)",
    "description": "Billboards, unipoles, lampposts, bridges, rooftops, digital LED screens, and transit media across Dubai, Abu Dhabi, and other UAE cities."
  },
  {
    "id": benefittwo,
    "title": "Digital Out-of-Home (DOOH)",
    "description": "Mall screens, airport displays, metro and taxi screens, elevator panels, and digital kiosks in high-traffic locations."
  },
  {
    "id": benefitthree,
    "title": "TV Networks",
    "description": "Prime-time slots, regional programming, sponsorship integrations, and niche channel packages."
  },
  {
    "id": benefitfour,
    "title": "Radio Stations",
    "description": "FM and AM spots, branded segments, sponsorships, and commuter-focused campaigns."
  },
  {
    "id": benefitfive,
    "title": "Print Media",
    "description": "Newspapers, magazines, business journals, and niche publications targeting specific industries or audiences."
  },
  {
    "id": benefitsix,
    "title": "Cinema Advertising",
    "description": "Pre-show ads, lobby displays, on-screen activations, and immersive brand integrations."
  },
  {
    "id": benefitseven,
    "title": "Social & Influencer Marketing",
    "description": "Instagram, TikTok, YouTube, LinkedIn creators, and micro-influencers with targeted audience reach."
  },
  {
    "id": benefiteight,
    "title": "Content Publishing Websites & Portals",
    "description": "Online news sites, lifestyle portals, industry platforms, and niche digital publishers offering display ads, sponsored content, and branded collaborations."
  },
  {
    "id": benefitnine,
    "title": "Event Venues & Sponsorships",
    "description": "Exhibition centers, stadium branding, sports events, concerts, festivals, and corporate gatherings."
  },
  {
    "id": benefitten,
    "title": "Underrated Media Opportunities",
    "description": "Branded delivery cars, in-store digital displays, retail point-of-sale screens, co-working space ads, and elevator screens."
  }
]

const anoterbefit=[
  "Gain direct visibility with marketers, SMEs, and global brands planning campaigns in Dubai and across the UAE.",
  "Unlock new revenue streams from advertisers searching for both mainstream and alternative media formats.",
  "Access a platform that levels the playing field, giving equal exposure to popular and niche media spaces."
]

const JoinMediaDazz = () => {
  return (
    <>
      < div className='mt-[5.5rem] lg:mt-28  px-6 pt-14 flex flex-col gap-6 md:gap-16 justify-between md:items-center  md:py-16 lg:py-[5.375rem] lg:px-24 xl:px-[7.75rem] '>
        <div className="flex items-center justify-center w-full">
          <div className="text-center">
            <h1 className="font-satoshi mx-auto lg:leading-[5.25rem] md:leading-16 text-[2.375rem] leading-12 md:text-5xl lg:text-[4rem] font-bold text-black ">
              Join Media<span className='text-brand'>Dazz</span>
            </h1>
            <p className="mt-3.5 md:mt-5 lg:max-w-[80%] mx-auto lg:mt-6 text-base md:text-xl lg:text-2xl font-medium font-satoshi text-[#6B7280] sm:text-lg">
              Learn who we are, what we do, and why MediaDazz is making advertising clearer and more effective.
            </p>
          </div>
        </div>
      </div>
      <div className="px-6  flex flex-col lg:flex-row  md:items-stretch gap-14 md:gap-16  py-14 lg:py-20 md:pt-8 md:pb-16 lg:px-24 xl:px-[7.75rem] ">
        <div className="lg:w-[58%] lg:shrink-0">
          <div className="space-y-6 md:space-y-3.5 ">
            <p className="text-xs md:text-sm font-bold font-satoshi text-brand">Media Listing</p>
            <h2 className="font-bold text-4xl lg:text-5xl font-satoshi">List Your Media Spaces in Dubai & UAE with MediaDazz</h2>
            <h4 className="font-medium text-sm lg:text-lg font-satoshi text-[#6B7280]">Get discovered by thousands of marketers, brands, and advertisers ready to book</h4>
          </div>
          <div className="mt-10 md:mt-16">
            <p className="text-xs md:text-base lg:text-lg font-medium font-satoshi text-[#6B7280]">With MediaDazz, your advertising spaces, whether billboards, digital screens, TV networks, radio stations, print platforms, or social media channels, are showcased directly to a highly active community of marketers, brands, and business owners who are already searching for the right media solutions. This means your inventory, as a media owner, gets immediate visibility with decision-makers, giving you more opportunities to convert interest into sales. Instead of waiting for cold calls or relying only on existing relationships, you gain instant visibility on a trusted marketplace designed for your growth.</p>
          </div>
          <div className='formdiv w-full lg:hidden mt-14'>
            <form className="bg-white rounded-2xl shadow-sm border border-[#EEEEEE] flex flex-col gap-4">
              <div className='p-6 border-b border-[#EEEEEE]'>
                <p className="text-xs font-bold text-brand font-satoshi mb-1">Contact Form</p>
                <h3 className="font-bold text-xl font-satoshi">List Your Media Spaces in Dubai & UAE</h3>
                <p className="text-base font-medium text-[#6B7280] font-satoshi">Connect Directly with Advertisers</p>
              </div>
              <div className="p-6 pt-0 space-y-[1.125rem]">
                <div>
                  <label className="block text-base font-medium font-satoshi mb-3">Full Name</label>
                  <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
                    <LuUser className="h-6 w-6 mr-2" />
                    <input type="text" placeholder="Enter full name" className="w-full  placeholder-[#6B7280] outline-none font-satoshi" ></input>
                  </div>
                </div>
                <div>
                  <label className="block text-base font-medium font-satoshi mb-3">Business E-mail</label>
                  <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
                    <HiOutlineMail className="h-6 w-6 mr-2" />
                    <input type="email" placeholder="Enter business email" className="w-full  placeholder-[#6B7280] outline-none font-satoshi" ></input>
                  </div>
                </div>
                <div>
                  <label className="block text-base font-medium font-satoshi mb-3">Contact No</label>
                  <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
                    <RiContactsBook3Line className="h-6 w-6 mr-2" />
                    <input type="tel" placeholder="Enter contact no" className="w-full  placeholder-[#6B7280] outline-none font-satoshi" ></input>
                  </div>
                </div>
                <div>

                  <div>
                    <label className="block text-base font-medium font-satoshi mb-3">Campaign Objective</label>
                    <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
                      <TfiLayoutMediaLeftAlt className="h-6 w-6 mr-2" />
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

                </div>
                <div>
                  <label className="block text-base font-medium font-satoshi mb-3">No of Media Spaces</label>
                  <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
                    <PiListNumbers className="h-6 w-6 mr-2" />
                    <select className="w-full placeholder-[#6B7280] outline-none font-satoshi">
                      <option value="">Select</option>
                      <option>1-5</option>
                      <option>6-20</option>
                      <option>21-50</option>
                      <option>51+</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-base font-medium font-satoshi mb-3">Message</label>
                  <textarea rows={3} placeholder="Creative formats, event tie-ins, sponsorships, language preferences, etc." className="w-full px-4 py-4 rounded-lg border border-[#EEEEEE]"></textarea>
                </div>
              </div>
            </form>
            <button className='bg-brand text-white font-satoshi font-bold text-xl py-5  w-full rounded-lg mt-14'>Submit</button>
            <p className='text-xl font-medium font-satoshi mt-14'>Join MediaDazz and showcase your media spaces to marketers, SMEs, and global brands actively planning campaigns in Dubai and across the UAE. Submit your details today and start winning more campaigns. ⭐</p>
          </div>
          <div className="mt-16 flex flex-col gap-7 md:gap-3.5">
            {dummyText.map((item, index) =>
              <div key={index} className="rounded-xl md:rounded-[0.625rem] p-3 md:p-2.5 flex gap-1.5 md:gap-2.5 flex-col md:flex-row md:items-stretch border border-[#EEEEEE] bg-white">
                <div className="bg-[#FFEAE1] py-9 md:p-9 rounded-lg shrink-0 flex items-center justify-center">
                  <Image src={item?.icon} alt="benefitone" className='h-12 w-12 mx-auto shrink-0' />
                </div>
                <div className="p-3 md:p-3.5">
                  <h3 className="font-bold text-xl font-satoshi">{item?.title}</h3>
                  <h5 className="pt-2.5 md:pt-2 text-base  font-medium font-satoshi text-[#6B7280]">{item?.description}</h5>
                </div>
              </div>)}
          </div>
        </div>
        <div className='formdiv w-full hidden lg:block'>
          <form className="bg-white rounded-2xl shadow-sm border border-[#EEEEEE] flex flex-col gap-4">
            <div className='p-6 border-b border-[#EEEEEE]'>
              <p className="text-xs font-bold text-brand font-satoshi mb-1">Contact Form</p>
              <h3 className="font-bold text-xl font-satoshi">List Your Media Spaces in Dubai & UAE</h3>
              <p className="text-base font-medium text-[#6B7280] font-satoshi">Connect Directly with Advertisers</p>
            </div>
            <div className="p-6 pt-0 space-y-[1.125rem]">
              <div>
                <label className="block text-base font-medium font-satoshi mb-3">Full Name</label>
                <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
                  <LuUser className="h-6 w-6 mr-2" />
                  <input type="text" placeholder="Enter full name" className="w-full  placeholder-[#6B7280] outline-none font-satoshi" ></input>
                </div>
              </div>
              <div>
                <label className="block text-base font-medium font-satoshi mb-3">Business E-mail</label>
                <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
                  <HiOutlineMail className="h-6 w-6 mr-2" />
                  <input type="email" placeholder="Enter business email" className="w-full  placeholder-[#6B7280] outline-none font-satoshi" ></input>
                </div>
              </div>
              <div>
                <label className="block text-base font-medium font-satoshi mb-3">Contact No</label>
                <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
                  <RiContactsBook3Line className="h-6 w-6 mr-2" />
                  <input type="tel" placeholder="Enter contact no" className="w-full  placeholder-[#6B7280] outline-none font-satoshi" ></input>
                </div>
              </div>
              <div>

                <div>
                  <label className="block text-base font-medium font-satoshi mb-3">Campaign Objective</label>
                  <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
                    <TfiLayoutMediaLeftAlt className="h-6 w-6 mr-2" />
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

              </div>
              <div>
                <label className="block text-base font-medium font-satoshi mb-3">No of Media Spaces</label>
                <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
                  <PiListNumbers className="h-6 w-6 mr-2" />
                  <select className="w-full placeholder-[#6B7280] outline-none font-satoshi">
                    <option value="">Select</option>
                    <option>1-5</option>
                    <option>6-20</option>
                    <option>21-50</option>
                    <option>51+</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-base font-medium font-satoshi mb-3">Message</label>
                <textarea rows={3} placeholder="Creative formats, event tie-ins, sponsorships, language preferences, etc." className="w-full px-4 py-4 rounded-lg border border-[#EEEEEE]"></textarea>
              </div>
            </div>
          </form>
          <button className='bg-brand text-white font-satoshi font-bold text-xl py-5  w-full rounded-lg mt-14'>Submit</button>
          <p className='text-xl font-medium font-satoshi mt-14'>Join MediaDazz and showcase your media spaces to marketers, SMEs, and global brands actively planning campaigns in Dubai and across the UAE. Submit your details today and start winning more campaigns. ⭐</p>
        </div>


      </div>
      <div className="px-6  py-14 lg:py-20 md:pt-8 md:pb-16 lg:px-24 xl:px-[7.75rem] ">

        <div className="space-y-6 md:space-y-3.5 flex flex-col justify-center">
          <p className="text-xs md:text-sm font-bold font-satoshi text-brand">BENEFITS</p>
          <h2 className="font-bold text-4xl lg:text-5xl font-satoshi">Benefits for Media Owners</h2>
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
      <div className="px-6  flex flex-col md:flex-row  md:items-stretch gap-11 md:gap-14 lg:gap-20 py-14 lg:py-20 md:pt-8 md:pb-16 lg:px-24 xl:px-[7.75rem] ">
        <div className="flex-1">
          <div className="space-y-6 md:space-y-3.5 ">
            <p className="text-xs md:text-sm font-bold font-satoshi text-brand">MediaDAZZ FOR EVERYONE</p>
            <h2 className="font-bold text-4xl lg:text-5xl font-satoshi">Opportunities for businesses of all sizes</h2>
            <h4 className="font-medium text-sm lg:text-lg font-satoshi text-[#6B7280]">MediaDazz levels the playing field for all media owners. From large OOH companies with hundreds of sites to individual creators with niche audiences, <span className='font-bold text-black'>everyone has equal opportunity to connect with advertisers</span> and showcase the unique value of their media on MediaDazz.</h4>
          </div>
          <div className="flex gap-4 md:gap-5 mt-10">
            <button className='rounded-md md:rounded-lg bg-brand py-3 px-4 md:py-4 md:px-5 text-sm md:text-lg font-bold text-white font-satoshi'>List your Space</button>
          </div>
        </div>
        <div className="flex-1">
          <Image src={blogOne} alt="aboutus" className="w-full h-full object-cover object-center rounded-xl md:rounded-2xl" />
        </div>

      </div>
      <div className="px-6  py-14 lg:py-20 md:pt-8 md:pb-16 lg:px-24 xl:px-[7.75rem] ">
        <div className="flex justify-between md:items-center flex-col md:flex-row gap-3.5 md:gap-10 lg:gap-12 xl:gap-24">
        <div className="space-y-6 md:space-y-3.5 flex flex-col justify-center">
          <p className="text-xs md:text-sm font-bold font-satoshi text-brand">MEDIA CATEGORIES</p>
          <h2 className="font-bold text-4xl lg:text-5xl font-satoshi">Who Can Benefit from Being on MediaDazz?</h2>
          <h4 className="font-medium text-sm lg:text-lg font-satoshi text-[#6B7280]">If you own or manage advertising inventory in the UAE, MediaDazz is the platform built for you. We support both high-demand and niche media spaces, helping you connect with advertisers who are actively seeking effective placements.</h4>
        </div>
         <button className='rounded-md shrink-0 md:rounded-lg bg-brand py-3 px-4 md:py-4 md:px-5 w-fit text-sm md:text-lg font-bold text-white font-satoshi'>List your Space</button>
        </div>
        <p className=" flex text-lg items-center lg:text-xl font-medium font-satoshi my-10 lg:my-16">
          <span className='h-2.5 w-2.5 bg-brand rounded-full mr-3'></span>
          Media categories supported on MediaDazz include:
        </p>
        <div className="flex flex-col gap-7 md:gap-3.5">
            {mediadazzBenifits.map((item, index) =>
              <div key={index} className="rounded-xl md:rounded-[0.625rem] p-6 flex gap-4 flex-col md:flex-row md:items-center border border-[#EEEEEE] bg-white">
                <div className="bg-[#FFEAE1] py-9 md:p-2.5 rounded-sm md:rounded-full shrink-0 flex items-center justify-center">
                  <Image src={item?.id} alt="benefitone" className='h-6 w-6 mx-auto shrink-0' />
                </div>
                <div className="">
                  <h3 className="font-bold text-lg font-satoshi">{item?.title}</h3>
                  <h5 className="pt-2.5 text-base  font-medium font-satoshi text-[#6B7280]">{item?.description}</h5>
                </div>
              </div>)}
          </div>

      </div>
        <div className="px-6  py-14 lg:py-20 md:pt-8 md:pb-16 lg:px-24 xl:px-[7.75rem] bg-[#FAFAFA] ">

        <div className="space-y-6 md:space-y-3.5 flex flex-col justify-center text-center">
          <p className="text-xs md:text-sm font-bold font-satoshi text-brand">BENEFITS</p>
          <h2 className="font-bold text-4xl lg:text-5xl font-satoshi">Why Use MediaDazz for Your Campaign?</h2>
          <h4 className="font-medium text-sm lg:text-lg font-satoshi text-[#6B7280]">Discover the widest network of media spaces across all channels.</h4>
        </div>
         <div className="flex flex-col border border-[#EEEEEE] rounded-xl md:rounded-[0.875rem] bg-white mt-10 md:mt-14 lg:mt-16">
            {anoterbefit.map((item, index) =>
              <div key={index} className="p-[1.125rem] flex items-center md:p-6 border-b border-[#EEEEEE] last:border-0 ">
                <BsArrowRight className="h-[1.125rem] w-[1.125rem] md:h-6 md:w-6 text-brand mr-2 md:mr-3 " />
                <h5 className="text-sm md:text-lg font-medium font-satoshi">{item}</h5>
              </div>)}
         </div>
      </div>
      <FAQ/>
       <Campaigns heading='Your brand deserves to shine where it matters most' buttonText='Request a Custom plan' />
    </>
  )
}

export default JoinMediaDazz