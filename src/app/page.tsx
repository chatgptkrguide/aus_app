"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { stages, getTotalQuestCount } from "@/data/quests";
import { useProgress } from "@/hooks/useProgress";
import { useGameSystem } from "@/hooks/useGameSystem";
import { useDeparture } from "@/hooks/useDeparture";
import CompletionStats from "@/components/CompletionStats";
import AirplaneTakeoff from "@/components/AirplaneTakeoff";
import LevelBadge from "@/components/LevelBadge";
import AchievementPopup from "@/components/AchievementPopup";
import { Achievement, Quest, Stage } from "@/types";

interface CurrentQuestInfo {
  quest: Quest;
  stage: Stage;
}

function findCurrentQuest(
  completedQuests: string[],
  currentStageId: number
): CurrentQuestInfo | null {
  const currentStage = stages.find((s) => s.id === currentStageId);
  if (!currentStage) return null;
  const incompleteQuest = currentStage.quests.find(
    (q) => !completedQuests.includes(q.id)
  );
  if (!incompleteQuest) return null;
  return { quest: incompleteQuest, stage: currentStage };
}

export default function Home(): React.ReactElement {
  const [mounted, setMounted] = useState(false);
  const { progress, getStageProgress, getTotalProgress } = useProgress();
  const { daysUntilDeparture } = useDeparture();
  const {
    gameState,
    currentRank,
    nextRank,
    xpToNextLevel,
    xpProgress,
    achievements,
    unlockedAchievements,
    checkAchievements,
    streak,
  } = useGameSystem();
  const totalProgress = getTotalProgress();

  const [achievementPopup, setAchievementPopup] =
    useState<Achievement | null>(null);

  useEffect(() => setMounted(true), []);

  // Sync achievements when page loads
  useEffect(() => {
    if (mounted && progress.completedQuests.length > 0) {
      checkAchievements(progress.completedQuests);
    }
  }, [mounted, progress.completedQuests, checkAchievements]);

  const handleAchievementDone = useCallback((): void => {
    setAchievementPopup(null);
  }, []);

  if (!mounted)
    return (
      <div className="min-h-screen px-4 py-8">
        <div className="mx-auto max-w-md space-y-4">
          <div className="h-16 rounded-2xl bg-slate-200/50 animate-pulse" />
          <div className="h-64 rounded-2xl bg-slate-200/50 animate-pulse" />
          <div className="h-24 rounded-2xl bg-slate-200/50 animate-pulse" />
          <div className="h-20 rounded-2xl bg-slate-200/50 animate-pulse" />
        </div>
      </div>
    );

  const isStageUnlocked = (stageId: number): boolean => {
    if (stageId === 1) return true;
    return getStageProgress(stageId - 1) === 100;
  };

  const isStageCompleted = (stageId: number): boolean => {
    return getStageProgress(stageId) === 100;
  };

  const currentQuestInfo = findCurrentQuest(
    progress.completedQuests,
    progress.currentStage
  );
  const allComplete = totalProgress === 100;

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-6">
      {/* Achievement popup */}
      <AchievementPopup
        achievement={achievementPopup}
        onDone={handleAchievementDone}
      />

      {/* Cloud decorations */}
      <span className="cloud-float-slow pointer-events-none absolute top-12 left-6 text-4xl opacity-60">
        ☁️
      </span>
      <span className="cloud-float pointer-events-none absolute top-24 right-8 text-3xl opacity-50">
        ☁️
      </span>
      <span className="cloud-float-fast pointer-events-none absolute top-48 left-1/2 text-2xl opacity-40">
        ☁️
      </span>
      <span className="cloud-float-slow pointer-events-none absolute top-72 right-1/4 text-3xl opacity-30">
        ☁️
      </span>

      <main className="relative z-10 mx-auto max-w-md fade-in">
        {/* Compact Level Badge */}
        <section className="mb-4">
          <LevelBadge
            currentRank={currentRank}
            nextRank={nextRank}
            xpProgress={xpProgress}
            xpToNextLevel={xpToNextLevel}
            totalXP={gameState.xp}
            streak={streak}
          />
        </section>

        {/* Current Quest Hero Card or All Complete Card */}
        {allComplete ? (
          <section className="glass-card p-6 text-center mb-6">
            <p className="text-5xl mb-3">🎉🇦🇺</p>
            <h2 className="text-xl font-bold text-green-600">
              모든 준비 완료!
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              호주 워킹홀리데이를 향한 여정이 준비되었습니다!
            </p>
            <p className="mt-1 text-3xl">✈️</p>
            <AirplaneTakeoff show={true} />
          </section>
        ) : currentQuestInfo ? (
          <section className="mb-6">
            <p className="text-xs font-semibold text-slate-500 mb-2 ml-1">
              지금 할 일
            </p>
            <div
              className="glass-card p-5 border-l-4"
              style={{ borderLeftColor: currentQuestInfo.stage.color }}
            >
              {/* Quest emoji */}
              <div className="text-center mb-3">
                <span className="text-5xl quest-emoji-float inline-block">
                  {currentQuestInfo.quest.emoji}
                </span>
              </div>

              {/* Quest info */}
              <h2 className="text-xl font-bold text-slate-800 text-center">
                {currentQuestInfo.quest.title}
              </h2>
              <p className="text-sm text-slate-500 text-center mt-1">
                {currentQuestInfo.quest.description}
              </p>

              {/* Stage tag */}
              <p className="text-center mt-3">
                <span
                  className="inline-block rounded-full px-3 py-0.5 text-[10px] font-semibold"
                  style={{
                    backgroundColor: `${currentQuestInfo.stage.color}15`,
                    color: currentQuestInfo.stage.color,
                  }}
                >
                  Stage {currentQuestInfo.stage.id} · {currentQuestInfo.stage.title}
                </span>
              </p>

              {/* CTA Button */}
              <Link
                href={`/stage/${progress.currentStage}`}
                className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-blue-500 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-600 hover:shadow-xl active:scale-95"
                style={{
                  animation: "cta-glow 2s ease-in-out infinite",
                }}
              >
                바로 시작하기 →
              </Link>
            </div>
          </section>
        ) : null}

        {/* Journey Map - Stage Minimap */}
        <section className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-slate-500 ml-1">
              여정 현황
            </p>
            <p className="text-xs font-semibold text-blue-600 mr-1">
              {totalProgress}%
            </p>
          </div>

          {/* Total progress bar */}
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden mb-3">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-700 ease-out"
              style={{ width: `${totalProgress}%` }}
            />
          </div>

          {/* Stage mini cards - horizontal scroll */}
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
            {stages.map((stage, index) => {
              const unlocked = isStageUnlocked(stage.id);
              const completed = isStageCompleted(stage.id);
              const isCurrent =
                unlocked &&
                !completed &&
                progress.currentStage === stage.id;
              const stageProgress = getStageProgress(stage.id);
              const completedCount = stage.quests.filter((q) =>
                progress.completedQuests.includes(q.id)
              ).length;

              return (
                <div key={stage.id} className="flex items-center">
                  {/* Connector line */}
                  {index > 0 && (
                    <span className="text-slate-300 text-xs mr-3 flex-shrink-0">
                      →
                    </span>
                  )}

                  {unlocked ? (
                    <Link href={`/stage/${stage.id}`}>
                      <div
                        className={`flex-shrink-0 w-20 glass-card p-3 text-center transition-all hover:scale-105 active:scale-95 ${
                          isCurrent
                            ? "ring-2 ring-blue-400 ring-offset-1"
                            : completed
                              ? "ring-2 ring-green-400 ring-offset-1"
                              : ""
                        }`}
                      >
                        <span className="text-2xl block">
                          {stage.emoji}
                        </span>
                        <p className="text-[10px] font-bold mt-1 text-slate-700">
                          Stage {stage.id}
                        </p>
                        <p className="text-[9px] text-slate-500">
                          {completedCount}/{stage.quests.length}
                        </p>
                        <div className="h-1 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${stageProgress}%`,
                              backgroundColor: completed
                                ? "#22c55e"
                                : stage.color,
                            }}
                          />
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex-shrink-0 w-20 glass-card p-3 text-center opacity-50 cursor-not-allowed">
                      <span className="text-2xl block">🔒</span>
                      <p className="text-[10px] font-bold mt-1 text-slate-400">
                        Stage {stage.id}
                      </p>
                      <p className="text-[9px] text-slate-400">
                        0/{stage.quests.length}
                      </p>
                      <div className="h-1 bg-slate-200 rounded-full mt-1.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Compact Completion Stats */}
        <section className="mb-5">
          <CompletionStats
            startedAt={progress.startedAt}
            completedCount={progress.completedQuests.length}
            totalCount={getTotalQuestCount()}
            unlockedAchievementCount={unlockedAchievements.length}
            totalAchievementCount={achievements.length}
          />
        </section>

        {/* D-day */}
        {daysUntilDeparture !== null && daysUntilDeparture >= 0 && (
          <section className="glass-card p-3 mb-5 text-center">
            <p className="text-sm font-semibold text-blue-700">
              ✈️ 출발까지 D-{daysUntilDeparture}
            </p>
          </section>
        )}

        <AirplaneTakeoff show={allComplete} />

        {/* Footer spacing for BottomNav */}
        <div className="h-8" />
      </main>

      {/* CTA glow animation */}
      <style jsx>{`
        @keyframes cta-glow {
          0%,
          100% {
            box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 4px 24px rgba(59, 130, 246, 0.5);
          }
        }
      `}</style>
    </div>
  );
}
