'use client';

interface CompletionStatsProps {
  startedAt: string;
  completedCount: number;
  totalCount: number;
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
}: CompletionStatsProps): React.ReactNode {
  const days = getDaysSince(startedAt);
  const nextMilestone = getNextMilestone(completedCount);
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="glass-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">준비 기간</span>
        <span className="text-lg font-bold text-sky-700">D+{days}일째 준비 중</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">완료 퀘스트</span>
        <span className="text-lg font-bold text-emerald-600">
          {completedCount} / {totalCount} ({percentage}%)
        </span>
      </div>

      {nextMilestone !== null && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">다음 마일스톤</span>
          <span className="text-sm font-medium text-amber-600">
            {nextMilestone}개까지 {nextMilestone - completedCount}개 남음
          </span>
        </div>
      )}

      {nextMilestone === null && (
        <div className="text-center text-sm font-medium text-emerald-600">
          모든 마일스톤을 달성했습니다!
        </div>
      )}
    </div>
  );
}
