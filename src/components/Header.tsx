"use client";

import Link from "next/link";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
}

export default function Header({
  title,
  subtitle,
  showBack = false,
}: HeaderProps): React.ReactElement {
  return (
    <header className="mb-6">
      {showBack && (
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors mb-3"
        >
          <span>&larr;</span>
          <span>Home</span>
        </Link>
      )}
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      )}
    </header>
  );
}
