'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Heart,
  Search,
  ShieldCheck,
  MapPin,
  Sparkles,
  Filter,
  ArrowRight,
  ExternalLink,
  X,
  CheckCircle2,
  Building2,
  Share2,
} from 'lucide-react';

export interface DirectoryOrganization {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  orgType: string;
  isVerified: boolean;
  focusAreas: string[];
  targetRegions: string[];
  totalProgramsCount: number;
  activeProgramsCount: number;
  matchReasons?: string[];
}

interface PublicNgoDirectoryProps {
  initialOrganizations: DirectoryOrganization[];
  total: number;
  failed: boolean;
}

const CATEGORY_FILTERS = [
  { label: 'Semua Kategori', value: 'ALL' },
  { label: 'Pendidikan & Literasi', value: 'PENDIDIKAN' },
  { label: 'Kesehatan & Gizi', value: 'KESEHATAN' },
  { label: 'Lingkungan & ESG', value: 'LINGKUNGAN' },
  { label: 'Ekonomi & UMKM', value: 'EKONOMI' },
  { label: 'Sosial & Kemanusiaan', value: 'SOSIAL' },
  { label: 'Keagamaan & Ziswaf', value: 'ZISWAF' },
];

function formatOrgTypeBadge(rawType: string): string {
  const t = (rawType || '').toUpperCase();
  if (t.includes('LAZ') || t.includes('ZAKAT')) return 'LAZ / AMIL';
  if (t.includes('YAYASAN')) return 'YAYASAN';
  if (t.includes('HUMANITARIAN')) return 'LEMBAGA KEMANUSIAAN';
  if (t === 'ORGANIZATION') return 'NGO / YAYASAN';
  return t || 'LEMBAGA SOSIAL';
}

function getInitials(name: string): string {
  if (!name) return 'NGO';
  const clean = name.replace(/^(yayasan|laz|lembaga|perkumpulan)\s+/i, '');
  const parts = clean.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function PublicNgoDirectory({
  initialOrganizations,
  total,
  failed,
}: PublicNgoDirectoryProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedOrg, setSelectedOrg] = useState<DirectoryOrganization | null>(null);

  const filteredOrgs = useMemo(() => {
    return initialOrganizations.filter((org) => {
      // Search term match
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        org.name.toLowerCase().includes(q) ||
        org.orgType.toLowerCase().includes(q) ||
        org.focusAreas.some((f) => f.toLowerCase().includes(q)) ||
        org.targetRegions.some((r) => r.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      // Category filter match
      if (selectedCategory === 'ALL') return true;

      const catKeyword = selectedCategory.toLowerCase();
      const hasFocusMatch = org.focusAreas.some((f) =>
        f.toLowerCase().includes(catKeyword)
      );
      const hasNameMatch = org.name.toLowerCase().includes(catKeyword);

      return hasFocusMatch || hasNameMatch;
    });
  }, [initialOrganizations, search, selectedCategory]);

  return (
    <div className="space-y-10">
      {/* Search Bar & Category Filter */}
      <div className="space-y-5 max-w-4xl mx-auto">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama lembaga, yayasan, LAZ, pilar fokus, atau wilayah..."
            className="w-full pl-12 pr-10 py-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl text-sm font-medium text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner backdrop-blur-md"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-emerald-400" /> Kategori:
          </span>
          {CATEGORY_FILTERS.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-700/25 border border-emerald-400/30'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-3 px-2">
        <span>
          Menampilkan <strong className="text-white">{filteredOrgs.length}</strong> lembaga
          {total > 0 && total !== filteredOrgs.length ? ` (dari total ${total.toLocaleString('id-ID')})` : ''}
        </span>
        {(search || selectedCategory !== 'ALL') && (
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('ALL');
            }}
            className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
          >
            Reset Filter
          </button>
        )}
      </div>

      {/* Empty / Error Fallback */}
      {(failed || filteredOrgs.length === 0) && (
        <div className="p-12 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-4 max-w-xl mx-auto backdrop-blur-md">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
            <Heart className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-white text-base">
              {failed
                ? 'Data lembaga tidak dapat dimuat saat ini'
                : 'Tidak ada lembaga yang cocok'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {failed
                ? 'Terjadi kendala saat menyinkronkan data direktori. Silakan muat ulang halaman beberapa saat lagi.'
                : search
                ? `Tidak ditemukan lembaga dengan kata kunci "${search}". Coba gunakan kata kunci lain atau reset filter kategori.`
                : 'Belum ada lembaga yang terdaftar pada kategori yang dipilih.'}
            </p>
          </div>
          {(search || selectedCategory !== 'ALL') && (
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('ALL');
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md"
            >
              Tampilkan Semua Lembaga
            </button>
          )}
        </div>
      )}

      {/* Organization Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrgs.map((org) => {
          const badgeText = formatOrgTypeBadge(org.orgType);
          const initials = getInitials(org.name);

          return (
            <div
              key={org.id}
              onClick={() => setSelectedOrg(org)}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-4 group backdrop-blur-md cursor-pointer hover:shadow-xl hover:shadow-emerald-950/20"
            >
              <div className="space-y-4">
                {/* Header: Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 uppercase tracking-wider">
                    {badgeText}
                  </span>
                  {org.isVerified && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Terverifikasi
                    </span>
                  )}
                </div>

                {/* Identity: Avatar & Name */}
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600/30 via-teal-600/20 to-slate-800 border border-emerald-500/30 text-emerald-200 flex items-center justify-center font-black text-sm shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                      {org.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                      <span className="truncate">
                        {org.targetRegions.length > 0
                          ? org.targetRegions.join(', ')
                          : 'Jangkauan Nasional'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Focus Areas Pills */}
                <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Pilar Fokus Program:
                  </span>
                  <div className="flex flex-wrap gap-1.5 min-h-[26px]">
                    {org.focusAreas.length > 0 ? (
                      org.focusAreas.slice(0, 3).map((area) => (
                        <span
                          key={area}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800/90 text-slate-300 border border-slate-700/50"
                        >
                          {area}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-slate-500 italic">
                        Multi-Pilar Kemanusiaan & Pemberdayaan
                      </span>
                    )}
                    {org.focusAreas.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-400">
                        +{org.focusAreas.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  {org.totalProgramsCount > 0
                    ? `${org.totalProgramsCount} Program Sosial`
                    : 'Siap Bermitra CSR'}
                </span>
                <span className="text-emerald-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Detail</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedOrg && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedOrg(null)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Tutup Detail"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4 pr-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600/30 to-teal-700/20 border border-emerald-500/30 text-emerald-200 flex items-center justify-center font-black text-lg shrink-0">
                {getInitials(selectedOrg.name)}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {formatOrgTypeBadge(selectedOrg.orgType)}
                  </span>
                  {selectedOrg.isVerified && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      <ShieldCheck className="w-3.5 h-3.5" /> Terverifikasi
                    </span>
                  )}
                </div>
                <h3 className="font-extrabold text-white text-lg leading-snug">
                  {selectedOrg.name}
                </h3>
              </div>
            </div>

            {/* Modal Info Sections */}
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Wilayah Jangkauan:</span>
                  <span className="text-white font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    {selectedOrg.targetRegions.length > 0
                      ? selectedOrg.targetRegions.join(', ')
                      : 'Nasional'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Program Sosial Tercatat:</span>
                  <span className="text-white font-bold">
                    {selectedOrg.totalProgramsCount} Program Aktif
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Status Validitas Profil:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Terdaftar di Ekosistem CSRmatics
                  </span>
                </div>
              </div>

              {/* Focus Pillars */}
              <div className="space-y-1.5">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  Fokus & Pilar Program
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedOrg.focusAreas.length > 0 ? (
                    selectedOrg.focusAreas.map((f) => (
                      <span
                        key={f}
                        className="px-2.5 py-1 rounded-lg bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 font-medium"
                      >
                        {f}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500 italic">
                      Multi-Kategori (Pendidikan, Kesehatan, Lingkungan, Ziswaf)
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href="/login"
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-700/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Ajukan Kemitraan CSR</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setSelectedOrg(null)}
                className="py-3 px-4 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Promo Call to Action */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/40 border border-emerald-500/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5" />
            <span>Kemitraan Lembaga Sosial & NGO</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Lembaga atau Yayasan Anda Belum Terdaftar di Direktori?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Daftarkan program sosial lembaga Anda secara gratis agar dapat ditemukan dan didanai langsung oleh tim CSR & TJSL korporasi BUMN serta perusahaan swasta.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
          <Link
            href="/untuk-ngo"
            className="px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-700/25 transition-all text-center flex items-center justify-center gap-2"
          >
            <span>Daftarkan Lembaga</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/untuk-korporasi"
            className="px-6 py-3.5 rounded-xl text-xs font-bold text-indigo-200 bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-700/40 transition-all text-center"
          >
            Saya Korporasi
          </Link>
        </div>
      </div>
    </div>
  );
}
