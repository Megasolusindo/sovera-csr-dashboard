'use client';

import React, { useState } from 'react';
import {
  Building2,
  Search,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Award,
  Users,
  MapPin,
  Filter,
} from 'lucide-react';

const mockNGOs = [
  {
    id: 'ngo-1',
    name: 'LAZ Peduli Ummat',
    category: 'Zakat & Wakaf Institution',
    verified: true,
    rating: 'A (Unggul)',
    location: 'Jakarta Selatan',
    activePrograms: 14,
    beneficiariesCount: '45,000+',
    focusAreas: ['Pendidikan', 'Pemberdayaan Ekonomi', 'Kesehatan'],
  },
  {
    id: 'ngo-2',
    name: 'Yayasan Konservasi Mangrove Indonesia',
    category: 'Environment Conservation',
    verified: true,
    rating: 'A (Unggul)',
    location: 'Surabaya',
    activePrograms: 8,
    beneficiariesCount: '12,500+',
    focusAreas: ['Restorasi Pesisir', 'Keanekaragaman Hayati', 'Ekowisata'],
  },
  {
    id: 'ngo-3',
    name: 'Dompet Kemanusiaan Sejahtera',
    category: 'Humanitarian & Disaster Relief',
    verified: true,
    rating: 'A (Unggul)',
    location: 'Bandung',
    activePrograms: 19,
    beneficiariesCount: '80,000+',
    focusAreas: ['Tanggap Bencana', 'WASH', 'Kesehatan Ibu & Anak'],
  },
  {
    id: 'ngo-4',
    name: 'Yayasan Beasiswa Nusantara',
    category: 'Education & Literacy',
    verified: true,
    rating: 'B (Baik)',
    location: 'Yogyakarta',
    activePrograms: 6,
    beneficiariesCount: '5,000+',
    focusAreas: ['Beasiswa Digital', 'Pelatihan Coding', 'Bimbingan Karir'],
  },
];

export default function NGODirectoryPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredNGOs = mockNGOs.filter((ngo) => {
    const matchesSearch = ngo.name.toLowerCase().includes(search.toLowerCase()) || ngo.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || ngo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">NGO Directory</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Verified Partners
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Direktori Lembaga NGO, Yayasan, dan Pengelola Program CSR/TJSL Terverifikasi
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari nama lembaga, lokasi, atau bidang fokus..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
        </div>

        <div className="sm:w-64">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Semua Kategori</option>
            <option value="Zakat & Wakaf Institution">Zakat & Wakaf</option>
            <option value="Environment Conservation">Lingkungan & ESG</option>
            <option value="Humanitarian & Disaster Relief">Kemanusiaan & Bencana</option>
            <option value="Education & Literacy">Pendidikan & Literasi</option>
          </select>
        </div>
      </div>

      {/* NGO List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNGOs.map((ngo) => (
          <div
            key={ngo.id}
            className="bg-white p-5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                    {ngo.name}
                    {ngo.verified && (
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 inline-block fill-indigo-50" />
                    )}
                  </h3>
                  <span className="text-xs font-medium text-slate-500">{ngo.category}</span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Akreditasi {ngo.rating}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-1 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{ngo.location}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-600">
                <Award className="w-3.5 h-3.5 text-slate-400" />
                <span>{ngo.activePrograms} Program Aktif</span>
              </div>
              <div className="flex items-center gap-1 text-slate-600">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>{ngo.beneficiariesCount} Penerima</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {ngo.focusAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
