import dynamic from "next/dynamic";
import CustomerWorld from "@/components/CustomerWorld";
import FeatureListing from "@/components/FeaturedListing";
import MarketersSection from "@/components/MarketersSection";
import MediaAdvantage from "@/components/MediaAdvantage";
import FAQ from "@/components/FAQ";
import Blogs from "@/components/Blogs";
import Campaigns from "@/components/Campaigns";
import Planyourcampaign from "@/components/Planyourcampaign";

const HeroCarousel = dynamic(() => import("@/components/HeroCarousel"), {
  ssr: true,
});
const BillboardCarousel = dynamic(
  () => import("../components/BillboardCarousel"),
  { ssr: true }
);
const MediaServices = dynamic(
  () => import("../components/MediaServices"),
  { ssr: true }
);

export default function Home() {
  return (
  <div className="w-full !overflow-x-hidden min-h-screen overflow-y-auto">
    <div className="lg:h-screen lg:min-h-[41rem] lg:overflow-y-hidden lg:flex lg:flex-col">
    <div className="lg:flex-1 flex">
     <HeroCarousel />
     </div>
    </div>
    <div className="">
   
    <BillboardCarousel />
    <MediaServices />
    <CustomerWorld/>
    <FeatureListing/>
    <MarketersSection/>
    <MediaAdvantage/>
    <FAQ/>
    <Planyourcampaign/>
    <Blogs/>
    <Campaigns/>
    </div>
  </div>
  );
}
