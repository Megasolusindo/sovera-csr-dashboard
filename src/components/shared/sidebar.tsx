'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Building2, Radio, FolderKanban, BookOpen, 
  Settings, LogOut, Sparkles, Megaphone, Inbox, Search, Building, Handshake, Send 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Navigation Items for NGO / Humanitarian Organizations
const ngoNavItems = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'AI Chat Assistant', href: '/chat', icon: Sparkles },
  { label: 'Corporate Directory', href: '/corporates', icon: Building2 },
  { label: 'Corporate Feed', href: '/signals', icon: Radio },
  { label: 'Programs', href: '/programs', icon: BookOpen },
  { label: 'Deal Pipeline', href: '/pipeline', icon: FolderKanban },
  { label: 'Proposal Terkirim', href: '/proposals/sent', icon: Send },
  { label: 'Settings', href: '/settings', icon: Settings },
];

// Navigation Items for Corporate / TJSL / ESG Units
const corporateNavItems = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'CSR Opportunities', href: '/opportunities', icon: Megaphone },
  { label: 'Proposal Masuk', href: '/proposals/inbox', icon: Inbox },
  { label: 'Cari Verified NGO', href: '/ngos', icon: Search },
  { label: 'Profil Perusahaan', href: '/corporate/profile', icon: Building },
  { label: 'Kemitraan Aktif', href: '/partnerships', icon: Handshake },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isCorporate = user?.tenant_type === 'CORPORATE';
  const navItems = isCorporate ? corporateNavItems : ngoNavItems;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="h-16 px-6 border-b border-slate-100 flex items-center gap-3">
        <div className={`w-9 h-9 rounded-lg ${isCorporate ? 'bg-indigo-700' : 'bg-emerald-700'} text-white flex items-center justify-center font-bold shadow-sm`}>
          <Sparkles className="w-5 h-5 text-amber-200" />
        </div>
        <div>
          <span className="font-bold text-slate-900 text-lg leading-tight block">CSRmatics</span>
          <span className={`text-[10px] font-medium uppercase tracking-wider block whitespace-nowrap ${isCorporate ? 'text-indigo-700' : 'text-emerald-700'}`}>
            {isCorporate ? 'Corporate Portal' : 'NGO FundIQ Enterprise'}
          </span>
        </div>
      </div>

      {/* User Tenant Info Badge */}
      {user && (
        <div className="px-4 py-3 mx-3 mt-3 bg-slate-50 border border-slate-100 rounded-lg">
          <p className="text-xs font-semibold text-slate-900 truncate">{user.org_name || user.full_name}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`w-2 h-2 rounded-full ${isCorporate ? 'bg-indigo-500' : 'bg-emerald-500'}`} />
            <span className="text-[11px] font-medium text-slate-500 uppercase">{user.tenant_type || 'ORGANIZATION'}</span>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                isActive
                  ? isCorporate 
                    ? 'bg-indigo-50 text-indigo-700 font-semibold border-r-2 border-indigo-600'
                    : 'bg-emerald-50 text-emerald-700 font-semibold border-r-2 border-emerald-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? (isCorporate ? 'text-indigo-700' : 'text-emerald-700') : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-slate-100">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4 text-slate-400" />
          <span>Keluar Sesi</span>
        </button>
      </div>
    </aside>
  );
}
