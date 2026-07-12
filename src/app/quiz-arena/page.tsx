'use client';

import React, { useState, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { mythologyDb } from '@/data/seed';
import { audioEngine } from '@/utils/audioEngine';
import { HelpCircle, Award, Clock, ArrowRight, Zap, RefreshCw, Star } from 'lucide-react';

export default function QuizArena() {
  const state = useGameStore();

  const [setupMode, setSetupMode] = useState(true);
  const [selectedPantheon, setSelectedPantheon] = useState<'greek' | 'norse' | 'egyptian'>('greek');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Initiate' | 'Scholar' | 'Champion'>('Initiate');

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizFinished, setQuizFinished] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [eliminatedOption, setEliminatedOption] = useState<string | null>(null);

  // Countdown timer logic
  useEffect(() => {
    if (setupMode || quizFinished || selectedAnswer !== null) return;
    
    if (timeLeft === 0) {
      handleAnswerSelect(''); // register blank/time-out answer
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, setupMode, quizFinished, selectedAnswer]);

  const handleStartQuiz = () => {
    audioEngine.playForge();
    
    // Fetch questions matching criteria
    const list = mythologyDb.quizQuestions.filter(
      q => q.pantheon === selectedPantheon && q.difficulty === selectedDifficulty
    );

    // Grab 5 random questions (or fewer if database is small, though our db has 50 per pantheon)
    const shuffled = [...list].sort(() => 0.5 - Math.random()).slice(0, 5);
    
    setQuestions(shuffled);
    setCurrentIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setTimeLeft(30);
    setHintUsed(false);
    setEliminatedOption(null);
    setQuizFinished(false);
    setSetupMode(false);
  };

  const handleAnswerSelect = (opt: string) => {
    if (selectedAnswer !== null) return; // safeguard

    setSelectedAnswer(opt);
    const correct = opt === questions[currentIdx].answer;

    if (correct) {
      audioEngine.playClick();
      setScore(prev => prev + 1);
    } else {
      audioEngine.playBattleImpact();
    }
  };

  const handleNext = () => {
    audioEngine.playClick();
    
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
      setHintUsed(false);
      setEliminatedOption(null);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    audioEngine.playLevelUp();
    setQuizFinished(true);
    state.recordQuizScore(selectedPantheon, selectedDifficulty, score, questions.length);
  };

  const handleUseHint = () => {
    if (state.oracleTokens < 1 || hintUsed || selectedAnswer !== null) return;
    
    audioEngine.playCodexDiscovery();
    state.addOracleTokens(-1);
    setHintUsed(true);

    // Hides/Eliminates one incorrect option
    const activeQ = questions[currentIdx];
    const incorrects = activeQ.options.filter((opt: string) => opt !== activeQ.answer);
    const randomIncorrect = incorrects[Math.floor(Math.random() * incorrects.length)];
    setEliminatedOption(randomIncorrect);
  };

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-neutral-900 pb-4">
        <h1 className="text-2xl font-serif font-bold uppercase tracking-wider text-neutral-100">THE QUIZ ARENA</h1>
        <p className="text-xs text-neutral-500">Engage in knowledge battles to earn experience, gold coins, and oracle tokens.</p>
      </div>

      {setupMode ? (
        
        /* SETUP MODE LAYOUT */
        <div className="bg-neutral-900/40 border border-neutral-850 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="space-y-4">
            <label className="text-xs text-neutral-400 font-semibold uppercase tracking-wider block">1. Select Pantheon</label>
            <div className="grid grid-cols-3 gap-4">
              {(['greek', 'norse', 'egyptian'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => {
                    setSelectedPantheon(p);
                    audioEngine.playClick();
                  }}
                  className={`py-3 rounded-lg border font-serif font-bold uppercase text-xs transition-colors ${
                    selectedPantheon === p 
                      ? 'border-amber-500 bg-amber-500/10 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.1)]' 
                      : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs text-neutral-400 font-semibold uppercase tracking-wider block">2. Select Difficulty</label>
            <div className="grid grid-cols-3 gap-4">
              {(['Initiate', 'Scholar', 'Champion'] as const).map(d => (
                <button
                  key={d}
                  onClick={() => {
                    setSelectedDifficulty(d);
                    audioEngine.playClick();
                  }}
                  className={`py-3 rounded-lg border font-serif font-bold uppercase text-xs transition-colors ${
                    selectedDifficulty === d 
                      ? 'border-amber-500 bg-amber-500/10 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.1)]' 
                      : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStartQuiz}
            className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-serif font-black tracking-widest text-sm uppercase rounded-lg transition-transform hover:scale-[1.02] shadow-[0_0_20px_rgba(245,158,11,0.2)]"
          >
            ENTER THE ARENA
          </button>
        </div>

      ) : quizFinished ? (
        
        /* FINISHED SCORE CARD LAYOUT */
        <div className="bg-neutral-900/40 border border-neutral-850 rounded-2xl p-6 sm:p-8 space-y-6 text-center">
          <div className="space-y-2">
            <Award className="text-amber-500 mx-auto" size={48} />
            <h2 className="text-3xl font-serif font-black text-neutral-100 tracking-wider">ARENA CHALLENGE COMPLETE</h2>
            <p className="text-xs text-neutral-400">You scored {score} out of {questions.length} questions correctly.</p>
          </div>

          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-850 max-w-sm mx-auto text-xs text-left space-y-2">
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold block border-b border-neutral-900 pb-1.5">REWARDS DISTRIBUTED</span>
            <div className="flex justify-between items-center text-amber-500"><span>Experience Gained</span><span>+{score * 10} XP</span></div>
            <div className="flex justify-between items-center text-amber-500"><span>Oracle Tokens Earned</span><span>✨ +{score === questions.length ? 2 : 1} Tokens</span></div>
            <div className="flex justify-between items-center text-neutral-400 pt-1.5 border-t border-neutral-900"><span>Correct Rate</span><span>{Math.floor((score / questions.length) * 100)}%</span></div>
          </div>

          <button
            onClick={() => setSetupMode(true)}
            className="w-full max-w-sm py-3 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-serif font-bold tracking-widest text-xs uppercase rounded transition-colors"
          >
            PLAY AGAIN
          </button>
        </div>

      ) : (
        
        /* PLAYING CHALLENGE ACTIVE QUESTION LAYOUT */
        <div className="bg-neutral-905 border border-neutral-850 rounded-2xl p-6 space-y-6 relative">
          
          {/* Header metrics */}
          <div className="flex justify-between items-center border-b border-neutral-850 pb-3 text-xs text-neutral-500 font-serif">
            <span>QUESTION {currentIdx + 1} OF {questions.length}</span>
            <span className="flex items-center gap-1 text-red-500 font-mono font-bold">
              <Clock size={14} /> {timeLeft}s
            </span>
          </div>

          {/* Question stem */}
          <h3 className="font-serif font-bold text-neutral-100 text-lg leading-relaxed">
            {questions[currentIdx].question}
          </h3>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-2.5">
            {questions[currentIdx].options.map((opt: string, idx: number) => {
              const active = selectedAnswer === opt;
              const isCorrect = opt === questions[currentIdx].answer;
              const isEliminated = opt === eliminatedOption;
              
              let btnStyle = 'border-neutral-850 bg-neutral-950 hover:border-neutral-750';
              if (selectedAnswer !== null) {
                if (isCorrect) btnStyle = 'border-green-500/50 bg-green-500/10 text-green-400 font-semibold';
                else if (active) btnStyle = 'border-red-500/50 bg-red-500/10 text-red-400';
                else btnStyle = 'border-neutral-900 bg-neutral-950/20 opacity-30';
              } else if (isEliminated) {
                btnStyle = 'border-neutral-900 bg-neutral-950/20 opacity-20 cursor-not-allowed';
              }

              return (
                <button
                  key={idx}
                  disabled={selectedAnswer !== null || isEliminated}
                  onClick={() => handleAnswerSelect(opt)}
                  className={`text-left p-4 rounded-lg border text-xs text-neutral-250 transition-colors ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Actions & Hints footer */}
          <div className="flex justify-between items-center border-t border-neutral-850 pt-4 gap-4">
            
            <button
              onClick={handleUseHint}
              disabled={state.oracleTokens < 1 || hintUsed || selectedAnswer !== null}
              className="px-4 py-2 border border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10 text-purple-400 disabled:opacity-45 text-xs font-serif tracking-wide rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Zap size={12} />
              <span>Spend Token Hint ({state.oracleTokens} held)</span>
            </button>

            {selectedAnswer !== null && (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-serif font-bold tracking-widest text-xs uppercase rounded flex items-center gap-1.5 transition-colors shrink-0"
              >
                <span>NEXT</span>
                <ArrowRight size={14} />
              </button>
            )}

          </div>

          {/* Explanation if answered */}
          {selectedAnswer !== null && (
            <div className="p-3.5 bg-neutral-950 border border-neutral-850 rounded-lg text-[11px] text-neutral-500 mt-2 font-mono">
              💡 Hint / Context: {questions[currentIdx].hint}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
