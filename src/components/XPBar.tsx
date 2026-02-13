"use client";

import { Rank } from "@/types";

interface XPBarProps {
  currentXP: number;
  currentRank: Rank;
  nextRank: Rank | null;
  xpProgress: number;
  totalProgress: number;
}

export default function XPBar({
  currentXP,
  currentRank,
  nextRank,
  xpProgress,
  totalProgress,
}: XPBarProps): React.ReactElement {
  const BAR_GRADIENTS: Record<number, string> = {
    1: "linear-gradient(90deg, #94a3b8, #64748b)",
    2: "linear-gradient(90deg, #34d399, #10b981)",
    3: "linear-gradient(90deg, #60a5fa, #3b82f6)",
    4: "linear-gradient(90deg, #a78bfa, #8b5cf6)",
    5: "linear-gradient(90deg, #fbbf24, #f59e0b)",
  };

  const gradient = BAR_GRADIENTS[currentRank.level] ?? BAR_GRADIENTS[1];

  return (
    <div className="mt-6">
      {/* XP progress bar with rank emoji */}
      <div className="relative">
        <div className="progress-track relative">
          <div
            className="progress-bar xp-shimmer"
            style={{
              "--progress-width": `${totalProgress}%`,
              background: gradient,
            } as React.CSSProperties}
          />
          {/* Rank emoji on the bar */}
          <span
            className="absolute top-1/2 -translate-y-1/2 text-lg transition-all duration-700 ease-out drop-shadow-sm"
            style={{
              left: `${Math.min(Math.max(totalProgress, 5), 95)}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {currentRank.emoji}
          </span>
        </div>
      </div>

      {/* XP info */}
      <div className="flex justify-between items-center mt-2">
        <p className="text-sm font-semibold text-blue-600">
          {totalProgress}% 완료
        </p>
        <p className="text-xs text-slate-500">
          {currentXP} / {nextRank ? nextRank.minXP : currentXP} XP
        </p>
      </div>
    </div>
  );
}
