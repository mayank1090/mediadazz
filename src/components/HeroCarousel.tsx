"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y } from "swiper/modules";
import { LuSearch } from "react-icons/lu";
import { LuMedal } from "react-icons/lu";

// Swiper core styles
import "swiper/css";
import "swiper/css/pagination";

type Slide = {
  id: string;
  heading: React.ReactNode;
  subheading: string;
};

const slides: Slide[] = [
  {
    id: "anywhere",
    heading: (
      <>
        Advertise <span className="text-brand">Anywhere</span> From One Place.
      </>
    ),
    subheading:
      "Simplify campaigns, reach more customers, and manage all your media in a single platform.",
  },
  {
    id: "optimize",
    heading: "Plan, Book, and Optimize Effortlessly.",
    subheading:
      "Discover media, compare options, and track performance with real‑time insights.",
  },
  {
    id: "scale",
    heading: "Scale Campaigns With Confidence.",
    subheading:
      "Centralize your workflow and keep every channel aligned from one dashboard.",
  },
];

export default function HeroCarousel() {
  return (
    <section
      aria-label="Featured marketing messages"
      className=" w-full mt-[5.5rem] lg:mt-28 px-6 py-[3.375rem] md:py-16 lg:py-6 lg:flex-1 lg:flex lg:justify-between lg:items-center  bg-white flex justify-between items-center"
    >
      <div className="mx-auto w-full max-w-3xl">

        {/* <div className="bg-[#6155F513] py-3.5 px-[1.125rem]  rounded-[3.5rem] mx-auto mb-8 flex gap-2.5 w-fit ">
          <LuMedal className="text-[#6155F5] h-[1.125rem] w-[1.125rem] md:h-6 md:w-6"/>
          <h3 className="text-[#6155F5] whitespace-nowrap font-bold text-sm md:text-lg font-satoshi">ADVERTISING SOLUTION</h3>
        </div> */}
        <Swiper
          modules={[Autoplay, Pagination, A11y]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop
          a11y={{ enabled: true }}
        >
          {slides.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <h1 className="font-satoshi lg:max-w-[80%] mx-auto lg:leading-[5.25rem] md:leading-16 text-[2.375rem] leading-12 md:text-5xl lg:text-[4rem] font-bold text-black ">
                    {item.heading}
                  </h1>
                  <p className="mt-3.5 md:mt-5 lg:mt-6 text-base md:text-xl lg:text-2xl font-medium font-satoshi text-[#6B7280] sm:text-lg">
                    {item.subheading}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
          <form
                    role="search"
                    aria-label="Search media"
                    className="mt-8 md:mt-10 lg:mt-12 flex items-stretch gap-[0.875rem]"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <label htmlFor="hero-search" className="sr-only">
                      Search by media type, location, or audience
                    </label>
                    <div className="relative w-full flex gap-2.5">
                      <LuSearch
                        aria-hidden="true"
                        className="pointer-events-none hidden md:block absolute left-[1.125rem] top-1/2 -translate-y-1/2 text-balck"
                        size={24}
                      />
                      <input
                        id="hero-search"
                        name="q"
                        type="search"
                        placeholder="Search for Media in UAE"
                        className="w-full rounded-xl border outline-none border-[#EEEEEE] bg-white px-[1.125rem] md:pl-[3.25rem] md:pr-4 text-gray-800 shadow-[0px 4px 40px 0px #0000001A] placeholder:text-[#6B7280] placeholder:font-medium placeholder:text-sm placeholder:lg:text-lg"
                      />
                    </div>
                    <button
                      type="submit"
                      className="rounded-xl hidden md:block whitespace-nowrap font-satoshi bg-brand px-5 py-[1.125rem] text-pretty text-xl font-medium text-white md:shadow-sm hover:md:bg-gradient-to-r hover:md:from-orange-600 hover:md:to-orange-700 hover:md:shadow-lg hover:md:shadow-orange-500/25 hover:md:scale-[1.02]  outline-none  transition-all duration-300 ease-in-out transform"
                    >
                      View all Places
                    </button>
                     <button
                      type="submit"
                      className="rounded-xl md:hidden whitespace-nowrap font-satoshi bg-brand py-4 px-[1.125rem] text-pretty text-xl font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <LuSearch className=" text-white h-5 w-5"/>
                    </button>
                  </form>
      </div>
    </section>
  );
}


