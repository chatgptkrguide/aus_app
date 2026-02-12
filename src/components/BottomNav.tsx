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

export default function BottomNav(): React.ReactElement {
  const pathname = usePathname();

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 8px)" }}
    >
      <div className="glass-card mx-auto w-full max-w-md rounded-t-2xl rounded-b-none border-b-0">
        <ul className="flex items-center justify-around py-2">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex flex-col items-center gap-0.5 px-4 py-1 transition-colors ${
                    active
                      ? "text-blue-600"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <span className="relative text-xl">
                    {active && (
                      <span className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-blue-500" />
                    )}
                    {item.emoji}
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      active ? "font-semibold" : ""
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
