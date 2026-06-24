import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GameState } from './types';
import { LEVELS, CARS, ACHIEVEMENTS } from './data/questions';

import MenuScreen from './components/MenuScreen';
import LevelScreen from './components/LevelScreen';
import GarageScreen from './components/GarageScreen';
import AchievementScreen from './components/AchievementScreen';
import GameScreen from './components/GameScreen';

const DEFAULT_STATE: GameState = {
  coins: 0,
  xp: 0,
  completedLevels: [],
  levelStars: {},
  achievements: {},
  unlockedCars: ['basic'],
  activeCar: 'basic',
  currentLevel: 1,
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>(DEFAULT_STATE);
  const [activeScreen, setActiveScreen] = useState<string>('menuScreen');
  const [activeLevelId, setActiveLevelId] = useState<number | null>(null);

  // Daily login bonus state
  const [loginBonusClaimed, setLoginBonusClaimed] = useState<{
    streak: number;
    bonus: number;
  } | null>(null);

  // Load state from local storage on mount and process daily login bonus
  useEffect(() => {
    try {
      const saved = localStorage.getItem('physics_rally_state');
      let loadedState: GameState = DEFAULT_STATE;

      if (saved) {
        const parsed = JSON.parse(saved);
        loadedState = {
          ...DEFAULT_STATE,
          ...parsed,
          // Guard arrays and records
          completedLevels: parsed.completedLevels || [],
          levelStars: parsed.levelStars || {},
          achievements: parsed.achievements || {},
          unlockedCars: parsed.unlockedCars || ['basic'],
        };
      }

      // Check daily login bonus
      const today = new Date().toISOString().slice(0, 10);
      const lastLogin = loadedState.lastLoginDate;

      if (lastLogin !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().slice(0, 10);

        let streak = loadedState.consecutiveDays || 0;
        if (lastLogin === yesterdayStr) {
          streak += 1;
        } else {
          // If they missed a day or it's first login, reset streak to 1
          streak = 1;
        }

        // Calculate reward value (consecutive scaling bonus)
        const bonuses = [50, 100, 150, 200, 250, 300];
        const bonus = streak <= 6 ? bonuses[streak - 1] : 500;

        const updatedState = {
          ...loadedState,
          coins: loadedState.coins + bonus,
          lastLoginDate: today,
          consecutiveDays: streak,
        };

        setGameState(updatedState);
        localStorage.setItem('physics_rally_state', JSON.stringify(updatedState));

        // Display the claim celebration popup
        setLoginBonusClaimed({ streak, bonus });
      } else {
        setGameState(loadedState);
      }
    } catch (e) {
      console.error('Error loading game state:', e);
    }
  }, []);

  // Save state to local storage whenever game state updates
  const saveState = (newState: GameState) => {
    setGameState(newState);
    try {
      localStorage.setItem('physics_rally_state', JSON.stringify(newState));
    } catch (e) {
      console.error('Error saving game state:', e);
    }
  };

  // Helper to find the active car's emoji representation
  const getActiveCarEmoji = () => {
    const car = CARS.find((c) => c.id === gameState.activeCar);
    return car ? car.emoji : '🚗';
  };

  // Triggers level selection
  const handleSelectLevel = (levelId: number) => {
    setActiveLevelId(levelId);
    setActiveScreen('gameScreen');
  };

  // Starts the next incomplete level
  const handlePlayNow = () => {
    const maxCompleted = gameState.completedLevels.length > 0 ? Math.max(...gameState.completedLevels) : 0;
    const nextLevel = maxCompleted + 1;

    if (nextLevel <= 100) {
      handleSelectLevel(nextLevel);
    } else {
      // Re-play Level 1 if completed all 100
      handleSelectLevel(1);
    }
  };

  // Buy a car from the garage
  const handleUnlockCar = (carId: string, cost: number) => {
    if (gameState.coins < cost) return;

    const newUnlocked = [...gameState.unlockedCars, carId];
    const nextState = {
      ...gameState,
      coins: gameState.coins - cost,
      unlockedCars: newUnlocked,
      activeCar: carId, // auto equip
    };

    // Evaluate and save state
    const evaluatedState = evaluateAchievements(nextState);
    saveState(evaluatedState);
  };

  // Equip an owned car
  const handleSelectCar = (carId: string) => {
    if (!gameState.unlockedCars.includes(carId)) return;

    const nextState = {
      ...gameState,
      activeCar: carId,
    };
    saveState(nextState);
  };

  // Check achievements and unlock matching ones
  const evaluateAchievements = (current: GameState): GameState => {
    const copy = { ...current };
    const completed = copy.completedLevels;
    const achievements = { ...copy.achievements };

    // 1. First Victory
    if (completed.length >= 1) achievements.first_win = true;

    // 2. Speed Demon (10 levels)
    if (completed.length >= 10) achievements.speed_demon = true;

    // 3. Halfway there (50 levels)
    if (completed.length >= 50) achievements.halfway = true;

    // 4. Century mark (100 levels)
    if (completed.length >= 100) achievements.century = true;

    // 5. Coin collector (500 coins)
    if (copy.coins >= 500) achievements.coin_collector = true;

    // 6. XP Champion (1000 XP)
    if (copy.xp >= 1000) achievements.xp_champion = true;

    // 7. Car Enthusiast (Unlocked more than 1 car)
    if (copy.unlockedCars.length > 1) achievements.car_buyer = true;

    // 8. Zone 2 Complete
    const z2Levels = LEVELS.filter((l) => l.zone === 2).map((l) => l.id);
    const z2Complete = z2Levels.every((id) => completed.includes(id));
    if (z2Complete) achievements.newton_fan = true;

    // 9. Zone 3 Complete
    const z3Levels = LEVELS.filter((l) => l.zone === 3).map((l) => l.id);
    const z3Complete = z3Levels.every((id) => completed.includes(id));
    if (z3Complete) achievements.force_master = true;

    // 10. Zone 4 Complete
    const z4Levels = LEVELS.filter((l) => l.zone === 4).map((l) => l.id);
    const z4Complete = z4Levels.every((id) => completed.includes(id));
    if (z4Complete) achievements.energy_guru = true;

    // 11. Zone 5 Complete
    const z5Levels = LEVELS.filter((l) => l.zone === 5).map((l) => l.id);
    const z5Complete = z5Levels.every((id) => completed.includes(id));
    if (z5Complete) achievements.momentum_king = true;

    // 12. Perfect Run
    // Set at least once dynamically on first-try correct responses
    if (copy.achievements.perfect_run) {
      achievements.perfect_run = true;
    }

    copy.achievements = achievements;
    return copy;
  };

  // Complete a level successfully
  const handleCompleteLevel = (
    levelId: number,
    stars: number,
    coinsEarned: number,
    xpEarned: number
  ) => {
    const updatedCompleted = gameState.completedLevels.includes(levelId)
      ? gameState.completedLevels
      : [...gameState.completedLevels, levelId];

    const updatedStars = {
      ...gameState.levelStars,
      [levelId]: Math.max(gameState.levelStars[levelId] || 0, stars),
    };

    const nextState = {
      ...gameState,
      coins: gameState.coins + coinsEarned,
      xp: gameState.xp + xpEarned,
      completedLevels: updatedCompleted,
      levelStars: updatedStars,
    };

    // If they got 3 stars on a first-run or similar, let's unlock Perfect Run
    if (stars === 3) {
      nextState.achievements = {
        ...nextState.achievements,
        perfect_run: true,
      };
    }

    const evaluatedState = evaluateAchievements(nextState);
    saveState(evaluatedState);

    // Navigate to level select screen to view updated stars and next paths
    setActiveScreen('levelScreen');
    setActiveLevelId(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Ambient background grids */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#020617_1px,transparent_1px),linear-gradient(to_bottom,#020617_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none z-0 opacity-40" />

      {/* Primary Container */}
      <main className="flex-1 relative z-10 w-full flex flex-col justify-center">
        {activeScreen === 'menuScreen' && (
          <MenuScreen
            state={gameState}
            onPlay={handlePlayNow}
            onNavigate={setActiveScreen}
            carEmoji={getActiveCarEmoji()}
          />
        )}

        {activeScreen === 'levelScreen' && (
          <LevelScreen
            state={gameState}
            levels={LEVELS}
            onSelectLevel={handleSelectLevel}
            onBack={() => setActiveScreen('menuScreen')}
          />
        )}

        {activeScreen === 'garageScreen' && (
          <GarageScreen
            state={gameState}
            onUnlockCar={handleUnlockCar}
            onSelectCar={handleSelectCar}
            onBack={() => setActiveScreen('menuScreen')}
          />
        )}

        {activeScreen === 'achievementScreen' && (
          <AchievementScreen state={gameState} onBack={() => setActiveScreen('menuScreen')} />
        )}

        {activeScreen === 'gameScreen' && activeLevelId !== null && (
          <GameScreen
            levelId={activeLevelId}
            state={gameState}
            activeCarEmoji={getActiveCarEmoji()}
            onCompleteLevel={handleCompleteLevel}
            onExit={() => {
              setActiveScreen('levelScreen');
              setActiveLevelId(null);
            }}
          />
        )}
      </main>

      {/* Daily Login Bonus Claim Modal Overlay */}
      <AnimatePresence>
        {loginBonusClaimed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-md w-full text-center space-y-6 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="text-6xl mb-2 animate-bounce select-none">🎁</div>

              <div>
                <h3 className="text-2xl font-black text-slate-100 uppercase tracking-tight">
                  Daily Login Reward!
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Welcome back to Physics Rally. Keep up your streak to earn even bigger prizes!
                </p>
              </div>

              {/* Streak Tracker Visual */}
              <div className="grid grid-cols-7 gap-1.5 py-4">
                {[1, 2, 3, 4, 5, 6, 7].map((dayNum) => {
                  const dayBonus = dayNum === 7 ? 500 : dayNum * 50;
                  const isCurrent = loginBonusClaimed.streak === dayNum;
                  const isPassed = loginBonusClaimed.streak > dayNum;

                  return (
                    <div
                      key={dayNum}
                      className={`flex flex-col items-center justify-between p-1.5 rounded-xl border text-center transition-all ${
                        isCurrent
                          ? 'bg-amber-500/20 border-amber-500 shadow-md shadow-amber-500/10 scale-105'
                          : isPassed
                          ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-400'
                          : 'bg-slate-950/50 border-slate-850 text-slate-600'
                      }`}
                    >
                      <span className="text-[8px] font-mono font-bold uppercase block">
                        Day {dayNum}
                      </span>
                      <span className="text-sm my-1 select-none">🪙</span>
                      <span className="text-[9px] font-mono font-extrabold block">
                        {dayBonus}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="bg-slate-950/60 border border-slate-850 rounded-2xl py-4 px-6">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold font-mono block">
                  Today's Bonus Claimed
                </span>
                <strong className="text-2xl font-black text-amber-400 font-mono block mt-1">
                  +🪙{loginBonusClaimed.bonus}
                </strong>
                <p className="text-[10px] text-slate-400 mt-1">
                  Your consecutive streak is now <span className="text-amber-400 font-bold">{loginBonusClaimed.streak}</span> days!
                </p>
              </div>

              <button
                onClick={() => setLoginBonusClaimed(null)}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-sm rounded-xl hover:opacity-95 shadow-lg shadow-amber-500/10 transition-opacity flex items-center justify-center gap-1 cursor-pointer"
              >
                CLAIM COINS & DRIVE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Brand Footer */}
      <footer className="py-6 text-center text-xs text-slate-500 relative z-10 border-t border-slate-900 mt-auto bg-slate-950/80 backdrop-blur-md">
        <p>
          &copy; 2026 <span className="font-bold text-amber-500 font-mono">Greenforth Tech</span>. All rights reserved.
        </p>
        <p className="text-[10px] text-slate-600 mt-1">
          Made with ❤️ by Greenforth Tech
        </p>
      </footer>
    </div>
  );
}
