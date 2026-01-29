// *********************
// Role of the component: Wishlist icon - Cibaduyut
// Name of the component: HeartElement.tsx
// Version: 2.0 - Modern Design
// *********************

"use client";
import Link from "next/link";
import React from "react";
import { FaHeart } from "react-icons/fa";

const HeartElement = ({wishQuantity}: {wishQuantity: number}) => {
  return (
    <Link 
      href="/wishlist" 
      className="relative p-2 rounded-lg hover:bg-cibaduyut-brown-100 transition-smooth group"
      aria-label="Wishlist"
    >
      <FaHeart className="text-xl text-cibaduyut-brown-400 group-hover:text-red-500 transition-colors" />
      {wishQuantity > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-red-500 text-white text-xs font-bold rounded-full flex justify-center items-center shadow-sm animate-scale-in">
          {wishQuantity > 99 ? '99+' : wishQuantity}
        </span>
      )}
    </Link>
  );
};

export default HeartElement;
