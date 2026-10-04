'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, Fuel, DollarSign, X, CheckCircle2, User, Gauge } from 'lucide-react';
import { useApp } from '@/lib/store';
import { FuelType } from '@/lib/types';

export default function NewSaleModal() {
  const { dispensers, accounts, addSale, closeModal } = useApp();

  const [dispenserId, setDispenserId] = useState<string>(dispensers[0]?.id || 'disp-1');
  const [customerMode, setCustomerMode] = useState<'cash' | 'credit'>('credit');
  const [accountId, setAccountId] = useState<string>('acc-3');
  const [customerName, setCustomerName] = useState<string>('Buner Mining Transport Fleet');
  const [startMeter, setStartMeter] = useState<number>(dispensers[0]?.currentMeterReading || 894520.4);
  const [endMeter, setEndMeter] = useState<number>((dispensers[0]?.currentMeterReading || 894520.4) + 3500);
  const [unitRate, setUnitRate] = useState<number>(dispensers[0]?.unitPrice || 286.50);
  const [shift, setShift] = useState<'Morning' | 'Evening' | 'Night'>('Morning');
  const [inchargeName, setInchargeName] = useState<string>('Tariq Khan');

  const selectedDispenser = dispensers.find(d => d.id === dispenserId) || dispensers[0];

  useEffect(() => {
    if (selectedDispenser) {
      setStartMeter(selectedDispenser.currentMeterReading);
      setEndMeter(selectedDispenser.currentMeterReading + 3000);
      setUnitRate(selectedDispenser.unitPrice);
    }
  }, [dispenserId]);

  const quantityLtr = Math.max(0, endMeter - startMeter);
  const totalAmount = quantityLtr * unitRate;

  const handleAccountChange = (accId: string) => {
    setAccountId(accId);
    const target = accounts.find(a => a.id === accId);
    if (target) {
      setCustomerName(target.accountName);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quantityLtr <= 0) {
      alert("End meter must be greater than start meter");
      return;
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    addSale({
      date: now.toISOString().split('T')[0],
      time: timeStr,
      customerName: customerMode === 'cash' ? 'Retail Cash Walk-in Customer' : customerName,
      accountId: customerMode === 'credit' ? accountId : undefined,
      dispenserId,
      fuelType: selectedDispenser?.fuelType || 'Petrol Super',
      startMeter,
      endMeter,
      quantityLtr,
      unitRate,
      totalAmount,
      netAmount: totalAmount,
      paymentMode: customerMode === 'cash' ? 'Cash' : 'Credit',
      shift,
      inchargeName
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-modal rounded-3xl w-full max-w-2xl border border-emerald-500/30 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/60 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Record Fuel Sale Entry</h2>
              <p className="text-xs text-emerald-300/80">Nozzle Meter Reading & Shift Dispatch Slip</p>
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
          {/* Dispenser Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Dispenser / Nozzle Bay</label>
              <select
                value={dispenserId}
                onChange={(e) => setDispenserId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-400 font-medium"
              >
                {dispensers.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.fuelType}) - PKR {d.unitPrice}/L
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Shift & Incharge</label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={shift}
                  onChange={(e) => setShift(e.target.value as any)}
                  className="bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="Morning">Morning Shift</option>
                  <option value="Evening">Evening Shift</option>
                  <option value="Night">Night Shift</option>
                </select>

                <input
                  type="text"
                  value={inchargeName}
                  onChange={(e) => setInchargeName(e.target.value)}
                  placeholder="Incharge Name"
                  className="bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>
          </div>

          {/* Customer / Billing Mode */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Billing Type</label>
            <div className="grid grid-cols-2 gap-3 mb-2">
              <button
                type="button"
                onClick={() => setCustomerMode('credit')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                  customerMode === 'credit'
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md'
                    : 'bg-slate-900 border-slate-700 text-slate-400'
                }`}
              >
                🏢 Ledger Customer (Credit/Fleet)
              </button>
              <button
                type="button"
                onClick={() => setCustomerMode('cash')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                  customerMode === 'cash'
                    ? 'bg-teal-500/20 border-teal-400 text-teal-300 shadow-md'
                    : 'bg-slate-900 border-slate-700 text-slate-400'
                }`}
              >
                💵 Retail Walk-in (Cash / POS)
              </button>
            </div>

            {customerMode === 'credit' && (
              <select
                value={accountId}
                onChange={(e) => handleAccountChange(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-400 font-medium"
              >
                {accounts.filter(a => a.accountType === 'Customer').map(acc => (
                  <option key={acc.id} value={acc.id}>
                    {acc.accountName} - Current Bal: PKR {acc.closingBalance.toLocaleString()}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Meter Readings and Litres */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Start Meter Reading</label>
              <input
                type="number"
                step="0.1"
                value={startMeter}
                onChange={(e) => setStartMeter(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-300 font-mono text-sm focus:outline-none focus:border-emerald-400 font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">End Meter Reading</label>
              <input
                type="number"
                step="0.1"
                value={endMeter}
                onChange={(e) => setEndMeter(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-sm focus:outline-none focus:border-emerald-400 font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Fuel Price (PKR/L)</label>
              <input
                type="number"
                step="0.01"
                value={unitRate}
                onChange={(e) => setUnitRate(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-sm focus:outline-none focus:border-emerald-400 font-bold"
                required
              />
            </div>
          </div>

          {/* Calculated Output Breakdown */}
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-emerald-500/30 space-y-2">
            <div className="flex justify-between text-slate-400">
              <span>Total Volume Sold:</span>
              <span className="font-mono text-emerald-300 font-bold text-sm">{quantityLtr.toLocaleString()} LTR</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Fuel Grade:</span>
              <span className="font-semibold text-white">{selectedDispenser?.fuelType}</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-sm">
              <span className="font-bold text-emerald-300">Total Sale Amount:</span>
              <span className="font-mono text-emerald-400 font-black text-lg">PKR {totalAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Action Buttons */}
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
              className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black rounded-xl shadow-lg shadow-emerald-500/25 transition-all active:scale-95"
            >
              Record Fuel Sale
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
