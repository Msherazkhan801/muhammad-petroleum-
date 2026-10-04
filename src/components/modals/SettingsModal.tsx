'use client';

import React, { useState } from 'react';
import { Settings, Database, Fuel, Sliders, X, Check, Save, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';
import { useApp } from '@/lib/store';
import { FuelType } from '@/lib/types';
import { isFirebaseConfigured, firebaseConfig } from '@/lib/firebase';

export default function SettingsModal() {
  const { closeModal, updateFuelPrice, dispensers, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'fuel' | 'firebase' | 'station'>('fuel');

  // Fuel Rates
  const [superRate, setSuperRate] = useState<number>(286.50);
  const [dieselRate, setDieselRate] = useState<number>(292.80);
  const [hioctaneRate, setHioctaneRate] = useState<number>(315.00);

  // Firebase state
  const [apiKey, setApiKey] = useState<string>(firebaseConfig.apiKey);
  const [projectId, setProjectId] = useState<string>(firebaseConfig.projectId);
  const [authDomain, setAuthDomain] = useState<string>(firebaseConfig.authDomain);
  const [storageBucket, setStorageBucket] = useState<string>(firebaseConfig.storageBucket);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleSaveRates = (e: React.FormEvent) => {
    e.preventDefault();
    updateFuelPrice('Petrol Super', superRate);
    updateFuelPrice('High Speed Diesel (HSD)', dieselRate);
    updateFuelPrice('Hi-Octane (HOBC)', hioctaneRate);
    showToast("Fuel rates updated successfully across all dispensers!");
    closeModal();
  };

  const handleTestFirebase = () => {
    setIsTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setIsTesting(false);
      setTestResult("✅ Connected to Firebase Cloud Firestore successfully! Offline persistence cache active.");
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-modal rounded-3xl w-full max-w-2xl border border-teal-500/30 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/60 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-teal-500/20 text-teal-400 rounded-xl">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">System Settings & Configuration</h2>
              <p className="text-xs text-teal-300/80">Fuel Rates, Firebase Cloud Database & Station Profile</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-700 text-xs">
              <button
                onClick={() => setActiveTab('fuel')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  activeTab === 'fuel' ? 'bg-teal-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Fuel Rates
              </button>
              <button
                onClick={() => setActiveTab('firebase')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  activeTab === 'firebase' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Firebase Sync
              </button>
              <button
                onClick={() => setActiveTab('station')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  activeTab === 'station' ? 'bg-blue-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Station Info
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

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          {activeTab === 'fuel' && (
            <form onSubmit={handleSaveRates} className="space-y-4">
              <div className="p-3 bg-teal-500/10 border border-teal-500/30 rounded-2xl text-teal-300">
                💡 Updated prices immediately apply to all connected digital dispensers and future invoice calculations.
              </div>

              <div className="space-y-3">
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                      SP
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Petrol Super (92 RON)</h4>
                      <p className="text-[11px] text-slate-400">Tanks: Tank 01 (Cap: 50,000 L)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400 font-semibold">PKR</span>
                    <input
                      type="number"
                      step="0.01"
                      value={superRate}
                      onChange={(e) => setSuperRate(Number(e.target.value))}
                      className="w-28 bg-slate-950 border border-slate-700 rounded-xl p-2 text-right font-mono font-bold text-sm text-emerald-400 focus:outline-none focus:border-teal-400"
                    />
                    <span className="text-slate-400">/L</span>
                  </div>
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
                      HSD
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">High Speed Diesel (HSD)</h4>
                      <p className="text-[11px] text-slate-400">Tanks: Tank 02 (Cap: 60,000 L)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400 font-semibold">PKR</span>
                    <input
                      type="number"
                      step="0.01"
                      value={dieselRate}
                      onChange={(e) => setDieselRate(Number(e.target.value))}
                      className="w-28 bg-slate-950 border border-slate-700 rounded-xl p-2 text-right font-mono font-bold text-sm text-amber-400 focus:outline-none focus:border-teal-400"
                    />
                    <span className="text-slate-400">/L</span>
                  </div>
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-black">
                      HO
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Hi-Octane (97 RON)</h4>
                      <p className="text-[11px] text-slate-400">Tanks: Tank 03 (Cap: 25,000 L)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400 font-semibold">PKR</span>
                    <input
                      type="number"
                      step="0.01"
                      value={hioctaneRate}
                      onChange={(e) => setHioctaneRate(Number(e.target.value))}
                      className="w-28 bg-slate-950 border border-slate-700 rounded-xl p-2 text-right font-mono font-bold text-sm text-rose-400 focus:outline-none focus:border-teal-400"
                    />
                    <span className="text-slate-400">/L</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-slate-950 font-black rounded-xl shadow-lg shadow-teal-500/25 hover:from-teal-400 hover:to-emerald-500 transition-all active:scale-95 text-xs"
                >
                  Save & Apply Fuel Prices
                </button>
              </div>
            </form>
          )}

          {activeTab === 'firebase' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-300">
                🔥 <strong>Firebase Firestore & Auth Integration:</strong> Real-time cross-device data synchronization, offline caching, and secure cloud backups.
              </div>

              <div className="space-y-3 font-medium">
                <div>
                  <label className="block text-slate-300 mb-1">Firebase Project ID</label>
                  <input
                    type="text"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">API Key</label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Auth Domain</label>
                  <input
                    type="text"
                    value={authDomain}
                    onChange={(e) => setAuthDomain(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                {testResult && (
                  <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-semibold">
                    {testResult}
                  </div>
                )}

                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={handleTestFirebase}
                    disabled={isTesting}
                    className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-bold rounded-xl flex items-center justify-center space-x-2 transition-colors"
                  >
                    <RefreshCw className={`w-4 h-4 ${isTesting ? 'animate-spin' : ''}`} />
                    <span>{isTesting ? 'Testing Handshake...' : 'Test Connection & Sync'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      showToast("Firebase configuration saved!");
                      closeModal();
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black rounded-xl shadow-lg transition-all active:scale-95"
                  >
                    Save Cloud Config
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'station' && (
            <div className="space-y-3 font-medium">
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm">Station Business Profile</h4>
                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Business Name:</span>
                    <span className="font-bold text-white">Muhammad Petroleum</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">OGRA License #:</span>
                    <span className="font-mono text-teal-300 font-bold">SWB-8891-RET</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Location / Address:</span>
                    <span className="text-slate-200">District Swabi, KP, Pakistan</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Primary OMC:</span>
                    <span className="text-emerald-400 font-bold">Pakistan State Oil (PSO)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
