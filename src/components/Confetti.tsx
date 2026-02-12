'use client';

import { useEffect, useState } from 'react';

interface ConfettiProps {
  show: boolean;
}

interface Particle {
  id: number;
  left: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  shape: 'square' | 'circle';
}

const COLORS = ['#ef4444', '#3b82f6', '#eab308', '#22c55e', '#f97316'];

function generateParticles(): Particle[] {
  return Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: Math.random() * 8 + 4,
    duration: Math.random() * 2 + 2,
    delay: Math.random() * 0.5,
    shape: Math.random() > 0.5 ? 'square' : 'circle',
  }));
}

export default function Confetti({ show }: ConfettiProps): React.ReactNode {
  const [visible, setVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (show) {
      setParticles(generateParticles());
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    setVisible(false);
  }, [show]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti-piece absolute top-0"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
            '--fall-duration': `${p.duration}s`,
            '--fall-delay': `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
