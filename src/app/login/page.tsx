'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, SEED_ACCOUNTS } from '@/context/AuthContext';
import { UserRole } from '@/types/api';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  Building2,
  AlertCircle,
  UserCheck,
  Briefcase,
  Target,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, quickLogin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      await login(email, password);
      router.push('/signals');
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal masuk. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = async (role: UserRole) => {
    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      await quickLogin(role);
      router.push('/signals');
    } catch (err: any) {
      setErrorMsg(err.message || 'Quick login gagal.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Dynamic Background Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-sm">
          <ShieldCheck className="w-4 h-4" />
          <span>CSRmatics Enterprise Multi-Tenant RBAC</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
          CSRmatics Intelligence Platform
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Masuk ke portal B2B Fundraising & CSR Matching Engine
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl relative z-10 px-4 sm:px-0">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 shadow-2xl rounded-2xl p-6 sm:p-8">
          
          {/* Quick Role Switcher Section for Demo */}
          <div className="mb-6 p-4 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Quick Login Switcher (Demo RBAC)
              </span>
              <span className="text-[10px] text-slate-500">Seed Accounts</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* ORG_ADMIN */}
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleQuickLogin('ORG_ADMIN')}
                className="group p-3 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-emerald-950/40 hover:border-emerald-500/40 text-left transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200 group-hover:text-emerald-400">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>ORG_ADMIN</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Akses Penuh Tim</div>
                </div>
                <div className="text-[10px] text-emerald-500/80 font-mono mt-2 flex items-center justify-between">
                  <span>admin@laz.id</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>

              {/* DIRECTOR */}
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleQuickLogin('DIRECTOR')}
                className="group p-3 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-teal-950/40 hover:border-teal-500/40 text-left transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200 group-hover:text-teal-400">
                    <Briefcase className="w-3.5 h-3.5 text-teal-500" />
                    <span>DIRECTOR</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Program & Deal Review</div>
                </div>
                <div className="text-[10px] text-teal-500/80 font-mono mt-2 flex items-center justify-between">
                  <span>director@laz.id</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>

              {/* FUNDRAISER */}
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleQuickLogin('FUNDRAISER')}
                className="group p-3 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-cyan-950/40 hover:border-cyan-500/40 text-left transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200 group-hover:text-cyan-400">
                    <Target className="w-3.5 h-3.5 text-cyan-500" />
                    <span>FUNDRAISER</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Personal Pipeline</div>
                </div>
                <div className="text-[10px] text-cyan-500/80 font-mono mt-2 flex items-center justify-between">
                  <span>fundraiser@laz.id</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            </div>
          </div>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-slate-800" />
            <span className="flex-shrink mx-4 text-[11px] text-slate-500 uppercase tracking-widest">
              atau masuk dengan email
            </span>
            <div className="flex-grow border-t border-slate-800" />
          </div>

          {/* Alert Error */}
          {errorMsg && (
            <div className="mb-5 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Standard Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email Lembaga
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@laz.id"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Masuk ke Platform</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <div className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <Building2 className="w-3.5 h-3.5 text-slate-600" />
          <span>LAZ Peduli Ummat (Tenant ID: 77123aaa-8819-4c12-99a1-00123456789a)</span>
        </div>
      </div>
    </div>
  );
}
