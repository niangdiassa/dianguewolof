"use client";

import { useEffect, useRef, useState } from "react";
import { useProgressStore, getLevelForXP, getProgressPercent, XPEvent } from "@/lib/progress-store";

/** Floating +XP toast that appears when XP is earned */
export function XPToast() {
  const recentEvents = useProgressStore((s) => s.recentEvents);
  const [visible, setVisible] = useState<XPEvent | null>(null);
  const prevLen = useRef(0);

  useEffect(() => {
    if (recentEvents.length > prevLen.current) {
      const latest = recentEvents[0];
      setVisible(latest);
      const t = setTimeout(() => setVisible(null), 2200);
      prevLen.current = recentEvents.length;
      return () => clearTimeout(t);
    }
    prevLen.current = recentEvents.length;
  }, [recentEvents]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[200] pointer-events-none"
      style={{ animation: "xpPop 2.2s ease forwards" }}
    >
      <div
        className="px-5 py-3 rounded-full font-extrabold text-white text-base shadow-lg flex items-center gap-2 whitespace-nowrap"
        style={{ background: "linear-gradient(135deg, #B8A3FF, #9F87EE)" }}
      >
        <span className="text-lg">⭐</span>
        +{visible.xp} XP
      </div>

      <style>{`
        @keyframes xpPop {
          0%   { opacity: 0; transform: translateX(-50%) translateY(16px) scale(0.8); }
          15%  { opacity: 1; transform: translateX(-50%) translateY(0)    scale(1.08); }
          30%  { transform: translateX(-50%) translateY(0) scale(1); }
          70%  { opacity: 1; transform: translateX(-50%) translateY(-8px) scale(1); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-28px) scale(0.9); }
        }
      `}</style>
    </div>
  );
}

/** Compact level badge for headers */
export function LevelBadge() {
  const totalXP = useProgressStore((s) => s.totalXP);
  const level = getLevelForXP(totalXP);
  const pct = getProgressPercent(totalXP);

  return (
    <div
      className="clay-card flex items-center gap-2 px-3 py-1.5 rounded-full cursor-default select-none"
      title={`${totalXP} XP — Niveau ${level.level}: ${level.title}`}
    >
      <span className="text-base">{level.emoji}</span>
      <div className="flex flex-col items-start" style={{ minWidth: 52 }}>
        <span className="text-xs font-extrabold text-[#3C2F2F] leading-none">Niv. {level.level}</span>
        <div className="w-full rounded-full overflow-hidden mt-0.5" style={{ height: 5, background: "#F7F3EE" }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, background: level.color }}
          />
        </div>
      </div>
      <span className="text-xs font-bold text-[#7F6E6A]">{totalXP} XP</span>
    </div>
  );
}

/** Full progress card for the profile / home page */
export function ProgressCard() {
  const totalXP = useProgressStore((s) => s.totalXP);
  const streak = useProgressStore((s) => s.streak);
  const lessonStats = useProgressStore((s) => s.lessonStats);
  const level = getLevelForXP(totalXP);
  const pct = getProgressPercent(totalXP);
  const nextLevel = level.level < 8 ? level.level + 1 : null;
  const xpToNext = nextLevel ? level.maxXP - totalXP : 0;
  const quizzesTotal = Object.values(lessonStats).reduce((a, s) => a + s.quizzesDone, 0);
  const flashcardsTotal = Object.values(lessonStats).reduce((a, s) => a + s.flashcardsFlipped, 0);

  return (
    <div className="clay-card p-6">
      {/* Level header */}
      <div className="flex items-center gap-4 mb-5">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
          style={{ background: level.bgColor }}
        >
          {level.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-extrabold text-lg text-[#3C2F2F]">Niveau {level.level}</span>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: level.bgColor, color: "#3C2F2F" }}
            >
              {level.title}
            </span>
          </div>
          <p className="text-sm text-[#7F6E6A] font-medium">
            {totalXP} XP
            {nextLevel && (
              <span className="text-xs"> · encore {xpToNext} XP pour le niveau {nextLevel}</span>
            )}
          </p>
        </div>
        {streak > 0 && (
          <div className="text-center flex-shrink-0">
            <div className="text-2xl">🔥</div>
            <div className="text-xs font-extrabold text-[#3C2F2F]">{streak}j</div>
          </div>
        )}
      </div>

      {/* XP bar */}
      <div className="mb-5">
        <div className="flex justify-between text-xs font-bold text-[#7F6E6A] mb-1.5">
          <span>{level.minXP} XP</span>
          <span>{pct}%</span>
          <span>{level.maxXP === 9999 ? "MAX" : `${level.maxXP} XP`}</span>
        </div>
        <div className="rounded-full overflow-hidden" style={{ height: 14, background: "#F7F3EE" }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${pct}%`,
              background: `linear-gradient(90deg, ${level.color}, ${level.color}BB)`,
            }}
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Quiz joués", value: quizzesTotal, emoji: "🎯" },
          { label: "Flashcards", value: flashcardsTotal, emoji: "🃏" },
          { label: "Série", value: `${streak}j`, emoji: "🔥" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="text-center rounded-2xl py-3"
            style={{ background: "#F7F3EE" }}
          >
            <div className="text-xl mb-0.5">{stat.emoji}</div>
            <div className="text-lg font-black text-[#3C2F2F]">{stat.value}</div>
            <div className="text-xs text-[#7F6E6A] font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Level-up celebration overlay */
export function LevelUpOverlay({
  newLevel,
  onClose,
}: {
  newLevel: number;
  onClose: () => void;
}) {
  const { LEVELS } = require("@/lib/progress-store");
  const lvl = LEVELS[newLevel - 1];
  if (!lvl) return null;
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className="clay-card p-10 text-center max-w-sm mx-4"
        style={{ animation: "levelUpPop 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        <div className="text-7xl mb-4">{lvl.emoji}</div>
        <div
          className="text-xs font-bold px-3 py-1 rounded-full inline-block mb-3"
          style={{ background: lvl.bgColor, color: "#3C2F2F" }}
        >
          NIVEAU SUPÉRIEUR !
        </div>
        <h2 className="text-3xl font-black text-[#3C2F2F] mb-1">Niveau {newLevel}</h2>
        <p className="text-xl font-extrabold mb-6" style={{ color: lvl.color }}>
          {lvl.title}
        </p>
        <button
          onClick={onClose}
          className="clay-btn px-8 py-3 font-bold text-white"
          style={{ background: `linear-gradient(135deg, ${lvl.color}, ${lvl.color}BB)` }}
        >
          Continuer 🚀
        </button>
      </div>
      <style>{`
        @keyframes levelUpPop {
          0%   { opacity:0; transform: scale(0.5) rotate(-4deg); }
          100% { opacity:1; transform: scale(1) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
