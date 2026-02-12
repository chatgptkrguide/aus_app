'use client';

import { useEffect, useState } from 'react';

interface XPPopupProps {
  show: boolean;
  xp?: number;
}

export default function XPPopup({ show, xp = 10 }: XPPopupProps): React.ReactNode {
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
  }, [show]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="xp-float text-2xl font-bold text-amber-500 drop-shadow-lg">
        +{xp} XP!
      </div>
    </div>
  );
}
