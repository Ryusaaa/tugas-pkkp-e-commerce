// *********************
// Role of the component: Filters on shop page - Cibaduyut
// Name of the component: Filters.tsx
// Version: 2.0
// *********************

"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSortStore } from "@/app/_zustand/sortStore";
import { usePaginationStore } from "@/app/_zustand/paginationStore";
import { FaFilter, FaStar } from "react-icons/fa";

interface InputCategory {
  inStock: { text: string, isChecked: boolean },
  outOfStock: { text: string, isChecked: boolean },
  priceFilter: { text: string, value: number },
  ratingFilter: { text: string, value: number },
}

const Filters = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const { page } = usePaginationStore();
  const { sortBy } = useSortStore();
  
  const [inputCategory, setInputCategory] = useState<InputCategory>({
    inStock: { text: "instock", isChecked: true },
    outOfStock: { text: "outofstock", isChecked: true },
    priceFilter: { text: "price", value: 50000000 },
    ratingFilter: { text: "rating", value: 0 },
  });

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("outOfStock", inputCategory.outOfStock.isChecked.toString());
    params.set("inStock", inputCategory.inStock.isChecked.toString());
    params.set("rating", inputCategory.ratingFilter.value.toString());
    params.set("price", inputCategory.priceFilter.value.toString());
    params.set("sort", sortBy);
    params.set("page", page.toString());
    replace(`${pathname}?${params}`);
  }, [inputCategory, sortBy, page]);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('id-ID').format(value);
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <FaFilter className="text-amber-700" />
        <h3 className="font-semibold text-gray-800">Filter</h3>
      </div>
      
      {/* Availability */}
      <div className="mb-5">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Ketersediaan</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={inputCategory.inStock.isChecked}
              onChange={() =>
                setInputCategory({
                  ...inputCategory,
                  inStock: {
                    text: "instock",
                    isChecked: !inputCategory.inStock.isChecked,
                  },
                })
              }
              className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
            />
            <span className="text-sm text-gray-600 group-hover:text-gray-900">Tersedia</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={inputCategory.outOfStock.isChecked}
              onChange={() =>
                setInputCategory({
                  ...inputCategory,
                  outOfStock: {
                    text: "outofstock",
                    isChecked: !inputCategory.outOfStock.isChecked,
                  },
                })
              }
              className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
            />
            <span className="text-sm text-gray-600 group-hover:text-gray-900">Habis</span>
          </label>
        </div>
      </div>

      <hr className="border-gray-100 my-4" />

      {/* Price */}
      <div className="mb-5">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Harga Maksimal</h4>
        <input
          type="range"
          min={100000}
          max={50000000}
          step={100000}
          value={inputCategory.priceFilter.value}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
          onChange={(e) =>
            setInputCategory({
              ...inputCategory,
              priceFilter: {
                text: "price",
                value: Number(e.target.value),
              },
            })
          }
        />
        <p className="text-sm text-amber-700 font-medium mt-2">
          Rp {formatPrice(inputCategory.priceFilter.value)}
        </p>
      </div>

      <hr className="border-gray-100 my-4" />

      {/* Rating */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Rating Minimal</h4>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() =>
                setInputCategory({
                  ...inputCategory,
                  ratingFilter: { text: "rating", value: star },
                })
              }
              className={`p-1.5 rounded transition-colors ${
                star <= inputCategory.ratingFilter.value
                  ? 'text-amber-500'
                  : 'text-gray-300 hover:text-amber-300'
              }`}
            >
              <FaStar className="text-lg" />
            </button>
          ))}
          {inputCategory.ratingFilter.value > 0 && (
            <button
              onClick={() =>
                setInputCategory({
                  ...inputCategory,
                  ratingFilter: { text: "rating", value: 0 },
                })
              }
              className="ml-2 text-xs text-gray-400 hover:text-gray-600"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
