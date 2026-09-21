'use client';

import React, { useState, useEffect } from 'react';
import { useSettings, useUpdateSettings } from '@/hooks/useSettings';
import { Building, ShieldCheck, Mail, MapPin, Save, CheckCircle2 } from 'lucide-react';

export default function ProfileSettingsForm() {
  const { data: settings, isLoading } = useSettings();
  const updateMutation = useUpdateSettings();
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
      setInstitutionName(settings.institution_name || '');
      setRegistrationNumber(settings.registration_number || '');
      setOfficeAddress(settings.office_address || '');
      setContactEmail(settings.contact_email || '');
      setScraperServiceUrl(settings.scraper_service_url || '');
      setWebhookUrl(settings.webhook_url || '');
      setApiKey(settings.api_key || '');
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <Building className="w-6 h-6 text-emerald-700" />
            <span>Profil Lembaga & Identitas Organisasi</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola data legalitas lembaga, nomor izin operasional LAZ / Kepmenag, dan alamat resmi.
          </p>
        </div>

        {saveSuccess && (
          <div className="px-3.5 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Perubahan berhasil disimpan!</span>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-slate-500 font-medium">Memuat Data Profil Lembaga...</div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 mb-4">Informasi Legalitas & Alamat</h3>

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
              <span>{updateMutation.isPending ? 'Menyimpan Profile...' : 'Simpan Perubahan Profile'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
