'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, Users, Info } from 'lucide-react';

// The backend has no endpoint that lists the members of an organization, so this page shows only what
// the signed-in session knows: the organization and the user. It used to list three invented people and
// a made-up tenant id.
export default function TeamSettingsPage() {
  const { user, isLoading } = useAuth();

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
          <ShieldCheck className="w-6 h-6 text-emerald-700" />
          <span>Akses Tim Organisasi</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">Organisasi dan akun yang sedang masuk.</p>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-slate-500 font-medium">Memuat sesi...</div>
      ) : !user ? (
        <div className="p-5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-sm font-semibold">
          Sesi tidak ditemukan. Silakan masuk kembali.
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-sm space-y-1">
            <div className="text-sm font-bold">{user.org_name || 'Organisasi'}</div>
            <p className="text-xs text-slate-400">
              ID organisasi: <code className="bg-slate-800 text-emerald-300 px-2 py-0.5 rounded font-mono">{user.org_id}</code>
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-700" />
              <span>Akun Anda</span>
            </h3>
            <div className="p-4 flex items-center justify-between border border-slate-100 rounded-xl">
              <div>
                <h4 className="text-sm font-bold text-slate-900">{user.full_name}</h4>
                <span className="text-xs text-slate-500">{user.email}</span>
              </div>
              <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-800 rounded border border-emerald-200">
                {user.role}
              </span>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-500">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Daftar anggota tim belum tersedia karena server belum menyediakan datanya. Pengguna baru ditambahkan lewat
                undangan dari administrator platform.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
