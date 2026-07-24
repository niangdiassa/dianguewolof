"use client";

import Link from "next/link";
import { lessons } from "@/lib/wolof-data";

export default function LessonsPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F7F3EE" }}>
      {/* Header */}
      <header className="clay-card mx-4 mt-4 px-6 py-4 flex items-center gap-4 sticky top-4 z-50 bg-white/90 backdrop-blur-sm">
        <Link href="/" className="text-2xl hover:scale-110 transition-transform">←</Link>
        <div className="flex items-center gap-3">
          <span className="text-2xl">📚</span>
          <h1 className="font-extrabold text-xl text-[#3C2F2F]">Toutes les leçons</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-8 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-[#3C2F2F] mb-3">Choisissez votre leçon</h2>
          <p className="text-[#7F6E6A] font-medium">{lessons.length} thèmes disponibles pour apprendre le wolof</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {lessons.map((lesson) => (
            <Link key={lesson.id} href={`/leçons/${lesson.id}`}>
              <div
                className="clay-card-colored p-7 cursor-pointer hover:scale-[1.02] transition-all duration-200 h-full"
                style={{ background: lesson.bgColor }}
              >
                <div className="text-5xl mb-4">{lesson.emoji}</div>
                <h3 className="font-extrabold text-xl text-[#3C2F2F] mb-2">{lesson.title}</h3>
                <p className="text-sm text-[#7F6E6A] font-medium mb-5">{lesson.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ background: lesson.color + "55", color: "#3C2F2F" }}>
                    {lesson.words.length} mots
                  </span>
                  <div className="flex gap-2">
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/60 text-[#3C2F2F]">
                      Flashcards
                    </span>
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/60 text-[#3C2F2F]">
                      Quiz
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
