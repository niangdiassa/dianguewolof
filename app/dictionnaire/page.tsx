"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { dictionary } from "@/lib/wolof-data";

export default function DictionnairePage() {
  const [query, setQuery] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(dictionary.map((d) => d.category))),
    []
  );
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return dictionary.filter((entry) => {
      const matchesQuery =
        !q ||
        entry.french.toLowerCase().includes(q) ||
        entry.wolof.toLowerCase().includes(q);
      const matchesCategory = !activeCategory || entry.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  return (
    <div className="min-h-screen" style={{ background: "#F7F3EE" }}>
      <header className="clay-card mx-4 mt-4 px-6 py-4 flex items-center gap-4 sticky top-4 z-50 bg-white/90 backdrop-blur-sm">
        <Link href="/" className="text-2xl hover:scale-110 transition-transform">←</Link>
        <div className="flex items-center gap-3">
          <span className="text-2xl">📔</span>
          <h1 className="font-extrabold text-xl text-[#3C2F2F]">Dictionnaire</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-8 pb-20">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-black text-[#3C2F2F] mb-2">Dictionnaire Wolof–Français</h2>
          <p className="text-[#7F6E6A] font-medium">{dictionary.length} mots et expressions</p>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un mot en français ou en wolof..."
          className="w-full rounded-2xl px-5 py-3 mb-4 border-2 border-[#EFE6DA] focus:border-[#B8A3FF] outline-none font-medium text-[#3C2F2F]"
        />

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveCategory(null)}
            className={`text-xs font-bold px-3 py-1.5 rounded-full ${
              activeCategory === null ? "bg-[#B8A3FF] text-white" : "bg-white/70 text-[#3C2F2F]"
            }`}
          >
            Tous
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                activeCategory === cat ? "bg-[#B8A3FF] text-white" : "bg-white/70 text-[#3C2F2F]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {results.map((entry, i) => (
            <div
              key={`${entry.french}-${entry.wolof}-${i}`}
              className="clay-card px-5 py-3 flex items-center justify-between bg-white/80"
            >
              <div>
                <div className="font-extrabold text-[#3C2F2F]">{entry.wolof}</div>
                <div className="text-xs text-[#7F6E6A]">{entry.phonetic}</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-[#3C2F2F]">{entry.french}</div>
                <div className="text-[10px] font-bold text-[#B8A3FF] uppercase">{entry.category}</div>
              </div>
            </div>
          ))}
          {results.length === 0 && (
            <p className="text-center text-[#7F6E6A] font-medium py-10">Aucun résultat trouvé.</p>
          )}
        </div>
      </main>
    </div>
  );
}
