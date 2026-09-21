'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Building2,
  Bell,
  ChevronDown,
  ShieldCheck,
  UserCheck,
  Briefcase,
  Target,
  LogOut,
  Sparkles,
  Lock,
} from 'lucide-react';
import { useAuth, SEED_ACCOUNTS } from '@/context/AuthContext';
import { UserRole } from '@/types/api';

export default function Topbar() {
  const router = useRouter();
  const { user, quickLogin, logout } = useAuth();
  const [isOpenRoleMenu, setIsOpenRoleMenu] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  const handleRoleSwitch = async (role: UserRole) => {
    setIsSwitching(true);
    try {
      await quickLogin(role);
      setIsOpenRoleMenu(false);
      window.location.reload(); // Refresh page to ensure clean query state
    } catch (e) {
      console.error('Failed to switch role:', e);
    } finally {
      setIsSwitching(false);
    }
  };

  const roleBadges: Record<UserRole, { label: string; bg: string; text: string; border: string; icon: React.ReactNode }> = {
    ORG_ADMIN: {
      label: 'ORG_ADMIN',
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      border: 'border-emerald-200',
      icon: <UserCheck className="w-3.5 h-3.5 text-emerald-600" />,
    },
    DIRECTOR: {
      label: 'DIRECTOR',
      bg: 'bg-teal-50',
      text: 'text-teal-800',
      border: 'border-teal-200',
      icon: <Briefcase className="w-3.5 h-3.5 text-teal-600" />,
    },
    FUNDRAISER: {
      label: 'FUNDRAISER',
      bg: 'bg-cyan-50',
      text: 'text-cyan-800',
      border: 'border-cyan-200',
      icon: <Target className="w-3.5 h-3.5 text-cyan-600" />,
    },
    CORP_ADMIN: {
      label: 'CORP_ADMIN',
      bg: 'bg-indigo-50',
      text: 'text-indigo-800',
      border: 'border-indigo-200',
      icon: <UserCheck className="w-3.5 h-3.5 text-indigo-600" />,
    },
    CSR_MANAGER: {
      label: 'CSR_MANAGER',
      bg: 'bg-blue-50',
      text: 'text-blue-800',
      border: 'border-blue-200',
      icon: <Briefcase className="w-3.5 h-3.5 text-blue-600" />,
    },
    REVIEWER: {
      label: 'REVIEWER',
      bg: 'bg-slate-100',
      text: 'text-slate-800',
      border: 'border-slate-300',
      icon: <UserCheck className="w-3.5 h-3.5 text-slate-600" />,
    },
    SUPERADMIN: {
      label: 'SUPERADMIN',
      bg: 'bg-purple-50',
      text: 'text-purple-800',
      border: 'border-purple-200',
      icon: <UserCheck className="w-3.5 h-3.5 text-purple-600" />,
    },
  };

  const currentRole = user?.role || 'FUNDRAISER';
  const badgeInfo = roleBadges[currentRole] || roleBadges.FUNDRAISER;

  const isCorporate =
    user?.tenant_type === 'CORPORATE' ||
    user?.role === 'CORP_ADMIN' ||
    user?.role === 'CSR_MANAGER' ||
    user?.role === 'REVIEWER';

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      {/* Left: Multi-Tenant RLS Status & Organization Identifier */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800">
          <Building2 className={`w-4 h-4 ${isCorporate ? 'text-indigo-700' : 'text-emerald-700'}`} />
          <span className="font-semibold text-slate-900">{user?.org_name || (isCorporate ? 'Corporate (demo)' : 'LAZ Peduli Ummat')}</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded ml-1 ${isCorporate ? 'bg-indigo-100 text-indigo-800' : 'bg-emerald-100 text-emerald-800'}`}>
            {isCorporate ? 'BUMN & Korporasi' : 'Zakat & Wakaf'}
          </span>
        </div>

        <div className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${isCorporate ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Multi-Tenant RLS Isolated</span>
        </div>
      </div>

      {/* Right: Notifications & Dynamic Role Switcher (RBAC Demo) */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full ${isCorporate ? 'bg-indigo-600' : 'bg-emerald-600'}`} />
        </button>

        <div className="h-6 w-px bg-slate-200" />

        {/* User Profile & Quick RBAC Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setIsOpenRoleMenu(!isOpenRoleMenu)}
            className="flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-xl transition-colors text-left border border-transparent hover:border-slate-200"
          >
            <div className={`w-9 h-9 rounded-full ${isCorporate ? 'bg-indigo-900' : 'bg-slate-900'} text-white flex items-center justify-center font-bold text-xs shadow-sm`}>
              {user?.full_name ? user.full_name.substring(0, 2).toUpperCase() : 'US'}
            </div>
            <div className="hidden sm:block">
              <span className="text-xs font-bold text-slate-900 block leading-tight flex items-center gap-1">
                {user?.full_name || 'Guest User'}
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded border ${badgeInfo.bg} ${badgeInfo.text} ${badgeInfo.border}`}>
                  {badgeInfo.label}
                </span>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {/* Role Switcher Dropdown */}
          {isOpenRoleMenu && (
            <div className="absolute right-0 top-12 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in space-y-2 max-h-[80vh] overflow-y-auto">
              <div className="px-2 py-1 flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-600" />
                  <span>Simulasi Role RBAC</span>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                  Live JWT
                </span>
              </div>

              <div className="space-y-1">
                {(['ORG_ADMIN', 'DIRECTOR', 'FUNDRAISER', 'CORP_ADMIN', 'CSR_MANAGER', 'REVIEWER'] as UserRole[]).map((r) => {
                  const acc = SEED_ACCOUNTS[r];
                  const isCurrent = user?.role === r;

                  return (
                    <button
                      key={r}
                      disabled={isSwitching}
                      onClick={() => handleRoleSwitch(r)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs flex items-start gap-2.5 transition-all ${
                        isCurrent
                          ? 'bg-indigo-50 text-indigo-950 border border-indigo-200 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      <div className="mt-0.5">{roleBadges[r]?.icon || <UserCheck className="w-3.5 h-3.5" />}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold">{acc?.roleName ? acc.roleName.split(' ')[0] : r}</span>
                          {isCurrent && (
                            <span className="text-[10px] bg-indigo-600 text-white px-1.5 py-0.2 rounded-full">
                              Aktif
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">{acc?.label || r}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={logout}
                  className="w-full px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar dari Akun</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
