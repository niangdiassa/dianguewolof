"use client";

import { useState, use } from "react";
import Link from "next/link";
import { lessons } from "@/lib/wolof-data";
import { notFound } from "next/navigation";
import { useProgressStore } from "@/lib/progress-store";
import { LevelBadge, XPToast } from "@/components/ProgressUI";

type Tab = "leçon" | "flashcards";

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const lesson = lessons.find((l) => l.id === id);
  if (!lesson) notFound();

  const [tab, setTab] = useState<Tab>("leçon");
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [direction, setDirection] = useState<"fr-to-wo" | "wo-to-fr">("fr-to-wo");

  const recordFlashcard = useProgressStore((s) => s.recordFlashcard);
  const lessonStats = useProgressStore((s) => s.lessonStats);
  const stats = lessonStats[id];

  const currentWord = lesson.words[cardIndex];

  const nextCard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCardIndex((i) => (i + 1) % lesson.words.length);
    }, 150);
  };

  const prevCard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCardIndex((i) => (i - 1 + lesson.words.length) % lesson.words.length);
    }, 150);
  };

  const handleFlip = () => {
    if (!flipped) {
      recordFlashcard(id);
    }
    setFlipped((f) => !f);
  };

  const front = direction === "fr-to-wo" ? currentWord.french : currentWord.wolof;
  const back = direction === "fr-to-wo" ? currentWord.wolof : currentWord.french;
  const frontLabel = direction === "fr-to-wo" ? "🇫🇷 Français" : "🇸🇳 Wolof";
  const backLabel = direction === "fr-to-wo" ? "🇸🇳 Wolof" : "🇫🇷 Français";

  return (
    <div className="min-h-screen" style={{ background: "#F7F3EE" }}>
      <XPToast />

      {/* Header */}
      <header className="clay-card mx-4 mt-4 px-6 py-4 flex items-center gap-3 sticky top-4 z-50 bg-white/90 backdrop-blur-sm">
        <Link href="/leçons" className="text-2xl hover:scale-110 transition-transform flex-shrink-0">←</Link>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-2xl flex-shrink-0">{lesson.emoji}</span>
          <div className="min-w-0">
            <h1 className="font-extrabold text-lg text-[#3C2F2F] leading-none truncate">{lesson.title}</h1>
            <p className="text-xs text-[#7F6E6A] font-medium">
              {lesson.words.length} mots
              {stats && stats.flashcardsFlipped > 0 && ` · ${stats.flashcardsFlipped} retournées`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <LevelBadge />
          <Link
            href={`/quiz/${lesson.id}`}
            className="clay-btn px-4 py-2 text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg, #FFC7A8, #FF9E7A)" }}
          >
            Quiz 🎯
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-6 pb-20">
        {/* Tabs */}
        <div className="clay-card p-1.5 flex gap-1 mb-8 w-full">
          {(["leçon", "flashcards"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex-1 py-3 rounded-2xl font-bold text-sm transition-all duration-200 capitalize"
              style={
                tab === t
                  ? { background: lesson.bgColor, color: "#3C2F2F", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }
                  : { color: "#7F6E6A" }
              }
            >
              {t === "leçon" ? "📖 Leçon" : "🃏 Flashcards"}
            </button>
          ))}
        </div>

        {/* Leçon tab */}
        {tab === "leçon" && (
          <div className="space-y-3">
            <div className="clay-card p-4 mb-6 flex items-center gap-3" style={{ background: lesson.bgColor + "88" }}>
              <span className="text-2xl">{lesson.emoji}</span>
              <p className="text-sm font-medium text-[#3C2F2F]">{lesson.description}</p>
            </div>
            {lesson.words.map((word, idx) => (
              <div key={idx} className="clay-card p-5 flex flex-col sm:flex-row sm:items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#F7F3EE] text-[#7F6E6A]">🇫🇷 FR</span>
                    <span className="font-extrabold text-[#3C2F2F]">{word.french}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ background: lesson.color }}>
                      🇸🇳 WO
                    </span>
                    <span className="font-extrabold text-[#3C2F2F] text-lg">{word.wolof}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#BFE7D2] text-[#2D7A5A]">🔊 Prononciation</span>
                    <span className="text-sm text-[#7F6E6A] italic font-medium">/{word.phonetic}/</span>
                  </div>
                </div>
                {word.example && (
                  <div className="sm:max-w-xs rounded-2xl p-3 text-sm"
                    style={{ background: lesson.bgColor }}>
                    <p className="font-bold text-[#3C2F2F] mb-1">💬 &quot;{word.example}&quot;</p>
                    <p className="text-[#7F6E6A] italic">→ {word.exampleTranslation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Flashcards tab */}
        {tab === "flashcards" && (
          <div>
            {/* XP hint */}
            <div className="clay-card p-3 mb-4 flex items-center gap-2 rounded-2xl"
              style={{ background: "#EDE9FF" }}>
              <span className="text-base">⭐</span>
              <p className="text-xs font-bold text-[#3C2F2F]">
                Retourne les cartes pour gagner des XP ! +2 XP par retournement (max 20/session)
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="clay-card p-1.5 flex gap-1 inline-flex">
                {(["fr-to-wo", "wo-to-fr"] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => { setDirection(d); setFlipped(false); }}
                    className="px-4 py-2 rounded-xl font-bold text-xs transition-all duration-200"
                    style={
                      direction === d
                        ? { background: lesson.color, color: "#3C2F2F" }
                        : { color: "#7F6E6A" }
                    }
                  >
                    {d === "fr-to-wo" ? "🇫🇷 → 🇸🇳" : "🇸🇳 → 🇫🇷"}
                  </button>
                ))}
              </div>
              <span className="text-sm font-bold text-[#7F6E6A]">
                {cardIndex + 1} / {lesson.words.length}
              </span>
            </div>

            {/* Progress */}
            <div className="clay-card p-1.5 mb-6 rounded-full overflow-hidden">
              <div
                className="h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${((cardIndex + 1) / lesson.words.length) * 100}%`,
                  background: `linear-gradient(90deg, ${lesson.color}, ${lesson.color}BB)`
                }}
              />
            </div>

            {/* Flip card */}
            <div
              className="flip-card cursor-pointer select-none mb-6"
              style={{ height: 280 }}
              onClick={handleFlip}
            >
              <div className={`flip-card-inner w-full h-full ${flipped ? "flipped" : ""}`}>
                {/* Front */}
                <div className="flip-card-front clay-card w-full h-full flex flex-col items-center justify-center p-8">
                  <span className="text-xs font-bold px-3 py-1 rounded-full mb-6"
                    style={{ background: lesson.bgColor, color: "#3C2F2F" }}>
                    {frontLabel}
                  </span>
                  <p className="text-4xl font-black text-[#3C2F2F] text-center leading-tight mb-4">{front}</p>
                  <p className="text-sm text-[#7F6E6A] font-medium">Appuie pour révéler 👆</p>
                </div>
                {/* Back */}
                <div className="flip-card-back clay-card w-full h-full flex flex-col items-center justify-center p-8"
                  style={{ background: lesson.bgColor }}>
                  <span className="text-xs font-bold px-3 py-1 rounded-full mb-4"
                    style={{ background: lesson.color, color: "#3C2F2F" }}>
                    {backLabel}
                  </span>
                  <p className="text-4xl font-black text-[#3C2F2F] text-center leading-tight mb-3">{back}</p>
                  {direction === "fr-to-wo" && (
                    <p className="text-sm text-[#7F6E6A] italic font-medium">/{currentWord.phonetic}/</p>
                  )}
                  {currentWord.example && (
                    <p className="text-xs text-center text-[#7F6E6A] mt-3 max-w-xs">
                      💬 &quot;{currentWord.example}&quot;
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={prevCard}
                className="clay-btn w-14 h-14 flex items-center justify-center text-xl bg-white font-bold"
              >
                ←
              </button>
              <button
                onClick={() => setFlipped(false)}
                className="clay-btn px-6 py-3 text-sm font-bold text-white"
                style={{ background: "linear-gradient(135deg, #B8A3FF, #9F87EE)" }}
              >
                Retourner 🔄
              </button>
              <button
                onClick={nextCard}
                className="clay-btn w-14 h-14 flex items-center justify-center text-xl bg-white font-bold"
              >
                →
              </button>
            </div>

            <p className="text-center text-sm text-[#7F6E6A] font-medium mt-6">
              Ou utilise les flèches du clavier ⌨️
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
