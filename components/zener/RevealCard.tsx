"use client";

import { motion } from "framer-motion";

interface RevealCardProps {
  symbol?: string;
  revealed: boolean;
  isTransitioning?: boolean;
}

export default function RevealCard({
  symbol,
  revealed,
  isTransitioning = false,
}: RevealCardProps) {
  return (
    <motion.div
      animate={{
        rotateY: revealed ? 180 : 0,
        scale: isTransitioning ? [1, 1.03, 1] : revealed ? 1.05 : 1,
        opacity: isTransitioning ? 0.85 : 1,
        x: isTransitioning ? [0, -2, 2, -2, 0] : 0,
      }}
      transition={{
        rotateY: {
          duration: 0.6,
        },
        scale: {
          repeat: isTransitioning ? Infinity : 0,
          duration: 1.2,
        },
      }}
      className="
        relative
        w-40
        h-56
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900
        flex
        items-center
        justify-center
        text-7xl
        shadow-2xl
      "
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* FACE AVANT */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          backfaceVisibility: "hidden",
        }}
      >
        ◈
      </div>

      {/* FACE ARRIÈRE */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: "rotateY(180deg)",
          backfaceVisibility: "hidden",
        }}
      >
        {revealed ? symbol : null}
      </div>
    </motion.div>
  );
}
