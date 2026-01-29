// *********************
// Role of the component: Search input - Cibaduyut Authentic Leather
// Name of the component: SearchInput.tsx
// Version: 2.0 - Modern Minimalist Design
// *********************

"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { sanitize } from "@/lib/sanitize";

const SearchInput = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const searchProducts = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sanitizedSearch = sanitize(searchInput);
    router.push(`/search?search=${encodeURIComponent(sanitizedSearch)}`);
    setSearchInput("");
  };

  return (
    <form 
      className={`flex w-full max-w-xl relative transition-all duration-300 ${
        isFocused ? 'scale-[1.02]' : ''
      }`} 
      onSubmit={searchProducts}
    >
      <div className="relative flex-1">
        <FaSearch className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
          isFocused ? 'text-cibaduyut-brown-500' : 'text-cibaduyut-brown-300'
        }`} />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Cari sepatu, sandal, tas kulit..."
          className={`w-full pl-11 pr-4 py-3 rounded-l-xl border-2 transition-all duration-300 bg-cibaduyut-cream/50
            ${isFocused 
              ? 'border-cibaduyut-brown-400 bg-white shadow-leather' 
              : 'border-cibaduyut-brown-200 hover:border-cibaduyut-brown-300'
            }
            focus:outline-none placeholder:text-cibaduyut-brown-300
          `}
        />
      </div>
      <button 
        type="submit" 
        className="px-6 py-3 bg-gradient-to-r from-cibaduyut-brown-600 to-cibaduyut-brown-700 text-white rounded-r-xl font-medium
          hover:from-cibaduyut-brown-700 hover:to-cibaduyut-brown-800 
          active:scale-95 transition-all duration-300 shadow-leather hover:shadow-leather-lg"
      >
        Cari
      </button>
    </form>
  );
};

export default SearchInput;
