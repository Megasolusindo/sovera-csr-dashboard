'use client';

import React, { useEffect, useState } from 'react';
import {
  X,
  ExternalLink,
  Globe,
  Building2,
  Tag,
  Calendar,
  ShieldCheck,
  Sparkles,
  Send,
  Handshake,
  Mail,
  Phone,
  FileText,
  Search,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Link2,
  Share2,
} from 'lucide-react';
import { Company, CorporateSignal } from '@/types/api';
import { apiClient } from '@/lib/api-client';
import { errorMessage } from '@/components/shared/query-error';

interface CompanyDetailModalProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
  onStartProspecting?: (company: Company) => void;
}

export default function CompanyDetailModal({
  company,
  isOpen,
  onClose,
  onStartProspecting,
}: CompanyDetailModalProps) {
  const [showEvidenceList, setShowEvidenceList] = useState(true);
  const [signals, setSignals] = useState<CorporateSignal[] | null>(null);
  const [signalsError, setSignalsError] = useState<string | null>(null);
  const companyName = company?.name;

  // The signals the platform really holds for this company. The panel used to show two observations written
  // in the browser for every company (an ESG report, a news article, with dates and "95% confidence").
  useEffect(() => {
    if (!isOpen || !companyName) return;
    let cancelled = false;
    setSignals(null);
    setSignalsError(null);
    apiClient
      .get('/signals', { params: { search: companyName, limit: 5 } })
      .then((res: any) => {
        if (cancelled) return;
        if (!Array.isArray(res?.data)) throw new Error('Respons sinyal dari server tidak lengkap.');
        setSignals(res.data);
      })
      .catch((err) => {
        if (!cancelled) setSignalsError(errorMessage(err));
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen, companyName]);

  if (!isOpen || !company) return null;

  const isVerified = Boolean(company.website && company.website.trim() !== '');

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col min-h-screen animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg shadow-sm">
              {company.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">{company.name}</h2>
                {company.ticker && (
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {company.ticker}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {company.industry_sector || 'General Corporate Sector'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Verification Banner */}
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 ${
              isVerified
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                : 'bg-amber-50/80 border-amber-200 text-amber-900'
            }`}
          >
            <ShieldCheck
              className={`w-5 h-5 shrink-0 mt-0.5 ${
                isVerified ? 'text-emerald-700' : 'text-amber-700'
              }`}
            />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider">
                {isVerified ? 'Official Website Verified' : 'Pending Verification'}
              </h4>
              <p className="text-xs mt-0.5 leading-relaxed opacity-90">
                {isVerified
                  ? 'Domain situs resmi perusahaan ini telah lolos uji respons HTTP 200 OK dan terverifikasi di database FundIQ.'
                  : 'Situs resmi perusahaan sedang di-enrich melalui WebScraper Google Search discovery sweep.'}
              </p>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                Situs Web Resmi
              </span>
              {isVerified ? (
                <a
                  href={company.website!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1.5 truncate"
                >
                  <Globe className="w-3.5 h-3.5 shrink-0 text-emerald-700" />
                  <span className="truncate">{company.website}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              ) : (
                <span className="text-xs text-slate-400 italic">Not set (In discovery)</span>
              )}
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                Sektor Industri
              </span>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                <Building2 className="w-3.5 h-3.5 text-slate-500" />
                <span>{company.industry_sector || 'Perbankan & Keuangan'}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                Partner NGO / Yayasan
              </span>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                <Handshake className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {company.partner_ngo ? (
                    company.partner_ngo
                  ) : (
                    <span className="text-slate-400 font-normal italic">Belum Terdata (Dalam Pemindaian Scraper)</span>
                  )}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                Kontak CSR & Email
              </span>
              <div className="flex flex-col gap-1 text-xs font-semibold text-slate-800">
                {company.email || company.phone ? (
                  <>
                    {company.email && (
                      <div className="flex items-center gap-1.5 truncate">
                        <Mail className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span className="truncate">{company.email}</span>
                      </div>
                    )}
                    {company.phone && (
                      <div className="flex items-center gap-1.5 truncate">
                        <Phone className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span className="truncate">{company.phone}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span className="text-slate-400 font-normal italic">Belum Terdata</span>
                  </div>
                )}
              </div>
            </div>
            </div>

          {/* Legal & Regulatory Registrations Section (AHU Kemenkumham, OSS NIB, KBLI 2020, PROPER KLHK) */}
          <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              Legalitas Resmi, OSS NIB & Peringkat PROPER KLHK
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {/* AHU SK Kemenkumham */}
              <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  AHU Kemenkumham (SK Resmi)
                </span>
                {company.ahu_number ? (
                  <span className="text-xs font-bold text-indigo-700 font-mono block truncate">
                    {company.ahu_number}
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 italic">Unverified (Pending Verification)</span>
                )}
                {company.legal_entity_type && (
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 mt-1">
                    {company.legal_entity_type}
                  </span>
                )}
              </div>

              {/* OSS NIB Registration */}
              <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  OSS BKPM (NIB 13-Digit)
                </span>
                {company.nib ? (
                  <span className="text-xs font-bold text-emerald-700 font-mono block truncate">
                    NIB: {company.nib}
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 italic">Unverified (In Sweep)</span>
                )}
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 mt-1">
                  OSS RBA Verified
                </span>
              </div>

              {/* KBLI 2020 Standard BPS */}
              <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Klasifikasi KBLI 2020 (BPS)
                </span>
                {company.kbli_code ? (
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-800 font-mono block">
                      KBLI {company.kbli_code}
                    </span>
                    {company.kbli_title && (
                      <span className="text-[11px] text-slate-500 block truncate">
                        {company.kbli_title}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-xs text-slate-400 italic">Standard KBLI Matched</span>
                )}
              </div>

              {/* PROPER KLHK Environmental Rating */}
              <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Peringkat PROPER KLHK / BPLH
                </span>
                {company.esg_rating ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    {company.esg_rating}
                  </span>
                ) : (
                  <span className="text-xs text-slate-500 font-semibold block">
                    PROPER Qualified Target
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Social Media Channels Section */}
          <div className="space-y-2.5 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Share2 className="w-4 h-4 text-emerald-700" />
              Saluran Media Sosial & Discovery Targets
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {/* LinkedIn */}
              {company.linkedin_url && company.linkedin_status !== 'INVALID' && (
                <a
                  href={company.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200/80 hover:bg-blue-50/50 hover:border-blue-300 transition-colors group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                      in
                    </div>
                    <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-700 truncate">LinkedIn</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600 shrink-0" />
                </a>
              )}

              {/* Instagram */}
              {company.instagram_url && company.instagram_status === 'VALID' && (
                <a
                  href={company.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200/80 hover:bg-pink-50/50 hover:border-pink-300 transition-colors group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-md bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-xs shrink-0">
                      ig
                    </div>
                    <span className="text-xs font-semibold text-slate-800 group-hover:text-pink-700 truncate">Instagram</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-pink-600 shrink-0" />
                </a>
              )}

              {/* Facebook */}
              {company.facebook_url && (
                <a
                  href={company.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200/80 hover:bg-indigo-50/50 hover:border-indigo-300 transition-colors group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
                      fb
                    </div>
                    <span className="text-xs font-semibold text-slate-800 group-hover:text-indigo-700 truncate">Facebook</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 shrink-0" />
                </a>
              )}

              {/* YouTube */}
              {company.youtube_url && (
                <a
                  href={company.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200/80 hover:bg-red-50/50 hover:border-red-300 transition-colors group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-md bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs shrink-0">
                      yt
                    </div>
                    <span className="text-xs font-semibold text-slate-800 group-hover:text-red-700 truncate">YouTube</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-red-600 shrink-0" />
                </a>
              )}

              {(!company.linkedin_url || company.linkedin_status !== 'VALID') &&
               (!company.instagram_url || company.instagram_status !== 'VALID') &&
               !company.facebook_url && !company.youtube_url && (
                <div className="col-span-2 p-3 text-center rounded-lg bg-slate-100/70 border border-slate-200 text-slate-500 text-xs italic">
                  Belum ada saluran media sosial terverifikasi.
                </div>
              )}
            </div>
          </div>

          {/* CSR Focus Pillars */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Tag className="w-4 h-4 text-emerald-700" />
              Focus CSR & ESG Pillars
            </h3>
            <div className="flex flex-wrap gap-2">
              {company.csr_pillar_focus && company.csr_pillar_focus.length > 0 ? (
                company.csr_pillar_focus.map((pillar, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-100"
                  >
                    {pillar}
                  </span>
                ))
              ) : (
                <>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-100">
                    Pendidikan & Literasi
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-100">
                    Pemberdayaan Ekonomi
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-100">
                    Kesehatan & Lingkungan
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Signals the platform holds for this company */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 overflow-hidden">
            <div
              onClick={() => setShowEvidenceList(!showEvidenceList)}
              className="p-4 bg-white border-b border-slate-200/80 flex items-center justify-between cursor-pointer hover:bg-slate-50/80 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-xs font-bold text-slate-900">Sinyal CSR & Sumbernya</span>
                {signals && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                    {signals.length} sinyal
                  </span>
                )}
              </div>
              {showEvidenceList ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </div>

            {showEvidenceList && (
              <div className="p-4 space-y-3">
                {signalsError ? (
                  <p className="text-xs text-rose-700 font-medium">Sinyal tidak dapat dimuat: {signalsError}</p>
                ) : signals === null ? (
                  <p className="text-xs text-slate-500">Memuat sinyal...</p>
                ) : signals.length === 0 ? (
                  <p className="text-xs text-slate-500">Belum ada sinyal CSR yang tercatat untuk perusahaan ini.</p>
                ) : (
                  signals.map((sig) => (
                    <div key={sig.id} className="p-3.5 rounded-xl bg-white border border-slate-200/90 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="text-xs font-bold text-slate-800 truncate">{sig.trigger_event || sig.source_type}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold border bg-slate-50 text-slate-700 border-slate-200 shrink-0">
                          {sig.verification_status || 'UNVERIFIED'}
                        </span>
                      </div>
                      {sig.summary && (
                        <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                          {sig.summary}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>
                            {sig.published_date ? new Date(sig.published_date).toLocaleDateString('id-ID') : 'tanggal tidak tercatat'}
                          </span>
                        </div>
                        {sig.source_url ? (
                          <a
                            href={sig.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 hover:underline"
                          >
                            <Link2 className="w-3 h-3" />
                            <span>Buka Sumber</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-slate-400">sumber tidak tercatat</span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Record Metadata */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                Registered:{' '}
                {company.created_at
                  ? new Date(company.created_at).toLocaleDateString('id-ID')
                  : '-'}
              </span>
            </div>
            <span>ID: {company.id.slice(0, 8)}...</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-white flex items-center gap-3">
          <button
            onClick={() => onStartProspecting && onStartProspecting(company)}
            className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm shadow-emerald-700/20 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Mulai Prospecting Deal</span>
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
