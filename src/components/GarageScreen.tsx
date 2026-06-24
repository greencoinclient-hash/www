import { motion } from 'motion/react';
import { ArrowLeft, Check, Lock, Sparkles } from 'lucide-react';
import { GameState } from '../types';
import { CARS } from '../data/questions';

interface GarageScreenProps {
  state: GameState;
  onUnlockCar: (carId: string, cost: number) => void;
  onSelectCar: (carId: string) => void;
  onBack: () => void;
}

export default function GarageScreen({ state, onUnlockCar, onSelectCar, onBack }: GarageScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto px-4 py-6"
    >
      {/* Header with Coin Counter */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2.5 bg-slate-800 border border-slate-700/60 rounded-xl text-slate-300 hover:text-white transition-colors duration-150"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-100 leading-tight">Physics Garage</h2>
            <p className="text-xs text-slate-400">Upgrade your vehicle avatar</p>
          </div>
        </div>

        {/* Coin Balance */}
        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl py-2 px-4 flex items-center gap-2 shadow-lg shadow-amber-500/5">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Balance:</span>
          <span className="text-base font-black text-amber-400 font-mono">🪙 {state.coins}</span>
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 mb-6">
        <p className="text-xs text-slate-400 leading-relaxed">
          💡 <strong className="text-slate-300">Note:</strong> All car adjustments are purely aesthetic! Newton's laws of motion, force calculations, and gravity constants apply equally regardless of which vehicle model you select.
        </p>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {CARS.map((car) => {
          const isUnlocked = state.unlockedCars.includes(car.id);
          const isActive = state.activeCar === car.id;
          const canAfford = state.coins >= car.cost;

          return (
            <motion.div
              key={car.id}
              whileHover={{ y: -4 }}
              className={`flex flex-col justify-between p-5 rounded-2xl border transition-all ${
                isActive
                  ? 'bg-amber-500/10 border-amber-500 shadow-md shadow-amber-500/5'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-center mb-4">
                <div className="text-5xl my-3 select-none">{car.emoji}</div>
                <h3 className="text-sm font-bold text-slate-100">{car.name}</h3>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed min-h-[36px]">
                  {car.desc}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-2">
                {isUnlocked ? (
                  isActive ? (
                    <div className="flex items-center justify-center gap-1.5 w-full py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl">
                      <Check size={14} strokeWidth={3} />
                      EQUIPPED
                    </div>
                  ) : (
                    <button
                      onClick={() => onSelectCar(car.id)}
                      className="w-full py-2 bg-slate-800 hover:bg-slate-700/80 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700/60 transition-colors"
                    >
                      SELECT CAR
                    </button>
                  )
                ) : (
                  <button
                    disabled={!canAfford}
                    onClick={() => onUnlockCar(car.id, car.cost)}
                    className={`flex items-center justify-center gap-1 w-full py-2 font-bold text-xs rounded-xl border transition-all ${
                      canAfford
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 border-amber-400 hover:opacity-90 shadow-md shadow-amber-500/10'
                        : 'bg-slate-950/40 text-slate-500 border-slate-900 cursor-not-allowed'
                    }`}
                  >
                    <Lock size={12} />
                    <span>🪙 {car.cost} COINS</span>
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
