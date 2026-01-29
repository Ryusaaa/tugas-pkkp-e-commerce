"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const email = e.target[2].value;
    const password = e.target[3].value;
    const confirmPassword = e.target[4].value;

    if (!isValidEmail(email)) {
      setError("Format email tidak valid");
      toast.error("Format email tidak valid");
      setIsLoading(false);
      return;
    }

    if (!password || password.length < 8) {
      setError("Password minimal 8 karakter");
      toast.error("Password minimal 8 karakter");
      setIsLoading(false);
      return;
    }

    if (confirmPassword !== password) {
      setError("Password tidak sama");
      toast.error("Password tidak sama");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setError("");
        toast.success("Registrasi berhasil!");
        router.push("/login");
      } else {
        if (data.details && Array.isArray(data.details)) {
          const errorMessage = data.details.map((err: any) => err.message).join(", ");
          setError(errorMessage);
          toast.error(errorMessage);
        } else if (data.error) {
          setError(data.error);
          toast.error(data.error);
        } else {
          setError("Registrasi gagal");
          toast.error("Registrasi gagal");
        }
      }
    } catch (error) {
      toast.error("Error, coba lagi");
      setError("Error, coba lagi");
    }
    setIsLoading(false);
  };

  if (sessionStatus === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="flex min-h-screen">
        {/* Left side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 p-12 flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-xl">Cibaduyut</h1>
                <p className="text-amber-200 text-sm">Authentic Leather</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Bergabung Bersama Kami
            </h2>
            <p className="text-amber-100 text-lg">
              Daftar sekarang dan nikmati kemudahan berbelanja produk kulit asli berkualitas tinggi.
            </p>
          </div>
          
          <p className="text-amber-200 text-sm">
            © 2026 Cibaduyut Authentic Leather
          </p>
        </div>
        
        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <div className="text-left">
                  <h1 className="font-bold text-gray-800">Cibaduyut</h1>
                  <p className="text-amber-600 text-xs">Authentic Leather</p>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Daftar Akun</h2>
            <p className="text-gray-500 mb-8">
              Sudah punya akun?{" "}
              <Link href="/login" className="text-amber-600 hover:text-amber-700 font-medium">
                Masuk di sini
              </Link>
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Depan
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      placeholder="John"
                      required
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Belakang
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Doe"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="nama@email.com"
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Minimal 8 karakter"
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="confirmpassword"
                    placeholder="Ulangi password"
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="w-4 h-4 mt-1 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  Saya setuju dengan{" "}
                  <a href="#" className="text-amber-600 hover:text-amber-700">Syarat & Ketentuan</a>
                  {" "}dan{" "}
                  <a href="#" className="text-amber-600 hover:text-amber-700">Kebijakan Privasi</a>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Memproses..." : "Daftar Sekarang"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
