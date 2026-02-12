"use client";

import { Quest } from "@/types";

interface QuestCardProps {
  quest: Quest;
  isCompleted: boolean;
  onToggle: (questId: string) => void;
  disabled?: boolean;
}

export default function QuestCard({
  quest,
  isCompleted,
  onToggle,
  disabled = false,
}: QuestCardProps): React.ReactElement {
  const handleClick = (): void => {
    if (disabled) return;
    onToggle(quest.id);
  };

  return (
    <div
      className={`glass-card p-4 transition-all duration-200 ${
        isCompleted
          ? "bg-green-50/70 border-green-200/50"
          : "bg-white/70"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:shadow-md"}`}
      onClick={handleClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <div className="pt-0.5">
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              isCompleted
                ? "bg-green-500 border-green-500"
                : "border-gray-300 bg-white"
            }`}
          >
            {isCompleted && (
              <svg
                className="w-3.5 h-3.5 text-white check-animate"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-lg">{quest.emoji}</span>
            <h3
              className={`font-semibold text-gray-900 ${
                isCompleted ? "line-through text-gray-400" : ""
              }`}
            >
              {quest.title}
            </h3>
          </div>
          <p
            className={`text-sm mt-1 ${
              isCompleted ? "text-gray-400 line-through" : "text-gray-600"
            }`}
          >
            {quest.description}
          </p>
          {quest.guideUrl && (
            <a
              href={quest.guideUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-blue-500 hover:text-blue-700 mt-2 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              가이드 보기 &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
