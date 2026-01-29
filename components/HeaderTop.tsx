// *********************
// Role of the component: Topbar of the header - Cibaduyut Authentic Leather
// Name of the component: HeaderTop.tsx
// Version: 2.0 - Modern Minimalist Design
// *********************

"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope, FaMapMarkerAlt, FaUser, FaSignOutAlt } from "react-icons/fa";

const HeaderTop = () => {
  const { data: session }: any = useSession();

  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Logout successful!");
  }
  
  return (
    <div className="bg-gradient-to-r from-cibaduyut-brown-800 via-cibaduyut-brown-700 to-cibaduyut-brown-800 text-white/90">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
        <div className="flex flex-col sm:flex-row justify-between items-center py-2 gap-y-2">
          {/* Contact Info */}
          <ul className="flex items-center gap-x-6 text-sm">
            <li className="flex items-center gap-x-2 hover:text-cibaduyut-gold transition-smooth">
              <FaPhoneAlt className="text-cibaduyut-gold text-xs" />
              <span>+62 22 1234 5678</span>
            </li>
            <li className="hidden md:flex items-center gap-x-2 hover:text-cibaduyut-gold transition-smooth">
              <FaEnvelope className="text-cibaduyut-gold text-xs" />
              <span>info@cibaduyut-leather.com</span>
            </li>
            <li className="hidden lg:flex items-center gap-x-2 hover:text-cibaduyut-gold transition-smooth">
              <FaMapMarkerAlt className="text-cibaduyut-gold text-xs" />
              <span>Cibaduyut, Bandung</span>
            </li>
          </ul>
          
          {/* Auth Links */}
          <ul className="flex items-center gap-x-4 text-sm">
            {!session ? ( 
              <>
                <li>
                  <Link 
                    href="/login" 
                    className="flex items-center gap-x-2 px-4 py-1.5 rounded-full border border-white/20 hover:bg-white/10 hover:border-cibaduyut-gold transition-smooth"
                  >
                    <FaUser className="text-xs" />
                    <span>Login</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/register" 
                    className="flex items-center gap-x-2 px-4 py-1.5 rounded-full bg-cibaduyut-gold text-cibaduyut-brown-900 font-medium hover:bg-cibaduyut-brown-300 transition-smooth"
                  >
                    <span>Daftar</span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <span className="text-cibaduyut-gold font-medium truncate max-w-[150px]">
                  {session.user?.email}
                </span>
                <li>
                  <button 
                    onClick={() => handleLogout()} 
                    className="flex items-center gap-x-2 px-4 py-1.5 rounded-full border border-white/20 hover:bg-white/10 hover:border-red-400 hover:text-red-400 transition-smooth"
                  >
                    <FaSignOutAlt className="text-xs" />
                    <span>Logout</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
