'use client';

import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface QueryErrorProps {
  title: string;
  error?: unknown;
  onRetry?: () => void;
}

// What a page shows when the API call behind it failed: the real reason and a retry. The dashboard used to
// fill such a page with invented rows; nothing is invented any more.
export function errorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'message' in error && typeof (error as { message: unknown }).message === 'string') {
    return (error as { message: string }).message;
  }
  return 'Server tidak menjawab atau mengirim data yang tidak lengkap.';
}

export default function QueryError({ title, error, onRetry }: QueryErrorProps) {
  return (
    <div className="p-5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-start gap-2">
        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div>
          <div className="font-bold">{title}</div>
          <div className="text-xs mt-0.5">{errorMessage(error)}</div>
        </div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-2 shrink-0"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Coba lagi</span>
        </button>
      )}
    </div>
  );
}
