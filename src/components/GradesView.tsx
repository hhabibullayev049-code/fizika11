import React, { useState } from 'react';
import { GRADES_DATA } from '../data/gradesData';
import { GradeData, Student, StageData } from '../types/physics';
import { soundManager } from '../utils/sound';
import {
  GraduationCap,
  ChevronRight,
  Lock,
  Unlock,
  CheckCircle2,
  BookOpen,
  Atom,
  Award,
  ArrowRight,
  Flame,
  ArrowLeft
} from 'lucide-react';

interface GradesViewProps {
  currentStudent: Student;
  activeGradeNumber: number;
  onSelectGrade: (grade: number) => void;
  onOpenStage: (gradeData: GradeData, stageData: StageData) => void;
}

export const GradesView: React.FC<GradesViewProps> = ({
  currentStudent,
  activeGradeNumber,
  onSelectGrade,
  onOpenStage,
}) => {
  const [inspectingGrade, setInspectingGrade] = useState<GradeData | null>(() => {
    return GRADES_DATA.find((g) => g.grade === activeGradeNumber) || GRADES_DATA[6];
  });

  const getCompletedCountForGrade = (grade: number) => {
    let count = 0;
    for (let s = 1; s <= 5; s++) {
      if (currentStudent.completedStages[`g${grade}_s${s}`]) {
        count++;
      }
    }
    return count;
  };

  const isStageUnlocked = (grade: number, stageNumber: number) => {
    if (stageNumber === 1) return true;
    // Stage N unlocked if Stage N-1 is completed, or if student already has higher progress
    return !!currentStudent.completedStages[`g${grade}_s${stageNumber - 1}`];
  };

  // If viewing a specific grade's 5 stages
  if (inspectingGrade) {
    const completedCount = getCompletedCountForGrade(inspectingGrade.grade);
    const progressPercent = Math.round((completedCount / 5) * 100);

    return (
      <div className="space-y-6 pb-12">
        {/* Back to all 11 grades */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              soundManager.playClick();
              setInspectingGrade(null);
            }}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Barcha 1–11 sinflar ro‘yxatiga qaytish</span>
          </button>

          <span className="text-xs text-cyan-400 font-mono">
            {completedCount} / 5 bosqich bajarildi ({progressPercent}%)
          </span>
        </div>

        {/* Grade Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{inspectingGrade.grade}-sinf fizika kursi ({inspectingGrade.ageGroup})</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {inspectingGrade.title}
            </h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              {inspectingGrade.description}
            </p>

            {/* Progress Bar */}
            <div className="mt-5 space-y-1.5 max-w-md">
              <div className="flex justify-between text-xs font-medium text-slate-400">
                <span>O‘zlashtirish darajasi:</span>
                <span className="text-cyan-400 font-mono font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none hidden md:block">
            <Atom className="w-56 h-56 text-cyan-400" />
          </div>
        </div>

        {/* 5 Stages Grid for this Grade */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span>5 ta bosqichli ta’lim dasturi</span>
            <span className="text-xs font-normal text-slate-500">(Ketma-ket bajaring)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inspectingGrade.stages.map((stage) => {
              const isUnlocked = isStageUnlocked(inspectingGrade.grade, stage.stageNumber);
              const isDone = !!currentStudent.completedStages[`g${inspectingGrade.grade}_s${stage.stageNumber}`];
              const score = currentStudent.stageScores[`g${inspectingGrade.grade}_s${stage.stageNumber}`];

              return (
                <div
                  key={stage.stageNumber}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between relative ${
                    isDone
                      ? 'bg-slate-900/90 border-emerald-500/50 shadow-lg shadow-emerald-950/20'
                      : isUnlocked
                      ? 'bg-slate-900 border-cyan-500/40 shadow-lg shadow-cyan-950/20'
                      : 'bg-slate-950/50 border-slate-800/80 opacity-60'
                  }`}
                >
                  <div>
                    {/* Stage status indicator */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                        {stage.stageName}
                      </span>
                      {isDone ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Bajarildi
                        </span>
                      ) : isUnlocked ? (
                        <span className="flex items-center gap-1 text-[11px] font-medium text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                          <Unlock className="w-3 h-3" /> Ochiq
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-800/40 px-2 py-0.5 rounded-full border border-slate-700/30">
                          <Lock className="w-3 h-3" /> Qulflangan
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-white mb-1.5">{stage.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                      {stage.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between mt-auto">
                    {score !== undefined ? (
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        Natija: {score} ball
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500">
                        {stage.questions.length} ta savol
                      </span>
                    )}

                    <button
                      onClick={() => {
                        if (isUnlocked) {
                          soundManager.playClick();
                          onOpenStage(inspectingGrade, stage);
                        } else {
                          soundManager.playWrong();
                        }
                      }}
                      disabled={!isUnlocked}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isUnlocked
                          ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <span>{isDone ? 'Takrorlash' : isUnlocked ? 'Bosqichga kirish' : 'Qulflangan'}</span>
                      {isUnlocked && <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // All 11 Grades Overview Cards
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">🎓</span>
            1–11-sinflar ta’lim kartalari
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Istalgan sinfni tanlang va uning 5 ta bosqichli to‘liq dasturini o‘rganing.
          </p>
        </div>
      </div>

      {/* Grid of 11 Grades */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {GRADES_DATA.map((gradeItem) => {
          const completedCount = getCompletedCountForGrade(gradeItem.grade);
          const percent = Math.round((completedCount / 5) * 100);
          const isSelectedActive = gradeItem.grade === activeGradeNumber;

          return (
            <div
              key={gradeItem.grade}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between hover:scale-[1.01] ${
                isSelectedActive
                  ? 'bg-slate-900 border-cyan-500/70 shadow-xl shadow-cyan-950/30 ring-1 ring-cyan-500/40'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 font-extrabold text-sm flex items-center justify-center">
                    {gradeItem.grade}
                  </span>

                  <span className="text-[11px] font-medium text-slate-400">
                    {gradeItem.ageGroup}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight mb-1">
                  {gradeItem.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {gradeItem.tagline}
                </p>
              </div>

              {/* Progress & Actions */}
              <div className="space-y-3 pt-3 border-t border-slate-800/80 mt-auto">
                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-1">
                    <span>O‘tilgan: {completedCount} / 5 bosqich</span>
                    <span className="text-cyan-400 font-mono">{percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/60">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    onSelectGrade(gradeItem.grade);
                    setInspectingGrade(gradeItem);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-md shadow-cyan-500/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Sinfga kirish</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
