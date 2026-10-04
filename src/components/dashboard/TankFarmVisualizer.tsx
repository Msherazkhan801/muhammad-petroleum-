'use client';

import React from 'react';
import { Fuel, Droplets, Thermometer, Gauge, ArrowRight, RefreshCw, AlertTriangle } from 'lucide-react';
import { useApp } from '@/lib/store';
import { FuelType } from '@/lib/types';

export default function TankFarmVisualizer() {
  const { tanks, openModal } = useApp();

  const getFuelColors = (fuelType: FuelType) => {
    switch (fuelType) {
      case 'Petrol Super':
        return {
          bar: 'from-emerald-500 to-teal-400',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          glow: 'shadow-emerald-500/20',
          text: 'text-emerald-400',
          liquid: '#10b981'
        };
      case 'High Speed Diesel (HSD)':
        return {
          bar: 'from-amber-500 to-yellow-400',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          glow: 'shadow-amber-500/20',
          text: 'text-amber-400',
          liquid: '#f59e0b'
        };
      case 'Hi-Octane (HOBC)':
        return {
          bar: 'from-rose-500 to-red-400',
          badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          glow: 'shadow-rose-500/20',
          text: 'text-rose-400',
          liquid: '#ef4444'
        };
      default:
        return {
          bar: 'from-cyan-500 to-blue-400',
          badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
          glow: 'shadow-cyan-500/20',
          text: 'text-cyan-400',
          liquid: '#06b6d4'
        };
    }
  };

  return (
    <div className="glass-panel rounded-2xl border border-slate-700/60 p-5 shadow-2xl relative overflow-hidden mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-700/50">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-teal-500/20 text-teal-400 rounded-xl">
            <Fuel className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-white tracking-wide">
                Underground Tank Farm & Liquid Dip Sensors
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full animate-pulse">
                LIVE TELEMETRY
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Calibrated ultrasonic dip measurements & volume automation
            </p>
          </div>
        </div>

        <button
          onClick={() => openModal('report_remaining_stock')}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center space-x-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5 text-teal-400" />
          <span>Full Stock Ledger</span>
        </button>
      </div>

      {/* Tanks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {tanks.map((tank) => {
          const colors = getFuelColors(tank.fuelType);
          const fillPercentage = Math.min(100, Math.max(0, (tank.currentLtr / tank.capacityLtr) * 100));
          const isLowStock = fillPercentage < 25;

          return (
            <div
              key={tank.id}
              className="bg-slate-900/80 rounded-2xl border border-slate-700/80 p-4 relative overflow-hidden shadow-xl hover:border-teal-500/40 transition-all duration-300 group"
            >
              {/* Card Top */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-extrabold text-white group-hover:text-teal-300 transition-colors">
                    {tank.name}
                  </h3>
                  <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-md border mt-1 ${colors.badge}`}>
                    {tank.fuelType}
                  </span>
                </div>
                {isLowStock && (
                  <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-full flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" /> Low Stock
                  </span>
                )}
              </div>

              {/* Tank Physical Visualizer Column */}
              <div className="flex items-center space-x-4 my-3">
                {/* Simulated Vertical Tank Container */}
                <div className="w-20 h-36 bg-slate-950 rounded-2xl border-2 border-slate-700 relative overflow-hidden flex flex-col justify-end p-1 shadow-inner shrink-0">
                  {/* Glass reflections */}
                  <div className="absolute top-0 left-1 w-1.5 h-full bg-white/10 rounded-full z-10 pointer-events-none" />
                  
                  {/* Liquid Fill with wave animation */}
                  <div 
                    className={`w-full rounded-xl bg-gradient-to-t ${colors.bar} relative transition-all duration-1000 overflow-hidden`}
                    style={{ height: `${fillPercentage}%` }}
                  >
                    <div className="liquid-wave" style={{ backgroundColor: colors.liquid }} />
                  </div>

                  {/* Dip mm scale lines */}
                  <div className="absolute right-1 top-2 bottom-2 w-2 flex flex-col justify-between text-[8px] font-mono text-slate-500 pointer-events-none">
                    <span>-</span>
                    <span>-</span>
                    <span>-</span>
                    <span>-</span>
                  </div>
                </div>

                {/* Tank Measurement Telemetry */}
                <div className="flex-1 space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Current Volume:</span>
                    <span className="text-lg font-black text-white font-mono">
                      {tank.currentLtr.toLocaleString()} <span className="text-xs font-normal text-slate-400">/ {tank.capacityLtr.toLocaleString()} L</span>
                    </span>
                  </div>

                  {/* Percentage Progress */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                      <span className="text-slate-400">Fill Capacity:</span>
                      <span className={colors.text}>{fillPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${colors.bar} rounded-full`}
                        style={{ width: `${fillPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Sensor Metrics: Dip MM, Water Dip, Temperature */}
                  <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px] text-slate-300">
                    <div className="bg-slate-950/60 p-1.5 rounded-lg border border-slate-800 font-mono">
                      <span className="text-slate-500 block text-[9px] uppercase">Dip Height</span>
                      <span className="font-bold text-teal-300">{tank.dipLevelMm} mm</span>
                    </div>
                    <div className="bg-slate-950/60 p-1.5 rounded-lg border border-slate-800 font-mono">
                      <span className="text-slate-500 block text-[9px] uppercase">Water Bottom</span>
                      <span className="font-bold text-cyan-300">{tank.waterDipMm} mm</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tank Card Footer */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center">
                  <Thermometer className="w-3 h-3 mr-1 text-amber-400" />
                  {tank.temperatureC}°C Safe
                </span>
                <button
                  onClick={() => openModal('calibrate_dip', { tankId: tank.id })}
                  className="text-teal-400 hover:text-teal-300 font-semibold hover:underline"
                >
                  Calibrate Dip ➔
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
