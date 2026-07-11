"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Scale } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "Who is eligible to join the JurisPath coaching cohorts?",
    answer: "Our classes are architected for aspirants targeting CLAT, AILET, SLAT, and MH CET Law. We have custom curriculums designed specifically for Class 11 students (2-Year Program), Class 12 students (1-Year Foundation), and Droppers (Elite Repeaters Batch).",
  },
  {
    question: "How does the simulated Mock Test Portal mirror the actual exams?",
    answer: "Our online portal matches the exact interface, font sizes, question navigation palettes, and countdown timers of the actual computer-based CLAT and AILET examinations. We simulate the official marking scheme (+1 for correct answers, -0.25 for incorrect ones) to build mental stamina.",
  },
  {
    question: "Can I adjust my batch timings to avoid conflicts with school board exams?",
    answer: "Absolutely. We offer flexible schedules including Early Morning, Late Evening, and Weekend-only cohorts. Additionally, every live lecture is recorded in high-definition and uploaded to your dashboard alongside key transcripts and slides.",
  },
  {
    question: "Do you offer scholarship incentives for merit-based admissions?",
    answer: "Yes, our Vantage Scholarship Program offers up to 100% tuition waivers. Scholarships are calculated dynamically in the student dashboard based on your Class 10/12 board exam percentages, or your performance on our simulated scholarship tests.",
  },
  {
    question: "What is your doubt-resolution system's turnaround time?",
    answer: "JurisPath has a dedicated 24/7 doubt resolution team. Students can upload screenshots or type text queries directly inside the dashboard. Over 92% of doubts receive comprehensive step-by-step video explanations within 15 minutes.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-brand-navy-950 relative z-10" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue-500">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Frequently Asked Queries
          </h2>
          <p className="text-slate-400 text-sm font-light">
            Everything you need to know about the admission process, course delivery, and student support.
          </p>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-4">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-panel overflow-hidden transition-colors border border-white/5"
              >
                {/* Accordion Toggle handle */}
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left text-white hover:bg-white/5 transition-colors focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-brand-blue-500 flex-shrink-0" />
                    <span className="font-bold text-sm sm:text-base leading-tight">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-white" : ""
                    }`}
                  />
                </button>

                {/* Animated Drawer Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 text-slate-400 text-sm leading-relaxed border-t border-white/5 font-light">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
