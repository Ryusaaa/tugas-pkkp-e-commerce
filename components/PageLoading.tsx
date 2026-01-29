// *********************
// Role of the component: Page loading component
// Name of the component: PageLoading.tsx
// Version: 1.0
// *********************

import React from "react";

interface PageLoadingProps {
  text?: string;
}

const PageLoading = ({ text = "Memuat..." }: PageLoadingProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-amber-100 rounded-full"></div>
        {/* Spinning ring */}
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-amber-600 rounded-full animate-spin"></div>
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-3 h-3 -mt-1.5 -ml-1.5 bg-amber-600 rounded-full"></div>
      </div>
      <p className="mt-4 text-gray-600 text-sm">{text}</p>
    </div>
  );
};

export default PageLoading;
