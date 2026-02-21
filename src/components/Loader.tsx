"use client";

import React from 'react';

type LoaderProps = {
  size?: number;
  className?: string;
};

export default function Loader({ size = 24, className = '' }: LoaderProps) {
  const stroke = Math.max(2, Math.round(size / 8));
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <svg
        className="animate-spin"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke="#E5E7EB" strokeWidth={stroke} />
        <path
          d="M22 12a10 10 0 00-10-10"
          stroke="#ffffff"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
