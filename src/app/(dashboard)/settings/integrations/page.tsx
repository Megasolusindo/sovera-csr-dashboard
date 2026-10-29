'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, AlertTriangle, FileText, Link2, Unlink, Loader2, ShieldCheck, XCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import QueryError, { errorMessage } from '@/components/shared/query-error';
import {
  apiErrorCode,
  CONNECT_ERROR_MESSAGES,
  GOOGLE_ERROR_MESSAGES,
  useConnectGoogle,
  useDisconnectGoogle,
  useGoogleIntegration,
} from '@/hooks/useGoogleDocs';

// Only these roles may connect or disconnect the organization's Google account (API enforces it too).
const ADMIN_ROLES = new Set(['ORG_ADMIN', 'CORP_ADMIN']);

function formatDate(iso?: string) {
  if (!iso) return '';
  return new Date(iso).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' });
}

function IntegrationsContent() {
  const { user } = useAuth();
  const isAdmin = !!user && ADMIN_ROLES.has(user.role);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { data, isLoading, isError, error, refetch } = useGoogleIntegration();
  const connect = useConnectGoogle();
  const disconnect = useDisconnectGoogle();
  const [confirming, setConfirming] = useState(false);

  // Result of the OAuth round trip, read once and then removed from the URL so a reload does not
  // show it again.
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);
  useEffect(() => {
    const result = searchParams.get('google');
    if (!result) return;
    if (result === 'connected') {
      setNotice({ ok: true, text: 'Akun Google berhasil dihubungkan.' });
      refetch();
    } else {
      const reason = searchParams.get('reason') || '';
      setNotice({ ok: false, text: CONNECT_ERROR_MESSAGES[reason] || 'Gagal menghubungkan akun Google. Silakan ulangi.' });
    }
    router.replace(pathname);
  }, [searchParams, router, pathname, refetch]);

  const disabled = apiErrorCode(error) === 'FEATURE_DISABLED';
  const status = data?.status;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
          <Link2 className="w-6 h-6 text-emerald-700" />
          <span>Integrasi</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">Hubungkan layanan eksternal yang dipakai organisasi Anda.</p>
      </div>

      {notice && (
        <div
          role="status"
          className={`p-4 rounded-2xl border text-sm flex items-start gap-2 ${
            notice.ok ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          {notice.ok ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <XCircle className="w-5 h-5 shrink-0" />}
          <span className="flex-1">{notice.text}</span>
          <button onClick={() => setNotice(null)} className="text-xs font-semibold underline">
            Tutup
          </button>
        </div>
      )}

      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-slate-900">Google Docs</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Buat proposal CSR lengkap dengan tabel anggaran langsung di Google Drive organisasi. CSRMatics hanya bisa
              mengakses dokumen yang dibuatnya sendiri.
            </p>

            <div className="mt-4">
              {isLoading ? (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Loader2 className="w-4 h-4 animate-spin" /> Memuat status koneksi...
                </div>
              ) : disabled ? (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600">
                  {GOOGLE_ERROR_MESSAGES.FEATURE_DISABLED}
                </div>
              ) : isError ? (
                <QueryError title="Status integrasi Google tidak dapat dimuat." error={error} onRetry={() => refetch()} />
              ) : status === 'connected' ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-sm">
                    <div className="flex items-center gap-1.5 font-semibold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4" /> Terhubung
                    </div>
                    <div className="text-slate-700 mt-0.5 break-all">{data?.google_email}</div>
                    {data?.connected_at && (
                      <div className="text-xs text-slate-500 mt-0.5">Sejak {formatDate(data.connected_at)}</div>
                    )}
                  </div>
                  {isAdmin && !confirming && (
                    <button
                      onClick={() => setConfirming(true)}
                      className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold flex items-center gap-2 shrink-0"
                    >
                      <Unlink className="w-4 h-4" /> Putuskan
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-sm">
                    {status === 'expired' || status === 'error' ? (
                      <div className="flex items-start gap-1.5 text-amber-700">
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>
                          Akses ke akun Google <strong>{data?.google_email}</strong> kedaluwarsa atau dicabut. Hubungkan
                          ulang untuk membuat dokumen lagi.
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-600">Belum ada akun Google yang terhubung.</span>
                    )}
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => connect.mutate()}
                      disabled={connect.isPending}
                      className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white text-sm font-bold flex items-center gap-2 shrink-0"
                    >
                      {connect.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Link2 className="w-4 h-4" />}
                      {status === 'expired' || status === 'error' ? 'Hubungkan ulang' : 'Hubungkan akun Google'}
                    </button>
                  )}
                </div>
              )}

              {!isAdmin && !isLoading && !disabled && !isError && status !== 'connected' && (
                <p className="text-xs text-slate-500 mt-3">
                  Minta Administrator organisasi Anda untuk menghubungkan akun Google.
                </p>
              )}
              {connect.isError && <p className="text-xs text-rose-700 mt-3">{errorMessage(connect.error)}</p>}

              {confirming && (
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm">
                  <p className="text-amber-900">
                    Putuskan akun <strong>{data?.google_email}</strong>? Dokumen yang sudah dibuat tetap ada di Google
                    Drive, tetapi CSRMatics tidak bisa membuat dokumen baru sampai akun dihubungkan lagi.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => disconnect.mutate(undefined, { onSettled: () => setConfirming(false) })}
                      disabled={disconnect.isPending}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white text-xs font-bold flex items-center gap-2"
                    >
                      {disconnect.isPending && <Loader2 className="w-4 h-4 animate-spin" />} Ya, putuskan
                    </button>
                    <button
                      onClick={() => setConfirming(false)}
                      className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs font-semibold"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}
              {disconnect.isError && <p className="text-xs text-rose-700 mt-3">{errorMessage(disconnect.error)}</p>}
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 shrink-0 text-slate-400" />
          <span>
            Izin yang diminta: membuat dan mengedit file Google Drive yang dibuat CSRMatics, serta mengedit Google Docs.
            Token akses disimpan terenkripsi dan tidak pernah dipakai untuk melatih model AI.
          </span>
        </div>
      </section>
    </div>
  );
}

export default function IntegrationsSettingsPage() {
  return (
    <Suspense fallback={null}>
      <IntegrationsContent />
    </Suspense>
  );
}
