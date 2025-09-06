import Image from "next/image";
import SidebarMegaMenu from "@/components/navbar";
import { menuData } from "@/data/menusData";
import dynamic from "next/dynamic";
import CustomerWorld from "@/components/CustomerWorld";
import FeatureListing from "@/components/FeaturedListing";
import MarketersSection from "@/components/MarketersSection";
import MediaAdvantage from "@/components/MediaAdvantage";
import FAQ from "@/components/FAQ";
import Blogs from "@/components/Blogs";
import Campaigns from "@/components/Campaigns";
import Footer from "@/components/Footer";

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
    <SidebarMegaMenu
			topLevels={menuData}
			loginHref="/login"
			cartHref="/cart"
		/>
    <div className="">
    <HeroCarousel />
    <BillboardCarousel />
    <MediaServices />
    <CustomerWorld/>
    <FeatureListing/>
    <MarketersSection/>
    <MediaAdvantage/>
    <FAQ/>
    <Blogs/>
    <Campaigns/>
    <Footer/>
    </div>
  </div>
  );
}
