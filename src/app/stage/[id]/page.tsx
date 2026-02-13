"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { stages } from "@/data/quests";
import { useProgress } from "@/hooks/useProgress";
import { useGameSystem } from "@/hooks/useGameSystem";
import QuestSlide from "@/components/QuestSlide";
import XPPopup from "@/components/XPPopup";
import Confetti from "@/components/Confetti";
import AchievementPopup from "@/components/AchievementPopup";
import { Achievement } from "@/types";

export default function StagePage(): React.ReactElement {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const router = useRouter();
  const stageId = Number(params.id);
  const stage = stages.find((s) => s.id === stageId);
  const [showXP, setShowXP] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [leveledUp, setLeveledUp] = useState(false);
  const [achievementPopup, setAchievementPopup] = useState<Achievement | null>(
    null
  );
  const [achievementQueue, setAchievementQueue] = useState<Achievement[]>([]);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const {
    progress,
    completeQuest,
    uncompleteQuest,
    isQuestCompleted,
    getStageProgress,
  } = useProgress();

  const {
    addXP,
    removeXP,
    checkAchievements,
    achievements,
    currentRank,
    gameState,
  } = useGameSystem();

  // Process achievement queue
  useEffect(() => {
    if (achievementQueue.length > 0 && achievementPopup === null) {
      const [next, ...rest] = achievementQueue;
      setAchievementPopup(next);
      setAchievementQueue(rest);
    }
  }, [achievementQueue, achievementPopup]);

  const handleAchievementDone = useCallback((): void => {
    setAchievementPopup(null);
  }, []);

  const scrollToNextQuest = useCallback((currentIndex: number): void => {
    const feed = feedRef.current;
    if (!feed) return;
    const nextSlide = feed.children[currentIndex + 1] as HTMLElement | undefined;
    nextSlide?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleComplete = useCallback(
    (questId: string, questIndex: number): void => {
      completeQuest(questId);
      const result = addXP(10);
      setLeveledUp(result.leveledUp);

      // Show XP popup
      setShowXP(true);
      setTimeout(() => setShowXP(false), 100);

      // Check achievements with updated completed quests
      const updatedCompleted = [...progress.completedQuests, questId];
      const newAchievementIds = checkAchievements(updatedCompleted);

      // Show achievement popups
      if (newAchievementIds.length > 0) {
        const newAchievementObjects = newAchievementIds
          .map((id) => achievements.find((a) => a.id === id))
          .filter((a): a is Achievement => a !== undefined);

        if (newAchievementObjects.length > 0) {
          setTimeout(() => {
            setAchievementQueue((prev) => [...prev, ...newAchievementObjects]);
          }, 1200);
        }
      }

      // Check stage complete
      if (stage) {
        const newCompletedCount =
          stage.quests.filter((q) => isQuestCompleted(q.id)).length + 1;
        if (newCompletedCount === stage.quests.length) {
          setTimeout(() => {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 100);
          }, 500);
        }
      }

      // Auto-scroll to next quest after delay
      setTimeout(() => {
        scrollToNextQuest(questIndex);
      }, 1500);
    },
    [
      completeQuest,
      addXP,
      progress.completedQuests,
      checkAchievements,
      achievements,
      stage,
      isQuestCompleted,
      scrollToNextQuest,
    ]
  );

  const handleUncomplete = useCallback(
    (questId: string): void => {
      uncompleteQuest(questId);
      removeXP(10);
    },
    [uncompleteQuest, removeXP]
  );

  if (!mounted) return <div className="min-h-screen" />;

  if (!stage) {
    return (
      <div className="fixed inset-0 z-40 bg-white flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          <p className="text-6xl mb-6">😵</p>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            스테이지를 찾을 수 없습니다
          </h2>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 bg-blue-500 text-white rounded-2xl text-sm font-semibold hover:bg-blue-600 transition-colors"
          >
            &larr; 홈으로
          </Link>
        </div>
      </div>
    );
  }

  // Check if previous stage is complete (stage 1 is always unlocked)
  const isPreviousStageComplete = (): boolean => {
    if (stageId === 1) return true;
    const prevStage = stages.find((s) => s.id === stageId - 1);
    if (!prevStage) return true;
    return prevStage.quests.every((q) => isQuestCompleted(q.id));
  };

  const isLocked = !isPreviousStageComplete();
  const completedCount = stage.quests.filter((q) =>
    isQuestCompleted(q.id)
  ).length;
  const isStageComplete = completedCount === stage.quests.length;
  const nextStage = stages.find((s) => s.id === stageId + 1);
  const stageProgress = getStageProgress(stageId);
  const completedQuests = stage.quests.map((q) => isQuestCompleted(q.id));

  // Locked stage screen
  if (isLocked) {
    return (
      <div className="fixed inset-0 z-40 bg-gradient-to-b from-gray-100 to-white flex items-center justify-center">
        <div className="flex flex-col items-center text-center px-8">
          <div className="text-7xl mb-6">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            잠겨있는 스테이지
          </h2>
          <p className="text-base text-gray-500 mb-8 leading-relaxed">
            이전 스테이지를 먼저
            <br />
            완료해주세요
          </p>
          <Link
            href={`/stage/${stageId - 1}`}
            className="px-6 py-3 bg-blue-500 text-white rounded-2xl text-sm font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-200"
          >
            Stage {stageId - 1}으로 이동 &rarr;
          </Link>
          <button
            onClick={() => router.push("/")}
            className="mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            &larr; 홈으로
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-40 bg-white">
      <XPPopup show={showXP} xp={10} levelUp={leveledUp} />
      <Confetti show={showConfetti} />
      <AchievementPopup
        achievement={achievementPopup}
        onDone={handleAchievementDone}
      />

      {/* Back button - floating */}
      <button
        onClick={() => router.push("/")}
        className="fixed top-0 left-0 z-40 pt-[env(safe-area-inset-top,0px)]"
      >
        <div className="pt-4 pl-4">
          <div className="min-h-[44px] min-w-[44px] flex items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors">
            <svg
              width="24"
              height="24"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M13 4L7 10L13 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xs font-medium">홈</span>
          </div>
        </div>
      </button>

      <div className="quest-feed" ref={feedRef}>
        {/* Quest slides */}
        {stage.quests.map((quest, index) => (
          <QuestSlide
            key={quest.id}
            quest={quest}
            stageColor={stage.color}
            stageTitle={`Stage ${stage.id} · ${stage.title}`}
            isCompleted={isQuestCompleted(quest.id)}
            questIndex={index}
            totalQuests={stage.quests.length}
            onComplete={() => handleComplete(quest.id, index)}
            onUncomplete={() => handleUncomplete(quest.id)}
            isFirst={index === 0}
            completedQuests={completedQuests}
          />
        ))}

        {/* Final slide: stage complete or progress summary */}
        <div className="quest-slide bg-gradient-to-b from-white to-gray-50">
          <div className="flex flex-col items-center justify-center text-center px-6 max-w-sm mx-auto">
            {isStageComplete ? (
              <>
                <div className="celebrate-bounce text-7xl mb-6">🎉</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  스테이지 클리어!
                </h2>
                <p className="text-base text-gray-500 mb-2">
                  {completedCount}/{stage.quests.length} 퀘스트 완료
                </p>
                <p className="text-sm font-semibold text-amber-500 mb-2">
                  +{stage.quests.length * 10} XP 획득
                </p>
                <p className="text-sm text-gray-400 mb-8">
                  랭크: {currentRank.emoji} {currentRank.title}
                </p>

                {nextStage ? (
                  <Link
                    href={`/stage/${nextStage.id}`}
                    className="w-full max-w-xs h-14 flex items-center justify-center rounded-2xl text-base font-bold text-white bg-green-500 shadow-lg shadow-green-200 hover:bg-green-600 transition-colors"
                  >
                    다음 스테이지 &rarr;
                  </Link>
                ) : (
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600 mb-2">
                      모든 준비가 완료되었습니다!
                    </p>
                    <p className="text-2xl">✈️ 호주로 출발!</p>
                  </div>
                )}

                <button
                  onClick={() => router.push("/")}
                  className="mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  &larr; 홈으로 돌아가기
                </button>
              </>
            ) : (
              <>
                <div className="text-7xl mb-6">{stage.emoji}</div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  진행 현황
                </h2>
                <p className="text-base text-gray-500 mb-2">
                  {completedCount}/{stage.quests.length} 퀘스트 완료
                </p>
                <div className="w-full max-w-xs bg-gray-200 rounded-full h-3 mb-3">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${stageProgress}%`,
                      backgroundColor: stage.color,
                    }}
                  />
                </div>
                <p className="text-sm text-gray-400 mb-2">
                  {stageProgress}% 완료
                </p>
                <p className="text-xs text-gray-400 mb-8">
                  {currentRank.emoji} Lv.{gameState.level} &middot; {currentRank.title}
                </p>
                <p className="text-sm text-gray-400">
                  위로 스와이프하여 미완료 퀘스트를 확인하세요
                </p>
                <button
                  onClick={() => router.push("/")}
                  className="mt-6 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  &larr; 홈으로 돌아가기
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
