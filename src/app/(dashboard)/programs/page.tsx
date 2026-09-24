'use client';

import React, { useState } from 'react';
import { usePrograms, useCreateProgram, useUpdateProgram, useDeleteProgram } from '@/hooks/usePrograms';
import { useAuth } from '@/context/AuthContext';
import { InstitutionProgram } from '@/types/api';
import ProgramCard from '@/components/programs/program-card';
import ProgramSkeleton from '@/components/programs/program-skeleton';
import ProgramFormModal from '@/components/programs/program-form-modal';
import CorporateProgramPortfolioView from '@/components/programs/corporate-program-view';
import { BookOpen, Plus, Search, Layers, Lock, ShieldAlert, Filter } from 'lucide-react';

export default function ProgramsPage() {
  const { user } = useAuth();

  const isCorporate =
    user?.tenant_type === 'CORPORATE' ||
    user?.role === 'CORP_ADMIN' ||
    user?.role === 'CSR_MANAGER' ||
    user?.role === 'REVIEWER';

  if (isCorporate) {
    return <CorporateProgramPortfolioView />;
  }

  const { data: programs, isLoading, isError } = usePrograms();
  const createProgramMutation = useCreateProgram();
  const updateProgramMutation = useUpdateProgram();
  const deleteProgramMutation = useDeleteProgram();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCluster, setSelectedCluster] = useState<string>('ALL');
  const [selectedEsgPillar, setSelectedEsgPillar] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedProgramToEdit, setSelectedProgramToEdit] = useState<InstitutionProgram | null>(null);
  const [rbacError, setRbacError] = useState<string | null>(null);

  const canManagePrograms = user?.role === 'ORG_ADMIN' || user?.role === 'DIRECTOR';

  const handleOpenCreateModal = () => {
    if (!canManagePrograms) {
      setRbacError('Akses Dibatasi (RBAC): Peran FUNDRAISER hanya memiliki izin membaca portofolio. Pembuatan/Pengubahan program memerlukan wewenang DIRECTOR atau ORG_ADMIN.');
      return;
    }
    setRbacError(null);
    setSelectedProgramToEdit(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (program: InstitutionProgram) => {
    if (!canManagePrograms) {
      setRbacError('Akses Dibatasi (RBAC): Peran FUNDRAISER hanya memiliki izin membaca portofolio. Pengubahan program memerlukan wewenang DIRECTOR atau ORG_ADMIN.');
      return;
    }
    setRbacError(null);
    setSelectedProgramToEdit(program);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDeleteProgram = (programId: string) => {
    if (!canManagePrograms) {
      setRbacError('Akses Dibatasi (RBAC): Peran FUNDRAISER hanya memiliki izin membaca portofolio. Penghapusan program memerlukan wewenang DIRECTOR atau ORG_ADMIN.');
      return;
    }
    setRbacError(null);
    deleteProgramMutation.mutate(programId);
  };

  const filteredPrograms = programs?.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.asnaf_category && p.asnaf_category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.primary_cluster && p.primary_cluster.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.esg_pillar.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCluster =
      selectedCluster === 'ALL' ||
      (p.primary_cluster && p.primary_cluster.toLowerCase() === selectedCluster.toLowerCase());

    const matchesEsgPillar =
      selectedEsgPillar === 'ALL' ||
      p.esg_pillar.toUpperCase() === selectedEsgPillar.toUpperCase();

    return matchesSearch && matchesCluster && matchesEsgPillar;
  });

  return (
    <div className="space-y-6">
      {/* Page Header & Action CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-emerald-700" />
            <span>Portofolio Program Lembaga & NGO</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola program intervensi sosial, tanggap bencana, dan SDG untuk otomatisasi semantic matching AI (Terisolasi per Lembaga / RLS Active).
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!canManagePrograms && (
            <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Read Only (FUNDRAISER)</span>
            </span>
          )}
          <button
            onClick={handleOpenCreateModal}
            className={`px-4 py-2.5 text-xs font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 shrink-0 ${
              canManagePrograms
                ? 'text-white bg-emerald-700 hover:bg-emerald-800'
                : 'text-slate-500 bg-slate-200 cursor-not-allowed opacity-80'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Program Unggulan</span>
          </button>
        </div>
      </div>

      {/* RBAC Warning Banner */}
      {rbacError && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{rbacError}</span>
          </div>
          <button
            onClick={() => setRbacError(null)}
            className="text-amber-700 hover:text-amber-900 text-xs font-bold underline shrink-0"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul program, deskripsi, atau klaster kemanusiaan..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          
          {/* Klaster Filter */}
          <select
            value={selectedCluster}
            onChange={(e) => setSelectedCluster(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            <option value="ALL">Semua Klaster Kemanusiaan</option>
            <option value="Education & Literacy">Pendidikan & Literasi (SDG 4)</option>
            <option value="Disaster & Emergency">Tanggap Darurat & Bencana (SDG 11)</option>
            <option value="Economic Empowerment">Pemberdayaan Ekonomi (SDG 8)</option>
            <option value="Climate & Environment">Lingkungan & Iklim (SDG 13)</option>
          </select>

          {/* ESG Pillar Filter */}
          <select
            value={selectedEsgPillar}
            onChange={(e) => setSelectedEsgPillar(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            <option value="ALL">Semua Pilar ESG</option>
            <option value="SOCIAL">SOCIAL (Kemasyarakatan)</option>
            <option value="ENVIRONMENTAL">ENVIRONMENTAL (Lingkungan)</option>
            <option value="GOVERNANCE">GOVERNANCE (Tata Kelola)</option>
          </select>
        </div>
      </div>

      {/* Program Summary Count Badge */}
      {programs && programs.length > 0 && (
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Menampilkan <strong>{filteredPrograms?.length || 0}</strong> dari <strong>{programs.length}</strong> program terdaftar (RLS Tenant Active).
          </span>
        </div>
      )}

      {/* Grid Content */}
      {isLoading ? (
        <ProgramSkeleton />
      ) : isError ? (
        <div className="p-8 bg-red-50 border border-red-200 rounded-xl text-center text-red-800 text-sm font-medium">
          Gagal memuat daftar program lembaga. Silakan coba lagi.
        </div>
      ) : filteredPrograms && filteredPrograms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPrograms.map((prog) => (
            <ProgramCard
              key={prog.id}
              program={prog}
              canManage={canManagePrograms}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteProgram}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 bg-white rounded-xl border border-slate-200 text-center space-y-3">
          <Layers className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">Belum Ada Program Terdaftar</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Tambahkan program unggulan lembaga Anda untuk memulai pemadanan otomatis (*Semantic Vector Matching*) dengan sinyal CSR korporasi.
          </p>
        </div>
      )}

      {/* Create / Edit Program Modal */}
      <ProgramFormModal
        isOpen={isModalOpen}
        mode={modalMode}
        initialData={selectedProgramToEdit}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProgramToEdit(null);
        }}
        isLoading={createProgramMutation.isPending || updateProgramMutation.isPending}
        onSubmit={(payload) => {
          if (modalMode === 'edit' && selectedProgramToEdit) {
            updateProgramMutation.mutate(
              { id: selectedProgramToEdit.id, ...payload },
              {
                onSuccess: () => {
                  setIsModalOpen(false);
                  setSelectedProgramToEdit(null);
                },
              }
            );
          } else {
            createProgramMutation.mutate(payload, {
              onSuccess: () => {
                setIsModalOpen(false);
                setSelectedProgramToEdit(null);
              },
            });
          }
        }}
      />
    </div>
  );
}

