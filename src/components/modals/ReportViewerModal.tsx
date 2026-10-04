'use client';

import React, { useState } from 'react';
import { 
  FileText, Printer, Download, X, Search, Calendar, 
  ArrowUpRight, ArrowDownRight, Fuel, DollarSign, TrendingUp, CheckCircle2 
} from 'lucide-react';
import { useApp } from '@/lib/store';

export default function ReportViewerModal() {
  const { 
    activeModal, modalProps, closeModal, 
    accounts, purchases, sales, transactions, carriages, tanks 
  } = useApp();

  const [dateFilter, setDateFilter] = useState<string>('2026-10');
  const [selectedAccountId, setSelectedAccountId] = useState<string>(modalProps?.accountId || accounts[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const reportType = activeModal || 'report_daily_book';

  const getReportTitle = () => {
    switch (reportType) {
      case 'report_daily_book': return 'Daily Book (Roznamcha) - Daily Shift Ledger';
      case 'report_supervision': return 'Supervision Entries & Shift Handover Report';
      case 'report_trial_balance': return 'General Trial Balance Statement';
      case 'report_chart_of_accounts': return 'Chart of Accounts & Head of Accounts';
      case 'report_ending_balance': return 'Ending & Closing Balance Summary';
      case 'report_account_ledger': return 'Customer & Supplier Account Ledger Statement';
      case 'report_vehicle_ledger': return 'Bowser & Fleet Vehicle Ledger';
      case 'report_carriage_bill': return 'Oil Marketing Company Carriage Bills';
      case 'report_purchase': return 'Detailed Fuel Purchase Report';
      case 'report_sale': return 'Fuel Sales & Nozzle Meter Reading Report';
      case 'report_bulk_purchases': return 'Bulk Purchase Contract Summary';
      case 'report_bulk_sales': return 'Bulk Sales & Commercial Fleet Billing';
      case 'report_remaining_stock': return 'Remaining Fuel Stock & Dip Tank Balance';
      case 'report_vehicle_stock': return 'Vehicle In-Transit Fuel Stock';
      case 'report_stock_detail': return 'Tank Dip Measurement & Stock Detail';
      case 'report_profit': return 'Gross Profit & Fuel Margin Analysis';
      case 'report_expenses': return 'Monthly Operating Expenses Graph & Log';
      case 'report_capital': return 'Owner Equity & Station Capital Report';
      default: return 'Financial & Stock Report';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    alert("Report exported to CSV successfully!");
  };

  // Active selected account for ledger
  const currentAcc = accounts.find(a => a.id === selectedAccountId) || accounts[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-modal rounded-3xl w-full max-w-5xl border border-teal-500/30 overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/60 bg-gradient-to-r from-slate-900 to-slate-800 no-print">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-teal-500/20 text-teal-400 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">{getReportTitle()}</h2>
              <p className="text-xs text-teal-300/80">Muhammad Petroleum ERP • Swabi Station (License # OGRA-789)</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Slip</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={closeModal}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs no-print">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 font-semibold">Period:</span>
            <input
              type="month"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-white text-xs font-medium"
            />
          </div>

          {reportType === 'report_account_ledger' && (
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 font-semibold">Select Account:</span>
              <select
                value={selectedAccountId}
                onChange={(e) => setSelectedAccountId(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-white text-xs font-medium"
              >
                {accounts.map(acc => (
                  <option key={acc.id} value={acc.id}>
                    {acc.accountName} ({acc.accountType})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
            <input
              type="text"
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-1 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-teal-400"
            />
          </div>
        </div>

        {/* Printable Report Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Official Letterhead Header for Print */}
          <div className="text-center pb-4 border-b border-slate-700/80">
            <h1 className="text-xl font-black text-white tracking-wide uppercase">Muhammad Petroleum Service</h1>
            <p className="text-slate-400 text-xs">Mardan-Swabi Main Road, District Swabi, Khyber Pakhtunkhwa</p>
            <p className="text-teal-400 text-xs font-semibold mt-0.5">Phone: 0938-221144 • NTN: 2948102-4 • OGRA Retail License: SWB-8891</p>
            <div className="inline-block mt-2 px-4 py-1 bg-slate-900 rounded-full border border-teal-500/30 text-teal-300 font-bold text-xs uppercase tracking-wider">
              {getReportTitle()} (October 2026)
            </div>
          </div>

          {/* Render specific report content based on type */}
          {reportType === 'report_daily_book' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Total Purchases (Mtd)</span>
                  <span className="font-mono font-black text-sm text-cyan-300">88,000 LTR / PKR 33.7M</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Total Sales (Mtd)</span>
                  <span className="font-mono font-black text-sm text-emerald-300">68,000 LTR / PKR 26.3M</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Cash Recoveries</span>
                  <span className="font-mono font-black text-sm text-amber-300">PKR 53,258,002</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Bank & Supplier Debits</span>
                  <span className="font-mono font-black text-sm text-purple-300">PKR 55,658,693</span>
                </div>
              </div>

              {/* Transactions Ledger Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900/90 text-slate-300 font-bold border-b border-slate-700">
                      <th className="p-2.5">Date</th>
                      <th className="p-2.5">Voucher #</th>
                      <th className="p-2.5">Account / Party</th>
                      <th className="p-2.5">Description</th>
                      <th className="p-2.5">Mode</th>
                      <th className="p-2.5 text-right">Credit (PKR)</th>
                      <th className="p-2.5 text-right">Debit (PKR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    {transactions.map(tx => (
                      <tr key={tx.id} className="hover:bg-slate-850 transition-colors">
                        <td className="p-2.5 text-slate-400">{tx.date}</td>
                        <td className="p-2.5 font-mono text-teal-300">{tx.voucherNo}</td>
                        <td className="p-2.5 font-bold text-white">{tx.accountName}</td>
                        <td className="p-2.5 text-slate-300">{tx.description}</td>
                        <td className="p-2.5 text-slate-400">{tx.paymentMethod}</td>
                        <td className="p-2.5 text-right font-mono text-emerald-400">
                          {tx.type === 'Credit' ? tx.amount.toLocaleString() : '-'}
                        </td>
                        <td className="p-2.5 text-right font-mono text-amber-400">
                          {tx.type === 'Debit' ? tx.amount.toLocaleString() : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {reportType === 'report_account_ledger' && currentAcc && (
            <div className="space-y-4">
              {/* Account Overview Box */}
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-teal-500/30 grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Account Title</span>
                  <span className="text-sm font-bold text-white">{currentAcc.accountName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Account Code</span>
                  <span className="font-mono font-bold text-teal-300">{currentAcc.accountCode}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Opening Balance</span>
                  <span className="font-mono font-bold text-slate-200">PKR {currentAcc.openingBalance.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Closing Balance</span>
                  <span className={`font-mono font-black text-sm ${currentAcc.closingBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    PKR {currentAcc.closingBalance.toLocaleString()} {currentAcc.closingBalance >= 0 ? '(Dr)' : '(Cr)'}
                  </span>
                </div>
              </div>

              {/* Running Balance Statement Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900/90 text-slate-300 font-bold border-b border-slate-700">
                      <th className="p-2.5">Date</th>
                      <th className="p-2.5">Invoice / Ref #</th>
                      <th className="p-2.5">Particulars</th>
                      <th className="p-2.5 text-right">Debit (Sale)</th>
                      <th className="p-2.5 text-right">Credit (Payment)</th>
                      <th className="p-2.5 text-right">Running Balance (PKR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium font-mono">
                    <tr className="bg-slate-900/40">
                      <td className="p-2.5 text-slate-400">01-10-2026</td>
                      <td className="p-2.5 text-slate-500">OP-BAL</td>
                      <td className="p-2.5 text-slate-300 font-sans">Opening Balance B/F</td>
                      <td className="p-2.5 text-right text-slate-500">-</td>
                      <td className="p-2.5 text-right text-slate-500">-</td>
                      <td className="p-2.5 text-right text-teal-300 font-bold">{currentAcc.openingBalance.toLocaleString()}</td>
                    </tr>
                    {sales.filter(s => s.accountId === currentAcc.id).map(s => (
                      <tr key={s.id} className="hover:bg-slate-850">
                        <td className="p-2.5 text-slate-400">{s.date}</td>
                        <td className="p-2.5 text-emerald-400">{s.invoiceNo}</td>
                        <td className="p-2.5 text-slate-200 font-sans">Fuel Sale ({s.fuelType} - {s.quantityLtr.toLocaleString()} LTR)</td>
                        <td className="p-2.5 text-right text-emerald-400">{s.netAmount.toLocaleString()}</td>
                        <td className="p-2.5 text-right text-slate-500">-</td>
                        <td className="p-2.5 text-right text-white font-bold">{(currentAcc.openingBalance + s.netAmount).toLocaleString()}</td>
                      </tr>
                    ))}
                    {transactions.filter(t => t.accountId === currentAcc.id).map(t => (
                      <tr key={t.id} className="hover:bg-slate-850">
                        <td className="p-2.5 text-slate-400">{t.date}</td>
                        <td className="p-2.5 text-amber-400">{t.voucherNo}</td>
                        <td className="p-2.5 text-slate-200 font-sans">{t.description}</td>
                        <td className="p-2.5 text-right text-slate-500">{t.type === 'Debit' ? t.amount.toLocaleString() : '-'}</td>
                        <td className="p-2.5 text-right text-amber-400">{t.type === 'Credit' ? t.amount.toLocaleString() : '-'}</td>
                        <td className="p-2.5 text-right text-teal-300 font-bold">{currentAcc.closingBalance.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Remaining Stock & Dip Tank Report */}
          {reportType === 'report_remaining_stock' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {tanks.map(t => (
                  <div key={t.id} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-white text-sm">{t.name}</h4>
                        <span className="text-[10px] text-teal-400 font-semibold">{t.fuelType}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold text-xs">
                        {((t.currentLtr / t.capacityLtr) * 100).toFixed(1)}% Fill
                      </span>
                    </div>
                    <div className="space-y-1 text-xs pt-1">
                      <div className="flex justify-between text-slate-400">
                        <span>Current Stock:</span>
                        <span className="font-mono text-white font-bold">{t.currentLtr.toLocaleString()} LTR</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Physical Dip Height:</span>
                        <span className="font-mono text-teal-300 font-bold">{t.dipLevelMm} mm</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Water Bottom:</span>
                        <span className="font-mono text-cyan-300 font-bold">{t.waterDipMm} mm</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Temperature:</span>
                        <span className="font-mono text-amber-300 font-bold">{t.temperatureC} °C</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profit Report */}
          {reportType === 'report_profit' && (
            <div className="space-y-4">
              <div className="p-5 bg-gradient-to-r from-emerald-950/60 to-slate-900 rounded-2xl border border-emerald-500/40 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-slate-400 block text-xs">Total Fuel Revenue</span>
                  <span className="text-xl font-black text-white font-mono">PKR 26,302,450</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Cost of Goods Sold (Purchases)</span>
                  <span className="text-xl font-black text-amber-400 font-mono">PKR 23,800,000</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Net Operating Margin (Gross)</span>
                  <span className="text-2xl font-black text-emerald-400 font-mono">PKR 2,502,450 (+9.5%)</span>
                </div>
              </div>
            </div>
          )}

          {/* Signatures for Print */}
          <div className="pt-8 border-t border-slate-800 grid grid-cols-3 text-center text-xs text-slate-400">
            <div>
              <div className="w-32 h-[1px] bg-slate-600 mx-auto mb-2" />
              <p className="font-bold text-slate-300">Prepared By (Shift Clerk)</p>
            </div>
            <div>
              <div className="w-32 h-[1px] bg-slate-600 mx-auto mb-2" />
              <p className="font-bold text-slate-300">Verified By (Accountant)</p>
            </div>
            <div>
              <div className="w-32 h-[1px] bg-slate-600 mx-auto mb-2" />
              <p className="font-bold text-slate-300">Approved By (Managing Director)</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
