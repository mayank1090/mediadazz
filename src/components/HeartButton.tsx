'use client';

import { useState } from 'react';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { toast } from 'react-toastify';

interface HeartButtonProps {
  itemId?: string | number;
  className?: string;
}

export default function HeartButton({ itemId = 'item', className = '' }: HeartButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleClick = () => {
    setIsFavorited(!isFavorited);
    
    if (!isFavorited) {
      toast.success('Item added to wishlist', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.info('Item removed from wishlist', {
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
      onClick={handleClick}
      className={`h-10 w-10 absolute top-0 right-0 rounded-full mt-[1.375rem] mr-[1.375rem] bg-white flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 ${className}`}
    >
      {isFavorited ? (
        <FaHeart className="text-red-500 h-4 w-4 transition-colors duration-300" />
      ) : (
        <CiHeart className="text-[#6B7280] h-4 w-4 transition-colors duration-300 hover:text-red-500" />
      )}
    </button>
  );
}
