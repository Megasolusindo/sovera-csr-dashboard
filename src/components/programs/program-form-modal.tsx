'use client';

import React, { useState } from 'react';
import { X, Sparkles, Plus, BookOpen, Layers, Users, FileText } from 'lucide-react';
import { CreateProgramPayload } from '@/hooks/usePrograms';

interface ProgramFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateProgramPayload) => void;
  isLoading: boolean;
}

const asnafCategories = [
  'Fakir',
  'Miskin',
  'Amil',
  'Muallaf',
  'Riqab',
  'Gharimin',
  'Fisabilillah',
  'Ibnu Sabil',
  'Fisabilillah / Ibnu Sabil',
  'Miskin / Gharimin',
];

export default function ProgramFormModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: ProgramFormModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [asnafCategory, setAsnafCategory] = useState(asnafCategories[0]);
  const [esgPillar, setEsgPillar] = useState('Pendidikan Quality Education (SDG 4)');
  const [targetBeneficiaries, setTargetBeneficiaries] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      asnaf_category: asnafCategory,
      esg_pillar: esgPillar.trim(),
      target_beneficiaries: targetBeneficiaries.trim() || 'Penerima Manfaat Lembaga',
    });

    // Reset form
    setTitle('');
    setDescription('');
    setTargetBeneficiaries('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center font-bold">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold">Tambah Program Unggulan Baru</h3>
                <p className="text-xs text-slate-400">Otomatis diubah menjadi vector embedding AI</p>
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
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                <span>Judul Program *</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Beasiswa Vokasi Digital & Tahfidz Syariah"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Kategori 8 Asnaf *</span>
                </label>
                <select
                  value={asnafCategory}
                  onChange={(e) => setAsnafCategory(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {asnafCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Pilar ESG / SDG *</span>
                </label>
                <input
                  type="text"
                  required
                  value={esgPillar}
                  onChange={(e) => setEsgPillar(e.target.value)}
                  placeholder="Contoh: Pendidikan Quality Education (SDG 4)"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-700" />
                <span>Target Penerima Manfaat</span>
              </label>
              <input
                type="text"
                value={targetBeneficiaries}
                onChange={(e) => setTargetBeneficiaries(e.target.value)}
                placeholder="Contoh: 500 Mahasiswa & Pelajar 3T"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-700" />
                <span>Deskripsi Lengkap Program *</span>
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Jelaskan naskah narasi program unggulan, dampak sosial yang ditargetkan, serta mekanisme penyaluran bantuan..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all leading-relaxed"
              />
            </div>

            {/* AI Vectorization Notice */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Program yang ditambahkan otomatis di-vectorize (1536 dim) untuk Semantic Vector Matching.</span>
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
                disabled={isLoading}
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading && <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                <span>{isLoading ? 'Menyimpan & Vectorizing...' : 'Simpan & Sync AI'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
