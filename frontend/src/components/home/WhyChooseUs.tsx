"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Bot, BookOpen, Clock, Users, Zap, GraduationCap } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: GraduationCap,
      title: "Law Entrance Preparation",
      description: "Comprehensive, structured coaching for CLAT, AILET, SLAT, and other top law entrance exams with detailed concept metrics.",
      color: "text-brand-gold-500",
      bg: "bg-white/5 border-white/10",
    },
    {
      icon: BookOpen,
      title: "5-Year Law College Companion",
      description: "We don't leave you after the entrance. Shreya's Law Desk supports you in law school with premium notes, research articles, and subject guides.",
      color: "text-brand-gold-500",
      bg: "bg-white/5 border-white/10",
    },
    {
      icon: Zap,
      title: "Elite Mock Simulations",
      description: "Access 120+ full-length mock tests modeled exactly on modern CLAT & AILET interfaces, with comprehensive analytics post-exam.",
      color: "text-brand-gold-500",
      bg: "bg-white/5 border-white/10",
    },
    {
      icon: Bot,
      title: "Legal Research Assistance",
      description: "Learn how to conduct academic writing and legal research with guides curated personally by Shreya Nadar.",
      color: "text-brand-gold-500",
      bg: "bg-white/5 border-white/10",
    },
    {
      icon: Users,
      title: "Ultra-Small Cohorts",
      description: "Strictly limited batch sizes of 40 students ensure personalized attention, individual feedback on essays, and interactive law discussion.",
      color: "text-brand-gold-500",
      bg: "bg-white/5 border-white/10",
    },
    {
      icon: Clock,
      title: "Instant Doubt Resolutions",
      description: "Submit doubts 24/7 inside the portal and get rich video or text explanations from Shreya Nadar within 15 minutes.",
      color: "text-brand-gold-500",
      bg: "bg-white/5 border-white/10",
    },
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
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
    <section className="py-24 bg-brand-navy-955 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-500">
            Engineered for Success
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Why Future Lawyers Choose Shreya's Law Desk
          </h2>
          <p className="text-slate-405 text-base font-light">
            We guide you through your law entrance exams, and support you all the way through your 5 years in law school with premium course articles, study guides, and legal notes.
          </p>
        </div>

        {/* Features Grid / Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-x-visible md:snap-none md:gap-6 sm:gap-8"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group rounded-2xl glass-panel glass-panel-hover p-6 sm:p-8 flex flex-col justify-between snap-start w-[85vw] sm:w-[400px] md:w-auto shrink-0"
              >
                <div className="space-y-4">
                  {/* Icon Wrapper */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${feature.bg} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>

                  {/* Text */}
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-blue-500 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    Learn more <Zap className="w-3 h-3 text-brand-gold-500" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
