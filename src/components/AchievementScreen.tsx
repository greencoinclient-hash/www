import { motion } from 'motion/react';
import { ArrowLeft, Award, CheckCircle } from 'lucide-react';
import { GameState } from '../types';
import { ACHIEVEMENTS } from '../data/questions';

interface AchievementScreenProps {
  state: GameState;
  onBack: () => void;
}

export default function AchievementScreen({ state, onBack }: AchievementScreenProps) {
  // Count earned achievements
  const earnedCount = ACHIEVEMENTS.filter((ach) => state.achievements[ach.id]).length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="max-w-4xl mx-auto px-4 py-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2.5 bg-slate-800 border border-slate-700/60 rounded-xl text-slate-300 hover:text-white transition-colors duration-150"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-100 leading-tight">Honor Badges</h2>
            <p className="text-xs text-slate-400">Your scientific achievements</p>
          </div>
        </div>

        {/* Progress Badge */}
        <div className="bg-slate-900 border border-purple-500/30 rounded-2xl py-2 px-4 flex items-center gap-2">
          <Award size={16} className="text-purple-400" />
          <span className="text-xs text-slate-300 font-semibold font-mono">
            {earnedCount} / {ACHIEVEMENTS.length} Earned
          </span>
        </div>
      </div>

      {/* Grid of Achievements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {ACHIEVEMENTS.map((ach) => {
          const isEarned = !!state.achievements[ach.id];

          return (
            <motion.div
              key={ach.id}
              whileHover={isEarned ? { scale: 1.02 } : undefined}
              className={`flex items-start gap-4 p-5 rounded-2xl border transition-all ${
                isEarned
                  ? 'bg-gradient-to-br from-purple-950/20 to-indigo-950/10 border-purple-800/80'
                  : 'bg-slate-900/30 border-slate-800/60 opacity-60'
              }`}
            >
              {/* Icon Container */}
              <div
                className={`text-3xl p-3 rounded-xl flex items-center justify-center select-none ${
                  isEarned ? 'bg-purple-500/20' : 'bg-slate-800 text-slate-600'
                }`}
              >
                {ach.icon}
              </div>

              {/* Achievement description */}
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-sm font-bold truncate ${
                    isEarned ? 'text-purple-300' : 'text-slate-400'
                  }`}
                >
                  {ach.name}
                </h3>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">{ach.desc}</p>

                {isEarned && (
                  <div className="flex items-center gap-1 mt-2 text-[10px] text-purple-400 font-bold font-mono tracking-wider uppercase">
                    <CheckCircle size={10} strokeWidth={3} />
                    <span>Completed!</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
