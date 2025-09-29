import Listingcarousel from "./listingcarousel";


export default function FeatureListing (){
    return(<>
    <div className="py-[3.375rem] px-6 lg:p-24 xl:p-[7.75rem] lg:pr-0 xl:pr-0">
        <div className="flex flex-col gap-3.5 ">
        <h3 className="font-satoshi font-bold text-sm text-brand">HIGHLIGHTS</h3>
        <h2 className="font-satoshi mt-2.5 font-bold text-[2rem] lg:text-4xl xl:text-5xl leading-[2.625rem]">Featured Listings in Dubai</h2>
        <p className="font-satoshi lg:text-xl xl:text-[1.375rem] font-medium text-base text-[#6B7280]">Top-performing ad spaces, handpicked to give your brand maximum visibility</p>
        </div>
    <Listingcarousel city="dubai"/>
    </div>
    </>)
}