"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import { Award, Compass, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";

export default function Scholarships() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />

      <main className="flex-grow pt-28 bg-brand-navy-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-500">
              Vantage Scholarship Test
            </span>
            <h1 className="text-4xl font-serif font-bold text-white">
              LexVantage Merit Scholars Program
            </h1>
            <p className="text-slate-400 text-sm font-light">
              We reward academic excellence. Earn up to 100% tuition waivers for our premium CLAT, AILET, and NLU preparation courses.
            </p>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                Empowering deserving jurists regardless of finances.
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                Our dynamic scholarship program evaluates both board exam credentials and standard logical reasoning aptitude. Awards range from 10% to complete 100% course sponsorships.
              </p>
              
              <ul className="space-y-3.5">
                {[
                  "Class 12th Board Score (>=95% unlocks 40% waiver)",
                  "LexVantage Scholarship Entrance Mocks (AIR percentile)",
                  "State quota reservation categories (SC/ST/OBC support)",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-2xl glass-panel border border-brand-gold-500/20 bg-gradient-to-tr from-brand-navy-900 via-brand-navy-900 to-brand-purple-950/20 space-y-6 text-center">
              <Award className="w-12 h-12 text-brand-gold-500 mx-auto fill-brand-gold-500/5 animate-pulse" />
              <div className="space-y-2">
                <h4 className="text-white font-bold text-base">Calculate Your Fee Waiver</h4>
                <p className="text-slate-400 text-xs font-light max-w-xs mx-auto">
                  Access our scholarship calculator tool in the student dashboard to calculate details instantly.
                </p>
              </div>

              <button
                onClick={() => setIsAuthOpen(true)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 hover:from-brand-blue-500 hover:to-brand-purple-500 text-white font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-1"
              >
                Start Scholarship Evaluation
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLoginSuccess={() => {}} />
    </>
  );
}
