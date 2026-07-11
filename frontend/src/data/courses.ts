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
    price: "₹84,999",
    originalPrice: "₹1,19,999",
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
    price: "₹64,999",
    originalPrice: "₹89,999",
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
    price: "₹54,999",
    originalPrice: "₹74,999",
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
    price: "₹19,999",
    originalPrice: "₹29,999",
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
    price: "₹7,999",
    originalPrice: "₹12,999",
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
    price: "₹24,999",
    originalPrice: "₹39,999",
    duration: "6-Month Targeted",
    exam: "SLAT / MHCET",
    syllabus: [
      "Analytical logic workshops",
      "Static GK and Legal reasoning dossiers",
      "25 specialized mock tests",
      "Personalized exam time management",
    ],
  },
];
