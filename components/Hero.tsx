// *********************
// Role of the component: Hero section on home page - Cibaduyut Authentic Leather
// Name of the component: Hero.tsx
// Version: 2.0 - Modern Minimalist Design
// *********************

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight, FaShieldAlt, FaTruck, FaStar } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cibaduyut-brown-50 via-cibaduyut-cream to-cibaduyut-brown-100">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cibaduyut-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cibaduyut-brown-200/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16 py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-cibaduyut-brown-100 text-cibaduyut-brown-700 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <FaStar className="text-cibaduyut-gold" />
              <span>Kulit Asli 100% Berkualitas</span>
            </div>
            
            {/* Heading */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cibaduyut-brown-900 leading-tight mb-6">
              Cibaduyut
              <span className="block text-gradient">Authentic Leather</span>
            </h1>
            
            {/* Description */}
            <p className="text-cibaduyut-brown-600 text-lg md:text-xl leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Temukan koleksi sepatu dan sandal kulit asli berkualitas tinggi, 
              dibuat dengan kerajinan tangan khas Cibaduyut, Bandung.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link 
                href="/shop" 
                className="btn-cibaduyut inline-flex items-center justify-center gap-2 group"
              >
                <span>Belanja Sekarang</span>
                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/shop" 
                className="btn-cibaduyut-outline inline-flex items-center justify-center gap-2"
              >
                <span>Lihat Koleksi</span>
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-cibaduyut-brown-600">
                <div className="w-10 h-10 rounded-lg bg-cibaduyut-brown-100 flex items-center justify-center">
                  <FaShieldAlt className="text-cibaduyut-brown-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold">Garansi Asli</p>
                  <p className="text-xs text-cibaduyut-brown-400">100% Kulit Asli</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-cibaduyut-brown-600">
                <div className="w-10 h-10 rounded-lg bg-cibaduyut-brown-100 flex items-center justify-center">
                  <FaTruck className="text-cibaduyut-brown-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold">Gratis Ongkir</p>
                  <p className="text-xs text-cibaduyut-brown-400">Min. Rp 500.000</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative z-10">
              {/* Main Image Container */}
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Background Circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-cibaduyut-brown-200 to-cibaduyut-gold/30 rounded-full scale-90"></div>
                
                {/* Leather Texture Overlay */}
                <div className="absolute inset-8 bg-gradient-to-br from-cibaduyut-brown-400/20 to-transparent rounded-full"></div>
                
                {/* Product Image Placeholder - Replace with actual leather shoe image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-48 h-48 mx-auto mb-4 bg-gradient-to-br from-cibaduyut-brown-600 to-cibaduyut-brown-800 rounded-3xl shadow-leather-lg transform rotate-12 hover:rotate-6 transition-transform duration-500 flex items-center justify-center">
                      <span className="text-white font-display text-6xl font-bold -rotate-12">C</span>
                    </div>
                    <p className="text-cibaduyut-brown-500 text-sm italic">Premium Leather Collection</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-leather p-4 animate-bounce-subtle">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-cibaduyut-gold/20 rounded-lg flex items-center justify-center">
                    <FaStar className="text-cibaduyut-gold text-sm" />
                  </div>
                  <div>
                    <p className="text-xs text-cibaduyut-brown-500">Rating</p>
                    <p className="text-sm font-bold text-cibaduyut-brown-800">4.9/5</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-leather p-4">
                <p className="text-xs text-cibaduyut-brown-500">Terjual</p>
                <p className="text-lg font-bold text-cibaduyut-brown-800">10K+ Produk</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 50L48 45.8C96 41.7 192 33.3 288 33.3C384 33.3 480 41.7 576 54.2C672 66.7 768 83.3 864 83.3C960 83.3 1056 66.7 1152 58.3C1248 50 1344 50 1392 50L1440 50V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
