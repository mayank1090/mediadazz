import marketone from "../../public/marketone.png";
import markettwo from "../../public/markettwo.png";
import marketthree from "../../public/marketthree.png";
import marketforth from "../../public/marketforth.png";
import Image from "next/image";


export default function MarketersSection (){
    return(<>
    <div className="hidden lg:block lg:px-24 lg:py-[5.25rem] xl:px-[7.75rem]">
    <div className="flex flex-col gap-3.5 justify-center items-center ">
        <h3 className="font-satoshi font-bold text-sm text-brand">FOR MARKETERS</h3>
        <h2 className="font-satoshi mt-2.5 font-bold text-[2rem] lg:text-4xl xl:text-5xl leading-[2.625rem]">Our Favorite Deals This Week</h2>
        <p className="font-satoshi lg:text-xl xl:text-[1.375rem] font-medium text-base text-[#6B7280]">Discover top ad spots with special offers—curated for maximum reach at the best value.</p>
        </div>
        <div className="grid grid-cols-3 mt-16 gap-6 lg:min-h-[480px]  xl:min-h-[540px] ">
            <div className="relative rounded-[0.875rem] overflow-hidden">
                <Image className="object-cover object-center h-full w-full" src={marketone} alt="marketone"/>
                <div className="absolute lg:top-[10%] xl:top-[15%] w-full">
                    <p className="font-satoshi text-center text-white  font-medium text-[1.75rem] max-w-[82%] mx-auto">Ad space in Ramadan Special tabloid</p>
                </div>
            </div>
            <div className="relative rounded-[0.875rem] overflow-hidden">
                <Image className="object-cover object-center h-full w-full" src={markettwo} alt="marketone"/>
                <div className="absolute lg:top-[10%] xl:top-[15%] w-full">
                    <p className="font-satoshi text-center text-white  font-bold text-[1.375rem] max-w-[82%] mx-auto">Series of 10 MUPI’s in JBR</p>
                    <p className="mt-2.5 font-satoshi text-center text-[#E0E0E0]  font-bold text-lg max-w-[82%] mx-auto ">Great for Eid!</p>
                </div>
            </div>
            <div className="flex flex-col gap-6">
            <div className="relative flex-1 rounded-[0.875rem] overflow-hidden">
                <Image className="object-cover object-center h-full w-full" src={marketthree} alt="marketone"/>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full ">
                    <p className="font-satoshi text-white ml-[1.375rem]  font-bold text-[1.375rem] max-w-[50%] ">Speak Social</p>
                    <p className="mt-2.5 font-satoshi ml-[1.375rem]  text-white  font-medium text-base max-w-[50%]  ">Collaborate with popular social media personalities</p>
                </div>
            </div>
            <div className="relative flex-1 rounded-[0.875rem] overflow-hidden">
                <Image className="object-cover object-center h-full w-full" src={marketforth} alt="marketone"/>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
                    <p className="font-satoshi text-white  ml-[1.375rem]  font-bold text-[1.375rem] max-w-[46%] ">Dubai Lifestyle Website</p>
                    <p className="mt-2.5 font-satoshi  ml-[1.375rem]  text-white  font-medium text-base max-w-[46%]  ">Reviews, interviews & more</p>
                </div>
            </div>
            </div>
        </div>
    </div>
    </>)
}