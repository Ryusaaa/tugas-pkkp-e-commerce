// *********************
// Role of the component: Bulk upload products page for admin dashboard
// Name of the component: BulkUpload.tsx
// Developer: Aleksandar Kuzmanovic (modified)
// Version: 2.0 - Cibaduyut Theme
// *********************

"use client";
import BulkUploadHistory from "@/components/BulkUploadHistory";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import {
  FaFileUpload,
  FaDownload,
  FaCheckCircle,
  FaTimesCircle,
  FaCloudUploadAlt,
  FaFileCsv
} from "react-icons/fa";

interface UploadResult {
  success: boolean;
  message: string;
  details?: {
    processed: number;
    successful: number;
    failed: number;
    errors?: string[];
  };
}

const BulkUploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (
        droppedFile.type === "text/csv" ||
        droppedFile.name.endsWith(".csv")
      ) {
        setFile(droppedFile);
        setUploadResult(null);
      } else {
        toast.error("Mohon upload file CSV");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (
        selectedFile.type === "text/csv" ||
        selectedFile.name.endsWith(".csv")
      ) {
        setFile(selectedFile);
        setUploadResult(null);
      } else {
        toast.error("Mohon upload file CSV");
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Pilih file CSV terlebih dahulu");
      return;
    }

    setUploading(true);
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:3001/api/bulk-upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadResult({
          success: true,
          message: data.message || "Produk berhasil diupload!",
          details: data.details,
        });
        toast.success("Bulk upload selesai!");
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        setUploadResult({
          success: false,
          message: data.error || "Upload gagal",
          details: data.details,
        });
        toast.error(data.error || "Upload gagal");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadResult({
        success: false,
        message: "Terjadi kesalahan jaringan",
      });
      toast.error("Terjadi kesalahan jaringan");
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    const csvContent = `title,price,manufacturer,inStock,mainImage,description,slug,categoryId
Sepatu Kulit Formal Pria,750000,Cibaduyut Authentic,50,https://example.com/sepatu.jpg,Sepatu kulit asli kualitas premium,sepatu-kulit-formal,category-uuid
Sandal Kulit Wanita,250000,Cibaduyut Authentic,30,https://example.com/sandal.jpg,Sandal santai bahan kulit asli,sandal-kulit-wanita,category-uuid`;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "template-produk-cibaduyut.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success("Template berhasil didownload!");
  };

  return (
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-cibaduyut-brown-800">
              Bulk Upload Produk
            </h1>
            <p className="text-cibaduyut-brown-500 mt-1">
              Upload banyak produk sekaligus menggunakan file CSV
            </p>
          </div>
          
          <button
            onClick={downloadTemplate}
            className="flex items-center gap-2 bg-white text-cibaduyut-brown-600 border border-cibaduyut-brown-200 hover:bg-cibaduyut-brown-50 hover:border-cibaduyut-gold px-4 py-2 rounded-lg transition-all shadow-sm font-medium text-sm"
          >
            <FaDownload /> Download Template CSV
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Upload Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Box */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div
                className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300 ${
                  dragActive
                    ? "border-cibaduyut-gold bg-amber-50 shadow-leather"
                    : "border-gray-200 bg-gray-50 hover:border-cibaduyut-brown-300 hover:bg-white"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="w-16 h-16 bg-cibaduyut-brown-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCloudUploadAlt className="text-3xl text-cibaduyut-brown-600" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {file ? "File Terpilih" : "Upload File CSV"}
                </h3>
                
                <p className="text-gray-500 mb-6 text-sm">
                  {file ? (
                    <span className="font-medium text-cibaduyut-brown-600 flex items-center justify-center gap-2">
                      <FaFileCsv className="text-green-600" />
                      {file.name} ({(file.size / 1024).toFixed(2)} KB)
                    </span>
                  ) : (
                    "Drag & drop file CSV di sini, atau klik tombol di bawah"
                  )}
                </p>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center gap-2 bg-cibaduyut-brown-600 hover:bg-cibaduyut-brown-700 text-white font-medium py-2.5 px-6 rounded-lg cursor-pointer transition-colors"
                >
                  <FaFileUpload /> {file ? "Ganti File" : "Pilih File"}
                </label>
              </div>

              {/* Upload Action */}
              {file && (
                <div className="mt-6">
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className={`w-full py-3.5 px-6 rounded-xl font-bold text-white text-lg transition-all shadow-md ${
                      uploading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-cibaduyut-gold to-amber-500 hover:shadow-lg hover:translate-y-[-2px]"
                    }`}
                  >
                    {uploading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Mengupload...
                      </span>
                    ) : (
                      "Proses Upload"
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Upload Result */}
            {uploadResult && (
              <div
                className={`border rounded-xl p-6 shadow-sm ${
                  uploadResult.success
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-full ${
                    uploadResult.success ? "bg-green-100" : "bg-red-100"
                  }`}>
                    {uploadResult.success ? (
                      <FaCheckCircle className="text-xl text-green-600" />
                    ) : (
                      <FaTimesCircle className="text-xl text-red-600" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold mb-1 ${
                      uploadResult.success ? "text-green-800" : "text-red-800"
                    }`}>
                      {uploadResult.success ? "Upload Berhasil" : "Upload Gagal"}
                    </h3>
                    <p className={`text-sm mb-4 ${
                      uploadResult.success ? "text-green-700" : "text-red-700"
                    }`}>
                      {uploadResult.message}
                    </p>

                    {uploadResult.details && (
                      <div className="bg-white/80 rounded-lg p-4 backdrop-blur-sm">
                        <p className="font-semibold text-gray-700 mb-3 text-sm border-b pb-2">Detail Proses:</p>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center p-2 bg-blue-50 rounded-lg">
                            <p className="text-xl font-bold text-blue-600">
                              {uploadResult.details.processed}
                            </p>
                            <p className="text-xs text-blue-600/70 uppercase font-medium">Diproses</p>
                          </div>
                          <div className="text-center p-2 bg-green-50 rounded-lg">
                            <p className="text-xl font-bold text-green-600">
                              {uploadResult.details.successful}
                            </p>
                            <p className="text-xs text-green-600/70 uppercase font-medium">Berhasil</p>
                          </div>
                          <div className="text-center p-2 bg-red-50 rounded-lg">
                            <p className="text-xl font-bold text-red-600">
                              {uploadResult.details.failed}
                            </p>
                            <p className="text-xs text-red-600/70 uppercase font-medium">Gagal</p>
                          </div>
                        </div>

                        {uploadResult.details.errors && uploadResult.details.errors.length > 0 && (
                          <div className="mt-2">
                            <p className="font-semibold text-red-700 mb-2 text-xs uppercase">
                              Daftar Error:
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-xs text-red-600 max-h-32 overflow-y-auto bg-red-50 p-2 rounded border border-red-100">
                              {uploadResult.details.errors.map((error, index) => (
                                <li key={index}>{error}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-8">
              <h3 className="font-bold text-gray-800 mb-4">Riwayat Upload Terakhir</h3>
              <BulkUploadHistory />
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-cibaduyut-brown-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-sm">📋</span>
                Instruksi
              </h2>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="min-w-[20px] h-5 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">1</span>
                  Download template CSV yang disediakan.
                </li>
                <li className="flex gap-2">
                  <span className="min-w-[20px] h-5 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">2</span>
                  Isi data produk sesuai kolom yang tersedia (title, price, dll).
                </li>
                <li className="flex gap-2">
                  <span className="min-w-[20px] h-5 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">3</span>
                  Pastikan format data benar (comma-separated).
                </li>
                <li className="flex gap-2">
                  <span className="min-w-[20px] h-5 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">4</span>
                  Upload file CSV yang telah diisi.
                </li>
                <li className="flex gap-2">
                  <span className="min-w-[20px] h-5 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">5</span>
                  Tunggu proses validasi dan upload selesai.
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t text-xs text-gray-500 text-center">
                Maksimal ukuran file: 5MB
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-cibaduyut-brown-800 mb-4">
                Panduan Kolom CSV
              </h2>
              <div className="space-y-4">
                {[
                  { col: 'title', req: true, desc: 'Nama produk (Text)' },
                  { col: 'price', req: true, desc: 'Harga (Angka)' },
                  { col: 'manufacturer', req: true, desc: 'Merk/Pembuat (Text)' },
                  { col: 'inStock', req: false, desc: 'Stok (Angka, Default: 0)' },
                  { col: 'mainImage', req: false, desc: 'URL Gambar (Link)' },
                  { col: 'description', req: true, desc: 'Deskripsi (Text)' },
                  { col: 'slug', req: true, desc: 'ID URL unik (Text)' },
                  { col: 'categoryId', req: true, desc: 'ID Kategori (UUID)' },
                ].map((field, idx) => (
                  <div key={idx} className="flex items-start justify-between text-sm pb-2 border-b border-gray-50 last:border-0 last:pb-0">
                    <div>
                      <p className="font-mono font-bold text-gray-700">{field.col}</p>
                      <p className="text-gray-500 text-xs">{field.desc}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      field.req ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {field.req ? 'Wajib' : 'Opsional'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUploadPage;
