"use client";
import Image from "next/image";
import { LuUserRound } from "react-icons/lu";
import { LiaCarSolid } from "react-icons/lia";
import WishlistHeartButton from "./WishlistHeartButton";
import CartButton from "./CartButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MediaCartModal from "./MediaCartModal";
import { useGetWishlistQuery } from "@/store/authApi";

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

const Wishlist = () => {
  const router = useRouter();
  const [cartOpen, setCartOpen] = useState(false);
  
  // Fetch wishlist data using RTK Query
  const { data, isLoading, error } = useGetWishlistQuery();

  // Transform wishlist data to match Listing type
  const listings: Listing[] = data?.wishlist_data?.map((item) => ({
    product_name: item.product_name,
    product_price: item.product_price,
    categories_name: item.product_category,
    products_reach_count: item.product_reach,
    product_reach_type: item.products_duration
      ? `${item.product_reach_title} / ${item.products_duration}`
      : item.product_reach_title,
    productimg: item.product_image || "/first.svg",
    product_url: item.product_slug,
    feature_list: item.product_audience_list.map((audience) => ({
      audience,
    })),
  })) || [];

  if (isLoading) {
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
          Loading Wishlist...
        </span>
        <span className="text-[#6B7280] text-sm mt-1">
          Fetching your saved items
        </span>
      </div>
    );
  }

  if (error || !data?.status) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-gray-600 font-satoshi">
          {error ? "Failed to load wishlist." : data?.msg || "No items in wishlist."}
        </p>
      </div>
    );
  }

  if (!listings || listings.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-gray-600 font-satoshi">No items in wishlist.</p>
      </div>
    );
  }

  return (
    <>
      <div className="md:grid grid-cols-2 lg:flex lg:overflow-x-scroll h-full  no-scrollbar gap-3.5 lg:gap-6 lg:mt-16 lg:last:mr-6">
        {listings.map((item, index) => (
          <div
            key={item.product_url || index}
            className="mt-14 flex flex-col  cursor-pointer lg:mt-0 rounded-tr-[0.875rem] rounded-tl-[0.875rem] overflow-hidden  lg:min-w-[404px]"
          >
            <div className="w-full relative overflow-hidden ">
              <Image
                onClick={() => router.push(`/productdetail?slug=${item.product_url}`)}
                width={100}
                height={100}
                src={item.productimg}
                alt={item.product_name || "Wishlist item"}
                className="w-full h-80 max-h-full object-cover object-center"
              />
              <WishlistHeartButton productId={item.product_url} isInWishlist={true} />
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
                    {item.products_reach_count || "—"}{" "}
                    {item.product_reach_type && (
                      <span className="font-medium font-satoshi text-base ml-2 text-[#6B7280]">
                        {item.product_reach_type}
                      </span>
                    )}
                  </p>
                </div>
                <CartButton product_id={item.product_url || ""} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Wishlist;

