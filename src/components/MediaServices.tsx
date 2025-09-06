"use client";

import outdoor from "../../public/outdoor.svg";
import printmedia from "../../public/print.svg";
import FM from "../../public/FM.svg";
import TV from "../../public/TV.svg";
import social from "../../public/Socialmedia.svg";
import event from "../../public/Events.svg";
import PR from "../../public/PR.svg";
import direct from "../../public/direct.svg";
import Image from "next/image";

const channels = [
  { id: 1, label: "Outdoor & OOH Media", icon: outdoor },
  { id: 2, label: "Print Media", icon: printmedia },
  { id: 3, label: "FM Radio", icon: FM },
  { id: 4, label: "TV Channel", icon: TV },
  { id: 5, label: "Social Media", icon: social },
  { id: 6, label: "Events", icon: event },
  { id: 7, label: "PR", icon: PR },
  { id: 8, label: "Direct", icon: direct },
];

export default function MediaChannels() {
  return (
    <section
      aria-labelledby="media-channels-heading"
      className="w-full px-6 py-[3.375rem] lg:p-24  xl:p-[7.75rem]"
    >
      {/* SEO-friendly heading */}
      <h2 id="media-channels-heading" className="sr-only">
        Media Channels
      </h2>

      {/* Mobile Layout (2 columns) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-[1.125rem] gap-y-6 gap-4 md:hidden">
        {channels.map(({ id, label, icon }) => (
          <div key={id} className=" flex flex-col">
          <div
           
            className="flex items-center justify-center rounded-xl bg-[#FFEAE3] py-6"
          >
            <Image alt="logo" src={icon} className="w-8 h-8 text-[#FF6636]" aria-hidden="true" />
           
          </div>
           <p className="mt-2.5 font-satoshi text-base font-medium text-center">
           {label}
         </p>
         </div>
        ))}
      </div>

      {/* Desktop Layout (horizontal row) */}
      <div className="hidden md:flex items-start justify-between gap-4 lg:gap-8">
        {channels.map(({ id, label, icon }) => (
          <div
            key={id}
            className="flex flex-1  flex-col items-center text-center"
          >
            <div className="rounded-[0.625rem] w-full flex justify-center bg-[#F9F9F9] md:py-6 lg:py-7  xl:py-9">
              <Image alt="logo" src={icon} className="w-6 h-6 lg:w-8 lg:h-8 xl:h-10 xl:w-10 text-black " aria-hidden="true" />
            </div>
            <p className="mt-3 lg:mt-[1.125rem] text-base lg:text-lg xl:text-xl font-medium font-satoshi">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
