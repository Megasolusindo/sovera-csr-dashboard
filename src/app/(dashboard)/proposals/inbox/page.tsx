'use client';

import React, { useState } from 'react';
import {
  Inbox,
  Search,
  FileText,
  Calendar,
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Filter,
} from 'lucide-react';

const mockProposals = [
  {
    id: 'prop-101',
    title: 'Proposal Hibah Alat Pengolah Sampah Organik Desa Pesisir',
    ngoName: 'Yayasan Konservasi Mangrove Indonesia',
    submissionDate: '2026-09-14',
    targetBudget: 'Rp 250.000.000',
    category: 'Lingkungan & ESG',
    status: 'UNDER_REVIEW',
    summary: 'Program pengolahan sampah organik dan pemulihan ekosistem mangrove di pesisir Jawa Timur.',
  },
  {
    id: 'prop-102',
    title: 'Program Beasiswa Coding & Talenta Digital Anak Yatim',
    ngoName: 'LAZ Peduli Ummat',
    submissionDate: '2026-09-12',
    targetBudget: 'Rp 180.000.000',
    category: 'Pendidikan',
    status: 'SUBMITTED',
    summary: 'Beasiswa pelatihan web development dan kecerdasan buatan untuk 50 siswa SMK berprestasi.',
  },
  {
    id: 'prop-103',
    title: 'Revitalisasi Posyandu & Pencegahan Stunting Anak Balita',
    ngoName: 'Dompet Kemanusiaan Sejahtera',
    submissionDate: '2026-09-10',
    targetBudget: 'Rp 320.000.000',
    category: 'Kesehatan',
    status: 'ACCEPTED',
    summary: 'Penyediaan gizi tambahan dan pelatihan imunisasi untuk 1.200 ibu hamil di Jawa Barat.',
  },
];

export default function ProposalsInboxPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredProposals = mockProposals.filter((prop) => {
    const matchesSearch = prop.title.toLowerCase().includes(search.toLowerCase()) || prop.ngoName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || prop.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Proposal Masuk</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              CSR Opportunity Inbox
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Daftar proposal program CSR/TJSL yang diajukan oleh mitra NGO terverifikasi
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari judul proposal atau lembaga pengaju..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
        </div>

        <div className="sm:w-56">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Semua Status</option>
            <option value="SUBMITTED">Proposal Baru</option>
            <option value="UNDER_REVIEW">Dalam Penilaian</option>
            <option value="ACCEPTED">Disetujui</option>
          </select>
        </div>
      </div>

      {/* Proposal Cards List */}
      <div className="space-y-4">
        {filteredProposals.map((prop) => (
          <div
            key={prop.id}
            className="bg-white p-5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all space-y-3"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">{prop.category}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {prop.submissionDate}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg hover:text-indigo-600 transition-colors cursor-pointer">
                  {prop.title}
                </h3>
                <p className="text-xs font-medium text-indigo-700 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" />
                  {prop.ngoName}
                </p>
              </div>

              <div className="text-right">
                <div className="text-base font-bold text-slate-900">{prop.targetBudget}</div>
                <span
                  className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    prop.status === 'ACCEPTED'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : prop.status === 'UNDER_REVIEW'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  }`}
                >
                  {prop.status === 'ACCEPTED' ? 'Disetujui' : prop.status === 'UNDER_REVIEW' ? 'Review Penilaian' : 'Proposal Baru'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
              {prop.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
