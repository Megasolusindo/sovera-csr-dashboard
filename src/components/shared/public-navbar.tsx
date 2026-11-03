'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  Building2,
  Heart,
  Menu,
  X,
  ArrowRight,
} from 'lucide-react';

interface PublicNavbarProps {
  initialViewAs?: 'csr' | 'ngo' | null;
}

export function PublicNavbar({ initialViewAs }: PublicNavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [viewAs, setViewAs] = useState<'csr' | 'ngo' | null>(initialViewAs || null);

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
  const isDirectoryActive = pathname.startsWith('/database-perusahaan');
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

          {/* Solusi Korporasi: disembunyikan jika persona NGO */}
          {viewAs !== 'ngo' && (
            <Link
              href="/untuk-korporasi"
              className={`flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                isCorporateActive ? 'text-indigo-300 font-bold' : 'hover:text-indigo-300'
              }`}
            >
              <span>Solusi Korporasi</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                3.000+
              </span>
            </Link>
          )}

          {/* Solusi NGO: disembunyikan jika persona Korporasi */}
          {viewAs !== 'csr' && (
            <Link
              href="/untuk-ngo"
              className={`flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                isNgoActive ? 'text-emerald-400 font-bold' : 'hover:text-emerald-400'
              }`}
            >
              <span>Solusi NGO</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                1.200+
              </span>
            </Link>
          )}

          <Link
            href="/database-perusahaan"
            className={`transition-colors whitespace-nowrap ${
              isDirectoryActive ? 'text-emerald-400 font-semibold' : 'hover:text-emerald-400'
            }`}
          >
            Database Perusahaan
          </Link>

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

        {/* Desktop Action CTAs */}
        <div className="hidden lg:flex items-center gap-2.5">
          {viewAs === 'csr' ? (
            <>
              <Link
                href="/login"
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all border border-transparent hover:border-slate-700"
              >
                Masuk
              </Link>
              <Link
                href="/untuk-korporasi"
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5 border border-indigo-400/30"
              >
                <Building2 className="w-3.5 h-3.5 text-indigo-200" />
                <span>Masuk Korporasi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </>
          ) : viewAs === 'ngo' ? (
            <>
              <Link
                href="/login"
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all border border-transparent hover:border-slate-700"
              >
                Masuk
              </Link>
              <Link
                href="/untuk-ngo"
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-lg shadow-emerald-700/25 transition-all flex items-center gap-1.5 border border-emerald-400/30"
              >
                <Heart className="w-3.5 h-3.5 text-emerald-200" />
                <span>Masuk NGO</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all border border-transparent hover:border-slate-700"
              >
                Masuk
              </Link>
              <Link
                href="/untuk-korporasi"
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-950/80 hover:bg-indigo-900/80 text-indigo-200 border border-indigo-700/50 transition-all flex items-center gap-1.5"
              >
                <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Join Korporasi</span>
              </Link>
              <Link
                href="/untuk-ngo"
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-lg shadow-emerald-700/25 transition-all flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 text-emerald-200" />
                <span>Join NGO</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/login"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200 hover:bg-slate-800 border border-slate-700"
          >
            Masuk
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

            {viewAs !== 'ngo' && (
              <Link
                href="/untuk-korporasi"
                className="flex items-center justify-between text-indigo-300 hover:text-indigo-200 py-1 transition-colors"
              >
                <span>Solusi Korporasi</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  3.000+
                </span>
              </Link>
            )}

            {viewAs !== 'csr' && (
              <Link
                href="/untuk-ngo"
                className="flex items-center justify-between text-emerald-400 hover:text-emerald-300 py-1 transition-colors"
              >
                <span>Solusi NGO</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  1.200+
                </span>
              </Link>
            )}

            <Link
              href="/database-perusahaan"
              className="text-slate-300 hover:text-emerald-400 py-1 transition-colors"
            >
              Database Perusahaan
            </Link>

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

          {/* Mobile CTA Buttons */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2.5">
            {viewAs === 'csr' ? (
              <Link
                href="/untuk-korporasi"
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <Building2 className="w-4 h-4 text-indigo-200" />
                <span>Masuk Portal Korporasi</span>
              </Link>
            ) : viewAs === 'ngo' ? (
              <Link
                href="/untuk-ngo"
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-2 transition-all"
              >
                <Heart className="w-4 h-4 text-emerald-200" />
                <span>Masuk Portal NGO</span>
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/untuk-korporasi"
                  className="py-2.5 px-3 rounded-xl text-xs font-bold bg-indigo-950/90 text-indigo-200 border border-indigo-700/50 flex items-center justify-center gap-1.5 text-center"
                >
                  <Building2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Korporasi</span>
                </Link>
                <Link
                  href="/untuk-ngo"
                  className="py-2.5 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-1.5 text-center shadow-md shadow-emerald-700/20"
                >
                  <Heart className="w-3.5 h-3.5 text-emerald-200 shrink-0" />
                  <span>Join NGO</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
