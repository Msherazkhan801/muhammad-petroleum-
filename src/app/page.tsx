'use client';

import React from 'react';
import MetricCards from '@/components/dashboard/MetricCards';
import TankFarmVisualizer from '@/components/dashboard/TankFarmVisualizer';
import SalesPurchaseChart from '@/components/dashboard/SalesPurchaseChart';
import AccountDetailsWidget from '@/components/dashboard/AccountDetailsWidget';
import StickyNotesWidget from '@/components/dashboard/StickyNotesWidget';
import AdminManagerWidget from '@/components/dashboard/AdminManagerWidget';
import ReminderCalendarWidget from '@/components/dashboard/ReminderCalendarWidget';
import { Fuel, Sparkles, Activity, ShieldCheck, Truck, PlusCircle, TrendingUp, DollarSign } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function DashboardPage() {
  const { openModal } = useApp();

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Top Welcome Banner & Quick Action Shortcuts */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome Admin
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-extrabold bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 rounded-full shadow-md">
              Shift Master
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-3">
            <span className="flex items-center text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block mr-1.5 animate-pulse" />
              All Systems Operational
            </span>
            <span>•</span>
            <span className="text-teal-300">Swabi Station # 01</span>
            <span>•</span>
            <span className="text-amber-300">3 Bowsers Scheduled</span>
          </p>
        </div>

        {/* Quick Trigger Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => openModal('new_sale')}
            className="px-3.5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 text-xs font-black rounded-xl shadow-lg shadow-emerald-500/20 flex items-center space-x-1.5 transition-all active:scale-95"
          >
            <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>+ New Sale</span>
          </button>

          <button
            onClick={() => openModal('new_purchase')}
            className="px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-black rounded-xl shadow-lg shadow-cyan-500/20 flex items-center space-x-1.5 transition-all active:scale-95"
          >
            <Fuel className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>+ Decant Bowser</span>
          </button>

          <button
            onClick={() => openModal('new_transaction')}
            className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 text-xs font-black rounded-xl shadow-lg shadow-amber-500/20 flex items-center space-x-1.5 transition-all active:scale-95"
          >
            <DollarSign className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>+ Post Voucher</span>
          </button>
        </div>
      </div>

      {/* Row 1: Top S, P, T & Stock Metric Cards */}
      <MetricCards />

      {/* Row 2: Live Underground Tank Farm Visualizer with Liquid Waves */}
      <TankFarmVisualizer />

      {/* Row 3: Grid Layout matching Screenshot Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Span 7/12) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Purchase & Sale October 2026 Chart */}
          <SalesPurchaseChart />

          {/* Sticky Notes Editor with Formatting Toolbar */}
          <StickyNotesWidget />
        </div>

        {/* Right Column (Span 5/12) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Account Details Quick Balance Lookup */}
          <AccountDetailsWidget />

          {/* Admins Block / Unblock Management */}
          <AdminManagerWidget />

          {/* Reminder Management & Operational Calendar */}
          <ReminderCalendarWidget />
        </div>

      </div>

    </div>
  );
}
