// *********************
// Role of the component: Cart icon element - Cibaduyut
// Name of the component: CartElement.tsx
// Version: 2.0 - Modern Design
// *********************

"use client";
import Link from 'next/link'
import React from 'react'
import { FaShoppingBag } from 'react-icons/fa'
import { useProductStore } from "@/app/_zustand/store";

const CartElement = () => {
  const { allQuantity } = useProductStore();
  
  return (
    <Link 
      href="/cart" 
      className="relative p-2 rounded-lg hover:bg-cibaduyut-brown-100 transition-smooth group"
      aria-label="Shopping cart"
    >
      <FaShoppingBag className="text-xl text-cibaduyut-brown-600 group-hover:text-cibaduyut-brown-700 transition-colors" />
      {allQuantity > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-cibaduyut-gold text-cibaduyut-brown-900 text-xs font-bold rounded-full flex justify-center items-center shadow-sm animate-scale-in">
          {allQuantity > 99 ? '99+' : allQuantity}
        </span>
      )}
    </Link>
  )
}

export default CartElement