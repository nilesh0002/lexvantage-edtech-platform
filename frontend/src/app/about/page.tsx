"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import { Scale, Landmark, ShieldCheck, Award, Users, BookOpen } from "lucide-react";

export default function About() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />

      <main className="flex-grow pt-28 bg-brand-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue-500">
              Our Identity
            </span>
            <h1 className="text-4xl font-serif font-bold text-slate-150">
              Pioneering Elite Law Education in India
            </h1>
            <p className="text-slate-335 text-sm font-light leading-relaxed">
              Shreya's Law Desk was born from a singular vision: to break the standard, rote-learning coaching model and build a tech-enabled, highly analytical learning academy for prospective law scholars.
            </p>
          </div>

          {/* Core Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/5 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-blue-500/10 border border-brand-blue-500/25 flex items-center justify-center text-brand-blue-500">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-slate-150 font-serif font-bold text-lg">Rigorous Legal Logic</h3>
              <p className="text-slate-335 text-xs font-light leading-relaxed">
                We believe law entrance exams test analytical comprehension, not memory capacity. Our pedagogy is structured entirely around decoding core legal principles.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/5 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-purple-500/10 border border-brand-purple-500/25 flex items-center justify-center text-brand-purple-500">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-slate-150 font-serif font-bold text-lg">Individual Attention</h3>
              <p className="text-slate-335 text-xs font-light leading-relaxed">
                By restricting batch sizes strictly to 40, we verify that every essay draft is reviewed, and mock scores are discussed one-on-one.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/5 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-gold-500/10 border border-brand-gold-500/25 flex items-center justify-center text-brand-gold-500">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-slate-150 font-serif font-bold text-lg">Predictive Technology</h3>
              <p className="text-slate-335 text-xs font-light leading-relaxed">
                Our mock simulators leverage diagnostic graphs to pinpoint accuracy ratios, removing guessing games from exam preparations.
              </p>
            </div>
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-150 leading-tight">
                About the Founder
              </h2>
              <p className="text-slate-250 text-xs sm:text-sm font-light leading-relaxed">
                Hello! I'm Shreya Nadar, the founder of Shreya's Law Desk. I am a B.L.S. LL.B. graduate with a passion for making legal education simple, practical, and accessible. During my academic journey, I realized that many law students struggle with lengthy provisions and complex legal concepts. That's why I created Shreya's Law Desk—to help students understand the law through clear explanations, structured notes, and exam-oriented guidance.
              </p>
              <p className="text-slate-250 text-xs sm:text-sm font-light leading-relaxed">
                Whether you're preparing for LL.B. exams, CLAT UG/PG, LL.M. entrances, AIBE, Judiciary, or other competitive law examinations, my goal is to help you build a strong conceptual foundation and study with confidence.
              </p>
              <p className="text-slate-250 text-xs sm:text-sm font-light leading-relaxed">
                At Shreya's Law Desk, you'll find quality learning, regular practice, and a supportive environment designed to help every aspiring legal professional succeed.
              </p>
            </div>

            <div className="lg:col-span-6 p-8 rounded-2xl glass-panel border border-white/5 bg-gradient-to-tr from-brand-blue-950/20 to-brand-navy-900/60 relative">
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-brand-gold-500/5 rounded-full blur-xl pointer-events-none" />
              
              <div className="space-y-4">
                <div className="text-4xl sm:text-5xl font-serif font-extrabold text-brand-gold-500">100%</div>
                <h4 className="text-slate-150 font-bold text-sm">Commitment to Student Integrity</h4>
                <p className="text-slate-250 text-xs font-light leading-relaxed">
                  Shreya Nadar is committed to our Student Honor Pledge, committing to absolute clarity, zero cost barriers, and dedicated support for every single cohort.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLoginSuccess={() => {}} />
    </>
  );
}
