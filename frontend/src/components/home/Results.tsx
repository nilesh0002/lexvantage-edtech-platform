"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Trophy, Star, GraduationCap, Scale, Award, ArrowUpRight } from "lucide-react";

import { Ranker, rankersData } from "@/data/results";


export default function Results() {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section className="py-24 bg-brand-navy-950 relative z-10 overflow-hidden" id="results">
      {/* Gradients */}
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-brand-purple-650/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-500 flex items-center justify-center gap-1.5">
            <Trophy className="w-4 h-4 text-brand-gold-500 fill-brand-gold-500/10 animate-bounce" />
            Hall of Fame 2025
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Transforming Aspirants Into NLU Scholars
          </h2>
          <p className="text-slate-400 text-sm font-light">
            Our results speak for our pedagogical methodology. Meets the rankers who scored top-20 ranks this past academic year.
          </p>
        </div>

        {/* Rankers Showcase Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16"
        >
          {rankersData.map((ranker) => (
            <motion.div
              key={ranker.name}
              variants={itemVariants}
              className="group rounded-2xl glass-panel p-6 relative hover:border-brand-gold-500/30 transition-all duration-300 shadow-xl"
            >
              {/* Highlight Glow for Top ranks */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-tr from-brand-gold-500/0 to-brand-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Rank Tag */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-brand-gold-500/10 border border-brand-gold-500/25 text-brand-gold-500 text-xs font-bold font-mono">
                {ranker.rank}
              </div>

              {/* Avatar */}
              <div className="w-20 h-20 rounded-xl p-0.5 bg-gradient-to-tr from-brand-gold-500/20 to-white/10 mb-4 flex items-center justify-center">
                <div className="w-full h-full rounded-[10px] bg-brand-navy-900 overflow-hidden relative flex items-center justify-center">
                  <img
                    src={ranker.avatar}
                    alt={ranker.name}
                    className="w-4/5 h-4/5 object-contain"
                  />
                </div>
              </div>

              {/* Student details */}
              <div className="space-y-1">
                <h3 className="text-white font-extrabold text-base leading-none group-hover:text-brand-gold-500 transition-colors">
                  {ranker.name}
                </h3>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                  <GraduationCap className="w-3.5 h-3.5 text-brand-blue-500" />
                  {ranker.nlu}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono block">
                  {ranker.exam}
                </span>
              </div>

              {/* Quote Quote */}
              <p className="text-slate-350 text-xs font-light leading-relaxed italic border-t border-white/5 pt-4 mt-4 font-serif">
                "{ranker.quote}"
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Statistical highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 sm:p-12 rounded-2xl glass-panel border border-white/5 backdrop-blur-md text-center">
          <div className="space-y-1.5">
            <div className="text-3xl sm:text-4xl font-serif font-extrabold text-white">420+</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-450">NLU Selections (Total)</div>
          </div>
          <div className="space-y-1.5 border-l border-white/5">
            <div className="text-3xl sm:text-4xl font-serif font-extrabold text-brand-gold-500">12%</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-450">Top 100 Ranks share</div>
          </div>
          <div className="space-y-1.5 border-l border-white/5">
            <div className="text-3xl sm:text-4xl font-serif font-extrabold text-white">98.4%</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-450">Student Mock Completion</div>
          </div>
          <div className="space-y-1.5 border-l border-white/5">
            <div className="text-3xl sm:text-4xl font-serif font-extrabold text-brand-blue-500">+24.5</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-450">Avg Mock Mark Shift</div>
          </div>
        </div>
      </div>
    </section>
  );
}
