'use client';

import React from 'react';
import { Shield, ShieldAlert, ShieldCheck, UserCheck, UserX, Plus } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function AdminManagerWidget() {
  const { admins, toggleAdminBlock, openModal } = useApp();

  return (
    <div className="glass-panel rounded-2xl border border-slate-700/60 p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between">
      <div>
        {/* Header matching Screenshot */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-700/50">
          <div>
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg">
                <Shield className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-white tracking-wide">
                ADMINS
              </h2>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Click to block / unblock system users
            </p>
          </div>

          <button
            onClick={() => openModal('settings')}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-teal-300 text-xs transition-colors flex items-center space-x-1"
            title="Manage Permissions"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="text-[11px] font-semibold">Add</span>
          </button>
        </div>

        {/* Admins List */}
        <div className="space-y-2">
          {admins.map((admin) => (
            <div
              key={admin.id}
              onClick={() => toggleAdminBlock(admin.id)}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                admin.isBlocked
                  ? 'bg-rose-950/30 border-rose-500/40 hover:bg-rose-900/40'
                  : 'bg-slate-900/60 border-slate-700/60 hover:border-teal-500/50 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  admin.isBlocked
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-gradient-to-tr from-teal-500 to-emerald-500 text-slate-950 font-black'
                }`}>
                  {admin.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-bold text-white">
                      {admin.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-medium">
                      {admin.role}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block">
                    {admin.lastActive}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center space-x-1">
                {admin.isBlocked ? (
                  <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-full flex items-center">
                    <UserX className="w-3 h-3 mr-1" /> Blocked
                  </span>
                ) : (
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full flex items-center">
                    <UserCheck className="w-3 h-3 mr-1" /> Active
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-400 text-center">
        🔒 Role-based access control with granular shift permissions
      </div>
    </div>
  );
}
