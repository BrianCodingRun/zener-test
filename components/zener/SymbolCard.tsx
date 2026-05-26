"use client";

import { SymbolType } from "@/lib/symbols";
import { motion } from "framer-motion";

interface SymbolCardProps {
  symbol: string;
  id: SymbolType;
  onClick: (value: SymbolType) => void;
  disabled?: boolean;
}

export default function SymbolCard({
  symbol,
  id,
  onClick,
  disabled,
}: SymbolCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={disabled}
      onClick={() => onClick(id)}
      className="w-24 h-24 rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl text-5xl flex items-center justify-center hover:border-pink-400 hover:shadow-[0_0_40px_rgba(236,72,153,0.45)] transition-all duration-150 disabled:opacity-50 hover:-translate-y-0.5 cursor-pointer"
    >
      {symbol}
    </motion.button>
  );
}
