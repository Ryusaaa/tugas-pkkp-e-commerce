"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import apiClient from "@/lib/api";
import { toast } from "react-hot-toast";
import { FaStore, FaPlus, FaSearch, FaEnvelope, FaBox, FaEdit, FaEye } from "react-icons/fa";

interface Merchant {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  description: string | null;
  status: string;
  products: any[];
}

export default function MerchantPage() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMerchants = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/api/merchants");
      if (!response.ok) {
        throw new Error("Failed to fetch merchants");
      }
      const data = await response.json();
      setMerchants(data);
    } catch (error) {
      console.error("Error fetching merchants:", error);
      toast.error("Gagal memuat data merchant");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMerchants();
  }, []);

  return (
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-cibaduyut-brown-800">
              Mitra Merchant
            </h1>
            <p className="text-cibaduyut-brown-500 mt-1">
              Kelola data toko dan mitra merchant
            </p>
          </div>
          
          <Link
            href="/admin/merchant/new"
            className="inline-flex items-center gap-2 bg-cibaduyut-gold hover:bg-amber-600 text-white font-medium px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md"
          >
            <FaPlus /> Tambah Merchant
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Table Header / Filters */}
          <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative max-w-xs w-full">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Cari merchant..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cibaduyut-gold/50 focus:border-cibaduyut-gold"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Total Merchant:</span>
              <span className="bg-cibaduyut-brown-100 text-cibaduyut-brown-800 text-xs font-bold px-2 py-1 rounded-md">
                {merchants.length}
              </span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
                <tr>
                  <th className="px-6 py-4">Merchant</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Produk</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-4"><div className="flex gap-3"><div className="w-10 h-10 bg-gray-200 rounded"></div><div className="space-y-2"><div className="w-32 h-4 bg-gray-200 rounded"></div><div className="w-24 h-3 bg-gray-200 rounded"></div></div></div></td>
                      <td className="px-6 py-4"><div className="w-16 h-6 bg-gray-200 rounded-full"></div></td>
                      <td className="px-6 py-4"><div className="w-8 h-4 bg-gray-200 rounded"></div></td>
                      <td className="px-6 py-4 text-right"><div className="w-16 h-8 bg-gray-200 rounded ml-auto"></div></td>
                    </tr>
                  ))
                ) : (
                  merchants.length > 0 ? (
                    merchants.map((merchant) => (
                      <tr key={merchant.id} className="hover:bg-amber-50/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-cibaduyut-brown-100 flex items-center justify-center text-cibaduyut-brown-600">
                              <FaStore />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{merchant.name}</p>
                              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <FaEnvelope className="text-gray-400" />
                                {merchant.email || "N/A"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                              merchant.status === "ACTIVE"
                                ? "bg-green-50 text-green-700 border-green-100"
                                : "bg-red-50 text-red-700 border-red-100"
                            }`}
                          >
                            {merchant.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <FaBox className="text-gray-400" />
                            <span>{merchant.products.length}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/merchant/${merchant.id}`}
                              className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                              title="Lihat Detail"
                            >
                              <FaEye />
                            </Link>
                            <Link
                              href={`/admin/merchant/${merchant.id}/edit`}
                              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <FaEdit />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <FaStore className="text-2xl text-gray-400" />
                        </div>
                        <h3 className="text-gray-800 font-medium">Belum ada merchant</h3>
                        <p className="text-gray-500 text-sm">Data merchant akan muncul di sini</p>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}