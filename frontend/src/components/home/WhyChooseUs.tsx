"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Scale, BookOpen, ClipboardList, PenTool, Target, MessageSquare, Smartphone, Sparkles, Zap } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Scale,
      title: "Concept-Based Learning",
      description: "Understand the law instead of memorizing it.",
      color: "text-brand-gold-500",
      bg: "bg-white/5 border-white/10",
    },
    {
      icon: BookOpen,
      title: "Complete Syllabus Coverage",
      description: "Covers major Acts and subjects for law exams.",
      color: "text-brand-gold-500",
      bg: "bg-white/5 border-white/10",
    },
    {
      icon: ClipboardList,
      title: "Regular Mock Tests & Practice MCQs",
      description: "Build exam confidence with consistent practice.",
      color: "text-brand-gold-500",
      bg: "bg-white/5 border-white/10",
    },
    {
      icon: PenTool,
      title: "Handwritten & Easy-to-Understand Notes",
      description: "Concise notes designed for quick revision.",
      color: "text-brand-gold-500",
      bg: "bg-white/5 border-white/10",
    },
    {
      icon: Target,
      title: "Exam-Oriented Preparation",
      description: "Focused strategies for LL.B., CLAT, LL.M., AIBE, Judiciary, and other law entrance exams.",
      color: "text-brand-gold-500",
      bg: "bg-white/5 border-white/10",
    },
    {
      icon: MessageSquare,
      title: "Dedicated Doubt Support",
      description: "Get your questions answered with timely guidance.",
      color: "text-brand-gold-500",
      bg: "bg-white/5 border-white/10",
    },
    {
      icon: Smartphone,
      title: "Learn Anytime, Anywhere",
      description: "Access recorded lectures and study materials at your convenience.",
      color: "text-brand-gold-500",
      bg: "bg-white/5 border-white/10",
    },
    {
      icon: Sparkles,
      title: "Affordable & Student-Focused",
      description: "Quality legal education at reasonable fees.",
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
