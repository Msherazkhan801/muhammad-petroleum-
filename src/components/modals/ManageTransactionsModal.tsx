'use client';

import React, { useState } from 'react';
import { Layers, Search, PlusCircle, X, ArrowUpRight, ArrowDownRight, Printer } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function ManageTransactionsModal() {
  const { transactions, closeModal, openModal } = useApp();
  const [filterType, setFilterType] = useState<'All' | 'Credit' | 'Debit'>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filtered = transactions.filter(t => {
    const matchesType = filterType === 'All' || t.type === filterType;
    const matchesSearch = 
      t.voucherNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-modal rounded-3xl w-full max-w-4xl border border-amber-500/30 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/60 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Manage Financial Transactions</h2>
              <p className="text-xs text-amber-300/80">Cash Book, Bank Register & Party Ledger Journal Entries</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-700 text-xs">
              <button
                onClick={() => setFilterType('All')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  filterType === 'All' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({transactions.length})
              </button>
              <button
                onClick={() => setFilterType('Credit')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  filterType === 'Credit' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Credit (Receipts)
              </button>
              <button
                onClick={() => setFilterType('Debit')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  filterType === 'Debit' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Debit (Payments)
              </button>
            </div>

            <button
              onClick={closeModal}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search voucher #, account name, description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <button
            onClick={() => openModal('new_transaction')}
            className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold rounded-xl flex items-center space-x-1.5 shadow-md hover:from-amber-400 hover:to-orange-500 transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ New Voucher</span>
          </button>
        </div>

        {/* Transactions Table */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900/90 text-slate-300 font-bold border-b border-slate-700">
                  <th className="p-3">Voucher #</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Account Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Description & Reference</th>
                  <th className="p-3">Method</th>
                  <th className="p-3 text-right">Amount (PKR)</th>
                  <th className="p-3 text-center">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filtered.map(tx => (
                  <tr key={tx.id} className="hover:bg-slate-850 transition-colors">
                    <td className="p-3 font-mono text-amber-400 font-bold">{tx.voucherNo}</td>
                    <td className="p-3 text-slate-400">{tx.date}</td>
                    <td className="p-3 font-bold text-white">{tx.accountName}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                        {tx.category}
                      </span>
                    </td>
                    <td className="p-3 text-slate-200">
                      {tx.description}
                      {tx.referenceNo && <span className="block font-mono text-[10px] text-slate-400">Ref: {tx.referenceNo}</span>}
                    </td>
                    <td className="p-3 text-slate-400">{tx.paymentMethod}</td>
                    <td className={`p-3 text-right font-mono font-bold ${tx.type === 'Credit' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {tx.type === 'Credit' ? '+' : '-'} {tx.amount.toLocaleString()}
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        tx.type === 'Credit' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
