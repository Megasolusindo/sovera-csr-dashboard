'use client';

import React from 'react';
import { Building2, Bell, ChevronDown, ShieldCheck } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Tenant Selector Indicator */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800">
          <Building2 className="w-4 h-4 text-emerald-700" />
          <span className="font-semibold text-slate-900">LAZ Peduli Ummat</span>
          <span className="text-xs bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded ml-1">PRO</span>
          <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
        </div>

        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Kernel RLS Protected</span>
        </div>
      </div>

      {/* Right: Notifications & User Profile */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-600 rounded-full" />
        </button>

        <div className="h-6 w-px bg-slate-200" />

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            PU
          </div>
          <div className="hidden sm:block text-left">
            <span className="text-sm font-semibold text-slate-900 block leading-tight">Ahmad Fauzi</span>
            <span className="text-xs text-slate-500 block">Kadiv Fundraising B2B</span>
          </div>
        </div>
      </div>
    </header>
  );
}
