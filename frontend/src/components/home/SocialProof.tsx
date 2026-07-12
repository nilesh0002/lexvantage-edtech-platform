"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  nlu: string;
  rank?: string;
  quote: string;
  avatar: string;
  type: "student" | "parent";
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Aditya Vardhan",
    role: "Shreya's Law Desk 2-Year Program Student",
    nlu: "NLSIU Bangalore",
    rank: "AIR 12 (CLAT 2025)",
    quote: "The mock analytics dashboard was my unfair advantage. Instead of blindly taking mocks, I was able to track section-by-section speeds. The legal reasoning drills helped me shave off 10 minutes off my reading times.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aditya",
    type: "student",
  },
  {
    id: 2,
    name: "Kritika Sen",
    role: "Shreya's Law Desk Elite Dropper Program",
    nlu: "NLU Delhi",
    rank: "AIR 18 (AILET 2025)",
    quote: "Weekly 1-on-1 strategy sessions with Shreya ma'am kept me sane. When my mock scores plateaued in October, she helped me restructure my analytical reasoning approach. The mentorship is unmatched.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kritika",
    type: "student",
  },
  {
    id: 3,
    name: "Dr. Sandeep Deshmukh",
    role: "Parent of Rohan Deshmukh (AIR 54, CLAT 2025)",
    nlu: "NALSAR Hyderabad",
    quote: "What sets Shreya's Law Desk apart is her absolute transparency. I received weekly logs detailing Rohan's mock performances and batch attendance. The small batch size meant Shreya ma'am truly knew Rohan's weaknesses.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sandeep",
    type: "parent",
  },
  {
    id: 4,
    name: "Shreya Ghoshal",
    role: "Shreya's Law Desk 1-Year Classroom Student",
    nlu: "WBNUJS Kolkata",
    rank: "AIR 41 (CLAT 2025)",
    quote: "The daily Current Affairs summarizer feed was a lifesaver. Instead of spending hours summarizing massive newspapers, I read Shreya's Law Desk's high-yield bulletins and took her 10-minute daily GK tests.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=shreya",
    type: "student",
  },
  {
    id: 5,
    name: "Anoop Bhatia",
    role: "Parent of Diya Bhatia (AIR 82, CLAT 2025)",
    nlu: "NLIU Bhopal",
    quote: "We were skeptical about online coaching, but the interactive doubt-solving portal was stellar. Diya could upload photo doubts at 11 PM and get high-quality explanation videos from Shreya ma'am within 15 minutes. Splendid system.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anoop",
    type: "parent",
  },
];

export default function SocialProof() {
  const [filterType, setFilterType] = useState<"all" | "student" | "parent">("all");
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredList = testimonialsData.filter(
    (t) => filterType === "all" || t.type === filterType
  );

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? filteredList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === filteredList.length - 1 ? 0 : prev + 1));
  };

  const activeTestimonial = filteredList[activeIndex] || filteredList[0];

  return (
    <section className="py-24 bg-brand-navy-950 relative z-10 overflow-hidden">
      {/* Glows */}
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-brand-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[400px] h-[400px] bg-brand-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue-500">
            Validated by Results
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            What Our Students & Parents Say
          </h2>
          <p className="text-slate-400 text-sm font-light">
            Read direct feedback from India's elite law aspirants and parents who partnered with us.
          </p>

          {/* Testimonial Category Switches */}
          <div className="inline-flex rounded-xl bg-white/5 p-1 border border-white/5 mt-4">
            {[
              { id: "all", label: "Show All" },
              { id: "student", label: "Students" },
              { id: "parent", label: "Parents" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setFilterType(tab.id as any);
                  setActiveIndex(0);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  filterType === tab.id
                    ? "bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTestimonial && (
              <motion.div
                key={activeTestimonial.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl glass-panel p-8 sm:p-12 relative flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12"
              >
                {/* Quote decoration */}
                <Quote className="absolute right-6 bottom-6 w-20 h-20 text-white/5 pointer-events-none" />

                {/* Left Side: Avatar and stats */}
                <div className="flex flex-col items-center text-center md:text-left md:items-start flex-shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-0.5 bg-gradient-to-tr from-brand-blue-500 via-brand-purple-600 to-brand-gold-500 mb-4 shadow-lg shadow-brand-blue-500/10">
                    <div className="w-full h-full rounded-[14px] bg-brand-navy-950 overflow-hidden">
                      <img
                        src={activeTestimonial.avatar}
                        alt={activeTestimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {activeTestimonial.rank && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold-500/10 border border-brand-gold-500/20 text-brand-gold-500 text-[10px] font-bold uppercase tracking-wider mb-2">
                      <GraduationCap className="w-3.5 h-3.5" />
                      {activeTestimonial.rank}
                    </div>
                  )}

                  <span className="text-slate-400 font-serif font-extrabold text-sm tracking-wide">
                    {activeTestimonial.nlu}
                  </span>
                </div>

                {/* Right Side: Quote Text */}
                <div className="flex-1 space-y-4">
                  {/* Star rating */}
                  <div className="flex items-center text-brand-gold-500 justify-center md:justify-start">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-light font-serif italic text-center md:text-left">
                    "{activeTestimonial.quote}"
                  </p>

                  <div className="text-center md:text-left pt-2">
                    <h4 className="text-white font-extrabold text-base leading-none">
                      {activeTestimonial.name}
                    </h4>
                    <p className="text-slate-500 text-xs mt-1.5">
                      {activeTestimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Handles */}
          {filteredList.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs text-slate-500 font-semibold font-mono">
                {activeIndex + 1} / {filteredList.length}
              </span>
              <button
                onClick={handleNext}
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
