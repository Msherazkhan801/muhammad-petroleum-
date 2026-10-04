'use client';

import React, { useState } from 'react';
import { Truck, DollarSign, X, CheckCircle2, ShieldAlert, FileText, Printer, Check, Clock } from 'lucide-react';
import { useApp } from '@/lib/store';
import { FuelType, CarriageVoucher } from '@/lib/types';

export default function CarriageVoucherModal() {
  const { carriages, addCarriage, updateCarriageStatus, closeModal, modalProps } = useApp();

  const [activeTab, setActiveTab] = useState<'create' | 'list'>('create');
  const [vehicleNo, setVehicleNo] = useState<string>('TLX-7711');
  const [driverName, setDriverName] = useState<string>('Hamid Ullah');
  const [sourceDepot, setSourceDepot] = useState<string>('Machike Bulk Oil Depot, Sheikhupura');
  const [destinationStation, setDestinationStation] = useState<string>('Muhammad Petroleum, Swabi');
  const [fuelType, setFuelType] = useState<FuelType>('Petrol Super');
  const [loadedQtyLtr, setLoadedQtyLtr] = useState<number>(48000);
  const [deliveredQtyLtr, setDeliveredQtyLtr] = useState<number>(47930);
  const [freightRate, setFreightRate] = useState<number>(3.50);
  const [driverAdvance, setDriverAdvance] = useState<number>(50000);
  const [tollAndOtherExpense, setTollAndOtherExpense] = useState<number>(15000);

  // Shortage calculations
  const shortageLtr = Math.max(0, loadedQtyLtr - deliveredQtyLtr);
  const fuelUnitPrice = fuelType === 'Petrol Super' ? 282.50 : fuelType === 'High Speed Diesel (HSD)' ? 288.75 : 310.00;
  const shortagePenalty = shortageLtr * fuelUnitPrice;
  const grossFreight = loadedQtyLtr * freightRate;
  const netFreightPayable = grossFreight - shortagePenalty - driverAdvance + tollAndOtherExpense;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loadedQtyLtr <= 0) {
      alert("Loaded quantity must be greater than 0");
      return;
    }

    addCarriage({
      date: new Date().toISOString().split('T')[0],
      vehicleNo,
      driverName,
      sourceDepot,
      destinationStation,
      fuelType,
      loadedQtyLtr,
      deliveredQtyLtr,
      shortageLtr,
      freightRate,
      grossFreight,
      shortagePenalty,
      driverAdvance,
      tollAndOtherExpense,
      netFreightPayable,
      status: 'Approved'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-modal rounded-3xl w-full max-w-3xl border border-teal-500/30 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/60 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-teal-500/20 text-teal-400 rounded-xl">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">(CV) Carriage Voucher & Fleet Logistics</h2>
              <p className="text-xs text-teal-300/80">Depot Bowser Haulage, Shortage Loss & Driver Settlement</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Tabs */}
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-700 text-xs">
              <button
                onClick={() => setActiveTab('create')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  activeTab === 'create' ? 'bg-teal-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                + New Voucher
              </button>
              <button
                onClick={() => setActiveTab('list')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  activeTab === 'list' ? 'bg-teal-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Vouchers History ({carriages.length})
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

        {/* Content */}
        {activeTab === 'create' ? (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs font-medium">
            {/* Vehicle & Driver */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Bowser Truck No.</label>
                <input
                  type="text"
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value)}
                  placeholder="e.g. TLX-7711"
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
                  placeholder="e.g. Hamid Ullah"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-400"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Fuel Grade</label>
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-400 font-medium"
                >
                  <option value="Petrol Super">Petrol Super</option>
                  <option value="High Speed Diesel (HSD)">High Speed Diesel (HSD)</option>
                  <option value="Hi-Octane (HOBC)">Hi-Octane (HOBC)</option>
                </select>
              </div>
            </div>

            {/* Source and Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Source Depot / Refinery</label>
                <input
                  type="text"
                  value={sourceDepot}
                  onChange={(e) => setSourceDepot(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-400"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Destination Petrol Station</label>
                <input
                  type="text"
                  value={destinationStation}
                  onChange={(e) => setDestinationStation(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-400"
                  required
                />
              </div>
            </div>

            {/* Volumes & Shortage */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Depot Loaded Qty (LTR)</label>
                <input
                  type="number"
                  value={loadedQtyLtr}
                  onChange={(e) => setLoadedQtyLtr(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-sm focus:outline-none focus:border-teal-400 font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Station Delivered Qty (LTR)</label>
                <input
                  type="number"
                  value={deliveredQtyLtr}
                  onChange={(e) => setDeliveredQtyLtr(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-teal-300 font-mono text-sm focus:outline-none focus:border-teal-400 font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Freight Rate (PKR/LTR)</label>
                <input
                  type="number"
                  step="0.01"
                  value={freightRate}
                  onChange={(e) => setFreightRate(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-sm focus:outline-none focus:border-teal-400 font-bold"
                  required
                />
              </div>
            </div>

            {/* Advance & Toll Expenses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Driver Fuel & Cash Advance (PKR)</label>
                <input
                  type="number"
                  value={driverAdvance}
                  onChange={(e) => setDriverAdvance(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-amber-300 font-mono text-sm focus:outline-none focus:border-teal-400 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Toll Tax & Incidentals (PKR)</label>
                <input
                  type="number"
                  value={tollAndOtherExpense}
                  onChange={(e) => setTollAndOtherExpense(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200 font-mono text-sm focus:outline-none focus:border-teal-400 font-bold"
                />
              </div>
            </div>

            {/* Shortage Loss & Net Freight Settlement Box */}
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-teal-500/30 space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Gross Freight Payable:</span>
                <span className="font-mono text-white font-bold">PKR {grossFreight.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Shortage Deduction ({shortageLtr} LTR @ PKR {fuelUnitPrice}):</span>
                <span className="font-mono text-rose-400 font-bold">- PKR {shortagePenalty.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Less Driver Advance:</span>
                <span className="font-mono text-amber-400 font-bold">- PKR {driverAdvance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Add Toll & Motorway Reimbursable:</span>
                <span className="font-mono text-cyan-300 font-bold">+ PKR {tollAndOtherExpense.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm">
                <span className="font-bold text-teal-300">Net Freight Due to Carrier:</span>
                <span className="font-mono text-emerald-400 font-black text-base">PKR {netFreightPayable.toLocaleString()}</span>
              </div>
            </div>

            {/* Submit */}
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
                Issue Carriage Voucher
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 overflow-y-auto space-y-3">
            {carriages.map(cv => (
              <div
                key={cv.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 hover:border-teal-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-black text-teal-300 text-sm">{cv.voucherNo}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      cv.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {cv.status}
                    </span>
                    <span className="text-slate-400">{cv.date}</span>
                  </div>
                  <div className="text-slate-300 font-medium">
                    Truck: <span className="font-bold text-white">{cv.vehicleNo}</span> | Driver: {cv.driverName}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Route: {cv.sourceDepot} ➔ {cv.destinationStation}
                  </div>
                </div>

                <div className="text-right space-y-1 sm:border-l sm:border-slate-800 sm:pl-4">
                  <div className="text-slate-400 text-[11px]">
                    Loaded: <span className="font-mono text-white">{cv.loadedQtyLtr.toLocaleString()} L</span> | Shortage: <span className="text-rose-400 font-bold">{cv.shortageLtr} L</span>
                  </div>
                  <div className="font-mono font-black text-sm text-emerald-400">
                    Net: PKR {cv.netFreightPayable.toLocaleString()}
                  </div>
                  {cv.status === 'Pending' && (
                    <button
                      onClick={() => updateCarriageStatus(cv.id, 'Approved')}
                      className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-[11px] transition-colors"
                    >
                      Approve Voucher
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
