'use client';

import { useState, useRef } from 'react';
import { GoPlus } from "react-icons/go";
import { FaCartShopping } from "react-icons/fa6";
import { toast } from 'react-toastify';

export default function CartButton() {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleClick = () => {
    toast.success('Item added to cart', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <button 
      className="px-3 py-2 bg-brand flex items-center rounded-lg transition-all duration-300 ease-in-out"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
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
