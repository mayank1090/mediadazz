import { TbMoodSmileBeam } from "react-icons/tb";
import Image from "next/image";
import companyone from "../../public/companyone.png";
import companytwo from "../../public/companytwo.png";
import companythree from "../../public/companythree.png";
import companyforth from "../../public/companyforth.png";
import companyfive from "../../public/companyfive.png";

export default function CustomerWorld (){

    return(
        <>
        <div className="py-[3.375rem] px-6 lg:p-24  xl:p-[7.75rem]">
            <div className="flex flex-col gap-2.5 lg:flex-row lg:items-end lg:justify-between">
                <div className="lg:max-w-[45%] xl:max-w-[36%]">
                    <h3 className="font-satoshi font-bold text-sm text-brand">over 100+ companies</h3>
                    <h2 className="font-satoshi mt-2.5 font-bold text-[2rem] lg:text-4xl xl:text-5xl xl:leading-14 leading-[2.625rem]">Customer from top–tier companies</h2>
                </div>
                <p className="font-satoshi lg:text-right lg:max-w-[45%] xl:max-w-[36%] font-medium text-base text-[#6B7280]">Connect with top media spaces across Dubai and the UAE, and grow your brand visibility faster and better with MediaDazz.</p>
            </div>
            <div className="mt-8 lg:mt-12 xl:mt-16 grid sm:grid-cols-2 md:flex md:justify-between gap-3.5 md:gap-12 lg:gap-24 xl:gap-40">
                <div className="py-2.5 md:bg-white md:py-0 flex justify-center gap-0.5 bg-[#FAFAFA] rounded-lg">
                   <Image src={companyone} className="max-w-[35%] md:max-w-full mx-auto" alt="company"/>
                </div>
                <div className="py-2.5 md:bg-white md:py-0 flex justify-center gap-0.5 bg-[#FAFAFA] rounded-lg">
                <Image src={companytwo} className="max-w-[35%] md:max-w-full mx-auto" alt="company"/>
                </div>
                <div className="py-2.5 md:bg-white md:py-0 flex justify-center gap-0.5 bg-[#FAFAFA] rounded-lg">
                <Image src={companythree} className="max-w-[35%] md:max-w-full mx-auto" alt="company"/>
                </div>
                <div className="py-2.5 md:bg-white md:py-0 flex justify-center gap-0.5 bg-[#FAFAFA] rounded-lg">
                <Image src={companyforth} className="max-w-[35%] md:max-w-full mx-auto" alt="company"/>
                </div>
                <div className="py-2.5 md:bg-white md:py-0 md:flex justify-center gap-0.5 bg-[#FAFAFA] rounded-lg hidden">
                <Image src={companyfive} className="max-w-[35%] md:max-w-full mx-auto" alt="company"/>
                </div>
            </div>
        </div>
        </>
    )
}