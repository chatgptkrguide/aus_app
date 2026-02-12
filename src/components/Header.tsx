"use client";

import Link from "next/link";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  center?: boolean;
}

export default function Header({
  title,
  subtitle,
  showBack = false,
  center = false,
}: HeaderProps): React.ReactElement {
  return (
    <header className={`mb-6 ${center ? "text-center" : ""}`}>
      {showBack && (
        <Link
          href="/"
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm text-blue-600 hover:text-blue-800 bg-white/60 backdrop-blur-sm shadow-sm border border-white/40 transition-colors mb-3"
        >
          <span>&larr;</span>
          <span>홈</span>
        </Link>
      )}
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      )}
    </header>
  );
}
