// *********************
// Role of the component: IntroducingSection - Cibaduyut Authentic Leather
// Name of the component: IntroducingSection.tsx
// Version: 2.0 - Modern Minimalist Design
// *********************

import Link from "next/link";
import React from "react";
import { FaArrowRight, FaStar } from "react-icons/fa";

const IntroducingSection = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-cibaduyut-brown-800 via-cibaduyut-brown-700 to-cibaduyut-brown-900">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cibaduyut-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cibaduyut-brown-500/20 rounded-full blur-3xl" />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative z-10">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-cibaduyut-gold/20 text-cibaduyut-gold px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
            <FaStar />
            <span>Sejak 1970</span>
          </div>
          
          {/* Main Heading */}
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6">
            <span className="text-white">CIBADUYUT</span>
            <br />
            <span className="text-gradient bg-gradient-to-r from-cibaduyut-gold via-cibaduyut-brown-300 to-cibaduyut-gold bg-clip-text text-transparent">
              AUTHENTIC LEATHER
            </span>
          </h2>
          
          {/* Tagline */}
          <p className="text-white/80 text-xl md:text-2xl font-light max-w-2xl mx-auto mb-4">
            Kerajinan kulit asli berkualitas tinggi,
          </p>
          <p className="text-white/80 text-xl md:text-2xl font-light max-w-2xl mx-auto mb-10">
            dibuat dengan tradisi turun-temurun dari Cibaduyut, Bandung.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/shop" 
              className="group inline-flex items-center gap-3 bg-cibaduyut-gold text-cibaduyut-brown-900 font-bold px-8 py-4 rounded-xl
                hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="text-lg">BELANJA SEKARANG</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/shop" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-cibaduyut-gold font-medium transition-colors"
            >
              <span>Pelajari Lebih Lanjut</span>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16">
            {[
              { value: '50+', label: 'Tahun Pengalaman' },
              { value: '10K+', label: 'Produk Terjual' },
              { value: '4.9', label: 'Rating Pelanggan' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-cibaduyut-gold mb-1">{stat.value}</p>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroducingSection;
