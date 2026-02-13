"use client";

import { Rank, Achievement } from "@/types";

interface CompletionStatsProps {
  startedAt: string;
  completedCount: number;
  totalCount: number;
  currentRank?: Rank;
  totalXP?: number;
  streak?: number;
  unlockedAchievements?: Achievement[];
  totalAchievements?: number;
}

const MILESTONES = [5, 10, 15, 20, 25, 30];

function getDaysSince(dateString: string): number {
  const start = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
}

function getNextMilestone(completed: number): number | null {
  for (const m of MILESTONES) {
    if (completed < m) return m;
  }
  return null;
}

export default function CompletionStats({
  startedAt,
  completedCount,
  totalCount,
  currentRank,
  totalXP,
  streak,
  unlockedAchievements,
  totalAchievements,
}: CompletionStatsProps): React.ReactElement {
  const days = getDaysSince(startedAt);
  const nextMilestone = getNextMilestone(completedCount);

  return (
    <div className="glass-card p-4">
      {/* Game stats row */}
      {currentRank && (
        <div className="grid grid-cols-3 gap-2 mb-3 pb-3 border-b border-slate-100">
          <div className="text-center">
            <p className="text-xs text-slate-500">랭크</p>
            <p className="text-lg mt-0.5">{currentRank.emoji}</p>
            <p className="text-[10px] font-semibold text-slate-700">{currentRank.title}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-500">총 XP</p>
            <p className="text-lg font-bold text-amber-600 mt-0.5">
              {totalXP ?? 0}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-500">업적</p>
            <p className="text-lg font-bold text-purple-600 mt-0.5">
              {unlockedAchievements?.length ?? 0}/{totalAchievements ?? 6}
            </p>
          </div>
        </div>
      )}

      {/* Original stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="text-center">
          <p className="text-xs text-slate-500">📅 준비 기간</p>
          <p className="text-lg font-bold text-sky-700 mt-1">
            {days === 0 ? "오늘 시작!" : `D+${days}일`}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500">✅ 완료 퀘스트</p>
          <p className="text-lg font-bold text-emerald-600 mt-1">
            {completedCount}/{totalCount}
          </p>
        </div>
      </div>

      {/* Streak display */}
      {streak !== undefined && streak > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500">
            🔥 연속 방문{" "}
            <span className="font-bold text-orange-600">{streak}일째!</span>
          </p>
        </div>
      )}

      {/* Achievement badges */}
      {unlockedAchievements && unlockedAchievements.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          <p className="text-xs text-slate-500 text-center mb-2">획득한 업적</p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {unlockedAchievements.map((a) => (
              <span
                key={a.id}
                className="text-lg"
                title={a.title}
              >
                {a.emoji}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Milestone */}
      {nextMilestone !== null && (
        <div className="mt-3 pt-3 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500">
            🎯 다음 마일스톤까지{" "}
            <span className="font-bold text-amber-600">
              {nextMilestone - completedCount}개
            </span>{" "}
            남음
          </p>
        </div>
      )}
      {nextMilestone === null && (
        <div className="mt-3 pt-3 border-t border-slate-100 text-center">
          <p className="text-xs font-medium text-emerald-600">
            🎉 모든 마일스톤을 달성했습니다!
          </p>
        </div>
      )}
    </div>
  );
}
