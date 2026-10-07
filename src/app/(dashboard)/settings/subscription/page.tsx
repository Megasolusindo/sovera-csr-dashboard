'use client';

import React, { useEffect, useState } from 'react';
import { CreditCard, Check, Zap, Shield, Sparkles, RefreshCw, Clock, ArrowRight, CheckCircle2, AlertCircle, X, ExternalLink } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { openSnapPayment } from '@/lib/snap';

interface Plan {
  id: string;
  code: string;
  name: string;
  description: string;
  price_monthly: number;
  price_yearly: number;
  crawl_quota: number;
  ai_query_quota: number;
  max_user_seats: number;
  trial_days?: number;
}

interface SubscriptionUsage {
  subscription: {
    status: string;
    billing_cycle: string;
    current_period_end: string;
    trial_started_at?: string | null;
  };
  plan: Plan;
  usage: {
    crawls_used: number;
    crawl_quota: number;
    ai_queries_used: number;
    ai_query_quota: number;
    active_seats: number;
    max_seats: number;
  };
}

interface MockCheckoutData {
  order_id: string;
  invoice_number: string;
  gross_amount: number;
  snap_token: string;
  snap_redirect_url: string;
}

export default function TenantSubscriptionPage() {
  const [data, setData] = useState<SubscriptionUsage | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCycle, setSelectedCycle] = useState<'MONTHLY' | 'YEARLY'>('MONTHLY');
  const [isCheckingOut, setIsCheckingOut] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [checkoutNotice, setCheckoutNotice] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [mockCheckoutModal, setMockCheckoutModal] = useState<MockCheckoutData | null>(null);
  const [isSimulatingPayment, setIsSimulatingPayment] = useState(false);
  const [simulationSuccess, setSimulationSuccess] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const [subRes, plansRes]: [any, any] = await Promise.all([
        apiClient.get('/subscription/me'),
        apiClient.get('/subscription/plans'),
      ]);

      if (!subRes?.data || !Array.isArray(plansRes?.data)) {
        throw new Error('Respons langganan dari server tidak lengkap.');
      }
      setData(subRes.data);
      setPlans(plansRes.data);
    } catch (err: any) {
      // Nothing is invented: no plan, no usage and no price is shown unless the server sent it.
      console.error('Failed to load the subscription:', err);
      setData(null);
      setPlans([]);
      setLoadError(err?.message || 'Data langganan tidak dapat dimuat.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckout = async (planID: string) => {
    setIsCheckingOut(planID);
    setCheckoutError(null);
    setCheckoutNotice(null);
    try {
      const res: any = await apiClient.post('/subscription/checkout', {
        plan_id: planID,
        billing_cycle: selectedCycle,
      });

      const d = res?.data;
      if (!d) throw new Error('Server tidak mengirim hasil checkout.');

      // A trial or the free plan needs no payment: the server already changed the subscription.
      if (d.action === 'TRIAL') {
        const until = d.trial_ends_at
          ? new Date(d.trial_ends_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
          : '';
        setCheckoutNotice(`Masa percobaan paket ${d.plan_code} dimulai${until ? ` dan berakhir ${until}` : ''}. Setelah itu paket kembali ke FREE kecuali Anda berlangganan.`);
        await fetchData();
        return;
      }
      if (d.action === 'FREE') {
        setCheckoutNotice('Paket Anda sekarang FREE.');
        await fetchData();
        return;
      }

      const { snap_token, snap_redirect_url, order_id, invoice_number, gross_amount } = d;
      if (snap_token && snap_token.startsWith('MOCK-')) {
        // Only a development API (PAYMENT_SIMULATION=true) returns this.
        setMockCheckoutModal({ order_id, invoice_number, gross_amount, snap_token, snap_redirect_url });
      } else if (snap_token) {
        // Real Midtrans token -> Try Snap popup
        try {
          await openSnapPayment(process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || '', false, snap_token);
          fetchData();
        } catch (snapErr) {
          console.warn('Snap JS error, fallback to redirect URL:', snapErr);
          window.open(snap_redirect_url, '_blank');
        }
      } else if (snap_redirect_url) {
        window.open(snap_redirect_url, '_blank');
      } else {
        throw new Error('Server tidak mengirim tautan pembayaran.');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setCheckoutError(err?.message || 'Gagal membuat transaksi checkout. Silakan coba beberapa saat lagi.');
    } finally {
      setIsCheckingOut(null);
    }
  };

  const handleSimulatePayment = async () => {
    if (!mockCheckoutModal) return;

    setIsSimulatingPayment(true);
    try {
      const isFaspay = mockCheckoutModal.snap_token.includes('FASPAY');
      if (isFaspay) {
        await apiClient.post('/webhooks/faspay', {
          order_id: mockCheckoutModal.order_id,
          status_code: '200',
          transaction_status: 'SETTLEMENT',
          gross_amount: String(mockCheckoutModal.gross_amount),
          payment_type: 'faspay_va',
          signature: 'mock-dev-signature',
        });
      } else {
        await apiClient.post('/webhooks/midtrans', {
          order_id: mockCheckoutModal.order_id,
          status_code: '200',
          transaction_status: 'settlement',
          gross_amount: String(mockCheckoutModal.gross_amount),
          payment_type: 'gopay',
          signature_key: 'mock-dev-signature',
        });
      }

      setSimulationSuccess(true);
      setTimeout(() => {
        setMockCheckoutModal(null);
        setSimulationSuccess(false);
        fetchData();
      }, 1500);
    } catch (err: any) {
      console.error('Simulation error:', err);
      alert('Gagal mensimulasikan pembayaran: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsSimulatingPayment(false);
    }
  };

  const formatIDR = (num: number) => {
    if (num === 0) return 'Rp 0';
    return `Rp ${num.toLocaleString('id-ID')}`;
  };

  const activePlanCode = data?.plan?.code;
  const isTrialing = data?.subscription?.status === 'TRIALING';
  const trialUsed = Boolean(data?.subscription?.trial_started_at);

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <Zap className="w-5 h-5 text-emerald-700" />
            <span>Paket Langganan & Quota Multi-Tenant</span>
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Pantau penggunaan kuota crawler, generasi proposal AI, dan upgrade lisensi lembaga Anda.
          </p>
        </div>

        {/* Cycle Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setSelectedCycle('MONTHLY')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedCycle === 'MONTHLY' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
          >
            Bulanan
          </button>
          <button
            onClick={() => setSelectedCycle('YEARLY')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
              selectedCycle === 'YEARLY' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-500'
            }`}
          >
            <span>Tahunan</span>
            <span className="text-[9px] px-1 bg-emerald-600 text-white rounded">Hemat 2 Bulan</span>
          </button>
        </div>
      </div>

      {/* Active Subscription Status & Quota Meters */}
      {data && (
        <div className="bg-emerald-950 text-emerald-100 p-6 rounded-2xl border border-emerald-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Status Lisensi Aktif</div>
                <div className="text-lg font-bold text-white flex items-center gap-2">
                  <span>{data.plan?.name}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                    {data.subscription?.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-xs text-emerald-300 font-mono">
              Berlaku hingga: <strong className="text-white">{data.subscription?.current_period_end ? new Date(data.subscription.current_period_end).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}</strong>
            </div>
          </div>

          {/* Quota Progress Meters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Crawl Quota */}
            <div className="bg-emerald-900/40 p-4 rounded-xl border border-emerald-800/60 space-y-2">
              <div className="flex justify-between text-xs font-bold text-emerald-200">
                <span>Kota Crawling Data CSR</span>
                <span>{data.usage.crawls_used} / {data.usage.crawl_quota >= 99999 ? 'Unlimited' : data.usage.crawl_quota}</span>
              </div>
              <div className="w-full bg-emerald-950 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full transition-all"
                  style={{
                    width: `${Math.min(100, (data.usage.crawls_used / Math.max(1, data.usage.crawl_quota)) * 100)}%`,
                  }}
                />
              </div>
              <div className="text-[10px] text-emerald-400">Pengunaan kuota bulan ini</div>
            </div>

            {/* AI Query Quota */}
            <div className="bg-emerald-900/40 p-4 rounded-xl border border-emerald-800/60 space-y-2">
              <div className="flex justify-between text-xs font-bold text-emerald-200">
                <span>Kuota AI Proposal Studio</span>
                <span>{data.usage.ai_queries_used} / {data.usage.ai_query_quota >= 99999 ? 'Unlimited' : data.usage.ai_query_quota}</span>
              </div>
              <div className="w-full bg-emerald-950 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full transition-all"
                  style={{
                    width: `${Math.min(100, (data.usage.ai_queries_used / Math.max(1, data.usage.ai_query_quota)) * 100)}%`,
                  }}
                />
              </div>
              <div className="text-[10px] text-emerald-400">Generasi proposal icebreaker & pitch</div>
            </div>

            {/* User Seats */}
            <div className="bg-emerald-900/40 p-4 rounded-xl border border-emerald-800/60 space-y-2">
              <div className="flex justify-between text-xs font-bold text-emerald-200">
                <span>User Access Seats</span>
                <span>{data.usage.active_seats} / {data.usage.max_seats >= 999 ? 'Unlimited' : data.usage.max_seats}</span>
              </div>
              <div className="w-full bg-emerald-950 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full transition-all"
                  style={{
                    width: `${Math.min(100, (data.usage.active_seats / Math.max(1, data.usage.max_seats)) * 100)}%`,
                  }}
                />
              </div>
              <div className="text-[10px] text-emerald-400">Pengguna terdaftar di lembaga Anda</div>
            </div>
          </div>
        </div>
      )}

      {loadError && (
        <div className="p-5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Data langganan tidak dapat dimuat.</div>
              <div className="text-xs mt-0.5">{loadError}</div>
            </div>
          </div>
          <button
            onClick={fetchData}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-2 shrink-0"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Coba lagi</span>
          </button>
        </div>
      )}

      {checkoutNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{checkoutNotice}</span>
        </div>
      )}

      {checkoutError && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{checkoutError}</span>
        </div>
      )}

      {/* Plan Cards Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">Pilih Paket Lisensi Sovera CSR</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => {
            const isCurrent = p.code === activePlanCode;
            const canTrial = (p.trial_days ?? 0) > 0 && !trialUsed && p.price_monthly > 0;
            const price = selectedCycle === 'YEARLY' ? p.price_yearly : p.price_monthly;

            return (
              <div
                key={p.id}
                className={`p-6 rounded-2xl border flex flex-col justify-between space-y-5 transition-all ${
                  isCurrent
                    ? 'border-emerald-600 bg-emerald-50/40 shadow-md ring-1 ring-emerald-600'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 uppercase font-mono">{p.code}</span>
                    {isCurrent && (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white">
                        {isTrialing ? 'MASA PERCOBAAN' : 'PAKET AKTIF'}
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="text-2xl font-black text-slate-900">{formatIDR(price)}</div>
                    <div className="text-xs text-slate-500">{selectedCycle === 'YEARLY' ? '/ tahun' : '/ bulan'}</div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">{p.description}</p>

                  <div className="space-y-2 text-xs text-slate-700 pt-2">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Kota Crawling: <strong>{p.crawl_quota >= 99999 ? 'Unlimited' : `${p.crawl_quota} / bulan`}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Generasi AI Proposal: <strong>{p.ai_query_quota >= 99999 ? 'Unlimited' : `${p.ai_query_quota} / bulan`}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>User Access Seats: <strong>{p.max_user_seats >= 999 ? 'Unlimited' : `${p.max_user_seats} seats`}</strong></span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleCheckout(p.id)}
                  disabled={(isCurrent && !isTrialing) || isCheckingOut === p.id}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                    isCurrent && !isTrialing
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm'
                  }`}
                >
                  {isCheckingOut === p.id ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Menyiapkan Pembayaran...</span>
                    </>
                  ) : isCurrent && !isTrialing ? (
                    <span>Paket Saat Ini</span>
                  ) : p.price_monthly === 0 ? (
                    <span>Pilih Paket Gratis</span>
                  ) : canTrial ? (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Coba Gratis {p.trial_days} Hari</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>{isCurrent ? 'Berlangganan Sekarang' : 'Bayar & Upgrade Paket'}</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dev Mode Simulation Checkout Modal */}
      {mockCheckoutModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {mockCheckoutModal.snap_token.includes('FASPAY') ? 'Simulasi Faspay Payment (Dev Mode)' : 'Simulasi Midtrans Payment (Dev Mode)'}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono">{mockCheckoutModal.invoice_number}</p>
                </div>
              </div>
              <button
                onClick={() => setMockCheckoutModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {simulationSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto animate-bounce" />
                <div>Pembayaran Berhasil Disimulasikan!</div>
                <div className="text-[11px] text-emerald-600 font-normal">Lisensi paket telah aktif secara otomatis.</div>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between text-slate-500">
                    <span>Order ID:</span>
                    <span className="text-slate-800 font-bold">{mockCheckoutModal.order_id}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Total Nominal:</span>
                    <span className="text-emerald-700 font-bold text-sm">{formatIDR(mockCheckoutModal.gross_amount)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Provider:</span>
                    <span className="text-slate-800">
                      {mockCheckoutModal.snap_token.includes('FASPAY') ? 'Faspay Gateway Sandbox' : 'Midtrans Snap Sandbox'}
                    </span>
                  </div>
                </div>

                <div className="text-slate-600 text-[11px] leading-relaxed bg-amber-50 border border-amber-200 p-3 rounded-xl">
                  <strong>Catatan Developer:</strong> Karena API keys payment gateway di backend belum dikonfigurasi, sistem berjalan dalam <em>Development Simulation Mode</em>. Anda dapat langsung menekan tombol di bawah untuk menyimulasikan konfirmasi pembayaran lunas.
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setMockCheckoutModal(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleSimulatePayment}
                    disabled={isSimulatingPayment}
                    className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isSimulatingPayment ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                    <span>{isSimulatingPayment ? 'Memproses...' : 'Simulasikan Pembayaran Lunas'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
