"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Scale, Sparkles, Trophy, Calendar, CheckCircle2, ChevronRight, Users, Star } from "lucide-react";

interface HeroProps {
  onStartFree: () => void;
  onBookDemo: () => void;
}

export default function Hero({ onStartFree, onBookDemo }: HeroProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const badgeVariants: Variants = {
    animate: {
      y: [0, -6, 0],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-brand-navy-950">
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Left */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Pill Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-navy-900 border border-white/5 text-brand-gold-500 text-xs font-bold uppercase tracking-wider">
              <span>National Law University Preparation</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-sans font-black tracking-tight text-white leading-[1.15]">
              Your Gateway to <br />
              <span className="text-brand-gold-500">
                India's Top NLUs
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p variants={itemVariants} className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Prepare for CLAT, AILET, & SLAT with structured pedagogy, dynamic mock simulations, and dedicated 1-on-1 mentorship from top NLU alumni.
            </motion.p>

            {/* Call to Actions */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onStartFree}
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg text-sm font-bold text-brand-navy-950 bg-brand-gold-500 hover:bg-brand-gold-450 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                Start Free Trial
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const target = document.getElementById("courses");
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg text-sm font-bold text-white border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                Explore Courses
              </button>
            </motion.div>

            {/* Social Trust Metrics */}
            <motion.div variants={itemVariants} className="pt-8 border-t border-white/5 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4">
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="w-9 h-9 rounded-full border-2 border-brand-navy-950 bg-brand-navy-800 flex items-center justify-center text-[10px] font-bold text-white relative">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=student-${num}`}
                        alt="Student"
                        className="rounded-full w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center text-brand-gold-500">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">18,500+ Aspirants Trained</span>
                </div>
              </div>

              <div className="h-8 w-px bg-white/5 hidden sm:block" />

              <div className="text-center lg:text-left">
                <div className="text-white text-lg font-bold flex items-center justify-center lg:justify-start gap-1">
                  <Trophy className="w-4.5 h-4.5 text-brand-gold-500" />
                  <span>420+ Selections</span>
                </div>
                <span className="text-xs text-slate-400 font-medium">In Top 5 NLUs (CLAT 2025)</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Graphical Right Panel */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.3 }}
              className="w-full max-w-sm sm:max-w-md relative"
            >
              {/* Decorative glows around the panel */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-brand-blue-500 via-brand-purple-600 to-brand-gold-500 opacity-20 blur-xl animate-pulse-slow" />

              {/* Main Illustration container */}
              <div className="relative rounded-2xl border border-white/10 bg-brand-navy-900/60 backdrop-blur-md overflow-hidden shadow-2xl p-6 glow-blue">
                {/* Simulated Portal Top */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Live Mock Portal</span>
                </div>

                {/* Score Graphic Mock */}
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-slate-450 text-[10px] font-bold block uppercase tracking-wide">Overall Percentile</span>
                      <span className="text-2xl font-bold font-serif text-white">99.86 %</span>
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-brand-gold-500 flex items-center justify-center text-[10px] font-bold text-brand-gold-500 bg-brand-gold-500/5">
                      Rank 4
                    </div>
                  </div>

                  {/* Multi-Section Progress Bars */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-semibold text-slate-300">CLAT Focus Breakdown</h4>
                    {[
                      { name: "Legal Reasoning", value: 92, color: "from-brand-blue-500 to-cyan-500" },
                      { name: "Logical Reasoning", value: 85, color: "from-brand-purple-500 to-pink-500" },
                      { name: "Current Affairs & GK", value: 96, color: "from-brand-gold-500 to-amber-500" },
                    ].map((sec) => (
                      <div key={sec.name} className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-400 font-medium">{sec.name}</span>
                          <span className="text-white font-bold">{sec.value}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${sec.value}%` }}
                            transition={{ duration: 1.5, delay: 0.8 }}
                            className={`h-full rounded-full bg-gradient-to-r ${sec.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Static Mock Test Timer Pill */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-brand-blue-950 to-brand-navy-950 border border-brand-blue-500/10 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-xs font-medium text-slate-300">Active Test Simulation</span>
                    </div>
                    <span className="text-xs font-bold text-white font-mono">01:42:15</span>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                variants={badgeVariants}
                animate="animate"
                className="absolute -top-6 -right-6 p-3 rounded-xl border border-white/10 bg-brand-navy-900/90 shadow-xl flex items-center gap-2 backdrop-blur-md"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-gold-500/10 flex items-center justify-center text-brand-gold-500 border border-brand-gold-500/20">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold leading-none">NLSIU Bangalore</span>
                  <span className="text-xs text-white font-bold">12 selections</span>
                </div>
              </motion.div>

              <motion.div
                variants={badgeVariants}
                animate="animate"
                className="absolute -bottom-6 -left-6 p-3 rounded-xl border border-white/10 bg-brand-navy-900/90 shadow-xl flex items-center gap-2 backdrop-blur-md"
                style={{ animationDelay: "2s" }}
              >
                <div className="w-8 h-8 rounded-lg bg-brand-blue-500/10 flex items-center justify-center text-brand-blue-500 border border-brand-blue-500/20">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold leading-none">Legal Aptitude</span>
                  <span className="text-xs text-white font-bold">Daily Quiz Live</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* NLU Trust Badge slider/grid */}
        <div className="pt-20">
          <p className="text-center text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">
            LexVantage Students are Top Rankers at Elite National Law Universities
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 items-center justify-center opacity-40 hover:opacity-60 transition-opacity duration-300">
            {[
              { name: "NLSIU Bangalore", label: "NLSIU" },
              { name: "NALSAR Hyderabad", label: "NALSAR" },
              { name: "WBNUJS Kolkata", label: "NUJS" },
              { name: "NLU Jodhpur", label: "NLU Jodhpur" },
              { name: "GNLU Gandhinagar", label: "GNLU" },
              { name: "NLIU Bhopal", label: "NLIU" },
            ].map((nlu) => (
              <div key={nlu.name} className="flex justify-center text-center">
                <span className="text-slate-300 font-serif font-extrabold text-sm sm:text-base tracking-widest border-b border-transparent hover:border-slate-500 transition-all cursor-default">
                  {nlu.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
