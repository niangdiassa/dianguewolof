"use client";

import { useState, use } from "react";
import Link from "next/link";
import { lessons, generateQuiz, QuizQuestion } from "@/lib/wolof-data";
import { notFound } from "next/navigation";
import { useProgressStore, getLevelForXP, LEVELS } from "@/lib/progress-store";
import { LevelBadge, XPToast, LevelUpOverlay } from "@/components/ProgressUI";

type GameState = "intro" | "playing" | "result";

export default function QuizGamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const lesson = lessons.find((l) => l.id === id);
  if (!lesson) notFound();

  const [gameState, setGameState] = useState<GameState>("intro");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<QuizQuestion[]>([]);
  const [levelUpTo, setLevelUpTo] = useState<number | null>(null);

  const totalXP = useProgressStore((s) => s.totalXP);
  const recordQuizResult = useProgressStore((s) => s.recordQuizResult);
  const lessonStats = useProgressStore((s) => s.lessonStats);

  const startQuiz = () => {
    const qs = generateQuiz(id, Math.min(10, lesson.words.length));
    setQuestions(qs);
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setWrongAnswers([]);
    setLevelUpTo(null);
    setGameState("playing");
  };

  const handleAnswer = (choice: string) => {
    if (answered) return;
    setSelected(choice);
    setAnswered(true);
    if (choice === questions[currentQ].correct) {
      setScore((s) => s + 1);
    } else {
      setWrongAnswers((w) => [...w, questions[currentQ]]);
    }
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= questions.length) {
      // compute final score including the current answer
      const finalScore = score + (selected === questions[currentQ].correct ? 0 : 0);
      const prevLevel = getLevelForXP(totalXP).level;
      recordQuizResult(id, score, questions.length);
      // check for level-up after zustand update (next tick)
      setTimeout(() => {
        const newXP = useProgressStore.getState().totalXP;
        const newLevel = getLevelForXP(newXP).level;
        if (newLevel > prevLevel) {
          setLevelUpTo(newLevel);
        }
      }, 100);
      setGameState("result");
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const q = questions[currentQ];
  const progress = questions.length > 0 ? ((currentQ + 1) / questions.length) * 100 : 0;

  const scoreEmoji = score === questions.length ? "🏆" : score >= questions.length * 0.7 ? "🎉" : score >= questions.length * 0.5 ? "👍" : "📚";
  const scoreMessage =
    score === questions.length
      ? "Parfait ! Tu maîtrises ce thème !"
      : score >= questions.length * 0.7
      ? "Très bien ! Continue comme ça !"
      : score >= questions.length * 0.5
      ? "Pas mal ! Encore un peu de pratique !"
      : "Continue à pratiquer, tu vas y arriver !";

  // XP preview (what will be earned)
  const xpPreview = score * 10 + (score === questions.length ? 50 : score / questions.length >= 0.7 ? 20 : 0);
  const bestScore = lessonStats[id]?.bestScore ?? 0;

  return (
    <div className="min-h-screen" style={{ background: "#F7F3EE" }}>
      <XPToast />
      {levelUpTo && (
        <LevelUpOverlay
          newLevel={levelUpTo}
          onClose={() => setLevelUpTo(null)}
        />
      )}

      {/* Header */}
      <header className="clay-card mx-4 mt-4 px-6 py-4 flex items-center gap-3 sticky top-4 z-50 bg-white/90 backdrop-blur-sm">
        <Link href="/quiz" className="text-2xl hover:scale-110 transition-transform flex-shrink-0">←</Link>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-2xl flex-shrink-0">{lesson.emoji}</span>
          <div className="min-w-0">
            <h1 className="font-extrabold text-lg text-[#3C2F2F] leading-none truncate">Quiz — {lesson.title}</h1>
            {gameState === "playing" && (
              <p className="text-xs text-[#7F6E6A] font-medium">{currentQ + 1} / {questions.length}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <LevelBadge />
          {gameState === "playing" && (
            <div className="clay-card px-3 py-1.5 rounded-full">
              <span className="font-extrabold text-sm text-[#3C2F2F]">⭐ {score}</span>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-8 pb-20">
        {/* Intro */}
        {gameState === "intro" && (
          <div className="text-center">
            <div className="clay-card p-10 mb-8">
              <div className="text-7xl mb-6">{lesson.emoji}</div>
              <h2 className="text-3xl font-black text-[#3C2F2F] mb-3">{lesson.title}</h2>
              <p className="text-[#7F6E6A] font-medium mb-6">{lesson.description}</p>

              {/* XP rewards preview */}
              <div className="clay-card p-4 rounded-2xl mb-6" style={{ background: "#EDE9FF" }}>
                <p className="text-xs font-extrabold text-[#3C2F2F] mb-3">🏆 Récompenses XP possibles</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="font-extrabold text-[#3C2F2F]">+10 XP</div>
                    <div className="text-xs text-[#7F6E6A]">par bonne réponse</div>
                  </div>
                  <div>
                    <div className="font-extrabold text-[#B8A3FF]">+20 XP</div>
                    <div className="text-xs text-[#7F6E6A]">bonus ≥ 70%</div>
                  </div>
                  <div>
                    <div className="font-extrabold text-[#FFD580]">+50 XP</div>
                    <div className="text-xs text-[#7F6E6A]">quiz parfait</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center mb-8">
                <div className="clay-card px-5 py-3 rounded-2xl text-center">
                  <div className="text-2xl font-black text-[#3C2F2F]">{Math.min(10, lesson.words.length)}</div>
                  <div className="text-xs text-[#7F6E6A] font-medium">Questions</div>
                </div>
                <div className="clay-card px-5 py-3 rounded-2xl text-center">
                  <div className="text-2xl font-black text-[#3C2F2F]">4</div>
                  <div className="text-xs text-[#7F6E6A] font-medium">Choix</div>
                </div>
                {bestScore > 0 && (
                  <div className="clay-card px-5 py-3 rounded-2xl text-center"
                    style={{ background: lesson.bgColor }}>
                    <div className="text-2xl font-black text-[#3C2F2F]">{bestScore}/10</div>
                    <div className="text-xs text-[#7F6E6A] font-medium">Meilleur score</div>
                  </div>
                )}
              </div>
              <button
                onClick={startQuiz}
                className="clay-btn px-10 py-4 text-lg font-bold text-white w-full"
                style={{ background: "linear-gradient(135deg, #B8A3FF, #9F87EE)" }}
              >
                Commencer le quiz 🚀
              </button>
            </div>
            <Link href={`/lecons/${lesson.id}`}
              className="text-sm font-bold text-[#B8A3FF] hover:underline">
              Réviser la leçon d'abord 📖
            </Link>
          </div>
        )}

        {/* Playing */}
        {gameState === "playing" && q && (
          <div>
            {/* Progress bar */}
            <div className="clay-card p-1.5 mb-6 rounded-full overflow-hidden">
              <div
                className="h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${lesson.color}, ${lesson.color}BB)`
                }}
              />
            </div>

            {/* Question */}
            <div className="clay-card p-8 mb-6 text-center">
              <div className="text-xs font-bold px-3 py-1 rounded-full inline-block mb-4"
                style={{ background: lesson.bgColor, color: "#3C2F2F" }}>
                {q.direction === "fr-to-wo" ? "🇫🇷 Traduire en Wolof" : "🇸🇳 Traduire en Français"}
              </div>
              <p className="text-3xl font-black text-[#3C2F2F] mb-2">{q.question}</p>
              <p className="text-sm text-[#7F6E6A] font-medium">Choisissez la bonne traduction</p>
            </div>

            {/* Choices */}
            <div className="grid grid-cols-1 gap-3 mb-6">
              {q.choices.map((choice, i) => {
                const isSelected = selected === choice;
                const isCorrect = choice === q.correct;
                let bgStyle: React.CSSProperties = { background: "#FFFFFF" };
                let borderColor = "transparent";
                let textColor = "#3C2F2F";

                if (answered) {
                  if (isCorrect) {
                    bgStyle = { background: "#BFE7D2" };
                    borderColor = "#2D7A5A";
                    textColor = "#2D7A5A";
                  } else if (isSelected && !isCorrect) {
                    bgStyle = { background: "#FFE0E0" };
                    borderColor = "#FF6B6B";
                    textColor = "#CC3333";
                  }
                } else if (isSelected) {
                  bgStyle = { background: lesson.bgColor };
                  borderColor = lesson.color;
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(choice)}
                    disabled={answered}
                    className={`clay-card p-5 text-left font-bold text-base transition-all duration-200 ${!answered ? "hover:scale-[1.01] cursor-pointer" : ""}`}
                    style={{
                      ...bgStyle,
                      borderColor,
                      borderWidth: borderColor !== "transparent" ? 2 : 0,
                      color: textColor,
                    }}
                  >
                    <span className="mr-3 font-black text-[#7F6E6A]">
                      {["A", "B", "C", "D"][i]}.
                    </span>
                    {choice}
                    {answered && isCorrect && <span className="ml-2">✅</span>}
                    {answered && isSelected && !isCorrect && <span className="ml-2">❌</span>}
                  </button>
                );
              })}
            </div>

            {/* Next button */}
            {answered && (
              <div className="text-center">
                <div className="clay-card p-4 mb-4 rounded-2xl flex items-center justify-between"
                  style={{ background: selected === q.correct ? "#BFE7D2" : "#FFE0E0" }}>
                  <p className="font-bold text-sm" style={{ color: selected === q.correct ? "#2D7A5A" : "#CC3333" }}>
                    {selected === q.correct
                      ? `✅ Correct !`
                      : `❌ Réponse : "${q.correct}"`}
                  </p>
                  {selected === q.correct && (
                    <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-white text-[#2D7A5A]">
                      +10 XP ⭐
                    </span>
                  )}
                </div>
                <button
                  onClick={nextQuestion}
                  className="clay-btn px-10 py-4 text-lg font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #B8A3FF, #9F87EE)" }}
                >
                  {currentQ + 1 >= questions.length ? "Voir les résultats 🏁" : "Question suivante →"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Result */}
        {gameState === "result" && (
          <div className="text-center">
            <div className="clay-card p-10 mb-6">
              <div className="text-7xl mb-4">{scoreEmoji}</div>
              <h2 className="text-3xl font-black text-[#3C2F2F] mb-2">{scoreMessage}</h2>
              <div className="text-6xl font-black my-6" style={{ color: lesson.color }}>
                {score} / {questions.length}
              </div>
              <div className="w-full rounded-full overflow-hidden mb-4"
                style={{ height: 16, background: "#F7F3EE" }}>
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${(score / questions.length) * 100}%`,
                    background: `linear-gradient(90deg, ${lesson.color}, ${lesson.color}BB)`
                  }}
                />
              </div>
              <p className="text-[#7F6E6A] font-medium mb-4">
                {Math.round((score / questions.length) * 100)}% de réussite
              </p>

              {/* XP earned summary */}
              <div className="clay-card p-4 rounded-2xl" style={{ background: "#EDE9FF" }}>
                <p className="text-sm font-extrabold text-[#3C2F2F] mb-2">⭐ XP gagnés ce quiz</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="text-sm font-bold px-3 py-1 rounded-full bg-white text-[#3C2F2F]">
                    +{score * 10} XP (réponses)
                  </span>
                  {score === questions.length && (
                    <span className="text-sm font-bold px-3 py-1 rounded-full bg-white text-[#FFB800]">
                      +50 XP 🏆 parfait
                    </span>
                  )}
                  {score < questions.length && score / questions.length >= 0.7 && (
                    <span className="text-sm font-bold px-3 py-1 rounded-full bg-white text-[#B8A3FF]">
                      +20 XP 🎉 bonus
                    </span>
                  )}
                </div>
                <p className="text-base font-extrabold text-[#B8A3FF] mt-2">
                  Total : +{xpPreview} XP
                </p>
              </div>
            </div>

            {wrongAnswers.length > 0 && (
              <div className="clay-card p-6 mb-6 text-left">
                <h3 className="font-extrabold text-[#3C2F2F] mb-4">📝 À réviser :</h3>
                <div className="space-y-2">
                  {wrongAnswers.map((wa, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-2xl"
                      style={{ background: "#FFF0E8" }}>
                      <span className="text-red-400">❌</span>
                      <span className="font-bold text-[#3C2F2F]">{wa.question}</span>
                      <span className="text-[#7F6E6A]">→</span>
                      <span className="font-bold" style={{ color: lesson.color }}>
                        {wa.correct}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button
                onClick={startQuiz}
                className="clay-btn px-8 py-4 text-lg font-bold text-white"
                style={{ background: "linear-gradient(135deg, #B8A3FF, #9F87EE)" }}
              >
                Recommencer 🔄
              </button>
              <Link href={`/lecons/${lesson.id}`}
                className="clay-btn px-8 py-4 text-lg font-bold text-[#3C2F2F] bg-white block">
                Réviser la leçon 📖
              </Link>
              <Link href="/quiz"
                className="text-sm font-bold text-[#B8A3FF] hover:underline py-2">
                Choisir un autre quiz →
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
