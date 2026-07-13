import type { Metadata } from "next";
import { Open_Sans, Poppins } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Shreya's Law Desk | Law Entrance & 5-Year Law College Companion",
  description: "Prepare for CLAT, AILET, & Law Entrances under Shreya Nadar's mentorship, and access curated study guides, course articles, and semester notes throughout your entire 5 years of law school (LL.B / B.A. LL.B).",
  keywords: "CLAT coaching, law school companion, NLU prep, LL.B notes, B.A. LL.B semester guides, law college articles, AILET prep, Shreya's Law Desk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-navy-950 text-slate-100 selection:bg-brand-blue-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
