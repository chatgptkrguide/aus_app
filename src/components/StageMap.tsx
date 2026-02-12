"use client";

import Link from "next/link";
import { Stage } from "@/types";

interface StageMapProps {
  stages: Stage[];
  getStageProgress: (stageId: number) => number;
  isStageUnlocked: (stageId: number) => boolean;
  isStageCompleted: (stageId: number) => boolean;
  currentStageId: number;
  completedQuests: string[];
}

export default function StageMap({
  stages,
  getStageProgress,
  isStageUnlocked,
  isStageCompleted,
  currentStageId,
  completedQuests,
}: StageMapProps): React.ReactElement {
  return (
    <section className="flex flex-col items-center gap-0">
      {stages.map((stage, index) => {
        const unlocked = isStageUnlocked(stage.id);
        const completed = isStageCompleted(stage.id);
        const isCurrent = unlocked && !completed && currentStageId === stage.id;
        const stageProgress = getStageProgress(stage.id);
        const completedCount = stage.quests.filter((q) =>
          completedQuests.includes(q.id)
        ).length;

        return (
          <div key={stage.id} className="flex w-full flex-col items-center">
            {/* Dotted connector line */}
            {index > 0 && (
              <div className="h-8 w-0 border-l-2 border-dashed border-slate-300" />
            )}

            {/* Stage card */}
            {unlocked ? (
              <Link href={`/stage/${stage.id}`} className="block w-full">
                <div
                  className={`glass-card w-full p-5 transition-all ${
                    isCurrent
                      ? "ring-2 ring-blue-400 animate-pulse"
                      : completed
                        ? "opacity-75"
                        : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{stage.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-slate-800">
                          Stage {stage.id}: {stage.title}
                        </h2>
                        {completed && (
                          <span className="check-animate text-green-500">
                            ✅
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        {completedCount}/{stage.quests.length} quests completed
                      </p>
                    </div>
                  </div>

                  {/* Stage progress bar */}
                  <div className="progress-track mt-3">
                    <div
                      className="progress-bar"
                      style={
                        {
                          "--progress-width": `${stageProgress}%`,
                          background: completed
                            ? "linear-gradient(90deg, #22c55e, #16a34a)"
                            : `linear-gradient(90deg, ${stage.color}88, ${stage.color})`,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                </div>
              </Link>
            ) : (
              <div className="glass-card w-full cursor-not-allowed p-5 opacity-50 grayscale">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🔒</span>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-slate-400">
                      Stage {stage.id}: {stage.title}
                    </h2>
                    <p className="mt-1 text-xs text-slate-400">
                      Complete the previous stage to unlock
                    </p>
                  </div>
                </div>

                <div className="progress-track mt-3">
                  <div
                    className="progress-bar"
                    style={
                      { "--progress-width": "0%" } as React.CSSProperties
                    }
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
