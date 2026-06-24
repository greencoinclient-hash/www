import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Lock, Star } from 'lucide-react';
import { GameState, Level } from '../types';

interface LevelScreenProps {
  state: GameState;
  levels: Level[];
  onSelectLevel: (levelId: number) => void;
  onBack: () => void;
}

const ZONE_TABS = [
  { id: 0, name: 'All Topics' },
  { id: 1, name: 'Zone 1: Motion' },
  { id: 2, name: "Zone 2: Newton's Laws" },
  { id: 3, name: 'Zone 3: Forces & Gravity' },
  { id: 4, name: 'Zone 4: Work & Energy' },
  { id: 5, name: 'Zone 5: Momentum' },
];

export default function LevelScreen({ state, levels, onSelectLevel, onBack }: LevelScreenProps) {
  const [selectedZone, setSelectedZone] = useState(0);

  // Filter levels based on selected zone tab
  const filteredLevels = selectedZone === 0 ? levels : levels.filter((l) => l.zone === selectedZone);

  // The next level available to be played (max completed + 1)
  const maxCompleted = state.completedLevels.length > 0 ? Math.max(...state.completedLevels) : 0;
  const currentUnlocked = maxCompleted + 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 py-6"
    >
      {/* Top Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2.5 bg-slate-800 border border-slate-700/60 rounded-xl text-slate-300 hover:text-white transition-colors duration-150"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-100 leading-tight">Newton's Challenge Map</h2>
          <p className="text-xs text-slate-400">100 levels of physics mastery</p>
        </div>
      </div>

      {/* Zone Filters Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-thin scrollbar-thumb-slate-800">
        {ZONE_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedZone(tab.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-150 cursor-pointer ${
              selectedZone === tab.id
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Levels Grid */}
      <motion.div layout className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
        <AnimatePresence mode="popLayout">
          {filteredLevels.map((level) => {
            const isCompleted = state.completedLevels.includes(level.id);
            const isCurrent = level.id === currentUnlocked;
            const isLocked = level.id > currentUnlocked;
            const stars = state.levelStars[level.id] || 0;

            // Decide button colors
            let btnClass = 'border ';
            if (isCompleted) {
              btnClass += 'bg-emerald-950/40 text-emerald-300 border-emerald-800/80 hover:bg-emerald-950/60';
            } else if (isCurrent) {
              btnClass += 'bg-amber-500/20 text-amber-200 border-amber-500 shadow-md shadow-amber-500/10 hover:bg-amber-500/30';
            } else if (isLocked) {
              btnClass += 'bg-slate-900/30 text-slate-600 border-slate-950 cursor-not-allowed opacity-50';
            } else {
              // Unlocked but not completed yet (user jumped back)
              btnClass += 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800';
            }

            return (
              <motion.button
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                key={level.id}
                disabled={isLocked}
                onClick={() => onSelectLevel(level.id)}
                className={`relative flex flex-col items-center justify-center p-3 aspect-square rounded-2xl cursor-pointer transition-all ${btnClass}`}
                whileHover={!isLocked ? { y: -2, scale: 1.03 } : undefined}
                whileTap={!isLocked ? { scale: 0.97 } : undefined}
              >
                {/* Topic tooltip marker */}
                <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-slate-500/40" title={level.topic} />

                {isLocked ? (
                  <Lock size={16} className="text-slate-600 mt-1" />
                ) : (
                  <span className="text-lg font-bold font-mono tracking-tight">{level.id}</span>
                )}

                {/* Stars Indicator */}
                {!isLocked && (
                  <div className="flex gap-0.5 mt-1.5 h-3">
                    {[1, 2, 3].map((num) => (
                      <Star
                        key={num}
                        size={8}
                        className={num <= stars ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}
                      />
                    ))}
                  </div>
                )}

                {/* Micro details on hover / status */}
                {isCurrent && (
                  <span className="absolute -top-1 -left-1 px-1 py-0.5 rounded-md bg-amber-500 text-[8px] font-bold text-slate-950 uppercase tracking-wide">
                    Next
                  </span>
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
