"use client";
import { SectionTitle } from "@/components";
import { isValidEmailAddressFormat } from "@/lib/utils";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaEnvelope, FaLock } from "react-icons/fa";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    const expired = searchParams.get('expired');
    if (expired === 'true') {
      setError("Sesi Anda telah berakhir. Silakan login kembali.");
      toast.error("Sesi Anda telah berakhir. Silakan login kembali.");
    }
    
    if (sessionStatus === "authenticated") {
      // Check if admin
      if ((session as any)?.user?.role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/");
      }
    }
  }, [sessionStatus, session, router, searchParams]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmailAddressFormat(email)) {
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

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Email atau password salah");
      toast.error("Email atau password salah");
    } else {
      setError("");
      toast.success("Login berhasil!");
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
              Selamat Datang Kembali
            </h2>
            <p className="text-amber-100 text-lg">
              Masuk ke akun Anda untuk melanjutkan berbelanja produk kulit asli berkualitas tinggi.
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
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Masuk</h2>
            <p className="text-gray-500 mb-8">
              Belum punya akun?{" "}
              <Link href="/register" className="text-amber-600 hover:text-amber-700 font-medium">
                Daftar sekarang
              </Link>
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
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
                    placeholder="Masukkan password"
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-gray-600">Ingat saya</span>
                </label>
                <a href="#" className="text-amber-600 hover:text-amber-700">
                  Lupa password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Memproses..." : "Masuk"}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gradient-to-br from-amber-50 via-white to-orange-50 px-4 text-gray-500">
                  atau masuk dengan
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => signIn("google")}
                className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FcGoogle className="text-xl" />
                <span className="text-sm font-medium text-gray-700">Google</span>
              </button>
              <button
                onClick={() => signIn("github")}
                className="flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <FaGithub className="text-lg" />
                <span className="text-sm font-medium">GitHub</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
