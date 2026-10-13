import React, { useState } from 'react';
import { GRADES_DATA } from '../data/gradesData';
import { GradeData, StageData } from '../types/physics';
import { soundManager } from '../utils/sound';
import { BookOpen, Search, ArrowRight, Sparkles, Atom, ChevronRight } from 'lucide-react';

interface LessonsViewProps {
  onOpenStage: (gradeData: GradeData, stageData: StageData) => void;
  activeGrade: number;
}

export const LessonsView: React.FC<LessonsViewProps> = ({ onOpenStage, activeGrade }) => {
  const [selectedGrade, setSelectedGrade] = useState<number>(activeGrade);
  const [searchQuery, setSearchQuery] = useState('');

  const currentGradeData = GRADES_DATA.find((g) => g.grade === selectedGrade) || GRADES_DATA[6];

  const filteredStages = currentGradeData.stages.filter((s) => {
    return (
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.theory.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">📚</span>
            Fizika darslari va qo‘llanmalar
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Har bir sinfning to‘liq nazariy darslari, misollari va ilmiy qonuniyatlari.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Dars mavzusini qidirish..."
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Grade Selector Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        {GRADES_DATA.map((g) => (
          <button
            key={g.grade}
            onClick={() => {
              soundManager.playClick();
              setSelectedGrade(g.grade);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedGrade === g.grade
                ? 'bg-blue-500 text-white font-bold shadow-md shadow-blue-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {g.grade}-sinf
          </button>
        ))}
      </div>

      {/* Grade Title Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
          {currentGradeData.grade}-SINF DASTURI
        </div>
        <h3 className="text-xl font-bold text-white">{currentGradeData.title}</h3>
        <p className="text-xs text-slate-400 mt-1">{currentGradeData.description}</p>
      </div>

      {/* Stages Lessons List */}
      <div className="space-y-4">
        {filteredStages.map((stage) => (
          <div
            key={stage.stageNumber}
            className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  {stage.stageName}
                </span>
                <h4 className="text-lg font-bold text-white mt-0.5">{stage.title}</h4>
              </div>

              <button
                onClick={() => {
                  soundManager.playClick();
                  onOpenStage(currentGradeData, stage);
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <span>Darsga kirish</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
              {stage.theory}
            </p>

            {stage.keyPoints.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {stage.keyPoints.map((kp, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60"
                  >
                    • {kp}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
