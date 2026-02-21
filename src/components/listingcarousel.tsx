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
import { ListingItem } from "@/store/categoryApi";
import { TargetAudienceItem, useLazyGetPopularListingQuery } from "@/store/productApi";
import WishlistHeartButton from "./WishlistHeartButton";
import { useGetWishlistQuery } from "@/store/authApi";

export type Listing = {
  is_wishlist?: boolean;
  product_name: string;
  product_price: string;
  categories_name: string;
  products_reach_count: string;
  product_reach_type: string;
  productimg: string;
  product_url?: string;
  feature_list: TargetAudienceItem[];
};

interface ListingcarouselProps {
  city?: string;
  listings?: Listing[] | ListingItem[];
}

const Listingcarousel = ({ city, listings: propListings }: ListingcarouselProps) => {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [getPopularListing, { isLoading: loading }] = useLazyGetPopularListingQuery();
  
  // Fetch wishlist to determine if items are in wishlist in real-time
  const { data: wishlistData } = useGetWishlistQuery();
  
  // Create a Set of product URLs that are in the wishlist for O(1) lookup
  const wishlistProductIds = new Set(
    wishlistData?.wishlist_data?.map((item) => item.product_slug) || []
  );

  useEffect(() => {
    // Priority 1: Use listings from props (category API)
    if (propListings && propListings.length > 0) {
      const convertedListings: Listing[] = propListings.map((item) => {
        const itemUnknown = item as unknown;
        const listingItem = itemUnknown as ListingItem;
        const listing = itemUnknown as Listing;
        return {
          product_name: listing.product_name || listingItem.listing_title || "",
          product_price: listing.product_price || "Price on request",
          categories_name: listing.categories_name || listingItem.listing_category || "",
          products_reach_count: listing.products_reach_count || listingItem.listing_list?.reach_count || "",
          product_reach_type: listing.product_reach_type || listingItem.listing_list?.reach_type || "",
          productimg: listing.productimg || listingItem.listing_image || "/first.svg",
          product_url: listing.product_url || listingItem.listing_url || "",
          feature_list: listing.feature_list || [],
        };
      });
      setListings(convertedListings);
      return;
    }

    // Priority 2: Fetch by city if city prop is provided
    if (city) {
      getPopularListing(city)
        .then((result) => {
          if (result.data && result.data.status === "success") {
            setListings(result.data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching popular listings:", error);
        });
      return;
    }

    // Priority 3: Fallback static data
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
  }, [city, propListings, getPopularListing]);

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

  if (!listings || listings.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-gray-600 font-satoshi">No listings found.</p>
      </div>
    );
  }

  return (
    <>
      {(city || propListings) ? (
        <div className="md:grid grid-cols-2 lg:flex lg:overflow-x-scroll h-full  no-scrollbar gap-3.5 lg:gap-6 lg:mt-16 lg:last:mr-6">
          {listings.map((item, index) => (
            <div
              
              key={item.product_url || index}
              className="mt-14 flex flex-col  cursor-pointer lg:mt-0 rounded-tr-[0.875rem] rounded-tl-[0.875rem] overflow-hidden  lg:min-w-[404px]"
            >
              <div onClick={() => router.push(`/productdetail/${item.product_url}`)} className="w-full relative overflow-hidden ">
                <Image
                 onClick={() => router.push(`/productdetail/${item.product_url}`)}
                  width={100}
                  height={100}
                  src={item.productimg}
                  alt={item.product_name || "Featured listing"}
                  className="w-full h-80 max-h-full object-cover object-center"
                />
                <WishlistHeartButton 
                  isInWishlist={item?.product_url ? wishlistProductIds.has(item.product_url) : false} 
                  productId={item?.product_url || ""} 
                />
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
                            .filter((audience) => audience)
                            .join(", ") || "—"
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
      ) :(<></>)
      }
    </>
  );
};

export default Listingcarousel;