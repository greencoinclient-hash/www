import { motion } from 'motion/react';
import { Play, Grid, Shield, Award, Sparkles } from 'lucide-react';
import { GameState } from '../types';

interface MenuScreenProps {
  state: GameState;
  onPlay: () => void;
  onNavigate: (screen: string) => void;
  carEmoji: string;
  onClaimQuest?: (questId: string) => void;
}

export default function MenuScreen({ state, onPlay, onNavigate, carEmoji, onClaimQuest }: MenuScreenProps) {
  return (
    <motion.div
      id="menuScreen"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="flex flex-col items-center justify-center min-h-[90vh] text-center px-4 py-8 space-y-4"
    >
      <div className="max-w-md w-full bg-slate-900/60 backdrop-blur-md border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Floating car avatar */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="text-6xl mb-6 select-none cursor-pointer"
          onClick={onPlay}
        >
          {carEmoji}
        </motion.div>

        {/* Logo and Titles */}
        <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase leading-none text-slate-100">
          PHYSICS <br />
          <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-sm">
            RALLY
          </span>
        </h1>
        <div className="text-[10px] tracking-[0.3em] font-mono text-amber-500 font-semibold mt-2 uppercase">
          Newton's Challenge
        </div>
        <p className="text-slate-400 text-sm mt-4 mb-8">
          Master acceleration, forces, work, and momentum. Solve physics challenges to reach the finish line!
        </p>

        {/* Core Buttons */}
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onPlay}
            className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold text-lg rounded-2xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-shadow duration-200"
          >
            <Play size={20} fill="currentColor" />
            PLAY NOW
          </motion.button>

          <div className="grid grid-cols-3 gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('levelScreen')}
              className="flex flex-col items-center justify-center py-3 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50 rounded-xl text-slate-200 text-xs gap-1"
            >
              <Grid size={18} className="text-amber-400" />
              <span>Levels</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('garageScreen')}
              className="flex flex-col items-center justify-center py-3 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50 rounded-xl text-slate-200 text-xs gap-1"
            >
              <Shield size={18} className="text-amber-400" />
              <span>Garage</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('achievementScreen')}
              className="flex flex-col items-center justify-center py-3 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50 rounded-xl text-slate-200 text-xs gap-1"
            >
              <Award size={18} className="text-amber-400" />
              <span>Badges</span>
            </motion.button>
          </div>
        </div>

        {/* Stats Summary Panel */}
        <div className="flex justify-between items-center gap-2 mt-8 pt-6 border-t border-slate-800">
          <div className="flex-1 bg-slate-950/50 border border-slate-800/60 rounded-2xl py-3 px-2">
            <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
              Coins
            </span>
            <strong className="text-base font-bold text-amber-400 font-mono">
              🪙 {state.coins}
            </strong>
          </div>

          <div className="flex-1 bg-slate-950/50 border border-slate-800/60 rounded-2xl py-3 px-2">
            <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
              Total XP
            </span>
            <strong className="text-base font-bold text-slate-100 font-mono flex items-center justify-center gap-0.5">
              <Sparkles size={12} className="text-purple-400" />
              {state.xp}
            </strong>
          </div>

          <div className="flex-1 bg-slate-950/50 border border-slate-800/60 rounded-2xl py-3 px-2">
            <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
              Rallies
            </span>
            <strong className="text-base font-bold text-emerald-400 font-mono">
              🏁 {state.completedLevels.length}
            </strong>
          </div>
        </div>
      </div>

      {/* Daily Quests Card */}
      {state.dailyQuests && state.dailyQuests.length > 0 && (
        <div className="max-w-md w-full bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 rounded-3xl shadow-2xl text-left relative overflow-hidden">
          <div className="absolute top-0 left-0 w-16 h-16 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-black text-slate-200 tracking-wider uppercase flex items-center gap-1.5">
              <span className="text-amber-500 animate-pulse">⚡</span> Daily Missions
            </h3>
            <span className="text-[9px] text-slate-400 font-mono uppercase bg-slate-950/80 px-2 py-0.5 rounded-md border border-slate-800/80">
              Resets Daily
            </span>
          </div>

          <div className="space-y-3">
            {state.dailyQuests.map((quest) => {
              const pct = Math.min(100, (quest.current / quest.target) * 100);
              const isCompleted = quest.completed;
              const isClaimed = quest.claimed;

              return (
                <div
                  key={quest.id}
                  className={`p-3 rounded-xl border transition-all duration-200 flex items-center justify-between gap-4 ${
                    isClaimed
                      ? 'bg-slate-950/30 border-slate-900 opacity-60'
                      : isCompleted
                      ? 'bg-amber-950/20 border-amber-500/40'
                      : 'bg-slate-950/60 border-slate-850'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                      {isCompleted && !isClaimed && <span className="text-amber-400">✨</span>}
                      {quest.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isCompleted ? 'bg-amber-500' : 'bg-amber-500/60'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 font-bold">
                        {quest.current}/{quest.target}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-[10px] text-amber-400 font-extrabold mb-1 font-mono">
                      +🪙{quest.reward}
                    </span>
                    {isClaimed ? (
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider bg-slate-900/40 px-2 py-1 rounded border border-slate-850">
                        Claimed
                      </span>
                    ) : isCompleted ? (
                      <button
                        onClick={() => onClaimQuest?.(quest.id)}
                        className="text-[10px] text-slate-950 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 font-black px-3 py-1 rounded-lg uppercase tracking-wider shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      >
                        Claim
                      </button>
                    ) : (
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider bg-slate-800/40 border border-slate-700/50 px-2 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}
