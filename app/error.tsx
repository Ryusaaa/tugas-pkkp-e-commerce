"use client"

import { FaExclamationTriangle, FaRedo } from "react-icons/fa"

const GlobalError = ({ error, reset }: { error: Error; reset?: () => void }) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-6">
      <div className="text-center max-w-md bg-white rounded-2xl p-8 shadow-lg border border-red-100">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
          <FaExclamationTriangle className="text-2xl text-red-500" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Terjadi Kesalahan
        </h3>
        <p className="text-gray-500 mb-6 text-sm">
          {error.message || "Maaf, terjadi kesalahan. Silakan coba lagi."}
        </p>
        
        {reset && (
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors"
          >
            <FaRedo className="text-sm" />
            <span>Coba Lagi</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default GlobalError
