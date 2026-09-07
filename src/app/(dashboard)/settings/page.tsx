'use client';

import React, { useState, useEffect } from 'react';
import { useSettings, useUpdateSettings } from '@/hooks/useSettings';
import { useTemplates, useUploadTemplate, useResetTemplate } from '@/hooks/useTemplates';
import { useTokenUsage } from '@/hooks/useTokenUsage';
import { Settings, ShieldCheck, Globe, Key, Building, Mail, MapPin, Users, Save, CheckCircle2, Server, Lock, AlertCircle, FileText, Upload, RefreshCw, FileSpreadsheet, Code, Cpu, DollarSign, Activity, Sparkles } from 'lucide-react';

export default function SettingsPage() {
  const { data: settings, isLoading } = useSettings();
  const updateMutation = useUpdateSettings();

  const { data: templateData } = useTemplates();
  const { data: tokenUsage } = useTokenUsage();
  const uploadMutation = useUploadTemplate();
  const resetMutation = useResetTemplate();

  const [activeTab, setActiveTab] = useState<'profile' | 'templates' | 'tokens' | 'team' | 'integration'>('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form State
  const [institutionName, setInstitutionName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [officeAddress, setOfficeAddress] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [scraperServiceUrl, setScraperServiceUrl] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    if (settings) {
      setInstitutionName(settings.institution_name);
      setRegistrationNumber(settings.registration_number);
      setOfficeAddress(settings.office_address);
      setContactEmail(settings.contact_email);
      setScraperServiceUrl(settings.scraper_service_url);
      setWebhookUrl(settings.webhook_url);
      setApiKey(settings.api_key);
    }
  }, [settings]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(
      {
        institution_name: institutionName,
        registration_number: registrationNumber,
        office_address: officeAddress,
        contact_email: contactEmail,
        scraper_service_url: scraperServiceUrl,
        webhook_url: webhookUrl,
        api_key: apiKey,
      },
      {
        onSuccess: () => {
          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 3000);
        },
      }
    );
  };

  const teamMembers = [
    { name: 'M. Lulu D. K.', role: 'Admin Organization & Lead Fundraiser', email: 'lulu@peduliummat.org', status: 'Active' },
    { name: 'Siti Aminah', role: 'B2B Account Executive', email: 'siti@peduliummat.org', status: 'Active' },
    { name: 'Rahmat Hidayat', role: 'Data Crawler & Integration Specialist', email: 'rahmat@peduliummat.org', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-emerald-700" />
            <span>Pengaturan Organisasi & Multi-Tenant RLS</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola profil lembaga, kontrol akses pengguna internal, dan integrasi platform.
          </p>
        </div>

        {saveSuccess && (
          <div className="px-3.5 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Perubahan berhasil disimpan!</span>
          </div>
        )}
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'border-emerald-700 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>1. Profil Lembaga</span>
        </button>

        <button
          onClick={() => setActiveTab('templates')}
          className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'templates'
              ? 'border-emerald-700 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>2. Master Template S3 (PPTX & DOCX)</span>
          <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-emerald-100 text-emerald-800 rounded border border-emerald-200 uppercase">
            Multi-Tenant
          </span>
        </button>

        <button
          onClick={() => setActiveTab('tokens')}
          className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'tokens'
              ? 'border-emerald-700 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>3. Metering Token AI (Gemini)</span>
          <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-amber-100 text-amber-800 rounded border border-amber-200 uppercase">
            Realtime Cost
          </span>
        </button>

        <button
          onClick={() => setActiveTab('team')}
          className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'team'
              ? 'border-emerald-700 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>4. Keamanan RLS & Akses Tim</span>
        </button>

        <button
          onClick={() => setActiveTab('integration')}
          className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'integration'
              ? 'border-emerald-700 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>5. Integrasi Infrastructure</span>
          <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-amber-100 text-amber-800 rounded border border-amber-200 flex items-center gap-0.5">
            <Lock className="w-2.5 h-2.5" />
            <span>Platform Admin</span>
          </span>
        </button>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-500">Memuat Pengaturan Organisasi...</div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Tab 1: Profil Lembaga */}
          {activeTab === 'profile' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 mb-4">Informasi Profil Lembaga</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>Nama Lembaga / Yayasan *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span>Nomor Izin LAZ / Kepmenag *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Email Kontak Resmi *</span>
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Alamat Kantor Pusat</span>
                </label>
                <textarea
                  rows={3}
                  value={officeAddress}
                  onChange={(e) => setOfficeAddress(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* Tab 2: Master Template S3 (PPTX & DOCX) */}
          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div className="bg-emerald-900 text-white p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-bold">Multi-Tenant OpenXML Master Template System</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Unggah file master PowerPoint (.pptx) dan Word (.docx) buatan desainer Anda ke Object Storage (S3). Sovera AI akan menyisipkan isi proposal & slide secara presisi ke dalam placeholder tag.
                  </p>
                </div>

                <span className="px-3 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full whitespace-nowrap">
                  S3-Compatible Enabled
                </span>
              </div>

              {/* Upload Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. PowerPoint Master */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-amber-600" />
                      <span>Master Presentation (.pptx)</span>
                    </h3>
                    <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded border ${
                      templateData?.pptx_s3_key
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {templateData?.pptx_s3_key ? 'Custom S3 Template' : 'System Default Master'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Format master PowerPoint (.pptx) resmi lembaga Anda lengkap dengan logo dan tata letak warna. AI Gemini akan memindai slide dan mengisikan konten terpersonalisasi secara otomatis tanpa memerlukan tag manual.
                  </p>

                  {templateData?.pptx_s3_key && (
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 truncate">
                      S3 Key: {templateData.pptx_s3_key}
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2">
                    <label className="flex-1">
                      <input
                        type="file"
                        accept=".pptx"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            uploadMutation.mutate({ file, type: 'pptx' });
                          }
                        }}
                      />
                      <span className="w-full px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm cursor-pointer transition-all flex items-center justify-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploadMutation.isPending ? 'Uploading...' : 'Unggah Master .PPTX'}</span>
                      </span>
                    </label>

                    {templateData?.pptx_s3_key && (
                      <button
                        type="button"
                        onClick={() => resetMutation.mutate('pptx')}
                        className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors flex items-center gap-1"
                        title="Reset ke Template Bawaan Sistem"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. Word Master */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-700" />
                      <span>Master Proposal (.docx)</span>
                    </h3>
                    <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded border ${
                      templateData?.docx_s3_key
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {templateData?.docx_s3_key ? 'Custom S3 Template' : 'System Default Master'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Format dokumen proposal (.docx) resmi lembaga Anda lengkap dengan kop surat dan header/footer. AI Gemini akan menyusun seluruh narasi proposal secara otomatis tanpa memerlukan tag manual.
                  </p>

                  {templateData?.docx_s3_key && (
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 truncate">
                      S3 Key: {templateData.docx_s3_key}
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2">
                    <label className="flex-1">
                      <input
                        type="file"
                        accept=".docx"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            uploadMutation.mutate({ file, type: 'docx' });
                          }
                        }}
                      />
                      <span className="w-full px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm cursor-pointer transition-all flex items-center justify-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploadMutation.isPending ? 'Uploading...' : 'Unggah Master .DOCX'}</span>
                      </span>
                    </label>

                    {templateData?.docx_s3_key && (
                      <button
                        type="button"
                        onClick={() => resetMutation.mutate('docx')}
                        className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors flex items-center gap-1"
                        title="Reset ke Template Bawaan Sistem"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Zero-Tag AI Master Template Guide */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    <span>Dukungan Zero-Tag & Semantic AI Master Template</span>
                  </h3>
                  <span className="text-xs text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 font-semibold">
                    Automatic Semantic Filler
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Anda tidak wajib menambahkan kode tag manual pada file master. Cukup unggah berkas proposal (.docx) atau slide (.pptx) resmi lembaga Anda. AI Gemini akan memindai tata letak dokumen dan menyisipkan narasi terpersonalisasi secara otomatis.
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Metering Token AI (Gemini) */}
          {activeTab === 'tokens' && (
            <div className="space-y-6">
              {/* Header Banner */}
              <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-amber-400" />
                    <span className="text-sm font-bold">AI Token Metering & Cost Tracking (Gemini API)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Pencatatan real-time penggunaan token prompt & completion serta estimasi biaya API Gemini per organisasi.
                  </p>
                </div>

                <span className="px-3 py-1 text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full whitespace-nowrap">
                  Gemini 1.5 Flash Active
                </span>
              </div>

              {/* Metric Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Metric 1: Total Tokens */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-bold uppercase tracking-wider">Total Token Digunakan</span>
                    <Cpu className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {(tokenUsage?.total_tokens || 0).toLocaleString('id-ID')} <span className="text-xs font-semibold text-slate-500">tokens</span>
                  </div>
                  <p className="text-[11px] text-slate-500 pt-1">
                    Prompt: {(tokenUsage?.total_prompt_tokens || 0).toLocaleString('id-ID')} | Completion: {(tokenUsage?.total_completion_tokens || 0).toLocaleString('id-ID')}
                  </p>
                </div>

                {/* Metric 2: Estimated Cost USD */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-bold uppercase tracking-wider">Estimasi Biaya (USD)</span>
                    <DollarSign className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    ${(tokenUsage?.total_cost_usd || 0).toFixed(6)}
                  </div>
                  <p className="text-[11px] text-slate-500 pt-1">Tarif resmi Google Gemini API ($0.075 / 1M input)</p>
                </div>

                {/* Metric 3: Estimated Cost IDR */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-bold uppercase tracking-wider">Estimasi Biaya (IDR)</span>
                    <Activity className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    Rp {(tokenUsage?.total_cost_idr || 0).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <p className="text-[11px] text-slate-500 pt-1">Konversi kurs Rp 16.000 / USD</p>
                </div>
              </div>

              {/* Recent AI Token Log Table */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-700" />
                    <span>Riwayat Log Penggunaan AI Token Terbaru</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">10 Aktivitas Terakhir</span>
                </div>

                {tokenUsage?.recent_logs && tokenUsage.recent_logs.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase">
                          <th className="p-3">Fitur AI</th>
                          <th className="p-3">Model</th>
                          <th className="p-3 text-right">Prompt Tokens</th>
                          <th className="p-3 text-right">Completion Tokens</th>
                          <th className="p-3 text-right">Total Tokens</th>
                          <th className="p-3 text-right">Cost (USD)</th>
                          <th className="p-3 text-right">Waktu</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                        {tokenUsage.recent_logs.map((log) => (
                          <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-3 font-sans font-bold text-slate-900">
                              <span className="px-2 py-0.5 text-[10px] font-extrabold bg-emerald-100 text-emerald-800 rounded border border-emerald-200 uppercase">
                                {log.feature_name}
                              </span>
                            </td>
                            <td className="p-3 font-sans text-slate-600">{log.model_name}</td>
                            <td className="p-3 text-right text-slate-600">{log.prompt_tokens}</td>
                            <td className="p-3 text-right text-slate-600">{log.completion_tokens}</td>
                            <td className="p-3 text-right font-bold text-slate-900">{log.total_tokens}</td>
                            <td className="p-3 text-right text-emerald-700 font-bold">${log.estimated_cost_usd.toFixed(6)}</td>
                            <td className="p-3 text-right font-sans text-slate-400 text-[11px]">
                              {new Date(log.created_at).toLocaleString('id-ID')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-500 text-xs">
                    Belum ada log penggunaan token AI. Gunakan fitur AI Proposal Studio untuk memulai generasi teks.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Keamanan RLS & Akses Tim */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              {/* Tenant RLS Status Card */}
              <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-bold">PostgreSQL Row Level Security (RLS) Active</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Tenant ID: <code className="bg-slate-800 text-emerald-300 px-2 py-0.5 rounded font-mono">{settings?.tenant_id}</code>
                  </p>
                </div>

                <span className="px-3 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                  Isolated Tenant Partitioning
                </span>
              </div>

              {/* Team Members List */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-700" />
                    <span>Anggota Tim Organisasi Terdaftar</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">3 Pengguna Terdaftar</span>
                </div>

                <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                  {teamMembers.map((member) => (
                    <div key={member.email} className="p-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{member.name}</h4>
                        <span className="text-xs text-slate-500">{member.email}</span>
                      </div>

                      <div className="text-right space-y-1">
                        <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-800 rounded border border-emerald-200 block">
                          {member.role}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">{member.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Integrasi Infrastructure (SuperAdmin Only) */}
          {activeTab === 'integration' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              {/* Notice Bar */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-sm">Pengaturan Infrastruktur Sistem (Platform SuperAdmin)</h4>
                  <p className="text-amber-800 leading-relaxed">
                    Bagian ini mengonfigurasi Orkes Pendistribusian WebScraper Engine & Webhook Callback global. Pengaturan ini mempengaruhi seluruh pemindaian sinyal terpusat Sovera Core API.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    <span>Scraper Service URL (`SCRAPER_SERVICE_URL`) *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={scraperServiceUrl}
                    onChange={(e) => setScraperServiceUrl(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Endpoint HTTP tempat Backend Orchestrator mengirimkan tugas pemindaian laporan BEI.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Server className="w-3.5 h-3.5 text-slate-400" />
                    <span>Webhook Ingestion URL (`WEBHOOK_URL`) *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Endpoint callback penerima payload sinyal PDF dari Scraper Engine.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Key className="w-3.5 h-3.5 text-slate-400" />
                    <span>Master API Secret Key (`SOVERA_API_KEY`)</span>
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submit Button Bar */}
          <div className="flex items-center justify-end pt-4 border-t border-slate-200">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {updateMutation.isPending ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{updateMutation.isPending ? 'Menyimpan Settings...' : 'Simpan Perubahan Settings'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
