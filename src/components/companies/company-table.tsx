'use client';

import React from 'react';
import {
  Search,
  Filter,
  Globe,
  ExternalLink,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Eye,
  Send,
  Building2,
  X,
} from 'lucide-react';
import { Company } from '@/types/api';

interface CompanyTableProps {
  companies: Company[];
  total: number;
  limit: number;
  offset: number;
  search: string;
  sector: string;
  companyCategory?: string;
  verificationFilter: 'ALL' | 'VERIFIED' | 'PENDING';
  loading: boolean;
  onSearchChange: (search: string) => void;
  onSectorChange: (sector: string) => void;
  onCompanyCategoryChange?: (category: string) => void;
  onVerificationFilterChange: (filter: 'ALL' | 'VERIFIED' | 'PENDING') => void;
  onPageChange: (newOffset: number) => void;
  onSelectCompany: (company: Company) => void;
  onStartProspecting: (company: Company) => void;
}

const SECTORS = [
  'Semua Sektor',
  'Perbankan & Keuangan',
  'Energi & Pertambangan',
  'FMCG & Konsumsi',
  'Telekomunikasi & Teknologi',
  'Farmasi & Kesehatan',
  'Infrastruktur & Konstruksi',
  'Properti & Real Estate',
  'Logistik & Transportasi',
  'Ritel & Perdagangan',
];

const CATEGORIES = [
  { label: 'Semua Kategori', value: '' },
  { label: 'Emiten Tbk (Public)', value: 'SWASTA_TBK' },
  { label: 'BUMN & Subsidiari', value: 'BUMN' },
  { label: 'Swasta Nasional & MNC', value: 'SWASTA' },
  { label: 'Korporasi Umum', value: 'CORPORATE' },
];

export default function CompanyTable({
  companies,
  total,
  limit,
  offset,
  search,
  sector,
  companyCategory = '',
  verificationFilter,
  loading,
  onSearchChange,
  onSectorChange,
  onCompanyCategoryChange,
  onVerificationFilterChange,
  onPageChange,
  onSelectCompany,
  onStartProspecting,
}: CompanyTableProps) {
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit) || 1;

  const getBadgeType = (name: string, ticker?: string) => {
    if (ticker && ticker.trim() !== '') {
      return { label: 'Tbk (Public)', color: 'bg-indigo-50 text-indigo-700 border-indigo-200/80' };
    }
    if (name.includes('(Persero)') || name.includes('BUMN')) {
      return { label: 'BUMN', color: 'bg-emerald-50 text-emerald-800 border-emerald-200/80' };
    }
    if (name.includes('BPR') || name.includes('PERUMDA') || name.includes('BPD')) {
      return { label: 'BUMD / Perbankan Daerah', color: 'bg-blue-50 text-blue-700 border-blue-200/80' };
    }
    return { label: 'Swasta / Private', color: 'bg-slate-100 text-slate-700 border-slate-200/80' };
  };

  return (
    <div className="space-y-4">
      {/* Controls & Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full lg:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari nama korporat / ticker / ID..."
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all placeholder:text-slate-400 shadow-inner"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-start lg:justify-end">
          {/* Category Select */}
          <div className="relative flex items-center min-w-[180px]">
            <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 pointer-events-none z-10" />
            <select
              value={companyCategory}
              onChange={(e) => onCompanyCategoryChange && onCompanyCategoryChange(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all appearance-none cursor-pointer shadow-sm"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
          </div>

          {/* Sector Select */}
          <div className="relative flex items-center min-w-[180px]">
            <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 pointer-events-none z-10" />
            <select
              value={sector}
              onChange={(e) => onSectorChange(e.target.value === 'Semua Sektor' ? '' : e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all appearance-none cursor-pointer shadow-sm"
            >
              {SECTORS.map((s) => (
                <option key={s} value={s === 'Semua Sektor' ? '' : s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/50">
            <button
              onClick={() => onVerificationFilterChange('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                verificationFilter === 'ALL'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => onVerificationFilterChange('VERIFIED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                verificationFilter === 'VERIFIED'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Domain Terverifikasi</span>
            </button>
            <button
              onClick={() => onVerificationFilterChange('PENDING')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                verificationFilter === 'PENDING'
                  ? 'bg-white text-amber-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Dalam Antrean</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                <th className="py-4 px-6 min-w-[280px]">Entitas Korporat</th>
                <th className="py-4 px-6 min-w-[150px]">Kategori</th>
                <th className="py-4 px-6 min-w-[200px]">Situs Web Resmi</th>
                <th className="py-4 px-6 min-w-[200px]">Sektor Industri</th>
                <th className="py-4 px-6 min-w-[130px] text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-slate-400 font-medium">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-7 h-7 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-slate-500 font-semibold">Memuat data korporat...</span>
                    </div>
                  </td>
                </tr>
              ) : companies.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-slate-400 font-medium">
                    <div className="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto">
                      <Building2 className="w-8 h-8 text-slate-300" />
                      <span className="text-slate-700 font-bold text-sm">Tidak Ada Data Ditemukan</span>
                      <span className="text-xs text-slate-400">
                        Tidak ada entitas korporat yang sesuai dengan kriteria kata kunci atau filter pencarian.
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                companies.map((comp) => {
                  const badge = getBadgeType(comp.name, comp.ticker);
                  const isVerified = Boolean(comp.website && comp.website.trim() !== '');

                  return (
                    <tr
                      key={comp.id}
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                      onClick={() => onSelectCompany(comp)}
                    >
                      {/* Name & Ticker */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3.5">
                          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-sm flex items-center justify-center shrink-0 border border-emerald-200/70 group-hover:scale-105 transition-transform shadow-xs">
                            {comp.name.charAt(0)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors flex items-center gap-2 whitespace-nowrap">
                              <span className="max-w-[260px] md:max-w-[340px] truncate" title={comp.name}>
                                {comp.name}
                              </span>
                              {comp.ticker && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 shrink-0">
                                  {comp.ticker}
                                </span>
                              )}
                              {comp.priority_tier === 'TIER_1' && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200/80 shrink-0 flex items-center gap-0.5" title="Prioritas Utama: High CSR Budget">
                                  ⚡ Tier 1
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400 font-normal block truncate">
                              ID: {comp.id.slice(0, 8)}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Badge Category */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex flex-col items-start gap-1">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${badge.color}`}>
                            {badge.label}
                          </span>
                          {comp.csr_category && (
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${
                              comp.csr_category === 'SANGAT_AKTIF' 
                                ? 'text-emerald-700 font-extrabold' 
                                : comp.csr_category === 'AKTIF' 
                                ? 'text-blue-700' 
                                : 'text-slate-400'
                            }`}>
                              ● {comp.csr_category.replace('_', ' ')}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Website */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        {isVerified ? (
                          <a
                            href={comp.website!}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/80 font-semibold text-[11px] transition-colors"
                          >
                            <Globe className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="max-w-[150px] truncate">{comp.website?.replace(/^https?:\/\//, '')}</span>
                            <ExternalLink className="w-3 h-3 text-emerald-500 shrink-0" />
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200/80 text-[11px] font-medium italic">
                            <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>Discovery Pending</span>
                          </span>
                        )}
                      </td>

                      {/* Industry Sector */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="text-xs">{comp.industry_sector || 'Perbankan & Jasa Keuangan'}</span>
                        </div>
                      </td>

                      {/* Quick Actions */}
                      <td className="py-4 px-6 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onSelectCompany(comp)}
                            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                            title="Lihat Detail Profil"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onStartProspecting(comp)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-[11px] flex items-center gap-1.5 shadow-sm shadow-emerald-700/20 transition-all hover:scale-[1.02]"
                          >
                            <Send className="w-3 h-3" />
                            <span>Prospect</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 bg-slate-50/60 border-t border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
          <div>
            Menampilkan <span className="font-bold text-slate-900">{offset + 1}</span> -{' '}
            <span className="font-bold text-slate-900">{Math.min(offset + limit, total)}</span> dari{' '}
            <span className="font-bold text-slate-900">{total.toLocaleString('id-ID')}</span> entitas korporat
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={offset === 0 || loading}
              onClick={() => onPageChange(Math.max(0, offset - limit))}
              className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-slate-700 shadow-xs"
              title="Halaman Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 font-semibold text-slate-800 bg-white border border-slate-200/80 rounded-lg shadow-xs">
              Halaman {currentPage} dari {totalPages}
            </span>
            <button
              disabled={offset + limit >= total || loading}
              onClick={() => onPageChange(offset + limit)}
              className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-slate-700 shadow-xs"
              title="Halaman Selanjutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
