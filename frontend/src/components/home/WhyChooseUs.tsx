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
      color: "text-primary",
      bg: "bg-muted/50 border-border",
    },
    {
      icon: BookOpen,
      title: "Complete Syllabus Coverage",
      description: "Covers major Acts and subjects for law exams.",
      color: "text-primary",
      bg: "bg-muted/50 border-border",
    },
    {
      icon: ClipboardList,
      title: "Regular Mock Tests & Practice MCQs",
      description: "Build exam confidence with consistent practice.",
      color: "text-primary",
      bg: "bg-muted/50 border-border",
    },
    {
      icon: PenTool,
      title: "Handwritten & Easy-to-Understand Notes",
      description: "Concise notes designed for quick revision.",
      color: "text-primary",
      bg: "bg-muted/50 border-border",
    },
    {
      icon: Target,
      title: "Exam-Oriented Preparation",
      description: "Focused strategies for LL.B., CLAT, LL.M., AIBE, Judiciary, and other law entrance exams.",
      color: "text-primary",
      bg: "bg-muted/50 border-border",
    },
    {
      icon: MessageSquare,
      title: "Dedicated Doubt Support",
      description: "Get your questions answered with timely guidance.",
      color: "text-primary",
      bg: "bg-muted/50 border-border",
    },
    {
      icon: Smartphone,
      title: "Learn Anytime, Anywhere",
      description: "Access recorded lectures and study materials at your convenience.",
      color: "text-primary",
      bg: "bg-muted/50 border-border",
    },
    {
      icon: Sparkles,
      title: "Affordable & Student-Focused",
      description: "Quality legal education at reasonable fees.",
      color: "text-primary",
      bg: "bg-muted/50 border-border",
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
    <section className="py-24 bg-card relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Engineered for Success
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
            Why Future Lawyers Choose Shreya's Law Desk
          </h2>
          <p className="text-muted-foreground text-base font-light">
            We guide you through your law entrance exams, and support you all the way through your 5 years in law school with premium course articles, study guides, and legal notes.
          </p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group rounded-2xl glass-panel glass-panel-hover p-6 sm:p-8 flex flex-col justify-between h-full"
              >
                <div className="space-y-4">
                  {/* Icon Wrapper */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center border bg-muted/70 border-border group-hover:scale-110 transition-transform duration-300">
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>

                  {/* Text */}
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                    Learn more <Zap className="w-3 h-3 text-primary transition-transform group-hover:scale-110" />
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
