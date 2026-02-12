"use client";

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
} as const;

export default function ProgressBar({
  progress,
  showLabel = false,
  size = "md",
}: ProgressBarProps): React.ReactElement {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="flex items-center gap-3 w-full">
      <div className={`progress-track flex-1 ${sizeMap[size]}`}>
        <div
          className="progress-bar"
          style={{ "--progress-width": `${clampedProgress}%` } as React.CSSProperties}
        />
      </div>
      {showLabel && (
        <span className="text-sm font-semibold text-blue-600 min-w-[3ch] text-right">
          {clampedProgress}%
        </span>
      )}
    </div>
  );
}
