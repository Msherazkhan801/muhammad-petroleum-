'use client';

import React, { useState } from 'react';
import { PlusCircle, Truck, Fuel, DollarSign, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '@/lib/store';
import { FuelType } from '@/lib/types';

export default function NewPurchaseModal() {
  const { tanks, accounts, addPurchase, closeModal } = useApp();

  const [supplier, setSupplier] = useState<string>('PSO Terminal Supply Co.');
  const [tankId, setTankId] = useState<string>(tanks[0]?.id || 'tank-1');
  const [fuelType, setFuelType] = useState<FuelType>('Petrol Super');
  const [vehicleNo, setVehicleNo] = useState<string>('TLX-9988');
  const [driverName, setDriverName] = useState<string>('Muhammad Bilal');
  const [driverPhone, setDriverPhone] = useState<string>('+92 300 1234567');
  const [grossLtr, setGrossLtr] = useState<number>(45000);
  const [invoiceRate, setInvoiceRate] = useState<number>(282.50);
  const [freightRatePerLtr, setFreightRatePerLtr] = useState<number>(3.50);
  const [receivedDipLtr, setReceivedDipLtr] = useState<number>(44930);
  const [remarks, setRemarks] = useState<string>('Machike depot loading matched with decanting dip report.');

  // Calculations
  const totalAmount = grossLtr * invoiceRate;
  const freightDeduction = grossLtr * freightRatePerLtr;
  const netPayable = totalAmount - freightDeduction;
  const shortageLtr = Math.max(0, grossLtr - receivedDipLtr);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (grossLtr <= 0 || invoiceRate <= 0) {
      alert("Please enter valid quantity and rate");
      return;
    }

    addPurchase({
      date: new Date().toISOString().split('T')[0],
      supplier,
      tankId,
      fuelType,
      vehicleNo,
      driverName,
      driverPhone,
      grossLtr,
      invoiceRate,
      totalAmount,
      freightRatePerLtr,
      freightDeduction,
      netPayable,
      receivedDipLtr,
      shortageLtr,
      status: 'Received',
      paymentStatus: 'Paid',
      remarks
    });
  };

  const handleTankChange = (selectedTankId: string) => {
    setTankId(selectedTankId);
    const selectedTank = tanks.find(t => t.id === selectedTankId);
    if (selectedTank) {
      setFuelType(selectedTank.fuelType);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-modal rounded-3xl w-full max-w-2xl border border-teal-500/30 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/60 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-teal-500/20 text-teal-400 rounded-xl">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Generate New Purchase Invoice</h2>
              <p className="text-xs text-teal-300/80">Refinery / Depot Bowser Decanting Entry</p>
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
          {/* Supplier & Target Tank */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Supplier / Oil Marketing Co.</label>
              <select
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-400 font-medium"
              >
                {accounts.filter(a => a.accountType === 'Supplier').map(acc => (
                  <option key={acc.id} value={acc.accountName}>{acc.accountName}</option>
                ))}
                <option value="Pakistan State Oil (PSO)">Pakistan State Oil (PSO)</option>
                <option value="Shell Pakistan Ltd">Shell Pakistan Ltd</option>
                <option value="Attock Petroleum Ltd">Attock Petroleum Ltd</option>
                <option value="Total Parco Pakistan">Total Parco Pakistan</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Target Storage Tank</label>
              <select
                value={tankId}
                onChange={(e) => handleTankChange(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-400 font-medium"
              >
                {tanks.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.name} (Cap: {t.capacityLtr.toLocaleString()} L)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Logistics: Bowser Vehicle & Driver */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Bowser Truck No.</label>
              <input
                type="text"
                value={vehicleNo}
                onChange={(e) => setVehicleNo(e.target.value)}
                placeholder="e.g. TLX-9988"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-400"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Driver Name</label>
              <input
                type="text"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                placeholder="e.g. Muhammad Bilal"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-400"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Driver Phone</label>
              <input
                type="text"
                value={driverPhone}
                onChange={(e) => setDriverPhone(e.target.value)}
                placeholder="e.g. +92 300 1234567"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-400"
              />
            </div>
          </div>

          {/* Quantities & Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Gross Invoice LTR</label>
              <input
                type="number"
                value={grossLtr}
                onChange={(e) => setGrossLtr(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-sm focus:outline-none focus:border-teal-400 font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Invoice Rate (PKR/L)</label>
              <input
                type="number"
                step="0.01"
                value={invoiceRate}
                onChange={(e) => setInvoiceRate(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-sm focus:outline-none focus:border-teal-400 font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Freight Rate (PKR/L)</label>
              <input
                type="number"
                step="0.01"
                value={freightRatePerLtr}
                onChange={(e) => setFreightRatePerLtr(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-sm focus:outline-none focus:border-teal-400 font-bold"
              />
            </div>
          </div>

          {/* Decanting Dip & Shortage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Decanted Dip Received LTR</label>
              <input
                type="number"
                value={receivedDipLtr}
                onChange={(e) => setReceivedDipLtr(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-teal-300 font-mono text-sm focus:outline-none focus:border-teal-400 font-bold"
                required
              />
            </div>

            <div className="flex flex-col justify-end">
              <div className="bg-slate-900/90 border border-slate-700 rounded-xl p-2.5 flex items-center justify-between">
                <span className="text-slate-400">Shortage / Loss:</span>
                <span className={`font-mono font-bold ${shortageLtr > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {shortageLtr} LTR ({((shortageLtr / (grossLtr || 1)) * 100).toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Remarks & Decanting Notes</label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="e.g. Tank dip before 1200mm, after 2100mm, quality test ok"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-400"
            />
          </div>

          {/* Real-time Financial Breakdown Summary Box */}
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-teal-500/30 space-y-2">
            <div className="flex justify-between text-slate-400">
              <span>Gross Purchase Amount:</span>
              <span className="font-mono text-white font-bold">PKR {totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Carriage / Freight Deduction:</span>
              <span className="font-mono text-amber-400 font-bold">- PKR {freightDeduction.toLocaleString()}</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-sm">
              <span className="font-bold text-teal-300">Net Payable to Supplier:</span>
              <span className="font-mono text-emerald-400 font-black text-base">PKR {netPayable.toLocaleString()}</span>
            </div>
          </div>

          {/* Submit Buttons */}
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
              className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-black rounded-xl shadow-lg shadow-teal-500/25 transition-all active:scale-95"
            >
              Post Purchase Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
