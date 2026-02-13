'use client';

import { useEffect, useState } from 'react';

interface AirplaneTakeoffProps {
  show: boolean;
}

interface Cloud {
  id: number;
  left: number;
  size: number;
  delay: number;
}

function generateClouds(): Cloud[] {
  return Array.from({ length: 5 }, (_, i) => ({
    id: i,
    left: Math.random() * 80 + 10,
    size: Math.random() * 40 + 30,
    delay: Math.random() * 1,
  }));
}

export default function AirplaneTakeoff({ show }: AirplaneTakeoffProps): React.ReactElement | null {
  const [visible, setVisible] = useState(false);
  const [clouds] = useState<Cloud[]>(generateClouds);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
    setVisible(false);
  }, [show]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-end pb-32">
      {/* Clouds scrolling down */}
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute opacity-60"
          style={{
            left: `${cloud.left}%`,
            top: `${20 + cloud.id * 15}%`,
            fontSize: `${cloud.size}px`,
            animation: `confetti-fall ${2 + cloud.delay}s ease-in forwards`,
            animationDelay: `${cloud.delay}s`,
          }}
        >
          ☁️
        </div>
      ))}

      {/* Airplane */}
      <div className="takeoff-animate flex flex-col items-center gap-2">
        <span className="text-6xl">✈️</span>
        <span className="text-xl font-bold text-sky-700 bg-white/80 px-4 py-1 rounded-full shadow-md">
          호주로 출발!
        </span>
      </div>
    </div>
  );
}
