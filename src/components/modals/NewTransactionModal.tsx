'use client';

import React, { useState } from 'react';
import { DollarSign, ArrowUpRight, ArrowDownRight, X, CheckCircle2, FileText, CreditCard } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function NewTransactionModal() {
  const { accounts, addTransaction, closeModal, modalProps } = useApp();

  const [type, setType] = useState<'Credit' | 'Debit'>('Credit');
  const [category, setCategory] = useState<any>('Recovery');
  const [accountId, setAccountId] = useState<string>(modalProps?.accountId || accounts[0]?.id || 'acc-3');
  const [amount, setAmount] = useState<number>(500000);
  const [paymentMethod, setPaymentMethod] = useState<any>('Bank Online');
  const [referenceNo, setReferenceNo] = useState<string>('TXN-88291');
  const [description, setDescription] = useState<string>('Payment received against diesel supply ledger');

  const selectedAccount = accounts.find(a => a.id === accountId) || accounts[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    addTransaction({
      date: new Date().toISOString().split('T')[0],
      type,
      category,
      accountId,
      accountName: selectedAccount?.accountName || 'General Account',
      amount,
      paymentMethod,
      referenceNo,
      description
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-modal rounded-3xl w-full max-w-xl border border-amber-500/30 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/60 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Post Journal / Cash Voucher</h2>
              <p className="text-xs text-amber-300/80">Double-Entry Financial Book & Party Ledger Update</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs font-medium">
          {/* Voucher Type Selector (Credit vs Debit) */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Voucher Nature</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => { setType('Credit'); setCategory('Recovery'); }}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                  type === 'Credit'
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md'
                    : 'bg-slate-900 border-slate-700 text-slate-400'
                }`}
              >
                <ArrowDownRight className="w-4 h-4 text-emerald-400" />
                <span>Credit Voucher (Receipt / Recovery)</span>
              </button>

              <button
                type="button"
                onClick={() => { setType('Debit'); setCategory('Payment'); }}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                  type === 'Debit'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md'
                    : 'bg-slate-900 border-slate-700 text-slate-400'
                }`}
              >
                <ArrowUpRight className="w-4 h-4 text-amber-400" />
                <span>Debit Voucher (Payment / Expense)</span>
              </button>
            </div>
          </div>

          {/* Account Selection */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Target Account / Party Ledger</label>
            <select
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400 font-medium"
            >
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id}>
                  {acc.accountName} ({acc.accountType}) - Current Bal: PKR {acc.closingBalance.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {/* Category & Amount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Transaction Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400 font-medium"
              >
                <option value="Recovery">Customer Recovery / Receipt</option>
                <option value="Payment">Supplier Payment</option>
                <option value="Expense">Daily Station Expense</option>
                <option value="Carriage">Carriage / Bowser Haulage</option>
                <option value="Transfer">Bank-to-Cash Transfer</option>
                <option value="Salary">Staff Salary & Allowance</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Voucher Amount (PKR)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Enter PKR amount"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-amber-300 font-mono text-sm focus:outline-none focus:border-amber-400 font-bold"
                required
              />
            </div>
          </div>

          {/* Payment Method & Reference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400 font-medium"
              >
                <option value="Cash">Cash in Hand (Counter)</option>
                <option value="Bank Online">Meezan Bank Online Transfer</option>
                <option value="Cheque">Crossed Cheque</option>
                <option value="PayOrder">Bank Pay Order / Demand Draft</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Reference / Cheque No.</label>
              <input
                type="text"
                value={referenceNo}
                onChange={(e) => setReferenceNo(e.target.value)}
                placeholder="e.g. CHQ-449102 / TXN-998"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Narration & Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Paid against invoice # 891 via online portal"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
              required
            />
          </div>

          {/* Ledger Impact Preview Box */}
          <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Ledger Impact on {selectedAccount?.accountName}:</span>
            <span className="font-mono font-bold text-amber-300">
              {type === 'Credit' ? '-' : '+'} PKR {amount.toLocaleString()}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-3 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-500/25 transition-all active:scale-95"
            >
              Save & Post Voucher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
