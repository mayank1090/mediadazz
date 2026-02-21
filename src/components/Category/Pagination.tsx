"use client";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center gap-3 justify-end">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-[#EEEEEE] font-medium font-satoshi text-sm ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
        aria-label="Previous page"
      >
        <IoIosArrowBack className="w-4 h-4" />
        <span>Previous</span>
      </button>
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium font-satoshi text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-[#EEEEEE] font-medium font-satoshi text-sm ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
        aria-label="Next page"
      >
        <span>Next</span>
        <IoIosArrowForward className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;






