"use client";
import apiClient from "@/lib/api";
import { nanoid } from "nanoid";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaUserPlus, FaUserShield, FaSearch, FaUserTag, FaEnvelope } from "react-icons/fa";

interface User {
  id: string;
  email: string;
  role: string;
}

const DashboardUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiClient.get("/api/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-cibaduyut-brown-800">
              Manajemen Pengguna
            </h1>
            <p className="text-cibaduyut-brown-500 mt-1">
              Kelola data pengguna dan hak akses
            </p>
          </div>
          
          <Link 
            href="/admin/users/new"
            className="inline-flex items-center gap-2 bg-cibaduyut-gold hover:bg-amber-600 text-white font-medium px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md"
          >
            <FaUserPlus /> Tambah User Baru
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Table Header / Filters */}
          <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative max-w-xs w-full">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Cari pengguna..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cibaduyut-gold/50 focus:border-cibaduyut-gold"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Total User:</span>
              <span className="bg-cibaduyut-brown-100 text-cibaduyut-brown-800 text-xs font-bold px-2 py-1 rounded-md">
                {users?.length || 0}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-4"><div className="h-10 bg-gray-200 rounded-full w-48"></div></td>
                      <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded w-20"></div></td>
                      <td className="px-6 py-4 text-right"><div className="h-8 bg-gray-200 rounded w-16 ml-auto"></div></td>
                    </tr>
                  ))
                ) : (
                  users && users.map((user) => (
                    <tr key={nanoid()} className="hover:bg-amber-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cibaduyut-brown-100 to-amber-100 flex items-center justify-center text-cibaduyut-brown-600">
                            <FaUserTag />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{user.email.split('@')[0]}</p>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <FaEnvelope className="text-gray-400" />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                          user.role === 'admin' 
                            ? 'bg-purple-50 text-purple-700 border-purple-100' 
                            : 'bg-blue-50 text-blue-700 border-blue-100'
                        }`}>
                          {user.role === 'admin' ? <FaUserShield className="text-[10px]" /> : <FaUserTag className="text-[10px]" />}
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/admin/users/${user?.id}`}
                          className="inline-block text-sm font-medium text-amber-600 hover:text-amber-800 hover:bg-amber-50 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Detail
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {!loading && users.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaUserTag className="text-2xl text-gray-400" />
              </div>
              <h3 className="text-gray-800 font-medium">Belum ada user</h3>
              <p className="text-gray-500 text-sm">Data user akan muncul di sini</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardUsers;
