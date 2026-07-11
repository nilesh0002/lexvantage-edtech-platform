"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, Sparkles, Trophy, Calendar, CheckCircle2, ChevronRight, Filter } from "lucide-react";
import CheckoutModal from "../CheckoutModal";
import { Course, coursesData } from "@/data/courses";

interface CoursesProps {
  wishlist: string[];
  onToggleWishlist: (course: Course) => void;
  onEnroll: (course: Course) => void;
}

export default function Courses({
  wishlist,
  onToggleWishlist,
  onEnroll,
}: CoursesProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [checkoutCourse, setCheckoutCourse] = useState<Course | null>(null);

  const filters = [
    { id: "ALL", label: "All Programs" },
    { id: "CLAT & AILET", label: "CLAT / AILET" },
    { id: "Crash Course", label: "Crash Course" },
    { id: "Test Series", label: "Test Series" },
    { id: "SLAT / MHCET", label: "SLAT / MH CET" },
  ];

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.syllabus.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter = selectedFilter === "ALL" || course.exam === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <section className="py-24 bg-brand-navy-950 relative z-10" id="courses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue-500">
              Elite Curriculums
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Invest in Your NLU Future
            </h2>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              Explore our range of comprehensive classes and test series meticulously architected to help you conquer law school entrance examinations.
            </p>
          </div>
          
          {/* Live Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-450 text-xs font-bold self-start md:self-auto">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Admissions Live for 2026-27</span>
          </div>
        </div>

        {/* Search and Filters Panel */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
          {/* Filters List */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`min-h-[44px] px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                  selectedFilter === f.id
                    ? "bg-brand-gold-500 text-brand-navy-950 border-brand-gold-500"
                    : "text-slate-350 hover:text-white hover:bg-white/5 border-white/5"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search syllabus or course name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-blue-500/50 transition-all placeholder:text-slate-650"
            />
          </div>
        </div>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => {
              const isWishlisted = wishlist.includes(course.id);
              return (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-between relative group hover:border-white/15 transition-all shadow-xl hover:shadow-brand-blue-500/5"
                >
                  <div>
                    {/* Header: Exam & Wishlist */}
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-brand-blue-500/10 text-brand-blue-500 border border-brand-blue-500/20 uppercase tracking-wide">
                        {course.exam}
                      </span>
                      <button
                        onClick={() => onToggleWishlist(course)}
                        className={`p-2 rounded-xl border transition-all ${
                          isWishlisted
                            ? "bg-rose-500/10 border-rose-500/20 text-rose-500"
                            : "bg-white/5 border-white/5 text-slate-400 hover:text-rose-500 hover:bg-white/10"
                        }`}
                        title="Add to Wishlist"
                      >
                        <Heart className={`w-4.5 h-4.5 ${isWishlisted ? "fill-current" : ""}`} />
                      </button>
                    </div>

                    {/* Course Title */}
                    <h3 className="text-lg font-bold text-white group-hover:text-brand-blue-500 transition-colors leading-tight mb-2">
                      {course.name}
                    </h3>
                    <p className="text-xs text-slate-400 mb-6 font-medium">{course.duration}</p>

                    {/* Syllabus Features list */}
                    <ul className="space-y-2.5 border-t border-white/5 pt-5 mb-8">
                      {course.syllabus.map((syl, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-brand-gold-500 flex-shrink-0 mt-0.5" />
                          <span>{syl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing and Button */}
                  <div className="border-t border-white/5 pt-5 flex items-center justify-between">
                    <div>
                      <div className="text-white font-extrabold text-2xl tracking-tight">
                        {course.price}
                      </div>
                      <div className="text-slate-500 line-through text-xs mt-0.5">
                        {course.originalPrice}
                      </div>
                    </div>

                    <button
                      onClick={() => setCheckoutCourse(course)}
                      className="min-h-[48px] px-5 py-3 rounded-lg bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-navy-950 font-bold text-xs tracking-wide transition-all flex items-center gap-1 cursor-pointer"
                    >
                      Enroll Now
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <div className="col-span-full py-16 text-center">
              <p className="text-slate-500 text-sm">No courses matching your search query. Please try another keyword.</p>
            </div>
          )}
        </div>

        {/* Global Checkout Modal instance */}
        <CheckoutModal
          isOpen={checkoutCourse !== null}
          onClose={() => setCheckoutCourse(null)}
          course={checkoutCourse}
          onPaymentSuccess={(id) => {
            const matched = coursesData.find((c) => c.id === id);
            if (matched) onEnroll(matched);
          }}
        />
      </div>
    </section>
  );
}
