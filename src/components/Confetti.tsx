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
  shape: 'square' | 'circle' | 'star';
}

const COLORS = [
  '#ef4444', '#3b82f6', '#eab308', '#22c55e', '#f97316',
  '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b', '#6366f1',
];

function generateParticles(): Particle[] {
  return Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: Math.random() * 10 + 6,
    duration: Math.random() * 2 + 2,
    delay: Math.random() * 0.8,
    shape: i % 3 === 0 ? 'star' : i % 3 === 1 ? 'circle' : 'square',
  }));
}

export default function Confetti({ show }: ConfettiProps): React.ReactElement | null {
  const [visible, setVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (show) {
      setParticles(generateParticles());
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3500);
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
          className={`confetti-piece absolute top-0 ${p.shape === 'star' ? 'star-shape' : ''}`}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'square' ? '2px' : '0',
            '--fall-duration': `${p.duration}s`,
            '--fall-delay': `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
