'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Building2,
  Globe,
  CheckCircle2,
  Building,
  Sparkles,
  RefreshCw,
  Plus,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import CompanyTable from '@/components/companies/company-table';
import CompanyDetailModal from '@/components/companies/company-detail-modal';
import { apiClient } from '@/lib/api-client';
import { Company } from '@/types/api';

export default function CompaniesPage() {
  const router = useRouter();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Filters & Pagination
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sector, setSector] = useState('');
  const [companyCategory, setCompanyCategory] = useState('');
  const [verificationFilter, setVerificationFilter] = useState<'ALL' | 'VERIFIED' | 'PENDING'>('ALL');
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);

  // Sync searchParams from URL if present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const s = params.get('search');
      if (s) {
        setSearch(s);
        setDebouncedSearch(s);
      }
    }
  }, []);

  // Debounce search input by 300ms to avoid API race conditions
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Detail Modal State
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Live DB Stats (Dynamically Fetched from API Response)
  const [dbStats, setDbStats] = useState({
    verified_count: 0,
    tbk_bumn_count: 0,
  });

  // Fetch Companies & Stats directly from Go Backend API
  const fetchCompanies = useCallback(async () => {
    try {
      setLoading(true);

      const response: any = await apiClient.get('/companies', {
        params: {
          limit,
          offset,
          search: debouncedSearch,
          sector,
          company_type: companyCategory,
          verification_status: verificationFilter,
        },
      });

      if (response) {
        setCompanies(Array.isArray(response.data) ? response.data : []);
        setTotal(response.pagination?.total ?? 0);
        if (response.stats) {
          setDbStats({
            verified_count: response.stats.verified_count ?? 0,
            tbk_bumn_count: response.stats.tbk_bumn_count ?? 0,
          });
        }
      }
    } catch (err) {
      console.warn('API error fetching companies:', err);
    } finally {
      setLoading(false);
    }
  }, [limit, offset, debouncedSearch, sector, companyCategory, verificationFilter]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleStartProspecting = (comp: Company) => {
    router.push(`/pipeline?company=${encodeURIComponent(comp.name)}`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Corporate Directory</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              {loading && total === 0 ? 'Loading...' : `${total.toLocaleString('id-ID')} Corporate Profiles`}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Direktori resmi entitas korporat Indonesia, status verifikasi domain web, & kecerdasan CSR FundIQ.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchCompanies()}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs flex items-center gap-2 transition-colors shadow-sm"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-700' : 'text-slate-500'}`} />
            <span>Refresh Data</span>
          </button>
        </div>
      </div>

      {/* Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold border border-emerald-100/80 shadow-xs">
              <Building2 className="w-5 h-5 text-emerald-800" />
            </div>
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
              Active DB
            </span>
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Korporat
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              {loading && total === 0 ? (
                <div className="h-8 w-24 bg-slate-200 rounded animate-pulse" />
              ) : (
                <span className="text-2xl font-extrabold text-slate-900 tracking-tight">{total.toLocaleString('id-ID')}</span>
              )}
            </div>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Perbankan, BUMN, Emiten Tbk, & Swasta</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold border border-blue-100/80 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-blue-700" />
            </div>
            <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              100% Live
            </span>
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Website Terverifikasi
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              {loading && dbStats.verified_count === 0 ? (
                <div className="h-8 w-24 bg-slate-200 rounded animate-pulse" />
              ) : (
                <>
                  <span className="text-2xl font-extrabold text-slate-900 tracking-tight">{dbStats.verified_count.toLocaleString('id-ID')}</span>
                  <span className="text-xs text-slate-400 font-normal">profil</span>
                </>
              )}
            </div>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Hasil HTTP ping 200 OK & IDX API</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold border border-indigo-100/80 shadow-xs">
              <Building className="w-5 h-5 text-indigo-700" />
            </div>
            <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
              High CSR Budget
            </span>
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Emiten Tbk & BUMN Target
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              {loading && dbStats.tbk_bumn_count === 0 ? (
                <div className="h-8 w-24 bg-slate-200 rounded animate-pulse" />
              ) : (
                <>
                  <span className="text-2xl font-extrabold text-slate-900 tracking-tight">{dbStats.tbk_bumn_count.toLocaleString('id-ID')}</span>
                  <span className="text-xs text-slate-400 font-normal">entitas</span>
                </>
              )}
            </div>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Perusahaan publik beranggaran ESG besar</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold border border-amber-100/80 shadow-xs">
              <Sparkles className="w-5 h-5 text-amber-700" />
            </div>
            <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              Serper API
            </span>
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Discovery Engine
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight">Active</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Scraper enrichment sweep berjalan 24/7</p>
        </div>

      </div>

      {/* Main Companies Table Component */}
      <CompanyTable
        companies={companies}
        total={total}
        limit={limit}
        offset={offset}
        search={search}
        sector={sector}
        companyCategory={companyCategory}
        verificationFilter={verificationFilter}
        loading={loading}
        onSearchChange={(val) => {
          setSearch(val);
          setOffset(0);
        }}
        onSectorChange={(val) => {
          setSector(val);
          setOffset(0);
        }}
        onCompanyCategoryChange={(val) => {
          setCompanyCategory(val);
          setOffset(0);
        }}
        onVerificationFilterChange={(val) => {
          setVerificationFilter(val);
          setOffset(0);
        }}
        onPageChange={(newOffset) => setOffset(newOffset)}
        onSelectCompany={(comp) => {
          setSelectedCompany(comp);
          setIsModalOpen(true);
        }}
        onStartProspecting={handleStartProspecting}
      />

      {/* Detail Slide-over Modal */}
      <CompanyDetailModal
        company={selectedCompany}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStartProspecting={handleStartProspecting}
      />

    </div>
  );
}
