"use client";

import { Rank } from "@/types";

interface LevelBadgeProps {
  currentRank: Rank;
  nextRank: Rank | null;
  xpProgress: number;
  xpToNextLevel: number;
  totalXP: number;
  streak: number;
}

export default function LevelBadge({
  currentRank,
  nextRank,
  xpProgress,
  xpToNextLevel,
  totalXP,
  streak,
}: LevelBadgeProps): React.ReactElement {
  const LEVEL_COLORS: Record<number, string> = {
    1: "from-slate-400 to-slate-500",
    2: "from-emerald-400 to-emerald-500",
    3: "from-blue-400 to-blue-500",
    4: "from-purple-400 to-purple-500",
    5: "from-amber-400 to-amber-500",
  };

  const gradientClass =
    LEVEL_COLORS[currentRank.level] ?? "from-slate-400 to-slate-500";

  return (
    <div className="glass-card p-3 bounce-in">
      {/* Top row: Rank info + Streak */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{currentRank.emoji}</span>
          <span className="text-sm font-bold text-slate-800">
            Lv.{currentRank.level} {currentRank.title}
          </span>
        </div>
        {streak > 0 && (
          <span className="streak-fire text-xs font-semibold bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
            🔥 {streak}일
          </span>
        )}
      </div>

      {/* XP progress bar (thin) */}
      <div className="mt-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] text-slate-500 font-medium">
            {totalXP} XP
          </span>
          {nextRank && (
            <span className="text-[10px] text-slate-400">
              다음까지 {xpToNextLevel} XP
            </span>
          )}
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${gradientClass} xp-shimmer transition-all duration-700 ease-out`}
            style={{ width: `${xpProgress}%` }}
          />
        </div>
      </div>

      {/* Next rank hint */}
      {nextRank && (
        <p className="text-[10px] text-slate-400 mt-1.5">
          다음: {nextRank.emoji} {nextRank.title}까지 {xpToNextLevel} XP
        </p>
      )}
      {!nextRank && (
        <p className="text-[10px] text-amber-500 font-semibold mt-1.5">
          최고 랭크 달성!
        </p>
      )}
    </div>
  );
}
