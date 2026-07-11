export interface Ranker {
  name: string;
  rank: string;
  nlu: string;
  exam: string;
  avatar: string;
  quote: string;
}

export const rankersData: Ranker[] = [
  {
    name: "Rohan Deshmukh",
    rank: "AIR 2",
    nlu: "NLSIU Bangalore",
    exam: "CLAT 2025",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rohan",
    quote: "LexVantage mock analytics pinpointed that I was taking too long to digest GK. Modifying my speed allowed me to hit 114/120 on D-day.",
  },
  {
    name: "Tanvi Saxena",
    rank: "AIR 7",
    nlu: "NALSAR Hyderabad",
    exam: "CLAT 2025",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tanvi",
    quote: "The 1-on-1 strategy sessions with alumni mentors were incredibly helpful. It gave me real, actionable insights on paper solving orders.",
  },
  {
    name: "Aman Malhotra",
    rank: "AIR 11",
    nlu: "NLU Delhi",
    exam: "AILET 2025",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aman",
    quote: "Having former judges guest lecture on Constitutional Law made legal reasoning extremely simple. I scored a perfect 32 in that section.",
  },
  {
    name: "Dipti Sen",
    rank: "AIR 16",
    nlu: "WBNUJS Kolkata",
    exam: "CLAT 2025",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dipti",
    quote: "LexVantage's ultra-small cohorts allowed tutors to read my essay mock answers. The personalized comments helped me secure NUJS.",
  },
];
