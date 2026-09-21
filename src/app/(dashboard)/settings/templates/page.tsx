'use client';

import React from 'react';
import { useTemplates, useUploadTemplate, useResetTemplate } from '@/hooks/useTemplates';
import { FileSpreadsheet, FileText, Upload, RefreshCw, Sparkles, FolderKanban } from 'lucide-react';

export default function TemplatesSettingsPage() {
  const { data: templateData, isLoading } = useTemplates();
  const uploadMutation = useUploadTemplate();
  const resetMutation = useResetTemplate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
          <FileSpreadsheet className="w-6 h-6 text-emerald-700" />
          <span>Master Template S3 (.PPTX & .DOCX)</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Unggah berkas master presentation & proposal resmi lembaga Anda untuk generasi proposal otomatis berbasis Gemini AI.
        </p>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-slate-500 font-medium">Memuat Master Template Data...</div>
      ) : (
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
                Format master PowerPoint (.pptx) resmi lembaga Anda lengkap dengan logo dan tata letak warna. AI Gemini akan memindai slide dan mengisikan konten terpersonalisasi secara otomatis.
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
                Format dokumen proposal (.docx) resmi lembaga Anda lengkap dengan kop surat dan header/footer. AI Gemini akan menyusun seluruh narasi proposal secara otomatis.
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

          {/* Zero-Tag AI Guide */}
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
    </div>
  );
}
