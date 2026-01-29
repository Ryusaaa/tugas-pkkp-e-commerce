// *********************
// Role of the component: Pagination - Cibaduyut
// Name of the component: Pagination.tsx
// Version: 2.0
// *********************

"use client";
import { usePaginationStore } from "@/app/_zustand/paginationStore";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = () => {
  const { page, incrementPage, decrementPage } = usePaginationStore();
  
  return (
    <div className="flex justify-center items-center gap-2 py-10">
      <button
        className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => decrementPage()}
        disabled={page <= 1}
      >
        <FaChevronLeft className="text-sm" />
      </button>
      
      <div className="px-5 py-2 bg-amber-600 text-white rounded-lg font-medium">
        Halaman {page}
      </div>
      
      <button
        className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700 transition-colors"
        onClick={() => incrementPage()}
      >
        <FaChevronRight className="text-sm" />
      </button>
    </div>
  );
};

export default Pagination;
