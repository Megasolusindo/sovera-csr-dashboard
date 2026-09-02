'use client';

import React, { useState, useEffect } from 'react';
import { useSettings, useUpdateSettings } from '@/hooks/useSettings';
import { Settings, ShieldCheck, Globe, Key, Building, Mail, MapPin, Users, Save, CheckCircle2, Server } from 'lucide-react';

export default function SettingsPage() {
  const { data: settings, isLoading } = useSettings();
  const updateMutation = useUpdateSettings();

  const [activeTab, setActiveTab] = useState<'profile' | 'integration' | 'team'>('profile');
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
            Konfigurasi profil lembaga, kredensial integrasi scraper webhook, dan kontrol akses tim.
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
          onClick={() => setActiveTab('integration')}
          className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'integration'
              ? 'border-emerald-700 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>2. Integrasi Scraper & Webhook</span>
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
          <span>3. Keamanan RLS & Akses Tim</span>
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

          {/* Tab 2: Integrasi Scraper & Webhook */}
          {activeTab === 'integration' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 mb-4">Konfigurasi Crawling Engine & Webhook Callbacks</h3>

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
                <p className="text-[11px] text-slate-400 mt-1">Endpoint HTTP tempat Backend Orchestrator mengirimkan tugas scraping periodik.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Server className="w-3.5 h-3.5 text-slate-400" />
                  <span>Webhook Callback URL (`WEBHOOK_URL`) *</span>
                </label>
                <input
                  type="text"
                  required
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                />
                <p className="text-[11px] text-slate-400 mt-1">Endpoint callback tempat Scraper Service mengirimkan sinyal hasil scraping PDF/laporan BEI.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Key className="w-3.5 h-3.5 text-slate-400" />
                  <span>Secret API Key (`SOVERA_API_KEY`)</span>
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                />
              </div>
            </div>
          )}

          {/* Tab 3: Keamanan RLS & Akses Tim */}
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
