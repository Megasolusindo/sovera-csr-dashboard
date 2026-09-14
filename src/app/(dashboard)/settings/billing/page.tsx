'use client';

import React, { useEffect, useState } from 'react';
import { CreditCard, FileText, RefreshCw, CheckCircle2, Clock, ExternalLink, Download } from 'lucide-react';
import { apiClient } from '@/lib/api-client';

interface Invoice {
  id: string;
  invoice_number: string;
  amount: number;
  status: 'PAID' | 'PENDING' | 'FAILED' | 'EXPIRED';
  billing_cycle: string;
  due_date: string;
  paid_at?: string;
  created_at: string;
  plan?: {
    code: string;
    name: string;
  };
}

export default function TenantBillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInvoices = async () => {
    setIsLoading(true);
    try {
      const res: any = await apiClient.get('/subscription/invoices');
      if (res && res.data) {
        setInvoices(res.data);
      } else {
        throw new Error('Empty response');
      }
    } catch (err) {
      console.warn('API fetch error, fallback mock invoices:', err);
      setInvoices([
        {
          id: 'inv-101',
          invoice_number: 'INV/202609/001',
          amount: 4900000,
          status: 'PAID',
          billing_cycle: 'MONTHLY',
          due_date: '2026-09-20',
          paid_at: '2026-09-12 14:22',
          created_at: '2026-09-12',
          plan: { code: 'PRO', name: 'Professional CSR Tier' },
        },
        {
          id: 'inv-100',
          invoice_number: 'INV/202608/089',
          amount: 4900000,
          status: 'PAID',
          billing_cycle: 'MONTHLY',
          due_date: '2026-08-20',
          paid_at: '2026-08-12 10:15',
          created_at: '2026-08-12',
          plan: { code: 'PRO', name: 'Professional CSR Tier' },
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const formatIDR = (num: number) => `Rp ${num.toLocaleString('id-ID')}`;

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-emerald-700" />
            <span>Faktur & Histori Pembayaran</span>
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Riwayat pembayaran lisensi langganan dan kwitansi resmi transaksi lembaga Anda.
          </p>
        </div>
        <button
          onClick={fetchInvoices}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">No. Invoice</th>
                <th className="py-3.5 px-4">Paket Lisensi</th>
                <th className="py-3.5 px-4">Siklus</th>
                <th className="py-3.5 px-4">Nominal</th>
                <th className="py-3.5 px-4">Status Pembayaran</th>
                <th className="py-3.5 px-4">Tanggal Pembayaran</th>
                <th className="py-3.5 px-4 text-right">Kwitansi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-700" />
                    <span>{inv.invoice_number}</span>
                  </td>
                  <td className="py-3.5 px-4 font-medium">{inv.plan?.name || inv.plan?.code || 'PRO'}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">{inv.billing_cycle}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">{formatIDR(inv.amount)}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        inv.status === 'PAID'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {inv.status === 'PAID' ? 'LUNAS (MIDTRANS)' : 'PENDING'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">{inv.paid_at || inv.created_at}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-colors inline-flex items-center gap-1">
                      <Download className="w-3 h-3 text-slate-500" />
                      <span>Cetak Invoice</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
