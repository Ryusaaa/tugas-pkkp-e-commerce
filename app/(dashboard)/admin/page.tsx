"use client";
import { StatsElement } from "@/components";
import React from "react";
import { FaArrowUp, FaCalendarAlt, FaChartLine, FaBoxOpen, FaUsers } from "react-icons/fa";

const AdminDashboardPage = () => {
  return (
    <div className="p-6 lg:p-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-cibaduyut-brown-800">
              Dashboard Overview
            </h1>
            <p className="text-cibaduyut-brown-500 mt-1">
              Selamat datang di panel admin Cibaduyut Authentic Leather
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-cibaduyut-brown-500 bg-white px-4 py-2 rounded-lg shadow-sm">
            <FaCalendarAlt className="text-cibaduyut-gold" />
            <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <StatsElement 
          title="Total Produk" 
          value="1,234" 
          change={12.5} 
          icon="products" 
        />
        <StatsElement 
          title="Total Pengguna" 
          value="5,678" 
          change={8.2} 
          icon="users" 
        />
        <StatsElement 
          title="Pesanan Bulan Ini" 
          value="892" 
          change={-2.4} 
          icon="orders" 
        />
        <StatsElement 
          title="Pendapatan" 
          value="Rp 125M" 
          change={15.8} 
          icon="revenue" 
        />
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Visitors Chart Card */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-leather p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-lg font-semibold text-cibaduyut-brown-800">
                Pengunjung Hari Ini
              </h2>
              <p className="text-sm text-cibaduyut-brown-400 mt-1">
                Statistik kunjungan website
              </p>
            </div>
            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-full text-sm font-medium">
              <FaArrowUp className="text-xs" />
              <span>12.5%</span>
            </div>
          </div>
          
          {/* Visitors Display */}
          <div className="text-center py-12 bg-gradient-to-br from-cibaduyut-brown-600 to-cibaduyut-brown-700 rounded-xl">
            <p className="text-cibaduyut-gold/80 text-lg mb-2">Total Pengunjung</p>
            <p className="text-5xl font-bold text-white mb-2">1,234</p>
            <p className="text-white/70 text-sm">Sejak pagi ini</p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { label: 'Page Views', value: '3,456' },
              { label: 'Bounce Rate', value: '32%' },
              { label: 'Avg. Duration', value: '4m 23s' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-4 bg-cibaduyut-brown-50 rounded-xl">
                <p className="text-xs text-cibaduyut-brown-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-xl font-bold text-cibaduyut-brown-700 mt-1">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white rounded-2xl shadow-leather p-6">
          <h2 className="font-display text-lg font-semibold text-cibaduyut-brown-800 mb-4">
            Aktivitas Terbaru
          </h2>
          
          <div className="space-y-4">
            {[
              { icon: FaBoxOpen, text: 'Produk baru ditambahkan', time: '5 menit lalu', color: 'bg-cibaduyut-gold' },
              { icon: FaUsers, text: 'Pengguna baru mendaftar', time: '12 menit lalu', color: 'bg-cibaduyut-brown-500' },
              { icon: FaChartLine, text: 'Order #1234 selesai', time: '1 jam lalu', color: 'bg-green-500' },
              { icon: FaBoxOpen, text: 'Stok diperbarui', time: '2 jam lalu', color: 'bg-cibaduyut-brown-400' },
              { icon: FaUsers, text: 'Review baru diterima', time: '3 jam lalu', color: 'bg-cibaduyut-gold' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-cibaduyut-brown-50 transition-colors">
                <div className={`w-8 h-8 ${activity.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <activity.icon className="text-white text-xs" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-cibaduyut-brown-700 font-medium truncate">
                    {activity.text}
                  </p>
                  <p className="text-xs text-cibaduyut-brown-400 mt-0.5">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 py-2.5 text-sm font-medium text-cibaduyut-brown-600 hover:text-cibaduyut-brown-700 hover:bg-cibaduyut-brown-50 rounded-lg transition-colors">
            Lihat Semua Aktivitas
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-white rounded-2xl shadow-leather p-6">
        <h2 className="font-display text-lg font-semibold text-cibaduyut-brown-800 mb-4">
          Aksi Cepat
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Tambah Produk', href: '/admin/products/new', icon: '📦' },
            { label: 'Kelola Order', href: '/admin/orders', icon: '🛒' },
            { label: 'Upload Bulk', href: '/admin/bulk-upload', icon: '📤' },
            { label: 'Pengaturan', href: '/admin/settings', icon: '⚙️' },
          ].map((action, idx) => (
            <a 
              key={idx}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-cibaduyut-brown-100 hover:border-cibaduyut-gold hover:bg-cibaduyut-brown-50 transition-all duration-200"
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-sm font-medium text-cibaduyut-brown-700">{action.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
