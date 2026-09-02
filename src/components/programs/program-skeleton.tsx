'use client';

import React from 'react';

export default function ProgramSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <div className="h-3 bg-slate-200 rounded w-1/4" />
          <div className="h-5 bg-slate-200 rounded w-3/4" />
        </div>
        <div className="h-6 bg-slate-200 rounded-full w-24" />
      </div>

      <div className="flex gap-2">
        <div className="h-5 bg-slate-100 rounded w-1/3" />
        <div className="h-5 bg-slate-100 rounded w-1/3" />
      </div>

      <div className="space-y-2">
        <div className="h-3 bg-slate-100 rounded w-full" />
        <div className="h-3 bg-slate-100 rounded w-5/6" />
      </div>

      <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
        <div className="h-4 bg-slate-200 rounded w-1/3" />
        <div className="h-4 bg-slate-200 rounded w-1/4" />
      </div>
    </div>
  );
}
