"use client";

import { useEffect, useState } from "react";

interface RewardBurstProps {
  show: boolean;
  color?: string;
}

interface BurstParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  shape: "circle" | "star";
}

const BURST_COLORS = [
  "#FFD700",
  "#FFA500",
  "#F59E0B",
  "#FBBF24",
  "#F97316",
  "#EAB308",
];

function generateBurstParticles(): BurstParticle[] {
  const count = 14;
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 360;
    const distance = 60 + Math.random() * 80;
    const rad = (angle * Math.PI) / 180;
    return {
      id: i,
      x: Math.cos(rad) * distance,
      y: Math.sin(rad) * distance,
      size: Math.random() * 8 + 4,
      color: BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)],
      shape: Math.random() > 0.5 ? "star" : "circle",
    };
  });
}

export default function RewardBurst({
  show,
}: RewardBurstProps): React.ReactElement | null {
  const [visible, setVisible] = useState(false);
  const [particles, setParticles] = useState<BurstParticle[]>([]);

  useEffect(() => {
    if (show) {
      setParticles(generateBurstParticles());
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
    setVisible(false);
    return undefined;
  }, [show]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {particles.map((p) => (
        <div
          key={p.id}
          className="burst-particle absolute"
          style={
            {
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.shape === "circle" ? "50%" : "2px",
              "--burst-x": `${p.x}px`,
              "--burst-y": `${p.y}px`,
            } as React.CSSProperties
          }
        >
          {p.shape === "star" && (
            <div
              className="star-shape w-full h-full"
              style={{ backgroundColor: p.color }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
