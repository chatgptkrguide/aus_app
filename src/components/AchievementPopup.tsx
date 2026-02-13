"use client";

import { useEffect, useState } from "react";
import { Achievement } from "@/types";

interface AchievementPopupProps {
  achievement: Achievement | null;
  onDone: () => void;
}

export default function AchievementPopup({
  achievement,
  onDone,
}: AchievementPopupProps): React.ReactElement | null {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!achievement) return;

    setVisible(true);
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 3000);
    const doneTimer = setTimeout(() => {
      onDone();
    }, 3400);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(doneTimer);
    };
  }, [achievement, onDone]);

  if (!achievement) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-50 pointer-events-none flex justify-center px-4 pt-4">
      <div
        className={`pointer-events-auto max-w-sm w-full achievement-card p-4 flex items-center gap-3 transition-all duration-400 ${
          visible
            ? "achievement-slide-in"
            : "achievement-slide-out"
        }`}
      >
        {/* Achievement emoji */}
        <span className="text-3xl bounce-in">{achievement.emoji}</span>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold text-amber-500 uppercase tracking-wider">
            업적 달성!
          </p>
          <p className="font-bold text-slate-800 text-sm">
            {achievement.title}
          </p>
          <p className="text-xs text-slate-500">
            {achievement.description}
          </p>
        </div>

        {/* Sparkle */}
        <span className="text-xl level-up-glow">✨</span>
      </div>
    </div>
  );
}
