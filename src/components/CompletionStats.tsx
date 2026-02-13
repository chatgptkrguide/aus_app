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

  return (
    <div className="glass-card p-4">
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
