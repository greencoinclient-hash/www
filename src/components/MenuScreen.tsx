import { motion } from 'motion/react';
import { Play, Grid, Shield, Award, Sparkles } from 'lucide-react';
import { GameState } from '../types';

interface MenuScreenProps {
  state: GameState;
  onPlay: () => void;
  onNavigate: (screen: string) => void;
  carEmoji: string;
}

export default function MenuScreen({ state, onPlay, onNavigate, carEmoji }: MenuScreenProps) {
  return (
    <motion.div
      id="menuScreen"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="flex flex-col items-center justify-center min-h-[90vh] text-center px-4 py-8"
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
    </motion.div>
  );
}
