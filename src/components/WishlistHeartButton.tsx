'use client';

import { useState, useEffect } from 'react';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useAddToWishlistMutation, useUpdateWishlistMutation } from '@/store/authApi';

interface WishlistHeartButtonProps {
  productId: string;
  isInWishlist: boolean;
  className?: string;
}

export default function WishlistHeartButton({ productId, isInWishlist: initialIsInWishlist, className = '' }: WishlistHeartButtonProps) {
  const [addToWishlist, { isLoading: isAdding }] = useAddToWishlistMutation();
  const [updateWishlist, { isLoading: isRemoving }] = useUpdateWishlistMutation();
  
  // Optimistic state for immediate UI feedback
  const [optimisticIsInWishlist, setOptimisticIsInWishlist] = useState(initialIsInWishlist);
  
  // Update optimistic state when prop changes (when wishlist query refetches)
  useEffect(() => {
    setOptimisticIsInWishlist(initialIsInWishlist);
  }, [initialIsInWishlist]);

  const isLoading = isAdding || isRemoving;
  const displayIsInWishlist = optimisticIsInWishlist;

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click events
    
    // Check if user is logged in
    const token = localStorage.getItem('auth_token');
    if (!token) {
      toast.error('Please login to add items to wishlist', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    
    // Optimistically update UI immediately
    const newState = !displayIsInWishlist;
    setOptimisticIsInWishlist(newState);
    
    try {
      if (displayIsInWishlist) {
        // Item is in wishlist, remove it
        await updateWishlist({ product_id: productId }).unwrap();
        toast.success('Item removed from wishlist', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        // Item is not in wishlist, add it
        await addToWishlist({ product_id: productId }).unwrap();
        toast.success('Item added to wishlist', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      // Revert optimistic update on error
      setOptimisticIsInWishlist(displayIsInWishlist);
      const errorMessage = displayIsInWishlist 
        ? 'Failed to remove item from wishlist' 
        : 'Failed to add item to wishlist';
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
      onClick={handleClick}
      disabled={isLoading}
      className={`h-10 w-10 absolute top-0 right-0 rounded-full mt-[1.375rem] mr-[1.375rem] bg-white flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {displayIsInWishlist ? (
        <FaHeart className="text-red-500 h-4 w-4 transition-colors duration-300" />
      ) : (
        <CiHeart className="text-[#6B7280] h-4 w-4 transition-colors duration-300 hover:text-red-500" />
      )}
    </button>
  );
}




