export default function Planyourcampaign (){
    return(<>
     <div className="py-[3.375rem] px-6 lg:p-24  xl:p-[7.75rem] lg:block hidden">
     <div className="flex flex-col gap-3.5 md:text-center md:items-center ">
        <h3 className="font-satoshi font-bold text-sm text-brand">Campaign form</h3>
        <h2 className="font-satoshi font-bold text-[2rem] lg:text-4xl xl:text-5xl leading-[2.625rem]">Plan your Campaign</h2>
        <p className="font-satoshi lg:text-lg  font-medium text-base text-[#6B7280] mt-2.5 ">Use the MediaDazz campaign brief form to get offers from multiple <span className="font-bold text-black">billboard companies, digital OOH providers, TV ad networks, radio stations, print publishers, influencer marketing agencies, and many more.</span> Submit your requirements in the form and get a proposal tailored to your <span className="font-bold text-black">budget, target audience, and campaign goals.</span></p>
        </div>

        <button className="px-8 hidden mx-auto lg:block py-5 bg-brand mt-14 font-satoshi rounded-lg text-[1.375rem] font-bold text-white hover:md:bg-gradient-to-r hover:md:from-orange-600 hover:md:to-orange-700 hover:md:shadow-lg hover:md:shadow-orange-500/25 hover:md:scale-[1.02]  outline-none  transition-all duration-300 ease-in-out transform">Submit My Campaign Brief</button>
     </div>
    </>)
}