import Link from "next/link";

export default function NotFoundPage(): React.ReactElement {
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
        <div className="glass-card p-8 text-center">
          <div className="text-5xl mb-4">🧭</div>
          <h1 className="text-xl font-bold text-slate-800 mb-2">
            페이지를 찾을 수 없어요
          </h1>
          <p className="text-sm text-slate-600 mb-8">
            요청하신 페이지가 존재하지 않거나 이동되었습니다
          </p>

          <Link
            href="/"
            className="inline-block w-full px-4 py-3 rounded-xl text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white transition-colors text-center"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </main>
    </div>
  );
}
