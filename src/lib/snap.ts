// Snap.js — Midtrans payment popup integration for Sovera CSR Dashboard
declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        options: {
          onSuccess?: (result: SnapResult) => void;
          onPending?: (result: SnapResult) => void;
          onError?: (result: SnapResult) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

export interface SnapResult {
  transaction_id?: string;
  order_id?: string;
  status_code?: string;
  payment_type?: string;
  transaction_status?: string;
  fraud_status?: string;
  gross_amount?: string;
}

let loadPromise: Promise<void> | null = null;

export function loadSnap(clientKey: string, isProduction: boolean): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Snap hanya tersedia di browser'));
  }
  if (window.snap) {
    return Promise.resolve();
  }
  if (loadPromise) {
    return loadPromise;
  }

  const src = isProduction
    ? 'https://app.midtrans.com/snap/snap.js'
    : 'https://app.sandbox.midtrans.com/snap/snap.js';

  loadPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    if (clientKey) {
      script.setAttribute('data-client-key', clientKey);
    }
    script.onload = () => {
      if (window.snap) {
        resolve();
      } else {
        reject(new Error('Snap.js loaded but window.snap not available'));
      }
    };
    script.onerror = () => {
      loadPromise = null;
      reject(new Error('Gagal load Snap.js dari Midtrans CDN'));
    };
    document.head.appendChild(script);
  });

  return loadPromise;
}

export function openSnapPayment(
  clientKey: string,
  isProduction: boolean,
  snapToken: string
): Promise<{ status: 'success' | 'pending'; result: SnapResult }> {
  return new Promise(async (resolve, reject) => {
    try {
      await loadSnap(clientKey, isProduction);
    } catch (err) {
      reject(err);
      return;
    }
    if (!window.snap) {
      reject(new Error('Snap.js tidak tersedia'));
      return;
    }
    window.snap.pay(snapToken, {
      onSuccess: (result) => resolve({ status: 'success', result }),
      onPending: (result) => resolve({ status: 'pending', result }),
      onError: (result) => reject(new Error(`Payment error: ${result.status_code ?? 'unknown'}`)),
      onClose: () => reject(new Error('Popup ditutup tanpa pembayaran')),
    });
  });
}
