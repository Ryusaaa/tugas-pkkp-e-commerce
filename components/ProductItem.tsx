// *********************
// Role of the component: Product item card - Cibaduyut Authentic Leather
// Name of the component: ProductItem.tsx
// Version: 2.0 - Modern Minimalist Design with Hover Effects
// *********************

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import { sanitize } from "@/lib/sanitize";

const ProductItem = ({
  product,
  color,
}: {
  product: Product;
  color: string;
}) => {
  // Format price to Indonesian Rupiah
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price * 15000); // Convert to IDR (approximate)
  };

  return (
    <div className="group card-product bg-white">
      {/* Image Container */}
      <Link href={`/product/${product.slug}`} className="block relative overflow-hidden">
        <div className="aspect-[4/5] relative bg-gradient-to-b from-cibaduyut-cream to-cibaduyut-brown-100">
          <Image
            src={
              product.mainImage
                ? `/${product.mainImage}`
                : "/product_placeholder.jpg"
            }
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            alt={sanitize(product?.title) || "Product image"}
          />
          
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-cibaduyut-dark/0 group-hover:bg-cibaduyut-dark/20 transition-colors duration-300" />
          
          {/* Quick Actions */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <Link 
              href={`/product/${product.slug}`}
              className="flex-1 py-2.5 bg-white/95 backdrop-blur-sm text-cibaduyut-brown-700 rounded-lg font-medium text-sm text-center
                hover:bg-cibaduyut-gold hover:text-cibaduyut-brown-900 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <FaEye className="text-xs" />
              <span>Lihat Detail</span>
            </Link>
          </div>
          
          {/* Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-cibaduyut-gold text-cibaduyut-brown-900 text-xs font-semibold rounded-full shadow-sm">
              Kulit Asli
            </span>
          </div>
        </div>
      </Link>
      
      {/* Content */}
      <div className="p-4">
        {/* Category Tag */}
        <p className="text-xs text-cibaduyut-brown-400 uppercase tracking-wider mb-1">
          Sepatu Kulit
        </p>
        
        {/* Title */}
        <Link
          href={`/product/${product.slug}`}
          className="block font-medium text-cibaduyut-brown-800 hover:text-cibaduyut-gold transition-colors duration-200 line-clamp-2 mb-2"
        >
          {sanitize(product.title)}
        </Link>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-cibaduyut-brown-700">
            {formatPrice(product.price)}
          </p>
          
          {/* Rating */}
          <div className="flex items-center gap-1 text-cibaduyut-gold">
            <span className="text-sm">★</span>
            <span className="text-xs text-cibaduyut-brown-500">4.8</span>
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <Link
          href={`/product/${product?.slug}`}
          className="mt-3 w-full py-2.5 border-2 border-cibaduyut-brown-200 text-cibaduyut-brown-600 rounded-lg font-medium text-sm
            hover:bg-cibaduyut-brown-600 hover:text-white hover:border-cibaduyut-brown-600 
            transition-all duration-300 flex items-center justify-center gap-2"
        >
          <FaShoppingCart className="text-xs" />
          <span>Tambah ke Keranjang</span>
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
