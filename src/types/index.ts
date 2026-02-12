export interface Quest {
  id: string;
  title: string;
  description: string;
  guideUrl?: string;
  emoji: string;
}

export interface Stage {
  id: number;
  title: string;
  description: string;
  emoji: string;
  color: string;
  quests: Quest[];
}

export interface UserProgress {
  completedQuests: string[];
  currentStage: number;
  startedAt: string;
}
