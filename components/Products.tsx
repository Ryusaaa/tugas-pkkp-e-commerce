// *********************
// Role of the component: Products grid - Cibaduyut
// Name of the component: Products.tsx
// Version: 2.0
// *********************

import React from "react";
import ProductItem from "./ProductItem";
import apiClient from "@/lib/api";
import { FaBoxOpen } from "react-icons/fa";

const Products = async ({ params, searchParams }: { params: { slug?: string[] }, searchParams: { [key: string]: string | string[] | undefined } }) => {
  const inStockNum = searchParams?.inStock === "true" ? 1 : 0;
  const outOfStockNum = searchParams?.outOfStock === "true" ? 1 : 0;
  const page = searchParams?.page ? Number(searchParams?.page) : 1;

  let stockMode: string = "lte";
  
  if (inStockNum === 1) {
    stockMode = "equals";
  }
  if (outOfStockNum === 1) {
    stockMode = "lt";
  }
  if (inStockNum === 1 && outOfStockNum === 1) {
    stockMode = "lte";
  }
  if (inStockNum === 0 && outOfStockNum === 0) {
    stockMode = "gt";
  }

  let products = [];

  try {
    const data = await apiClient.get(`/api/products?filters[price][$lte]=${
        searchParams?.price || 50000000
      }&filters[rating][$gte]=${
        Number(searchParams?.rating) || 0
      }&filters[inStock][$${stockMode}]=1&${
        params?.slug?.length! > 0
          ? `filters[category][$equals]=${params?.slug}&`
          : ""
      }sort=${searchParams?.sort}&page=${page}`
    );

    if (!data.ok) {
      console.error('Failed to fetch products:', data.statusText);
      products = [];
    } else {
      const result = await data.json();
      products = Array.isArray(result) ? result : [];
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    products = [];
  }

  return (
    <>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product: any) => (
            <ProductItem key={product.id} product={product} color="black" />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <FaBoxOpen className="text-3xl text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Produk Tidak Ditemukan
          </h3>
          <p className="text-gray-500">
            Coba ubah filter atau cari dengan kata kunci lain
          </p>
        </div>
      )}
    </>
  );
};

export default Products;
