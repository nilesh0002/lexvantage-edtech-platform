"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Results from "@/components/home/Results";
import AuthModal from "@/components/AuthModal";

export default function ResultsPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />
      <main className="flex-grow pt-20 bg-brand-navy-950">
        <Results />
      </main>
      <Footer />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLoginSuccess={() => {}} />
    </>
  );
}
