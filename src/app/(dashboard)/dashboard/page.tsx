'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <div className="p-12 text-center text-slate-500 text-sm font-medium">
      Mengalihkan ke Executive Overview Dashboard...
    </div>
  );
}
