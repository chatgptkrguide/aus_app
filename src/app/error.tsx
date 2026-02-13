"use client";

import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps): React.ReactElement {
  return (
    <div className="relative min-h-screen px-4 py-8 flex items-center justify-center">
      {/* Cloud decorations */}
      <span className="cloud-float-slow pointer-events-none absolute top-12 left-6 text-4xl opacity-60">
        ☁️
      </span>
      <span className="cloud-float pointer-events-none absolute top-24 right-8 text-3xl opacity-50">
        ☁️
      </span>

      <main className="relative z-10 mx-auto w-full max-w-md">
        <div className="glass-card p-8 text-center" role="alert">
          <div className="text-5xl mb-4">😵</div>
          <h1 className="text-xl font-bold text-slate-800 mb-2">
            앗! 문제가 발생했어요
          </h1>
          <p className="text-sm text-slate-600 mb-8">
            잠시 후 다시 시도해주세요
          </p>

          <button
            type="button"
            onClick={reset}
            className="w-full px-4 py-3 rounded-xl text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white transition-colors mb-3"
          >
            다시 시도하기
          </button>

          <Link
            href="/"
            className="inline-block text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </main>
    </div>
  );
}
