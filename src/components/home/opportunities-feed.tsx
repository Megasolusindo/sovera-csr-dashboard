'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, Heart, ArrowRight } from 'lucide-react';

export default function OpportunitiesFeed() {
  const [opportunityTab, setOpportunityTab] = useState<'NGO_PROGRAMS' | 'CORP_OPENCALLS'>('NGO_PROGRAMS');

  return (
    <div className="space-y-8">
      {/* Opportunity Tabs */}
      <div className="flex justify-center">
        <div className="p-1 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2">
          <button
            onClick={() => setOpportunityTab('NGO_PROGRAMS')}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              opportunityTab === 'NGO_PROGRAMS'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Program NGO (Butuh Pendanaan)</span>
          </button>
          <button
            onClick={() => setOpportunityTab('CORP_OPENCALLS')}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              opportunityTab === 'CORP_OPENCALLS'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Open Call CSR Korporasi</span>
          </button>
        </div>
      </div>

      {/* Opportunities Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {opportunityTab === 'NGO_PROGRAMS' ? (
          <>
            {/* Opportunity Card 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    SDG 4: Pendidikan
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Match 95.4%</span>
                </div>
                <p className="font-bold text-white text-base leading-snug">Beasiswa Coding & Digital Literacy Anak Desa</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Yayasan Aksara Nusantara • Kebutuhan Dana: Rp 350 Juta (Target: 200 Siswa SMKN di Jawa Barat).
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                <span className="text-[11px] text-emerald-400 font-semibold">Asnaf: Fisabilillah</span>
                <Link href="/untuk-korporasi" className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                  <span>Detail Beasiswa Coding</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Opportunity Card 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    SDG 13: Lingkungan
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Match 92.1%</span>
                </div>
                <p className="font-bold text-white text-base leading-snug">Restorasi Mangrove & Pemberdayaan Nelayan Pesisir</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  LAZ Hijau Indonesia • Kebutuhan Dana: Rp 600 Juta (Target: 50.000 Bibit Mangrove di Muara Gembong).
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                <span className="text-[11px] text-teal-400 font-semibold">Asnaf: Maslahat Umum</span>
                <Link href="/untuk-korporasi" className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                  <span>Detail Restorasi Mangrove</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Opportunity Card 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    SDG 3: Kesehatan
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Match 91.8%</span>
                </div>
                <p className="font-bold text-white text-base leading-snug">Posyandu Pintar & Pencegahan Stunting Daerah 3T</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Yayasan Sehat Peduli • Kebutuhan Dana: Rp 450 Juta (Target: 15 Desa di NTT & Maluku).
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                <span className="text-[11px] text-amber-400 font-semibold">Asnaf: Fakir / Miskin</span>
                <Link href="/untuk-korporasi" className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                  <span>Detail Posyandu Pintar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Open Call Card 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Sektor Finansial
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Anggaran Q3-Q4</span>
                </div>
                <p className="font-bold text-white text-base leading-snug">Program Inklusi Keuangan & UMKM Wanita Desa</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  PT Bank Mandiri (Persero) Tbk • Alokasi CSR Terbuka: Rp 1.2 Miliar untuk NGO Pelaksana Terverifikasi.
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                <span className="text-[11px] text-indigo-400 font-semibold">BUMN Tbk</span>
                <Link href="/untuk-ngo" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                  <span>Proposal Inklusi Keuangan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Open Call Card 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Sektor Telekomunikasi
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Anggaran Q3</span>
                </div>
                <p className="font-bold text-white text-base leading-snug">Infrastruktur Internet Sekolah Terpencil</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  PT Telkom Indonesia Tbk • Alokasi Terbuka: Rp 850 Juta untuk 30 Sekolah di Indonesia Timur.
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                <span className="text-[11px] text-blue-400 font-semibold">Telko BUMN</span>
                <Link href="/untuk-ngo" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                  <span>Proposal Internet Sekolah</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Open Call Card 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Sektor Energi & Pertambangan
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Anggaran Tahunan</span>
                </div>
                <p className="font-bold text-white text-base leading-snug">Program Pembinaan Desa Mandiri Energi</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  PT Adaro Energy Indonesia Tbk • Alokasi Terbuka: Rp 2.0 Miliar untuk Konservasi & Pemberdayaan.
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                <span className="text-[11px] text-purple-400 font-semibold">Emiten ESG</span>
                <Link href="/untuk-ngo" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                  <span>Proposal Desa Mandiri</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
