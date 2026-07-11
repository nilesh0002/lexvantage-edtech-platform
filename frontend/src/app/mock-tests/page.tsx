"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MockTestPreview from "@/components/home/MockTestPreview";
import AuthModal from "@/components/AuthModal";
import { Scale, Play, CheckCircle2, ChevronRight } from "lucide-react";

export default function MockTestsPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />
      <main className="flex-grow pt-28 bg-brand-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue-500">
              Mock Series
            </span>
            <h1 className="text-4xl font-serif font-bold text-white">
              Vantage Mock Test Series Pro
            </h1>
            <p className="text-slate-400 text-sm font-light">
              65 full-length, national level mock tests matching the exact standards of the Consortium of NLUs.
            </p>
          </div>

          {/* Interactive Test Preview */}
          <MockTestPreview onStartFullMock={() => setIsAuthOpen(true)} />

          {/* Key Specs Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
            <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-3">
              <span className="text-brand-blue-500 font-bold text-sm font-mono">01 / High Fidelity</span>
              <h4 className="text-white font-bold text-base">Identical UI Layouts</h4>
              <p className="text-slate-400 text-xs font-light leading-relaxed">
                Matches exact text spacing, section headers, question lists, timers, and review tags seen in the computer-based CLAT exam.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-3">
              <span className="text-brand-purple-500 font-bold text-sm font-mono">02 / Deep Analytics</span>
              <h4 className="text-white font-bold text-base">Accuracy & Speed Loggers</h4>
              <p className="text-slate-400 text-xs font-light leading-relaxed">
                Log the number of seconds spent per passage. Know whether you are lagging in English comprehension or Logical analysis.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-3">
              <span className="text-brand-gold-500 font-bold text-sm font-mono">03 / Video Explanations</span>
              <h4 className="text-white font-bold text-base">Exhaustive Video Solutions</h4>
              <p className="text-slate-400 text-xs font-light leading-relaxed">
                Every single question comes backed by a step-by-step video solution and precedent cases details curated by our senior faculty.
              </p>
            </div>
          </div>

        </div>
      </main>
      <Footer />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLoginSuccess={() => {}} />
    </>
  );
}
