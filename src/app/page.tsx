"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { stages, getTotalQuestCount } from "@/data/quests";
import { useProgress } from "@/hooks/useProgress";
import { useDeparture } from "@/hooks/useDeparture";
import CompletionStats from "@/components/CompletionStats";
import AirplaneTakeoff from "@/components/AirplaneTakeoff";

export default function Home(): React.ReactElement {
  const [mounted, setMounted] = useState(false);
  const { progress, getStageProgress, getTotalProgress } = useProgress();
  const { daysUntilDeparture } = useDeparture();
  const totalProgress = getTotalProgress();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="min-h-screen" />;

  const isStageUnlocked = (stageId: number): boolean => {
    if (stageId === 1) return true;
    return getStageProgress(stageId - 1) === 100;
  };

  const isStageCompleted = (stageId: number): boolean => {
    return getStageProgress(stageId) === 100;
  };

  const currentQuest = (() => {
    const currentStage = stages.find((s) => s.id === progress.currentStage);
    if (!currentStage) return null;
    const incomplete = currentStage.quests.find(
      (q) => !progress.completedQuests.includes(q.id)
    );
    return incomplete ?? null;
  })();

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-8">
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

      <main className="relative z-10 mx-auto max-w-md">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            호주 워홀 메이트
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            워킹홀리데이 준비, 게임처럼 클리어하자! 🎮
          </p>
          {daysUntilDeparture !== null && daysUntilDeparture >= 0 && (
            <span className="mt-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              ✈️ 출발까지 D-{daysUntilDeparture}
            </span>
          )}

          {/* Progress bar with airplane */}
          <div className="mt-6">
            <div className="progress-track relative">
              <div
                className="progress-bar"
                style={
                  { "--progress-width": `${totalProgress}%` } as React.CSSProperties
                }
              />
              <span
                className="absolute top-1/2 -translate-y-1/2 text-lg transition-all duration-700 ease-out"
                style={{ left: `${Math.min(Math.max(totalProgress, 5), 95)}%` }}
              >
                ✈️
              </span>
            </div>
            <p className="mt-2 text-sm font-semibold text-blue-600">
              {totalProgress}% 완료
            </p>
          </div>
        </header>

        {/* Stage map */}
        <section className="flex flex-col items-center gap-0">
          {stages.map((stage, index) => {
            const unlocked = isStageUnlocked(stage.id);
            const completed = isStageCompleted(stage.id);
            const isCurrent =
              unlocked && !completed && progress.currentStage === stage.id;
            const stageProgress = getStageProgress(stage.id);
            const completedCount = stage.quests.filter((q) =>
              progress.completedQuests.includes(q.id)
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
                          ? "ring-2 ring-blue-400 ring-offset-2"
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
                            {isCurrent && (
                              <span className="text-xs font-semibold text-blue-500">
                                현재 단계 &rarr;
                              </span>
                            )}
                            {completed && (
                              <span className="check-animate text-green-500">
                                ✅
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs text-slate-500">
                            {completedCount}/{stage.quests.length} 퀘스트 완료
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
                          이전 스테이지를 완료하면 열립니다
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

        {/* Bottom CTA */}
        {currentQuest && (
          <section className="glass-card mt-8 p-5 text-center">
            <p className="text-sm text-slate-500">현재 진행 중인 퀘스트</p>
            <p className="mt-1 text-lg font-bold text-slate-800">
              {currentQuest.emoji} {currentQuest.title}
            </p>
            <Link
              href={`/stage/${progress.currentStage}`}
              className="mt-4 inline-block rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-blue-600 hover:shadow-xl active:scale-95"
            >
              계속 진행하기 →
            </Link>
          </section>
        )}

        {/* Completion Stats */}
        <section className="mt-8">
          <CompletionStats
            startedAt={progress.startedAt}
            completedCount={progress.completedQuests.length}
            totalCount={getTotalQuestCount()}
          />
        </section>

        {totalProgress === 100 && (
          <section className="glass-card mt-8 p-5 text-center">
            <p className="text-2xl">🎉🇦🇺</p>
            <p className="mt-2 text-lg font-bold text-green-600">
              모든 준비 완료!
            </p>
            <p className="mt-1 text-sm text-slate-500">
              호주 워킹홀리데이를 향한 여정이 준비되었습니다!
            </p>
          </section>
        )}

        <AirplaneTakeoff show={totalProgress === 100} />

        {/* Footer spacing */}
        <div className="h-8" />
      </main>
    </div>
  );
}
