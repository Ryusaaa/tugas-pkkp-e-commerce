// *********************
// Role of the component: Breadcrumb - Cibaduyut
// Name of the component: Breadcrumb.tsx
// Version: 2.0
// *********************

import Link from "next/link";
import React from "react";
import { FaHome, FaChevronRight } from "react-icons/fa";

const Breadcrumb = () => {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 py-4">
      <Link href="/" className="flex items-center gap-1 hover:text-amber-600 transition-colors">
        <FaHome className="text-xs" />
        <span>Beranda</span>
      </Link>
      <FaChevronRight className="text-xs text-gray-300" />
      <Link href="/shop" className="hover:text-amber-600 transition-colors">
        Toko
      </Link>
      <FaChevronRight className="text-xs text-gray-300" />
      <span className="text-gray-700">Semua Produk</span>
    </nav>
  );
};

export default Breadcrumb;
