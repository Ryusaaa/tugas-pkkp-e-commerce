"use client";
import { formatCategoryName } from "@/utils/categoryFormating";
import apiClient from "@/lib/api";
import { nanoid } from "nanoid";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaLayerGroup, FaPlus, FaSearch, FaEllipsisH, FaFolder } from "react-icons/fa";

interface Category {
  id: string;
  name: string;
}

const DashboardCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiClient.get("/api/categories")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-cibaduyut-brown-800">
              Kategori Produk
            </h1>
            <p className="text-cibaduyut-brown-500 mt-1">
              Kelola kategori untuk mengorganisir produk
            </p>
          </div>
          
          <Link 
            href="/admin/categories/new"
            className="inline-flex items-center gap-2 bg-cibaduyut-gold hover:bg-amber-600 text-white font-medium px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md"
          >
            <FaPlus /> Tambah Kategori
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h3 className="font-bold text-gray-700">Daftar Kategori</h3>
                <span className="text-xs font-medium bg-gray-200 text-gray-600 px-2 py-1 rounded">
                  {categories.length} Items
                </span>
              </div>

              <div className="divide-y divide-gray-100">
                {loading ? (
                  Array(5).fill(0).map((_, i) => (
                    <div key={i} className="p-4 animate-pulse flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                        <div className="w-32 h-4 bg-gray-200 rounded"></div>
                      </div>
                      <div className="w-8 h-8 bg-gray-200 rounded"></div>
                    </div>
                  ))
                ) : (
                  categories && categories.map((category) => (
                    <div key={nanoid()} className="p-4 hover:bg-amber-50/30 transition-colors flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-cibaduyut-brown-50 flex items-center justify-center text-cibaduyut-brown-500 group-hover:bg-cibaduyut-gold group-hover:text-white transition-colors">
                          <FaLayerGroup />
                        </div>
                        <p className="font-medium text-gray-800">{formatCategoryName(category?.name)}</p>
                      </div>
                      
                      <Link
                        href={`/admin/categories/${category?.id}`}
                        className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      >
                        <FaEllipsisH />
                      </Link>
                    </div>
                  ))
                )}
                
                {!loading && categories.length === 0 && (
                   <div className="p-8 text-center text-gray-500">
                     Belum ada kategori
                   </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats or Info */}
          <div className="bg-gradient-to-br from-cibaduyut-brown-800 to-cibaduyut-brown-900 rounded-2xl p-6 text-white h-fit">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
              <FaFolder className="text-2xl text-cibaduyut-gold" />
            </div>
            <h3 className="text-xl font-bold mb-2">Struktur Kategori</h3>
            <p className="text-cibaduyut-brown-100 text-sm mb-6">
              Kategori membantu pelanggan menemukan produk dengan lebih mudah. Pastikan nama kategori jelas dan spesifik.
            </p>
            
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-medium text-cibaduyut-gold text-sm mb-2">Tips:</h4>
              <ul className="text-xs text-cibaduyut-brown-100 space-y-2 list-disc list-inside">
                <li>Gunakan nama yang umum dikenal</li>
                <li>Hindari duplikasi kategori</li>
                <li>Kelompokkan produk sejenis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCategory;
