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

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="glass-panel p-8 rounded-2xl max-w-md w-full text-center space-y-6">
          <ShieldAlert className="w-12 h-12 text-destructive mx-auto" />
          <h1 className="text-2xl font-serif font-bold text-foreground">Admin Portal</h1>
          <p className="text-muted-foreground text-sm">Please authenticate to manage the platform.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:border-primary"
            />
            <button type="submit" className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold">
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Course Management</h1>
            <p className="text-muted-foreground mt-1">Add or remove real data from the platform.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Course Form */}
          <div className="lg:col-span-1 glass-panel p-6 rounded-2xl border border-border space-y-6 h-fit">
            <h2 className="text-xl font-bold text-foreground">Add New Course</h2>
            <form onSubmit={handleAddCourse} className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Course Name</label>
                <input required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Target Exam</label>
                <input required value={exam} onChange={e => setExam(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Duration</label>
                  <input required value={duration} onChange={e => setDuration(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Price (₹)</label>
                  <input required value={price} onChange={e => setPrice(e.target.value)} type="number" className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground" />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Syllabus (One item per line)</label>
                <textarea required value={syllabus} onChange={e => setSyllabus(e.target.value)} rows={4} className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground" />
              </div>
              <button disabled={loading} type="submit" className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold flex justify-center items-center gap-2">
                <Plus className="w-4 h-4" /> Publish Course
              </button>
            </form>
          </div>

          {/* Live Courses List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-foreground">Live Data Base</h2>
            {courses.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-border rounded-2xl">
                <p className="text-muted-foreground">No courses found in the database. All mock data has been removed.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {courses.map((course) => (
                  <div key={course.id} className="glass-panel p-4 rounded-xl border border-border flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-foreground">{course.name}</h3>
                      <p className="text-sm text-muted-foreground">{course.exam} • {course.duration}</p>
                    </div>
                    <button className="p-2 text-destructive hover:bg-destructive/10 rounded-lg">
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
