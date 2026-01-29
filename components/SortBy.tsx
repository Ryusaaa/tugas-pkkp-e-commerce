// *********************
// Role of the component: SortBy - Cibaduyut
// Name of the component: SortBy.tsx
// Version: 2.0
// *********************

"use client";
import React from "react";
import { useSortStore } from "@/app/_zustand/sortStore";
import { FaSort } from "react-icons/fa";

const SortBy = () => {
  const { sortBy, changeSortBy } = useSortStore();

  return (
    <div className="flex items-center gap-3">
      <FaSort className="text-gray-400" />
      <select
        value={sortBy}
        onChange={(e) => changeSortBy(e.target.value)}
        className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer"
        name="sort"
      >
        <option value="defaultSort">Urutkan</option>
        <option value="titleAsc">Nama A-Z</option>
        <option value="titleDesc">Nama Z-A</option>
        <option value="lowPrice">Harga Terendah</option>
        <option value="highPrice">Harga Tertinggi</option>
      </select>
    </div>
  );
};

export default SortBy;
