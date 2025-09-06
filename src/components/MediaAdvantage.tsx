import advone from "../../public/advantageone.svg";
import advtwo from "../../public/advantagetwo.svg";
import advthree from "../../public/advantagethree.svg";
import advfour from "../../public/advantagefour.svg";
import Image from "next/image";

export default function MediaAdvantage (){
    return(<>
     <div className="py-[3.375rem] px-6 lg:px-24 lg:py-[6.25rem] xl:px-[7.75rem]">
     <div className="flex flex-col gap-3.5 md:text-center md:items-center ">
        <h3 className="font-satoshi font-bold text-sm text-brand">BENEFITS</h3>
        <h2 className="font-satoshi font-bold text-[2rem] lg:text-4xl xl:text-5xl leading-[2.625rem]">The MediaDazz Advantage</h2>
        <p className="font-satoshi lg:text-lg  font-medium text-base text-[#6B7280]">Reach more customers, save time, and maximize impact with MediaDazz.</p>
        </div>
        <div className="mt-[2.625rem] md:mt-14 lg:mt-16 gap-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="px-8 py-7 border border-[#EEEEEE] rounded-[0.875rem] ">
            <div className="w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center bg-[#FFEAE1]">
                <div className="w-[3.75rem] h-[3.75rem] rounded-full flex items-center justify-center bg-brand ">
                  <Image src={advone} alt="advantages" className="h-9 w-9 "/>
                </div>
            </div>
            <div className="mt-6 flex flex-col gap-2">
                <h3 className="font-satoshi font-bold text-xl">Expertise like no other</h3>
                <h4 className="text-[#6B7280] font-medium font-satoshi text-lg">Make the right decisions for your brand with the right knowledge</h4>
            </div>
        </div>
        <div className="px-8 py-7  border border-[#EEEEEE] rounded-[0.875rem] ">
            <div className="w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center bg-[#FFEAE1]">
                <div className="w-[3.75rem] h-[3.75rem] rounded-full flex items-center justify-center bg-brand ">
                  <Image src={advtwo} alt="advantages" className="h-9 w-9 "/>
                </div>
            </div>
            <div className="mt-6 flex flex-col gap-2">
                <h3 className="font-satoshi font-bold text-xl">Convenience at your fingertips</h3>
                <h4 className="text-[#6B7280] font-medium font-satoshi text-lg">Manage campaigns on multiple media with us</h4>
            </div>
        </div>
        <div className="px-8 py-7  border border-[#EEEEEE] rounded-[0.875rem] ">
            <div className="w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center bg-[#FFEAE1]">
                <div className="w-[3.75rem] h-[3.75rem] rounded-full flex items-center justify-center bg-brand ">
                  <Image src={advthree} alt="advantages" className="h-9 w-9 "/>
                </div>
            </div>
            <div className="mt-6 flex flex-col gap-2">
                <h3 className="font-satoshi font-bold text-xl">Always cost-effective</h3>
                <h4 className="text-[#6B7280] font-medium font-satoshi text-lg">Get the right media for your campaigns at the best prices</h4>
            </div>
        </div>
        <div className="px-8 py-7  border border-[#EEEEEE] rounded-[0.875rem] ">
            <div className="w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center bg-[#FFEAE1]">
                <div className="w-[3.75rem] h-[3.75rem] rounded-full flex items-center justify-center bg-brand ">
                  <Image src={advfour} alt="advantages" className="h-9 w-9 "/>
                </div>
            </div>
            <div className="mt-6 flex flex-col gap-2">
                <h3 className="font-satoshi font-bold text-xl">Stay up-to-date</h3>
                <h4 className="text-[#6B7280] font-medium font-satoshi text-lg">Stay updated about the performance of your ad campaign</h4>
            </div>
        </div>
     </div>
     </div>
    
    </>)
}