'use client';

import React, { useState } from 'react';
import { Building2, Heart, Search, ShieldCheck, Sparkles } from 'lucide-react';

export default function InteractiveDemo() {
  const [demoMode, setDemoMode] = useState<'CORP_TO_NGO' | 'NGO_TO_CORP'>('CORP_TO_NGO');
  const [demoQuery, setDemoQuery] = useState('PT Bank Central Asia Tbk');
  const [selectedTab, setSelectedTab] = useState<'match' | 'profile' | 'proposal'>('match');

  return (
    <div className="space-y-8">
      {/* Directional Toggle Bar (Corporate -> NGO vs NGO -> Corporate) */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 bg-slate-900 border border-slate-800 rounded-2xl shadow-lg">
          <button
            onClick={() => {
              setDemoMode('CORP_TO_NGO');
              setDemoQuery('PT Bank Central Asia Tbk');
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              demoMode === 'CORP_TO_NGO'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Perspektif Korporasi → NGO</span>
          </button>
          <button
            onClick={() => {
              setDemoMode('NGO_TO_CORP');
              setDemoQuery('Yayasan Literasi Nusantara');
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              demoMode === 'NGO_TO_CORP'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Perspektif NGO → Korporasi</span>
          </button>
        </div>
      </div>

      {/* Interactive Mock Dashboard Preview Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Mock Top Control Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={demoQuery}
                onChange={(e) => setDemoQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-white focus:outline-none focus:border-emerald-500 transition-all"
                placeholder={demoMode === 'CORP_TO_NGO' ? 'Ketik nama korporasi...' : 'Ketik nama NGO/Program...'}
              />
            </div>
          </div>

          {/* Mock Tabs */}
          <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setSelectedTab('match')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedTab === 'match'
                  ? demoMode === 'CORP_TO_NGO' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              AI Match Score ({demoMode === 'CORP_TO_NGO' ? '94.8%' : '96.2%'})
            </button>
            <button
              onClick={() => setSelectedTab('profile')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedTab === 'profile'
                  ? demoMode === 'CORP_TO_NGO' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Status Verification
            </button>
            <button
              onClick={() => setSelectedTab('proposal')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedTab === 'proposal'
                  ? demoMode === 'CORP_TO_NGO' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Draf Icebreaker Pitch
            </button>
          </div>

        </div>

        {/* Demo Content Preview */}
        <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg border ${
                demoMode === 'CORP_TO_NGO' 
                  ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' 
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              }`}>
                {demoMode === 'CORP_TO_NGO' ? <Building2 className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-white text-base">{demoQuery}</p>
                  {demoMode === 'CORP_TO_NGO' ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      BBCA
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      NGO TERVERIFIKASI
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400">
                  {demoMode === 'CORP_TO_NGO' ? 'Sektor Perbankan & Jasa Keuangan' : 'Fokus: Beasiswa Digital & Pendidikan Desa'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{demoMode === 'CORP_TO_NGO' ? 'https://www.bca.co.id (Verified 200 OK)' : 'Legalitas Yayasan Terverifikasi (Kemenkumham)'}</span>
              </span>
            </div>
          </div>

          {selectedTab === 'match' && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  {demoMode === 'CORP_TO_NGO' 
                    ? 'Rekomendasi Program NGO Cocok: Beasiswa Digital Berkelanjutan (Match 94.8%)' 
                    : 'Rekomendasi Donor Korporasi Cocok: PT Bank Central Asia Tbk (Match 96.2%)'}
                </span>
                <span className="text-slate-400 font-semibold">
                  {demoMode === 'CORP_TO_NGO' ? 'Potensi Anggaran: Rp 1,5 Miliar' : 'Estimasi Alokasi Pilar: Rp 500 Juta'}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {demoMode === 'CORP_TO_NGO' 
                  ? 'Program "Bakti BCA Education & Digital Literacy" memiliki relevansi sangat tinggi dengan Program Beasiswa Digital milik Yayasan Literasi Nusantara (Asnaf: Fisabilillah/Fakir).'
                  : 'Pilar CSR Bakti BCA saat ini memprioritaskan literasi digital di 12 provinsi target. Program Beasiswa Digital Anda memenuhi 100% kriteria penerima manfaat mereka.'}
              </p>
            </div>
          )}

          {selectedTab === 'profile' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block uppercase tracking-wider text-[10px]">
                  {demoMode === 'CORP_TO_NGO' ? 'Pilar Utama CSR' : 'Cakupan Wilayah'}
                </span>
                <span className="font-semibold text-white mt-1 block">
                  {demoMode === 'CORP_TO_NGO' ? 'Bakti BCA, Pendidikan, Lingkungan' : 'Jawa Barat, Jawa Tengah, NTT'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block uppercase tracking-wider text-[10px]">
                  {demoMode === 'CORP_TO_NGO' ? 'Mitra NGO Historis' : 'Track Record Program'}
                </span>
                <span className="font-semibold text-white mt-1 block">
                  {demoMode === 'CORP_TO_NGO' ? 'Baznas, Kitabisa, Kick Andy' : '1.200+ Alumni Beasiswa'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block uppercase tracking-wider text-[10px]">
                  {demoMode === 'CORP_TO_NGO' ? 'Kontak PIC CSR' : 'Legalitas & Akreditasi'}
                </span>
                <span className="font-semibold text-emerald-400 mt-1 block">
                  {demoMode === 'CORP_TO_NGO' ? 'csr@bca.co.id' : 'Sk Kemenkumham AHU-0012948'}
                </span>
              </div>
            </div>
          )}

          {selectedTab === 'proposal' && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <span className="text-slate-400 font-mono text-[11px] block">Generated AI Executive Icebreaker:</span>
              <p className="text-slate-200 italic leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                {demoMode === 'CORP_TO_NGO' 
                  ? '"Yth. Tim Bakti BCA, seiring komitmen Bakti BCA dalam literasi digital, Yayasan Literasi Nusantara mengundang sinergi Program Beasiswa Digital Berkelanjutan untuk 500 penerima manfaat..."'
                  : '"Yth. Head of Corporate Sustainability BCA, kami dari Yayasan Literasi Nusantara melihat keselarasan tinggi antara fokus Bakti BCA dan program 500 Beasiswa Digital Desa kami..."'}
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
