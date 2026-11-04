'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  Menu,
  X,
  ArrowRight,
  Building2,
  Heart,
  RefreshCw,
} from 'lucide-react';

export function getClientViewAs(): 'csr' | 'ngo' | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|;\s*)viewAs=([^;]*)/);
  if (match && (match[1] === 'csr' || match[1] === 'ngo')) {
    return match[1] as 'csr' | 'ngo';
  }
  return null;
}

export function setClientViewAs(persona: 'csr' | 'ngo' | null) {
  if (typeof document === 'undefined') return;
  if (!persona) {
    document.cookie = 'viewAs=; path=/; max-age=0; SameSite=Lax';
    try {
      localStorage.removeItem('viewAs');
    } catch {}
  } else {
    document.cookie = `viewAs=${persona}; path=/; max-age=2592000; SameSite=Lax`;
    try {
      localStorage.setItem('viewAs', persona);
    } catch {}
  }
  window.dispatchEvent(new CustomEvent('csrmatics:viewAsChange', { detail: persona }));
  window.dispatchEvent(new Event('storage'));
}

interface PublicNavbarProps {
  initialViewAs?: 'csr' | 'ngo' | string | null;
}

export function PublicNavbar({ initialViewAs }: PublicNavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [viewAs, setViewAs] = useState<'csr' | 'ngo' | string | null>(initialViewAs || null);

  const syncPersonaFromCookie = useCallback(() => {
    const current = getClientViewAs();
    if (current) {
      setViewAs(current);
    } else if (initialViewAs) {
      setViewAs(initialViewAs);
    } else {
      setViewAs(null);
    }
  }, [initialViewAs]);

  useEffect(() => {
    // 1. Initial sync from cookie
    syncPersonaFromCookie();

    // 2. Listen to custom event dispatched when persona is switched anywhere
    const handleCustomChange = (e: Event) => {
      const customEvent = e as CustomEvent<'csr' | 'ngo' | null>;
      if (customEvent.detail !== undefined) {
        setViewAs(customEvent.detail);
      } else {
        syncPersonaFromCookie();
      }
    };

    // 3. Listen to storage events (cross-tab / local storage changes)
    const handleStorageChange = () => {
      syncPersonaFromCookie();
    };

    window.addEventListener('csrmatics:viewAsChange', handleCustomChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('csrmatics:viewAsChange', handleCustomChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [syncPersonaFromCookie, pathname]);

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
              className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider block mt-1 whitespace-nowrap transition-colors ${
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

        {/* Desktop Action CTA & Persona Switcher */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Quick Persona Switcher Pill */}
          {viewAs === 'csr' ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-950/60 border border-indigo-700/60 text-xs">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span className="font-bold text-indigo-300">🏢 Korporasi</span>
              <button
                type="button"
                onClick={() => setClientViewAs('ngo')}
                title="Beralih langsung ke mode NGO"
                className="text-slate-400 hover:text-white transition-colors text-[11px] ml-1 pl-2 border-l border-indigo-800/80 flex items-center gap-1 group/sw"
              >
                <RefreshCw className="w-2.5 h-2.5 group-hover/sw:rotate-180 transition-transform" />
                <span>Ganti ke NGO</span>
              </button>
            </div>
          ) : viewAs === 'ngo' ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-700/60 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-emerald-300">💚 NGO / Yayasan</span>
              <button
                type="button"
                onClick={() => setClientViewAs('csr')}
                title="Beralih langsung ke mode Korporasi"
                className="text-slate-400 hover:text-white transition-colors text-[11px] ml-1 pl-2 border-l border-emerald-800/80 flex items-center gap-1 group/sw"
              >
                <RefreshCw className="w-2.5 h-2.5 group-hover/sw:rotate-180 transition-transform" />
                <span>Ganti ke Corporate</span>
              </button>
            </div>
          ) : (
            <Link
              href="/platform#select-persona"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-emerald-300 hover:border-emerald-500/40 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Pilih Mode</span>
            </Link>
          )}

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
          {/* Quick Persona Switcher on Mobile Drawer */}
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Mode Akses Portal:</span>
              <span
                className={`font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-md ${
                  viewAs === 'csr'
                    ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                    : viewAs === 'ngo'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {viewAs === 'csr' ? '🏢 Korporasi' : viewAs === 'ngo' ? '💚 NGO / Yayasan' : 'Belum Dipilih'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setClientViewAs('csr')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  viewAs === 'csr'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Korporasi</span>
              </button>
              <button
                type="button"
                onClick={() => setClientViewAs('ngo')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  viewAs === 'ngo'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Heart className="w-3.5 h-3.5" />
                <span>NGO</span>
              </button>
            </div>
          </div>

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

