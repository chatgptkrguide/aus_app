"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { stages } from "@/data/quests";
import { useProgress } from "@/hooks/useProgress";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import QuestCard from "@/components/QuestCard";

export default function StagePage(): React.ReactElement {
  const params = useParams();
  const stageId = Number(params.id);
  const stage = stages.find((s) => s.id === stageId);

  const {
    completeQuest,
    uncompleteQuest,
    isQuestCompleted,
    getStageProgress,
  } = useProgress();

  if (!stage) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-card p-8 text-center max-w-md mx-auto">
          <p className="text-4xl mb-4">😵</p>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Stage not found
          </h2>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            &larr; Back to Home
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
    }
  };

  return (
    <div className="min-h-screen p-4 pb-20">
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
              Stage Locked
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Complete the previous stage first to unlock this one.
            </p>
            <Link
              href={`/stage/${stageId - 1}`}
              className="inline-block px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors"
            >
              Go to Stage {stageId - 1}
            </Link>
          </div>
        ) : (
          <>
            {/* Progress section */}
            <div className="glass-card p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  {completedCount}/{stage.quests.length} quests completed
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
                  Stage Complete!
                </h2>
                <p className="text-sm text-green-600 mb-4">
                  Great job! You&apos;ve completed all quests in this stage.
                </p>
                {nextStage ? (
                  <Link
                    href={`/stage/${nextStage.id}`}
                    className="inline-block px-5 py-2.5 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors"
                  >
                    Next: {nextStage.emoji} {nextStage.title} &rarr;
                  </Link>
                ) : (
                  <p className="text-sm font-semibold text-green-700">
                    You&apos;re all set for your Australian adventure! ✈️
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
