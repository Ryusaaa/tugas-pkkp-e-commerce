"use client";
import apiClient from "@/lib/api";
import { convertCategoryNameToURLFriendly as convertSlugToURLFriendly } from "@/utils/categoryFormating";
import { sanitizeFormData } from "@/lib/form-sanitize";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBox, FaImage, FaSave, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const AddNewProduct = () => {
  const [product, setProduct] = useState<{
    merchantId?: string;
    title: string;
    price: number;
    manufacturer: string;
    inStock: number;
    mainImage: string;
    description: string;
    slug: string;
    categoryId: string;
  }>({
    merchantId: "",
    title: "",
    price: 0,
    manufacturer: "",
    inStock: 1,
    mainImage: "",
    description: "",
    slug: "",
    categoryId: "",
  });
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(false);

  const addProduct = async () => {
    if (
      !product.merchantId ||
      product.title === "" ||
      product.manufacturer === "" ||
      product.description == "" ||
      product.slug === ""
    ) {
      toast.error("Mohon lengkapi semua field yang wajib diisi");
      return;
    }

    setLoading(true);
    try {
      const sanitizedProduct = sanitizeFormData(product);
      const response = await apiClient.post(`/api/products`, sanitizedProduct);

      if (response.status === 201) {
        toast.success("Produk berhasil ditambahkan!");
        setProduct({
          merchantId: merchants[0]?.id || "",
          title: "",
          price: 0,
          manufacturer: "",
          inStock: 1,
          mainImage: "",
          description: "",
          slug: "",
          categoryId: categories[0]?.id || "",
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Gagal menambahkan produk");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Terjadi kesalahan jaringan");
    } finally {
      setLoading(false);
    }
  };

  const fetchMerchants = async () => {
    try {
      const res = await apiClient.get("/api/merchants");
      const data: Merchant[] = await res.json();
      setMerchants(data || []);
      setProduct((prev) => ({
        ...prev,
        merchantId: prev.merchantId || data?.[0]?.id || "",
      }));
    } catch (e) {
      toast.error("Gagal memuat data merchant");
    }
  };

  const uploadFile = async (file: any) => {
    const formData = new FormData();
    formData.append("uploadedFile", file);

    try {
      const response = await apiClient.post("/api/main-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Gambar berhasil diupload");
      } else {
        toast.error("Gagal mengupload gambar");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Terjadi kesalahan saat upload gambar");
    }
  };

  const fetchCategories = async () => {
    apiClient
      .get(`/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setProduct((prev) => ({
          ...prev,
          categoryId: data[0]?.id || "",
        }));
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchMerchants();
  }, []);

  return (
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              href="/admin/products"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-cibaduyut-brown-600 hover:border-cibaduyut-gold transition-all"
            >
              <FaArrowLeft />
            </Link>
            <div>
              <h1 className="font-display text-2xl font-bold text-cibaduyut-brown-800">
                Tambah Produk
              </h1>
              <p className="text-sm text-cibaduyut-brown-500">
                Lengkapi informasi produk baru
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 space-y-8">
            {/* Section: Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-full">
                <h3 className="font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-cibaduyut-brown-100 text-cibaduyut-brown-600 flex items-center justify-center text-xs">1</span>
                  Informasi Dasar
                </h3>
              </div>

              {/* Merchant Selection */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Merchant / Penjual</span>
                </label>
                <select
                  className="select select-bordered w-full focus:ring-2 focus:ring-cibaduyut-gold/50 focus:border-cibaduyut-gold"
                  value={product?.merchantId}
                  onChange={(e) => setProduct({ ...product, merchantId: e.target.value })}
                >
                  {merchants.map((merchant) => (
                    <option key={merchant.id} value={merchant.id}>
                      {merchant.name}
                    </option>
                  ))}
                </select>
                {merchants.length === 0 && (
                  <span className="text-xs text-red-500 mt-1">
                    Mohon buat data merchant terlebih dahulu.
                  </span>
                )}
              </div>

              {/* Category */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Kategori</span>
                </label>
                <select
                  className="select select-bordered w-full focus:ring-2 focus:ring-cibaduyut-gold/50 focus:border-cibaduyut-gold"
                  value={product?.categoryId}
                  onChange={(e) => setProduct({ ...product, categoryId: e.target.value })}
                >
                  {categories.map((category: any) => (
                    <option key={category?.id} value={category?.id}>
                      {category?.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Name */}
              <div className="form-control w-full col-span-full">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Nama Produk</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Sepatu Kulit Formal Pria - Hitam"
                  className="input input-bordered w-full focus:ring-2 focus:ring-cibaduyut-gold/50 focus:border-cibaduyut-gold"
                  value={product?.title}
                  onChange={(e) => setProduct({ ...product, title: e.target.value })}
                />
              </div>

              {/* Slug */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Slug URL</span>
                </label>
                <input
                  type="text"
                  placeholder="sepatu-kulit-formal-pria"
                  className="input input-bordered w-full bg-gray-50 focus:ring-2 focus:ring-cibaduyut-gold/50 focus:border-cibaduyut-gold"
                  value={convertSlugToURLFriendly(product?.slug)}
                  onChange={(e) => setProduct({ ...product, slug: convertSlugToURLFriendly(e.target.value) })}
                />
                <label className="label">
                  <span className="label-text-alt text-gray-400">Otomatis diformat untuk URL</span>
                </label>
              </div>

              {/* Manufacturer */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Merk / Brand</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Prabu Leather"
                  className="input input-bordered w-full focus:ring-2 focus:ring-cibaduyut-gold/50 focus:border-cibaduyut-gold"
                  value={product?.manufacturer}
                  onChange={(e) => setProduct({ ...product, manufacturer: e.target.value })}
                />
              </div>
            </div>

            {/* Section: Pricing & Inventory */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="col-span-full">
                <h3 className="font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-cibaduyut-brown-100 text-cibaduyut-brown-600 flex items-center justify-center text-xs">2</span>
                  Harga & Stok
                </h3>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Harga (Rp)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">Rp</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-cibaduyut-gold/50 focus:border-cibaduyut-gold"
                    value={product?.price}
                    onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Status Stok</span>
                </label>
                <select
                  className="select select-bordered w-full focus:ring-2 focus:ring-cibaduyut-gold/50 focus:border-cibaduyut-gold"
                  value={product?.inStock}
                  onChange={(e) => setProduct({ ...product, inStock: Number(e.target.value) })}
                >
                  <option value={1}>Tersedia (In Stock)</option>
                  <option value={0}>Habis (Out of Stock)</option>
                </select>
              </div>
            </div>

            {/* Section: Image & Description */}
            <div className="grid grid-cols-1 gap-6 pt-4">
              <div className="col-span-full">
                <h3 className="font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-cibaduyut-brown-100 text-cibaduyut-brown-600 flex items-center justify-center text-xs">3</span>
                  Media & Detail
                </h3>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Foto Utama Produk</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-cibaduyut-gold transition-colors bg-gray-50">
                  <input
                    type="file"
                    className="hidden"
                    id="product-image"
                    onChange={(e: any) => {
                      if (e.target.files && e.target.files[0]) {
                        uploadFile(e.target.files[0]);
                        setProduct({ ...product, mainImage: e.target.files[0].name });
                      }
                    }}
                  />
                  <label htmlFor="product-image" className="cursor-pointer flex flex-col items-center gap-3">
                     {product?.mainImage ? (
                        <div className="relative w-48 h-48 rounded-lg overflow-hidden shadow-md">
                          <Image
                            src={`/` + product?.mainImage}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <span className="text-white text-sm font-medium">Ganti Foto</span>
                          </div>
                        </div>
                     ) : (
                        <>
                          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-2">
                            <FaImage className="text-2xl" />
                          </div>
                          <span className="text-sm font-medium text-blue-600 hover:underline">Klik untuk upload foto</span>
                          <span className="text-xs text-gray-500">Format: JPG, PNG (Max 2MB)</span>
                        </>
                     )}
                  </label>
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Deskripsi Lengkap</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-40 focus:ring-2 focus:ring-cibaduyut-gold/50 focus:border-cibaduyut-gold"
                  placeholder="Jelaskan detail produk, bahan, ukuran, dan keunggulan..."
                  value={product?.description}
                  onChange={(e) => setProduct({ ...product, description: e.target.value })}
                ></textarea>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 flex justify-end gap-3 border-t">
              <Link 
                href="/admin/products"
                className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
              >
                Batal
              </Link>
              <button
                onClick={addProduct}
                disabled={loading}
                className={`px-8 py-2.5 rounded-xl bg-cibaduyut-gold hover:bg-amber-600 text-white font-bold shadow-sm transition-all flex items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md'}`}
              >
                {loading ? (
                  <>Menyimpan...</>
                ) : (
                  <>
                    <FaSave /> Simpan Produk
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
