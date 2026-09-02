'use client';

import React, { useState } from 'react';
import { Building2, Bell, ChevronDown, ShieldCheck, HeartHandshake } from 'lucide-react';
import { OrgType } from '@/types/api';

export default function Topbar() {
  const [currentOrgType, setCurrentOrgType] = useState<OrgType>('ZAKAT_WAQF_INSTITUTION');
  const [isOpen, setIsOpen] = useState(false);

  const orgPresets: { name: string; type: OrgType; label: string }[] = [
    { name: 'LAZ Peduli Ummat', type: 'ZAKAT_WAQF_INSTITUTION', label: 'Zakat & Wakaf' },
    { name: 'Yayasan Nusantara Kemanusiaan', type: 'HUMANITARIAN_NGO', label: 'NGO Kemanusiaan' },
    { name: 'Aksi Tanggap Bencana ID', type: 'DISASTER_RELIEF', label: 'Tanggap Bencana' },
    { name: 'Yayasan Konservasi Iklim', type: 'ENVIRONMENT_CONSERVATION', label: 'Lingkungan & Iklim' },
  ];

  const activeOrg = orgPresets.find((o) => o.type === currentOrgType) || orgPresets[0];

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Dynamic Multi-Sector Tenant Identity Selector */}
      <div className="flex items-center gap-3 relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-800 transition-colors"
        >
          <Building2 className="w-4 h-4 text-emerald-700" />
          <span className="font-semibold text-slate-900">{activeOrg.name}</span>
          <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded ml-1">
            {activeOrg.label}
          </span>
          <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
        </button>

        {isOpen && (
          <div className="absolute top-12 left-0 w-72 bg-white border border-slate-200 rounded-xl shadow-lg p-2 z-50 space-y-1 animate-in fade-in">
            <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Simulasi Profil Tenant (Multi-Sector)
            </div>
            {orgPresets.map((preset) => (
              <button
                key={preset.type}
                onClick={() => {
                  setCurrentOrgType(preset.type);
                  localStorage.setItem('sovera_active_org_type', preset.type);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                  currentOrgType === preset.type
                    ? 'bg-emerald-50 text-emerald-900 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{preset.name}</span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  {preset.label}
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Multi-Tenant RLS</span>
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
            <span className="text-xs text-slate-500 block">Director of Partnerships</span>
          </div>
        </div>
      </div>
    </header>
  );
}
