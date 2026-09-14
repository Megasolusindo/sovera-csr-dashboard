'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Sparkles,
  Building2,
  Heart,
  ArrowRight,
  ShieldCheck,
  Check,
  Loader2,
  Users,
  Search,
  Bot,
  RefreshCw,
  Server,
  AlertCircle,
} from 'lucide-react';

interface SubscriptionPlan {
  id: string;
  code: string;
  name: string;
  description: string;
  price_monthly: number;
  price_yearly: number;
  crawl_quota: number;
  ai_query_quota: number;
  max_user_seats: number;
  target_persona: 'ORGANIZATION' | 'CORPORATE' | 'NGO';
  is_active: boolean;
}

// Helper to determine Backend API Base URL dynamically (supports localhost & network IPs)
const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const envUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (envUrl && envUrl.length > 0) return envUrl;
    return `${window.location.protocol}//${window.location.hostname}:4000/api/v1`;
  }
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1';
};

function PricingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read initial persona from URL query param (?persona=corporate | ?persona=ngo)
  const initialPersona = (searchParams.get('persona') === 'corporate' ? 'CORPORATE' : 'NGO') as 'NGO' | 'CORPORATE';
  const [selectedPersona, setSelectedPersona] = useState<'NGO' | 'CORPORATE'>(initialPersona);
  const [billingCycle, setBillingCycle] = useState<'MONTHLY' | 'YEARLY'>('MONTHLY');
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Sync state with URL without full page reload & save preference to Session Storage
  const handlePersonaChange = (persona: 'NGO' | 'CORPORATE') => {
    setSelectedPersona(persona);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('csrmatics_user_persona', persona);
    }
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('persona', persona.toLowerCase());
    router.replace(`/pricing?${newParams.toString()}`, { scroll: false });
  };

  // Sync persona reactively from URL query param (?persona=corporate) or Session Storage
  useEffect(() => {
    const personaParam = searchParams.get('persona');
    if (personaParam) {
      if (personaParam.toLowerCase() === 'corporate') {
        setSelectedPersona('CORPORATE');
      } else if (personaParam.toLowerCase() === 'ngo') {
        setSelectedPersona('NGO');
      }
    } else if (typeof window !== 'undefined') {
      const savedPersona = sessionStorage.getItem('csrmatics_user_persona');
      if (savedPersona === 'CORPORATE' || savedPersona === 'NGO') {
        setSelectedPersona(savedPersona);
      }
    }
  }, [searchParams]);

  // Fetch plans live from Backend API (/subscription/plans)
  const fetchSubscriptionPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiEndpoint = `${getApiBaseUrl()}/subscription/plans`;
      const response = await fetch(apiEndpoint, {
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to load subscription plans`);
      }

      const json = await response.json();
      if (json && json.success && Array.isArray(json.data)) {
        setPlans(json.data);
        setLastUpdated(new Date().toLocaleTimeString('id-ID'));
      } else {
        throw new Error(json?.message || 'Invalid API response payload structure');
      }
    } catch (err: any) {
      console.error('Failed to fetch subscription plans from backend API:', err);
      setError(err?.message || 'Gagal terhubung ke API backend Go (/subscription/plans)');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionPlans();
  }, []);

  const formatPrice = (amount: number) => {
    if (amount === 0) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Filter plans based on active persona
  const activePlans = plans.filter((plan) => {
    if (!plan.is_active) return false;
    if (selectedPersona === 'NGO') {
      return plan.target_persona === 'ORGANIZATION' || plan.target_persona === 'NGO';
    } else {
      return plan.target_persona === 'CORPORATE';
    }
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white relative overflow-x-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-emerald-600/15 via-indigo-900/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Header Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white block leading-none">
                CSRmatics
              </span>
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-widest block mt-0.5">
                Pricing Engine
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="/#features" className="hover:text-emerald-400 transition-colors">Fitur</Link>
            <Link href="/corporates" className="hover:text-emerald-400 transition-colors">Corporate Directory</Link>
            <Link href="/pricing" className="text-emerald-400 font-bold">Harga</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all border border-transparent hover:border-slate-700"
            >
              Masuk Sesi
            </Link>
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-700/25 hover:shadow-emerald-600/40 transition-all"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </header>

      {/* Main Pricing Hero Section */}
      <main className="py-16 px-6 max-w-7xl mx-auto space-y-12">
        {/* Title & Headline */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/40 text-emerald-300 text-xs font-semibold backdrop-blur-md">
            <Server className="w-3.5 h-3.5 text-emerald-400" />
            <span>Terhubung Live Backend API — Investasi CSR Terukur</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Transparan, Disesuaikan dengan Peran Anda
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Pilih skema biaya yang dirancang khusus untuk kebutuhan Lembaga Sosial / NGO maupun Korporasi & Unit TJSL.
          </p>

          {/* API Status Badge */}
          {lastUpdated && !loading && !error && (
            <div className="pt-1 flex items-center justify-center gap-2 text-[11px] text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Data Paket Berhasil Di-fetch dari API (Terakhir diperbarui: {lastUpdated})</span>
            </div>
          )}
        </div>

        {/* 1. SEGMENTED CONTROLLER SWITCH (Persona Selector) */}
        <div className="max-w-xl mx-auto">
          <div className="p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center gap-2 shadow-2xl backdrop-blur-md">
            <button
              type="button"
              onClick={() => handlePersonaChange('NGO')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2.5 ${
                selectedPersona === 'NGO'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-700/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Heart className={`w-4 h-4 ${selectedPersona === 'NGO' ? 'text-emerald-200' : 'text-slate-500'}`} />
              <span>🤝 Lembaga Sosial / NGO</span>
            </button>

            <button
              type="button"
              onClick={() => handlePersonaChange('CORPORATE')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2.5 ${
                selectedPersona === 'CORPORATE'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-700/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Building2 className={`w-4 h-4 ${selectedPersona === 'CORPORATE' ? 'text-indigo-200' : 'text-slate-500'}`} />
              <span>🏢 Perusahaan / TJSL</span>
            </button>
          </div>
        </div>

        {/* Header & Billing Cycle */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-white">
            {selectedPersona === 'NGO'
              ? 'Kembangkan Jangkauan Program & Dapatkan Dukungan Pendanaan CSR'
              : 'Kelola Inisiatif TJSL, Verifikasi Mitra NGO & Maksimalkan Dampak Sosial'}
          </h2>
          <p className="text-xs text-slate-400">
            {selectedPersona === 'NGO'
              ? 'Self-serve subscription via Payment Gateway Faspay. Bebas pembatalan kapan saja.'
              : 'Solusi terpercaya bagi Unit CSR, Perusahaan Tbk, BUMN, dan Swasta untuk transparansi penyaluran.'}
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-3 flex items-center justify-center gap-3">
            <div className="p-1 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setBillingCycle('MONTHLY')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  billingCycle === 'MONTHLY' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Tagihan Bulanan
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('YEARLY')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  billingCycle === 'YEARLY' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Tahunan</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-400 text-slate-950 font-black">
                  HEMAT 17%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="py-16 flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
            <span className="text-xs font-medium">Memuat paket harga langsung dari API backend (/api/v1/subscription/plans)...</span>
          </div>
        )}

        {/* Error Alert Box */}
        {error && !loading && (
          <div className="max-w-xl mx-auto p-4 rounded-2xl bg-rose-950/60 border border-rose-800/80 text-rose-300 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <span className="text-xs font-medium">{error}</span>
            </div>
            <button
              type="button"
              onClick={fetchSubscriptionPlans}
              className="px-3 py-1.5 rounded-xl bg-rose-900 hover:bg-rose-800 text-white text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Coba Lagi</span>
            </button>
          </div>
        )}

        {/* Dynamic Pricing Cards Grid */}
        {!loading && !error && activePlans.length === 0 && (
          <div className="py-12 text-center text-slate-400 text-xs">
            Tidak ada paket langganan aktif untuk persona {selectedPersona} di backend API.
          </div>
        )}

        {!loading && !error && activePlans.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {activePlans.map((plan) => {
              const isPopular = plan.code === 'PRO' || plan.code === 'CORPORATE_STARTER';
              const isEnterprise = plan.code === 'ENTERPRISE' || plan.code === 'CORPORATE_ENTERPRISE';
              const price = billingCycle === 'MONTHLY' ? plan.price_monthly : plan.price_yearly;

              return (
                <div
                  key={plan.id || plan.code}
                  className={`p-8 rounded-3xl transition-all flex flex-col justify-between space-y-6 relative backdrop-blur-md ${
                    isPopular
                      ? 'bg-slate-900/90 border-2 border-emerald-500 shadow-2xl shadow-emerald-900/30 scale-105'
                      : isEnterprise
                      ? 'bg-slate-900/80 border-2 border-indigo-500/80 shadow-2xl shadow-indigo-900/20'
                      : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Badge */}
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                      Paling Populer
                    </div>
                  )}
                  {isEnterprise && (
                    <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-indigo-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                      Enterprise Tier
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold uppercase tracking-widest block text-emerald-400">
                          {plan.code}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 font-mono">
                          API LIVE
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mt-1">{plan.name}</h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {plan.description || (selectedPersona === 'NGO' ? 'Solusi kemitraan CSR terpadu' : 'Solusi pengelolaan TJSL korporasi')}
                      </p>
                    </div>

                    <div className="pt-2">
                      <span className="text-3xl sm:text-4xl font-black text-white">
                        {formatPrice(price)}
                      </span>
                      <span className="text-xs text-slate-400 font-medium ml-1">
                        {price === 0 ? '/ selamanya' : billingCycle === 'MONTHLY' ? '/ bulan' : '/ tahun'}
                      </span>
                    </div>

                    {/* Quota Specs Box */}
                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <Search className="w-3.5 h-3.5 text-emerald-400" /> Kuota Crawl & Signals:
                        </span>
                        <span className="font-bold text-white">
                          {plan.crawl_quota >= 99999 ? 'Unlimited' : `${plan.crawl_quota.toLocaleString('id-ID')} / bln`}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <Bot className="w-3.5 h-3.5 text-emerald-400" /> AI Matching Queries:
                        </span>
                        <span className="font-bold text-white">
                          {plan.ai_query_quota >= 99999 ? 'Unlimited' : `${plan.ai_query_quota.toLocaleString('id-ID')} / bln`}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <Users className="w-3.5 h-3.5 text-emerald-400" /> User Seats:
                        </span>
                        <span className="font-bold text-white">
                          {plan.max_user_seats >= 999 ? 'Unlimited' : `${plan.max_user_seats} Seats`}
                        </span>
                      </div>
                    </div>

                    {/* Included Features List */}
                    <div className="border-t border-slate-800/80 pt-4 space-y-3">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Fitur Utama:
                      </span>
                      <ul className="space-y-2.5 text-xs text-slate-300">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Full Directory & Intelligence Access</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>AI Vector Matchmaking Engine</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Penyusunan & Pengajuan Proposal CSR</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Faktur & Integrasi Payment Gateway (Faspay)</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link
                      href={`/login?persona=${selectedPersona.toLowerCase()}&plan=${plan.code.toLowerCase()}`}
                      className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg ${
                        isPopular
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-700/30'
                          : isEnterprise
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-700/30'
                          : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                      }`}
                    >
                      <span>{price === 0 ? 'Mulai Gratis Sekarang' : 'Berlangganan Sekarang'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 4. FAQ SECTION */}
        <div className="pt-16 border-t border-slate-800/80 max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">FAQ</span>
            <h3 className="text-2xl font-bold text-white">Pertanyaan Sering Diajukan</h3>
          </div>
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
              <h4 className="text-sm font-bold text-white">Bagaimana cara kerja pembayaran Faspay untuk paket langganan?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pembayaran diproses secara instan menggunakan Faspay SNAP BI Payment Gateway melalui Virtual Account (BCA, Mandiri, BRI, BNI) atau QRIS. Lisensi aktif secara otomatis.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
              <h4 className="text-sm font-bold text-white">Apakah perusahaan gratis mengklaim profil di CSRmatics?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ya! Pendaftaran dan klaim profil perusahaan bersifat Rp0 (Gratis) melalui verifikasi domain email kerja atau pengunggahan dokumen resmi.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Memuat Halaman Harga...</div>}>
      <PricingContent />
    </Suspense>
  );
}
