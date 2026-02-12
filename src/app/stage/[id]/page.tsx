"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { stages } from "@/data/quests";
import { useProgress } from "@/hooks/useProgress";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import QuestCard from "@/components/QuestCard";
import XPPopup from "@/components/XPPopup";
import Confetti from "@/components/Confetti";

export default function StagePage(): React.ReactElement {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const stageId = Number(params.id);
  const stage = stages.find((s) => s.id === stageId);
  const [showXP, setShowXP] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => setMounted(true), []);

  const {
    completeQuest,
    uncompleteQuest,
    isQuestCompleted,
    getStageProgress,
  } = useProgress();

  if (!mounted) return <div className="min-h-screen" />;

  if (!stage) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-card p-8 text-center max-w-md mx-auto">
          <p className="text-4xl mb-4">😵</p>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            스테이지를 찾을 수 없습니다
          </h2>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 text-sm"
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
  const progress = getStageProgress(stageId);
  const completedCount = stage.quests.filter((q) =>
    isQuestCompleted(q.id)
  ).length;
  const isStageComplete = completedCount === stage.quests.length;
  const nextStage = stages.find((s) => s.id === stageId + 1);

  const handleToggle = (questId: string): void => {
    if (isQuestCompleted(questId)) {
      uncompleteQuest(questId);
    } else {
      completeQuest(questId);
      setShowXP(true);
      setTimeout(() => setShowXP(false), 100);

      const newCompletedCount = completedCount + 1;
      if (newCompletedCount === stage.quests.length) {
        setTimeout(() => {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 100);
        }, 500);
      }
    }
  };

  return (
    <div className="min-h-screen p-4 pb-20">
      <XPPopup show={showXP} xp={10} />
      <Confetti show={showConfetti} />
      <div className="max-w-md mx-auto">
        <Header
          title={`${stage.emoji} ${stage.title}`}
          subtitle={stage.description}
          showBack
        />

        {isLocked ? (
          <div className="glass-card p-8 text-center">
            <p className="text-4xl mb-4">🔒</p>
            <h2 className="text-lg font-bold text-gray-700 mb-2">
              잠겨있는 스테이지
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              이전 스테이지를 먼저 완료해주세요
            </p>
            <Link
              href={`/stage/${stageId - 1}`}
              className="inline-block px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors"
            >
              Stage {stageId - 1}로 이동
            </Link>
          </div>
        ) : (
          <>
            {/* Progress section */}
            <div className="glass-card p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  {completedCount}/{stage.quests.length} 퀘스트 완료
                </span>
                <span className="text-sm font-semibold text-blue-600">
                  {progress}%
                </span>
              </div>
              <ProgressBar progress={progress} size="md" />
            </div>

            {/* Quest list */}
            <div className="flex flex-col gap-3">
              {stage.quests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  isCompleted={isQuestCompleted(quest.id)}
                  onToggle={handleToggle}
                  disabled={isLocked}
                />
              ))}
            </div>

            {/* Stage complete celebration */}
            {isStageComplete && (
              <div className="glass-card p-6 mt-6 text-center bg-green-50/70 border-green-200/50">
                <p className="text-4xl mb-3">🎉</p>
                <h2 className="text-lg font-bold text-green-700 mb-1">
                  스테이지 클리어!
                </h2>
                <p className="text-sm text-green-600 mb-4">
                  잘했어요! 이 스테이지의 모든 퀘스트를 완료했습니다
                </p>
                {nextStage ? (
                  <Link
                    href={`/stage/${nextStage.id}`}
                    className="inline-block px-5 py-2.5 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors"
                  >
                    다음: {nextStage.emoji} {nextStage.title} &rarr;
                  </Link>
                ) : (
                  <p className="text-sm font-semibold text-green-700">
                    모든 준비가 완료되었습니다! 호주로 출발! ✈️
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
