'use client';

import UpperSearch from '@/components/ProductDetail/upperSearch'
import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import outdoor from "../../../../public/outdoorb.svg"
import Image from 'next/image';
import { CiHeart } from "react-icons/ci";
import market from "../../../../public/marketforth.png"
import showmedia from "../../../../public/showmedia.svg"
import Uppergrid from '@/components/ProductDetail/uppergrid';
import Insights from '@/components/ProductDetail/insights';
import BusinessCategory from '@/components/ProductDetail/businesscategory';
import { PiClockCountdownLight } from "react-icons/pi";
import Pointstoconsider from '@/components/ProductDetail/pointstoconsider';
import dynamic from 'next/dynamic';
import { IoMdClose } from "react-icons/io";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useParams } from 'next/navigation';
import { useGetProductQuery, useAddToCartMutation } from '@/store/productApi';
import Loader from '@/components/Loader';
import { toast } from 'react-toastify';

const Productmap = dynamic(
  () => import('@/components/ProductDetail/productmap').then((mod) => mod.Productmap),
  { ssr: false }
);
import TargetAudience from '@/components/ProductDetail/targetaudience';
import Marketfriendly from '@/components/ProductDetail/Marketfriendly';
import { ProductFAQ } from '@/components/ProductDetail/ProductFAQ';
import FeatureListing from '@/components/FeaturedListing';
import Campaigns from '@/components/Campaigns';
import { IoPricetagOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { GoShareAndroid } from "react-icons/go"

const ProductDetail = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const { data: productData, isLoading, error } = useGetProductQuery(slug || '', {
    skip: !slug, // Skip the query if slug is not available
  });
  
  const product = productData?.data?.[0];
  const productDetails = product?.productdetails;
  const productImages = product?.product_images || [];
  const faqList = product?.faq_list || [];
  const targetAudienceList = product?.target_audience_list || [];
  const pointsToConsider = product?.product_points_to_consider || [];
  const mediadazzInsights = product?.mediadazz_insights || [];
  const audienceInsights = product?.audience_insights || [];
  const businessInsights = product?.business_insights || [];
  
  const buttonBlockRef = useRef<HTMLDivElement | null>(null)
  const [buttonsInView, setButtonsInView] = useState(true)

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
  
  // Use product images if available, otherwise fallback to default
  // Ensure we always have at least 3 images for the grid layout
  const images = productImages.length > 0 
    ? productImages.length >= 3 
      ? productImages 
      : [...productImages, ...Array(3 - productImages.length).fill(productImages[0] || market)]
    : [market, market, market];

  const openModal = (idx: number) => {
    setModalIndex(idx);
    setModalOpen(true);
  };
 const closeModal = () => {
  console.log('closeModal called');
  setModalOpen(false);
};
  const prevImage = () => setModalIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () => setModalIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  
  // All hooks must be called before any conditional returns
  useEffect(() => {
    const evaluateVisibility = () => {
      const element = buttonBlockRef.current
      if (!element) {
        setButtonsInView(false)
        return
      }
      const rect = element.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      // Offset to account for site header and to show the bar as soon as the block scrolls under the top area
      const topOffset = 88 // px
      const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, topOffset)
      const isInView = visibleHeight > 0
      setButtonsInView(isInView)
    }

    evaluateVisibility()
    window.addEventListener('scroll', evaluateVisibility, { passive: true })
    window.addEventListener('resize', evaluateVisibility)
    return () => {
      window.removeEventListener('scroll', evaluateVisibility)
      window.removeEventListener('resize', evaluateVisibility)
    }
  }, [])

  useEffect(() => {
    const checkLoginStatus = () => {
      if (typeof window !== "undefined") {
        setIsLoggedIn(localStorage.getItem('useractive') === 'true');
      }
    };

    // Check login status on mount
    checkLoginStatus();

    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener("storage", checkLoginStatus);

    // Listen for custom login status change events (from same tab)
    const handleLoginStatusChange = (event: CustomEvent) => {
      setIsLoggedIn(event.detail.isLoggedIn);
    };

    window.addEventListener(
      "userLoginStatusChanged",
      handleLoginStatusChange as EventListener
    );

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener(
        "userLoginStatusChanged",
        handleLoginStatusChange as EventListener
      );
    };
  }, []);

  const handleAddToCart = async () => {
    if (!slug) {
      toast.error('Product ID is required', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      const result = await addToCart({ product_id: slug }).unwrap();
      
      if (result.status === 'true') {
        toast.success(result.msg || 'Item added to cart', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error(result.msg || 'Failed to add item to cart', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error: any) {
      const errorMessage = error?.data?.msg || error?.message || 'Failed to add item to cart';
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  
  // Show loader while fetching data
  if (isLoading) {
    return <Loader />;
  }
  
  // Show error state if API call fails
  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <p className="text-gray-600">Unable to load product details. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Modal for image gallery */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          {/* X button is now a direct child of the overlay */}
          <button
            className="absolute top-4 right-4 text-white text-3xl md:text-4xl z-50"
            onClick={closeModal}
            aria-label="Close"
          >
            <IoMdClose />
          </button>
          <div className="flex flex-col items-center w-full h-full justify-center relative">
            <div className="flex items-center justify-center w-full h-full relative">
              <button
                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white text-3xl md:text-4xl p-2 rounded-full bg-black/40 hover:bg-black/70 transition"
                onClick={prevImage}
                aria-label="Previous"
              >
                <MdKeyboardArrowLeft />
              </button>
              {typeof images[modalIndex] === 'string' ? (
                <img
                  src={images[modalIndex]}
                  alt={`media-${modalIndex}`}
                  className="rounded-xl object-contain max-h-[40vh] md:max-h-[70vh] max-w-[90vw] mx-auto"
                />
              ) : (
                <Image
                  src={images[modalIndex]}
                  alt={`media-${modalIndex}`}
                  className="rounded-xl object-contain max-h-[40vh] md:max-h-[70vh] max-w-[90vw] mx-auto"
                  width={1200}
                  height={800}
                />
              )}
              <button
                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white text-3xl md:text-4xl p-2 rounded-full bg-black/40 hover:bg-black/70 transition"
                onClick={nextImage}
                aria-label="Next"
              >
                <MdKeyboardArrowRight />
              </button>
            </div>
            <div className="flex gap-2 mt-6 justify-center">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  className={`border-2 ${modalIndex === idx ? "border-white" : "border-transparent"} rounded-lg overflow-hidden`}
                  onClick={() => setModalIndex(idx)}
                  aria-label={`Go to image ${idx + 1}`}
                >
                  {typeof img === 'string' ? (
                    <img
                      src={img}
                      alt={`thumb-${idx}`}
                      className="w-16 h-10 object-cover"
                    />
                  ) : (
                    <Image
                      src={img}
                      alt={`thumb-${idx}`}
                      className="w-16 h-10 object-cover"
                      width={64}
                      height={40}
                    />
                  )}
                </button>
              ))}
            </div>
            <span className="absolute top-4 left-4 text-white text-base md:text-lg">{modalIndex + 1}/{images.length}</span>
          </div>
        </div>
      )}
      {!buttonsInView && (
       <div className="fixed bottom-0 top-auto  lg:bottom-auto lg:top-28 left-0 right-0 z-20 bg-white backdrop-blur">
          <div className="px-6 py-5 lg:px-24 xl:px-[7.75rem] flex justify-between gap-4 xl:gap-6 items-center">

 <div className="lg:flex hidden max-w-[56%] lg:flex-1 xl:flex-2 gap-[1.125rem] lg:gap-6 items-center">
                <div className="p-5 border-2 border-brand rounded-lg lg:rounded-[0.625rem] shrink-0">
                 <Image src={outdoor} alt='outdoor' className='w-7 h-7 shrink-0'/>
                </div>
                <div className="flex flex-col lg:max-w-[70%] xl:max-w-[90%] gap-2.5 lg:gap-3">
                    <p className="font-medium font-satoshi text-xs lg:text-sm xl:text-base text-brand ">{productDetails?.sub_category_name || 'Category'}</p>
                    <p className="font-medium font-satoshi text-base lg:text-2xl xl:text-[1.75rem] truncate">{productDetails?.product_name || 'Product Name'}</p>
                </div>
            </div>
            <div className="flex justify-between w-full lg:w-auto lg:justify-items-start lg:flex-none  items-center gap-3 sm:gap-4">
              <button className='flex-1 font-medium lg:flex-none text-sm lg:text-base xl:text-xl font-satoshi justify-center gap-2 items-center  rounded-lg py-2 bg-white flex'><IoPricetagOutline className='w-4 h-4 md:w-5 md:h-5 shrink-0'/>{productDetails?.product_price || 'Price on Request'}</button>
              <button 
                onClick={handleAddToCart}
                disabled={isAddingToCart || !slug}
                className="px-[1.125rem] flex-1 lg:flex-none  text-white cursor-pointer py-3 sm:py-4 bg-brand rounded-lg text-base xl:text-xl font-satoshi font-bold mx-auto justify-center hover:md:bg-gradient-to-r hover:md:from-orange-600 hover:md:to-orange-700 hover:md:shadow-lg flex items-center  hover:md:shadow-orange-500/25 hover:md:scale-[1.02]  outline-none  transition-all duration-300 ease-in-out transform gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className='flex items-center gap-1'> <FaPlus/> <IoMdCart/> </span>Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="">
      <div className={` items-center mt-[5.5rem] lg:mt-28 ${ !buttonsInView ? 'lg:mt-56' : ''} p-6 flex justify-between  md:py-7 lg:px-24 xl:px-[7.75rem]`}>
      <UpperSearch/>
      <button className='p-[1.125rem] lg:block hidden rounded-lg border-[#EEEEEE] border'>
        <GoShareAndroid className='w-6 h-6 text-black'/>
      </button>
      </div>
      <div className="px-6 pt-6 pb-[3.375rem] bg-[#FAFAFA] lg:px-24 xl:px-[7.75rem] lg:pb-[7.75rem]">
        <div className="flex gap-2 md:gap-2.5 items-center">
            <p className="font-satoshi text-xs md:text-sm text-[#6B7280] font-medium">Home</p>
            <MdOutlineKeyboardArrowRight className='w-3 h-3 md:h-4 md:w-4'/>
            <p className="font-satoshi text-xs md:text-sm text-[#6B7280] font-medium">{productDetails?.category_name || 'Category'}</p>
            <MdOutlineKeyboardArrowRight className='w-3 h-3 md:h-4 md:w-4'/>
            <p className="font-satoshi text-xs md:text-sm text-[#6B7280] font-medium">{productDetails?.sub_category_name || 'Subcategory'}</p>
        </div>
        <div className="mt-8 flex gap-6 justify-between items-center">
            <div className="flex gap-[1.125rem] lg:gap-6 items-center">
                <div className="p-5 border-2 border-brand rounded-lg lg:rounded-[0.625rem] shrink-0">
                 <Image src={outdoor} alt='outdoor' className='w-7 h-7 shrink-0'/>
                </div>
                <div className="flex flex-col gap-2.5 lg:gap-3">
                    <p className="font-medium font-satoshi  text-xs lg:text-base text-brand ">{productDetails?.sub_category_name || 'Category'}</p>
                    <p className="font-medium font-satoshi text-base lg:text-[1.75rem] ">{productDetails?.product_name || 'Product Name'}</p>
                </div>
            </div>

            <button className='bg-white border-[#EEEEEE] border rounded-full p-3 lg:p-4'>
                <CiHeart className='h-[1.125rem] w-[1.125rem] lg:w-6 lg:h-6'/>
            </button>
        </div>

        {/* Image grid with modal triggers */}
        <div className="flex gap-5 min-h-[15.625rem] lg:min-h-[31.25rem] mt-12">
          {images[0] && (
            typeof images[0] === 'string' ? (
              <img
                src={images[0]}
                alt='product'
                className='rounded-[0.875rem] shrink-0 w-[62%] object-cover object-center cursor-pointer'
                onClick={() => openModal(0)}
              />
            ) : (
              <Image
                src={images[0]}
                alt='product'
                className='rounded-[0.875rem] shrink-0 w-[62%] object-cover object-center cursor-pointer'
                onClick={() => openModal(0)}
                width={800}
                height={600}
              />
            )
          )}
          <div className="flex flex-col gap-5 relative w-[38%]">
            {images[1] && (
              typeof images[1] === 'string' ? (
                <img
                  src={images[1]}
                  alt='product'
                  className='rounded-[0.875rem] flex-1 object-cover object-center cursor-pointer'
                  onClick={() => openModal(1)}
                />
              ) : (
                <Image
                  src={images[1]}
                  alt='product'
                  className='rounded-[0.875rem] flex-1 object-cover object-center cursor-pointer'
                  onClick={() => openModal(1)}
                  width={400}
                  height={300}
                />
              )
            )}
            {images[2] && (
              typeof images[2] === 'string' ? (
                <img
                  src={images[2]}
                  alt='product'
                  className='rounded-[0.875rem] flex-1 object-cover object-center cursor-pointer'
                  onClick={() => openModal(2)}
                />
              ) : (
                <Image
                  src={images[2]}
                  alt='product'
                  className='rounded-[0.875rem] flex-1 object-cover object-center cursor-pointer'
                  onClick={() => openModal(2)}
                  width={400}
                  height={300}
                />
              )
            )}
            {images.length > 3 && (
              <button
                className='py-2.5 px-4 shadow-[box-shadow: 0px 4px 40px 0px #0000001A] rounded-lg hidden absolute bottom-0 right-0 lg:flex items-center gap-2.5 bg-white mr-4 mb-4 font-bold font-satoshi text-base'
                onClick={() => openModal(0)}
              >
                <Image src={showmedia} alt='show media' className='w-[1.125rem] h-[1.125rem]' />
                Show all Media
              </button>
            )}
          </div>
        </div>
        <div className="mt-6 md:mt-10 lg:mt-12 ">
        <div className="flex justify-between gap-8 w-full">
          <div className="w-full lg:w-[65%] lg:shrink-0">
            <Uppergrid 
              displayType={productDetails?.porduct_display_type}
              location={`${productDetails?.product_locality}, ${productDetails?.product_city}`}
              reach={`${productDetails?.product_reach_count} / ${productDetails?.product_reach_type}`}
              size={productDetails?.pdts}
            />
            </div>
            <div ref={buttonBlockRef} className="lg:flex  hidden flex-col gap-6 w-full">
            <button className='font-medium text-xl font-satoshi flex justify-center gap-2 items-center border border-[#EEEEEE] w-full rounded-lg py-2 bg-white'><IoPricetagOutline className='w-5 h-5'/>{productDetails?.product_price || 'Price on Request'}</button>
            <button 
              onClick={handleAddToCart}
              disabled={isAddingToCart || !slug}
              className="px-[1.125rem] text-white cursor-pointer py-4 bg-brand w-full rounded-lg text-xl font-satoshi font-bold mx-auto justify-center hover:md:bg-gradient-to-r hover:md:from-orange-600 hover:md:to-orange-700 hover:md:shadow-lg flex items-center  hover:md:shadow-orange-500/25 hover:md:scale-[1.02]  outline-none  transition-all duration-300 ease-in-out transform gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className='flex items-center gap-1'> <FaPlus/> <IoMdCart/> </span>Add to cart
            </button>
          </div>
            </div>
          <div className="mt-6 md:mt-10 space-y-9 lg:space-y-12">
            
            <div className="">
            <h3 className='font-bold font-satoshi text-xl '>About this Media</h3>
            <p className="text-base mt-5 font-medium font-satoshi lg:text-lg text-[#6B7280]">{productDetails?.product_descritption || productDetails?.product_descritption_two || 'No description available.'}</p>
          </div>
          <div className=" space-y-9 lg:space-y-12">
          <Insights isLoggedIn={isLoggedIn} mediadazzInsights={mediadazzInsights} audienceInsights={audienceInsights}/>
          <BusinessCategory isLoggedIn={isLoggedIn} businessInsights={businessInsights}/>
          <div className="">
          <h2 className="gap-3.5 flex items-center text-2xl font-bold font-satoshi ">
    <PiClockCountdownLight className="w-6 h-6" />
    Past Brands & Industries Featured
  </h2>
          <div className={`${!isLoggedIn ? "min-h-60" : "min-h-0"} flex relative flex-wrap gap-3.5 mt-6 lg:mt-7`}>
       {["Automotive OEMs","Premium Retail","Real Estate Developers","Telecom & Devices","Banks & Fintech"].map((item, index)=><div key={index}  className="flex-wrap py-[1.125rem] px-6 bg-white text-center shrink-0  rounded-full border border-[#EEEEEE] font-medium font-satoshi text-base">
          {item}
        </div>)}
         {!isLoggedIn && (
      <div className="absolute z-10 w-full h-full min-h-28 flex flex-col items-center justify-center bg-[#0000000D] backdrop-blur-md  px-4 py-8">
        <h3 className="font-bold font-satoshi text-center text-lg md:text-2xl mb-2">Log in to view all Insights</h3>
        <p className="text-[#6B7280] text-center text-sm md:text-base mb-5">Bunch of Public insights backed by Data at your Fingertips</p>
        <button className="bg-brand text-white font-bold font-satoshi rounded-lg px-8 py-3 text-base md:text-lg">Log in</button>
      </div>
    )}
      </div>
      
          </div>
          <Pointstoconsider isLoggedIn={isLoggedIn} pointsToConsider={pointsToConsider}/>
          <Productmap 
            isLoggedIn={isLoggedIn}
            latitude={productDetails?.product_maps?.maps_latitude ? parseFloat(productDetails.product_maps.maps_latitude) : undefined}
            longitude={productDetails?.product_maps?.maps_longitude ? parseFloat(productDetails.product_maps.maps_longitude) : undefined}
            locationName={`${productDetails?.product_locality}, ${productDetails?.product_city}`}
            mapsLink={productDetails?.product_maps?.maps_link}
          />
          <TargetAudience isLoggedIn={isLoggedIn} targetAudienceList={targetAudienceList}/>
          <Marketfriendly isLoggedIn={isLoggedIn}/>
          </div>
          <ProductFAQ faqList={faqList}/>
          </div>
         
        </div>
      </div>
      <FeatureListing listings={product?.same_seller_listing?.data}/>
      <Campaigns heading='Your brand deserves to shine where it matters most'  buttonText='Request a Custom plan'/>
      </div>
    </div>
  )
}

export default ProductDetail

