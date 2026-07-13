"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Scale } from "lucide-react";

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

const faqData: FaqItem[] = [
  {
    question: "Who is eligible to join Shreya's Law Desk coaching?",
    answer: (
      <div className="space-y-4">
        <div>
          <p className="font-semibold text-slate-200 mb-2">Our courses are designed for:</p>
          <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
            <li>LL.B. students (All Years/Semesters)</li>
            <li>CLAT UG & CLAT PG Aspirants</li>
            <li>MH CET Law Aspirants (3-Year & 5-Year)</li>
            <li>Judiciary Aspirants</li>
            <li>AIBE Aspirants</li>
            <li>LL.M. Entrance Aspirants</li>
            <li>Students preparing for university examinations</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-slate-200 mb-2">We provide comprehensive coverage of major law subjects, including:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-400 pl-1">
            <span>• Constitutional Law</span>
            <span>• Contract Law</span>
            <span>• Law of Torts</span>
            <span>• Criminal Law (BNS, BNSS & BSA)</span>
            <span>• Family Law</span>
            <span>• Company Law</span>
            <span>• Administrative Law</span>
            <span>• Jurisprudence</span>
            <span>• Public International Law</span>
            <span>• Environmental Law</span>
            <span>• Labour Law</span>
            <span>• Intellectual Property Rights (IPR)</span>
            <span>• Human Rights Law</span>
            <span>• Property Law</span>
            <span>• Evidence Law</span>
            <span>• CPC & CrPC/BNSS</span>
            <span>• Interpretation of Statutes</span>
            <span>• Arbitration</span>
            <span>• Cyber Law</span>
            <span>• Banking & Insurance Law</span>
            <span>• Taxation Law</span>
            <span>• Consumer Protection Law</span>
            <span>• Transfer of Property Act</span>
            <span>• Specific Relief Act</span>
            <span>• Negotiable Instruments Act</span>
            <span>• Limitation Act</span>
            <span>• Partnership Act</span>
            <span>• Sale of Goods Act</span>
            <span>• Competition Law</span>
            <span>• Insolvency & Bankruptcy Law</span>
            <span className="sm:col-span-2 italic font-medium mt-1 text-slate-350">And other university-prescribed subjects.</span>
          </div>
        </div>
      </div>
    ),
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
    answer: "Shreya's Law Desk provides dedicated doubt resolution directly by Adv. Shreya Nadar. Students can upload screenshots or type text queries directly inside the dashboard. Over 92% of doubts receive comprehensive step-by-step video explanations within 15 minutes.",
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
