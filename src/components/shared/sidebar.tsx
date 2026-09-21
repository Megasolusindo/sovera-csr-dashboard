'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Building2, Radio, FolderKanban, BookOpen, 
  Settings, LogOut, Sparkles, Megaphone, Inbox, Search, Building, Handshake, Send,
  ChevronDown, ChevronRight, FileSpreadsheet, ShieldCheck, Zap, CreditCard
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
];

// Navigation Items for Corporate / TJSL / ESG Units
const corporateNavItems = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'AI Chat Assistant', href: '/chat', icon: Sparkles },
  { label: 'Organization Directory', href: '/ngos', icon: Building2 },
  { label: 'CSR Intelligence', href: '/intelligence', icon: Zap },
  { label: 'CSR Feed', href: '/signals', icon: Radio },
  { label: 'Programs', href: '/programs', icon: BookOpen },
  { label: 'Partnership Pipeline', href: '/pipeline', icon: FolderKanban },
  { label: 'Proposal Masuk', href: '/proposals/inbox', icon: Inbox },
];

// Settings Sub-Menu Navigation Items
const settingsSubItems = [
  { label: 'Profil Lembaga', href: '/settings/profile', icon: Building },
  { label: 'Master Template S3', href: '/settings/templates', icon: FileSpreadsheet },
  { label: 'Akses Tim & RLS', href: '/settings/team', icon: ShieldCheck },
  { label: 'Langganan Enterprise', href: '/settings/subscription', icon: Zap },
  { label: 'Riwayat Invoicing', href: '/settings/billing', icon: CreditCard },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isCorporate =
    user?.tenant_type === 'CORPORATE' ||
    user?.role === 'CORP_ADMIN' ||
    user?.role === 'CSR_MANAGER' ||
    user?.role === 'REVIEWER';

  const navItems = isCorporate ? corporateNavItems : ngoNavItems;

  const isSettingsActive = pathname.startsWith('/settings');
  const [isSettingsOpen, setIsSettingsOpen] = useState(isSettingsActive);

  useEffect(() => {
    if (pathname.startsWith('/settings')) {
      setIsSettingsOpen(true);
    }
  }, [pathname]);

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

        {/* Settings Parent Menu & Sub-Menu */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
              isSettingsActive
                ? isCorporate
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'bg-emerald-50 text-emerald-700 font-semibold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <Settings className={`w-5 h-5 ${isSettingsActive ? (isCorporate ? 'text-indigo-700' : 'text-emerald-700') : 'text-slate-400'}`} />
              <span>Settings</span>
            </div>
            {isSettingsOpen ? (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Sub-menu Items */}
          {isSettingsOpen && (
            <div className="ml-4 pl-3 my-1 border-l-2 border-slate-200 space-y-1 transition-all">
              {settingsSubItems.map((sub) => {
                const SubIcon = sub.icon;
                const isSubActive =
                  pathname === sub.href ||
                  (sub.href === '/settings/profile' && pathname === '/settings');

                return (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-xs transition-all duration-150 ${
                      isSubActive
                        ? isCorporate
                          ? 'bg-indigo-100/70 text-indigo-800 font-bold'
                          : 'bg-emerald-100/70 text-emerald-800 font-bold'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'
                    }`}
                  >
                    <SubIcon className={`w-4 h-4 ${isSubActive ? (isCorporate ? 'text-indigo-700' : 'text-emerald-700') : 'text-slate-400'}`} />
                    <span>{sub.label}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
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
