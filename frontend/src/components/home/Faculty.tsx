"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Scale, Landmark, BookOpen, GraduationCap, ArrowUpRight } from "lucide-react";

import { Educator, facultyData } from "@/data/faculty";


export default function Faculty() {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
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

  return (
    <section className="py-24 bg-brand-navy-950 relative z-10" id="faculty">
      {/* Glow backgrounds */}
      <div className="absolute left-1/4 top-1/4 w-[400px] h-[400px] bg-brand-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue-500">
              Elite Mentors
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Learn From Law Experts & NLU Alumni
            </h2>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              We do not hire generic tutors. Our faculty comprises Supreme Court advocates, former professors, and top-ranking NLU graduates.
            </p>
          </div>

          <a
            href="#courses"
            className="flex items-center gap-1.5 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs transition-all self-start md:self-auto"
          >
            Schedule Free Demo Class
            <ArrowUpRight className="w-4 h-4 text-brand-gold-500" />
          </a>
        </div>

        {/* Faculty Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {facultyData.map((member) => {
            const Icon = member.specialtyIcon;
            return (
              <motion.div
                key={member.name}
                variants={itemVariants}
                className="group rounded-2xl glass-panel p-6 flex flex-col justify-between hover:border-white/15 transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Avatar wrapper */}
                  <div className="w-full aspect-square rounded-xl p-0.5 bg-gradient-to-tr from-white/5 to-white/15 overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-300">
                    <div className="w-full h-full rounded-[10px] bg-brand-navy-900 overflow-hidden relative flex items-center justify-center">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-4/5 h-4/5 object-contain"
                      />
                      {/* Overlay specialty badge */}
                      <div className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-brand-navy-950 border border-white/10 flex items-center justify-center shadow-lg">
                        <Icon className="w-4 h-4 text-brand-gold-500" />
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-1">
                    <h3 className="text-white font-extrabold text-base leading-tight group-hover:text-brand-blue-500 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-brand-gold-500 text-xs font-bold font-mono">
                      {member.role}
                    </p>
                    <p className="text-slate-400 text-[10px] font-medium leading-relaxed">
                      {member.credentials}
                    </p>
                  </div>
                </div>

                <p className="text-slate-350 text-xs font-light leading-relaxed border-t border-white/5 pt-4 mt-4">
                  {member.bio}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
