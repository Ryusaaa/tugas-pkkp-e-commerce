"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api";
import { toast } from "react-hot-toast";
import { FaArrowLeft, FaStore, FaSave } from "react-icons/fa";

export default function NewMerchantPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    status: "ACTIVE",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Nama merchant wajib diisi");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await apiClient.post("/api/merchants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create merchant");
      }

      const data = await response.json();
      toast.success("Merchant berhasil dibuat");
      router.push(`/admin/merchant/${data.id}`);
    } catch (error) {
      console.error("Error creating merchant:", error);
      toast.error("Gagal membuat merchant");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              href="/admin/merchant"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-cibaduyut-brown-600 hover:border-cibaduyut-gold transition-all"
            >
              <FaArrowLeft />
            </Link>
            <div>
              <h1 className="font-display text-2xl font-bold text-cibaduyut-brown-800">
                Tambah Merchant
              </h1>
              <p className="text-sm text-cibaduyut-brown-500">
                Daftarkan mitra atau toko baru
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8">
             <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                <div className="w-10 h-10 rounded-lg bg-cibaduyut-brown-100 text-cibaduyut-brown-600 flex items-center justify-center">
                   <FaStore />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Data Merchant</h2>
             </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">Nama Merchant <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="input input-bordered w-full focus:ring-2 focus:ring-cibaduyut-gold/50 focus:border-cibaduyut-gold"
                    placeholder="Contoh: Toko Kulit Sejahtera"
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">Email</span>
                  </label>
                  <input
                     type="email"
                     name="email"
                     value={formData.email}
                     onChange={handleInputChange}
                     className="input input-bordered w-full focus:ring-2 focus:ring-cibaduyut-gold/50 focus:border-cibaduyut-gold"
                     placeholder="email@toko.com"
                  />
                </div>
                
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">No. Telepon</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input input-bordered w-full focus:ring-2 focus:ring-cibaduyut-gold/50 focus:border-cibaduyut-gold"
                    placeholder="0812..."
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">Status</span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="select select-bordered w-full focus:ring-2 focus:ring-cibaduyut-gold/50 focus:border-cibaduyut-gold"
                  >
                    <option value="ACTIVE">Aktif (Active)</option>
                    <option value="INACTIVE">Non-Aktif (Inactive)</option>
                  </select>
                </div>
              </div>

              <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">Alamat Lengkap</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="input input-bordered w-full focus:ring-2 focus:ring-cibaduyut-gold/50 focus:border-cibaduyut-gold"
                    placeholder="Jl. Cibaduyut Raya No..."
                  />
              </div>

              <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">Deskripsi Toko</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered h-32 focus:ring-2 focus:ring-cibaduyut-gold/50 focus:border-cibaduyut-gold"
                    placeholder="Deskripsi singkat tentang merchant ini..."
                  ></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t">
                  <Link 
                    href="/admin/merchant"
                    className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </Link>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`px-8 py-2.5 rounded-xl bg-cibaduyut-gold hover:bg-amber-600 text-white font-bold shadow-sm transition-all flex items-center gap-2 ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:shadow-md"
                    }`}
                  >
                    {isSubmitting ? "Menyimpan..." : (
                       <><FaSave /> Simpan Merchant</>
                    )}
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}