"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import Image from "next/image";

import "swiper/css";

type Billboard = {
  id: string;
  src: string;
  alt: string;
};

// Placeholder demo images; replace with your actual billboard images under /public
const billboards: Billboard[] = [
  { id: "b1", src: "/first.svg", alt: "First billboard" },
  { id: "b2", src: "/second.svg", alt: "Second billboard" },
  { id: "b3", src: "/third.svg", alt: "Third billboard" },
  { id: "b4", src: "/forth.svg", alt: "Fourth billboard" },
];

export default function BillboardCarousel() {
  return (
    // <section aria-label="Billboard gallery" className="w-full overflow-x-hidden">
    //   <Swiper
    //     modules={[Autoplay, A11y]}
    //     a11y={{ enabled: true }}
    //     autoplay={{ delay: 2500, disableOnInteraction: false }}
    //     loop={true}
    //     centeredSlides={true}
    //     slidesPerView={2}
    //     spaceBetween={16}
    //     breakpoints={{
    //       320: { slidesPerView: 1.75, spaceBetween: 20 },
    //       768: { slidesPerView: 3, spaceBetween: 24 },
    //       1024: { slidesPerView: 3, spaceBetween: 20 },
    //     }}
    //     className="!overflow-hidden w-full"
    //   >
    //     {billboards.map((b) => (
    //       <SwiperSlide key={b.id} className="h-auto">
    //         <div className="w-full overflow-hidden  rounded-2xl md:rounded-3xl bg-gray-100">
    //           <div className="">
    //             <Image
    //             width={20}
    //             height={40}
    //               src={b.src}
    //               alt={b.alt}
    //               className="object-cover w-full h-full"
    //             />
    //           </div>
    //         </div>
    //       </SwiperSlide>
    //     ))}
    //   </Swiper>
    // </section>
       <div className=" w-full  max-w-full overflow-x-hidden h-[180px] sm:h-[320px] lg:h-[410px]">
          <Swiper
            className="h-full w-full !z-20 px-2 py-5 md:px-6 md:py-12 overflow-hidden"
            modules={[ A11y, Autoplay]}
            slidesPerView={2}
            centeredSlides={true}
            centeredSlidesBounds={true}
            slidesOffsetAfter={20}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            scrollbar={false}
            breakpoints={{
              320: { slidesPerView: 2.5, spaceBetween: 16 },
              480: { slidesPerView: 1.5, spaceBetween: 20 },
              640: { slidesPerView: 2.5, spaceBetween: 30 },
              1024: { slidesPerView: 3.5, spaceBetween: 20 },
            }}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {billboards.map((item, index) => (
              <SwiperSlide key={item.id} className="h-full">
                <div className="relative rounded-sm md:rounded-lg lg:rounded-[0.625rem] w-full h-full ">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="object-cover object-center"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
  );
}


