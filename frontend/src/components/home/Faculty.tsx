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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-500">
              Master Mentor
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-black text-white tracking-tight">
              Learn Directly From the Founder
            </h2>
            <p className="text-slate-450 text-sm font-light leading-relaxed">
              No generic tutors. Get direct, unmediated guidance from Shreya Nadar, who personally teaches and anchors all core subject streams.
            </p>
          </div>

          <a
            href="#courses"
            className="flex items-center gap-1.5 px-5 py-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-xs transition-all self-start md:self-auto cursor-pointer"
          >
            Schedule Free Demo Class
            <ArrowUpRight className="w-4 h-4 text-brand-gold-500" />
          </a>
        </div>

        {/* Center-aligned single educator card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto"
        >
          {facultyData.map((member) => {
            const Icon = member.specialtyIcon;
            return (
              <motion.div
                key={member.name}
                variants={itemVariants}
                className="group rounded-2xl bg-brand-navy-900 border border-white/5 p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center hover:border-white/10 transition-all duration-300"
              >
                {/* Avatar wrapper */}
                <div className="w-44 h-44 rounded-xl p-0.5 bg-gradient-to-tr from-purple-600 via-blue-500 to-amber-500 overflow-hidden shrink-0 relative shadow-lg shadow-brand-blue-500/10">
                  <div className="w-full h-full rounded-[10px] bg-brand-navy-900 overflow-hidden relative flex items-center justify-center">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-4/5 h-4/5 object-contain"
                    />
                    {/* Overlay specialty badge */}
                    <div className="absolute bottom-2 right-2 w-7 h-7 rounded-lg bg-brand-navy-900 border border-white/10 flex items-center justify-center shadow-lg">
                      <Icon className="w-4 h-4 text-brand-gold-500" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-4 flex-1">
                  <div className="space-y-1 text-center md:text-left">
                    <h3 className="text-white font-black text-xl leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-brand-gold-500 text-xs font-bold font-mono">
                      {member.role}
                    </p>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed">
                      {member.credentials}
                    </p>
                  </div>
                  <p className="text-slate-300 text-sm font-light leading-relaxed border-t border-white/5 pt-4">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
