import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'CSRmatics — Two-Sided CSR Intelligence & Partnership Platform';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#020617',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          color: '#f8fafc',
          position: 'relative',
        }}
      >
        {/* Background Ambient Glows */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(16,185,129,0.25) 0%, rgba(2,6,23,0) 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-100px',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(2,6,23,0) 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Top Header / Logo Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', zIndex: 10 }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 25px rgba(16,185,129,0.3)',
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ecfdf5"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.5px', color: '#ffffff' }}>
              CSRmatics
            </span>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#34d399', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Two-Sided CSR Platform
            </span>
          </div>
        </div>

        {/* Middle Main Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '900px', zIndex: 10 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '100px',
              backgroundColor: '#064e3b',
              border: '1px solid #047857',
              color: '#6ee7b7',
              fontSize: '14px',
              fontWeight: 600,
              width: 'fit-content',
            }}
          >
            ✦ Where CSR Meets Impact
          </div>
          <h1
            style={{
              fontSize: '48px',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: '-1px',
            }}
          >
            Akselerasi Kemitraan CSR Antara Korporasi & NGO Berbasis AI
          </h1>
          <p style={{ fontSize: '20px', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
            Platform intelijen dua arah yang mempertemukan perusahaan BUMN/Tbk dengan lembaga sosial terverifikasi secara presisi.
          </p>
        </div>

        {/* Bottom Metrics Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            paddingTop: '24px',
            borderTop: '1px solid #1e293b',
            width: '100%',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '24px', fontWeight: 900, color: '#6366f1' }}>3.000+</span>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Korporasi Verified</span>
          </div>
          <div style={{ width: '1px', height: '32px', backgroundColor: '#334155' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '24px', fontWeight: 900, color: '#10b981' }}>1.200+</span>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>NGO Terverifikasi</span>
          </div>
          <div style={{ width: '1px', height: '32px', backgroundColor: '#334155' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '24px', fontWeight: 900, color: '#2dd4bf' }}>850+</span>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Program Sosial Aktif</span>
          </div>
          <div style={{ width: '1px', height: '32px', backgroundColor: '#334155' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '24px', fontWeight: 900, color: '#fbbf24' }}>AI Match</span>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>2-Way Engine</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
