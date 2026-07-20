"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import { Download, FileText, Sparkles, Loader2, CheckCircle2 } from "lucide-react";

interface Note {
  id: number;
  title: string;
  category: string;
  size: string;
  downloads: string;
}

const notesData: Note[] = [
  { id: 1, title: "Indian Constitution Core Doctrines Dossier", category: "Constitutional Law", size: "1.4 MB", downloads: "4.8k" },
  { id: 2, title: "Legal Aptitude Handbook: Contracts & Tort Law", category: "Legal Reasoning", size: "2.8 MB", downloads: "6.2k" },
  { id: 3, title: "Logical Fallacies Workbook for Law Entrance", category: "Logical Reasoning", size: "920 KB", downloads: "3.1k" },
  { id: 4, title: "General Knowledge Compendium (2025 High-Yield)", category: "Current Affairs", size: "4.5 MB", downloads: "8.5k" },
  { id: 5, title: "Quantitative Aptitude Short-cuts & Tables", category: "Mathematics", size: "1.2 MB", downloads: "2.4k" },
];

export default function FreeNotes() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [downloadedIds, setDownloadedIds] = useState<number[]>([]);

  const handleDownload = (note: Note) => {
    setDownloadingId(note.id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedIds((prev) => [...prev, note.id]);
      alert(`Simulating PDF download for: "${note.title}" (${note.size})`);
    }, 1800);
  };

  return (
    <>
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />

      <main className="flex-grow pt-28 bg-brand-navy-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue-500">
              Study Material
            </span>
            <h1 className="text-4xl font-serif font-bold text-slate-150">
              Unlock Elite Legal Resources
            </h1>
            <p className="text-slate-335 text-sm font-light">
              Get immediate access to our high-yield static GK briefs and law exam cheatsheets compiled by NLU graduates.
            </p>
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notesData.map((note) => {
              const isDownloading = downloadingId === note.id;
              const isDownloaded = downloadedIds.includes(note.id);

              return (
                <div
                  key={note.id}
                  className="p-6 rounded-2xl glass-panel border border-white/5 flex items-start gap-4 hover:border-white/10 transition-colors justify-between"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue-500/10 border border-brand-blue-500/20 flex items-center justify-center text-brand-blue-500 shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-white/5 text-slate-335 border border-white/5 uppercase">
                        {note.category}
                      </span>
                      <h3 className="text-slate-150 font-bold text-sm leading-tight pt-1">
                        {note.title}
                      </h3>
                      <p className="text-slate-350 text-[10px]">
                        Size: {note.size} • {note.downloads} downloads
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(note)}
                    disabled={isDownloading}
                    className={`p-3 rounded-xl border flex items-center justify-center transition-all shrink-0 ${
                      isDownloaded
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                        : "bg-white/5 border-white/10 text-slate-250 hover:bg-white/10 hover:text-slate-150"
                    }`}
                  >
                    {isDownloading ? (
                      <Loader2 className="w-4 h-4 animate-spin text-brand-blue-500" />
                    ) : isDownloaded ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </main>

      <Footer />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLoginSuccess={() => {}} />
    </>
  );
}
