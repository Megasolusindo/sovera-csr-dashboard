'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, Plus, BookOpen, Layers, Users, FileText, Globe } from 'lucide-react';
import { CreateProgramPayload } from '@/hooks/usePrograms';
import { OrgType, PrimaryCluster } from '@/types/api';

interface ProgramFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateProgramPayload) => void;
  isLoading: boolean;
}

const primaryClusters: PrimaryCluster[] = [
  'Disaster & Emergency',
  'Education & Literacy',
  'Health & WASH',
  'Economic Empowerment',
  'Climate & Environment',
  'Social Protection & Vulnerable Groups',
  'Community Development',
  'Zakat & Wakaf Fiqh',
];

const sdgOptions = [
  'SDG 1: Tanpa Kemiskinan',
  'SDG 2: Tanpa Kelaparan',
  'SDG 3: Kehidupan Sehat & Sejahtera',
  'SDG 4: Pendidikan Berkualitas',
  'SDG 6: Air Bersih & Sanitasi',
  'SDG 8: Pekerjaan Layak & Pertumbuhan Ekonomi',
  'SDG 9: Industri, Inovasi & Infrastruktur',
  'SDG 11: Kota & Komunitas Berkelanjutan',
  'SDG 13: Penanganan Perubahan Iklim',
  'SDG 15: Ekosistem Daratan',
];

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
];

export default function ProgramFormModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: ProgramFormModalProps) {
  const [orgType, setOrgType] = useState<OrgType>('ZAKAT_WAQF_INSTITUTION');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [primaryCluster, setPrimaryCluster] = useState<PrimaryCluster>('Education & Literacy');
  const [selectedSDGs, setSelectedSDGs] = useState<string[]>(['SDG 4: Pendidikan Berkualitas']);
  const [asnafCategory, setAsnafCategory] = useState(asnafCategories[0]);
  const [esgPillar, setEsgPillar] = useState('SOCIAL');
  const [targetBeneficiaries, setTargetBeneficiaries] = useState('');

  useEffect(() => {
    const savedType = localStorage.getItem('sovera_active_org_type') as OrgType;
    if (savedType) {
      setOrgType(savedType);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleSDG = (sdg: string) => {
    setSelectedSDGs((prev) =>
      prev.includes(sdg) ? prev.filter((s) => s !== sdg) : [...prev, sdg]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      primary_cluster: primaryCluster,
      target_sdgs: selectedSDGs,
      asnaf_category: orgType === 'ZAKAT_WAQF_INSTITUTION' ? asnafCategory : undefined,
      esg_pillar: esgPillar.trim() || 'SOCIAL',
      target_beneficiaries: targetBeneficiaries.trim() || 'Penerima Manfaat Lembaga',
    });

    // Reset form
    setTitle('');
    setDescription('');
    setTargetBeneficiaries('');
  };

  const isZakatOrg = orgType === 'ZAKAT_WAQF_INSTITUTION';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center font-bold">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold">Tambah Program Lembaga / NGO Baru</h3>
                <p className="text-xs text-slate-400">
                  Mode Adaptif Multi-Sektor ({isZakatOrg ? 'Zakat & Wakaf' : 'Kemanusiaan / NGO'})
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
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                <span>Judul Program Intervensi *</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Program Respon Tanggap Darurat Bencana & Beasiswa Vokasi 3T"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Klaster Intervensi Utama *</span>
                </label>
                <select
                  value={primaryCluster}
                  onChange={(e) => setPrimaryCluster(e.target.value as PrimaryCluster)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {primaryClusters.map((cluster) => (
                    <option key={cluster} value={cluster}>
                      {cluster}
                    </option>
                  ))}
                </select>
              </div>

              {/* Conditional Asnaf Input (Zakat Institutions Only) */}
              {isZakatOrg ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Kategori 8 Asnaf (Zakat Org) *</span>
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
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Pilar ESG (Environmental/Social)</span>
                  </label>
                  <select
                    value={esgPillar}
                    onChange={(e) => setEsgPillar(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="SOCIAL">SOCIAL (Kemasyarakatan & Kemanusiaan)</option>
                    <option value="ENVIRONMENTAL">ENVIRONMENTAL (Lingkungan & Iklim)</option>
                    <option value="GOVERNANCE">GOVERNANCE (Tata Kelola & Transparansi)</option>
                  </select>
                </div>
              )}
            </div>

            {/* Target SDGs Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-700" />
                <span>Target UN SDGs (Sustainable Development Goals)</span>
              </label>
              <div className="flex flex-wrap gap-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl max-h-32 overflow-y-auto">
                {sdgOptions.map((sdg) => {
                  const isSelected = selectedSDGs.includes(sdg);
                  return (
                    <button
                      type="button"
                      key={sdg}
                      onClick={() => toggleSDG(sdg)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all ${
                        isSelected
                          ? 'bg-emerald-700 text-white border-emerald-700'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {sdg}
                    </button>
                  );
                })}
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
                placeholder="Contoh: 500 Kepala Keluarga Terdampak Bencana / 1.000 Siswa 3T"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-700" />
                <span>Deskripsi Lengkap & Narasi Dampak Program *</span>
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Jelaskan masalah sosial/kebencanaan yang diintervensi, metode penyaluran logistik/bantuan, serta target dampak terukur..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all leading-relaxed"
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
