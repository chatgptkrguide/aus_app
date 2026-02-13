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

  const gradientClass = LEVEL_COLORS[currentRank.level] ?? "from-slate-400 to-slate-500";

  return (
    <div className="glass-card p-4 bounce-in">
      <div className="flex items-center gap-4">
        {/* Rank emoji */}
        <div className="relative">
          <span className="text-4xl block">{currentRank.emoji}</span>
          <span className="absolute -bottom-1 -right-1 text-xs font-bold bg-white/90 rounded-full px-1.5 py-0.5 shadow-sm">
            Lv.{currentRank.level}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800 text-sm">
              {currentRank.title}
            </h3>
            {streak > 0 && (
              <span className="streak-fire text-xs font-semibold bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                🔥 {streak}일
              </span>
            )}
          </div>

          {/* XP progress bar */}
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-slate-500 font-medium">
                {totalXP} XP
              </span>
              {nextRank && (
                <span className="text-[10px] text-slate-400">
                  다음 레벨까지 {xpToNextLevel} XP
                </span>
              )}
            </div>
            <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${gradientClass} xp-shimmer transition-all duration-700 ease-out`}
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>

          {/* Next rank hint */}
          {nextRank && (
            <p className="text-[10px] text-slate-400 mt-1">
              다음: {nextRank.emoji} {nextRank.title}
            </p>
          )}
          {!nextRank && (
            <p className="text-[10px] text-amber-500 font-semibold mt-1">
              최고 랭크 달성!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
