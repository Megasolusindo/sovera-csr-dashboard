'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  Menu,
  X,
  ArrowRight,
} from 'lucide-react';

interface PublicNavbarProps {
  initialViewAs?: 'csr' | 'ngo' | string | null;
}

export function PublicNavbar({ initialViewAs }: PublicNavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [viewAs, setViewAs] = useState<'csr' | 'ngo' | string | null>(initialViewAs || null);

  useEffect(() => {
    // If not supplied from server, check document.cookie on mount
    if (!initialViewAs && typeof document !== 'undefined') {
      const match = document.cookie.match(/(?:^|;\s*)viewAs=([^;]*)/);
      if (match && (match[1] === 'csr' || match[1] === 'ngo')) {
        setViewAs(match[1]);
      }
    }
  }, [initialViewAs]);

  // Close mobile drawer upon navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isBlogActive = pathname.startsWith('/blog');
  const isPricingActive = pathname.startsWith('/pricing');
  const isPlatformActive = pathname.startsWith('/platform');
  const isDirectoryActive = pathname.startsWith('/database-perusahaan');
  const isNgoDirectoryActive = pathname.startsWith('/database-lembaga');
  const isCorporateActive = pathname.startsWith('/untuk-korporasi');
  const isNgoActive = pathname.startsWith('/untuk-ngo');

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/60 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group mr-4 lg:mr-8 shrink-0">
          <div
            className={`w-10 h-10 rounded-xl ${
              viewAs === 'csr'
                ? 'bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-indigo-600/20'
                : 'bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-emerald-600/20'
            } text-white flex items-center justify-center font-bold shadow-lg group-hover:scale-105 transition-transform shrink-0`}
          >
            <Sparkles
              className={`w-5 h-5 ${
                viewAs === 'csr' ? 'text-indigo-200' : 'text-emerald-200'
              }`}
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-extrabold text-xl tracking-tight text-white block leading-none">
              CSRmatics
            </span>
            <span
              className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider block mt-1 whitespace-nowrap ${
                viewAs === 'csr' ? 'text-indigo-400' : 'text-emerald-400'
              }`}
            >
              {viewAs === 'csr'
                ? 'Corporate CSR Portal'
                : viewAs === 'ngo'
                ? 'NGO Partnership Portal'
                : 'Two-Sided CSR Platform'}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link
            href="/"
            className="hover:text-emerald-400 transition-colors whitespace-nowrap"
          >
            Beranda
          </Link>

          <Link
            href="/platform"
            className={`transition-colors whitespace-nowrap ${
              isPlatformActive ? 'text-emerald-400 font-semibold' : 'hover:text-emerald-400'
            }`}
          >
            Platform
          </Link>

          {/* Solusi Korporasi: disembunyikan jika persona NGO */}
          {viewAs !== 'ngo' && (
            <Link
              href="/untuk-korporasi"
              className={`transition-colors whitespace-nowrap ${
                isCorporateActive ? 'text-indigo-300 font-bold' : 'hover:text-indigo-300'
              }`}
            >
              Solusi Korporasi
            </Link>
          )}

          {/* Solusi NGO: disembunyikan jika persona Korporasi */}
          {viewAs !== 'csr' && (
            <Link
              href="/untuk-ngo"
              className={`transition-colors whitespace-nowrap ${
                isNgoActive ? 'text-emerald-400 font-bold' : 'hover:text-emerald-400'
              }`}
            >
              Solusi NGO
            </Link>
          )}

          {/* Database Perusahaan: tampil ketika viewAs === 'ngo' atau mode netral (disembunyikan saat viewAs === 'csr') */}
          {viewAs !== 'csr' && (
            <Link
              href="/database-perusahaan"
              className={`transition-colors whitespace-nowrap ${
                isDirectoryActive ? 'text-emerald-400 font-semibold' : 'hover:text-emerald-400'
              }`}
            >
              Database Perusahaan
            </Link>
          )}

          {/* Database Lembaga: tampil ketika viewAs === 'csr' atau mode netral (disembunyikan saat viewAs === 'ngo') */}
          {viewAs !== 'ngo' && (
            <Link
              href="/database-lembaga"
              className={`transition-colors whitespace-nowrap ${
                isNgoDirectoryActive ? 'text-emerald-400 font-semibold' : 'hover:text-emerald-400'
              }`}
            >
              Database Lembaga
            </Link>
          )}

          <Link
            href="/blog"
            className={`flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              isBlogActive
                ? 'text-emerald-400 font-semibold'
                : 'hover:text-emerald-400'
            }`}
          >
            <span>Blog</span>
            {isBlogActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </Link>

          <Link
            href="/pricing"
            className={`transition-colors whitespace-nowrap ${
              isPricingActive ? 'text-emerald-400 font-semibold' : 'hover:text-emerald-400'
            }`}
          >
            Pricing
          </Link>
        </nav>

        {/* Desktop Action CTA */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/login"
            className={`px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md transition-all flex items-center gap-1.5 border ${
              viewAs === 'csr'
                ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30 border-indigo-400/30 hover:scale-[1.02]'
                : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-700/25 border-emerald-400/30 hover:scale-[1.02]'
            }`}
          >
            <span>Login</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/login"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all ${
              viewAs === 'csr'
                ? 'bg-indigo-600 hover:bg-indigo-500'
                : 'bg-emerald-600 hover:bg-emerald-500'
            }`}
          >
            Login
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800/80 px-6 py-5 space-y-4 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3 text-sm font-medium">
            <Link
              href="/"
              className="text-slate-300 hover:text-emerald-400 py-1 transition-colors"
            >
              Beranda
            </Link>

            <Link
              href="/platform"
              className={`py-1 transition-colors ${
                isPlatformActive ? 'text-emerald-400 font-semibold' : 'text-slate-300 hover:text-emerald-400'
              }`}
            >
              Platform
            </Link>

            {viewAs !== 'ngo' && (
              <Link
                href="/untuk-korporasi"
                className="text-indigo-300 hover:text-indigo-200 py-1 transition-colors"
              >
                Solusi Korporasi
              </Link>
            )}

            {viewAs !== 'csr' && (
              <Link
                href="/untuk-ngo"
                className="text-emerald-400 hover:text-emerald-300 py-1 transition-colors"
              >
                Solusi NGO
              </Link>
            )}

            {/* Database Perusahaan: tampil ketika viewAs === 'ngo' atau mode netral */}
            {viewAs !== 'csr' && (
              <Link
                href="/database-perusahaan"
                className={`py-1 transition-colors ${
                  isDirectoryActive ? 'text-emerald-400 font-semibold' : 'text-slate-300 hover:text-emerald-400'
                }`}
              >
                Database Perusahaan
              </Link>
            )}

            {/* Database Lembaga: tampil ketika viewAs === 'csr' atau mode netral */}
            {viewAs !== 'ngo' && (
              <Link
                href="/database-lembaga"
                className={`py-1 transition-colors ${
                  isNgoDirectoryActive ? 'text-emerald-400 font-semibold' : 'text-slate-300 hover:text-emerald-400'
                }`}
              >
                Database Lembaga
              </Link>
            )}

            <Link
              href="/blog"
              className="flex items-center gap-2 text-emerald-400 font-semibold py-1 transition-colors"
            >
              <span>Blog</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </Link>

            <Link
              href="/pricing"
              className="text-slate-300 hover:text-emerald-400 py-1 transition-colors"
            >
              Pricing
            </Link>
          </div>

          {/* Mobile CTA Button */}
          <div className="pt-3 border-t border-slate-800/80">
            <Link
              href="/login"
              className={`w-full py-2.5 rounded-xl text-xs font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all ${
                viewAs === 'csr'
                  ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/25'
                  : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-700/25'
              }`}
            >
              <span>Login</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
