"use client";

import { useState, useEffect, useCallback } from "react";
import { UserProgress } from "@/types";
import { stages, getTotalQuestCount, getQuestCountByStage } from "@/data/quests";
import { calculateProgress } from "@/lib/utils";

const STORAGE_KEY = "aus-wh-progress";

function loadProgress(): UserProgress {
  if (typeof window === "undefined") {
    return { completedQuests: [], currentStage: 1, startedAt: new Date().toISOString() };
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return { completedQuests: [], currentStage: 1, startedAt: new Date().toISOString() };
  }
  return JSON.parse(stored) as UserProgress;
}

function saveProgress(progress: UserProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function deriveCurrentStage(completedQuests: string[]): number {
  for (const stage of stages) {
    const allCompleted = stage.quests.every((q) => completedQuests.includes(q.id));
    if (!allCompleted) {
      return stage.id;
    }
  }
  return stages.length;
}

interface UseProgressReturn {
  progress: UserProgress;
  completeQuest: (questId: string) => void;
  uncompleteQuest: (questId: string) => void;
  isQuestCompleted: (questId: string) => boolean;
  getStageProgress: (stageId: number) => number;
  getTotalProgress: () => number;
  resetProgress: () => void;
}

export function useProgress(): UseProgressReturn {
  const [progress, setProgress] = useState<UserProgress>(() => loadProgress());

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const completeQuest = useCallback((questId: string): void => {
    setProgress((prev) => {
      if (prev.completedQuests.includes(questId)) return prev;
      const updated = [...prev.completedQuests, questId];
      return {
        ...prev,
        completedQuests: updated,
        currentStage: deriveCurrentStage(updated),
      };
    });
  }, []);

  const uncompleteQuest = useCallback((questId: string): void => {
    setProgress((prev) => {
      const updated = prev.completedQuests.filter((id) => id !== questId);
      return {
        ...prev,
        completedQuests: updated,
        currentStage: deriveCurrentStage(updated),
      };
    });
  }, []);

  const isQuestCompleted = useCallback(
    (questId: string): boolean => {
      return progress.completedQuests.includes(questId);
    },
    [progress.completedQuests]
  );

  const getStageProgress = useCallback(
    (stageId: number): number => {
      const stage = stages.find((s) => s.id === stageId);
      if (!stage) return 0;
      const completed = stage.quests.filter((q) =>
        progress.completedQuests.includes(q.id)
      ).length;
      return calculateProgress(completed, getQuestCountByStage(stageId));
    },
    [progress.completedQuests]
  );

  const getTotalProgressValue = useCallback((): number => {
    return calculateProgress(progress.completedQuests.length, getTotalQuestCount());
  }, [progress.completedQuests]);

  const resetProgress = useCallback((): void => {
    const initial: UserProgress = {
      completedQuests: [],
      currentStage: 1,
      startedAt: new Date().toISOString(),
    };
    setProgress(initial);
  }, []);

  return {
    progress,
    completeQuest,
    uncompleteQuest,
    isQuestCompleted,
    getStageProgress,
    getTotalProgress: getTotalProgressValue,
    resetProgress,
  };
}
