export const dynamic = "force-dynamic";
export const revalidate = 0;

import {
  Breadcrumb,
  Filters,
  Pagination,
  Products,
  SortBy,
} from "@/components";
import React from "react";
import { sanitize } from "@/lib/sanitize";

const improveCategoryText = (text: string): string => {
  if (text.indexOf("-") !== -1) {
    let textArray = text.split("-");
    return textArray.join(" ");
  } else {
    return text;
  }
};

const ShopPage = async ({ params, searchParams }: { params: Promise<{ slug?: string[] }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;
  
  const categoryTitle = awaitedParams?.slug && awaitedParams?.slug[0]?.length > 0
    ? sanitize(improveCategoryText(awaitedParams?.slug[0]))
    : "Semua Produk";
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-6">
          <Breadcrumb />
          <h1 className="text-2xl font-bold text-gray-800 capitalize">{categoryTitle}</h1>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Filters />
          </aside>
          
          {/* Products Section */}
          <main>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <p className="text-gray-500 text-sm">
                Menampilkan produk berkualitas tinggi
              </p>
              <SortBy />
            </div>
            
            <Products params={awaitedParams} searchParams={awaitedSearchParams} />
            
            <Pagination />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
