// *********************
// Role of the component: Footer component - Cibaduyut Authentic Leather
// Name of the component: Footer.tsx
// Version: 2.0 - Modern Minimalist Design
// *********************

import { navigation } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-cibaduyut-brown-900 to-cibaduyut-dark text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      
      {/* Main Footer Content */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-cibaduyut-gold to-cibaduyut-brown-300 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-cibaduyut-brown-900 font-display font-bold text-2xl">C</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-white">Cibaduyut</h3>
                <p className="text-sm text-cibaduyut-gold">Authentic Leather</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Menyediakan sepatu dan sandal kulit asli berkualitas tinggi dari Cibaduyut, Bandung. 
              Kerajinan tangan dengan tradisi turun-temurun.
            </p>
            
            {/* Social Media */}
            <div className="flex gap-3">
              {[
                { icon: FaFacebookF, href: "#" },
                { icon: FaInstagram, href: "#" },
                { icon: FaTwitter, href: "#" },
                { icon: FaWhatsapp, href: "#" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-cibaduyut-gold hover:text-cibaduyut-brown-900 transition-smooth"
                >
                  <social.icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg text-cibaduyut-gold mb-6">
              Produk
            </h3>
            <ul className="space-y-3">
              {["Sepatu Pria", "Sepatu Wanita", "Sandal", "Tas Kulit", "Aksesoris"].map((item) => (
                <li key={item}>
                  <Link
                    href="/shop"
                    className="text-white/70 hover:text-cibaduyut-gold transition-smooth text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cibaduyut-gold/50 group-hover:bg-cibaduyut-gold transition-smooth"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-display font-semibold text-lg text-cibaduyut-gold mb-6">
              Layanan
            </h3>
            <ul className="space-y-3">
              {["Cara Pemesanan", "Pengiriman", "Pengembalian", "FAQ", "Kontak Kami"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/70 hover:text-cibaduyut-gold transition-smooth text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cibaduyut-gold/50 group-hover:bg-cibaduyut-gold transition-smooth"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-semibold text-lg text-cibaduyut-gold mb-6">
              Hubungi Kami
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FaMapMarkerAlt className="text-cibaduyut-gold text-xs" />
                </div>
                <span className="text-white/70 text-sm">
                  Jl. Cibaduyut Raya No. 123,<br />
                  Bandung 40235, Jawa Barat
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <FaPhone className="text-cibaduyut-gold text-xs" />
                </div>
                <span className="text-white/70 text-sm">+62 22 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="text-cibaduyut-gold text-xs" />
                </div>
                <span className="text-white/70 text-sm">info@cibaduyut-leather.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © 2026 Cibaduyut Authentic Leather. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/50 hover:text-cibaduyut-gold transition-smooth">
                Kebijakan Privasi
              </a>
              <a href="#" className="text-white/50 hover:text-cibaduyut-gold transition-smooth">
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
