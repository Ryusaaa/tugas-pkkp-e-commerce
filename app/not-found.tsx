import Link from 'next/link'
import { FaHome, FaHeadset } from 'react-icons/fa'
 
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* 404 Badge */}
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-amber-100 to-amber-50 rounded-full flex items-center justify-center border-4 border-amber-200">
          <span className="text-3xl font-bold text-amber-700">404</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-gray-500 mb-8">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors"
          >
            <FaHome />
            <span>Kembali ke Beranda</span>
          </Link>
          <Link 
            href="#" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-600 font-medium transition-colors"
          >
            <FaHeadset />
            <span>Hubungi Kami</span>
          </Link>
        </div>
      </div>
    </div>
  )
}