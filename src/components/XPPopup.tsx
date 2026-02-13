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
      }, 2000);
      return () => clearTimeout(timer);
    }
    setVisible(false);
    return undefined;
  }, [show]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="xp-gain-float text-3xl font-bold text-amber-500 drop-shadow-lg">
          +{xp} XP!
        </div>
        {levelUp && (
          <div className="bounce-in text-xl font-black text-purple-500 drop-shadow-lg level-up-glow">
            Level Up!
          </div>
        )}
      </div>
    </div>
  );
}
