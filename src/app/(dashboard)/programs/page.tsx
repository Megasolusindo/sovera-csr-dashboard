'use client';

import React, { useState } from 'react';
import ProgramCard from '@/components/programs/program-card';
import ProgramSkeleton from '@/components/programs/program-skeleton';
import ProgramFormModal from '@/components/programs/program-form-modal';
import { usePrograms, useCreateProgram } from '@/hooks/usePrograms';
import { BookOpen, Plus, Search, Layers } from 'lucide-react';

export default function ProgramsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: programs, isLoading, isError, refetch } = usePrograms();
  const createMutation = useCreateProgram();

  const handleCreateSubmit = (payload: any) => {
    createMutation.mutate(payload, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    });
  };

  const filteredPrograms = programs?.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.asnaf_category.toLowerCase().includes(q) ||
      p.esg_pillar.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Page Header & Action CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-emerald-700" />
            <span>Institution Programs Portfolio</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola portofolio program unggulan lembaga (8 Asnaf & ESG) untuk pencocokan vektor AI.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 rounded-lg shadow-sm flex items-center gap-2 shrink-0 self-start sm:self-auto transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Program Baru</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul program, pilar ESG, atau kategori Asnaf..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
          <Layers className="w-4 h-4 text-slate-400" />
          <span>Total <strong>{filteredPrograms?.length || 0}</strong> Program Terdaftar</span>
        </div>
      </div>

      {/* Grid or Skeleton Loader */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProgramSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <div className="bg-rose-50 border border-rose-200 p-6 rounded-xl text-center text-rose-800 space-y-2">
          <h3 className="font-bold text-base">Gagal Memuat Portofolio Program</h3>
          <p className="text-xs text-rose-600">Terjadi kendala saat menghubungi server database.</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-1.5 text-xs font-bold bg-rose-700 text-white rounded-lg hover:bg-rose-800 transition-colors mt-2"
          >
            Coba Lagi
          </button>
        </div>
      ) : filteredPrograms && filteredPrograms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 p-12 rounded-xl text-center space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">Belum Ada Program Terdaftar</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Daftarkan program unggulan lembaga Anda agar AI dapat mencocokkannya dengan sinyal CSR korporasi.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors"
          >
            Tambah Program Sekarang
          </button>
        </div>
      )}

      {/* Program Form Modal */}
      <ProgramFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateSubmit}
        isLoading={createMutation.isPending}
      />
    </div>
  );
}
