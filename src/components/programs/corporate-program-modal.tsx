'use client';

import React, { useState, useEffect } from 'react';
import { X, Globe, ShieldCheck, Lock, BookOpen, Layers, Calendar, DollarSign, Building, Sparkles, Pencil, Plus } from 'lucide-react';
import { CorporateProgram, CorporateProgramVisibility } from '@/types/api';

interface CorporateProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (programData: Omit<CorporateProgram, 'id'> & { id?: string }) => void;
  initialData?: CorporateProgram | null;
  mode?: 'create' | 'edit';
}

export default function CorporateProgramModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode = 'create',
}: CorporateProgramModalProps) {
  const [name, setName] = useState('');
  const [pillar, setPillar] = useState('ENVIRONMENT');
  const [status, setStatus] = useState<'ACTIVE' | 'PLANNED' | 'COMPLETED'>('ACTIVE');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [partnerNGO, setPartnerNGO] = useState('');
  const [impactSummary, setImpactSummary] = useState('');
  const [visibility, setVisibility] = useState<CorporateProgramVisibility>('PUBLIC');
  const [curatedRequirements, setCuratedRequirements] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialData && mode === 'edit') {
        setName(initialData.name || '');
        setPillar(initialData.pillar || 'ENVIRONMENT');
        setStatus(initialData.status || 'ACTIVE');
        setBudgetAmount(initialData.budgetAmount || '');
        setStartDate(initialData.startDate || '');
        setEndDate(initialData.endDate || '');
        setPartnerNGO(initialData.partnerNGO || '');
        setImpactSummary(initialData.impactSummary || '');
        setVisibility(initialData.visibility || 'PUBLIC');
        setCuratedRequirements(initialData.curatedRequirements || '');
      } else {
        setName('');
        setPillar('ENVIRONMENT');
        setStatus('ACTIVE');
        setBudgetAmount('Rp ');
        setStartDate(new Date().toISOString().split('T')[0]);
        setEndDate('');
        setPartnerNGO('Belum Ditentukan (Peluang Kemitraan)');
        setImpactSummary('');
        setVisibility('PUBLIC');
        setCuratedRequirements('Pilar ESG cocok & Legalitas NGO terverifikasi platform CSRmatics');
      }
    }
  }, [isOpen, initialData, mode]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit({
      ...(initialData?.id ? { id: initialData.id } : {}),
      name: name.trim(),
      companyName: initialData?.companyName || 'Corporate (demo)',
      pillar,
      status,
      budgetAmount: budgetAmount.trim(),
      startDate: startDate || new Date().toISOString().split('T')[0],
      endDate: endDate || '2026-12-31',
      partnerNGO: partnerNGO.trim() || 'Belum Ditentukan (Peluang Kemitraan)',
      impactSummary: impactSummary.trim(),
      visibility,
      curatedRequirements: visibility === 'CURATED' ? curatedRequirements.trim() : undefined,
    });
    onClose();
  };

  const isEdit = mode === 'edit';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white">
                {isEdit ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </div>
              <div>
                <h3 className="text-base font-bold">
                  {isEdit ? 'Edit Inisiatif CSR Perusahaan' : 'Tambah Inisiatif CSR Baru'}
                </h3>
                <p className="text-xs text-slate-400">
                  Kelola visibilitas akses NGO, target anggaran, dan indikator dampak ESG
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[82vh] overflow-y-auto">
            {/* Program Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span>Nama Inisiatif Program CSR *</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Program Penanaman 100.000 Mangrove Pesisir & Konservasi Karbon"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
              />
            </div>

            {/* Pillar & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Pilar ESG Utama *</span>
                </label>
                <select
                  value={pillar}
                  onChange={(e) => setPillar(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  <option value="ENVIRONMENT">ENVIRONMENT (Lingkungan & Iklim)</option>
                  <option value="EDUCATION">EDUCATION (Pendidikan & Literasi)</option>
                  <option value="ECONOMIC_EMPOWERMENT">ECONOMIC (Pemberdayaan Ekonomi)</option>
                  <option value="HEALTH">HEALTH (Kesehatan & Sanitasi)</option>
                  <option value="SOCIAL">SOCIAL (Kemasyarakatan & Sosial)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Status Pelaksanaan *</span>
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'ACTIVE' | 'PLANNED' | 'COMPLETED')}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  <option value="ACTIVE">ACTIVE (Berjalan Aktif)</option>
                  <option value="PLANNED">PLANNED (Direncanakan)</option>
                  <option value="COMPLETED">COMPLETED (Selesai Execution)</option>
                </select>
              </div>
            </div>

            {/* VISIBILITY SELECTION SECTION */}
            <div className="space-y-2.5 pt-2 pb-1 border-y border-slate-100">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Tingkat Visibilitas Program bagi NGO *</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* PUBLIC Option */}
                <div
                  onClick={() => setVisibility('PUBLIC')}
                  className={`cursor-pointer p-3.5 rounded-xl border-2 transition-all flex flex-col justify-between ${
                    visibility === 'PUBLIC'
                      ? 'border-emerald-600 bg-emerald-50/60 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="flex items-center gap-1.5 font-bold text-xs text-emerald-800">
                        <Globe className="w-4 h-4 text-emerald-600" />
                        <span>PUBLIC</span>
                      </span>
                      <input
                        type="radio"
                        name="visibility"
                        checked={visibility === 'PUBLIC'}
                        onChange={() => setVisibility('PUBLIC')}
                        className="accent-emerald-600"
                      />
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      Muncul di eksplorasi & katalog program publik. Dapat ditelusuri oleh semua NGO terdaftar & terverifikasi.
                    </p>
                  </div>
                </div>

                {/* CURATED Option */}
                <div
                  onClick={() => setVisibility('CURATED')}
                  className={`cursor-pointer p-3.5 rounded-xl border-2 transition-all flex flex-col justify-between ${
                    visibility === 'CURATED'
                      ? 'border-amber-500 bg-amber-50/60 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="flex items-center gap-1.5 font-bold text-xs text-amber-800">
                        <ShieldCheck className="w-4 h-4 text-amber-600" />
                        <span>CURATED</span>
                      </span>
                      <input
                        type="radio"
                        name="visibility"
                        checked={visibility === 'CURATED'}
                        onChange={() => setVisibility('CURATED')}
                        className="accent-amber-500"
                      />
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      Hanya bisa dilihat oleh NGO yang memenuhi kualifikasi (pilar ESG cocok & legalitas lolos kurasi CSRmatics).
                    </p>
                  </div>
                </div>

                {/* PRIVATE Option */}
                <div
                  onClick={() => setVisibility('PRIVATE')}
                  className={`cursor-pointer p-3.5 rounded-xl border-2 transition-all flex flex-col justify-between ${
                    visibility === 'PRIVATE'
                      ? 'border-slate-700 bg-slate-100 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
                        <Lock className="w-4 h-4 text-slate-700" />
                        <span>PRIVATE</span>
                      </span>
                      <input
                        type="radio"
                        name="visibility"
                        checked={visibility === 'PRIVATE'}
                        onChange={() => setVisibility('PRIVATE')}
                        className="accent-slate-700"
                      />
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      Inisiatif internal atau penunjukan langsung. NGO hanya bisa melihat jika diundang / terima link khusus.
                    </p>
                  </div>
                </div>
              </div>

              {/* Conditional Curated Requirements Field */}
              {visibility === 'CURATED' && (
                <div className="mt-2 p-3 bg-amber-50/80 border border-amber-200 rounded-lg text-xs space-y-1.5 animate-in fade-in">
                  <label className="block font-semibold text-amber-900">
                    Syarat Kualifikasi Kurasi NGO (Opsional):
                  </label>
                  <input
                    type="text"
                    value={curatedRequirements}
                    onChange={(e) => setCuratedRequirements(e.target.value)}
                    placeholder="Contoh: Pengalaman min. 3 tahun di isu lingkungan + Akreditasi Kemenkumham"
                    className="w-full px-3 py-1.5 bg-white border border-amber-300 rounded text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              )}
            </div>

            {/* Budget & Partner NGO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Komitmen Anggaran CSR *</span>
                </label>
                <input
                  type="text"
                  required
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(e.target.value)}
                  placeholder="Contoh: Rp 1.500.000.000"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Mitra Eksekutor (NGO / Yayasan)</span>
                </label>
                <input
                  type="text"
                  value={partnerNGO}
                  onChange={(e) => setPartnerNGO(e.target.value)}
                  placeholder="Contoh: Yayasan Konservasi Mangrove / Belum Ditentukan"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Tanggal Mulai</span>
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Tanggal Selesai</span>
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>

            {/* Impact Summary */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Ringkasan Dampak ESG (Impact Summary) *</span>
              </label>
              <textarea
                required
                rows={3}
                value={impactSummary}
                onChange={(e) => setImpactSummary(e.target.value)}
                placeholder="Jelaskan target indikator dampak terukur (misal: 50 hektar mangrove, 120 ton CO2e/tahun, 200 penerima beasiswa)..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all leading-relaxed"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Batal
              </button>

              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all flex items-center gap-2"
              >
                <span>{isEdit ? 'Perbarui Inisiatif' : 'Simpan Inisiatif Baru'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
