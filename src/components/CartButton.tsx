'use client';

import { useState, useRef } from 'react';
import { GoPlus } from "react-icons/go";
import { FaCartShopping } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { useAddToCartMutation } from '@/store/productApi';

export default function CartButton({ 
  product_id 
}: { 
  product_id: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [addToCart, { isLoading }] = useAddToCartMutation();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150); // 150ms delay to prevent flickering
  };

  const handleClick = async () => {
    console.log(product_id);
    if (!product_id) {
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
      const result = await addToCart({ product_id }).unwrap();
      
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

  return (
    <button 
      className="px-3 py-2 bg-brand flex items-center rounded-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={isLoading || !product_id}
    >
      {/* Plus icon - always visible */}
      <GoPlus className={`text-white h-4 w-4 transition-all duration-300 ease-in-out ${
        isHovered ? 'hidden' : ''
      }`} />
      
      {/* Text - only visible on lg screens and when hovered */}
      <span className={`text-white w-0 font-satoshi font-medium text-sm whitespace-nowrap lg:w-0 lg:transition-all lg:duration-300 lg:ease-in-out overflow-hidden ${
        isHovered ? 'lg:w-auto' : ''
      }`}>
        Add to cart
      </span>
      
      {/* Cart icon - always visible */}
      <FaCartShopping className={`text-white h-4 w-4 ml-2 transition-all duration-300 ease-in-out ${
        isHovered ? 'hidden' : ''
      }`}/>
    </button>
  );
}
