"use client";
import Image from "next/image";
import first from "../../public/first.svg";
import { LuUserRound } from "react-icons/lu";
import { LiaCarSolid } from "react-icons/lia";
import HeartButton from "./HeartButton";
import CartButton from "./CartButton";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import MediaCartModal from "./MediaCartModal";

type Listing = {
  product_name: string;
  product_price: string;
  categories_name: string;
  products_reach_count: string;
  product_reach_type: string;
  productimg: string;
  product_url: string;
  feature_list: { audience: string }[];
};

const Listingcarousel = ({ city }: { city?: string }) => {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    if (!city) return;
    setLoading(true);
    fetch(`https://mediadazz.com/api/getpopularlisting/${city}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") setListings(data.data);
        console.log(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [city]);

  // Fallback static data if no city prop
  useEffect(() => {
    if (!city) {
      setListings([
        {
          product_name: "Static Billboard",
          product_price: "Price on request",
          categories_name: "Outdoor & OOH Media",
          products_reach_count: "100,000",
          product_reach_type: "Cars / day",
          productimg: "/first.svg",
          product_url: "#",
          feature_list: [{ audience: "Commuters" }, { audience: "Drivers" }],
        },
      ]);
    }
  }, [city]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center w-full h-64">
        {/* Billboard SVG Animation */}
        <svg
          className="animate-pulse mb-4"
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
        >
          <rect x="8" y="16" width="48" height="24" rx="4" fill="#F97316" />
          <rect x="20" y="40" width="4" height="16" rx="2" fill="#6B7280" />
          <rect x="40" y="40" width="4" height="16" rx="2" fill="#6B7280" />
          <rect x="28" y="48" width="8" height="4" rx="2" fill="#6B7280" />
        </svg>
        <span className="text-brand font-satoshi font-bold text-lg">
          Loading Ads...
        </span>
        <span className="text-[#6B7280] text-sm mt-1">
          Fetching the best media spaces for you
        </span>
      </div>
    );

  return (
    <>
      {city ? (
        <div className="md:grid grid-cols-2 lg:flex lg:overflow-x-scroll h-full  no-scrollbar gap-3.5 lg:gap-6 lg:mt-16 lg:last:mr-6">
          {listings.map((item, index) => (
            <div
              key={index}
              className="mt-14 flex flex-col  cursor-pointer lg:mt-0 rounded-tr-[0.875rem] rounded-tl-[0.875rem] overflow-hidden  lg:min-w-[404px]"
            >
              <div className="w-full relative overflow-hidden ">
                <Image
                  onClick={() => router.push("/ProductDetail")}
                  width={100}
                  height={100}
                  src={item.productimg}
                  alt="Featured listing"
                  className="w-full h-80 max-h-full object-cover object-center"
                />
                <HeartButton itemId="billboard-1" />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="py-5 px-8 flex-1 shrink-0  border border-[#EEEEEE] border-t-0 gap-2.5">
                  <h4 className="font-satoshi font-medium text-sm text-brand">
                    {item.categories_name}
                  </h4>
                  <h3 className="font-satoshi font-bold text-xl mt-2.5">
                    {item.product_name}
                  </h3>
                </div>
                <div className="px-8 py-3.5 border border-[#EEEEEE] border-t-0">
                  <p className="font-medium font-satoshi text-base text-[#6B7280]">
                    Audience
                  </p>
                  <div className="flex mt-1.5 gap-2.5">
                    <div className="p-1.5  h-[1.875rem] w-[1.875rem] flex justify-center items-center bg-[#EEEEEE] rounded-full">
                      <LuUserRound className="w-[1.125rem] h-[1.125rem]" />
                    </div>
                    <span className="font-bold text-lg font-satoshi truncate block max-w-full">
                      {item.feature_list && item.feature_list.length > 0
                        ? item.feature_list
                            .map((f) => f.audience)
                            .join(", ")
                        : "—"}
                    </span>
                  </div>
                </div>
                <div className="px-8 py-3.5 border flex justify-between items-center  border-[#EEEEEE] border-t-0 rounded-bl-[0.7875rem] rounded-br-[0.7875rem]">
                  <div className="flex gap-2.5">
                    <div className="p-1.5  h-[1.875rem] w-[1.875rem] flex justify-center items-center bg-[#EEEEEE] rounded-full">
                      <LiaCarSolid className="w-[1.125rem] h-[1.125rem]" />
                    </div>
                    <p className="font-bold text-lg font-satoshi">
                      {item.products_reach_count}{" "}
                      <span className="font-medium font-satoshi text-base ml-2 text-[#6B7280]">
                        {item.product_reach_type}
                      </span>
                    </p>
                  </div>
                  <CartButton setCartOpen={setCartOpen} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="md:grid grid-cols-2 lg:flex lg:overflow-x-scroll  no-scrollbar gap-3.5 lg:gap-6 lg:mt-16 lg:last:mr-6">
          {[1, 2, 3, 4].map((item) => (
            <div className="mt-14 cursor-pointer lg:mt-0 rounded-tr-[0.875rem] rounded-tl-[0.875rem] overflow-hidden  lg:min-w-[404px]">
              <div className="w-full max-h-[314px] relative overflow-hidden ">
                <Image
                  onClick={() => router.push("/ProductDetail")}
                  src={first}
                  alt="Featured listing"
                  className="w-full h-full max-h-full object-cover object-center"
                />
                <HeartButton itemId="billboard-1" />
              </div>
              <div className="py-5 px-8  border border-[#EEEEEE] border-t-0 gap-2.5">
                <h4 className="font-satoshi font-medium text-sm text-brand">
                  Billboards
                </h4>
                <h3 className="font-satoshi font-bold text-xl mt-2.5">
                  Mirdif city center Rd.- Tripoli{" "}
                </h3>
              </div>
              <div className="px-8 py-3.5 border border-[#EEEEEE] border-t-0">
                <p className="font-medium font-satoshi text-base text-[#6B7280]">
                  Audience
                </p>
                <div className="flex mt-1.5 gap-2.5">
                  <div className="p-1.5  h-[1.875rem] w-[1.875rem] flex justify-center items-center bg-[#EEEEEE] rounded-full">
                    <LuUserRound className="w-[1.125rem] h-[1.125rem]" />
                  </div>
                  <span className="font-bold text-lg font-satoshi">
                    Students, Tourists, Shoppers ...
                  </span>
                </div>
              </div>
              <div className="px-8 py-3.5 border flex justify-between items-center  border-[#EEEEEE] border-t-0 rounded-bl-[0.7875rem] rounded-br-[0.7875rem]">
                <div className="flex gap-2.5">
                  <div className="p-1.5  h-[1.875rem] w-[1.875rem] flex justify-center items-center bg-[#EEEEEE] rounded-full">
                    <LiaCarSolid className="w-[1.125rem] h-[1.125rem]" />
                  </div>
                  <p className="font-bold text-lg font-satoshi">
                    5,00,000{" "}
                    <span className="font-medium font-satoshi text-base ml-2 text-[#6B7280]">
                      cars / day
                    </span>
                  </p>
                </div>
                <CartButton setCartOpen={setCartOpen} />
              </div>
            </div>
          ))}
        </div>
      )}
      <MediaCartModal open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Listingcarousel;