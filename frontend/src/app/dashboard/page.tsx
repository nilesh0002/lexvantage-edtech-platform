"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scale, BookOpen, Trophy, FileText, LayoutDashboard, BrainCircuit, Play, Award, HelpCircle,
  TrendingUp, Sparkles, User, LogOut, ChevronRight, CheckCircle2, XCircle, AlertCircle, Bookmark,
  Calendar, Clock, ShieldCheck, Compass, MessageSquare, Send, ChevronDown, Download, RefreshCw, Sun, Moon
} from "lucide-react";

import { Question, mockQuestions } from "@/data/mockQuestions";


export default function StudentDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "mock" | "chatbot" | "quiz" | "scholarship">("overview");
  
  // Theme state
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("lexvantage_theme") as "dark" | "light";
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "light") {
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.add("dark");
      }
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("lexvantage_theme", nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  // Auth state
  const [userName, setUserName] = useState("Aspirant");
  const [targetExam, setTargetExam] = useState("CLAT 2026");

  // Certificate State
  const [mockScoreCard, setMockScoreCard] = useState<{ completed: boolean; score: number } | null>(null);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isLiveClassOpen, setIsLiveClassOpen] = useState(false);
  const [liveChats, setLiveChats] = useState<any[]>([
    { name: "Rahul S.", msg: "Does Article 21 protect foreign nationals?" },
    { name: "Sneha G.", msg: "Yes, the word used is 'person' not 'citizen'." },
  ]);

  // Live Chat Stream Simulation
  useEffect(() => {
    if (!isLiveClassOpen) return;
    const interval = setInterval(() => {
      const names = ["Aman K.", "Diya B.", "Tanvi S.", "Kritika S.", "Rohan D."];
      const msgs = [
        "What about procedure established by law?",
        "Maneka Gandhi case changed everything",
        "Does that mean due process is now implicit?",
        "Yes, substantive due process is read into Article 21",
        "Excellent explanation sir!",
        "When is the next mock test analysis?",
        "Are these slides downloadable in the notes section?"
      ];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
      setLiveChats((prev) => [...prev, { name: randomName, msg: randomMsg }]);
    }, 4500);
    return () => clearInterval(interval);
  }, [isLiveClassOpen]);
  
  // NLU Predictor
  const [currentMockScore, setCurrentMockScore] = useState("85");
  const [quota, setQuota] = useState("General");
  const [predictions, setPredictions] = useState<any[] | null>(null);
  
  // Mock test states
  const [testStarted, setTestStarted] = useState(false);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [testFinished, setTestFinished] = useState(false);
  const [testResult, setTestResult] = useState<any | null>(null);
  
  // AI Tutor chatbot states
  const [messages, setMessages] = useState<any[]>([
    { sender: "bot", text: "Greetings, Counselor! I am your Vantage AI legal tutor. How can I help you master law entrance concepts today?" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Daily Quiz States
  const [quizScore, setQuizScore] = useState(0);
  const [quizActive, setQuizActive] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizTimer, setQuizTimer] = useState(15);
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const quizQuestions = [
    {
      q: "Under Indian Law, a minor's contract is considered:",
      opts: ["Void ab initio (void from beginning)", "Voidable", "Valid", "Enforceable at majority"],
      ans: "Void ab initio (void from beginning)",
      exp: "In Mohori Bibee v. Dharmodas Ghose (1903), the Privy Council established that a contract entered into by a minor is void ab initio."
    },
    {
      q: "Which Constitutional Article guarantees the Right to Constitutional Remedies?",
      opts: ["Article 19", "Article 21", "Article 32", "Article 226"],
      ans: "Article 32",
      exp: "Article 32 gives citizens the right to approach the Supreme Court directly for enforcement of Fundamental Rights. Dr. Ambedkar called it the heart and soul of the Constitution."
    },
    {
      q: "Bailment is defined as delivery of goods from one person to another for some purpose under a contract. Who is the person delivering the goods?",
      opts: ["Bailor", "Bailee", "Pawnor", "Agent"],
      ans: "Bailor",
      exp: "The person delivering the goods is called the Bailor. The person to whom they are delivered is the Bailee (Indian Contract Act Section 148)."
    }
  ];

  // Scholarship calculator states
  const [boardMarks, setBoardMarks] = useState(85);
  const [targetPercentile, setTargetPercentile] = useState(80);
  const [scholarshipResult, setScholarshipResult] = useState<any | null>(null);

  // Timer logic for Mock Portal
  useEffect(() => {
    if (!testStarted || testFinished) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [testStarted, testFinished]);

  // Quiz Timer
  useEffect(() => {
    if (!quizActive || quizFeedback) return;
    const interval = setInterval(() => {
      setQuizTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleQuizTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [quizActive, quizIndex, quizFeedback]);

  // Chat auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handlePredictNLU = () => {
    const scoreVal = parseFloat(currentMockScore);
    if (isNaN(scoreVal)) return;

    let baseline = scoreVal;
    if (quota === "SC/ST") baseline += 15;
    if (quota === "OBC/EWS") baseline += 6;

    const list = [
      { name: "NLSIU Bangalore", min: 100, chance: baseline >= 100 ? "95%" : baseline >= 95 ? "75%" : baseline >= 90 ? "40%" : "5%" },
      { name: "NALSAR Hyderabad", min: 95, chance: baseline >= 95 ? "95%" : baseline >= 90 ? "80%" : baseline >= 85 ? "45%" : "8%" },
      { name: "WBNUJS Kolkata", min: 92, chance: baseline >= 92 ? "95%" : baseline >= 87 ? "80%" : baseline >= 82 ? "50%" : "12%" },
      { name: "NLU Jodhpur", min: 89, chance: baseline >= 89 ? "95%" : baseline >= 84 ? "80%" : baseline >= 79 ? "55%" : "15%" },
      { name: "GNLU Gandhinagar", min: 86, chance: baseline >= 86 ? "95%" : baseline >= 81 ? "85%" : baseline >= 76 ? "60%" : "20%" },
    ];
    setPredictions(list);
  };

  const handleStartTest = () => {
    setSelectedAnswers({});
    setFlaggedQuestions([]);
    setTimeLeft(1200);
    setActiveQuestionIdx(0);
    setTestFinished(false);
    setTestResult(null);
    setTestStarted(true);
  };

  const handleFinishTest = () => {
    setTestStarted(false);
    setTestFinished(true);

    let correctCount = 0;
    let incorrectCount = 0;
    let unattempted = 0;

    mockQuestions.forEach((q) => {
      const ans = selectedAnswers[q.id];
      if (!ans) {
        unattempted++;
      } else if (ans === q.correct) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const score = correctCount * 1.0 - incorrectCount * 0.25;
    setTestResult({
      correct: correctCount,
      incorrect: incorrectCount,
      unattempted,
      score,
    });
    setMockScoreCard({ completed: true, score });
  };

  const handleOptionSelect = (qId: number, optId: string) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optId }));
  };

  const toggleFlag = (qId: number) => {
    setFlaggedQuestions(prev =>
      prev.includes(qId) ? prev.filter((id) => id !== qId) : [...prev, qId]
    );
  };

  // Chat logic
  const handleSendMessage = (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const query = customText || userInput;
    if (!query.trim()) return;

    const userMsg = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setTyping(true);

    // Simulated responses
    setTimeout(() => {
      let replyText = "Interesting query. Let me cross-reference the precedent law files for you...";
      const norm = query.toLowerCase();

      if (norm.includes("article 21") || norm.includes("maneka")) {
        replyText = "Article 21 provides that 'No person shall be deprived of his life or personal liberty except according to procedure established by law.' In Maneka Gandhi (1978), the Supreme Court held that the procedure must be 'right, just, and fair' and not arbitrary, oppressive or fanciful. This decision effectively introduced American 'due process of law' standards into Indian jurisprudence.";
      } else if (norm.includes("tort") || norm.includes("vicarious")) {
        replyText = "Vicarious Liability makes an employer liable for torts committed by employees in the 'course of employment'. For an employer to be held liable: 1. A master-servant relationship must exist, and 2. The tort must occur during authorized duties or a wrongful mode of performing authorized duties. detours for purely personal reasons are deemed 'frolics of their own', absolving the master.";
      } else if (norm.includes("basic structure")) {
        replyText = "The Basic Structure Doctrine was established in Kesavananda Bharati v. State of Kerala (1973). The Supreme Court ruled that while Parliament has wide power to amend the Constitution under Article 368, it cannot alter, destroy, or abrogate the basic structure or essential features of the Constitution (such as judicial review, secularism, federalism, and fundamental rights).";
      } else if (norm.includes("how to read") || norm.includes("strategy")) {
        replyText = "CLAT Legal passages are long. Strategy: 1. Read the legal principle carefully first (e.g. definition of theft). 2. Scan the fact scenario quickly to locate parties and conflict. 3. Match fact elements against principle criteria. Do not apply external moral logic—apply *only* the stated principle.";
      } else {
        replyText = `Understood. In law, defining boundaries is critical. Regarding your inquiry on '${query}', CLAT typically tests how accurately you apply defined legal guidelines to specific fact scenarios. Focus on matching each fact element to the corresponding rule without making outside assumptions.`;
      }

      setTyping(false);
      setMessages((prev) => [...prev, { sender: "bot", text: replyText }]);
    }, 1500);
  };

  // Daily Quiz logic
  const handleStartQuiz = () => {
    setQuizScore(0);
    setQuizIndex(0);
    setQuizTimer(15);
    setQuizSelected(null);
    setQuizFeedback(null);
    setQuizActive(true);
  };

  const handleQuizOption = (opt: string) => {
    if (quizFeedback) return;
    setQuizSelected(opt);
    const correct = quizQuestions[quizIndex].ans;
    
    if (opt === correct) {
      setQuizScore((prev) => prev + 10);
      setQuizFeedback(`Correct! +10 Points. ${quizQuestions[quizIndex].exp}`);
    } else {
      setQuizFeedback(`Incorrect. Correct Answer: ${correct}. ${quizQuestions[quizIndex].exp}`);
    }
  };

  const handleQuizTimeout = () => {
    setQuizFeedback(`Time out! Correct Answer: ${quizQuestions[quizIndex].ans}. ${quizQuestions[quizIndex].exp}`);
  };

  const handleNextQuizQ = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setQuizTimer(15);
      setQuizSelected(null);
      setQuizFeedback(null);
    } else {
      setQuizActive(false);
    }
  };

  // Scholarship
  const handleCalculateScholarship = () => {
    let waiver = 0;
    if (boardMarks >= 95) waiver += 40;
    else if (boardMarks >= 90) waiver += 25;
    else if (boardMarks >= 80) waiver += 10;

    if (targetPercentile >= 98) waiver += 50;
    else if (targetPercentile >= 95) waiver += 35;
    else if (targetPercentile >= 90) waiver += 20;

    // Cap waiver at 100%
    const finalWaiver = Math.min(waiver, 100);
    const regularCost = 64999;
    const finalCost = regularCost - (regularCost * finalWaiver) / 100;

    setScholarshipResult({
      waiver: finalWaiver,
      discount: regularCost - finalCost,
      finalCost,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-brand-navy-950 flex flex-col lg:flex-row">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full lg:w-64 bg-brand-navy-900 border-r border-white/5 flex flex-col justify-between shrink-0 p-4 lg:py-6">
        <div className="space-y-8">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 px-2">
            <div className="w-8 h-8 rounded-lg border border-brand-gold-500/30 bg-brand-navy-950 flex items-center justify-center">
              <Scale className="w-4 h-4 text-brand-gold-500" />
            </div>
            <span className="font-sans font-black text-lg tracking-tight text-white">
              Lex<span className="text-brand-gold-500">Vantage</span>
            </span>
          </Link>

          {/* User badge */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-blue-500/10 border border-brand-blue-500/20 flex items-center justify-center text-brand-blue-500">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-bold">Logged In</span>
              <h4 className="text-white text-xs font-bold truncate max-w-[120px]">{userName}</h4>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {[
              { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
              { id: "mock", label: "Mock Test Portal", icon: Play },
              { id: "chatbot", label: "AI Law Tutor", icon: BrainCircuit },
              { id: "quiz", label: "Daily Quiz Arena", icon: HelpCircle },
              { id: "scholarship", label: "Scholarship Hub", icon: Award },
            ].map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id as any)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === link.id
                      ? "bg-brand-blue-500/10 border-l-2 border-brand-blue-500 text-white"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${activeTab === link.id ? "text-brand-blue-500" : "text-slate-500"}`} />
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom actions */}
        <div className="pt-4 border-t border-white/5 mt-6 lg:mt-0 space-y-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold text-slate-350 hover:text-white hover:bg-white/5 transition-all cursor-pointer border border-white/10"
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-4.5 h-4.5 text-brand-gold-500" />
                <span>Switch to Light Theme</span>
              </>
            ) : (
              <>
                <Moon className="w-4.5 h-4.5 text-brand-gold-500" />
                <span>Switch to Dark Theme</span>
              </>
            )}
          </button>
          
          <Link
            href="/"
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-450 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Compass className="w-4 h-4 text-slate-550" />
            Return to Homepage
          </Link>
        </div>
      </aside>

      {/* MAIN WORKSPACE PANEL */}
      <main className="flex-1 min-w-0 bg-brand-navy-950 flex flex-col">
        {/* Topbar */}
        <header className="px-6 py-4 bg-brand-navy-900 border-b border-white/5 flex items-center justify-between flex-wrap gap-4 relative z-20">
          <div>
            <h1 className="text-lg font-serif font-bold text-white">Elite Student Portal</h1>
            <p className="text-xs text-slate-400 font-light mt-0.5">Target: {targetExam} Cohort</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Live Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Simulated Sandbox active</span>
            </div>
          </div>
        </header>

        {/* Dynamic Panel content */}
        <div className="flex-grow p-6 overflow-y-auto relative">
          <AnimatePresence mode="wait">
            
            {/* OVERVIEW PANEL */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Stats grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-2">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Attendance Rate</span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-white">100.0%</span>
                      <span className="text-emerald-500 text-xs font-semibold flex items-center gap-0.5"><Clock className="w-3 h-3" /> Streak: 1 day</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[100%]" />
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-2">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Mocks Taken</span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-white">{mockScoreCard?.completed ? "1" : "0"} / 120</span>
                      <span className="text-brand-blue-500 text-xs font-semibold">
                        {mockScoreCard?.completed ? "Mocks Updated" : "Next scheduled: Sun"}
                      </span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-blue-500" style={{ width: mockScoreCard?.completed ? "1%" : "0%" }} />
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-2">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Performance Average</span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-white">
                        {mockScoreCard?.completed ? `${mockScoreCard.score.toFixed(1)} Marks` : "0.0 Marks"}
                      </span>
                      <span className="text-brand-purple-400 text-xs font-semibold">
                        {mockScoreCard?.completed ? "1 Test Completed" : "No mocks completed"}
                      </span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-purple-500" style={{ width: mockScoreCard?.completed ? `${(mockScoreCard.score / 5) * 100}%` : "0%" }} />
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-2">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">GK Quiz Points</span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-white">{quizScore} pts</span>
                      <span className="text-brand-gold-500 text-xs font-semibold">
                        {quizScore > 0 ? `Rank #${Math.max(100 - quizScore / 10, 1)} in cohort` : "No quizzes completed"}
                      </span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-gold-500" style={{ width: `${Math.min(quizScore, 100)}%` }} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Performance Radar Chart simulation */}
                  <div className="lg:col-span-6 p-6 rounded-2xl glass-panel border border-white/5 space-y-6">
                    <div>
                      <h3 className="text-white font-sans font-black text-sm">Subject Diagnostics</h3>
                      <p className="text-slate-400 text-[10px]">Real-time accuracy metrics based on simulated test submissions.</p>
                    </div>

                    {!mockScoreCard?.completed ? (
                      <div className="h-[220px] flex flex-col items-center justify-center text-center text-slate-500 font-sans text-xs space-y-2 border border-dashed border-white/5 rounded-xl">
                        <FileText className="w-8 h-8 text-slate-650" />
                        <p className="font-bold text-slate-450">Subject Diagnostics Pending</p>
                        <p className="max-w-xs font-light text-slate-500">
                          Complete your first CLAT/AILET simulation mock test in the portal to analyze your concept-level strengths.
                        </p>
                      </div>
                    ) : (
                      /* Custom bar chart representing subject details calculated dynamically */
                      <div className="space-y-4">
                        {[
                          {
                            subject: "Legal Aptitude",
                            accuracy: (() => {
                              let total = 0, correct = 0;
                              if (selectedAnswers[1]) { total++; if (selectedAnswers[1] === "C") correct++; }
                              if (selectedAnswers[2]) { total++; if (selectedAnswers[2] === "B") correct++; }
                              return total > 0 ? Math.round((correct / total) * 100) : 0;
                            })(),
                            speed: "Fast",
                            color: "bg-brand-blue-500",
                          },
                          {
                            subject: "Logical Reasoning",
                            accuracy: selectedAnswers[3] ? (selectedAnswers[3] === "B" ? 100 : 0) : 0,
                            speed: "Moderate",
                            color: "bg-brand-purple-500",
                          },
                          {
                            subject: "English Language",
                            accuracy: selectedAnswers[4] ? (selectedAnswers[4] === "C" ? 100 : 0) : 0,
                            speed: "Fast",
                            color: "bg-cyan-500",
                          },
                          {
                            subject: "General Knowledge",
                            accuracy: quizScore > 0 ? Math.min(Math.round((quizScore / 30) * 100), 100) : 0,
                            speed: "Ultra-Fast",
                            color: "bg-brand-gold-500",
                          },
                          {
                            subject: "Quantitative Techniques",
                            accuracy: selectedAnswers[5] ? (selectedAnswers[5] === "A" ? 100 : 0) : 0,
                            speed: "Slow",
                            color: "bg-rose-500",
                          },
                        ].map((item) => (
                          <div key={item.subject} className="space-y-1">
                            <div className="flex justify-between items-baseline text-xs">
                              <span className="text-slate-350 font-bold">{item.subject}</span>
                              <span className="text-slate-500 text-[10px] font-mono">Accuracy: {item.accuracy}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.accuracy}%` }}
                                transition={{ duration: 1 }}
                                className={`h-full rounded-full ${item.color}`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* NLU Predictor Widget */}
                  <div className="lg:col-span-6 p-6 rounded-2xl glass-panel border border-white/5 space-y-6 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-white font-serif font-bold text-sm">NLU Eligibility Predictor</h3>
                      <p className="text-slate-400 text-xs font-light">Enter your average mock scores to calculate NLU selection probabilities.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-slate-500">Average Score (0-120)</label>
                        <input
                          type="number"
                          value={currentMockScore}
                          onChange={(e) => setCurrentMockScore(e.target.value)}
                          className="w-full px-4 py-2 rounded-xl bg-brand-navy-950 border border-white/10 text-white text-xs"
                          placeholder="e.g. 85"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-slate-500">Seat Category</label>
                        <select
                          value={quota}
                          onChange={(e) => setQuota(e.target.value)}
                          className="w-full px-4 py-2 rounded-xl bg-brand-navy-950 border border-white/10 text-white text-xs focus:outline-none"
                        >
                          <option value="General">General (Unreserved)</option>
                          <option value="OBC/EWS">OBC / EWS Quota</option>
                          <option value="SC/ST">SC / ST Quota</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={handlePredictNLU}
                      className="min-h-[44px] w-full py-2.5 rounded-lg bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-navy-950 font-bold text-xs transition-all cursor-pointer"
                    >
                      Calculate NLU Probabilities
                    </button>

                    {/* Results list */}
                    {predictions && (
                      <div className="bg-brand-navy-950/60 rounded-xl p-4 border border-white/5 space-y-2 max-h-[160px] overflow-y-auto">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Admissibility Ratios</span>
                        {predictions.map((p) => (
                          <div key={p.name} className="flex justify-between items-center text-xs">
                            <span className="text-slate-300">{p.name}</span>
                            <span className={`font-bold font-mono ${
                              p.chance.includes("95") || p.chance.includes("80")
                                ? "text-emerald-450"
                                : p.chance.includes("50") || p.chance.includes("45")
                                ? "text-brand-gold-500"
                                : "text-rose-450"
                            }`}>{p.chance} Probability</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Live Cohort Class Schedule */}
                <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white font-serif font-bold text-sm">Today's Live Cohort Schedules</h3>
                      <p className="text-slate-400 text-[10px]">Interact with top law minds live inside our virtual court classroom.</p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-brand-gold-500 font-bold uppercase">
                      <Calendar className="w-3.5 h-3.5" /> Batch CLAT-2026
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest block bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded w-max">
                          Live Now
                        </span>
                        <h4 className="text-white text-xs font-bold">Constitutional Case Laws & Article 21</h4>
                        <p className="text-slate-400 text-[10px] font-light">With Adv. Vikramaditya Singh • Oxford Alumni</p>
                      </div>
                      <button
                        onClick={() => setIsLiveClassOpen(true)}
                        className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-brand-navy-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/10 flex items-center justify-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5" /> Join Live Classroom
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between gap-4 opacity-75">
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-brand-gold-500 uppercase tracking-widest block bg-brand-gold-500/10 border border-brand-gold-500/20 px-2 py-0.5 rounded w-max">
                          02:00 PM Today
                        </span>
                        <h4 className="text-white text-xs font-bold">Critical Reasoning: Fallacy & Syllogism</h4>
                        <p className="text-slate-400 text-[10px] font-light">With Prof. Meenakshi Iyer • Cognitive Expert</p>
                      </div>
                      <button
                        disabled
                        className="w-full py-2 rounded-lg bg-white/5 text-slate-500 font-bold text-xs cursor-not-allowed border border-white/5"
                      >
                        Starts in 4 Hours
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between gap-4 opacity-75">
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-brand-gold-500 uppercase tracking-widest block bg-brand-gold-500/10 border border-brand-gold-500/20 px-2 py-0.5 rounded w-max">
                          05:00 PM Today
                        </span>
                        <h4 className="text-white text-xs font-bold">GK Vantage Bulletin: Major Bilaterals</h4>
                        <p className="text-slate-400 text-[10px] font-light">With Priya Nair, IFS (Retd.) • Ex-Diplomat</p>
                      </div>
                      <button
                        disabled
                        className="w-full py-2 rounded-lg bg-white/5 text-slate-500 font-bold text-xs cursor-not-allowed border border-white/5"
                      >
                        Starts in 7 Hours
                      </button>
                    </div>
                  </div>
                </div>

                {/* Certificate Generator Section */}
                <div className="p-6 rounded-2xl glass-panel border border-white/5 bg-gradient-to-r from-brand-navy-900 via-brand-navy-900 to-brand-purple-950/20 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center md:text-left">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-gold-500/10 text-brand-gold-500 border border-brand-gold-500/20 uppercase tracking-wide">
                      Achievement unlocked
                    </span>
                    <h3 className="text-white font-serif font-bold text-base">Generate Scholarship & Mock Certificate</h3>
                    <p className="text-slate-400 text-xs font-light max-w-xl">
                      Complete at least one full Mock Test simulation to generate your official LexVantage Scholar merit credential.
                    </p>
                  </div>

                  {mockScoreCard?.completed ? (
                    <button
                      onClick={() => setIsCertificateOpen(true)}
                      className="px-5 py-3 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-navy-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-brand-gold-500/15"
                    >
                      <Download className="w-4.5 h-4.5" />
                      View & Print Certificate
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveTab("mock")}
                      className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all"
                    >
                      <AlertCircle className="w-4.5 h-4.5 text-slate-500" />
                      Locked: Complete 1 Mock Test
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* MOCK TEST PORTAL */}
            {activeTab === "mock" && (
              <motion.div
                key="mock"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {!testStarted && !testFinished && (
                  <div className="max-w-2xl mx-auto text-center p-8 rounded-2xl glass-panel border border-white/5 space-y-6 my-8">
                    <div className="w-16 h-16 rounded-full bg-brand-blue-500/10 border border-brand-blue-500/20 flex items-center justify-center mx-auto text-brand-blue-500">
                      <Play className="w-8 h-8 fill-current" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-serif font-bold text-white">CLAT National Diagnostic Mock 1</h3>
                      <p className="text-slate-400 text-sm max-w-md mx-auto">
                        This test features 5 high-yield law entrance questions crossing Legal Aptitude, English, and Logic. Negative marking applies.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 border-t border-b border-white/5 py-4 max-w-md mx-auto">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Duration</span>
                        <span className="text-white font-bold text-sm">20 Mins</span>
                      </div>
                      <div className="border-l border-white/5">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Questions</span>
                        <span className="text-white font-bold text-sm">5 Questions</span>
                      </div>
                      <div className="border-l border-white/5">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Max Marks</span>
                        <span className="text-white font-bold text-sm">5.00</span>
                      </div>
                    </div>

                    <button
                      onClick={handleStartTest}
                      className="min-h-[48px] px-8 py-3.5 rounded-lg bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-navy-955 font-bold text-sm tracking-wider transition-all cursor-pointer"
                    >
                      Start Test Simulation
                    </button>
                  </div>
                )}

                {testStarted && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left Column: Passage & Question */}
                    <div className="lg:col-span-8 space-y-4">
                      {/* Active Section header */}
                      <div className="p-4 rounded-xl bg-brand-navy-900 border border-white/5 flex items-center justify-between">
                        <span className="text-xs font-bold text-brand-gold-500 font-serif uppercase tracking-wider">
                          Active Section: {mockQuestions[activeQuestionIdx].section}
                        </span>

                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-brand-blue-500" />
                          <span className="text-xs font-bold font-mono text-white bg-white/5 px-2.5 py-1 rounded">
                            {formatTime(timeLeft)}
                          </span>
                        </div>
                      </div>

                      {/* Passage */}
                      <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-3 bg-brand-navy-900/60 max-h-[300px] overflow-y-auto">
                        <span className="text-[9px] uppercase font-bold text-slate-500 block">Passage Directive</span>
                        <p className="text-slate-300 text-sm leading-relaxed font-light">
                          {mockQuestions[activeQuestionIdx].passage}
                        </p>
                      </div>

                      {/* Question */}
                      <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-6">
                        <h4 className="text-white text-sm font-bold leading-normal">
                          Q{activeQuestionIdx + 1}. {mockQuestions[activeQuestionIdx].question}
                        </h4>

                        {/* Options */}
                        <div className="space-y-2.5">
                          {mockQuestions[activeQuestionIdx].options.map((opt) => {
                            const isSelected = selectedAnswers[mockQuestions[activeQuestionIdx].id] === opt.id;
                            return (
                              <button
                                key={opt.id}
                                onClick={() => handleOptionSelect(mockQuestions[activeQuestionIdx].id, opt.id)}
                                className={`w-full text-left p-4 rounded-lg border text-xs leading-relaxed transition-all flex items-start gap-3 cursor-pointer min-h-[48px] ${
                                  isSelected
                                    ? "bg-brand-gold-500/5 border-brand-gold-500 text-white font-bold"
                                    : "bg-white/5 border-white/5 text-slate-355 hover:bg-white/10 hover:border-white/10"
                                }`}
                              >
                                <span className={`w-5 h-5 rounded-lg border text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                  isSelected
                                    ? "bg-brand-gold-500 border-brand-gold-500 text-brand-navy-955"
                                    : "border-white/15 bg-brand-navy-950 text-slate-400"
                                }`}>
                                  {opt.id}
                                </span>
                                <span>{opt.text}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Navigation Footer */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center pt-4 border-t border-white/5">
                          <button
                            onClick={() => toggleFlag(mockQuestions[activeQuestionIdx].id)}
                            className={`min-h-[44px] px-4 py-2 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                              flaggedQuestions.includes(mockQuestions[activeQuestionIdx].id)
                                ? "bg-white/10 border-white/20 text-white font-bold"
                                : "bg-white/5 border-white/10 text-slate-350 hover:text-white"
                            }`}
                          >
                            {flaggedQuestions.includes(mockQuestions[activeQuestionIdx].id) ? "✓ Flagged for Review" : "Flag Question"}
                          </button>

                          <div className="flex gap-2 w-full sm:w-auto">
                            <button
                              disabled={activeQuestionIdx === 0}
                              onClick={() => setActiveQuestionIdx((prev) => prev - 1)}
                              className="flex-grow sm:flex-grow-0 min-h-[44px] px-4 py-2 rounded-lg text-xs font-semibold bg-white/5 border border-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                            >
                              Prev
                            </button>
                            {activeQuestionIdx < mockQuestions.length - 1 ? (
                              <button
                                onClick={() => setActiveQuestionIdx((prev) => prev + 1)}
                                className="flex-grow sm:flex-grow-0 min-h-[44px] px-5 py-2 rounded-lg text-xs font-bold bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-navy-955 transition-all cursor-pointer"
                              >
                                Next Question
                              </button>
                            ) : (
                              <button
                                onClick={handleFinishTest}
                                className="flex-grow sm:flex-grow-0 min-h-[44px] px-5 py-2 rounded-lg text-xs font-extrabold bg-emerald-500 hover:bg-emerald-600 text-brand-navy-955 transition-all cursor-pointer"
                              >
                                Submit Mock Test
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Question Palette */}
                    <div className="lg:col-span-4 p-5 rounded-2xl glass-panel border border-white/5 space-y-6">
                      <div className="border-b border-white/5 pb-3">
                        <h4 className="text-white font-bold text-sm">Question Palette</h4>
                        <p className="text-slate-500 text-[10px] mt-0.5">Quickly select or view review flags.</p>
                      </div>

                      <div className="grid grid-cols-5 gap-2.5">
                        {mockQuestions.map((q, idx) => {
                          const isAnswered = selectedAnswers[q.id] !== undefined;
                          const isFlagged = flaggedQuestions.includes(q.id);
                          const isActive = activeQuestionIdx === idx;

                          let btnClass = "bg-white/5 border-white/5 text-slate-450";
                          if (isActive) btnClass = "bg-brand-blue-500/10 border-brand-blue-500 text-white font-bold scale-105";
                          else if (isFlagged) btnClass = "bg-brand-purple-500/20 border-brand-purple-500/40 text-brand-purple-400";
                          else if (isAnswered) btnClass = "bg-emerald-500/20 border-emerald-500/30 text-emerald-400";

                          return (
                            <button
                              key={q.id}
                              onClick={() => setActiveQuestionIdx(idx)}
                              className={`aspect-square border rounded-xl flex items-center justify-center text-xs font-semibold transition-all ${btnClass}`}
                            >
                              {idx + 1}
                            </button>
                          );
                        })}
                      </div>

                      {/* Legend details */}
                      <div className="space-y-2 text-[10px] text-slate-400 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/30" />
                          <span>Answered ({Object.keys(selectedAnswers).length})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded bg-brand-purple-500/20 border border-brand-purple-500/40" />
                          <span>Flagged ({flaggedQuestions.length})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded bg-white/5 border border-white/5" />
                          <span>Not Visited</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {testFinished && testResult && (
                  <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl glass-panel border border-white/5 space-y-8 my-4">
                    <div className="text-center space-y-2">
                      <Trophy className="w-12 h-12 text-brand-gold-500 mx-auto fill-brand-gold-500/5 animate-bounce" />
                      <h3 className="text-2xl font-serif font-bold text-white">Scorecard Computed</h3>
                      <p className="text-slate-400 text-xs">Diagnostic details calculated instantly.</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Accuracy</span>
                        <span className="text-white font-bold text-lg">
                          {((testResult.correct / mockQuestions.length) * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <span className="text-[10px] text-emerald-500 block uppercase font-bold">Correct</span>
                        <span className="text-emerald-450 font-bold text-lg">{testResult.correct}</span>
                      </div>
                      <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                        <span className="text-[10px] text-rose-500 block uppercase font-bold">Incorrect</span>
                        <span className="text-rose-450 font-bold text-lg">{testResult.incorrect}</span>
                      </div>
                      <div className="p-4 rounded-xl bg-brand-gold-500/10 border border-brand-gold-500/25">
                        <span className="text-[10px] text-brand-gold-500 block uppercase font-bold font-mono">Final Score</span>
                        <span className="text-brand-gold-400 font-extrabold text-lg">{testResult.score.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Explanations section */}
                    <div className="space-y-4">
                      <h4 className="text-white font-bold text-sm">Review Questions & Precedents</h4>
                      <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-2">
                        {mockQuestions.map((q, idx) => {
                          const ans = selectedAnswers[q.id];
                          const isCorrect = ans === q.correct;
                          return (
                            <div key={q.id} className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs space-y-2">
                              <div className="flex justify-between font-bold">
                                <span className="text-white">Q{idx + 1}. {q.question.substring(0, 50)}...</span>
                                <span className={isCorrect ? "text-emerald-450" : "text-rose-450"}>
                                  {isCorrect ? "Correct (+1.0)" : `Incorrect (-0.25) • Answer: ${q.correct}`}
                                </span>
                              </div>
                              <p className="text-slate-400 font-light leading-relaxed">{q.explanation}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5">
                      <button
                        onClick={handleStartTest}
                        className="min-h-[48px] w-full sm:w-1/2 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-slate-350 font-bold text-xs cursor-pointer"
                      >
                        Retake Test
                      </button>
                      <button
                        onClick={() => {
                          setTestFinished(false);
                          setTestResult(null);
                          setActiveTab("overview");
                        }}
                        className="min-h-[48px] w-full sm:w-1/2 py-3 rounded-lg bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-navy-955 font-bold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        Unlock Scholar Certificate
                        <Award className="w-4 h-4 text-brand-navy-955" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* AI LAW TUTOR CHATBOT */}
            {activeTab === "chatbot" && (
              <motion.div
                key="chatbot"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl glass-panel border border-white/5 bg-brand-navy-900/60 overflow-hidden flex flex-col h-[520px]"
              >
                {/* Chat header */}
                <div className="px-6 py-4 bg-brand-navy-950/80 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
                      <BrainCircuit className="w-4.5 h-4.5 text-brand-gold-500 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-white font-serif font-bold text-sm leading-none">Vantage AI Law Tutor</h3>
                      <span className="text-[10px] text-slate-500 font-semibold font-mono">Expert simulated intelligence</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Tutor Online</span>
                  </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                        m.sender === "user"
                          ? "bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 text-white shadow-md rounded-tr-none"
                          : "bg-white/5 border border-white/5 text-slate-200 rounded-tl-none"
                      }`}>
                        {m.text}
                      </div>
                    </div>
                  ))}

                  {typing && (
                    <div className="flex justify-start">
                      <div className="p-3.5 rounded-2xl text-xs bg-white/5 border border-white/5 text-slate-450 rounded-tl-none flex items-center gap-1">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand-purple-500" />
                        Tutor is scanning constitutional rulings...
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Suggested prompt chips */}
                <div className="px-6 py-2.5 bg-brand-navy-950/40 border-t border-white/5 flex flex-wrap gap-2">
                  {[
                    "Explain Article 21 and Maneka Gandhi",
                    "Vicarious liability detours vs frolics",
                    "What is Basic Structure doctrine?",
                    "Tips for legal reasoning speed",
                  ].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleSendMessage(undefined, chip)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-[10px] font-semibold text-slate-400 hover:text-white transition-all"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* Form Input */}
                <form onSubmit={handleSendMessage} className="p-4 bg-brand-navy-950/80 border-t border-white/5 flex gap-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Ask a legal reasoning concept, case laws, or strategy question..."
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-blue-500/50 transition-all placeholder:text-slate-650"
                  />
                  <button
                    type="submit"
                    className="px-4 py-3 rounded-xl bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 hover:from-brand-blue-500 hover:to-brand-purple-500 text-white transition-all shadow-md flex items-center justify-center shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </motion.div>
            )}

            {/* DAILY QUIZ ARENA */}
            {activeTab === "quiz" && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {!quizActive && (
                  <div className="max-w-xl mx-auto text-center p-8 rounded-2xl glass-panel border border-white/5 space-y-6 my-8">
                    <div className="w-14 h-14 rounded-full bg-brand-purple-650/10 border border-brand-purple-600/20 flex items-center justify-center mx-auto text-brand-purple-500">
                      <HelpCircle className="w-7 h-7" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-serif font-bold text-white">Daily Rapid Legal Quiz</h3>
                      <p className="text-slate-400 text-xs max-w-sm mx-auto">
                        Attempt 3 rapid-fire multiple choice questions. You have 15 seconds per question. Points add to your weekly leaderboard stats.
                      </p>
                    </div>

                    <button
                      onClick={handleStartQuiz}
                      className="min-h-[48px] px-6 py-3 rounded-lg bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-navy-955 font-bold text-xs tracking-wider transition-all cursor-pointer"
                    >
                      Enter Quiz Arena
                    </button>
                  </div>
                )}

                {quizActive && (
                  <div className="max-w-2xl mx-auto rounded-2xl glass-panel border border-white/5 p-6 sm:p-8 space-y-6 relative overflow-hidden">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-brand-gold-500 font-mono">Arena Question {quizIndex + 1} of {quizQuestions.length}</span>
                        <h4 className="text-white font-bold text-xs mt-0.5">Rapid Challenge</h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500 font-bold">Timer:</span>
                        <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                          quizTimer <= 5 ? "bg-rose-500/20 text-rose-450 animate-pulse" : "bg-white/5 text-white"
                        }`}>
                          {quizTimer}s
                        </span>
                      </div>
                    </div>

                    {/* Question text */}
                    <div className="space-y-4">
                      <h3 className="text-white text-sm sm:text-base font-serif font-bold leading-relaxed">
                        {quizQuestions[quizIndex].q}
                      </h3>

                      {/* Options */}
                      <div className="space-y-2">
                        {quizQuestions[quizIndex].opts.map((opt) => {
                          const isSelected = quizSelected === opt;
                          const isCorrect = opt === quizQuestions[quizIndex].ans;
                          
                          let btnClass = "border-white/5 bg-white/5 text-slate-350 hover:bg-white/10";
                          if (isSelected && !quizFeedback) {
                            btnClass = "border-brand-gold-500 bg-brand-gold-500/5 text-white font-bold";
                          } else if (quizFeedback) {
                            if (isCorrect) btnClass = "border-emerald-500/40 bg-emerald-500/10 text-emerald-400";
                            else if (isSelected) btnClass = "border-rose-500/40 bg-rose-500/10 text-rose-450";
                            else btnClass = "border-white/5 bg-white/5 text-slate-650 opacity-50";
                          }

                          return (
                            <button
                              key={opt}
                              onClick={() => handleQuizOption(opt)}
                              disabled={quizFeedback !== null}
                              className={`w-full text-left p-3.5 rounded-lg border text-xs font-medium min-h-[48px] transition-all cursor-pointer ${btnClass}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Feedback Drawer */}
                    <AnimatePresence>
                      {quizFeedback && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-350 space-y-2 mt-4"
                        >
                          <span className="font-bold text-white block">Explanation Digest</span>
                          <p className="leading-relaxed font-light">{quizFeedback}</p>

                          <button
                            onClick={handleNextQuizQ}
                            className="w-full mt-3 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs transition-all flex items-center justify-center gap-1"
                          >
                            {quizIndex === quizQuestions.length - 1 ? "Complete Quiz & Lock Points" : "Proceed to Next Question"}
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            )}

            {/* SCHOLARSHIP HUB */}
            {activeTab === "scholarship" && (
              <motion.div
                key="scholarship"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Inputs Left */}
                  <div className="lg:col-span-6 p-6 rounded-2xl glass-panel border border-white/5 space-y-6">
                    <div>
                      <h3 className="text-white font-serif font-bold text-sm">Vantage Merit Calculator</h3>
                      <p className="text-slate-400 text-xs font-light">Determine your dynamic tuition fee waivers based on academic scores.</p>
                    </div>

                    <div className="space-y-5">
                      {/* Board Marks Slider */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300 font-semibold">12th Board Score</span>
                          <span className="text-white font-bold">{boardMarks}%</span>
                        </div>
                        <input
                          type="range"
                          min="60"
                          max="100"
                          value={boardMarks}
                          onChange={(e) => setBoardMarks(parseInt(e.target.value))}
                          className="w-full accent-white bg-white/10 rounded-lg appearance-none h-1.5"
                        />
                      </div>

                      {/* Mock Percentile Slider */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-350 font-semibold">Mock Entrance Percentile</span>
                          <span className="text-white font-bold">{targetPercentile}th Percentile</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="100"
                          value={targetPercentile}
                          onChange={(e) => setTargetPercentile(parseInt(e.target.value))}
                          className="w-full accent-white bg-white/10 rounded-lg appearance-none h-1.5"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleCalculateScholarship}
                      className="min-h-[48px] w-full py-3 rounded-lg bg-white text-black font-bold text-xs tracking-wider transition-all cursor-pointer hover:bg-slate-200"
                    >
                      Compute Fee Waiver
                    </button>
                  </div>

                  {/* Prediction Output Right */}
                  <div className="lg:col-span-6 p-6 rounded-2xl glass-panel border border-white/5 space-y-6 flex flex-col justify-between min-h-[300px]">
                    {scholarshipResult ? (
                      <div className="space-y-6">
                        <div className="text-center space-y-1.5">
                          <Award className="w-10 h-10 text-white mx-auto fill-white/10 animate-pulse" />
                          <h4 className="text-2xl font-serif font-extrabold text-white">
                            {scholarshipResult.waiver}% Scholarship
                          </h4>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Awarded and Approved</span>
                        </div>

                        <div className="space-y-2 border-t border-b border-white/5 py-4 text-xs">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Regular Tuition:</span>
                            <span className="text-white font-bold">₹64,999</span>
                          </div>
                          <div className="flex justify-between text-emerald-400">
                            <span>Scholarship Waiver:</span>
                            <span>- ₹{scholarshipResult.discount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm border-t border-white/5 pt-2 font-bold">
                            <span className="text-slate-300">Net Admission Cost:</span>
                            <span className="text-white">₹{scholarshipResult.finalCost.toLocaleString()}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => alert("Scholarship claimed! We have reserved your seats for the next 48 hours.")}
                          className="min-h-[48px] w-full py-3 rounded-lg bg-white text-black font-bold text-xs tracking-wider transition-all cursor-pointer hover:bg-slate-200"
                        >
                          Lock Net Scholarship Cost
                        </button>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5 mb-4">
                          <Sparkles className="w-6 h-6 text-slate-500" />
                        </div>
                        <h4 className="text-white font-bold mb-1">Scholarship calculations pending</h4>
                        <p className="text-slate-400 text-xs max-w-xs font-light">
                          Select your scores in the left panel and click compute to see your discount criteria.
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* LUXURY DIGITAL MERIT CERTIFICATE MODAL */}
      <AnimatePresence>
        {isCertificateOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 print:p-0"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-3xl w-full bg-[#0d0f19] border-2 border-brand-gold-500/40 rounded-3xl p-8 md:p-12 shadow-2xl shadow-brand-gold-500/10 text-center font-sans space-y-6 md:space-y-8 overflow-hidden print:border-none print:shadow-none print:bg-white print:text-black print:p-0"
            >
              {/* Certificate Gold Borders */}
              <div className="absolute inset-4 border border-brand gold-500/10 rounded-2xl pointer-events-none print:hidden" />
              <div className="absolute inset-6 border border-brand-gold-500/25 rounded-2xl pointer-events-none print:hidden" />
              
              {/* Close button */}
              <button
                onClick={() => setIsCertificateOpen(false)}
                className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors print:hidden"
              >
                <XCircle className="w-6 h-6" />
              </button>

              {/* Certificate Header */}
              <div className="space-y-2">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-brand-gold-500/10 border border-brand-gold-500/30 flex items-center justify-center text-brand-gold-500">
                    <Award className="w-9 h-9" />
                  </div>
                </div>
                <span className="font-serif italic text-brand-gold-400 text-sm tracking-wide block">LexVantage Institute of Law</span>
                <h2 className="text-xl md:text-3xl font-serif font-extrabold text-white uppercase tracking-wider print:text-black">
                  Certificate of Merit
                </h2>
                <div className="h-0.5 bg-gradient-to-r from-transparent via-brand-gold-500 to-transparent w-40 mx-auto" />
              </div>

              {/* Certificate Body */}
              <div className="space-y-4 md:space-y-6 font-serif max-w-xl mx-auto print:text-black">
                <p className="text-xs md:text-sm text-slate-400 italic">This credential is proudly presented to</p>
                <h3 className="text-2xl md:text-4xl font-extrabold text-white tracking-wide border-b border-brand-gold-500/20 pb-2 max-w-md mx-auto print:text-black print:border-black">
                  {userName}
                </h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-light">
                  for demonstrating outstanding cognitive competence and analytical rigor, achieving an elite score of{" "}
                  <span className="text-brand-gold-400 font-bold font-mono">{mockScoreCard?.score.toFixed(2)}</span> Marks
                  in the <span className="font-sans font-bold text-white print:text-black">LexVantage National Mock Diagnostic Simulation (CLAT Format)</span>.
                </p>
              </div>

              {/* Signatures */}
              <div className="grid grid-cols-2 gap-8 pt-6 max-w-lg mx-auto print:text-black">
                <div className="space-y-1">
                  <div className="h-8 font-serif italic text-sm text-brand-gold-400 flex items-end justify-center">
                    Vikramaditya Singh
                  </div>
                  <div className="h-px bg-slate-700/40 w-full print:bg-black" />
                  <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-bold">Co-Founder, Advocate</span>
                </div>
                <div className="space-y-1">
                  <div className="h-8 font-serif italic text-sm text-brand-gold-400 flex items-end justify-center">
                    Priya Nair
                  </div>
                  <div className="h-px bg-slate-700/40 w-full print:bg-black" />
                  <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-bold">Director of GK</span>
                </div>
              </div>

              {/* Action triggers */}
              <div className="flex justify-center gap-4 pt-4 print:hidden">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-2.5 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-navy-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-brand-gold-500/20"
                >
                  <Download className="w-4 h-4" />
                  Print / Save PDF
                </button>
                <button
                  onClick={() => setIsCertificateOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white font-bold text-xs transition-all"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COHORT VIRTUAL LIVE COURTROOM SIMULATOR */}
      <AnimatePresence>
        {isLiveClassOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-brand-navy-900 border border-white/10 rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[550px] md:h-[620px]"
            >
              {/* Left Panel: Lecture Video Stream */}
              <div className="flex-1 bg-black flex flex-col relative justify-between p-6">
                {/* Top Bar */}
                <div className="flex justify-between items-center z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                    <span className="text-xs text-white font-semibold uppercase tracking-wider">LIVE • Constitutional Law Analysis</span>
                  </div>
                  <span className="text-slate-400 text-[10px] bg-white/5 px-2 py-0.5 rounded border border-white/5 font-mono">1,248 attending</span>
                </div>

                {/* Simulated Whiteboard slides */}
                <div className="my-auto text-center space-y-4 max-w-md mx-auto">
                  <span className="text-[10px] text-brand-gold-500 font-bold uppercase tracking-widest block">Lecture Slide 14/25</span>
                  <h2 className="text-white font-serif font-bold text-xl md:text-2xl leading-relaxed">
                    Article 21: Expanding Boundaries of Personal Liberty
                  </h2>
                  <div className="bg-brand-navy-950/80 border border-brand-gold-500/20 rounded-xl p-4 text-left font-sans text-xs space-y-2 text-slate-350">
                    <p className="font-bold text-brand-gold-400 font-serif">Key Landmark Precedents:</p>
                    <p>1. <span className="text-white">A.K. Gopalan (1950)</span>: Restricted definition (only protection against executive action).</p>
                    <p>2. <span className="text-white">Maneka Gandhi (1978)</span>: Expansive definition (protection against arbitrary legislative action; "just, fair & reasonable" test).</p>
                    <p>3. <span className="text-white">Puttaswamy (2017)</span>: Right to Privacy declared a fundamental right under Article 21.</p>
                  </div>
                </div>

                {/* Video controls bottom bar */}
                <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-white">Adv. Vikramaditya Singh</span>
                    <span className="text-[10px] bg-brand-blue-500/20 text-brand-blue-400 px-1.5 py-0.5 rounded font-bold uppercase">HOST</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>HD Streaming Active</span>
                  </div>
                </div>
              </div>

              {/* Right Panel: Live Student Chat Chatroom */}
              <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-white/5 flex flex-col justify-between bg-brand-navy-950">
                <div className="p-4 border-b border-white/5 flex justify-between items-center bg-brand-navy-900">
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-brand-gold-500" />
                    Live Chatroom
                  </h4>
                  <button
                    onClick={() => setIsLiveClassOpen(false)}
                    className="text-slate-500 hover:text-white transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                {/* Chat list */}
                <div className="flex-grow p-4 overflow-y-auto space-y-3 font-sans text-xs flex flex-col-reverse">
                  <div className="space-y-3">
                    {liveChats.map((chat, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <span className="text-brand-gold-500/80 font-bold block">{chat.name}</span>
                        <p className="text-slate-300 font-light">{chat.msg}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat action input */}
                <div className="p-4 border-t border-white/5 bg-brand-navy-900/50">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const input = (e.target as any).elements.chatInput.value;
                      if (!input.trim()) return;
                      setLiveChats((prev) => [...prev, { name: "You (Aspirant)", msg: input }]);
                      (e.target as any).reset();
                    }}
                    className="flex gap-2"
                  >
                    <input
                      name="chatInput"
                      type="text"
                      placeholder="Ask the advocate..."
                      className="flex-1 px-3 py-1.5 bg-brand-navy-950 border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-brand-gold-500/50"
                    />
                    <button type="submit" className="p-2 rounded-lg bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-navy-950 transition-colors">
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
