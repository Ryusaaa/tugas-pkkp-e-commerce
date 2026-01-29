// *********************
// Role of the component: Category wrapper - Cibaduyut Authentic Leather
// Name of the component: CategoryMenu.tsx
// Version: 2.1 - With React Icons
// *********************

import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { GiLeatherBoot, GiHighHeel, GiSlippers, GiSchoolBag, GiNecklace } from "react-icons/gi";

// Custom categories for leather products
const leatherCategories = [
  { id: 1, title: "Sepatu Pria", href: "/shop?category=sepatu-pria", icon: GiLeatherBoot, count: 234 },
  { id: 2, title: "Sepatu Wanita", href: "/shop?category=sepatu-wanita", icon: GiHighHeel, count: 189 },
  { id: 3, title: "Sandal Kulit", href: "/shop?category=sandal", icon: GiSlippers, count: 156 },
  { id: 4, title: "Tas Kulit", href: "/shop?category=tas", icon: GiSchoolBag, count: 98 },
  { id: 5, title: "Aksesoris", href: "/shop?category=aksesoris", icon: GiNecklace, count: 67 },
];

const CategoryMenu = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cibaduyut-brown-800 mb-3">
            Kategori Produk
          </h2>
          <div className="section-divider mb-4"></div>
          <p className="text-cibaduyut-brown-500 max-w-2xl mx-auto">
            Temukan berbagai pilihan produk kulit asli berkualitas tinggi
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {leatherCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.id}
                href={category.href}
                className="group relative bg-gradient-to-br from-cibaduyut-brown-50 to-cibaduyut-cream rounded-2xl p-6 
                  border border-cibaduyut-brown-100 hover:border-cibaduyut-gold 
                  hover:shadow-leather-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="text-2xl text-amber-700" />
                </div>
                
                {/* Title */}
                <h3 className="font-semibold text-cibaduyut-brown-800 mb-1 group-hover:text-cibaduyut-brown-600 transition-colors">
                  {category.title}
                </h3>
                
                {/* Count */}
                <p className="text-sm text-cibaduyut-brown-400">
                  {category.count} Produk
                </p>
                
                {/* Arrow */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-cibaduyut-brown-100/50 flex items-center justify-center
                  opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <FaArrowRight className="text-cibaduyut-brown-500 text-xs" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link 
            href="/shop"
            className="inline-flex items-center gap-2 text-cibaduyut-brown-600 font-medium hover:text-cibaduyut-gold transition-colors group"
          >
            <span>Lihat Semua Kategori</span>
            <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryMenu;
