'use client';

import React from 'react';
import { useSettings } from '@/hooks/useSettings';
import { ShieldCheck, Users, Lock, Key } from 'lucide-react';

export default function TeamSettingsPage() {
  const { data: settings, isLoading } = useSettings();

  const teamMembers = [
    { name: 'M. Lulu D. K.', role: 'Admin Organization & Lead Fundraiser', email: 'lulu@peduliummat.org', status: 'Active' },
    { name: 'Siti Aminah', role: 'B2B Account Executive', email: 'siti@peduliummat.org', status: 'Active' },
    { name: 'Rahmat Hidayat', role: 'Data Crawler & Integration Specialist', email: 'rahmat@peduliummat.org', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
          <ShieldCheck className="w-6 h-6 text-emerald-700" />
          <span>Keamanan RLS & Akses Tim Organisasi</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Kelola partisi keamanan data Row Level Security (RLS) PostgreSQL dan daftar anggota tim terdaftar.
        </p>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-slate-500 font-medium">Memuat Informasi Akses Tim & RLS...</div>
      ) : (
        <div className="space-y-6">
          {/* Tenant RLS Status Card */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold">PostgreSQL Row Level Security (RLS) Active</span>
              </div>
              <p className="text-xs text-slate-400">
                Tenant ID: <code className="bg-slate-800 text-emerald-300 px-2 py-0.5 rounded font-mono">{settings?.tenant_id || '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'}</code>
              </p>
            </div>

            <span className="px-3 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
              Isolated Tenant Partitioning
            </span>
          </div>

          {/* Team Members List */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-700" />
                <span>Anggota Tim Organisasi Terdaftar</span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">3 Pengguna Terdaftar</span>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
              {teamMembers.map((member) => (
                <div key={member.email} className="p-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{member.name}</h4>
                    <span className="text-xs text-slate-500">{member.email}</span>
                  </div>

                  <div className="text-right space-y-1">
                    <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-800 rounded border border-emerald-200 block">
                      {member.role}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">{member.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
