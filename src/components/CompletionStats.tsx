"use client";

interface CompletionStatsProps {
  startedAt: string;
  completedCount: number;
  totalCount: number;
  unlockedAchievementCount?: number;
  totalAchievementCount?: number;
}

const MILESTONES = [5, 10, 15];

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
  unlockedAchievementCount,
  totalAchievementCount,
}: CompletionStatsProps): React.ReactElement {
  const days = getDaysSince(startedAt);
  const nextMilestone = getNextMilestone(completedCount);

  return (
    <div className="glass-card p-3">
      {/* Compact 3-column grid */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-lg font-bold text-sky-700">
            {days === 0 ? "D+0" : `D+${days}`}
          </p>
          <p className="text-[10px] text-slate-500">준비 기간</p>
        </div>
        <div>
          <p className="text-lg font-bold text-emerald-600">
            {completedCount}/{totalCount}
          </p>
          <p className="text-[10px] text-slate-500">완료 퀘스트</p>
        </div>
        <div>
          <p className="text-lg font-bold text-purple-600">
            {unlockedAchievementCount ?? 0}/{totalAchievementCount ?? 6}
          </p>
          <p className="text-[10px] text-slate-500">업적</p>
        </div>
      </div>

      {/* Milestone - single line */}
      {nextMilestone !== null && (
        <p className="text-[10px] text-slate-500 text-center mt-2 pt-2 border-t border-slate-100">
          🎯 다음 마일스톤까지{" "}
          <span className="font-bold text-amber-600">
            {nextMilestone - completedCount}개
          </span>{" "}
          남음
        </p>
      )}
      {nextMilestone === null && completedCount > 0 && (
        <p className="text-[10px] font-medium text-emerald-600 text-center mt-2 pt-2 border-t border-slate-100">
          🎉 모든 마일스톤 달성!
        </p>
      )}
    </div>
  );
}
