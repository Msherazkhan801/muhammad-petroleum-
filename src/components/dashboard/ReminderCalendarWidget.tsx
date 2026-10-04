'use client';

import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function ReminderCalendarWidget() {
  const { reminders, addReminder, toggleReminder, deleteReminder } = useApp();
  const [selectedDay, setSelectedDay] = useState<number>(4);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<any>('Tanker Arrival');

  // October 2026 starts on Thursday (1st).
  // Trailing September days: 27, 28, 29, 30
  // Days of Oct: 1..31
  // Trailing Nov days: 1..7

  const daysInMonth = 31;
  const startDayOfWeek = 4; // Thursday

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addReminder({
      title: newTitle,
      date: `2026-10-${String(selectedDay).padStart(2, '0')}`,
      category: newCategory,
      priority: 'High'
    });
    setNewTitle('');
    setShowAddModal(false);
  };

  const selectedDateStr = `2026-10-${String(selectedDay).padStart(2, '0')}`;
  const dayReminders = reminders.filter(r => r.date === selectedDateStr);

  return (
    <div className="glass-panel rounded-2xl border border-slate-700/60 p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-700/50">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-white tracking-wide">
              Reminder Management
            </h2>
          </div>
        </div>

        {/* Month Navigation Row matching Screenshot */}
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-sm font-bold text-slate-100">
            October 2026
          </span>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setSelectedDay(4)}
              className="px-2.5 py-1 text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors"
            >
              today
            </button>
            <button 
              onClick={() => setSelectedDay(prev => Math.max(1, prev - 1))}
              className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setSelectedDay(prev => Math.min(31, prev + 1))}
              className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid Header */}
        <div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-400 mb-1">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Calendar Days Matrix */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium">
          {/* September Trailing Days */}
          <div className="py-1.5 text-slate-600">27</div>
          <div className="py-1.5 text-slate-600">28</div>
          <div className="py-1.5 text-slate-600">29</div>
          <div className="py-1.5 text-slate-600">30</div>

          {/* October Days 1 to 31 */}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const dateStr = `2026-10-${String(day).padStart(2, '0')}`;
            const hasReminders = reminders.some(r => r.date === dateStr);
            const isSelected = selectedDay === day;

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`py-1.5 rounded-lg transition-all relative flex flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-400/30'
                    : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>{day}</span>
                {hasReminders && (
                  <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                    isSelected ? 'bg-slate-950' : 'bg-teal-400 animate-pulse'
                  }`} />
                )}
              </button>
            );
          })}

          {/* November Trailing Days */}
          <div className="py-1.5 text-slate-600">1</div>
          <div className="py-1.5 text-slate-600">2</div>
          <div className="py-1.5 text-slate-600">3</div>
          <div className="py-1.5 text-slate-600">4</div>
          <div className="py-1.5 text-slate-600">5</div>
          <div className="py-1.5 text-slate-600">6</div>
          <div className="py-1.5 text-slate-600">7</div>
        </div>

        {/* Reminders List for Selected Day */}
        <div className="mt-4 pt-3 border-t border-slate-700/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-200 flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-teal-400" />
              Tasks for Oct {selectedDay}, 2026
            </span>
            <button
              onClick={() => setShowAddModal(true)}
              className="text-[11px] font-bold text-teal-300 hover:text-teal-200 flex items-center space-x-0.5 bg-teal-500/10 px-2 py-0.5 rounded-lg border border-teal-500/20"
            >
              <Plus className="w-3 h-3" />
              <span>Add Task</span>
            </button>
          </div>

          <div className="space-y-1.5 max-h-28 overflow-y-auto">
            {dayReminders.length > 0 ? (
              dayReminders.map(rem => (
                <div
                  key={rem.id}
                  className={`p-2 rounded-xl border text-xs flex items-center justify-between transition-all ${
                    rem.completed
                      ? 'bg-slate-900/40 border-slate-800 text-slate-500 line-through'
                      : 'bg-slate-900/80 border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2 truncate">
                    <input
                      type="checkbox"
                      checked={rem.completed}
                      onChange={() => toggleReminder(rem.id)}
                      className="rounded border-slate-700 text-teal-500 focus:ring-0 cursor-pointer"
                    />
                    <span className="truncate">{rem.title}</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold shrink-0 ml-1">
                    {rem.category}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-[11px] text-slate-400 text-center py-2">
                No scheduled reminders for this date.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Add Task Modal overlay */}
      {showAddModal && (
        <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md p-4 rounded-2xl flex flex-col justify-between z-20 border border-teal-500/40">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
              <span className="text-xs font-bold text-teal-300">Add Reminder for Oct {selectedDay}</span>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white text-xs">✕</button>
            </div>
            <input
              type="text"
              placeholder="e.g. Tanker Arrival, Recovery Due..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-xs rounded-lg p-2 text-white mb-2"
              autoFocus
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-xs rounded-lg p-2 text-white"
            >
              <option value="Tanker Arrival">Tanker Arrival</option>
              <option value="Payment Due">Payment Due</option>
              <option value="Inspection">OGRA Inspection</option>
              <option value="Tax Filing">Tax Filing</option>
              <option value="Stock Low">Stock Low Alert</option>
            </select>
          </div>
          <div className="flex space-x-2 mt-3">
            <button
              onClick={() => setShowAddModal(false)}
              className="flex-1 py-1.5 bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="flex-1 py-1.5 bg-teal-500 text-slate-950 text-xs font-bold rounded-lg shadow-md"
            >
              Save Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
