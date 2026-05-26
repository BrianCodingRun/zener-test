"use client";

import Game from "@/components/zener/Game";
import Intro from "@/components/zener/Intro";
import Result from "@/components/zener/Result";
import { useState } from "react";

type Step = "intro" | "game" | "result";

export default function Home() {
  const [step, setStep] = useState<Step>("intro");
  const [finalScore, setFinalScore] = useState(0);

  const handleFinish = (score: number) => {
    setFinalScore(score);
    setStep("result");
  };

  const handleRestart = () => {
    setFinalScore(0);
    setStep("intro");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-[#140019] via-[#09090b] to-[#001220] text-white flex items-center justify-center px-6 py-10 relative">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.15),transparent_40%)]" />

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-fuchsia-500/20 blur-3xl rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="relative z-10 w-full max-w-5xl">
        {step === "intro" && <Intro onStart={() => setStep("game")} />}

        {step === "game" && <Game onFinish={handleFinish} />}

        {step === "result" && (
          <Result score={finalScore} onRestart={handleRestart} />
        )}
      </div>
    </main>
  );
}
