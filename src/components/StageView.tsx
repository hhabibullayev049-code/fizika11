import React, { useState } from 'react';
import { StageData, GradeData } from '../types/physics';
import { soundManager } from '../utils/sound';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Atom,
  Award,
  Layers,
  FlaskConical,
  RotateCcw
} from 'lucide-react';

interface StageViewProps {
  gradeData: GradeData;
  stageData: StageData;
  onCompleteStage: (grade: number, stageNumber: number, score: number, gradeMark: number) => void;
  onBackToGrade: () => void;
  onNextStage?: () => void;
  isCompletedAlready: boolean;
}

export const StageView: React.FC<StageViewProps> = ({
  gradeData,
  stageData,
  onCompleteStage,
  onBackToGrade,
  onNextStage,
  isCompletedAlready,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [calculatedScore, setCalculatedScore] = useState(0);
  const [gradeMark, setGradeMark] = useState(0);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    soundManager.playClick();
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleCheckAnswers = () => {
    soundManager.playClick();
    let total = 0;
    let earned = 0;

    stageData.questions.forEach((q) => {
      total += q.points;
      if (selectedAnswers[q.id] === q.correctIndex) {
        earned += q.points;
      }
    });

    const percentage = total > 0 ? (earned / total) * 100 : 100;
    let mark = 5;
    if (percentage < 60) mark = 2;
    else if (percentage < 75) mark = 3;
    else if (percentage < 88) mark = 4;
    else mark = 5;

    setCalculatedScore(earned);
    setGradeMark(mark);
    setIsSubmitted(true);

    if (mark >= 3) {
      soundManager.playLevelUp();
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
      onCompleteStage(gradeData.grade, stageData.stageNumber, earned, mark);
    } else {
      soundManager.playWrong();
    }
  };

  const handleRetry = () => {
    soundManager.playClick();
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCalculatedScore(0);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Top Breadcrumb & Return */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToGrade}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{gradeData.grade}-sinf mavzulariga qaytish</span>
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-cyan-400 font-semibold">{gradeData.grade}-sinf</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-300 font-medium">{stageData.stageName}</span>
          {isCompletedAlready && (
            <span className="text-emerald-400 font-semibold flex items-center gap-1 ml-2">
              <CheckCircle2 className="w-3.5 h-3.5" /> O‘zlashtirilgan
            </span>
          )}
        </div>
      </div>

      {/* Stage Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
            <span className="p-1 rounded-md bg-cyan-500/10 border border-cyan-500/20">
              {stageData.stageNumber}-BOSQICH
            </span>
            <span>·</span>
            <span>{stageData.stageName}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {stageData.title}
          </h2>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl leading-relaxed">
            {stageData.description}
          </p>
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none hidden sm:block">
          <Atom className="w-48 h-48 text-cyan-400" />
        </div>
      </div>

      {/* 1. Nazariya va Qoidalar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>Qisqa va tushunarli nazariya</span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
          {stageData.theory}
        </p>

        {stageData.keyPoints.length > 0 && (
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Asosiy tushunchalar:</span>
            <ul className="space-y-1.5">
              {stageData.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Formula block if exists */}
        {stageData.formulaLatex && (
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">Mavzu formulasi:</span>
              <div className="text-sm font-bold text-white mt-0.5">{stageData.formulaName || 'Asosiy formula'}</div>
            </div>
            <div className="font-mono text-xl font-extrabold text-cyan-300 bg-slate-900/90 px-4 py-2 rounded-lg border border-cyan-500/30">
              {stageData.formulaLatex}
            </div>
          </div>
        )}
      </div>

      {/* 2. Misollar va Yechimlar */}
      {stageData.examples.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Mavzuga oid namunaviy misollar</span>
          </div>

          <div className="space-y-3">
            {stageData.examples.map((ex, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-slate-300 flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0">{idx + 1}-misol:</span>
                  <span>{ex.problem}</span>
                </div>
                <div className="text-xs text-emerald-400 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-800/30">
                  <span className="font-bold">Yechimi: </span> {ex.solution}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Test Savollari va Amaliy Masalalar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>Bosqich sinov testlari ({stageData.questions.length} ta savol)</span>
          </div>
          <span className="text-xs text-slate-400">Har bir to‘g‘ri javob ball beradi</span>
        </div>

        <div className="space-y-6">
          {stageData.questions.map((q, qIndex) => {
            const chosen = selectedAnswers[q.id];
            const hasChosen = chosen !== undefined;

            return (
              <div key={q.id} className="space-y-3 p-4 rounded-xl bg-slate-950/40 border border-slate-800/80">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-cyan-400 text-xs font-bold flex items-center justify-center shrink-0">
                    {qIndex + 1}
                  </span>
                  <div className="text-sm font-medium text-white">{q.question}</div>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {q.options.map((option, optIdx) => {
                    const isSelected = chosen === optIdx;
                    let optionStyle = 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (isSubmitted) {
                      if (optIdx === q.correctIndex) {
                        optionStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-semibold';
                      } else if (isSelected && optIdx !== q.correctIndex) {
                        optionStyle = 'bg-rose-950/40 border-rose-500 text-rose-300';
                      } else {
                        optionStyle = 'bg-slate-900/40 border-slate-800 text-slate-500';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-cyan-950/50 border-cyan-400 text-cyan-200 font-semibold shadow-sm shadow-cyan-950';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        disabled={isSubmitted}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`p-3 rounded-xl border text-xs text-left transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                      >
                        <span>{option}</span>
                        {isSubmitted && optIdx === q.correctIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                        )}
                        {isSubmitted && isSelected && optIdx !== q.correctIndex && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation after submission */}
                {isSubmitted && (
                  <div className="p-3 rounded-lg bg-slate-800/70 border border-slate-700 text-xs text-slate-300 mt-2">
                    <span className="font-semibold text-cyan-400">Izoh: </span> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Results Banner when Submitted */}
        {isSubmitted ? (
          <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-4 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="text-xs text-slate-400 font-medium">Sinov natijalari:</div>
                <div className="text-2xl font-extrabold text-white mt-1 flex items-center gap-3">
                  <span>To‘plangan ball: <span className="text-cyan-400">{calculatedScore} ball</span></span>
                  <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
                    gradeMark >= 4 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    gradeMark === 3 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}>
                    Baho: {gradeMark} ({gradeMark === 5 ? 'A’lo' : gradeMark === 4 ? 'Yaxshi' : gradeMark === 3 ? 'Qoniqarli' : 'Qayta topshiring'})
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleRetry}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Qayta urinish</span>
                </button>

                {gradeMark >= 3 && onNextStage && (
                  <button
                    onClick={onNextStage}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
                  >
                    <span>Keyingi bosqich</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleCheckAnswers}
              disabled={Object.keys(selectedAnswers).length === 0}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-40 transition-all cursor-pointer"
            >
              <span>Tekshirish va Baholash</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
