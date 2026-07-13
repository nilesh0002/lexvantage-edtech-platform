export interface Course {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  duration: string;
  exam: string;
  syllabus: string[];
}

export const coursesData: Course[] = [
  {
    id: "clat-2027",
    name: "CLAT Achievers Cohort 2027",
    price: "",
    originalPrice: "",
    duration: "2 Year Program (Class 11)",
    exam: "CLAT & AILET",
    syllabus: [
      "Core Legal Reasoning Foundations",
      "Quantitative & Reasoning Drills",
      "120+ National Mock Simulations",
      "1-on-1 NLU Mentor Allocation",
    ],
  },
  {
    id: "clat-droppers",
    name: "CLAT Elite Droppers Batch 2026",
    price: "",
    originalPrice: "",
    duration: "1 Year Program (Droppers)",
    exam: "CLAT & AILET",
    syllabus: [
      "Rigorous Past Year Paper Deconstruction",
      "Speed Legal & Logical reasoning hacks",
      "150+ mock tests with full analytics",
      "Special Focus on critical logical reasoning",
    ],
  },
  {
    id: "clat-foundation",
    name: "NLU Foundation Program 2026",
    price: "",
    originalPrice: "",
    duration: "1 Year Program (Class 12)",
    exam: "CLAT",
    syllabus: [
      "Comprehensive syllabus coverage",
      "Monthly NLU mock exams",
      "Daily current affairs brief",
      "Weekly live doubt clearance sessions",
    ],
  },
  {
    id: "crash-course",
    name: "Vantage Crash Course (CLAT 2026)",
    price: "",
    originalPrice: "",
    duration: "3-Month Fastrack",
    exam: "Crash Course",
    syllabus: [
      "Summary lectures on core concepts",
      "Targeted GK dossiers",
      "35 simulated mock tests",
      "Expert exam-taking strategies",
    ],
  },
  {
    id: "test-series",
    name: "Vantage Mock Test Series Pro",
    price: "",
    originalPrice: "",
    duration: "Till Exam Date",
    exam: "Test Series",
    syllabus: [
      "65 Full-length national mocks",
      "Detailed video solutions by experts",
      "AI Admissibility & accuracy analyzer",
      "Percentile & comparative rank logs",
    ],
  },
  {
    id: "mhcet-slat",
    name: "SLAT & MH CET Law Target Batch",
    price: "",
    originalPrice: "",
    duration: "6-Month Targeted",
    exam: "SLAT / MHCET",
    syllabus: [
      "Analytical logic workshops",
      "Static GK and Legal reasoning dossiers",
      "25 specialized mock tests",
      "Personalized exam time management",
    ],
  },
  {
    id: "law-school-5year",
    name: "5-Year Law School Semester Companion",
    price: "",
    originalPrice: "",
    duration: "5-Year Support (Per Semester)",
    exam: "Law School LL.B",
    syllabus: [
      "Semester Subject Notes (Torts, Contracts, Constitutional Law)",
      "Research guides & academic writing tutorials",
      "High-yield case briefs & landmark judgment summaries",
      "Legal drafting & moot court preparation kits",
    ],
  },
  {
    id: "other-subject",
    name: "Other / Individual Subject Option",
    price: "",
    originalPrice: "",
    duration: "Flexible Support",
    exam: "Other",
    syllabus: [
      "Select individual subjects based on your choice",
      "Handwritten & easy-to-understand notes for the selected subject",
      "Dedicated doubt support by Shreya Nadar",
      "Perfect for university exams or targeted prep",
    ],
  },
];
