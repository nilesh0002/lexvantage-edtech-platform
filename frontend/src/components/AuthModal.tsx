"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Scale, Mail, Lock, User, Sparkles, CheckCircle, GraduationCap } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "login" | "signup";
  onLoginSuccess: (name: string) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  initialTab = "login",
  onLoginSuccess,
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(initialTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [targetExam, setTargetExam] = useState("CLAT");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (activeTab === "signup" && !name)) {
      setError("Please fill out all required fields.");
      return;
    }

    setLoading(true);

    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onLoginSuccess(activeTab === "signup" ? name : email.split("@")[0]);
        onClose();
        // Reset states
        setEmail("");
        setPassword("");
        setName("");
      }, 1000);
    }, 1500);
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
            className="fixed inset-0 bg-brand-navy-950/85 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl glass-panel border border-white/10 shadow-2xl p-6 sm:p-8 z-10 bg-brand-navy-900/90"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Success Overlay */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-brand-navy-950 flex flex-col items-center justify-center text-center p-6 z-20"
                >
                  <motion.div
                    initial={{ scale: 0.5, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-16 h-16 bg-gradient-to-tr from-brand-blue-500 to-brand-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-brand-blue-500/20"
                  >
                    <CheckCircle className="w-10 h-10 text-brand-gold-400" />
                  </motion.div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">
                    Welcome to Shreya's Law Desk
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Redirecting you to the Elite Student Portal...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex flex-col items-center mb-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-blue-500 to-amber-500 p-0.5 flex items-center justify-center shadow-lg shadow-brand-blue-500/10 mb-3">
                <div className="w-full h-full rounded-[14px] bg-brand-navy-950 flex items-center justify-center">
                  <Scale className="w-6 h-6 text-brand-gold-500" />
                </div>
              </div>
              <h2 className="text-2xl font-serif font-extrabold text-white tracking-tight">
                {activeTab === "login" ? "Sign In to Portal" : "Join the NLU Pathway"}
              </h2>
              <p className="text-slate-400 text-xs mt-1">
                Access mocks, performance analytics, and your legal database.
              </p>
            </div>

            {/* Tab Switched */}
            <div className="flex rounded-xl bg-white/5 p-1 border border-white/5 mb-6">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("login");
                  setError("");
                }}
                className={`w-1/2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === "login"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("signup");
                  setError("");
                }}
                className={`w-1/2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === "signup"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-450 text-xs font-medium">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === "signup" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-350 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-brand-blue-500" /> Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-blue-500/50 focus:ring-1 focus:ring-brand-blue-500/50 transition-all placeholder:text-slate-500"
                    required
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-355 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-brand-blue-500" /> Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@student.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-blue-500/50 focus:ring-1 focus:ring-brand-blue-500/50 transition-all placeholder:text-slate-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-360 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-brand-blue-500" /> Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-blue-500/50 focus:ring-1 focus:ring-brand-blue-500/50 transition-all placeholder:text-slate-500"
                  required
                />
              </div>

              {activeTab === "signup" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-360 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-brand-blue-500" /> Target Exam
                  </label>
                  <select
                    value={targetExam}
                    onChange={(e) => setTargetExam(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-brand-navy-950 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-blue-500/50 transition-all"
                  >
                    <option value="CLAT">CLAT (Common Law Admission Test)</option>
                    <option value="AILET">AILET (All India Law Entrance Test)</option>
                    <option value="SLAT">SLAT (Symbiosis Law Admission Test)</option>
                    <option value="MHCET">MH CET Law (Maharashtra)</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 relative group overflow-hidden py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  "Verifying identity..."
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-brand-gold-400" />
                    {activeTab === "login" ? "Unlock Access" : "Get NLU Credentials"}
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 text-center">
              <p className="text-xs text-slate-500">
                By accessing Shreya's Law Desk you agree to our{" "}
                <a href="#" className="text-slate-400 hover:underline">
                  Honor Code
                </a>{" "}
                and{" "}
                <a href="#" className="text-slate-400 hover:underline">
                  Code of Conduct
                </a>
                .
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
