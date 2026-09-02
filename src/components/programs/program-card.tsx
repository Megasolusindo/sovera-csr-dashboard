'use client';

import React from 'react';
import { InstitutionProgram } from '@/types/api';
import { Users, CheckCircle2, Calendar, Layers, Globe } from 'lucide-react';

interface ProgramCardProps {
  program: InstitutionProgram;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between group">
      <div>
        {/* Header: Title & AI Embedding Synced Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
              {program.primary_cluster || 'Program Intervensi'}
            </span>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
              {program.title}
            </h3>
          </div>

          <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full shrink-0 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Vector Synced</span>
          </span>
        </div>

        {/* Badges: Primary Cluster, Asnaf (if present), & SDGs */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          {program.primary_cluster && (
            <span className="px-2.5 py-1 text-xs font-bold bg-slate-100 text-slate-800 rounded-md border border-slate-200 flex items-center gap-1">
              <Layers className="w-3 h-3 text-slate-500" />
              <span>{program.primary_cluster}</span>
            </span>
          )}

          {program.asnaf_category && (
            <span className="px-2.5 py-1 text-xs font-semibold bg-amber-50 text-amber-800 rounded-md border border-amber-200">
              Asnaf: {program.asnaf_category}
            </span>
          )}

          {program.target_sdgs && program.target_sdgs.length > 0 ? (
            program.target_sdgs.map((sdg) => (
              <span key={sdg} className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-50 text-emerald-800 rounded border border-emerald-200 flex items-center gap-1">
                <Globe className="w-3 h-3 text-emerald-600" />
                <span>{sdg}</span>
              </span>
            ))
          ) : (
            <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-800 rounded-md border border-emerald-100">
              {program.esg_pillar}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
          {program.description}
        </p>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1 text-slate-700 font-medium">
          <Users className="w-3.5 h-3.5 text-emerald-600" />
          <span>{program.target_beneficiaries}</span>
        </div>

        {program.created_at && (
          <div className="flex items-center gap-1 text-slate-400">
            <Calendar className="w-3 h-3" />
            <span>{new Date(program.created_at).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}</span>
          </div>
        )}
      </div>
    </div>
  );
}
