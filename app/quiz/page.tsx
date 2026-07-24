"use client";

import Link from "next/link";
import { lessons } from "@/lib/wolof-data";

export default function QuizPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F7F3EE" }}>
      {/* Header */}
      <header className="clay-card mx-4 mt-4 px-6 py-4 flex items-center gap-4 sticky top-4 z-50 bg-white/90 backdrop-blur-sm">
        <Link href="/" className="text-2xl hover:scale-110 transition-transform">←</Link>
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎯</span>
          <h1 className="font-extrabold text-xl text-[#3C2F2F]">Quiz</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-8 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-[#3C2F2F] mb-3">Testez vos connaissances !</h2>
          <p className="text-[#7F6E6A] font-medium">Choisissez un thème et lancez le quiz</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {lessons.map((lesson) => (
            <Link key={lesson.id} href={`/quiz/${lesson.id}`}>
              <div
                className="clay-card-colored p-6 cursor-pointer hover:scale-[1.02] transition-all duration-200"
                style={{ background: lesson.bgColor }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-4xl">{lesson.emoji}</span>
                  <div>
                    <h3 className="font-extrabold text-lg text-[#3C2F2F]">{lesson.title}</h3>
                    <p className="text-xs text-[#7F6E6A] font-medium">{lesson.words.length} questions possibles</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: lesson.color + "55", color: "#3C2F2F" }}>
                    QCM • 10 questions
                  </span>
                  <span className="font-bold text-sm" style={{ color: "#3C2F2F" }}>
                    Jouer 🎮 →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
