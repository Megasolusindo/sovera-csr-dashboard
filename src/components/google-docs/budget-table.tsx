'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { formatRupiah } from '@/hooks/useGoogleDocs';

// A row as typed: numbers stay strings so a field can be empty while the user edits it.
export interface BudgetRow {
  id: string;
  description: string;
  quantity: string;
  unit_price: string;
}

export const MAX_BUDGET_ITEMS = 100;

export function newBudgetRow(): BudgetRow {
  return { id: Math.random().toString(36).slice(2), description: '', quantity: '1', unit_price: '' };
}

export function rowTotal(r: BudgetRow): number {
  const q = Number(r.quantity);
  const p = Number(r.unit_price);
  return Number.isFinite(q) && Number.isFinite(p) ? q * p : 0;
}

interface BudgetTableProps {
  rows: BudgetRow[];
  onChange: (rows: BudgetRow[]) => void;
  disabled?: boolean;
  errors?: Record<string, string>;
}

const inputClass =
  'w-full px-2 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 disabled:bg-slate-50';

export default function BudgetTable({ rows, onChange, disabled, errors = {} }: BudgetTableProps) {
  const update = (id: string, field: keyof Omit<BudgetRow, 'id'>, value: string) =>
    onChange(rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  const remove = (id: string) => onChange(rows.filter((r) => r.id !== id));
  const grandTotal = rows.reduce((sum, r) => sum + rowTotal(r), 0);

  return (
    <div>
      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="w-full text-sm min-w-[560px]">
          <thead className="bg-slate-50 text-slate-600 text-xs uppercase">
            <tr>
              <th className="px-2 py-2 text-left w-8">No</th>
              <th className="px-2 py-2 text-left">Uraian kegiatan</th>
              <th className="px-2 py-2 text-left w-20">Jumlah</th>
              <th className="px-2 py-2 text-left w-36">Harga satuan (Rp)</th>
              <th className="px-2 py-2 text-right w-32">Total</th>
              <th className="w-8" />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-4 text-center text-xs text-slate-500">
                  Belum ada item anggaran. Tabel anggaran di dokumen akan kosong.
                </td>
              </tr>
            )}
            {rows.map((r, i) => (
              <tr key={r.id} className="border-t border-slate-100 align-top">
                <td className="px-2 py-2 text-slate-500">{i + 1}</td>
                <td className="px-2 py-2">
                  <input
                    aria-label={`Uraian item ${i + 1}`}
                    className={inputClass}
                    value={r.description}
                    maxLength={500}
                    disabled={disabled}
                    onChange={(e) => update(r.id, 'description', e.target.value)}
                    placeholder="mis. Pelatihan digital marketing"
                  />
                  {errors[`${r.id}.description`] && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors[`${r.id}.description`]}</p>
                  )}
                </td>
                <td className="px-2 py-2">
                  <input
                    aria-label={`Jumlah item ${i + 1}`}
                    className={inputClass}
                    type="number"
                    min={1}
                    step={1}
                    inputMode="numeric"
                    value={r.quantity}
                    disabled={disabled}
                    onChange={(e) => update(r.id, 'quantity', e.target.value)}
                  />
                  {errors[`${r.id}.quantity`] && <p className="text-[11px] text-rose-600 mt-1">{errors[`${r.id}.quantity`]}</p>}
                </td>
                <td className="px-2 py-2">
                  <input
                    aria-label={`Harga satuan item ${i + 1}`}
                    className={inputClass}
                    type="number"
                    min={0}
                    step={1}
                    inputMode="numeric"
                    value={r.unit_price}
                    disabled={disabled}
                    onChange={(e) => update(r.id, 'unit_price', e.target.value)}
                    placeholder="0"
                  />
                  {errors[`${r.id}.unit_price`] && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors[`${r.id}.unit_price`]}</p>
                  )}
                </td>
                <td className="px-2 py-3.5 text-right font-medium text-slate-800 whitespace-nowrap">{formatRupiah(rowTotal(r))}</td>
                <td className="px-1 py-2">
                  <button
                    type="button"
                    aria-label={`Hapus item ${i + 1}`}
                    onClick={() => remove(r.id)}
                    disabled={disabled}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 disabled:opacity-40"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-slate-200 bg-slate-50">
              <td colSpan={4} className="px-2 py-2 text-right text-xs font-bold uppercase text-slate-600">
                Total anggaran
              </td>
              <td className="px-2 py-2 text-right font-bold text-slate-900 whitespace-nowrap">{formatRupiah(grandTotal)}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
      <button
        type="button"
        onClick={() => onChange([...rows, newBudgetRow()])}
        disabled={disabled || rows.length >= MAX_BUDGET_ITEMS}
        className="mt-2 px-3 py-1.5 rounded-lg border border-dashed border-slate-300 hover:border-emerald-500 hover:text-emerald-700 text-slate-600 text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50"
      >
        <Plus className="w-3.5 h-3.5" /> Tambah item
        {rows.length >= MAX_BUDGET_ITEMS && <span className="font-normal">(maksimal {MAX_BUDGET_ITEMS})</span>}
      </button>
    </div>
  );
}
