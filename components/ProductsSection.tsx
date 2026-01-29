// *********************
// Role of the component: Products section - Cibaduyut Authentic Leather
// Name of the component: ProductsSection.tsx
// Version: 2.0 - Modern Minimalist Design
// *********************

import React from "react";
import Link from "next/link";
import ProductItem from "./ProductItem";
import apiClient from "@/lib/api";
import { FaArrowRight } from "react-icons/fa";

const ProductsSection = async () => {
  let products = [];
  
  try {
    const data = await apiClient.get("/api/products");
    
    if (!data.ok) {
      console.error('Failed to fetch products:', data.statusText);
      products = [];
    } else {
      const result = await data.json();
      products = Array.isArray(result) ? result : [];
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    products = [];
  }

  return (
    <section className="py-16 lg:py-24 bg-cibaduyut-cream">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-cibaduyut-gold font-medium mb-2 uppercase tracking-wider text-sm">
              Koleksi Terbaru
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cibaduyut-brown-800">
              Produk Unggulan
            </h2>
            <p className="text-cibaduyut-brown-500 mt-2 max-w-md">
              Temukan koleksi sepatu dan sandal kulit terbaik kami
            </p>
          </div>
          <Link 
            href="/shop"
            className="inline-flex items-center gap-2 text-cibaduyut-brown-600 font-medium hover:text-cibaduyut-gold transition-colors group"
          >
            <span>Lihat Semua Produk</span>
            <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {products.length > 0 ? (
            products.slice(0, 8).map((product: any) => (
              <ProductItem key={product.id} product={product} color="black" />
            ))
          ) : (
            <div className="col-span-full">
              <div className="text-center py-16 bg-white rounded-2xl shadow-leather">
                <div className="text-6xl mb-4">👞</div>
                <h3 className="text-xl font-semibold text-cibaduyut-brown-700 mb-2">
                  Belum Ada Produk
                </h3>
                <p className="text-cibaduyut-brown-400 mb-6">
                  Produk akan segera tersedia. Nantikan koleksi terbaru kami!
                </p>
                <Link 
                  href="/shop" 
                  className="btn-cibaduyut inline-flex items-center gap-2"
                >
                  <span>Jelajahi Toko</span>
                  <FaArrowRight className="text-sm" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        {products.length > 0 && (
          <div className="text-center mt-12">
            <Link 
              href="/shop"
              className="btn-cibaduyut-outline inline-flex items-center gap-2"
            >
              <span>Lihat Lebih Banyak</span>
              <FaArrowRight className="text-sm" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
