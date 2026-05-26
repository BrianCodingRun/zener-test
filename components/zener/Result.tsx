"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ResultProps {
  score: number;
  onRestart: () => void;
}

type ScoreEntry = {
  name: string;
  score: number;
  title: string;
};

export default function Result({ score, onRestart }: ResultProps) {
  const [name, setName] = useState("");
  const [ranking, setRanking] = useState<ScoreEntry[]>([]);

  const percentage = score * 10;

  const getMessage = () => {
    if (score <= 2) {
      return "Le hasard vous ignore totalement.";
    }

    if (score <= 5) {
      return "Votre intuition semble stable.";
    }

    if (score <= 7) {
      return "Votre intuition est intrigante...";
    }

    return "Suspicion d'activité paranormale 👀";
  };

  const getTitle = () => {
    if (score <= 2) return "NPC cosmique";
    if (score <= 4) return "Humain standard";
    if (score <= 6) return "Oracle discount";
    if (score <= 8) return "Medium freelance";

    return "Être interdimensionnel";
  };

  const saveScore = async () => {
    if (!name.trim()) return;

    const newEntry = {
      name,
      score,
      title: getTitle(),
    };

    const res = await fetch("/api/ranking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntry),
    });

    const updated = await res.json();

    setRanking(updated);
  };

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/ranking");

      const data = await res.json();

      setRanking(data);
    })();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center gap-8"
    >
      <div className="space-y-4">
        <h2 className="text-7xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          {score}/10
        </h2>
        <div className="text-2xl font-bold text-cyan-300">{getTitle()}</div>

        <p className="text-zinc-300 text-xl max-w-md">{getMessage()}</p>

        <div className="w-full max-w-md space-y-4">
          <input
            type="text"
            placeholder="Ton prénom 👀"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none           focus:border-pink-400"
          />

          <Button
            onClick={saveScore}
            className="
              w-full
              rounded-2xl
              bg-pink-500
              hover:bg-pink-600
            "
          >
            Voir mon classement 🏆
          </Button>
        </div>
        {ranking.length > 0 && (
          <div className="w-full max-w-xl space-y-3 pt-8">
            <h3 className="text-2xl font-bold text-center">
              Classement cosmique 🧠
            </h3>

            {ranking.map((player, index) => (
              <div
                key={index}
                className="
          flex
          items-center
          justify-between
          rounded-2xl
          border
          border-white/10
          bg-white/5
          px-5
          py-4
          backdrop-blur-xl
        "
              >
                <div>
                  <div className="font-bold text-white">
                    #{index + 1} {player.name}
                  </div>

                  <div className="text-sm text-zinc-400">{player.title}</div>
                </div>

                <div className="text-2xl font-black text-cyan-300">
                  {player.score}/10
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full max-w-md h-4 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-cyan-400"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-zinc-500 text-sm">
        Le hasard attendu est {"d'"}environ 20%.
      </p>
      <Button
        onClick={onRestart}
        size="lg"
        className="rounded-2xl bg-violet-500 hover:bg-violet-600"
      >
        Retenter ma destinée 🔮
      </Button>
    </motion.div>
  );
}
