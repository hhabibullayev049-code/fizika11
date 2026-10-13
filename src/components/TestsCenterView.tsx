import React, { useState } from 'react';
import { GRADES_DATA } from '../data/gradesData';
import { QuizQuestion } from '../types/physics';
import { soundManager } from '../utils/sound';
import {
  FileQuestion,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';

interface TestsCenterViewProps {
  onEarnScore: (points: number) => void;
}

export const TestsCenterView: React.FC<TestsCenterViewProps> = ({ onEarnScore }) => {
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);

  // Collect pool of questions based on selected grade
  const questionsPool = GRADES_DATA.filter((g) => selectedGrade === 'all' || g.grade === selectedGrade)
    .flatMap((g) => g.stages.flatMap((s) => s.questions));

  const currentQ: QuizQuestion = questionsPool[currentIdx % questionsPool.length] || questionsPool[0];

  const handleSelectAnswer = (optIndex: number) => {
    if (isAnswered) return;
    soundManager.playClick();
    setSelectedOpt(optIndex);
    setIsAnswered(true);
    setTotalAttempted((prev) => prev + 1);

    if (optIndex === currentQ.correctIndex) {
      soundManager.playCorrect();
      setCorrectStreak((prev) => prev + 1);
      setTotalCorrect((prev) => prev + 1);
      onEarnScore(currentQ.points);
    } else {
      soundManager.playWrong();
      setCorrectStreak(0);
    }
  };

  const handleNextQuestion = () => {
    soundManager.playClick();
    setSelectedOpt(null);
    setIsAnswered(false);
    setCurrentIdx((prev) => (prev + 1) % questionsPool.length);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">📝</span>
            Interaktiv Testlar Markazi
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Bilimingizni mustahkamlang, ketma-ket to‘g‘ri javoblar to‘plang va qo‘shimcha ballar yutib oling.
          </p>
        </div>

        {/* Streak & Accuracy Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>Streak: {correctStreak}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
            <Award className="w-4 h-4" />
            <span>To‘g‘ri: {totalCorrect} / {totalAttempted}</span>
          </div>
        </div>
      </div>

      {/* Grade Selector Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        <button
          onClick={() => {
            soundManager.playClick();
            setSelectedGrade('all');
            setCurrentIdx(0);
            setIsAnswered(false);
            setSelectedOpt(null);
          }}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
            selectedGrade === 'all'
              ? 'bg-purple-500 text-white font-bold shadow-md shadow-purple-500/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Aralash barcha sinflar
        </button>
        {Array.from({ length: 11 }, (_, i) => i + 1).map((g) => (
          <button
            key={g}
            onClick={() => {
              soundManager.playClick();
              setSelectedGrade(g);
              setCurrentIdx(0);
              setIsAnswered(false);
              setSelectedOpt(null);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedGrade === g
                ? 'bg-purple-500 text-white font-bold shadow-md shadow-purple-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {g}-sinf
          </button>
        ))}
      </div>

      {/* Main Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-purple-400">
            {selectedGrade === 'all' ? 'Aralash test' : `${selectedGrade}-sinf testi`}
          </span>
          <span className="font-mono">
            {(currentIdx % questionsPool.length) + 1} / {questionsPool.length}-savol
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
          {currentQ.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt, oIdx) => {
            const isChosen = selectedOpt === oIdx;
            let btnClass = 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900';

            if (isAnswered) {
              if (oIdx === currentQ.correctIndex) {
                btnClass = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
              } else if (isChosen) {
                btnClass = 'bg-rose-950/60 border-rose-500 text-rose-300';
              } else {
                btnClass = 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={oIdx}
                disabled={isAnswered}
                onClick={() => handleSelectAnswer(oIdx)}
                className={`w-full p-4 rounded-2xl border text-sm text-left transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
              >
                <span>{opt}</span>
                {isAnswered && oIdx === currentQ.correctIndex && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-3" />
                )}
                {isAnswered && isChosen && oIdx !== currentQ.correctIndex && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-3" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation & Next question button */}
        {isAnswered && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 animate-fade-in">
            <div className="text-xs text-slate-300">
              <span className="font-bold text-cyan-400">Izoh: </span>
              {currentQ.explanation}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-500/20 cursor-pointer"
              >
                <span>Keyingi savol</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
