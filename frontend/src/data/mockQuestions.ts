export interface Question {
  id: number;
  section: string;
  passage: string;
  question: string;
  options: { id: string; text: string }[];
  correct: string;
  explanation: string;
}

export const mockQuestions: Question[] = [
  {
    id: 1,
    section: "Legal Reasoning",
    passage: "The doctrine of 'vicarious liability' holds an employer responsible for the wrongful acts of an employee, provided that the act was committed 'in the course of employment'. An act is in the course of employment if it is either a wrongful act authorized by the employer, or a wrongful and unauthorized mode of doing some act authorized by the employer. However, if the employee was on a 'frolic of his own' (undertaking an unauthorized activity for personal benefit entirely unrelated to employment), the employer is not liable.",
    question: "A company driver, Amit, was instructed to deliver goods to a warehouse. On the way, Amit took a 5 km detour to purchase medicines for his mother. During this detour, he negligently hit a pedestrian, Suresh. Is the company liable?",
    options: [
      { id: "A", text: "Yes, because Amit was driving the company vehicle." },
      { id: "B", text: "Yes, because delivering medicines to a sick parent is a reasonable and humane act." },
      { id: "C", text: "No, because taking a 5 km detour for personal medicines constitutes a 'frolic of his own', absolving the company." },
      { id: "D", text: "No, because Suresh should have watched where he was walking on the public road." },
    ],
    correct: "C",
    explanation: "Amit took a significant detour (5 km) entirely for personal reasons (medicines for his mother) unrelated to delivering company goods. This is a classic 'frolic of his own' where the employee was not acting in the course of employment, thus the employer is not vicariously liable."
  },
  {
    id: 2,
    section: "Legal Reasoning",
    passage: "Under the Law of Contracts, an agreement becomes a contract only when there is free consent, lawful consideration, and a lawful object. Consent is said to be free when it is not caused by coercion (force/threat), undue influence (dominance), fraud, or misrepresentation. If consent is obtained by coercion, the contract is 'voidable' at the option of the party whose consent was so caused. A voidable contract remains valid until it is formally set aside by the aggrieved party.",
    question: "Raj threatens to burn down Vinay's house unless Vinay sells his land worth ₹50 Lakhs for ₹10 Lakhs. Vinay signs the agreement. Vinay later regrets and wants his land back. Which legal remedy is correct?",
    options: [
      { id: "A", text: "The agreement is void from the beginning (void ab initio); Vinay does not need to do anything." },
      { id: "B", text: "The contract is voidable due to coercion; Vinay can elect to set aside the contract in court to recover his land." },
      { id: "C", text: "The contract is fully valid because Vinay signed the document and received ₹10 Lakhs." },
      { id: "D", text: "Vinay has to pay a penalty to Raj to cancel the sale." },
    ],
    correct: "B",
    explanation: "Coercion was used to secure Vinay's signature. Consent was not free. According to contract law, this makes the contract voidable at the option of Vinay. He can approach the court to void/rescind the contract and recover his property."
  },
  {
    id: 3,
    section: "Logical Reasoning",
    passage: "Syllogistic logic requires checking the validity of conclusions based on categorical statements. Read statements: All lawyers are analytical. Some analytical people are judges. No judge is corrupt.",
    question: "Which of the following conclusions logically follows from the statements above?",
    options: [
      { id: "A", text: "All lawyers are judges." },
      { id: "B", text: "Some analytical people are not corrupt." },
      { id: "C", text: "No lawyer is corrupt." },
      { id: "D", text: "Some judges are lawyers." },
    ],
    correct: "B",
    explanation: "Since some analytical people are judges, and no judge is corrupt, the analytical people who are judges cannot be corrupt. Therefore, 'Some analytical people are not corrupt' must be true."
  },
  {
    id: 4,
    section: "English Language",
    passage: "Precedent, in legal contexts, refers to a court decision that is considered as authority for deciding subsequent cases involving identical or similar facts. The principle of 'stare decisis' binds lower courts to decisions made by higher courts in their jurisdiction. Proponents argue it establishes consistency and predictability. Opponents suggest it can codify outdated prejudices, locking in bad law unless overridden by a constitutional bench.",
    question: "According to the passage, what is the primary drawback of strict adherence to precedent?",
    options: [
      { id: "A", text: "It prevents lower courts from resolving cases efficiently." },
      { id: "B", text: "It removes predictability from legal judgments." },
      { id: "C", text: "It can perpetuate outdated legal prejudices and bad laws." },
      { id: "D", text: "It overrides the authority of the constitution itself." },
    ],
    correct: "C",
    explanation: "The passage explicitly notes: 'Opponents suggest it can codify outdated prejudices, locking in bad law unless overridden...'"
  },
  {
    id: 5,
    section: "Quantitative Techniques",
    passage: "In a class of 100 students, 60 students registered for CLAT, 45 registered for AILET, and 20 registered for both exams. The remaining students did not register for either exam.",
    question: "How many students did not register for either CLAT or AILET?",
    options: [
      { id: "A", text: "15 students" },
      { id: "B", text: "20 students" },
      { id: "C", text: "25 students" },
      { id: "D", text: "5 students" },
    ],
    correct: "A",
    explanation: "Using sets formula: Total Union (CLAT or AILET) = A + B - (A intersect B) = 60 + 45 - 20 = 85. Since there are 100 students, the number of students who registered for neither is 100 - 85 = 15."
  }
];
