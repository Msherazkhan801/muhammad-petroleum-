'use client';

import React from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Fuel, ArrowRight, Layers } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function MetricCards() {
  const { 
    totalSalesLtr, totalSalesAmount, 
    totalPurchasesLtr, totalPurchasesAmount, 
    totalCreditAmount, totalDebitAmount,
    tanks, openModal
  } = useApp();

  const totalCurrentStockLtr = tanks.reduce((acc, t) => acc + t.currentLtr, 0);
  const totalCapacityLtr = tanks.reduce((acc, t) => acc + t.capacityLtr, 0);
  const stockPercentage = ((totalCurrentStockLtr / totalCapacityLtr) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      
      {/* S: Sales Card (Green) */}
      <div 
        onClick={() => openModal('new_sale')}
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950/60 rounded-2xl border border-emerald-500/30 p-5 shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-400 transition-all duration-300 group cursor-pointer"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-300 pointer-events-none" />
        
        <div className="flex items-center space-x-4">
          {/* Green Letter S Badge as in Screenshot */}
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-emerald-500/40 group-hover:scale-105 transition-transform duration-300">
            S
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                LTR & AMOUNT
              </span>
              <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" /> +8.4%
              </span>
            </div>

            <div className="mt-1">
              <div className="text-2xl font-extrabold text-white tracking-tight">
                {totalSalesLtr.toLocaleString()} <span className="text-xs font-medium text-slate-400">LTR</span>
              </div>
              <div className="text-lg font-bold text-emerald-300 mt-0.5">
                PKR {totalSalesAmount.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
          <span className="group-hover:text-emerald-300 transition-colors">Click to Record New Sale</span>
          <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* P: Purchases Card (Steel / Slate) */}
      <div 
        onClick={() => openModal('new_purchase')}
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-800/80 rounded-2xl border border-slate-600/50 p-5 shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-all duration-300 pointer-events-none" />

        <div className="flex items-center space-x-4">
          {/* Steel Letter P Badge as in Screenshot */}
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-300 to-slate-400 text-slate-900 flex items-center justify-center text-3xl font-black shadow-lg group-hover:scale-105 transition-transform duration-300">
            P
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                LTR & AMOUNT
              </span>
              <span className="text-[11px] font-semibold text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded-full flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-0.5" /> Refinery In
              </span>
            </div>

            <div className="mt-1">
              <div className="text-2xl font-extrabold text-white tracking-tight">
                {totalPurchasesLtr.toLocaleString()}.00 <span className="text-xs font-medium text-slate-400">LTR</span>
              </div>
              <div className="text-lg font-bold text-cyan-300 mt-0.5">
                PKR {totalPurchasesAmount.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
          <span className="group-hover:text-cyan-300 transition-colors">Click to Add Purchase Invoice</span>
          <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* T: Transactions Card (Amber / Orange) */}
      <div 
        onClick={() => openModal('new_transaction')}
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950/50 rounded-2xl border border-amber-500/30 p-5 shadow-xl hover:shadow-amber-500/10 hover:border-amber-400 transition-all duration-300 group cursor-pointer"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-300 pointer-events-none" />

        <div className="flex items-center space-x-4">
          {/* Amber Letter T Badge as in Screenshot */}
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-amber-500/40 group-hover:scale-105 transition-transform duration-300">
            T
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                CREDIT & DEBIT
              </span>
              <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full">
                Ledger Book
              </span>
            </div>

            <div className="mt-1 space-y-0.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 text-xs">Credit:</span>
                <span className="font-bold text-emerald-300 font-mono">PKR {totalCreditAmount.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 text-xs">Debit:</span>
                <span className="font-bold text-amber-300 font-mono">PKR {totalDebitAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
          <span className="group-hover:text-amber-300 transition-colors">Post Journal & Cash Voucher</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* 4th Card: Underground Tank Stock Total */}
      <div 
        onClick={() => openModal('report_remaining_stock')}
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950/60 rounded-2xl border border-teal-500/30 p-5 shadow-xl hover:shadow-teal-500/10 hover:border-teal-400 transition-all duration-300 group cursor-pointer"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all duration-300 pointer-events-none" />

        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-teal-500/40 group-hover:scale-105 transition-transform duration-300">
            <Fuel className="w-8 h-8" />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                TANK FARM STOCK
              </span>
              <span className="text-[11px] font-bold text-teal-300 bg-teal-500/20 px-2 py-0.5 rounded-full">
                {stockPercentage}% Fill
              </span>
            </div>

            <div className="mt-1">
              <div className="text-2xl font-extrabold text-white tracking-tight">
                {totalCurrentStockLtr.toLocaleString()} <span className="text-xs font-medium text-slate-400">/ {totalCapacityLtr.toLocaleString()} LTR</span>
              </div>
              <div className="w-full bg-slate-700/60 h-2 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-teal-400 to-emerald-400 h-full rounded-full transition-all duration-700" 
                  style={{ width: `${stockPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
          <span className="group-hover:text-teal-300 transition-colors">View Live Underground Dip Levels</span>
          <ArrowRight className="w-3.5 h-3.5 text-teal-400 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

    </div>
  );
}
