'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaBell, FaCheck } from 'react-icons/fa';
import { useUnreadCount } from '@/hooks/useNotifications';
import { useSession } from 'next-auth/react';

interface NotificationBellProps {
  className?: string;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ className = "" }) => {
  const { data: session } = useSession();
  const { unreadCount } = useUnreadCount();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!session?.user) {
    return null;
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="relative p-2 rounded-lg hover:bg-cibaduyut-brown-100 transition-smooth group"
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
      >
        <FaBell className="text-xl text-cibaduyut-brown-500 group-hover:text-cibaduyut-brown-700 transition-colors" />
        
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-red-500 text-white text-xs font-bold rounded-full flex justify-center items-center shadow-sm animate-pulse">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-cibaduyut-brown-100 rounded-2xl shadow-leather-lg z-50 overflow-hidden animate-slide-down">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-cibaduyut-brown-100 bg-gradient-to-r from-cibaduyut-brown-50 to-white">
            <h3 className="font-display font-semibold text-cibaduyut-brown-800">Notifikasi</h3>
            {unreadCount > 0 && (
              <span className="text-xs font-medium text-cibaduyut-brown-500 bg-cibaduyut-brown-100 px-2 py-1 rounded-full">
                {unreadCount} belum dibaca
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="p-3 border-b border-cibaduyut-brown-100">
            <div className="flex gap-2">
              <Link
                href="/notifications"
                onClick={() => setIsDropdownOpen(false)}
                className="flex-1 px-3 py-2 text-sm font-medium text-center text-cibaduyut-brown-700 bg-cibaduyut-brown-50 border border-cibaduyut-brown-200 rounded-lg hover:bg-cibaduyut-brown-100 transition-smooth"
              >
                Lihat Semua
              </Link>
              
              {unreadCount > 0 && (
                <button
                  className="flex-1 px-3 py-2 text-sm font-medium text-center text-cibaduyut-gold bg-cibaduyut-gold/10 border border-cibaduyut-gold/30 rounded-lg hover:bg-cibaduyut-gold/20 transition-smooth"
                  onClick={() => {
                    setIsDropdownOpen(false);
                  }}
                >
                  <FaCheck className="inline mr-1 text-xs" />
                  Tandai Dibaca
                </button>
              )}
            </div>
          </div>

          {/* Notification Preview */}
          <div className="max-h-64 overflow-y-auto">
            {unreadCount === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-cibaduyut-brown-100 rounded-full flex items-center justify-center">
                  <FaBell className="text-2xl text-cibaduyut-brown-300" />
                </div>
                <p className="text-cibaduyut-brown-600 font-medium">Tidak ada notifikasi baru</p>
                <p className="text-cibaduyut-brown-400 text-sm mt-1">Semua sudah terbaca!</p>
              </div>
            ) : (
              <div className="p-4">
                <div className="text-center py-4">
                  <p className="text-sm text-cibaduyut-brown-600 mb-3">
                    Anda memiliki {unreadCount} notifikasi belum dibaca
                  </p>
                  <Link
                    href="/notifications"
                    onClick={() => setIsDropdownOpen(false)}
                    className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-cibaduyut-brown-600 rounded-lg hover:bg-cibaduyut-brown-700 transition-smooth"
                  >
                    Lihat Notifikasi →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 bg-cibaduyut-brown-50 border-t border-cibaduyut-brown-100">
            <Link
              href="/notifications"
              onClick={() => setIsDropdownOpen(false)}
              className="block text-center text-sm text-cibaduyut-brown-500 hover:text-cibaduyut-brown-700 transition-colors"
            >
              Buka Pusat Notifikasi
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;