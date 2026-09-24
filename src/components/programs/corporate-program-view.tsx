'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Building,
  DollarSign,
  Calendar,
  Award,
  Globe,
  ShieldCheck,
  Lock,
  Pencil,
  Trash2,
  Filter,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';
import { CorporateProgram, CorporateProgramVisibility } from '@/types/api';
import CorporateProgramModal from './corporate-program-modal';

const initialCorporatePrograms: CorporateProgram[] = [
  {
    id: 'corp-prog-1',
    name: 'Program Penanaman 100.000 Mangrove Pesisir & Konservasi Karbon',
    companyName: 'Corporate (demo)',
    pillar: 'ENVIRONMENT',
    status: 'ACTIVE',
    budgetAmount: 'Rp 1.500.000.000',
    impactSummary: 'Restorasi 50 hektar lahan pesisir dan pengurangan jejak karbon sebesar 120 ton CO2e/tahun.',
    startDate: '2026-01-15',
    endDate: '2026-12-31',
    partnerNGO: 'Yayasan Konservasi Mangrove Indonesia',
    visibility: 'PUBLIC',
  },
  {
    id: 'corp-prog-2',
    name: 'Beasiswa Coding Digital & AI Talenta Muda Indonesia',
    companyName: 'Corporate (demo)',
    pillar: 'EDUCATION',
    status: 'ACTIVE',
    budgetAmount: 'Rp 850.000.000',
    impactSummary: 'Pelatihan intensif 6 bulan dan penyaluran kerja untuk 200 pemuda berprestasi dari daerah 3T.',
    startDate: '2026-03-01',
    endDate: '2026-11-30',
    partnerNGO: 'LAZ Peduli Ummat',
    visibility: 'CURATED',
    curatedRequirements: 'NGO bidang pendidikan dengan rekam jejak penyaluran beasiswa vokasi min. 2 tahun & terakreditasi.',
  },
  {
    id: 'corp-prog-3',
    name: 'Program Pembinaan & Perizinan Halal 100 UMKM Wanita',
    companyName: 'Corporate (demo)',
    pillar: 'ECONOMIC_EMPOWERMENT',
    status: 'PLANNED',
    budgetAmount: 'Rp 600.000.000',
    impactSummary: 'Pendampingan sertifikasi halal, NIB, dan digitalisasi pemasaran UMKM wanita di Jawa Barat.',
    startDate: '2026-06-01',
    endDate: '2026-12-15',
    partnerNGO: 'Belum Ditentukan (Penunjukan Langsung)',
    visibility: 'PRIVATE',
  },
];

export default function CorporateProgramPortfolioView() {
  const [programs, setPrograms] = useState<CorporateProgram[]>(initialCorporatePrograms);
  const [search, setSearch] = useState('');
  const [selectedPillar, setSelectedPillar] = useState('');
  const [selectedVisibility, setSelectedVisibility] = useState<string>('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedProgramToEdit, setSelectedProgramToEdit] = useState<CorporateProgram | null>(null);
  
  // Inline delete state
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleOpenCreateModal = () => {
    setSelectedProgramToEdit(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prog: CorporateProgram) => {
    setSelectedProgramToEdit(prog);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDeleteProgram = (id: string) => {
    setPrograms((prev) => prev.filter((p) => p.id !== id));
    setDeletingId(null);
  };

  const handleSaveProgram = (programData: Omit<CorporateProgram, 'id'> & { id?: string }) => {
    if (programData.id) {
      // Edit existing
      setPrograms((prev) =>
        prev.map((p) => (p.id === programData.id ? ({ ...p, ...programData } as CorporateProgram) : p))
      );
    } else {
      // Create new
      const newProg: CorporateProgram = {
        ...programData,
        id: `corp-prog-${Date.now()}`,
        created_at: new Date().toISOString(),
      };
      setPrograms((prev) => [newProg, ...prev]);
    }
  };

  const filteredPrograms = programs.filter((prog) => {
    const matchesSearch =
      prog.name.toLowerCase().includes(search.toLowerCase()) ||
      prog.impactSummary.toLowerCase().includes(search.toLowerCase()) ||
      prog.partnerNGO.toLowerCase().includes(search.toLowerCase());
    const matchesPillar = !selectedPillar || prog.pillar === selectedPillar;
    const matchesVisibility = !selectedVisibility || prog.visibility === selectedVisibility;
    return matchesSearch && matchesPillar && matchesVisibility;
  });

  const activeCount = programs.filter((p) => p.status === 'ACTIVE').length;
  const totalCount = programs.length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
              <BookOpen className="w-6 h-6 text-indigo-700" />
              <span>Inisiatif & Portofolio CSR Perusahaan</span>
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Kelola alokasi anggaran, visibilitas akses NGO, pemantauan dampak ESG, dan eksekusi program CSR korporasi
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreateModal}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Inisiatif CSR</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{totalCount}</div>
            <div className="text-xs text-slate-500 font-medium">Total Inisiatif Program</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">
              {programs.filter((p) => p.visibility === 'PUBLIC').length}
            </div>
            <div className="text-xs text-slate-500 font-medium">Program Public Open</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">
              {programs.filter((p) => p.visibility === 'CURATED').length}
            </div>
            <div className="text-xs text-slate-500 font-medium">Program Curated Match</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">
              {programs.filter((p) => p.visibility === 'PRIVATE').length}
            </div>
            <div className="text-xs text-slate-500 font-medium">Program Private / Undangan</div>
          </div>
        </div>
      </div>

      {/* Visibility Legend Banner */}
      <div className="p-4 bg-slate-900 text-white rounded-xl shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
          <Info className="w-4 h-4 text-indigo-400" />
          <span>Skema Kontrol Visibilitas Inisiatif CSR Perusahaan</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="flex items-start gap-2 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/50">
            <Globe className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-400 font-bold block mb-0.5">PUBLIC:</strong>
              Muncul di katalog eksplorasi program publik yang bisa ditelusuri oleh semua NGO terdaftar & terverifikasi.
            </div>
          </div>
          <div className="flex items-start gap-2 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/50">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-400 font-bold block mb-0.5">CURATED:</strong>
              Hanya bisa dilihat oleh NGO yang memenuhi kualifikasi (pilar ESG cocok & legalitas lolos kurasi CSRmatics).
            </div>
          </div>
          <div className="flex items-start gap-2 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/50">
            <Lock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-300 font-bold block mb-0.5">PRIVATE:</strong>
              Inisiatif internal atau penunjukan langsung. NGO hanya melihat jika korporasi mengundang/mengirim link.
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari inisiatif program CSR, mitra NGO, atau dampak..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Filter Pilar ESG */}
        <div className="sm:w-52">
          <select
            value={selectedPillar}
            onChange={(e) => setSelectedPillar(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Semua Pilar ESG</option>
            <option value="ENVIRONMENT">Lingkungan & Iklim</option>
            <option value="EDUCATION">Pendidikan & Literasi</option>
            <option value="ECONOMIC_EMPOWERMENT">Pemberdayaan Ekonomi</option>
            <option value="HEALTH">Kesehatan & Sanitasi</option>
            <option value="SOCIAL">Sosial & Kemasyarakatan</option>
          </select>
        </div>

        {/* Filter Visibilitas */}
        <div className="sm:w-48">
          <select
            value={selectedVisibility}
            onChange={(e) => setSelectedVisibility(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Semua Visibilitas</option>
            <option value="PUBLIC">🌐 PUBLIC (Semua NGO)</option>
            <option value="CURATED">🎯 CURATED (Terkurasi)</option>
            <option value="PRIVATE">🔒 PRIVATE (Privat/Internal)</option>
          </select>
        </div>
      </div>

      {/* Programs List Grid */}
      <div className="space-y-4">
        {filteredPrograms.length > 0 ? (
          filteredPrograms.map((prog) => {
            const isDeleting = deletingId === prog.id;

            return (
              <div
                key={prog.id}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all space-y-3 relative group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    {/* Pilar Badge & Visibilitas Badge */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {prog.pillar}
                      </span>

                      {/* VISIBILITY BADGE */}
                      {prog.visibility === 'PUBLIC' && (
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                          <Globe className="w-3 h-3 text-emerald-600" />
                          <span>PUBLIC (Katalog NGO)</span>
                        </span>
                      )}

                      {prog.visibility === 'CURATED' && (
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-amber-600" />
                          <span>CURATED (NGO Terkurasi)</span>
                        </span>
                      )}

                      {prog.visibility === 'PRIVATE' && (
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-300 flex items-center gap-1">
                          <Lock className="w-3 h-3 text-slate-600" />
                          <span>PRIVATE (Internal / Undangan)</span>
                        </span>
                      )}

                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {prog.startDate} s/d {prog.endDate}
                      </span>
                    </div>

                    {/* Program Title */}
                    <h3 className="font-bold text-slate-900 text-lg leading-snug">
                      {prog.name}
                    </h3>

                    {/* Partner NGO */}
                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-indigo-600" />
                      <span>
                        Mitra Eksekutor: <strong className="text-slate-800">{prog.partnerNGO}</strong>
                      </span>
                    </p>
                  </div>

                  {/* Actions & Budget */}
                  <div className="sm:text-right flex sm:flex-col justify-between items-end gap-2">
                    {/* EDIT & DELETE BUTTONS */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(prog)}
                        title="Edit Inisiatif Program"
                        className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-indigo-700 bg-slate-100 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-lg transition-all flex items-center gap-1"
                      >
                        <Pencil className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeletingId(prog.id)}
                        title="Hapus Inisiatif Program"
                        className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <div className="text-lg font-extrabold text-slate-900">{prog.budgetAmount}</div>
                      <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {prog.status === 'ACTIVE' ? 'Berjalan (Active)' : prog.status === 'COMPLETED' ? 'Selesai' : 'Direncanakan'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Inline Delete Confirmation */}
                {isDeleting && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between text-xs text-red-900 animate-in fade-in">
                    <span className="font-semibold">Hapus inisiatif CSR ini?</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDeleteProgram(prog.id)}
                        className="px-3 py-1 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition-all"
                      >
                        Ya, Hapus
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeletingId(null)}
                        className="px-2.5 py-1 bg-slate-200 text-slate-700 font-semibold rounded hover:bg-slate-300 transition-all"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                )}

                {/* Impact Summary & Curated Requirement Note */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-700 space-y-1">
                  <div>
                    <strong className="text-slate-900 font-semibold inline">Ringkasan Dampak ESG: </strong>
                    <span>{prog.impactSummary}</span>
                  </div>

                  {prog.visibility === 'CURATED' && prog.curatedRequirements && (
                    <div className="pt-1 text-[11px] text-amber-800 font-medium flex items-center gap-1.5 border-t border-slate-200/60 mt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span><strong>Syarat Kurasi NGO:</strong> {prog.curatedRequirements}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 bg-white rounded-xl border border-slate-200 text-center space-y-3">
            <Layers className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">Tidak Ada Inisiatif Program</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Tidak ditemukan program yang sesuai dengan pencarian atau filter visibilitas yang dipilih.
            </p>
          </div>
        )}
      </div>

      {/* Modal Add/Edit */}
      <CorporateProgramModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProgramToEdit(null);
        }}
        mode={modalMode}
        initialData={selectedProgramToEdit}
        onSubmit={handleSaveProgram}
      />
    </div>
  );
}
