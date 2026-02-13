"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  emoji: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "홈", emoji: "🏠" },
  { href: "/tips", label: "팁", emoji: "💡" },
  { href: "/settings", label: "설정", emoji: "⚙️" },
];

export default function BottomNav(): React.ReactElement | null {
  const pathname = usePathname();

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Hide on full-screen stage pages
  if (pathname.startsWith("/stage/")) return null;

  return (
    <nav
      aria-label="메인 내비게이션"
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 8px)" }}
    >
      <div className="glass-card mx-auto w-full max-w-md rounded-t-2xl rounded-b-none border-b-0">
        <ul className="flex items-center justify-around py-2.5">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex flex-col items-center gap-0.5 px-5 py-2.5 rounded-xl transition-all ${
                    active
                      ? "text-blue-600 bg-blue-50/80"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <span className="text-xl">{item.emoji}</span>
                  <span
                    className={`text-[10px] ${
                      active ? "font-bold" : "font-medium"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
