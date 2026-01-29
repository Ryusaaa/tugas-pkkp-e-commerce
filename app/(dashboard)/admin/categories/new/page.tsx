"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { convertCategoryNameToURLFriendly } from "@/utils/categoryFormating";
import apiClient from "@/lib/api";
import Link from "next/link";
import { FaArrowLeft, FaLayerGroup, FaPlus } from "react-icons/fa";

const DashboardNewCategoryPage = () => {
  const [categoryInput, setCategoryInput] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const addNewCategory = async () => {
    if (categoryInput.name.length > 0) {
      setLoading(true);
      try {
        const response = await apiClient.post(`/api/categories`, {
          name: convertCategoryNameToURLFriendly(categoryInput.name),
        });

        if (response.status === 201) {
          await response.json();
          toast.success("Kategori berhasil ditambahkan!");
          setCategoryInput({
            name: "",
          });
        } else {
          const errorData = await response.json();
          toast.error(
            errorData.error || "Gagal membuat kategori"
          );
        }
      } catch (error) {
        console.error("Error creating category:", error);
        toast.error("Terjadi kesalahan jaringan");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Nama kategori tidak boleh kosong");
    }
  };

  return (
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-xl mx-auto">
         {/* Header */}
         <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              href="/admin/categories"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-cibaduyut-brown-600 hover:border-cibaduyut-gold transition-all"
            >
              <FaArrowLeft />
            </Link>
            <div>
              <h1 className="font-display text-2xl font-bold text-cibaduyut-brown-800">
                Tambah Kategori
              </h1>
              <p className="text-sm text-cibaduyut-brown-500">
                Buat kategori produk baru
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-leather p-8">
          <div className="w-16 h-16 bg-cibaduyut-brown-50 rounded-full flex items-center justify-center mx-auto mb-6 text-cibaduyut-brown-600">
            <FaLayerGroup className="text-3xl" />
          </div>
          
          <div className="space-y-6">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Nama Kategori</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Sepatu Formal"
                className="input input-bordered w-full h-12 focus:ring-2 focus:ring-cibaduyut-gold/50 focus:border-cibaduyut-gold"
                value={categoryInput.name}
                onChange={(e) =>
                  setCategoryInput({ ...categoryInput, name: e.target.value })
                }
              />
              <label className="label">
                 <span className="label-text-alt text-gray-400">Slug akan digenerate otomatis: {convertCategoryNameToURLFriendly(categoryInput.name)}</span>
              </label>
            </div>

            <div className="pt-2">
              <button
                type="button"
                className={`w-full py-3.5 rounded-xl font-bold text-white shadow-md transition-all flex items-center justify-center gap-2 ${
                  loading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-cibaduyut-gold hover:bg-amber-600 hover:shadow-lg hover:-translate-y-0.5"
                }`}
                onClick={addNewCategory}
                disabled={loading}
              >
                {loading ? "Menyimpan..." : (
                  <><FaPlus /> Buat Kategori</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNewCategoryPage;
