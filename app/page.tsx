"use client";

import Link from "next/link";
import { lessons } from "@/lib/wolof-data";
import { useProgressStore, getLevelForXP } from "@/lib/progress-store";
import { ProgressCard, XPToast } from "@/components/ProgressUI";

export default function Home() {
  const totalXP = useProgressStore((s) => s.totalXP);
  const lessonStats = useProgressStore((s) => s.lessonStats);
  const level = getLevelForXP(totalXP);

  return (
    <div className="min-h-screen" style={{ background: "#F7F3EE" }}>
      <XPToast />

      {/* Header */}
      <header className="clay-card mx-4 mt-4 px-6 py-4 flex items-center justify-between sticky top-4 z-50 bg-white/90 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🌍</span>
          <div>
            <h1 className="font-extrabold text-xl text-[#3C2F2F] leading-none">WolofLearn</h1>
            <p className="text-xs text-[#7F6E6A] font-medium">Français → Wolof</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold"
            style={{ background: level.bgColor, color: "#3C2F2F" }}
          >
            <span>{level.emoji}</span>
            <span>Niv. {level.level}</span>
            <span className="text-[#7F6E6A]">· {totalXP} XP</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-20">
        {/* Hero */}
        <section className="text-center pt-12 pb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6"
            style={{ background: "#BFE7D2", color: "#2D7A5A" }}>
            ✨ Bienvenue — Dalal ak jam !
          </div>
          <h2 className="text-5xl sm:text-6xl font-black text-[#3C2F2F] leading-tight mb-4">
            Apprenez le{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Wolof</span>
              <span className="absolute -bottom-1 left-0 right-0 h-4 rounded-full -z-0"
                style={{ background: "#B8A3FF", opacity: 0.4 }}></span>
            </span>
          </h2>
          <p className="text-lg text-[#7F6E6A] max-w-xl mx-auto font-medium mb-8">
            La langue la plus parlée au Sénégal et en Gambie. <br />
            Apprends avec des flashcards, des leçons et des quiz interactifs.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/leçons" className="clay-btn px-8 py-4 text-lg font-bold text-white inline-block"
              style={{ background: "linear-gradient(135deg, #B8A3FF, #9F87EE)" }}>
              Commencer à apprendre 🚀
            </Link>
            <Link href="/quiz" className="clay-btn px-8 py-4 text-lg font-bold text-[#3C2F2F] inline-block bg-white">
              Faire un quiz 🎯
            </Link>
          </div>
        </section>

        {/* Progress card */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-black text-[#3C2F2F]">Ma progression</h3>
          </div>
          <ProgressCard />
        </section>

        {/* Stats bar */}
        <section className="clay-card p-6 mb-10 flex flex-wrap gap-6 justify-around">
          {[
            { label: "Leçons", value: lessons.length, emoji: "📚" },
            { label: "Mots & phrases", value: lessons.reduce((a, l) => a + l.words.length, 0), emoji: "💬" },
            { label: "Thèmes", value: "8", emoji: "🎨" },
            { label: "Pays", value: "2", emoji: "🌍" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl mb-1">{stat.emoji}</div>
              <div className="text-3xl font-black text-[#3C2F2F]">{stat.value}+</div>
              <div className="text-sm text-[#7F6E6A] font-medium">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Leçons grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-black text-[#3C2F2F]">Choisir une leçon</h3>
            <Link href="/leçons" className="text-sm font-bold text-[#B8A3FF] hover:underline">
              Voir tout →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lessons.map((lesson) => {
              const stats = lessonStats[lesson.id];
              const done = stats && stats.quizzesDone > 0;
              return (
                <Link key={lesson.id} href={`/leçons/${lesson.id}`}>
                  <div
                    className="clay-card-colored p-6 cursor-pointer hover:scale-[1.02] transition-all duration-200 h-full relative"
                    style={{ background: lesson.bgColor }}
                  >
                    {done && (
                      <div className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full bg-white/80 text-[#3C2F2F]">
                        ✅ {stats.bestScore}/10
                      </div>
                    )}
                    <div className="text-4xl mb-3">{lesson.emoji}</div>
                    <h4 className="font-extrabold text-lg text-[#3C2F2F] mb-1">{lesson.title}</h4>
                    <p className="text-sm text-[#7F6E6A] font-medium mb-4">{lesson.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-3 py-1 rounded-full"
                        style={{ background: lesson.color + "55", color: "#3C2F2F" }}>
                        {lesson.words.length} mots
                      </span>
                      <span className="text-sm font-bold" style={{ color: lesson.color.replace("FF", "CC") }}>
                        Apprendre →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA Quiz */}
        <section className="mt-10">
          <div className="clay-card-colored p-8 text-center rounded-3xl"
            style={{ background: "linear-gradient(135deg, #B8A3FF22, #FFC7A822)" }}>
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-black text-[#3C2F2F] mb-2">Teste tes connaissances !</h3>
            <p className="text-[#7F6E6A] font-medium mb-6">
              Des quiz interactifs pour chaque leçon. Choisis une catégorie et commence !
            </p>
            <Link href="/quiz"
              className="clay-btn px-8 py-4 text-lg font-bold text-white inline-block"
              style={{ background: "linear-gradient(135deg, #FFC7A8, #FF9E7A)" }}>
              Démarrer un quiz 🎮
            </Link>
          </div>
        </section>

        {/* Fun fact */}
        <section className="mt-8">
          <div className="clay-card p-6 flex gap-4 items-start">
            <span className="text-4xl">💡</span>
            <div>
              <h4 className="font-extrabold text-[#3C2F2F] mb-1">Le saviez-vous ?</h4>
              <p className="text-[#7F6E6A] font-medium text-sm leading-relaxed">
                Le <strong>wolof</strong> est la langue maternelle d'environ 40% des Sénégalais et est compris par plus de 80% de la population.
                C'est une langue tonale avec une structure grammaticale unique.
                Le mot <strong className="text-[#B8A3FF]">"Jërejëf"</strong> (merci) est l'un des premiers mots à apprendre !
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
