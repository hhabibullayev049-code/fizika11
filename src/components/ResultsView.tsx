import React from 'react';
import { Student } from '../types/physics';
import { GRADES_DATA } from '../data/gradesData';
import { soundManager } from '../utils/sound';
import {
  Award,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Trophy,
  Printer,
  Calendar,
  Flame,
  FileCheck
} from 'lucide-react';

interface ResultsViewProps {
  currentStudent: Student;
  onNavigateToExam: (grade: number) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  currentStudent,
  onNavigateToExam,
}) => {
  const completedStagesCount = Object.keys(currentStudent.completedStages || {}).length;
  const examPasses = Object.values(currentStudent.examResults || {}).filter((e) => e.passed);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">📊</span>
            Mening Shaxsiy Natijalarim
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            {currentStudent.name}ning barcha bosqichlar va imtihonlar bo‘yicha akademik ko‘rsatkichlari.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto no-print"
        >
          <Printer className="w-4 h-4" />
          <span>Hisobotni chop etish</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-xs text-slate-400 font-semibold">Jami Ball</span>
          <div className="text-2xl font-black text-cyan-400 font-mono mt-1">
            {currentStudent.totalScore}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-xs text-slate-400 font-semibold">O‘rtacha Baho</span>
          <div className="text-2xl font-black text-amber-400 font-mono mt-1">
            ★ {currentStudent.averageGrade.toFixed(1)}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-xs text-slate-400 font-semibold">O‘tilgan Bosqichlar</span>
          <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
            {completedStagesCount} / 55
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-xs text-slate-400 font-semibold">Topshirilgan Imtihonlar</span>
          <div className="text-2xl font-black text-purple-400 font-mono mt-1">
            {examPasses.length} ta
          </div>
        </div>
      </div>

      {/* Grade-by-grade Progress Matrix */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-cyan-400" />
          <span>1–11-sinflar bo‘yicha bosqichlar holati</span>
        </h3>

        <div className="space-y-3">
          {GRADES_DATA.map((g) => {
            let doneCount = 0;
            for (let s = 1; s <= 5; s++) {
              if (currentStudent.completedStages[`g${g.grade}_s${s}`]) doneCount++;
            }
            const pct = Math.round((doneCount / 5) * 100);
            const examRes = currentStudent.examResults[g.grade];

            return (
              <div
                key={g.grade}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-slate-800 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0">
                    {g.grade}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white">{g.title}</h4>
                    <span className="text-[11px] text-slate-500">
                      5 ta bosqichdan {doneCount} tasi bajarildi ({pct}%)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  {examRes ? (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      Imtihon bahosi: {examRes.grade} ({examRes.percentage}%)
                    </span>
                  ) : (
                    <button
                      onClick={() => onNavigateToExam(g.grade)}
                      className="text-xs font-semibold px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-colors cursor-pointer"
                    >
                      Imtihon topshirish
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Diplomas & Certificates Section */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Yutuqlar va Rasmiy Sertifikatlar</span>
        </h3>

        {examPasses.length === 0 ? (
          <div className="p-6 rounded-2xl bg-slate-950/50 border border-slate-800/80 text-center text-xs text-slate-400">
            Siz hali biron sinf imtihonidan sertifikat olmadingiz. Imtihon bo‘limiga o‘ting va 4 yoki 5 baho olib rasmiy diplomga ega bo‘ling!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(currentStudent.examResults).map(([grd, res]) => {
              if (!res.passed) return null;
              return (
                <div
                  key={grd}
                  className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/30 to-slate-950 border border-amber-500/30 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                      ★
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{grd}-sinf Fizika Sertifikati</div>
                      <div className="text-[11px] text-amber-400 font-semibold">
                        Baho: {res.grade} · {res.percentage}% natija
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-400">{res.date}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
