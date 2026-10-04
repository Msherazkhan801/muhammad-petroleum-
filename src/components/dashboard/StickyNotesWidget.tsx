'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileEdit, Bold, Italic, Link2, List, ListOrdered, 
  Quote, Table, Video, Image as ImageIcon, Save, Check, Undo, Redo, Sparkles
} from 'lucide-react';
import { useApp } from '@/lib/store';

export default function StickyNotesWidget() {
  const { stickyNote, updateStickyNote } = useApp();
  const [content, setContent] = useState<string>(stickyNote.content);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    setContent(stickyNote.content);
  }, [stickyNote]);

  const handleSave = () => {
    updateStickyNote(content);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleAppendTimestamp = () => {
    const timestamp = `\n[Log ${new Date().toLocaleTimeString()}]: `;
    setContent(prev => prev + timestamp);
  };

  return (
    <div className="glass-panel rounded-2xl border border-slate-700/60 p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-700/50">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-teal-500/20 text-teal-400 rounded-lg">
              <FileEdit className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                Sticky Notes
              </h2>
              <span className="text-[10px] text-slate-400">
                Last modified: {stickyNote.lastModified}
              </span>
            </div>
          </div>

          <button
            onClick={handleSave}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center space-x-1.5 ${
              isSaved
                ? 'bg-emerald-500 text-slate-950 font-black'
                : 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white shadow-teal-500/20 active:scale-95'
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save</span>
              </>
            )}
          </button>
        </div>

        {/* Rich Toolbar as in Screenshot */}
        <div className="flex flex-wrap items-center gap-1 p-1.5 bg-slate-900/90 rounded-xl border border-slate-700/70 mb-3 text-slate-300">
          <div className="px-2 py-0.5 text-xs text-slate-400 font-medium border-r border-slate-700">
            Paragraph
          </div>
          <button 
            type="button" 
            onClick={() => setContent(prev => prev + ' **bold** ')}
            className="p-1.5 hover:bg-slate-800 rounded text-slate-200 hover:text-teal-400"
            title="Bold"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button 
            type="button" 
            onClick={() => setContent(prev => prev + ' *italic* ')}
            className="p-1.5 hover:bg-slate-800 rounded text-slate-200 hover:text-teal-400"
            title="Italic"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button 
            type="button" 
            className="p-1.5 hover:bg-slate-800 rounded text-slate-200 hover:text-teal-400"
            title="Link"
          >
            <Link2 className="w-3.5 h-3.5" />
          </button>
          <div className="w-[1px] h-4 bg-slate-700 mx-0.5" />
          <button 
            type="button" 
            onClick={() => setContent(prev => prev + '\n• ')}
            className="p-1.5 hover:bg-slate-800 rounded text-slate-200 hover:text-teal-400"
            title="Bullet list"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button 
            type="button" 
            onClick={() => setContent(prev => prev + '\n1. ')}
            className="p-1.5 hover:bg-slate-800 rounded text-slate-200 hover:text-teal-400"
            title="Numbered list"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>
          <button 
            type="button" 
            className="p-1.5 hover:bg-slate-800 rounded text-slate-200 hover:text-teal-400"
            title="Quote"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>
          <button 
            type="button" 
            className="p-1.5 hover:bg-slate-800 rounded text-slate-200 hover:text-teal-400"
            title="Table"
          >
            <Table className="w-3.5 h-3.5" />
          </button>
          <button 
            type="button" 
            onClick={handleAppendTimestamp}
            className="ml-auto px-2 py-0.5 text-[10px] bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 rounded font-semibold transition-colors"
          >
            + Timestamp
          </button>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            placeholder="Write daily dispatch memos, ledger clearance notes, or tanker instructions here..."
            className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-400 transition-colors font-sans leading-relaxed resize-none shadow-inner"
          />
        </div>
      </div>

      <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
        <span>💡 Autosaves locally and mirrors to Cloud Storage on save.</span>
        <span className="text-teal-400 font-mono font-medium">{content.length} characters</span>
      </div>
    </div>
  );
}
