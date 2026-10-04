'use client';

import React, { useState } from 'react';
import { Gauge, Fuel, X, Check, Save } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function CalibrateDipModal() {
  const { tanks, updateTankDip, closeModal, modalProps } = useApp();

  const targetTank = tanks.find(t => t.id === modalProps?.tankId) || tanks[0];
  const [dipMm, setDipMm] = useState<number>(targetTank?.dipLevelMm || 1680);
  const [volumeLtr, setVolumeLtr] = useState<number>(targetTank?.currentLtr || 32500);

  const handleMmChange = (val: number) => {
    setDipMm(val);
    // Calculated ratio
    const ratio = val / (targetTank?.maxDipMm || 2500);
    const calculatedLtr = Math.round(ratio * (targetTank?.capacityLtr || 50000));
    setVolumeLtr(calculatedLtr);
  };

  const handleLtrChange = (val: number) => {
    setVolumeLtr(val);
    const ratio = val / (targetTank?.capacityLtr || 50000);
    const calculatedMm = Math.round(ratio * (targetTank?.maxDipMm || 2500));
    setDipMm(calculatedMm);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTankDip(targetTank.id, volumeLtr, dipMm);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-modal rounded-3xl w-full max-w-md border border-teal-500/30 overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/60 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-teal-500/20 text-teal-400 rounded-xl">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Calibrate Underground Dip</h2>
              <p className="text-xs text-teal-300/80">{targetTank?.name}</p>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-medium">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Physical Dip Measurement (mm)</label>
            <input
              type="number"
              value={dipMm}
              onChange={(e) => handleMmChange(Number(e.target.value))}
              max={targetTank?.maxDipMm}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-teal-300 font-mono text-sm focus:outline-none focus:border-teal-400 font-bold"
              required
            />
            <span className="text-[10px] text-slate-400 mt-1 block">Maximum Tank Dip Scale: {targetTank?.maxDipMm} mm</span>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Calculated Volume (LTR)</label>
            <input
              type="number"
              value={volumeLtr}
              onChange={(e) => handleLtrChange(Number(e.target.value))}
              max={targetTank?.capacityLtr}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-sm focus:outline-none focus:border-teal-400 font-bold"
              required
            />
            <span className="text-[10px] text-slate-400 mt-1 block">Total Capacity: {targetTank?.capacityLtr.toLocaleString()} LTR</span>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex justify-between">
            <span className="text-slate-400">Fill Percentage:</span>
            <span className="font-mono font-bold text-teal-300">
              {((volumeLtr / (targetTank?.capacityLtr || 1)) * 100).toFixed(1)}%
            </span>
          </div>

          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-teal-500 text-slate-950 font-black rounded-xl shadow-lg shadow-teal-500/25"
            >
              Update Calibration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
