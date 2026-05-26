interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full max-w-md space-y-2">
      <div className="flex justify-between text-sm text-zinc-400">
        <span>Progression</span>
        <span>
          {current}/{total}
        </span>
      </div>

      <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
