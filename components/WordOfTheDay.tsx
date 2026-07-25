"use client";

import { useState } from "react";
import { getWordOfTheDay } from "@/lib/wolof-data";

export function WordOfTheDay() {
  const [word] = useState(() => getWordOfTheDay());

  return (
    <div
      className="clay-card-colored p-6 max-w-md mx-auto text-center mb-10"
      style={{ background: "#FFF3E0" }}
    >
      <div className="text-xs font-extrabold uppercase tracking-wide text-[#B8863B] mb-2">
        ✨ Mot du jour
      </div>
      <div className="text-3xl font-black text-[#3C2F2F] mb-1">{word.wolof}</div>
      <div className="text-sm text-[#7F6E6A] font-medium mb-2">{word.phonetic}</div>
      <div className="text-lg text-[#3C2F2F] font-bold">{word.french}</div>
      <div className="text-xs font-bold mt-3 inline-block px-3 py-1 rounded-full bg-white/60 text-[#7F6E6A]">
        {word.category}
      </div>
    </div>
  );
}
