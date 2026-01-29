// *********************
// Role of the component: Header component - Cibaduyut Authentic Leather
// Name of the component: Header.tsx
// Version: 2.0 - Modern Minimalist Design
// *********************

"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import HeaderTop from "./HeaderTop";
import Image from "next/image";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

import CartElement from "./CartElement";
import NotificationBell from "./NotificationBell";
import HeartElement from "./HeartElement";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import apiClient from "@/lib/api";

const Header = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { wishlist, setWishlist, wishQuantity } = useWishlistStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Logout successful!");
  };

  // getting all wishlist items by user id
  const getWishlistByUserId = async (id: string) => {
    const response = await apiClient.get(`/api/wishlist/${id}`, {
      cache: "no-store",
    });
    const wishlist = await response.json();
    const productArray: {
      id: string;
      title: string;
      price: number;
      image: string;
      slug:string
      stockAvailabillity: number;
    }[] = [];

    return; // temporary disable wishlist fetching while the issue is being resolved
    
    wishlist.map((item: any) => productArray.push({id: item?.product?.id, title: item?.product?.title, price: item?.product?.price, image: item?.product?.mainImage, slug: item?.product?.slug, stockAvailabillity: item?.product?.inStock}));
    
    setWishlist(productArray);
  };

  // getting user by email so I can get his user id
  const getUserByEmail = async () => {
    if (session?.user?.email) {
      
      apiClient.get(`/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
          getWishlistByUserId(data?.id);
        });
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, [session?.user?.email, wishlist.length]);

  return (
    <header className={`transition-all duration-300 ${isScrolled ? 'shadow-leather' : ''}`}>
      <HeaderTop />
      {pathname.startsWith("/admin") === false && (
        <nav className={`navbar-sticky transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
            <div className="flex items-center justify-between gap-x-8">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0 group">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cibaduyut-brown-600 to-cibaduyut-brown-800 rounded-xl flex items-center justify-center shadow-leather group-hover:shadow-leather-lg transition-all duration-300 group-hover:scale-105">
                    <span className="text-white font-display font-bold text-xl">C</span>
                  </div>
                  <div className="hidden sm:block">
                    <h1 className="font-display font-bold text-xl text-cibaduyut-brown-800 leading-tight">
                      Cibaduyut
                    </h1>
                    <p className="text-xs text-cibaduyut-brown-500 tracking-wider uppercase">
                      Authentic Leather
                    </p>
                  </div>
                </div>
              </Link>

              {/* Search - Desktop */}
              <div className="hidden lg:flex flex-1 max-w-xl">
                <SearchInput />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <NotificationBell />
                <HeartElement wishQuantity={wishQuantity} />
                <CartElement />
                
                {/* Mobile Menu Button */}
                <button 
                  className="lg:hidden p-2 rounded-lg hover:bg-cibaduyut-brown-100 transition-smooth"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <FaTimes className="text-xl text-cibaduyut-brown-700" />
                  ) : (
                    <FaBars className="text-xl text-cibaduyut-brown-700" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Search */}
            <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-20 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
              <SearchInput />
            </div>
          </div>
        </nav>
      )}
      
      {/* Admin Header */}
      {pathname.startsWith("/admin") === true && (
        <nav className="navbar-sticky py-3">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
            <div className="flex items-center justify-between">
              {/* Admin Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-cibaduyut-brown-600 to-cibaduyut-brown-800 rounded-lg flex items-center justify-center shadow-leather group-hover:scale-105 transition-smooth">
                  <span className="text-white font-display font-bold text-lg">C</span>
                </div>
                <div>
                  <h1 className="font-display font-bold text-lg text-cibaduyut-brown-800">
                    Cibaduyut Admin
                  </h1>
                  <p className="text-xs text-cibaduyut-brown-500">Dashboard Panel</p>
                </div>
              </Link>

              {/* Admin Actions */}
              <div className="flex items-center gap-x-4">
                <NotificationBell />
                
                {/* Profile Dropdown */}
                <div className="dropdown dropdown-end">
                  <div 
                    tabIndex={0} 
                    role="button" 
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-cibaduyut-brown-100 transition-smooth cursor-pointer"
                  >
                    <Image
                      src="/randomuser.jpg"
                      alt="Admin profile"
                      width={36}
                      height={36}
                      className="rounded-lg object-cover"
                    />
                    <span className="hidden sm:block text-sm font-medium text-cibaduyut-brown-700">
                      Admin
                    </span>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[100] mt-3 p-2 shadow-leather-lg bg-white rounded-xl w-52 border border-cibaduyut-brown-100"
                  >
                    <li>
                      <Link 
                        href="/admin" 
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-cibaduyut-brown-700 hover:bg-cibaduyut-brown-50 transition-smooth"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <a className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-cibaduyut-brown-700 hover:bg-cibaduyut-brown-50 transition-smooth cursor-pointer">
                        Profile
                      </a>
                    </li>
                    <li className="border-t border-cibaduyut-brown-100 mt-1 pt-1">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-smooth"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
