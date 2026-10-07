'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Building, Mail, Info } from 'lucide-react';

// The backend has no endpoint for the institution profile (GET/PATCH /settings does not exist). This used
// to be an editable form on invented data whose "Simpan" showed success without sending anything. It now
// shows what the signed-in session knows, read-only.
export default function ProfileSettingsForm() {
  const { user, isLoading } = useAuth();

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
          <Building className="w-6 h-6 text-emerald-700" />
          <span>Profil Lembaga</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">Data organisasi dan akun dari sesi Anda.</p>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-slate-500 font-medium">Memuat sesi...</div>
      ) : !user ? (
        <div className="p-5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-sm font-semibold">
          Sesi tidak ditemukan. Silakan masuk kembali.
        </div>
      ) : (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-sm">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama organisasi</div>
            <div className="font-bold text-slate-900 mt-0.5">{user.org_name || '-'}</div>
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Jenis</div>
            <div className="text-slate-800 mt-0.5">{user.tenant_type || '-'}</div>
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>Akun yang masuk</span>
            </div>
            <div className="text-slate-800 mt-0.5">
              {user.full_name} ({user.email}) &middot; {user.role}
            </div>
          </div>
          <div className="flex items-start gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Mengubah profil lembaga (alamat, nomor izin, kontak) belum tersedia karena server belum menyediakan
              endpoint penyimpanannya. Hubungi administrator platform untuk perubahan data.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
