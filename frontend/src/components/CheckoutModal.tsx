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
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Checkout Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl glass-panel border border-border shadow-2xl p-6 sm:p-8 z-10 bg-muted/95"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
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
                  className="absolute inset-0 bg-background flex flex-col items-center justify-center text-center p-6 z-20"
                >
                  <motion.div
                    initial={{ scale: 0.5, y: -20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 bg-gradient-to-tr from-brand-blue-500 via-brand-purple-600 to-brand-gold-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-brand-blue-500/20"
                  >
                    <CheckCircle2 className="w-12 h-12 text-primary" />
                  </motion.div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-2">
                    Enrollment Request Sent!
                  </h3>
                  <p className="text-primary font-bold mb-4 flex items-center gap-1.5 text-sm">
                    <Sparkles className="w-4 h-4" /> Request for {course.name}
                  </p>
                  <p className="text-slate-405 text-sm max-w-sm">
                    Thank you! Your enrollment request has been registered. Shreya Nadar will contact you directly to confirm your schedule and batch details.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Admissions Desk
              </span>
              <h2 className="text-2xl font-serif font-bold text-foreground tracking-tight mt-1">
                Complete Enrollment Request
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
              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary text-primary-foreground/10 text-primary border border-brand-gold-500/20 uppercase">
                  {course.exam}
                </span>
                <h4 className="text-foreground font-bold mt-1.5">{course.name}</h4>
                <p className="text-slate-405 text-xs mt-0.5">{course.duration}</p>
              </div>

              {/* Student Information Fields */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-1">
                  Student Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-brand-blue-500" /> Student Name
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Enter student name..."
                      className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground text-sm focus:outline-none focus:border-brand-blue-500/50 transition-all placeholder:text-slate-600"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-brand-blue-500" /> Parent Mobile
                    </label>
                    <input
                      type="tel"
                      required
                      value={parentMobile}
                      onChange={(e) => setParentMobile(e.target.value)}
                      placeholder="e.g. +91 9876543210"
                      className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground text-sm focus:outline-none focus:border-brand-blue-500/50 transition-all placeholder:text-slate-600"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-blue-500" /> Residence City
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city..."
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground text-sm focus:outline-none focus:border-brand-blue-500/50 transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Payment Methods Simulation */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-1">
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
                          ? "bg-brand-blue-500/10 border-brand-blue-500/60 text-foreground shadow-md shadow-brand-blue-500/10"
                          : "bg-muted/50 border-border text-muted-foreground hover:text-foreground"
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
                  className="w-full relative group overflow-hidden py-4 rounded-xl text-base font-extrabold text-foreground bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Registering Enrollment Request...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Submit Admission Request
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mt-4 text-center">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>SSL Encrypted Connection • Priority Admissions Contact</span>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
