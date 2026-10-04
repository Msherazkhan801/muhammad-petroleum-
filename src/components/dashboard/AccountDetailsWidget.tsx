'use client';

import React, { useState } from 'react';
import { UserCheck, Search, ArrowUpRight, ArrowDownRight, FileText, ChevronRight, DollarSign } from 'lucide-react';
import { useApp } from '@/lib/store';
import { AccountLedger } from '@/lib/types';

export default function AccountDetailsWidget() {
  const { accounts, openModal } = useApp();
  const [selectedAccountId, setSelectedAccountId] = useState<string>('acc-3');
  const [activeAccount, setActiveAccount] = useState<AccountLedger | null>(
    accounts.find(a => a.id === 'acc-3') || accounts[0] || null
  );

  const handleSelect = () => {
    const found = accounts.find(a => a.id === selectedAccountId);
    if (found) {
      setActiveAccount(found);
    }
  };

  const currentAcc = activeAccount || accounts[0];

  return (
    <div className="glass-panel rounded-2xl border border-slate-700/60 p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700/50">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg">
              <UserCheck className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-white tracking-wide">
              Account Details
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded-full">
            Real-time Ledger
          </span>
        </div>

        {/* Account Selector + GO Button */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <select
              value={selectedAccountId}
              onChange={(e) => setSelectedAccountId(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 text-slate-100 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-teal-400 font-medium"
            >
              <option value="">Select Account</option>
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id}>
                  {acc.accountName} ({acc.accountType})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSelect}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-black rounded-xl shadow-lg shadow-cyan-500/20 transition-all active:scale-95 flex items-center space-x-1"
          >
            <span>GO!</span>
          </button>
        </div>

        {/* Balance Metric Rows styled as in Screenshot */}
        {currentAcc ? (
          <div className="space-y-1.5 text-xs font-medium">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">Opening Balance:</span>
              <span className="font-bold text-slate-200 font-mono">
                PKR {currentAcc.openingBalance.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/40 border border-slate-800">
              <span className="text-slate-400">Purchase:</span>
              <span className="font-bold text-slate-200 font-mono">
                0 (Q) PKR {currentAcc.totalPurchase.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/40 border border-slate-800">
              <span className="text-slate-400">Sale:</span>
              <span className="font-bold text-slate-200 font-mono">
                0 (Q) PKR {currentAcc.totalSale.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/40 border border-slate-800">
              <span className="text-slate-400">Recovery:</span>
              <span className="font-bold text-emerald-300 font-mono">
                PKR {currentAcc.totalRecovery.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/40 border border-slate-800">
              <span className="text-slate-400">Payments:</span>
              <span className="font-bold text-amber-300 font-mono">
                PKR {currentAcc.totalPayments.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 border border-teal-500/30 mt-2">
              <span className="font-bold text-teal-300">Closing Balance:</span>
              <span className={`font-extrabold text-sm font-mono ${currentAcc.closingBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                PKR {currentAcc.closingBalance.toLocaleString()} {currentAcc.closingBalance >= 0 ? '(Dr)' : '(Cr)'}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-slate-400 text-xs">
            Select an account and click GO! to inspect ledger
          </div>
        )}
      </div>

      {/* Quick Action Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
        <button
          onClick={() => openModal('report_account_ledger', { accountId: currentAcc?.id })}
          className="flex-1 py-1.5 px-3 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 rounded-xl text-teal-300 text-[11px] font-bold flex items-center justify-center space-x-1 transition-colors"
        >
          <FileText className="w-3 h-3" />
          <span>Full Ledger Statement</span>
        </button>
        <button
          onClick={() => openModal('new_transaction', { accountId: currentAcc?.id })}
          className="py-1.5 px-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-300 text-[11px] font-bold flex items-center space-x-1 transition-colors"
        >
          <DollarSign className="w-3 h-3" />
          <span>Voucher</span>
        </button>
      </div>
    </div>
  );
}
