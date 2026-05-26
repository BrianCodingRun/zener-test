"use client";

import { symbols, SymbolType } from "@/lib/symbols";
import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import RevealCard from "./RevealCard";
import SymbolCard from "./SymbolCard";

interface GameProps {
  onFinish: (score: number) => void;
}

const TOTAL_ROUNDS = 10;

const successMessages = [
  "OH 👀",
  "Pas mal du tout.",
  "Le hasard commence à paniquer.",
  "Tu caches un pouvoir ?",
  "Suspicious...",
];

const failMessages = [
  "Aïe 😭",
  "Ton instinct est en PLS.",
  "Le cerveau a lag.",
  "C'était presque ça.",
  "Tu réfléchis trop 😌",
];

export default function Game({ onFinish }: GameProps) {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [currentSymbol, setCurrentSymbol] = useState<SymbolType>("circle");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [revealed, setRevealed] = useState(false);
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    generateSymbol();
  }, []);

  const generateSymbol = () => {
    const random = symbols[Math.floor(Math.random() * symbols.length)];

    setCurrentSymbol(random.id as SymbolType);
  };

  const handleSelect = (selected: SymbolType) => {
    if (locked) return;

    setLocked(true);
    setRevealed(true);

    if (selected === currentSymbol) {
      setScore((prev) => prev + 1);
      const randomMessage =
        successMessages[Math.floor(Math.random() * successMessages.length)];

      setFeedback(randomMessage);
    } else {
      const randomMessage =
        failMessages[Math.floor(Math.random() * failMessages.length)];

      setFeedback(randomMessage);
    }

    setTimeout(() => {
      if (round >= TOTAL_ROUNDS) {
        onFinish(selected === currentSymbol ? score + 1 : score);

        return;
      }

      setRevealed(false);
      setIsTransitioning(true);

      setTimeout(() => {
        setRound((prev) => prev + 1);
        generateSymbol();

        setTimeout(() => {
          setIsTransitioning(false);
          setLocked(false);
        }, 600);
      }, 300);
    }, 1500);
  };

  const revealedSymbol = symbols.find((item) => item.id === currentSymbol);

  return (
    <div className="flex flex-col items-center gap-10 w-full">
      <ProgressBar current={round} total={TOTAL_ROUNDS} />
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Manche {round}</h2>

        <p className="text-zinc-400">
          Choisissez le symbole que vous ressentez.
        </p>
      </div>

      {feedback && (
        <div className="text-xl font-bold text-center text-pink-300 animate-pulse">
          {feedback}
        </div>
      )}
      <div className="relative">
        <div className="absolute inset-0 bg-violet-500/30 blur-3xl" />

        <RevealCard
          revealed={revealed}
          symbol={revealedSymbol?.symbol}
          isTransitioning={isTransitioning}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {symbols.map((item) => (
          <SymbolCard
            key={item.id}
            symbol={item.symbol}
            id={item.id as SymbolType}
            onClick={handleSelect}
            disabled={locked}
          />
        ))}
      </div>
    </div>
  );
}
