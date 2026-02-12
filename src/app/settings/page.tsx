"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ConfirmModal from "@/components/ConfirmModal";
import { useProgress } from "@/hooks/useProgress";
import { useDeparture } from "@/hooks/useDeparture";

function getDdayText(days: number | null): string {
  if (days === null) return "출발 예정일을 설정하세요";
  if (days > 0) return `출발까지 D-${days}`;
  if (days === 0) return "D-Day! 오늘 출발!";
  return `출발한 지 ${Math.abs(days)}일째`;
}

export default function SettingsPage(): React.ReactElement {
  const { resetProgress } = useProgress();
  const { departureDate, setDepartureDate, daysUntilDeparture } =
    useDeparture();
  const [showResetModal, setShowResetModal] = useState(false);

  const handleResetConfirm = (): void => {
    resetProgress();
    setShowResetModal(false);
  };

  return (
    <main className="min-h-screen p-4 max-w-lg mx-auto pb-8">
      <Header title="⚙️ 설정" showBack />

      {/* Departure date setting */}
      <section className="glass-card p-5 mb-4">
        <h2 className="text-base font-bold text-gray-900 mb-3">
          ✈️ 출발 예정일
        </h2>
        <input
          type="date"
          value={departureDate ?? ""}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white/80 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-3"
        />
        <p
          className={`text-center font-bold text-lg ${
            daysUntilDeparture !== null && daysUntilDeparture <= 7
              ? "text-red-500"
              : "text-blue-600"
          }`}
        >
          {getDdayText(daysUntilDeparture)}
        </p>
      </section>

      {/* Progress management */}
      <section className="glass-card p-5 mb-4">
        <h2 className="text-base font-bold text-gray-900 mb-3">
          📊 진행률 관리
        </h2>
        <button
          type="button"
          onClick={() => setShowResetModal(true)}
          className="w-full px-4 py-2.5 rounded-xl text-sm font-medium bg-red-500 hover:bg-red-600 text-white transition-colors"
        >
          진행률 초기화
        </button>
      </section>

      {/* App info */}
      <section className="glass-card p-5">
        <h2 className="text-base font-bold text-gray-900 mb-3">
          ℹ️ 앱 정보
        </h2>
        <div className="space-y-1.5 text-sm text-gray-600">
          <p>호주 워홀 메이트 v1.0</p>
          <p>Made with ❤️ for WHV dreamers</p>
          <a
            href="https://github.com/chatgptkrguide/aus_app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors mt-2"
          >
            GitHub →
          </a>
        </div>
      </section>

      <ConfirmModal
        isOpen={showResetModal}
        title="진행률 초기화"
        message="모든 진행 상태가 초기화됩니다. 이 작업은 되돌릴 수 없습니다."
        confirmLabel="초기화"
        cancelLabel="취소"
        onConfirm={handleResetConfirm}
        onCancel={() => setShowResetModal(false)}
        variant="danger"
      />
    </main>
  );
}
