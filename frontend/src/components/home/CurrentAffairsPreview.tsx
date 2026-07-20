"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Newspaper, Sparkles, BookMarked, BrainCircuit, X, MessageSquare, ChevronRight } from "lucide-react";

interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  summary: string;
  bullets: string[];
}

const articlesData: Article[] = [
  {
    id: 1,
    title: "Supreme Court Clarifies Proportionality Standard in Surveillance Cases",
    category: "Constitutional Law",
    date: "July 11, 2026",
    summary: "A 5-judge Constitution bench led by the Chief Justice reinforced the landmark K.S. Puttaswamy ruling, holding that state data monitoring policies must specify clear data deletion timelines and strict proportionality metrics.",
    bullets: [
      "Reaffirms Puttaswamy proportionality test: legitimate goal, rational connection, necessity, and balanced impact.",
      "Rules that indefinitely storing metadata is arbitrary and violates Article 21.",
      "Mandates independent judicial oversight for state interception requests.",
      "High yield for CLAT: Focus on Article 21, judicial review, and executive overreach.",
    ],
  },
  {
    id: 2,
    title: "Parliament Debates Amendments to the Digital Evidence Admissibility Laws",
    category: "Criminal Law",
    date: "July 09, 2026",
    summary: "Proposed amendments to the Bharatiya Nyaya Sanhita (BNS) aim to mandate cryptographic hash tags for all digital files presented in courts, resolving compliance concerns raised by legal defense associations.",
    bullets: [
      "Section 65B equivalents under the BNS code to get updated guidelines.",
      "Mandates decentralized ledger hashing for tamper-proof storage of forensic proof.",
      "Simplifies the certificate requirement for digital files from certified servers.",
      "Exam relevance: Focus on evidence authentication standards and electronic law reforms.",
    ],
  },
  {
    id: 3,
    title: "The Legal Dimensions of the COP 31 Carbon Taxation Accord",
    category: "International Law",
    date: "July 06, 2026",
    summary: "Legal experts examine whether Carbon Border Adjustment Mechanisms violate WTO rules regarding non-discriminatory trade treatments, sparking debates between industrial nations and developing markets.",
    bullets: [
      "Examines the concept of Common But Differentiated Responsibilities (CBDR).",
      "Details the legal conflict between Article III of the GATT and carbon tariffs.",
      "Analyzes bilateral dispute settlement avenues under treaty dispute clauses.",
      "Exam relevance: Highlights general environmental treaties and global sovereignty debates.",
    ],
  },
];

export default function CurrentAffairsPreview() {
  const [activeSummary, setActiveSummary] = useState<Article | null>(null);

  return (
    <section className="py-24 bg-brand-navy-950 relative z-10" id="current-affairs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue-500">
              Daily Digest
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-150 tracking-tight">
              Constitutional & Legal Bulletins
            </h2>
            <p className="text-slate-335 text-sm font-light leading-relaxed">
              We track national judicial verdicts, bill amendments, and global treaty negotiations, translating them into high-yield summaries for your GK preparation.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-purple-650/10 border border-brand-purple-600/20 text-brand-purple-400 text-xs font-bold self-start md:self-auto">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Updated Daily at 08:00 AM</span>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {articlesData.map((article) => (
            <div
              key={article.id}
              className="rounded-2xl glass-panel p-6 flex flex-col justify-between relative group hover:border-white/15 transition-all shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-brand-purple-500/10 text-brand-purple-400 border border-brand-purple-500/20 uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="text-[10px] text-slate-350 font-medium font-mono">{article.date}</span>
                </div>

                <h3 className="text-slate-150 font-bold text-sm sm:text-base leading-snug group-hover:text-brand-purple-500 transition-colors">
                  {article.title}
                </h3>

                <p className="text-slate-335 text-xs font-light leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => setActiveSummary(article)}
                  className="text-xs font-bold text-brand-blue-500 hover:text-slate-150 flex items-center gap-1 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold-500 fill-brand-gold-500/10" />
                  AI Legal Summarizer
                </button>
                <ChevronRight className="w-4 h-4 text-slate-350 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* AI Summarizer Popup Drawer Modal */}
        <AnimatePresence>
          {activeSummary && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveSummary(null)}
                className="fixed inset-0 bg-brand-navy-950/80 backdrop-blur-md"
              />

              {/* Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="relative w-full max-w-xl overflow-hidden rounded-2xl glass-panel border border-white/10 shadow-2xl p-6 sm:p-8 z-10 bg-brand-navy-900/95"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveSummary(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-brand-purple-500/10 border border-brand-purple-500/20 flex items-center justify-center">
                    <BrainCircuit className="w-4.5 h-4.5 text-brand-purple-500" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-extrabold tracking-widest text-slate-350 block leading-none">
                      Vantage AI
                    </span>
                    <h3 className="text-slate-150 font-bold text-xs">High-Yield Concept Digest</h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-brand-purple-400 font-mono">Article Title</span>
                    <h4 className="text-slate-150 font-serif font-bold text-base leading-tight">
                      {activeSummary.title}
                    </h4>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <span className="text-[10px] uppercase font-bold text-brand-gold-500 font-mono flex items-center gap-1">
                      <BookMarked className="w-3.5 h-3.5" /> High-Yield Bullet points for CLAT
                    </span>
                    <ul className="space-y-2">
                      {activeSummary.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-250 leading-relaxed font-light">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-500 mt-2 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between">
                    <p className="text-[10px] text-slate-350 max-w-[320px] leading-snug">
                      Subscribe to the Law Desk Briefing in the footer to get these summaries delivered to your inbox every morning.
                    </p>
                    <button
                      onClick={() => setActiveSummary(null)}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-150 hover:bg-white/10 text-xs font-bold transition-all"
                    >
                      Understood
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
