import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, X, Star, HelpCircle, ChevronRight, Pause, RotateCcw, Home, Award } from 'lucide-react';
import { GameState, Question } from '../types';
import { LEVELS, QUESTIONS } from '../data/questions';
import GameCanvas from './GameCanvas';

interface GameScreenProps {
  levelId: number;
  state: GameState;
  activeCarEmoji: string;
  onCompleteLevel: (levelId: number, stars: number, coinsEarned: number, xpEarned: number) => void;
  onExit: () => void;
}

export default function GameScreen({
  levelId,
  state,
  activeCarEmoji,
  onCompleteLevel,
  onExit,
}: GameScreenProps) {
  const level = LEVELS.find((l) => l.id === levelId) || LEVELS[0];

  // Shuffled stable pool of questions for this level
  const [questionPool, setQuestionPool] = useState<Question[]>([]);
  const [currentPoolIndex, setCurrentPoolIndex] = useState(0);

  // Core level statistics
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [questionsCorrect, setQuestionsCorrect] = useState(0);

  // Car animation offsets
  const [carX, setCarX] = useState(8); // start position
  const [carTargetX, setCarTargetX] = useState(8);
  const [carMoving, setCarMoving] = useState(false);
  const [wrongAnswerShake, setWrongAnswerShake] = useState(0);

  // Overlays & HUD states
  const [isPaused, setIsPaused] = useState(false);
  const [showVictory, setShowVictory] = useState(false);

  // Current Question Interactive State
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Shuffled stable options for current question
  const [currentChoices, setCurrentChoices] = useState<string[]>([]);
  const [correctChoiceText, setCorrectChoiceText] = useState<string>('');

  // Floating score popups
  const [scorePopups, setScorePopups] = useState<{ id: number; text: string; x: number; y: number }[]>([]);
  const popupIdRef = useRef(0);

  // Initialize and shuffle question pool for this zone
  useEffect(() => {
    const zoneKeys = ['motion', 'newtons', 'forces', 'work', 'momentum'];
    const zoneKey = zoneKeys[level.zone - 1] || 'motion';
    const originalQuestions = QUESTIONS[zoneKey] || QUESTIONS.motion;

    // Fisher-Yates shuffle
    const shuffled = [...originalQuestions].sort(() => Math.random() - 0.5);
    setQuestionPool(shuffled);
    setCurrentPoolIndex(0);

    // Reset variables
    setQuestionsAnswered(0);
    setQuestionsCorrect(0);
    setCarX(8);
    setCarTargetX(8);
    setCarMoving(false);
    setShowVictory(false);
    setIsPaused(false);
    setAnswered(false);
    setSelectedChoiceIndex(null);
    setIsCorrect(null);
  }, [levelId]);

  // Set current question choices once pool index is set
  useEffect(() => {
    if (questionPool.length === 0) return;
    const currentQ = questionPool[currentPoolIndex % questionPool.length];
    if (!currentQ) return;

    // Capture correct text
    const correctText = currentQ.choices[currentQ.correct];
    setCorrectChoiceText(correctText);

    // Shuffle the display choices
    const shuffledChoices = [...currentQ.choices].sort(() => Math.random() - 0.5);
    setCurrentChoices(shuffledChoices);

    // Reset interactive states
    setSelectedChoiceIndex(null);
    setAnswered(false);
    setIsCorrect(null);
  }, [questionPool, currentPoolIndex]);

  // Smooth car rolling loop
  useEffect(() => {
    if (!carMoving) return;

    let animId: number;
    const tick = () => {
      setCarX((prev) => {
        if (prev >= carTargetX) {
          setCarMoving(false);
          // If reached final checkpoint, open victory menu
          if (carTargetX >= 85) {
            setTimeout(() => {
              setShowVictory(true);
            }, 700);
          }
          return carTargetX;
        }
        return prev + 0.6; // step increment
      });
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [carMoving, carTargetX]);

  // Decrement wrong shake animation frame
  useEffect(() => {
    if (wrongAnswerShake === 0) return;
    const timer = setTimeout(() => {
      setWrongAnswerShake((prev) => Math.max(0, prev - 1));
    }, 40);
    return () => clearTimeout(timer);
  }, [wrongAnswerShake]);

  const currentQ = questionPool[currentPoolIndex % questionPool.length];

  const handleAnswerClick = (choiceText: string, choiceIdx: number) => {
    if (answered) return;

    const correct = choiceText === correctChoiceText;
    setSelectedChoiceIndex(choiceIdx);
    setAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      const nextCorrect = questionsCorrect + 1;
      setQuestionsCorrect(nextCorrect);
      setQuestionsAnswered((prev) => prev + 1);

      // Trigger floating reward popup
      const coinsPerStep = Math.ceil(level.coins / level.questionsNeeded);
      triggerPopup(`+🪙${coinsPerStep}`);

      // Push vehicle avatar forward along terrain
      const stepPct = 77 / level.questionsNeeded;
      const newTarget = Math.min(8 + nextCorrect * stepPct, 85);
      setCarTargetX(newTarget);
      setCarMoving(true);
    } else {
      // Wrong answer shakes vehicle
      setWrongAnswerShake(10);
    }
  };

  const triggerPopup = (text: string) => {
    const id = popupIdRef.current++;
    const popup = {
      id,
      text,
      x: 30 + Math.random() * 40,
      y: 40 + Math.random() * 20,
    };
    setScorePopups((prev) => [...prev, popup]);
    setTimeout(() => {
      setScorePopups((prev) => prev.filter((p) => p.id !== id));
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (questionsAnswered >= level.questionsNeeded) {
      // Reach the finish checkpoint
      setCarTargetX(90);
      setCarMoving(true);
    } else {
      // Pull next item
      setCurrentPoolIndex((prev) => prev + 1);
    }
  };

  const handleRetryQuestion = () => {
    // Shuffles other choices for same question to keep it fresh
    if (!currentQ) return;
    const shuffledChoices = [...currentQ.choices].sort(() => Math.random() - 0.5);
    setCurrentChoices(shuffledChoices);
    setSelectedChoiceIndex(null);
    setAnswered(false);
    setIsCorrect(null);
  };

  const triggerVictoryClaim = () => {
    const accuracy = questionsCorrect / Math.max(questionsAnswered, 1);
    const stars = accuracy >= 1 ? 3 : accuracy >= 0.7 ? 2 : 1;
    onCompleteLevel(level.id, stars, level.coins, level.xp);
  };

  const restartLevelRun = () => {
    setQuestionsAnswered(0);
    setQuestionsCorrect(0);
    setCarX(8);
    setCarTargetX(8);
    setCarMoving(false);
    setShowVictory(false);
    setIsPaused(false);
    setAnswered(false);
    setSelectedChoiceIndex(null);
    setIsCorrect(null);
    setCurrentPoolIndex(0);
  };

  if (!currentQ) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-slate-400 font-mono text-sm">
        Initializing Newton Engine...
      </div>
    );
  }

  return (
    <div className="relative max-w-4xl mx-auto flex flex-col min-h-[90vh]">
      {/* 1. HUD HEADER */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <button
          onClick={onExit}
          className="p-2 hover:bg-slate-900 border border-slate-800/80 rounded-xl text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          title="Exit Rally"
        >
          <ArrowLeft size={16} />
        </button>

        <div className="h-6 w-[1px] bg-slate-800" />

        {/* Currency balances */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-slate-500 font-mono font-bold tracking-wider uppercase">
              Coins
            </span>
            <span className="text-sm font-extrabold text-amber-400 font-mono">
              🪙 {state.coins}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[9px] text-slate-500 font-mono font-bold tracking-wider uppercase">
              XP
            </span>
            <span className="text-sm font-extrabold text-purple-400 font-mono">
              ⭐ {state.xp}
            </span>
          </div>
        </div>

        <div className="h-6 w-[1px] bg-slate-800" />

        {/* Level Banner */}
        <div className="flex-1 text-center px-2">
          <div className="text-sm font-black text-amber-500 uppercase tracking-tight">
            Level {level.id}
          </div>
          <div className="text-[10px] text-slate-400 truncate max-w-[140px] mx-auto font-medium">
            {level.topic}
          </div>
        </div>

        <div className="h-6 w-[1px] bg-slate-800" />

        {/* Pause Button */}
        <button
          onClick={() => setIsPaused(true)}
          className="p-2 hover:bg-slate-900 border border-slate-800/80 rounded-xl text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
        >
          <Pause size={14} />
        </button>
      </div>

      {/* 2. LIVE GAME CANVAS VIEW */}
      <GameCanvas
        carX={carX}
        activeCarEmoji={activeCarEmoji}
        terrain={level.terrain}
        carMoving={carMoving}
        wrongAnswerShake={wrongAnswerShake}
      />

      {/* Floating Popups */}
      <AnimatePresence>
        {scorePopups.map((pop) => (
          <motion.div
            key={pop.id}
            initial={{ opacity: 1, scale: 0.8, y: pop.y }}
            animate={{ opacity: 0, scale: 1.4, y: pop.y - 60 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute pointer-events-none font-black text-amber-400 text-lg drop-shadow-md z-30 font-mono"
            style={{ left: `${pop.x}%` }}
          >
            {pop.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 3. QUESTION CONTROLS PANEL */}
      <div className="flex-1 bg-slate-900/40 p-5 flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPoolIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Header Badge */}
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300 font-mono uppercase tracking-wider">
                Zone {level.zone} : Question {questionsAnswered + 1} of {level.questionsNeeded}
              </span>
              <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                <HelpCircle size={12} />
                {currentQ.topic}
              </span>
            </div>

            {/* Formula Helper */}
            {currentQ.formula && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-center gap-2.5">
                <span className="text-lg">📐</span>
                <div className="font-mono text-xs text-amber-400 font-semibold">
                  {currentQ.formula}
                </div>
              </div>
            )}

            {/* Question Text */}
            <h3 className="text-slate-100 text-base md:text-lg font-bold leading-relaxed">
              {currentQ.q}
            </h3>

            {/* Choices Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {currentChoices.map((choice, idx) => {
                const isSelected = selectedChoiceIndex === idx;
                const isCorrectChoice = choice === correctChoiceText;

                // Button colors based on selection states
                let btnStyle =
                  'border border-slate-800 bg-slate-900/60 text-slate-200 hover:bg-slate-800 hover:border-slate-700';

                if (answered) {
                  if (isCorrectChoice) {
                    btnStyle = 'border-emerald-500 bg-emerald-950/30 text-emerald-300 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'border-rose-500 bg-rose-950/30 text-rose-300 font-bold';
                  } else {
                    btnStyle = 'border-slate-950 bg-slate-950/40 text-slate-600 cursor-not-allowed';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={answered}
                    onClick={() => handleAnswerClick(choice, idx)}
                    className={`flex items-center gap-3 p-4 rounded-xl text-left text-sm transition-all duration-150 cursor-pointer ${btnStyle}`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border ${
                        answered
                          ? isCorrectChoice
                            ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                            : isSelected
                            ? 'bg-rose-500 border-rose-400 text-slate-950'
                            : 'bg-slate-950 border-slate-850 text-slate-700'
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-normal">{choice}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation card after submit */}
            {answered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className={`rounded-2xl p-4 border text-xs leading-relaxed ${
                  isCorrect
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                }`}
              >
                <div className="font-bold mb-1 flex items-center gap-1.5 uppercase tracking-wide text-[10px]">
                  {isCorrect ? (
                    <>
                      <Check size={12} strokeWidth={3} /> Correct Newton Solution!
                    </>
                  ) : (
                    <>
                      <X size={12} strokeWidth={3} /> Incorrect physics check
                    </>
                  )}
                </div>
                {currentQ.exp}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer actions bar */}
        <div className="mt-8 pt-4 border-t border-slate-900 flex justify-end h-14">
          {answered && (
            <motion.button
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={isCorrect ? handleNextQuestion : handleRetryQuestion}
              className={`flex items-center gap-1.5 px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-shadow cursor-pointer ${
                isCorrect
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 hover:opacity-90 shadow-amber-500/10'
                  : 'bg-slate-800 text-slate-200 border border-slate-700/60 hover:bg-slate-750'
              }`}
            >
              <span>{isCorrect ? 'Next Challenge' : 'Re-attempt'}</span>
              <ChevronRight size={14} />
            </motion.button>
          )}
        </div>
      </div>

      {/* 4. PAUSE MODAL OVERLAY */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 10 }}
              className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-sm w-full text-center space-y-6 shadow-2xl"
            >
              <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-amber-500 text-xl font-bold select-none">
                ⏸
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-100">RALLY PAUSED</h3>
                <p className="text-xs text-slate-400 mt-1">Take a breath, formula sheets can stay open!</p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setIsPaused(false)}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold text-sm rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Resume Run
                </button>
                <button
                  onClick={restartLevelRun}
                  className="flex items-center justify-center gap-1.5 w-full py-3 bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold text-sm rounded-xl border border-slate-700/60 transition-colors cursor-pointer"
                >
                  <RotateCcw size={14} />
                  Restart Level
                </button>
                <button
                  onClick={onExit}
                  className="flex items-center justify-center gap-1.5 w-full py-3 bg-slate-950 hover:bg-slate-900 text-slate-500 font-medium text-sm rounded-xl transition-colors cursor-pointer"
                >
                  <Home size={14} />
                  Abandon Rally
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. VICTORY CHECKPOINT MODAL */}
      <AnimatePresence>
        {showVictory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.85, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-md w-full text-center space-y-6 shadow-2xl relative overflow-hidden"
            >
              {/* Confetti decoration circles */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="text-6xl mb-2 animate-bounce select-none">🏆</div>

              <div>
                <h3 className="text-2xl font-black text-slate-100 uppercase tracking-tight">
                  LEVEL COMPLETE!
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Outstanding work. You successfully solved Newton's challenges!
                </p>
              </div>

              {/* Reward stats display */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                <div className="bg-slate-950/60 border border-slate-800 rounded-2xl py-3 px-2">
                  <span className="block text-[9px] text-slate-500 uppercase tracking-wider font-semibold font-mono">
                    Reward
                  </span>
                  <strong className="text-base font-bold text-amber-400 font-mono">
                    +🪙{level.coins}
                  </strong>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 rounded-2xl py-3 px-2">
                  <span className="block text-[9px] text-slate-500 uppercase tracking-wider font-semibold font-mono">
                    Experience
                  </span>
                  <strong className="text-base font-bold text-purple-400 font-mono">
                    +{level.xp} XP
                  </strong>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 rounded-2xl py-3 px-2">
                  <span className="block text-[9px] text-slate-500 uppercase tracking-wider font-semibold font-mono">
                    Stars
                  </span>
                  <div className="flex gap-0.5 justify-center mt-1">
                    {[1, 2, 3].map((num) => {
                      const accuracy = questionsCorrect / Math.max(questionsAnswered, 1);
                      const starsEarned = accuracy >= 1 ? 3 : accuracy >= 0.7 ? 2 : 1;
                      return (
                        <Star
                          key={num}
                          size={10}
                          className={
                            num <= starsEarned
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-800'
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 space-y-2">
                <button
                  onClick={triggerVictoryClaim}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-sm rounded-xl hover:opacity-95 shadow-lg shadow-amber-500/10 transition-opacity flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Award size={16} />
                  CLAIM & CONTINUE
                </button>
                <button
                  onClick={restartLevelRun}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  REPLAY LEVEL
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
