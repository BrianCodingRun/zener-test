"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface IntroProps {
  onStart: () => void;
}

export default function Intro({ onStart }: IntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center gap-6"
    >
      <div className="space-y-4">
        <h1 className="text-6xl font-black tracking-[0.3em] uppercase bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          ZENER LAB
        </h1>

        <p className="text-zinc-400 text-lg max-w-md">
          Découvrons si ton cerveau possède des pouvoirs… ou juste du culot 👀
        </p>
      </div>

      <Button
        onClick={onStart}
        size="lg"
        className="bg-violet-500 hover:bg-violet-600 text-white rounded-2xl px-8 h-12 cursor-pointer"
      >
        Tester mon cerveau 🧠
      </Button>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-zinc-300">
        🔮 10 manches • 20% de chance • zéro pression
      </div>
    </motion.div>
  );
}
