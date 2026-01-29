"use client";

// *********************
// Role of the component: Component that displays all orders on admin dashboard page
// Name of the component: AdminOrders.tsx
// Version: 2.0 - Cibaduyut Theme
// *********************

import React, { useEffect, useState } from "react";
import Link from "next/link";
import apiClient from "@/lib/api";
import { FaShoppingBag, FaSearch, FaBox, FaClock, FaCheckCircle, FaTimesCircle, FaTruck } from "react-icons/fa";

interface Order {
  id: string;
  name: string;
  country: string;
  status: string;
  total: number;
  dateTime: string;
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/api/orders");
        const data = await response.json();
        setOrders(data?.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusBadge = (status: string) => {
    switch(status.toLowerCase()) {
      case 'delivered':
      case 'completed':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100"><FaCheckCircle /> {status}</span>;
      case 'processing':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"><FaClock /> {status}</span>;
      case 'shipped':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100"><FaTruck /> {status}</span>;
      case 'cancelled':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100"><FaTimesCircle /> {status}</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-100">{status}</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-cibaduyut-brown-800">
            Daftar Pesanan
          </h1>
          <p className="text-cibaduyut-brown-500 mt-1">
            Pantau dan kelola semua pesanan masuk
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Header / Filters */}
        <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-xs w-full">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari ID Pesanan, Nama..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cibaduyut-gold/50 focus:border-cibaduyut-gold"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Total Pesanan:</span>
            <span className="bg-cibaduyut-brown-100 text-cibaduyut-brown-800 text-xs font-bold px-2 py-1 rounded-md">
              {orders.length}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Pelanggan</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded-full w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-8 bg-gray-200 rounded w-16 ml-auto"></div></td>
                  </tr>
                ))
              ) : (
                orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order?.id} className="hover:bg-amber-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs font-medium text-gray-500">#{order?.id.substring(0, 8)}...</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-cibaduyut-brown-100 flex items-center justify-center text-cibaduyut-brown-600">
                            <FaShoppingBag className="text-xs" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">{order?.name}</p>
                            <p className="text-xs text-gray-500">{order?.country}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(order?.status)}
                      </td>
                      <td className="px-6 py-4 font-medium text-cibaduyut-brown-700">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order?.total)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(order?.dateTime).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/admin/orders/${order?.id}`}
                          className="inline-block text-sm font-medium text-amber-600 hover:text-amber-800 hover:bg-amber-50 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Detail
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FaBox className="text-2xl text-gray-400" />
                      </div>
                      <h3 className="text-gray-800 font-medium">Belum ada pesanan</h3>
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

export default AdminOrders;
