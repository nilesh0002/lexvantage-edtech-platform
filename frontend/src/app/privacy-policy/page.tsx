"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />

      <main className="flex-grow pt-28 bg-brand-navy-955">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-350">
          
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-150 mb-6">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 font-mono">Last Updated: July 11, 2026</p>

          <div className="space-y-6 text-sm leading-relaxed font-light">
            <p>
              Shreya's Law Desk ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Shreya's Law Desk.
            </p>

            <h2 className="text-lg font-serif font-bold text-slate-150 pt-4">1. Information We Collect</h2>
            <p>
              We collect information that you identify or provide directly to us when creating a Student Account, registering for Mock Tests, completing Scholarship Claim forms, or subscribing to our email newsletters. This information may include:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Student and parent names, email addresses, and telephone numbers.</li>
              <li>Target entrance examinations (CLAT, AILET, MHCET, etc.).</li>
              <li>Academic percentages or mock scoring history used in scholarship calculations.</li>
              <li>Simulated transaction metrics necessary for processing admissions.</li>
            </ul>

            <h2 className="text-lg font-serif font-bold text-slate-150 pt-4">2. How We Use Your Information</h2>
            <p>
              We utilize collected information to administer your learning portal, deliver daily GK summaries, verify doubt logs, compile accuracy charts, and issue merit achievements certificates. We do not sell or trade user information with advertising third parties.
            </p>

            <h2 className="text-lg font-serif font-bold text-slate-150 pt-4">3. Security Standards</h2>
            <p>
              All traffic inside the Shreya's Law Desk portal operates under SSL encryption standards. Access to student answer sheets and academic analytics is restricted to Shreya Nadar.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
