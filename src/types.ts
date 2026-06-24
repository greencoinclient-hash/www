export interface Car {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  cost: number;
  unlocked: boolean;
}

export interface Question {
  q: string;
  choices: string[];
  correct: number;
  exp: string;
  formula?: string;
  topic: string;
  zone: string;
}

export interface Level {
  id: number;
  zone: number;
  terrain: string;
  topic: string;
  questionsNeeded: number;
  coins: number;
  xp: number;
  difficulty: number;
}

export interface Achievement {
  id: string;
  name: string;
  icon: string;
  desc: string;
  earned: boolean;
}

export interface GameState {
  coins: number;
  xp: number;
  completedLevels: number[];
  levelStars: Record<number, number>; // levelId -> stars (1-3)
  achievements: Record<string, boolean>; // achievementId -> earned
  unlockedCars: string[];
  activeCar: string;
  currentLevel: number;
  lastLoginDate?: string; // YYYY-MM-DD
  consecutiveDays?: number; // count of consecutive days
}
