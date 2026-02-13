"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { GameState, Rank, Achievement } from "@/types";
import { stages } from "@/data/quests";

const GAME_STORAGE_KEY = "aus-wh-game";

const RANKS: Rank[] = [
  { level: 1, title: "워홀 꿈나무", emoji: "🥚", minXP: 0 },
  { level: 2, title: "준비생", emoji: "🐣", minXP: 30 },
  { level: 3, title: "신청자", emoji: "🐥", minXP: 80 },
  { level: 4, title: "예비 워홀러", emoji: "🐤", minXP: 140 },
  { level: 5, title: "워홀 마스터", emoji: "🦅", minXP: 190 },
];

const ACHIEVEMENTS: Achievement[] = [
  { id: "first_quest", title: "첫 발걸음", description: "첫 번째 퀘스트 완료", emoji: "👣" },
  { id: "stage_1_clear", title: "자격 확인 완료", description: "Stage 1 클리어", emoji: "📋" },
  { id: "stage_2_clear", title: "비자 신청 완료", description: "Stage 2 클리어", emoji: "📝" },
  { id: "half_way", title: "반 왔다!", description: "전체 퀘스트 50% 달성", emoji: "🏃" },
  { id: "stage_3_clear", title: "출발 준비 완료", description: "Stage 3 클리어", emoji: "🎒" },
  { id: "all_clear", title: "워홀 마스터", description: "모든 퀘스트 완료", emoji: "🏆" },
];

function getRankByXP(xp: number): Rank {
  let currentRank = RANKS[0];
  for (const rank of RANKS) {
    if (xp >= rank.minXP) {
      currentRank = rank;
    }
  }
  return currentRank;
}

function getNextRank(currentLevel: number): Rank | null {
  const nextIndex = RANKS.findIndex((r) => r.level === currentLevel) + 1;
  if (nextIndex >= RANKS.length) return null;
  return RANKS[nextIndex];
}

function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

function loadGameState(): GameState {
  if (typeof window === "undefined") {
    return { xp: 0, level: 1, achievements: [], streak: 0, lastVisit: getTodayString() };
  }
  const stored = localStorage.getItem(GAME_STORAGE_KEY);
  if (!stored) {
    return { xp: 0, level: 1, achievements: [], streak: 0, lastVisit: getTodayString() };
  }
  return JSON.parse(stored) as GameState;
}

function saveGameState(state: GameState): void {
  localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(state));
}

function updateStreak(state: GameState): GameState {
  const today = getTodayString();
  if (state.lastVisit === today) return state;

  const lastDate = new Date(state.lastVisit);
  const todayDate = new Date(today);
  const diffDays = Math.floor(
    (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 1) {
    return { ...state, streak: state.streak + 1, lastVisit: today };
  }
  // Streak resets if more than 1 day gap
  return { ...state, streak: 1, lastVisit: today };
}

interface AddXPResult {
  leveledUp: boolean;
  newAchievements: string[];
}

interface UseGameSystemReturn {
  gameState: GameState;
  currentRank: Rank;
  nextRank: Rank | null;
  xpToNextLevel: number;
  xpProgress: number;
  addXP: (amount: number) => AddXPResult;
  removeXP: (amount: number) => void;
  achievements: Achievement[];
  unlockedAchievements: Achievement[];
  checkAchievements: (completedQuests: string[]) => string[];
  streak: number;
  resetGameState: () => void;
}

export function useGameSystem(): UseGameSystemReturn {
  const [gameState, setGameState] = useState<GameState>(() => loadGameState());

  // Initialize and update streak on mount
  useEffect(() => {
    setGameState((prev) => {
      const loaded = loadGameState();
      const updated = updateStreak(loaded);
      if (updated !== loaded) {
        saveGameState(updated);
      }
      return updated;
    });
  }, []);

  // Persist game state changes
  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  const currentRank = useMemo(() => getRankByXP(gameState.xp), [gameState.xp]);
  const nextRank = useMemo(() => getNextRank(currentRank.level), [currentRank.level]);

  const xpToNextLevel = useMemo((): number => {
    if (!nextRank) return 0;
    return nextRank.minXP - gameState.xp;
  }, [nextRank, gameState.xp]);

  const xpProgress = useMemo((): number => {
    if (!nextRank) return 100;
    const currentMin = currentRank.minXP;
    const nextMin = nextRank.minXP;
    const range = nextMin - currentMin;
    if (range === 0) return 100;
    return Math.round(((gameState.xp - currentMin) / range) * 100);
  }, [gameState.xp, currentRank.minXP, nextRank]);

  const addXP = useCallback((amount: number): AddXPResult => {
    let leveledUp = false;
    const newAchievementIds: string[] = [];

    setGameState((prev) => {
      const newXP = prev.xp + amount;
      const oldRank = getRankByXP(prev.xp);
      const newRank = getRankByXP(newXP);

      if (newRank.level > oldRank.level) {
        leveledUp = true;
      }

      return {
        ...prev,
        xp: newXP,
        level: newRank.level,
      };
    });

    return { leveledUp, newAchievements: newAchievementIds };
  }, []);

  const removeXP = useCallback((amount: number): void => {
    setGameState((prev) => {
      const newXP = Math.max(0, prev.xp - amount);
      const newRank = getRankByXP(newXP);
      return {
        ...prev,
        xp: newXP,
        level: newRank.level,
      };
    });
  }, []);

  const checkAchievements = useCallback(
    (completedQuests: string[]): string[] => {
      const newAchievements: string[] = [];
      const totalQuests = stages.reduce((acc, s) => acc + s.quests.length, 0);

      const checks: Array<{ id: string; condition: boolean }> = [
        { id: "first_quest", condition: completedQuests.length >= 1 },
        {
          id: "stage_1_clear",
          condition: stages[0].quests.every((q) => completedQuests.includes(q.id)),
        },
        {
          id: "stage_2_clear",
          condition: stages[1].quests.every((q) => completedQuests.includes(q.id)),
        },
        {
          id: "half_way",
          condition: completedQuests.length >= Math.ceil(totalQuests / 2),
        },
        {
          id: "stage_3_clear",
          condition: stages[2].quests.every((q) => completedQuests.includes(q.id)),
        },
        {
          id: "all_clear",
          condition: completedQuests.length >= totalQuests,
        },
      ];

      setGameState((prev) => {
        let updated = false;
        const currentAchievements = [...prev.achievements];

        for (const check of checks) {
          if (check.condition && !currentAchievements.includes(check.id)) {
            currentAchievements.push(check.id);
            newAchievements.push(check.id);
            updated = true;
          }
        }

        if (!updated) return prev;
        return { ...prev, achievements: currentAchievements };
      });

      return newAchievements;
    },
    []
  );

  const unlockedAchievements = useMemo((): Achievement[] => {
    return ACHIEVEMENTS.filter((a) => gameState.achievements.includes(a.id));
  }, [gameState.achievements]);

  const resetGameState = useCallback((): void => {
    const initial: GameState = {
      xp: 0,
      level: 1,
      achievements: [],
      streak: 1,
      lastVisit: getTodayString(),
    };
    setGameState(initial);
  }, []);

  return {
    gameState,
    currentRank,
    nextRank,
    xpToNextLevel,
    xpProgress,
    addXP,
    removeXP,
    achievements: ACHIEVEMENTS,
    unlockedAchievements,
    checkAchievements,
    streak: gameState.streak,
    resetGameState,
  };
}
