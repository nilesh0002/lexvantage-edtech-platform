"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Scale, Send, Phone, Mail, MapPin, MessageSquare, Compass, Sparkles, CheckCircle2 } from "lucide-react";

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.54a29 29 0 0 0 .46 5.12 2.78 2.78 0 0 0 1.95 1.96C5.12 19.08 12 19.08 12 19.08s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.12 29 29 0 0 0-.46-5.12z" />
    <polygon points="9.75 15.02 15.5 11.54 9.75 8.06 9.75 15.02" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }, 1200);
  };

  return (
    <footer className="bg-brand-navy-950 border-t border-white/5 relative z-10 pt-16 pb-12 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-brand-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] bg-brand-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & WhatsApp Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-white/5 mb-12 items-center">
          <div className="lg:col-span-6 space-y-2">
            <h3 className="text-xl sm:text-2xl font-serif font-semibold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-gold-500" />
              Subscribe to the Law Desk Briefing
            </h3>
            <p className="text-slate-400 text-sm max-w-md">
              Receive weekly curated legal news, current affairs summaries, mock test strategy tips, and exclusive course discounts.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 max-w-md lg:ml-auto">
              <div className="relative flex-grow">
                <input
                  type="email"
                  placeholder="Enter your student email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-blue-500/50 focus:ring-1 focus:ring-brand-blue-500/50 transition-all placeholder:text-slate-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting || subscribed}
                className="px-5 py-3 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-navy-950 font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 whitespace-nowrap cursor-pointer"
              >
                {subscribed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-brand-gold-400" />
                    Subscribed!
                  </>
                ) : submitting ? (
                  "Subscribing..."
                ) : (
                  <>
                    Subscribe
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Logo & Contact details */}
          <div className="col-span-2 md:col-span-3 lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg border border-brand-gold-500/30 bg-brand-navy-900 flex items-center justify-center shadow-md">
                <Scale className="w-4 h-4 text-brand-gold-500" />
              </div>
              <span className="font-sans font-extrabold text-base sm:text-xl tracking-tight text-foreground">
                Shreya's <span className="text-brand-gold-500">Law Desk</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              India's premier law coaching academy for law school entrance examinations and 5-year LL.B semester companion. Empowering CLAT, AILET, and law students under the direct guidance of Adv. Shreya Nadar to graduate at the top of their class.
            </p>

            <div className="space-y-3">
              <a
                href="https://wa.me/918692086024?text=Hi%20Shreya's%20Law%20Desk!%20I%20want%20to%20know%20more%20about%20your%20law%20programs."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-lg"
              >
                <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Links Column 1: Courses */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Target Programs</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link href="/courses" className="hover:text-white transition-colors">CLAT & AILET Prep</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">SLAT & MH CET Law</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">5-Year LL.B Companion</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">Shreya's Law Desk Mock Series</Link></li>
            </ul>
          </div>

          {/* Links Column 2: Resources */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Free Resources</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link href="/current-affairs" className="hover:text-white transition-colors">Daily Current Affairs</Link></li>
              <li><Link href="/free-notes" className="hover:text-white transition-colors">LL.B Semester Notes</Link></li>
              <li><Link href="/mock-tests" className="hover:text-white transition-colors">Free Mock Tests</Link></li>
              <li><Link href="/scholarships" className="hover:text-white transition-colors">Scholarship Test</Link></li>
            </ul>
          </div>

          {/* Links Column 3: Contact & Info */}
          <div className="col-span-2 md:col-span-1 lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Contact Info</h4>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-blue-500 flex-shrink-0" />
                <a href="mailto:legalconcept.01@gmail.com" className="hover:text-white transition-colors">legalconcept.01@gmail.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-blue-500 flex-shrink-0" />
                <a href="tel:+918692086024" className="hover:text-white transition-colors">+91 86920 86024</a>
              </li>
            </ul>
            
            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                <Compass className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Shreya's Law Desk. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Refund Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
