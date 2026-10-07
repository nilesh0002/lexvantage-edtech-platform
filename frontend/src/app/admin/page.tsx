"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Plus, Trash, ShieldAlert } from "lucide-react";

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // New Course Form State
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [exam, setExam] = useState("");
  const [syllabus, setSyllabus] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // HARDCODED DEMO AUTHENTICATION (Replace with Clerk or NextAuth in production)
    if (password === "admin123") {
      setIsAdmin(true);
      fetchCourses();
    } else {
      alert("Invalid admin password");
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      const text = await res.text();
      try {
        const data = JSON.parse(text);
        if (res.ok) setCourses(data);
      } catch (e) {
        console.error("API returned non-JSON response:", text.slice(0, 100));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newCourse = {
      name,
      price,
      duration,
      exam,
      syllabus: syllabus.split("\n").filter(Boolean), // convert lines to array
    };

    await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCourse),
    });

    // Reset form
    setName(""); setPrice(""); setDuration(""); setExam(""); setSyllabus("");
    setLoading(false);
    fetchCourses();
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      const res = await fetch(`/api/courses?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchCourses();
      }
    } catch (e) {
      console.error("Failed to delete course:", e);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="glass-panel p-8 rounded-2xl max-w-md w-full text-center space-y-6 shadow-xl border border-border bg-card">
          <div className="w-14 h-14 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center mx-auto text-destructive">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-serif font-bold text-foreground">Admin Portal</h1>
            <p className="text-muted-foreground text-sm">Please authenticate to manage live curriculums.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-muted/60 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
            />
            <button type="submit" className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all cursor-pointer shadow-md">
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Course Management</h1>
            <p className="text-muted-foreground text-sm mt-1">Publish, update, or remove real live courses from your platform database.</p>
          </div>
          <div className="px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold font-mono self-start sm:self-auto">
            {courses.length} Active {courses.length === 1 ? "Program" : "Programs"}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Add Course Form */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-2xl border border-border space-y-6 bg-card shadow-lg">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-foreground">Publish New Course</h2>
              <p className="text-xs text-muted-foreground">Fill in the program details to list it live on the website.</p>
            </div>
            
            <form onSubmit={handleAddCourse} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block">Course Name</label>
                <input
                  required
                  placeholder="e.g. CLAT Super 30 Achievers Cohort"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block">Target Exam</label>
                <input
                  required
                  placeholder="e.g. CLAT & AILET"
                  value={exam}
                  onChange={e => setExam(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground block">Duration</label>
                  <input
                    required
                    placeholder="e.g. 1 Year Cohort"
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground block">Price (₹)</label>
                  <input
                    placeholder="e.g. 45000"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    type="number"
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block">Syllabus Highlights (One item per line)</label>
                <textarea
                  required
                  placeholder="Comprehensive Legal Reasoning Modules&#10;120+ National Mock Simulations&#10;1-on-1 Mentor Guidance"
                  value={syllabus}
                  onChange={e => setSyllabus(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm transition-all"
                />
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-bold flex justify-center items-center gap-2 transition-all cursor-pointer shadow-md text-sm"
              >
                <Plus className="w-4 h-4" />
                {loading ? "Publishing..." : "Publish to Platform"}
              </button>
            </form>
          </div>

          {/* Live Courses List */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-xl font-bold text-foreground">Database Records</h2>
            {courses.length === 0 ? (
              <div className="p-12 text-center border border-dashed border-border rounded-2xl bg-card/40">
                <p className="text-muted-foreground text-sm">No custom courses currently saved in PostgreSQL database.</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Courses created using the form on the left will immediately reflect here and live on the homepage.</p>
              </div>
            ) : (
              <div className="grid gap-3.5">
                {courses.map((course) => (
                  <div key={course.id} className="glass-panel p-5 rounded-2xl border border-border flex justify-between items-center bg-card hover:border-primary/40 transition-all shadow-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase bg-primary/10 text-primary">
                          {course.exam}
                        </span>
                        {course.price && (
                          <span className="text-xs font-bold text-foreground font-mono">
                            ₹{Number(course.price).toLocaleString()}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-foreground text-base">{course.name}</h3>
                      <p className="text-xs text-muted-foreground">{course.duration}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteCourse(course.id)}
                      className="p-2.5 text-destructive hover:bg-destructive/10 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-destructive/20"
                      title="Delete Course"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
