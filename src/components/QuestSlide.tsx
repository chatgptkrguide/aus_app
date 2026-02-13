"use client";

import { useState } from "react";
import { Quest } from "@/types";
import RewardBurst from "@/components/RewardBurst";

interface QuestSlideProps {
  quest: Quest;
  stageColor: string;
  stageTitle: string;
  isCompleted: boolean;
  questIndex: number;
  totalQuests: number;
  onComplete: () => void;
  onUncomplete: () => void;
  isFirst: boolean;
  completedQuests: boolean[];
}

export default function QuestSlide({
  quest,
  stageColor,
  stageTitle,
  isCompleted,
  questIndex,
  totalQuests,
  onComplete,
  onUncomplete,
  isFirst,
  completedQuests,
}: QuestSlideProps): React.ReactElement {
  const [showBurst, setShowBurst] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [morphing, setMorphing] = useState(false);
  const [showXPFloat, setShowXPFloat] = useState(false);

  const handleComplete = (): void => {
    if (isCompleted) {
      onUncomplete();
      return;
    }

    // Trigger animations
    setMorphing(true);
    setShowBurst(true);
    setShowFlash(true);
    setShowXPFloat(true);
    navigator.vibrate?.(50);

    onComplete();

    // Reset burst
    setTimeout(() => setShowBurst(false), 100);
    // Reset flash
    setTimeout(() => setShowFlash(false), 700);
    // Reset morph
    setTimeout(() => setMorphing(false), 600);
    // Reset xp float
    setTimeout(() => setShowXPFloat(false), 1400);
  };

  // Build background gradient based on state
  const bgStyle = isCompleted
    ? "bg-gradient-to-b from-green-50 via-emerald-50 to-white"
    : "bg-gradient-to-b from-slate-50 via-white to-white";

  return (
    <div className={`quest-slide ${bgStyle}`}>
      {/* Screen flash overlay */}
      {showFlash && (
        <div className="screen-flash absolute inset-0 bg-green-400 z-10 pointer-events-none" />
      )}

      {/* Reward burst */}
      <RewardBurst show={showBurst} color={stageColor} />

      {/* Top area: stage info + progress dots */}
      <div className="absolute top-0 left-0 right-0 pt-[env(safe-area-inset-top,0px)] px-6 pb-2 z-20">
        <div className="pt-14">
          <p className="text-xs text-gray-400 text-center font-medium tracking-wide">
            {stageTitle} &middot; {questIndex + 1}/{totalQuests}
          </p>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {completedQuests.map((completed, i) => {
              const isCurrent = i === questIndex;
              return (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-300 ${
                    isCurrent ? "dot-pulse" : ""
                  }`}
                  style={{
                    width: isCurrent ? 10 : completed ? 8 : 6,
                    height: isCurrent ? 10 : completed ? 8 : 6,
                    backgroundColor: completed
                      ? stageColor
                      : isCurrent
                        ? "transparent"
                        : "#D1D5DB",
                    border: isCurrent
                      ? `2px solid ${stageColor}`
                      : "none",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-sm mx-auto px-4">
        {/* Large emoji */}
        <div className="quest-emoji-float text-7xl mb-6 select-none">
          {quest.emoji}
        </div>

        {/* Quest title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
          {quest.title}
        </h2>

        {/* Quest description */}
        <p className="text-base text-gray-500 text-center leading-relaxed mb-6 px-2">
          {quest.description}
        </p>

        {/* Guide link */}
        {quest.guideUrl && (
          <a
            href={quest.guideUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium mb-8 transition-colors"
            style={{
              backgroundColor: `${stageColor}15`,
              color: stageColor,
            }}
          >
            <span>📎</span>
            가이드 보기
          </a>
        )}

        {!quest.guideUrl && <div className="mb-8" />}
      </div>

      {/* Bottom area: action button + hints */}
      <div className="absolute bottom-0 left-0 right-0 pb-[env(safe-area-inset-bottom,0px)] px-6 z-20">
        <div className="pb-10 w-full max-w-sm mx-auto">
          {/* Action button */}
          <button
            onClick={handleComplete}
            className={`w-full h-14 rounded-2xl font-bold text-base transition-all duration-300 ${
              morphing ? "complete-morph" : ""
            } ${
              isCompleted
                ? "bg-green-500 text-white shadow-lg shadow-green-200"
                : "text-white shadow-lg active:scale-95"
            }`}
            style={
              isCompleted
                ? undefined
                : {
                    backgroundColor: stageColor,
                    boxShadow: `0 4px 14px ${stageColor}40`,
                  }
            }
          >
            {isCompleted ? "✓ 완료됨" : "✓ 완료하기"}
          </button>

          {/* XP text */}
          <div className="relative flex justify-center mt-3">
            {showXPFloat && (
              <span className="xp-up absolute text-amber-500 font-bold text-sm">
                +10 XP!
              </span>
            )}
            <p className="text-xs text-gray-400">
              {isCompleted ? "탭하여 취소" : "+10 XP 획득"}
            </p>
          </div>

          {/* Swipe hint - first card only */}
          {isFirst && !isCompleted && (
            <div className="swipe-hint flex flex-col items-center mt-4 text-gray-300">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="mb-0.5"
              >
                <path
                  d="M10 4L10 16M10 16L5 11M10 16L15 11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs">스와이프</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
