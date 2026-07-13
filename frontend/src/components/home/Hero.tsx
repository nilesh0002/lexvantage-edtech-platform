"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Scale, Sparkles, Trophy, Calendar, CheckCircle2, ChevronRight, Users, Star } from "lucide-react";

interface HeroProps {
  onStartFree: () => void;
  onBookDemo: () => void;
  onExploreCourses?: () => void;
}

export default function Hero({ onStartFree, onBookDemo, onExploreCourses }: HeroProps) {
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
    <section className="relative min-h-[75vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-brand-navy-950">
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 flex flex-col items-center justify-center"
        >
          {/* Pill Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-navy-900 border border-white/5 text-brand-gold-500 text-xs font-bold uppercase tracking-wider">
            <span>National Law University Preparation</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-sans font-black tracking-tight text-white leading-[1.15] max-w-2xl">
            Personalized CLAT & <br />
            <span className="text-brand-gold-500">
              Law Entrance Prep
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p variants={itemVariants} className="text-slate-355 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed font-light">
            Direct, focused guidance and structured mocks from Adv. Shreya Nadar. We keep our batches small to focus entirely on your individual success.
          </motion.p>

          {/* Call to Actions */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto">
            <button
              onClick={onStartFree}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg text-sm font-bold text-brand-navy-950 bg-brand-gold-500 hover:bg-brand-gold-450 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              Start Free Trial
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                if (onExploreCourses) {
                  onExploreCourses();
                } else {
                  const target = document.getElementById("courses");
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg text-sm font-bold text-slate-150 border border-slate-150/20 bg-slate-150/5 hover:bg-slate-150/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              Explore Courses
            </button>
          </motion.div>

          {/* Startup Focus Detail */}
          <motion.div variants={itemVariants} className="pt-8 border-t border-white/5 w-full flex justify-center">
            <div className="text-center">
              <div className="text-white text-xs sm:text-sm font-semibold flex flex-wrap items-center justify-center gap-2 text-slate-350">
                <Trophy className="w-4 h-4 text-brand-gold-500 inline-block mr-1" />
                <span>Small Batch Focus</span>
                <span className="text-slate-600">•</span>
                <span>Coaching by Adv. Shreya Nadar</span>
                <span className="text-slate-600">•</span>
                <span>Dedicated 1-on-1 Doubt Clearing</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
