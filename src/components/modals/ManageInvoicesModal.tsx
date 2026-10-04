'use client';

import React, { useState } from 'react';
import { FileText, Search, Printer, X, Download, PlusCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function ManageInvoicesModal() {
  const { purchases, sales, closeModal, openModal } = useApp();
  const [tab, setTab] = useState<'sales' | 'purchases'>('sales');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredSales = sales.filter(s => 
    s.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.fuelType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPurchases = purchases.filter(p =>
    p.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-modal rounded-3xl w-full max-w-4xl border border-teal-500/30 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/60 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Manage Billing & Invoices</h2>
              <p className="text-xs text-teal-300/80">Search, Print Slips & Audit Fuel Records</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-700 text-xs">
              <button
                onClick={() => setTab('sales')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  tab === 'sales' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Sales Invoices ({sales.length})
              </button>
              <button
                onClick={() => setTab('purchases')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  tab === 'purchases' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Purchase Invoices ({purchases.length})
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

        {/* Search and Action Bar */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={`Search ${tab === 'sales' ? 'customer, fuel or slip #' : 'supplier, truck or invoice #'}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
            />
          </div>

          <button
            onClick={() => tab === 'sales' ? openModal('new_sale') : openModal('new_purchase')}
            className="px-3.5 py-2 bg-gradient-to-r from-teal-500 to-emerald-600 text-slate-950 font-bold rounded-xl flex items-center space-x-1.5 shadow-md hover:from-teal-400 hover:to-emerald-500 transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Add {tab === 'sales' ? 'Sale' : 'Purchase'}</span>
          </button>
        </div>

        {/* Table Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {tab === 'sales' ? (
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-300 font-bold border-b border-slate-700">
                    <th className="p-3">Invoice #</th>
                    <th className="p-3">Date/Time</th>
                    <th className="p-3">Customer / Party</th>
                    <th className="p-3">Fuel Grade</th>
                    <th className="p-3 text-right">Volume (LTR)</th>
                    <th className="p-3 text-right">Rate</th>
                    <th className="p-3 text-right">Amount (PKR)</th>
                    <th className="p-3 text-center">Mode</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredSales.map(sale => (
                    <tr key={sale.id} className="hover:bg-slate-850 transition-colors">
                      <td className="p-3 font-mono text-emerald-400 font-bold">{sale.invoiceNo}</td>
                      <td className="p-3 text-slate-400">{sale.date} <span className="text-[10px] block">{sale.time}</span></td>
                      <td className="p-3 font-bold text-white">{sale.customerName}</td>
                      <td className="p-3 text-slate-300">{sale.fuelType}</td>
                      <td className="p-3 text-right font-mono text-white font-bold">{sale.quantityLtr.toLocaleString()}</td>
                      <td className="p-3 text-right font-mono text-slate-400">{sale.unitRate}</td>
                      <td className="p-3 text-right font-mono text-emerald-300 font-bold">{sale.netAmount.toLocaleString()}</td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          sale.paymentMode === 'Credit' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {sale.paymentMode}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => alert(`Printing Sales Slip ${sale.invoiceNo}`)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-lg transition-colors"
                          title="Print Receipt Slip"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-300 font-bold border-b border-slate-700">
                    <th className="p-3">Invoice #</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Supplier (OMC)</th>
                    <th className="p-3">Bowser Vehicle</th>
                    <th className="p-3">Fuel Grade</th>
                    <th className="p-3 text-right">Gross LTR</th>
                    <th className="p-3 text-right">Shortage</th>
                    <th className="p-3 text-right">Net Payable (PKR)</th>
                    <th className="p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredPurchases.map(pur => (
                    <tr key={pur.id} className="hover:bg-slate-850 transition-colors">
                      <td className="p-3 font-mono text-cyan-400 font-bold">{pur.invoiceNo}</td>
                      <td className="p-3 text-slate-400">{pur.date}</td>
                      <td className="p-3 font-bold text-white">{pur.supplier}</td>
                      <td className="p-3 font-mono text-slate-300">{pur.vehicleNo}</td>
                      <td className="p-3 text-slate-300">{pur.fuelType}</td>
                      <td className="p-3 text-right font-mono text-white font-bold">{pur.grossLtr.toLocaleString()}</td>
                      <td className="p-3 text-right font-mono text-rose-400 font-bold">{pur.shortageLtr} L</td>
                      <td className="p-3 text-right font-mono text-teal-300 font-bold">{pur.netPayable.toLocaleString()}</td>
                      <td className="p-3 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {pur.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
