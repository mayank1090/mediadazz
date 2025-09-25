"use client";

import Image from "next/image";
import { memo } from "react";

// Import SVG files as modules
import outdoorIcon from "../../public/outdoor.svg";
import outdoorDesktopIcon from "../../public/outdoorb.svg";
import printIcon from "../../public/print.svg";
import printDesktopIcon from "../../public/printmediab.svg";
import fmIcon from "../../public/FM.svg";
import fmDesktopIcon from "../../public/FMb.svg";
import tvIcon from "../../public/TV.svg";
import tvDesktopIcon from "../../public/TVb.svg";
import socialIcon from "../../public/Socialmedia.svg";
import socialDesktopIcon from "../../public/socialmediab.svg";
import eventsIcon from "../../public/Events.svg";
import eventsDesktopIcon from "../../public/eventb.svg";
import prIcon from "../../public/PR.svg";
import prDesktopIcon from "../../public/PRb.svg";
import directIcon from "../../public/direct.svg";
import directDesktopIcon from "../../public/directb.svg";

const MediaServices = memo(function MediaServices() {
  // Define channels data using imported SVG modules
  const channelsData = [
    { id: 1, label: "Outdoor & OOH Media", icon: outdoorIcon, desktopicon: outdoorDesktopIcon},
    { id: 2, label: "Print Media", icon: printIcon, desktopicon: printDesktopIcon },
    { id: 3, label: "FM Radio", icon: fmIcon, desktopicon: fmDesktopIcon},
    { id: 4, label: "TV Channel", icon: tvIcon, desktopicon: tvDesktopIcon },
    { id: 5, label: "Social Media", icon: socialIcon, desktopicon: socialDesktopIcon },
    { id: 6, label: "Events", icon: eventsIcon, desktopicon: eventsDesktopIcon },
    { id: 7, label: "PR", icon: prIcon, desktopicon: prDesktopIcon},
    { id: 8, label: "Direct", icon: directIcon, desktopicon: directDesktopIcon},
  ];
  
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
        {channelsData.map(({ id, label, icon }) => (
          <div key={id} className=" flex flex-col">
          <div
           
            className="flex items-center justify-center rounded-xl bg-[#FFEAE3] py-6"
          >
            <Image alt="logo" src={icon} width={32} height={32} className="w-8 h-8 text-[#FF6636]" aria-hidden="true" />
           
          </div>
           <p className="mt-2.5 font-satoshi text-base font-medium text-center">
           {label}
         </p>
         </div>
        ))}
      </div>

      {/* Desktop Layout (horizontal row) */}
      <div className="hidden md:flex items-start justify-between gap-4 lg:gap-8">
        {channelsData.map(({ id, label, icon, desktopicon }) => (
          <div
            key={id}
            className="flex flex-1  flex-col items-center text-center"
          >
            <div className="rounded-[0.625rem] w-full flex justify-center bg-[#F9F9F9] md:py-6 lg:py-7  xl:py-9">
              <Image alt="logo" src={desktopicon} width={40} height={40} className="w-6 h-6 lg:w-8 lg:h-8 xl:h-10 xl:w-10 text-black " aria-hidden="true" />
            </div>
            <p className="mt-3 lg:mt-[1.125rem] text-base lg:text-lg xl:text-xl font-medium font-satoshi">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
});

export default MediaServices;
