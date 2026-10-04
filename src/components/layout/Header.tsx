'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Fuel, ChevronDown, PlusCircle, FileText, Truck, DollarSign, 
  Settings, UserCheck, ShieldAlert, BarChart3, Database, 
  Layers, Clock, Bell, Sparkles, CheckCircle2, ChevronRight,
  TrendingUp, RefreshCw, Sliders
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { isFirebaseConfigured } from '@/lib/firebase';

export default function Header() {
  const { openModal, totalSalesAmount } = useApp();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 is 12
      const formattedHours = String(hours).padStart(2, '0');

      setCurrentTime(`${day}-${month}-${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => (prev === name ? null : name));
  };

  const handleMenuClick = (modalType: string, props: any = {}) => {
    setOpenDropdown(null);
    openModal(modalType, props);
  };

  return (
    <header className="sticky top-0 z-50 shadow-2xl border-b border-teal-500/20 bg-gradient-to-r from-[#0d3b5c] via-[#12587f] to-[#0a3556] text-white">
      {/* Top Banner with Brand & Time */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 flex items-center justify-between h-14" ref={navRef}>
        
        {/* Brand & Main Nav */}
        <div className="flex items-center space-x-1 sm:space-x-4">
          {/* Logo */}
          <div className="flex items-center space-x-2.5 mr-2 sm:mr-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative p-2 bg-gradient-to-br from-teal-400 to-emerald-600 rounded-xl shadow-lg shadow-teal-500/30 group-hover:scale-105 transition-transform duration-300">
              <Fuel className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-teal-100 to-teal-300 bg-clip-text text-transparent">
                  Muhammad Petroleum
                </span>
                <span className="hidden md:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-teal-400/20 text-teal-300 border border-teal-400/30 rounded-full">
                  ERP v3.0
                </span>
              </div>
              <p className="hidden sm:block text-[10px] text-teal-200/80 font-medium tracking-wide">
                Swabi Bulk Station & Logistics
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex items-center space-x-1 text-sm font-semibold">
            {/* Home */}
            <button 
              onClick={() => { setOpenDropdown(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-3 py-1.5 rounded-lg flex items-center space-x-1.5 hover:bg-white/10 text-white transition-colors duration-150"
            >
              <span>🏠 Home</span>
            </button>

            {/* INVOICE Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('invoice')}
                className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-all duration-200 ${
                  openDropdown === 'invoice' 
                    ? 'bg-[#1b6b98] text-white shadow-inner font-bold' 
                    : 'hover:bg-white/10 text-slate-100'
                }`}
              >
                <span>INVOICE</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'invoice' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'invoice' && (
                <div className="absolute left-0 mt-2 w-56 glass-dropdown rounded-xl py-2 shadow-2xl border border-teal-500/30 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <button 
                    onClick={() => handleMenuClick('new_purchase')}
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-teal-500/20 text-slate-100 hover:text-teal-300 flex items-center space-x-2 transition-colors"
                  >
                    <PlusCircle className="w-4 h-4 text-teal-400" />
                    <span>New Purchases</span>
                  </button>
                  <button 
                    onClick={() => handleMenuClick('new_sale')}
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-teal-500/20 text-slate-100 hover:text-teal-300 flex items-center space-x-2 transition-colors"
                  >
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>New Sales</span>
                  </button>
                  <button 
                    onClick={() => handleMenuClick('new_transaction')}
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-teal-500/20 text-slate-100 hover:text-teal-300 flex items-center space-x-2 transition-colors"
                  >
                    <DollarSign className="w-4 h-4 text-amber-400" />
                    <span>Transactions</span>
                  </button>
                  <div className="my-1 border-t border-slate-700/60" />
                  <button 
                    onClick={() => handleMenuClick('manage_invoices')}
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-teal-500/20 text-slate-100 hover:text-teal-300 flex items-center space-x-2 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>Manage Invoices</span>
                  </button>
                  <button 
                    onClick={() => handleMenuClick('manage_transactions')}
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-teal-500/20 text-slate-100 hover:text-teal-300 flex items-center space-x-2 transition-colors"
                  >
                    <Layers className="w-4 h-4 text-purple-400" />
                    <span>Manage Transactions</span>
                  </button>
                </div>
              )}
            </div>

            {/* FRIGHT / FREIGHT Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('fright')}
                className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-all duration-200 ${
                  openDropdown === 'fright' 
                    ? 'bg-[#1b6b98] text-white shadow-inner font-bold' 
                    : 'hover:bg-white/10 text-slate-100'
                }`}
              >
                <span>FRIGHT</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'fright' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'fright' && (
                <div className="absolute left-0 mt-2 w-64 glass-dropdown rounded-xl py-2 shadow-2xl border border-teal-500/30 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <button 
                    onClick={() => handleMenuClick('carriage_voucher')}
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-teal-500/20 text-slate-100 hover:text-teal-300 flex items-center space-x-2 transition-colors"
                  >
                    <Truck className="w-4 h-4 text-teal-400" />
                    <span>(CV) Carriage Voucher (carriage copy)</span>
                  </button>
                  <button 
                    onClick={() => handleMenuClick('list_carriage_vouchers')}
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-teal-500/20 text-slate-100 hover:text-teal-300 flex items-center space-x-2 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span>List Carriages Vouchers</span>
                  </button>
                  <button 
                    onClick={() => handleMenuClick('carriages_bills')}
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-teal-500/20 text-slate-100 hover:text-teal-300 flex items-center space-x-2 transition-colors"
                  >
                    <DollarSign className="w-4 h-4 text-amber-400" />
                    <span>Carriages Bills</span>
                  </button>
                </div>
              )}
            </div>

            {/* CARRIAGES Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('carriages')}
                className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-all duration-200 ${
                  openDropdown === 'carriages' 
                    ? 'bg-[#1b6b98] text-white shadow-inner font-bold' 
                    : 'hover:bg-white/10 text-slate-100'
                }`}
              >
                <span>CARRIAGES</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'carriages' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'carriages' && (
                <div className="absolute left-0 mt-2 w-64 glass-dropdown rounded-xl py-2 shadow-2xl border border-teal-500/30 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <button 
                    onClick={() => handleMenuClick('carriage_form')}
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-teal-500/20 text-slate-100 hover:text-teal-300 flex items-center space-x-2"
                  >
                    <span>Carriage Form</span>
                  </button>
                  <button 
                    onClick={() => handleMenuClick('create_company_bill')}
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-teal-500/20 text-slate-100 hover:text-teal-300 flex items-center space-x-2"
                  >
                    <span>Create Company Bill</span>
                  </button>
                  <button 
                    onClick={() => handleMenuClick('manage_shortages')}
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-teal-500/20 text-slate-100 hover:text-teal-300 flex items-center space-x-2"
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                    <span>Manage Shortages</span>
                  </button>
                  <div className="my-1 border-t border-slate-700/60" />
                  <button 
                    onClick={() => handleMenuClick('carriages_bills')}
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-teal-500/20 text-slate-100 hover:text-teal-300"
                  >
                    <span>Carriages Bill</span>
                  </button>
                  <div className="my-1 border-t border-slate-700/60" />
                  <button 
                    onClick={() => handleMenuClick('pending_carriages')}
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-teal-500/20 text-slate-100 hover:text-amber-300 flex items-center justify-between"
                  >
                    <span>Pending Carriages</span>
                    <span className="px-1.5 py-0.5 text-[10px] bg-amber-500/20 text-amber-300 rounded font-bold">1</span>
                  </button>
                  <button 
                    onClick={() => handleMenuClick('approved_carriages')}
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-teal-500/20 text-slate-100 hover:text-emerald-300 flex items-center justify-between"
                  >
                    <span>Approved Carriages</span>
                    <span className="px-1.5 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 rounded font-bold">2</span>
                  </button>
                  <div className="my-1 border-t border-slate-700/60" />
                  <button 
                    onClick={() => handleMenuClick('carriages_approval')}
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-teal-500/20 text-slate-100 hover:text-teal-300"
                  >
                    <span>Carriages Approval</span>
                  </button>
                  <div className="my-1 border-t border-slate-700/60" />
                  <button 
                    onClick={() => handleMenuClick('truck_expenses')}
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-teal-500/20 text-slate-100 hover:text-teal-300"
                  >
                    <span>Truck Expenses (APC)</span>
                  </button>
                  <button 
                    onClick={() => handleMenuClick('carriages_revenue')}
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-teal-500/20 text-slate-100 hover:text-teal-300"
                  >
                    <span>Carriages Revenue</span>
                  </button>
                  <button 
                    onClick={() => handleMenuClick('carriages_trial_balance')}
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-teal-500/20 text-slate-100 hover:text-teal-300"
                  >
                    <span>Carriages Trial Balance</span>
                  </button>
                </div>
              )}
            </div>

            {/* REPORTS Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('reports')}
                className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-all duration-200 ${
                  openDropdown === 'reports' 
                    ? 'bg-[#1b6b98] text-white shadow-inner font-bold' 
                    : 'hover:bg-white/10 text-slate-100'
                }`}
              >
                <span>REPORTS</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'reports' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'reports' && (
                <div className="absolute left-0 mt-2 w-64 glass-dropdown rounded-xl py-2 shadow-2xl border border-teal-500/30 animate-in fade-in slide-in-from-top-2 duration-150 z-50 max-h-[85vh] overflow-y-auto">
                  <div className="px-3 py-1 text-[10px] font-bold text-teal-300 uppercase tracking-wider">Accounting Books</div>
                  <button onClick={() => handleMenuClick('report_supervision')} className="w-full text-left px-4 py-1.5 text-xs hover:bg-teal-500/20 text-slate-100">Supervision Entries</button>
                  <button onClick={() => handleMenuClick('report_daily_book')} className="w-full text-left px-4 py-1.5 text-xs hover:bg-teal-500/20 text-slate-100">Daily Book (Roznamcha)</button>
                  <button onClick={() => handleMenuClick('report_trial_balance')} className="w-full text-left px-4 py-1.5 text-xs hover:bg-teal-500/20 text-slate-100">Trial Balance</button>
                  <button onClick={() => handleMenuClick('report_chart_of_accounts')} className="w-full text-left px-4 py-1.5 text-xs hover:bg-teal-500/20 text-slate-100">Chart of Accounts</button>
                  <button onClick={() => handleMenuClick('report_ending_balance')} className="w-full text-left px-4 py-1.5 text-xs hover:bg-teal-500/20 text-slate-100">Ending Balance</button>
                  
                  <div className="my-1 border-t border-slate-700/60" />
                  <div className="px-3 py-1 text-[10px] font-bold text-teal-300 uppercase tracking-wider">Ledgers</div>
                  <button onClick={() => handleMenuClick('report_account_ledger')} className="w-full text-left px-4 py-1.5 text-xs hover:bg-teal-500/20 text-slate-100">Account Ledger</button>
                  <button onClick={() => handleMenuClick('report_vehicle_ledger')} className="w-full text-left px-4 py-1.5 text-xs hover:bg-teal-500/20 text-slate-100">Vehicle Ledger</button>
                  <button onClick={() => handleMenuClick('report_carriage_bill')} className="w-full text-left px-4 py-1.5 text-xs hover:bg-teal-500/20 text-slate-100">Carriage Bill</button>
                  
                  <div className="my-1 border-t border-slate-700/60" />
                  <div className="px-3 py-1 text-[10px] font-bold text-teal-300 uppercase tracking-wider">Trading & Stock</div>
                  <button onClick={() => handleMenuClick('report_purchase')} className="w-full text-left px-4 py-1.5 text-xs hover:bg-teal-500/20 text-slate-100">Purchase Report</button>
                  <button onClick={() => handleMenuClick('report_sale')} className="w-full text-left px-4 py-1.5 text-xs hover:bg-teal-500/20 text-slate-100">Sale Report</button>
                  <button onClick={() => handleMenuClick('report_bulk_purchases')} className="w-full text-left px-4 py-1.5 text-xs hover:bg-teal-500/20 text-slate-100">Bulk Purchases</button>
                  <button onClick={() => handleMenuClick('report_bulk_sales')} className="w-full text-left px-4 py-1.5 text-xs hover:bg-teal-500/20 text-slate-100">Bulk Sales</button>
                  
                  <div className="my-1 border-t border-slate-700/60" />
                  <div className="px-3 py-1 text-[10px] font-bold text-teal-300 uppercase tracking-wider">Inventory & Profit</div>
                  <button onClick={() => handleMenuClick('report_remaining_stock')} className="w-full text-left px-4 py-1.5 text-xs hover:bg-teal-500/20 text-slate-100">Remaining Stock (Tank Dips)</button>
                  <button onClick={() => handleMenuClick('report_vehicle_stock')} className="w-full text-left px-4 py-1.5 text-xs hover:bg-teal-500/20 text-slate-100">Vehicle Stock</button>
                  <button onClick={() => handleMenuClick('report_stock_detail')} className="w-full text-left px-4 py-1.5 text-xs hover:bg-teal-500/20 text-slate-100">Stock Detail</button>
                  <button onClick={() => handleMenuClick('report_profit')} className="w-full text-left px-4 py-1.5 text-xs hover:bg-teal-500/20 text-emerald-300 font-semibold">Profit Report</button>
                  <button onClick={() => handleMenuClick('report_expenses')} className="w-full text-left px-4 py-1.5 text-xs hover:bg-teal-500/20 text-slate-100">Expenses Graph</button>
                  <button onClick={() => handleMenuClick('report_capital')} className="w-full text-left px-4 py-1.5 text-xs hover:bg-teal-500/20 text-slate-100">Capital Report</button>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right Side: Settings, Admin, Time Display */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Live Date/Time Clock as in Screenshot */}
          <div className="hidden lg:flex items-center space-x-2 bg-black/25 px-3 py-1.5 rounded-lg border border-teal-500/20 font-mono text-sm text-cyan-200 tracking-wider shadow-inner">
            <Clock className="w-4 h-4 text-teal-400 animate-pulse" />
            <span className="font-bold">{currentTime || '03-10-2026 03:06 PM'}</span>
          </div>

          {/* Quick Action Buttons */}
          <button 
            onClick={() => handleMenuClick('settings')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-white/10 text-teal-100 flex items-center space-x-1 border border-white/10 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5 text-teal-300" />
            <span className="hidden sm:inline">SETTINGS</span>
          </button>

          {/* Admin User Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown('admin')}
              className="flex items-center space-x-2 px-2.5 py-1.5 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 border border-teal-400/30 text-white transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-400 text-slate-900 font-extrabold flex items-center justify-center text-[11px]">
                A
              </div>
              <span className="text-xs font-bold">Admin</span>
              <ChevronDown className="w-3 h-3 text-teal-300" />
            </button>

            {openDropdown === 'admin' && (
              <div className="absolute right-0 mt-2 w-52 glass-dropdown rounded-xl py-2 shadow-2xl border border-teal-500/30 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="px-4 py-2 border-b border-slate-700/60">
                  <p className="text-xs font-bold text-white">Super Administrator</p>
                  <p className="text-[10px] text-teal-300/80 truncate">admin@muhammadpetroleum.com</p>
                </div>
                <button 
                  onClick={() => handleMenuClick('settings')}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-teal-500/20 text-slate-100 flex items-center space-x-2"
                >
                  <Settings className="w-3.5 h-3.5 text-teal-400" />
                  <span>System Configuration</span>
                </button>
                <button 
                  onClick={() => handleMenuClick('settings_firebase')}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-teal-500/20 text-slate-100 flex items-center space-x-2"
                >
                  <Database className="w-3.5 h-3.5 text-amber-400" />
                  <span>Firebase & Cloud Sync</span>
                </button>
                <div className="my-1 border-t border-slate-700/60" />
                <button 
                  onClick={() => {
                    setOpenDropdown(null);
                    alert("Logged in as Super Admin. Session is secured.");
                  }}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-rose-500/20 text-rose-300 flex items-center space-x-2"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Active Session OK</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
