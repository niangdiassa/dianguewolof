import { create } from "zustand";
import { persist } from "zustand/middleware";

// ── XP & Level config ────────────────────────────────────────────────
export const XP_PER_CORRECT = 10;
export const XP_PER_QUIZ_BONUS = 20;   // bonus si score ≥ 70%
export const XP_PER_PERFECT = 50;      // bonus si score parfait
export const XP_PER_FLASHCARD = 2;     // retourner une flashcard

export interface Level {
  level: number;
  title: string;
  emoji: string;
  minXP: number;
  maxXP: number;
  color: string;
  bgColor: string;
}

export const LEVELS: Level[] = [
  { level: 1, title: "Débutant",       emoji: "🌱", minXP: 0,    maxXP: 100,  color: "#BFE7D2", bgColor: "#E8F8F0" },
  { level: 2, title: "Apprenti",       emoji: "📖", minXP: 100,  maxXP: 250,  color: "#A8D8FF", bgColor: "#E0F0FF" },
  { level: 3, title: "Explorateur",    emoji: "🧭", minXP: 250,  maxXP: 500,  color: "#FFE28A", bgColor: "#FFF9E0" },
  { level: 4, title: "Élève",          emoji: "🎓", minXP: 500,  maxXP: 850,  color: "#FFC7A8", bgColor: "#FFF0E8" },
  { level: 5, title: "Intermédiaire",  emoji: "💪", minXP: 850,  maxXP: 1300, color: "#FF9EBC", bgColor: "#FFE8F0" },
  { level: 6, title: "Avancé",         emoji: "⚡", minXP: 1300, maxXP: 1900, color: "#C3F0A2", bgColor: "#EEFBE0" },
  { level: 7, title: "Expert",         emoji: "🌟", minXP: 1900, maxXP: 2700, color: "#B8A3FF", bgColor: "#EDE9FF" },
  { level: 8, title: "Maître Wolof",   emoji: "🏆", minXP: 2700, maxXP: 9999, color: "#FFD580", bgColor: "#FFF6D6" },
];

export function getLevelForXP(xp: number): Level {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) return LEVELS[i];
  }
  return LEVELS[0];
}

export function getProgressPercent(xp: number): number {
  const lvl = getLevelForXP(xp);
  if (lvl.level === LEVELS[LEVELS.length - 1].level) return 100;
  const range = lvl.maxXP - lvl.minXP;
  const progress = xp - lvl.minXP;
  return Math.min(100, Math.round((progress / range) * 100));
}

// ── Per-lesson stats ─────────────────────────────────────────────────
export interface LessonStats {
  lessonId: string;
  bestScore: number;       // 0–10
  quizzesDone: number;
  flashcardsFlipped: number;
  lastPlayedAt: number;    // timestamp
}

// ── Store ────────────────────────────────────────────────────────────
export interface XPEvent {
  id: string;
  label: string;
  xp: number;
  at: number;
}

interface ProgressState {
  totalXP: number;
  streak: number;           // jours consécutifs
  lastActivityDate: string; // YYYY-MM-DD
  lessonStats: Record<string, LessonStats>;
  recentEvents: XPEvent[];  // last 20

  // actions
  addXP: (amount: number, label: string) => void;
  recordQuizResult: (lessonId: string, score: number, total: number) => void;
  recordFlashcard: (lessonId: string) => void;
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      totalXP: 0,
      streak: 0,
      lastActivityDate: "",
      lessonStats: {},
      recentEvents: [],

      addXP(amount, label) {
        const today = todayStr();
        const { lastActivityDate, streak } = get();
        let newStreak = streak;
        if (lastActivityDate !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yStr = yesterday.toISOString().slice(0, 10);
          newStreak = lastActivityDate === yStr ? streak + 1 : 1;
        }

        const event: XPEvent = {
          id: `${Date.now()}-${Math.random()}`,
          label,
          xp: amount,
          at: Date.now(),
        };

        set((s) => ({
          totalXP: s.totalXP + amount,
          streak: newStreak,
          lastActivityDate: today,
          recentEvents: [event, ...s.recentEvents].slice(0, 20),
        }));
      },

      recordQuizResult(lessonId, score, total) {
        const { addXP, lessonStats } = get();
        const existing = lessonStats[lessonId];
        const percent = score / total;

        // XP for correct answers
        addXP(score * XP_PER_CORRECT, `Quiz ${lessonId}: ${score}/${total} correctes`);

        // Bonuses
        if (percent >= 1) {
          addXP(XP_PER_PERFECT, "🏆 Quiz parfait !");
        } else if (percent >= 0.7) {
          addXP(XP_PER_QUIZ_BONUS, "🎉 Bonus quiz réussi");
        }

        set((s) => ({
          lessonStats: {
            ...s.lessonStats,
            [lessonId]: {
              lessonId,
              bestScore: Math.max(score, existing?.bestScore ?? 0),
              quizzesDone: (existing?.quizzesDone ?? 0) + 1,
              flashcardsFlipped: existing?.flashcardsFlipped ?? 0,
              lastPlayedAt: Date.now(),
            },
          },
        }));
      },

      recordFlashcard(lessonId) {
        const { addXP, lessonStats } = get();
        const existing = lessonStats[lessonId];
        // Award XP only for the first 20 flips per day (anti-farming)
        const flipped = existing?.flashcardsFlipped ?? 0;
        if (flipped < 20) {
          addXP(XP_PER_FLASHCARD, `Flashcard ${lessonId}`);
        }
        set((s) => ({
          lessonStats: {
            ...s.lessonStats,
            [lessonId]: {
              lessonId,
              bestScore: existing?.bestScore ?? 0,
              quizzesDone: existing?.quizzesDone ?? 0,
              flashcardsFlipped: flipped + 1,
              lastPlayedAt: Date.now(),
            },
          },
        }));
      },
    }),
    { name: "wolof-progress-v1" }
  )
);
