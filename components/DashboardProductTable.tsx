"use client";

// *********************
// Role of the component: Product table component on admin dashboard page
// Name of the component: DashboardProductTable.tsx
// Version: 2.0 - Cibaduyut Theme
// *********************

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import apiClient from "@/lib/api";
import { sanitize } from "@/lib/sanitize";
import { FaPlus, FaSearch, FaBoxOpen, FaEdit, FaTrash } from "react-icons/fa";

interface Product {
  id: string;
  title: string;
  manufacturer: string;
  mainImage: string;
  inStock: number;
  price: number;
}

const DashboardProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiClient.get("/api/products?mode=admin", {cache: "no-store"})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-cibaduyut-brown-800">
            Daftar Produk
          </h1>
          <p className="text-cibaduyut-brown-500 mt-1">
            Kelola inventaris produk kulit Anda
          </p>
        </div>
        
        <Link 
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-cibaduyut-gold hover:bg-amber-600 text-white font-medium px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md"
        >
          <FaPlus /> Tambah Produk
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Header / Filters */}
        <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-xs w-full">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari produk..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cibaduyut-gold/50 focus:border-cibaduyut-gold"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Total Produk:</span>
            <span className="bg-cibaduyut-brown-100 text-cibaduyut-brown-800 text-xs font-bold px-2 py-1 rounded-md">
              {products.length}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
              <tr>
                <th className="px-6 py-4">Produk</th>
                <th className="px-6 py-4">Stok</th>
                <th className="px-6 py-4">Harga</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="flex gap-3"><div className="w-12 h-12 bg-gray-200 rounded"></div><div className="space-y-2"><div className="w-32 h-4 bg-gray-200 rounded"></div><div className="w-20 h-3 bg-gray-200 rounded"></div></div></div></td>
                    <td className="px-6 py-4"><div className="w-16 h-6 bg-gray-200 rounded-full"></div></td>
                    <td className="px-6 py-4"><div className="w-24 h-4 bg-gray-200 rounded"></div></td>
                    <td className="px-6 py-4 text-right"><div className="w-16 h-8 bg-gray-200 rounded ml-auto"></div></td>
                  </tr>
                ))
              ) : (
                products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-amber-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg border border-gray-100 bg-gray-50 overflow-hidden flex-shrink-0">
                            <Image
                              width={48}
                              height={48}
                              src={product?.mainImage ? `/${product?.mainImage}` : "/product_placeholder.jpg"}
                              alt={sanitize(product?.title) || "Product image"}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-gray-800">{sanitize(product?.title)}</div>
                            <div className="text-xs text-gray-500">
                              {sanitize(product?.manufacturer)}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        { product?.inStock ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                            In Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                            Out of Stock
                          </span>
                        )}
                      </td>
                      
                      <td className="px-6 py-4 font-medium text-cibaduyut-brown-700">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product?.price)}
                      </td>
                      
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/products/${product.id}`}
                            className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FaEdit />
                          </Link>
                          <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FaBoxOpen className="text-2xl text-gray-400" />
                      </div>
                      <h3 className="text-gray-800 font-medium">Belum ada produk</h3>
                      <p className="text-gray-500 text-sm mb-4">Tambahkan produk pertama Anda</p>
                      <Link 
                        href="/admin/products/new"
                        className="inline-flex items-center gap-2 bg-cibaduyut-gold hover:bg-amber-600 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
                      >
                        <FaPlus /> Tambah Produk
                      </Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardProductTable;
