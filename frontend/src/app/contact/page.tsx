"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Scale, Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-28 bg-brand-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue-500">
              Connect With Us
            </span>
            <h1 className="text-4xl font-serif font-bold text-white">
              Get in Touch with Admissions
            </h1>
            <p className="text-slate-400 text-sm font-light">
              Have questions regarding course schedules, fee installments, or scholarships? Our team is available 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl glass-panel border border-white/5 flex items-start gap-4">
                <Mail className="w-5 h-5 text-brand-blue-500 shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-serif font-bold text-base">Admissions Desk</h4>
                  <p className="text-slate-400 text-xs mt-1 font-light">
                    legalconcept.01@gmail.com
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl glass-panel border border-white/5 flex items-start gap-4">
                <Phone className="w-5 h-5 text-brand-purple-500 shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-serif font-bold text-base">Helpline Support</h4>
                  <p className="text-slate-400 text-xs mt-1 font-light">
                    +91 86920 86024
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl glass-panel border border-white/5 relative">
              
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-2xl bg-brand-navy-950 flex flex-col items-center justify-center text-center p-6 z-10"
                  >
                    <CheckCircle2 className="w-12 h-12 text-brand-gold-400 mb-3" />
                    <h4 className="text-lg font-serif font-bold text-white">Message Dispatched</h4>
                    <p className="text-slate-400 text-xs mt-1 max-w-sm">
                      Thank you for contacting us. An admissions counselor will reach out to you within 2 business hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-350">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-blue-500/50 transition-all"
                      placeholder="e.g. Aman"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-350">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-blue-500/50 transition-all"
                      placeholder="aman@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-350">Message / Query</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-blue-500/50 transition-all"
                    placeholder="Write details of your target NLU or queries here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-navy-950 font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    "Transmitting..."
                  ) : (
                    <>
                      Transmit Inquiry
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
