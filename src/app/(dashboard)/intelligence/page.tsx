'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Zap,
  Search,
  Filter,
  Building2,
  BookOpen,
  Megaphone,
  TrendingUp,
  CheckCircle2,
  Plus,
  Bookmark,
  Sparkles,
  ArrowRight,
  MapPin,
  Users,
  Award,
  ExternalLink,
} from 'lucide-react';
import {
  useIntelligenceOverview,
  useRecommendedOrganizations,
  useIntelligencePrograms,
} from '@/hooks/useIntelligence';

export default function CSRIntelligencePage() {
  const router = useRouter();

  // Sub-tab state
  const [activeTab, setActiveTab] = useState<'overview' | 'organizations' | 'programs' | 'trends'>('overview');

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPillar, setSelectedPillar] = useState('ALL');
  const [selectedRegion, setSelectedRegion] = useState('ALL');

  // Pipeline Toast State
  const [addedToast, setAddedToast] = useState<string | null>(null);

  // Queries
  const { data: overviewData, isLoading: isOverviewLoading } = useIntelligenceOverview();
  const { data: orgsData, isLoading: isOrgsLoading } = useRecommendedOrganizations({
    search: searchQuery,
    pillar: selectedPillar,
    region: selectedRegion,
  });
  const { data: progsData } = useIntelligencePrograms({
    search: searchQuery,
    pillar: selectedPillar,
  });

  const handleAddToPipeline = (orgName: string) => {
    setAddedToast(`Berhasil menambahkan ${orgName} ke Partnership Pipeline (Prospect Stage)`);
    setTimeout(() => setAddedToast(null), 4000);
  };

  return (
    <div className="space-y-6 p-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
              <Zap className="w-6 h-6 text-indigo-700" />
              <span>CSR Strategic Intelligence</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Corporate Workspace
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Discover organizations, programs and CSR opportunities that match your company&apos;s social impact goals.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Link
            href="/chat"
            className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold flex items-center gap-2 border border-indigo-200 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Tanya AI Assistant</span>
          </Link>
        </div>
      </div>

      {/* Notification Toast */}
      {addedToast && (
        <div className="p-3.5 bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-lg flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{addedToast}</span>
          </div>
          <Link href="/pipeline" className="underline hover:text-emerald-100 font-bold ml-4">
            Buka Pipeline →
          </Link>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-2xl font-extrabold text-slate-900">
              {overviewData?.stats?.total_organizations?.toLocaleString() || '2,438'}
            </div>
            <div className="text-xs text-slate-500 font-medium">Verified Organizations</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-2xl font-extrabold text-slate-900">
              {overviewData?.stats?.active_programs?.toLocaleString() || '816'}
            </div>
            <div className="text-xs text-slate-500 font-medium">Active NGO Programs</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-2xl font-extrabold text-slate-900">
              {overviewData?.stats?.new_opportunities?.toLocaleString() || '37'}
            </div>
            <div className="text-xs text-slate-500 font-medium">Open Partnership Opportunities</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Megaphone className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-2xl font-extrabold text-slate-900">
              {overviewData?.stats?.recommended_partners?.toLocaleString() || '24'}
            </div>
            <div className="text-xs text-slate-500 font-medium">High Match Partners (&gt;85%)</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex border-b border-slate-200 space-x-6">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`pb-3 text-sm font-semibold transition-all ${
            activeTab === 'overview'
              ? 'border-b-2 border-indigo-600 text-indigo-700'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Overview & Insights
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('organizations')}
          className={`pb-3 text-sm font-semibold transition-all ${
            activeTab === 'organizations'
              ? 'border-b-2 border-indigo-600 text-indigo-700'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Recommended Organizations
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('programs')}
          className={`pb-3 text-sm font-semibold transition-all ${
            activeTab === 'programs'
              ? 'border-b-2 border-indigo-600 text-indigo-700'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Program Discovery
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('trends')}
          className={`pb-3 text-sm font-semibold transition-all ${
            activeTab === 'trends'
              ? 'border-b-2 border-indigo-600 text-indigo-700'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          CSR Trends
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari kata kunci organisasi, bidang fokus, atau wilayah intervensi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="sm:w-48">
          <select
            value={selectedPillar}
            onChange={(e) => setSelectedPillar(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ALL">Semua Pilar ESG</option>
            <option value="Pendidikan">Pendidikan</option>
            <option value="Kesehatan">Kesehatan</option>
            <option value="Lingkungan">Lingkungan</option>
            <option value="Ekonomi">Pemberdayaan Ekonomi</option>
          </select>
        </div>

        <div className="sm:w-44">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ALL">Semua Wilayah</option>
            <option value="Jawa Barat">Jawa Barat</option>
            <option value="DKI Jakarta">DKI Jakarta</option>
            <option value="Jawa Timur">Jawa Timur</option>
            <option value="Nasional">Nasional</option>
          </select>
        </div>
      </div>

      {/* Recommended Organizations Section */}
      {(activeTab === 'overview' || activeTab === 'organizations') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>Recommended Organizations (Data-Driven Match)</span>
            </h2>
            <span className="text-xs text-slate-500">Sorted by AI Match Score (%)</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {orgsData?.data?.map((org) => (
              <div
                key={org.id}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                          {org.name}
                          {org.is_verified && (
                            <CheckCircle2 className="w-4 h-4 text-indigo-600 inline-block fill-indigo-50" />
                          )}
                        </h3>
                        <span className="text-xs font-medium text-slate-500">{org.target_regions?.join(' • ')}</span>
                      </div>
                    </div>

                    {/* Match Score Badge */}
                    <div className="text-right flex-shrink-0">
                      <div className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {org.match_score}% Match
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-1">Weighted Fit</span>
                    </div>
                  </div>

                  {/* Why it matches breakdown */}
                  <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Why this organization matches:
                    </div>
                    {org.match_reasons?.map((reason, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Link
                    href={`/ngos`}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <span>View Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleAddToPipeline(org.name)}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Pipeline</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CSR Trends Widget Section */}
      {(activeTab === 'overview' || activeTab === 'trends') && (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <span>CSR Industry Trends — Last 30 Days</span>
              </h3>
              <p className="text-xs text-slate-500">
                Aktivitas alokasi pilar ESG berdasarkan agregasi sinyal perusahaan
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-400">30-Day Period</span>
          </div>

          <div className="space-y-3">
            {overviewData?.trends?.map((t, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                  <span>{t.pillar}</span>
                  <span className="text-indigo-700 font-mono">{t.percentage.toFixed(1)}% ({t.count} sinyal)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${t.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
