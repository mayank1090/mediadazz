import Image from "next/image";
import camone from "../../public/Camone.svg";
import camtwo from "../../public/Camtwo.svg";
import camthree from "../../public/Camthree.svg";

export default function Campaigns (){
    return(<>
        <div className="py-[3.375rem] px-6 lg:px-24 lg:py-[5.25rem] xl:px-[7.75rem]">
          <div className="bg-[#FFEAE180] rounded-[0.625rem] lg:rounded-[0.875rem] p-3 lg:p-3.5">
            <div className="px-[1.375rem] py-[1.875rem] lg:px-[3.25rem] lg:py-14 xl:py-[5.25rem] ">
                <h3 className="font-bold text-center font-satoshi text-[1.625rem] md:text-4xl leading-8 lg:text-5xl lg:leading-14">Turn Ideas Into Impactful Campaigns</h3>
                <p className="font-satoshi text-center font-medium text-[0.625rem] leading-[1.125rem] md:text-sm lg:text-lg mt-2 md:mt-2.5 lg:mt-6">From strategy to placement, MediaDazz helps your brand cut through the noise and reach more customers.</p>
                <button className="px-[1.125rem] text-white cursor-pointer py-4 bg-brand rounded-lg text-lg font-satoshi font-bold mx-auto w-fit mt-12 lg:block hidden">Inquire Now</button>
            </div>
            <div className="flex flex-col lg:flex-row gap-2.5 lg:gap-3.5">
                <div className="flex-1 bg-[#FFFFFF66] rounded-md lg:rounded-lg p-[1.125rem] md:p-5 lg:p-6 gap-3.5 md:gap-4 lg:gap-5 flex ">
                  <div className="border-[#EEEEEE] my-auto max-h-fit border md:border-[1.5px] p-1 lg:p-1.5 rounded-[0.625rem] lg:rounded-[0.875rem] bg-[#FAFAFA] ">
                    <div className="rounded-lg lg:rounded-xl p-2 lg:p-3 bg-white flex justify-center items-center">
                      <Image src={camone} alt="campaign " className="w-6 h-6 lg:w-9 lg:h-9 shrink-0"/>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 lg:gap-1.5">
                    <h4 className="font-satoshi font-bold text-sm md:text-lg">More Reach</h4>
                    <p className="text-[#6B7280] font-satoshi font-medium text-xs md:text-base">Get instant visibility to thousands of business decision makers</p>
                  </div>
                </div>
                <div className="flex-1 bg-[#FFFFFF66] rounded-md lg:rounded-lg p-[1.125rem] md:p-5 lg:p-6 gap-3.5 md:gap-4 lg:gap-5 flex">
                  <div className="border-[#EEEEEE] my-auto max-h-fit border md:border-[1.5px] p-1 lg:p-1.5 rounded-[0.625rem] lg:rounded-[0.875rem] bg-[#FAFAFA] ">
                    <div className="rounded-lg lg:rounded-xl p-2 lg:p-3 bg-white flex justify-center items-center">
                      <Image src={camtwo} alt="campaign " className="w-6 h-6 lg:w-9 lg:h-9 shrink-0"/>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 lg:gap-1.5">
                    <h4 className="font-satoshi font-bold text-sm md:text-lg">More Leads</h4>
                    <p className="text-[#6B7280] font-satoshi font-medium text-xs md:text-base">Get notified when clients are interested in your media space</p>
                  </div>
                </div>
                <div className="flex-1 bg-[#FFFFFF66] rounded-md lg:rounded-lg p-[1.125rem] md:p-5 lg:p-6 gap-3.5 md:gap-4 lg:gap-5 flex ">
                  <div className="border-[#EEEEEE] my-auto max-h-fit border md:border-[1.5px] p-1 lg:p-1.5 rounded-[0.625rem] lg:rounded-[0.875rem] bg-[#FAFAFA] ">
                    <div className="rounded-lg lg:rounded-xl p-2 lg:p-3 bg-white flex justify-center items-center">
                      <Image src={camthree} alt="campaign " className="w-6 h-6 lg:w-9 lg:h-9 shrink-0"/>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 lg:gap-1.5">
                    <h4 className="font-satoshi font-bold text-sm md:text-lg">More sales</h4>
                    <p className="text-[#6B7280] font-satoshi font-medium text-xs md:text-base">Generate more sales with qualified, real-time leads</p>
                  </div>
                </div>
            
            </div>
          </div>
          <button className="sm:hidden py-[1.125rem] bg-brand rounded-lg font-bold text-lg font-satoshi cursor-pointer text-center w-full mt-6 text-white">Inquire Now</button>
        </div>
    </>)
}