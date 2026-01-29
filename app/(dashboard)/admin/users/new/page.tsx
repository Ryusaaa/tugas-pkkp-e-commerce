"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { sanitizeFormData } from "@/lib/form-sanitize";
import { isValidEmailAddressFormat } from "@/lib/utils";
import apiClient from "@/lib/api";
import Link from "next/link";
import { FaArrowLeft, FaUserPlus, FaUserShield } from "react-icons/fa";

const DashboardCreateNewUser = () => {
  const [userInput, setUserInput] = useState<{
    email: string;
    password: string;
    role: string;
  }>({
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);

  const addNewUser = async () => {
    if (userInput.email === "" || userInput.password === "") {
      toast.error("Email dan password harus diisi");
      return;
    }

    if (!isValidEmailAddressFormat(userInput.email)) {
      toast.error("Format email tidak valid");
      return;
    }

    if (userInput.password.length < 8) {
      toast.error("Password minimal 8 karakter");
      return;
    }

    setLoading(true);
    
    // Sanitize form data before sending to API
    const sanitizedUserInput = sanitizeFormData(userInput);

    try {
        const response = await apiClient.post(`/api/users`, sanitizedUserInput );

        if(response.status === 201){
           toast.success("User berhasil ditambahkan");
           setUserInput({
             email: "",
             password: "",
             role: "user",
           });
        } else {
           const data = await response.json();
           throw new Error(data.message || "Gagal membuat user");
        }
    } catch (error: any) {
        console.error(error);
        toast.error(error.message || "Terjadi kesalahan saat membuat user");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              href="/admin/users"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-cibaduyut-brown-600 hover:border-cibaduyut-gold transition-all"
            >
              <FaArrowLeft />
            </Link>
            <div>
              <h1 className="font-display text-2xl font-bold text-cibaduyut-brown-800">
                Tambah User
              </h1>
              <p className="text-sm text-cibaduyut-brown-500">
                Registrasi pengguna baru manual
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-leather p-8">
          <div className="w-16 h-16 bg-cibaduyut-brown-50 rounded-full flex items-center justify-center mx-auto mb-6 text-cibaduyut-brown-600">
            <FaUserPlus className="text-3xl" />
          </div>

          <div className="space-y-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Email Address</span>
              </label>
              <input
                type="email"
                placeholder="user@example.com"
                className="input input-bordered w-full h-12 focus:ring-2 focus:ring-cibaduyut-gold/50 focus:border-cibaduyut-gold"
                value={userInput.email}
                onChange={(e) =>
                  setUserInput({ ...userInput, email: e.target.value })
                }
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Password</span>
              </label>
              <input
                type="password"
                placeholder="Minimal 8 karakter"
                className="input input-bordered w-full h-12 focus:ring-2 focus:ring-cibaduyut-gold/50 focus:border-cibaduyut-gold"
                value={userInput.password}
                onChange={(e) =>
                  setUserInput({ ...userInput, password: e.target.value })
                }
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Role / Hak Akses</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                 <button 
                    type="button"
                    onClick={() => setUserInput({...userInput, role: 'user'})}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${userInput.role === 'user' ? 'border-cibaduyut-gold bg-amber-50 text-cibaduyut-brown-800' : 'border-gray-200 hover:border-gray-300'}`}
                 >
                    <span className="text-sm font-semibold">User</span>
                 </button>
                 <button 
                    type="button"
                    onClick={() => setUserInput({...userInput, role: 'admin'})}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${userInput.role === 'admin' ? 'border-cibaduyut-gold bg-amber-50 text-cibaduyut-brown-800' : 'border-gray-200 hover:border-gray-300'}`}
                 >
                    <FaUserShield />
                    <span className="text-sm font-semibold">Admin</span>
                 </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                disabled={loading}
                className={`w-full py-3.5 rounded-xl font-bold text-white shadow-md transition-all flex items-center justify-center gap-2 ${
                  loading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-cibaduyut-gold hover:bg-amber-600 hover:shadow-lg hover:-translate-y-0.5"
                }`}
                onClick={addNewUser}
              >
                {loading ? "Memproses..." : (
                  <><FaUserPlus /> Buat User Baru</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCreateNewUser;
