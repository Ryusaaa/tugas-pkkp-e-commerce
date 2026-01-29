// *********************
// Role of the component: Sidebar on admin dashboard page - Cibaduyut
// Name of the component: DashboardSidebar.tsx
// Version: 2.0 - Modern Minimalist Design
// *********************

"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { 
  MdDashboard, 
  MdCategory, 
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight 
} from "react-icons/md";
import { 
  FaBox, 
  FaUsers, 
  FaStore, 
  FaShoppingBag, 
  FaFileUpload,
  FaCog 
} from "react-icons/fa";
import Link from "next/link";

const menuItems = [
  { href: "/admin", icon: MdDashboard, label: "Dashboard" },
  { href: "/admin/orders", icon: FaShoppingBag, label: "Orders" },
  { href: "/admin/products", icon: FaBox, label: "Products" },
  { href: "/admin/bulk-upload", icon: FaFileUpload, label: "Bulk Upload" },
  { href: "/admin/categories", icon: MdCategory, label: "Categories" },
  { href: "/admin/users", icon: FaUsers, label: "Users" },
  { href: "/admin/merchant", icon: FaStore, label: "Merchant" },
  { href: "/admin/settings", icon: FaCog, label: "Settings" },
];

const DashboardSidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside 
      className={`sticky top-0 h-screen overflow-y-auto bg-gradient-to-b from-cibaduyut-brown-800 to-cibaduyut-brown-900 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64 xl:w-72'
      } max-xl:w-20 z-50`}
    >
      {/* Collapse Toggle - Desktop only */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden xl:flex absolute -right-3 top-8 w-6 h-6 bg-cibaduyut-gold rounded-full items-center justify-center shadow-lg hover:scale-110 transition-smooth z-10"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <MdKeyboardArrowRight className="text-cibaduyut-brown-900" />
        ) : (
          <MdKeyboardArrowLeft className="text-cibaduyut-brown-900" />
        )}
      </button>

      {/* Sidebar Header */}
      <div className={`p-5 border-b border-white/10 ${isCollapsed ? 'flex justify-center' : ''}`}>
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 bg-gradient-to-br from-cibaduyut-gold to-cibaduyut-brown-300 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-cibaduyut-brown-900 font-display font-bold text-lg">C</span>
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <h2 className="font-display font-semibold text-white text-sm">Admin Panel</h2>
              <p className="text-xs text-cibaduyut-gold/70 truncate">Cibaduyut Leather</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-3 max-xl:flex max-xl:gap-2 max-xl:flex-wrap max-xl:justify-center">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`
                group flex items-center gap-3 px-4 py-3.5 rounded-xl mb-1 transition-all duration-200
                ${isCollapsed ? 'justify-center' : ''}
                ${active 
                  ? 'bg-cibaduyut-gold text-cibaduyut-brown-900 shadow-lg' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
                }
                max-xl:px-5 max-xl:mb-0
              `}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={`text-xl flex-shrink-0 transition-transform duration-200 ${
                active ? '' : 'group-hover:scale-110'
              }`} />
              {!isCollapsed && (
                <span className={`font-medium text-sm transition-all duration-200 ${
                  active ? 'font-semibold' : ''
                }`}>
                  {item.label}
                </span>
              )}
              
              {/* Active Indicator */}
              {active && !isCollapsed && (
                <div className="ml-auto w-2 h-2 rounded-full bg-cibaduyut-brown-900"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 max-xl:hidden">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-xs text-white/50 text-center">
              Cibaduyut Authentic Leather
            </p>
            <p className="text-xs text-cibaduyut-gold/70 text-center mt-1">
              Admin Dashboard v2.0
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default DashboardSidebar;
