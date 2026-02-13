"use client";

import { useEffect, useState } from "react";

interface XPPopupProps {
  show: boolean;
  xp?: number;
  levelUp?: boolean;
}

export default function XPPopup({
  show,
  xp = 10,
  levelUp = false,
}: XPPopupProps): React.ReactElement | null {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
    setVisible(false);
    return undefined;
  }, [show]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {/* Level up screen glow */}
      {levelUp && (
        <div className="level-glow absolute inset-0 bg-gradient-to-b from-amber-300 via-yellow-200 to-transparent" />
      )}
      <div className="flex flex-col items-center gap-3">
        <div
          className="xp-gain-float text-5xl font-black drop-shadow-lg"
          style={{
            color: "#F59E0B",
            textShadow:
              "0 0 20px rgba(245, 158, 11, 0.5), 0 4px 8px rgba(0, 0, 0, 0.15)",
          }}
        >
          +{xp} XP!
        </div>
        {levelUp && (
          <div
            className="bounce-in text-2xl font-black drop-shadow-lg level-up-glow"
            style={{
              color: "#8B5CF6",
              textShadow:
                "0 0 24px rgba(139, 92, 246, 0.6), 0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            Level Up!
          </div>
        )}
      </div>
    </div>
  );
}
