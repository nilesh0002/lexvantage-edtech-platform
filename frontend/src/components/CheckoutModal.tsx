"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, ShieldCheck, CheckCircle2, User, Phone, MapPin, Loader2, Sparkles } from "lucide-react";

interface Course {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  duration: string;
  exam: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  onPaymentSuccess: (courseId: string) => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  course,
  onPaymentSuccess,
}: CheckoutModalProps) {
  const [studentName, setStudentName] = useState("");
  const [parentMobile, setParentMobile] = useState("");
  const [city, setCity] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!course) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!studentName || !parentMobile || !city) {
      setError("Please complete all student information details.");
      return;
    }

    setSubmitting(true);

    // Simulate payment gateway API delay
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onPaymentSuccess(course.id);
        onClose();
        // Reset inputs
        setStudentName("");
        setParentMobile("");
        setCity("");
      }, 2000);
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-navy-950/80 backdrop-blur-md"
          />

          {/* Checkout Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl glass-panel border border-white/10 shadow-2xl p-6 sm:p-8 z-10 bg-brand-navy-900/95"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Success Screen Overlay */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-brand-navy-950 flex flex-col items-center justify-center text-center p-6 z-20"
                >
                  <motion.div
                    initial={{ scale: 0.5, y: -20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 bg-gradient-to-tr from-brand-blue-500 via-brand-purple-600 to-brand-gold-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-brand-blue-500/20"
                  >
                    <CheckCircle2 className="w-12 h-12 text-brand-gold-400" />
                  </motion.div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                    Payment Successful!
                  </h3>
                  <p className="text-brand-gold-500 font-bold mb-4 flex items-center gap-1.5 text-sm">
                    <Sparkles className="w-4 h-4" /> Enrolled in {course.name}
                  </p>
                  <p className="text-slate-400 text-sm max-w-sm">
                    Welcome to JurisPath! We've sent credentials and batch allocations to your registered phone number. Dashboard access is now unlocked.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-blue-500">
                Secure Checkout
              </span>
              <h2 className="text-2xl font-serif font-bold text-white tracking-tight mt-1">
                Complete Enrollment
              </h2>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-450 text-xs font-medium">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selected Course Summary */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-blue-500/10 text-brand-blue-500 border border-brand-blue-500/20 uppercase">
                    {course.exam}
                  </span>
                  <h4 className="text-white font-bold mt-1.5">{course.name}</h4>
                  <p className="text-slate-400 text-xs mt-0.5">{course.duration}</p>
                </div>
                <div className="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 border-white/5 pt-2 sm:pt-0">
                  <span className="text-white font-extrabold text-xl">{course.price}</span>
                  <span className="text-slate-500 line-through text-xs ml-2 sm:ml-0">{course.originalPrice}</span>
                </div>
              </div>

              {/* Student Information Fields */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-white/5 pb-1">
                  Student Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-350 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-brand-blue-500" /> Student Name
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Enter student name..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-blue-500/50 transition-all placeholder:text-slate-600"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-350 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-brand-blue-500" /> Parent Mobile
                    </label>
                    <input
                      type="tel"
                      required
                      value={parentMobile}
                      onChange={(e) => setParentMobile(e.target.value)}
                      placeholder="e.g. +91 9876543210"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-blue-500/50 transition-all placeholder:text-slate-600"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-350 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-blue-500" /> Residence City
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-blue-500/50 transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Payment Methods Simulation */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-white/5 pb-1">
                  Simulated Payment Method
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "upi", label: "UPI/GPay" },
                    { id: "card", label: "Debit/Credit Card" },
                    { id: "netbanking", label: "NetBanking" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`py-3 px-2 rounded-xl text-xs font-semibold text-center border transition-all ${
                        paymentMethod === m.id
                          ? "bg-brand-blue-500/10 border-brand-blue-500/60 text-white shadow-md shadow-brand-blue-500/10"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Security and CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full relative group overflow-hidden py-4 rounded-xl text-base font-extrabold text-white bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 hover:shadow-xl hover:shadow-brand-blue-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Contacting Gateway & Verifying OTP...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Pay {course.price} & Secure NLU Seat
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 mt-4 text-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>SSL Encrypted Payments • Refundable Mock Fees</span>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
