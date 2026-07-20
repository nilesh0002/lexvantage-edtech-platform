"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Play, CheckCircle2, XCircle, ArrowRight, ShieldQuestion, HelpCircle } from "lucide-react";

interface MockTestPreviewProps {
  onStartFullMock: () => void;
}

export default function MockTestPreview({ onStartFullMock }: MockTestPreviewProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [passageExpanded, setPassageExpanded] = useState(false);

  const questionData = {
    passage: "Article 21 of the Indian Constitution declares that 'No person shall be deprived of his life or personal liberty except according to procedure established by law.' In the landmark Maneka Gandhi v. Union of India (1978) case, the Supreme Court expanded this scope, ruling that the 'procedure' established by law must not be arbitrary, oppressive, or fanciful; it must satisfy the requirements of being 'right, just, and fair'. Thus, procedural due process became an implicit part of Article 21.",
    question: "A state assembly enacts the 'Night Safety Act', authorizing the local police to detain any citizen found outside after 11:00 PM without an inquiry or warrant, citing urban security. Applying the principle established in Maneka Gandhi, which of the following is correct?",
    options: [
      { id: "A", text: "The Act is constitutionally valid because the state legislature followed the proper procedure for enacting statutes." },
      { id: "B", text: "The Act is constitutionally invalid because the power of warrant-less detention without inquiry is inherently arbitrary, failing the 'just and fair' requirement." },
      { id: "C", text: "The Act is valid as long as it applies uniformly to all citizens regardless of age, satisfying Article 14 equality rules." },
      { id: "D", text: "The Act is invalid because Article 21 strictly prohibits detaining anyone at night under any legislative enactment." },
    ],
    correctAnswer: "B",
    explanation: "Under the Maneka Gandhi doctrine, a procedure depriving personal liberty must be 'right, just, and fair'. Detaining citizens without cause, warrant, or basic preliminary inquiry is arbitrary, fanciful, and oppressive, directly violating the procedural protections implicit in Article 21.",
  };

  const handleOptionClick = (optionId: string) => {
    if (submitted) return;
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setSubmitted(false);
  };

  return (
    <section className="py-24 bg-brand-navy-950 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-500">
            Interactive Simulator
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-150">
            Experience the CLAT Mock Portal
          </h2>
          <p className="text-slate-335 text-sm font-light">
            Test your legal reasoning live. Attempt this actual CLAT-level sample passage below.
          </p>
        </div>

        {/* Interactive Mockup Widget */}
        <div className="rounded-2xl border border-white/10 bg-brand-navy-950 shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Mock Top bar */}
          <div className="px-6 py-4 bg-brand-navy-900 border-b border-white/5 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Scale className="w-5 h-5 text-brand-gold-500" />
              <span className="text-xs font-bold text-white font-serif uppercase tracking-wider">
                Legal Reasoning • Section A
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="px-3 py-1 rounded bg-white/10 text-[10px] font-bold text-slate-300">
                Correct: +1.00
              </div>
              <div className="px-3 py-1 rounded bg-white/10 text-[10px] font-bold text-slate-300">
                Incorrect: -0.25
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
            {/* Left Side: Passage (Collapsible on Mobile) */}
            <div className="relative border-b lg:border-b-0 lg:border-r border-white/5">
              <div className={`p-6 sm:p-8 space-y-4 overflow-y-auto transition-all duration-300 ${
                passageExpanded ? "max-h-none lg:max-h-[380px]" : "max-h-[160px] lg:max-h-[380px]"
              }`}>
                <h3 className="text-xs font-bold uppercase text-slate-335 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-brand-gold-500" />
                  Read the Passage
                </h3>
                <p className="text-slate-250 text-sm leading-relaxed font-light">
                  {questionData.passage}
                </p>
              </div>
              
              {/* Mobile collapse gradient fade and button */}
              <div className={`lg:hidden absolute bottom-0 left-0 right-0 p-4 flex justify-center pointer-events-none ${
                passageExpanded 
                  ? "bg-transparent pointer-events-auto pb-4 relative mt-[-20px]" 
                  : "pt-10 bg-gradient-to-t from-brand-navy-900/90 to-transparent"
              }`}>
                <button
                  onClick={() => setPassageExpanded(!passageExpanded)}
                  className="pointer-events-auto px-4 py-1.5 rounded-full bg-brand-navy-950 text-slate-300 hover:text-white border border-white/10 hover:border-white/20 text-[10px] font-bold shadow-lg flex items-center gap-1 transition-all"
                >
                  {passageExpanded ? "Collapse Passage" : "Show Full Passage"}
                </button>
              </div>
            </div>

            {/* Right Side: Questions & Options */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-3">
                <span className="px-2 py-0.5 rounded bg-brand-blue-500/10 border border-brand-blue-500/20 text-brand-blue-500 text-[10px] font-bold uppercase tracking-wider font-mono">
                  Question 1
                </span>
                <h4 className="text-slate-150 text-sm font-bold leading-normal">
                  {questionData.question}
                </h4>
              </div>

              {/* Options list */}
              <div className="space-y-2.5">
                {questionData.options.map((opt) => {
                  const isSelected = selectedOption === opt.id;
                  const isCorrect = opt.id === questionData.correctAnswer;
                  
                  let optionClass = "border-white/5 bg-white/5 text-slate-250 hover:bg-white/10 hover:border-white/15";
                  if (isSelected && !submitted) {
                    optionClass = "border-brand-blue-500/50 bg-brand-blue-500/5 text-slate-150 shadow-lg shadow-brand-blue-500/5";
                  } else if (submitted) {
                    if (isCorrect) {
                      optionClass = "border-emerald-500/40 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400";
                    } else if (isSelected) {
                      optionClass = "border-rose-500/40 bg-rose-500/5 text-rose-600 dark:text-rose-450";
                    } else {
                      optionClass = "border-white/5 bg-white/5 text-slate-350 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleOptionClick(opt.id)}
                      disabled={submitted}
                      className={`w-full text-left p-4 rounded-xl border text-xs font-medium leading-relaxed transition-all flex items-start gap-3 focus:outline-none min-h-[48px] ${optionClass}`}
                    >
                      <span className={`w-5 h-5 rounded-lg border flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5 ${
                        isSelected && !submitted
                          ? "bg-brand-blue-500 border-brand-blue-500 text-white"
                          : submitted && isCorrect
                          ? "bg-emerald-500 border-emerald-500 text-brand-navy-950"
                          : submitted && isSelected
                          ? "bg-rose-500 border-rose-500 text-white"
                          : "border-white/10 bg-brand-navy-950 text-slate-335"
                      }`}>
                        {opt.id}
                      </span>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback and CTAs */}
              <div className="pt-2">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <button
                      onClick={handleSubmit}
                      disabled={!selectedOption}
                      className="w-full py-3.5 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-navy-950 font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                    >
                      Submit Response
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="space-y-4"
                    >
                      {/* Explanation box */}
                      <div className={`p-4 rounded-xl text-xs leading-relaxed border ${
                        selectedOption === questionData.correctAnswer
                          ? "bg-emerald-500/5 border-emerald-500/25 text-slate-250"
                          : "bg-rose-500/5 border-rose-500/20 text-slate-250"
                      }`}>
                        <div className="flex items-center gap-2 mb-2 font-bold">
                          {selectedOption === questionData.correctAnswer ? (
                            <>
                              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400" />
                              <span className="text-emerald-400 uppercase tracking-wider font-mono">Correct (+1.00 Marks)</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4.5 h-4.5 text-rose-450" />
                              <span className="text-rose-450 uppercase tracking-wider font-mono">Incorrect (-0.25 Marks)</span>
                            </>
                          )}
                        </div>
                        <p>{questionData.explanation}</p>
                      </div>

                      {/* CTAs */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={handleReset}
                          className="w-full sm:w-1/3 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-250 hover:text-slate-150 transition-all text-xs font-bold"
                        >
                          Retry Question
                        </button>
                        <button
                          onClick={onStartFullMock}
                          className="w-full sm:w-2/3 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/25 flex items-center justify-center gap-1.5"
                        >
                          <Play className="w-4 h-4 fill-white" />
                          Take Full 120-Q Mock Test
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
