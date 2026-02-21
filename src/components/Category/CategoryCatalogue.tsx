import WishlistHeartButton from "../WishlistHeartButton";
import CartButton from "../CartButton";
import first from "../../../public/first.svg"
import Image from "next/image";
import { LuUserRound } from "react-icons/lu";
import { IoPricetagsOutline } from "react-icons/io5";
import { ListingItem } from "@/store/categoryApi";
import { useRouter } from "next/navigation";

interface CategoryCatalogueProps {
  listings: ListingItem[];
}

const CategoryCatalogue = ({ listings }: CategoryCatalogueProps) => {
  const router = useRouter();

  if (!listings || listings.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-gray-600 font-satoshi">No listings found.</p>
      </div>
    );
  }

  return (
    <>
    <div className="space-y-5">
      {listings.map((listing, index) => {
        const listingData = listing.listing_list;
        const imageUrl = listing.listing_image || first;
        
        return (
        <div key={listing.listing_url || index} className="bg-white rounded-lg border border-[#EEEEEE] cursor-pointer flex ">
        <div className="w-full shrink-0 max-w-[35%] relative overflow-hidden ">
        <Image 
          src={imageUrl} 
          alt={listing.listing_title || "Featured listing"} 
          className="w-full h-full max-h-full object-cover object-center"
          width={400}
          height={300}
          onClick={() => router.push(`/productdetail/${listing.listing_url}`)}
        />
         <WishlistHeartButton 
           isInWishlist={(listing as any)?.is_wishlist || false} 
           productId={listing.listing_url || ""} 
         />
        </div>
        <div className="flex-1 p-6 flex flex-col justify-center">
        <div className="flex flex-col gap-1.5">
            <h4 className="font-satoshi font-medium text-sm text-brand">{listing.listing_category || 'Category'}</h4>
            <h3 className="font-satoshi font-medium text-base ">{listing.listing_title || 'Untitled Listing'}</h3>
        </div>
        <div className="flex flex-wrap gap-2 mt-5">
          {listingData?.city && (
            <div className="flex items-center w-fit p-1 pr-4 gap-1.5 border border-[#EEEEEE] rounded-full">
              <div className="p-1.5 bg-[#EEEEEE] rounded-full">
                <LuUserRound className="w-4 h-4"/>
              </div>
              <span className="font-medium text-sm font-satoshi">{listingData.city}</span>
            </div>
          )}
          {listingData?.reach_count && listingData?.reach_type && (
            <div className="flex items-center w-fit p-1 pr-4 gap-1.5 border border-[#EEEEEE] rounded-full">
              <div className="p-1.5 bg-[#EEEEEE] rounded-full">
                <LuUserRound className="w-4 h-4"/>
              </div>
              <p className="font-medium text-sm font-satoshi">
                {listingData.reach_count} <span className="text-[#6B7280]">/ {listingData.reach_type}</span>
              </p>
            </div>
          )}
          {listingData?.display && (
            <div className="flex items-center w-fit p-1 pr-4 gap-1.5 border border-[#EEEEEE] rounded-full">
              <div className="p-1.5 bg-[#EEEEEE] rounded-full">
                <LuUserRound className="w-4 h-4"/>
              </div>
              <span className="font-medium text-sm font-satoshi">{listingData.display}</span>
            </div>
          )}
          {listingData?.size && (
            <div className="flex items-center w-fit p-1 pr-4 gap-1.5 border border-[#EEEEEE] rounded-full">
              <div className="p-1.5 bg-[#EEEEEE] rounded-full">
                <LuUserRound className="w-4 h-4"/>
              </div>
              <span className="font-medium text-sm font-satoshi">{listingData.size}</span>
            </div>
          )}
        </div>
       <div className="flex justify-between items-baseline-last gap-6 mt-6">
        <div className="flex gap-2 items-center">
       <IoPricetagsOutline className="w-[1.125rem] h-[1.125rem]"/>
       <p className="text-sm font-medium font-satoshi">Price on Request</p>
        </div>

        <CartButton product_id={(listing as any)?.listing_product_id || listing.listing_url || ""} />
       </div>
        </div>
        </div>
        );
      })}
    </div>
    </>
  )
}

export default CategoryCatalogue