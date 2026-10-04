'use client';

import React from 'react';
import { CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function Toast() {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="flex items-center space-x-3 px-4 py-3 rounded-2xl bg-slate-900/95 text-white border border-teal-400/50 shadow-2xl shadow-teal-500/20 backdrop-blur-xl">
        <div className="p-1 bg-teal-500/20 rounded-lg text-teal-400">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-bold text-white tracking-wide">{toastMessage}</p>
          <p className="text-[10px] text-teal-300/80 font-medium">Auto-synced to memory ledger</p>
        </div>
      </div>
    </div>
  );
}
