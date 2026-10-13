import React, { useState } from 'react';
import { Student } from '../types/physics';
import { soundManager } from '../utils/sound';
import { Trophy, Medal, Search, Star, Award, UserCheck, ArrowUpRight } from 'lucide-react';

interface LeaderboardViewProps {
  students: Student[];
  currentStudent: Student;
  onSelectStudentProfile: (student: Student) => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  students,
  currentStudent,
  onSelectStudentProfile,
}) => {
  const [gradeFilter, setGradeFilter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sort students descending by totalScore
  const sortedStudents = [...students].sort((a, b) => b.totalScore - a.totalScore);

  const filteredStudents = sortedStudents.filter((std) => {
    const matchesGrade = gradeFilter === 'all' || std.grade === gradeFilter;
    const matchesSearch =
      std.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (std.school && std.school.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesGrade && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">🏆</span>
            O‘quvchilar umumiy reytingi
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Respublika bo‘ylab {students.length}+ nafar iqtidorli yosh fiziklar reyting jadvali.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="O‘quvchi ismini qidirish..."
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Top 3 Podium (if no search active) */}
      {!searchQuery && gradeFilter === 'all' && sortedStudents.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* 2nd Place */}
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-700/60 flex flex-col items-center text-center relative order-2 md:order-1">
            <span className="text-3xl mb-1">🥈</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">2-o‘rin (Kumush)</span>
            <div className={`w-14 h-14 rounded-2xl ${sortedStudents[1].avatarColor || 'bg-indigo-500'} text-white font-bold text-lg flex items-center justify-center my-2 shadow-lg`}>
              {sortedStudents[1].name.slice(0, 2).toUpperCase()}
            </div>
            <h4 className="text-base font-bold text-white">{sortedStudents[1].name}</h4>
            <span className="text-xs text-slate-400">{sortedStudents[1].grade}-sinf · {sortedStudents[1].school || 'Maktab'}</span>
            <div className="mt-3 text-lg font-black text-cyan-400 font-mono">
              {sortedStudents[1].totalScore} ball
            </div>
          </div>

          {/* 1st Place Champion */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-900 border-2 border-amber-500/50 flex flex-col items-center text-center relative order-1 md:order-2 shadow-2xl shadow-amber-950/30">
            <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
              Mutlaq G‘olib
            </div>
            <span className="text-4xl mb-1">🥇</span>
            <span className="text-xs font-black text-amber-400 uppercase tracking-wider">1-o‘rin (Oltin)</span>
            <div className={`w-16 h-16 rounded-2xl ${sortedStudents[0].avatarColor || 'bg-emerald-500'} text-white font-black text-xl flex items-center justify-center my-2 shadow-xl shadow-amber-500/20`}>
              {sortedStudents[0].name.slice(0, 2).toUpperCase()}
            </div>
            <h4 className="text-lg font-black text-white">{sortedStudents[0].name}</h4>
            <span className="text-xs text-slate-300 font-medium">{sortedStudents[0].grade}-sinf · {sortedStudents[0].school || 'Maktab'}</span>
            <div className="mt-3 text-2xl font-black text-amber-400 font-mono">
              {sortedStudents[0].totalScore} ball
            </div>
          </div>

          {/* 3rd Place */}
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-700/60 flex flex-col items-center text-center relative order-3">
            <span className="text-3xl mb-1">🥉</span>
            <span className="text-[11px] font-bold text-amber-600/80 uppercase tracking-wider">3-o‘rin (Bronza)</span>
            <div className={`w-14 h-14 rounded-2xl ${sortedStudents[2].avatarColor || 'bg-cyan-500'} text-white font-bold text-lg flex items-center justify-center my-2 shadow-lg`}>
              {sortedStudents[2].name.slice(0, 2).toUpperCase()}
            </div>
            <h4 className="text-base font-bold text-white">{sortedStudents[2].name}</h4>
            <span className="text-xs text-slate-400">{sortedStudents[2].grade}-sinf · {sortedStudents[2].school || 'Maktab'}</span>
            <div className="mt-3 text-lg font-black text-cyan-400 font-mono">
              {sortedStudents[2].totalScore} ball
            </div>
          </div>
        </div>
      )}

      {/* Grade Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        <button
          onClick={() => {
            soundManager.playClick();
            setGradeFilter('all');
          }}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
            gradeFilter === 'all'
              ? 'bg-amber-500 text-slate-950 font-bold'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Barcha sinflar ({students.length})
        </button>
        {Array.from({ length: 11 }, (_, i) => i + 1).map((g) => {
          const count = students.filter((s) => s.grade === g).length;
          return (
            <button
              key={g}
              onClick={() => {
                soundManager.playClick();
                setGradeFilter(g);
              }}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                gradeFilter === g
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {g}-sinf ({count})
            </button>
          );
        })}
      </div>

      {/* Leaderboard Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4 w-16 text-center">O‘rin</th>
                <th className="py-3.5 px-4">O‘quvchi</th>
                <th className="py-3.5 px-4">Sinfi & Maktabi</th>
                <th className="py-3.5 px-4 text-center">Baho</th>
                <th className="py-3.5 px-4 text-center">Bosqichlar</th>
                <th className="py-3.5 px-4 text-right">Jami Ball</th>
                <th className="py-3.5 px-4 text-center w-20">Profil</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredStudents.map((std, index) => {
                const isCurrent = std.name.toLowerCase() === currentStudent.name.toLowerCase();
                const completedCount = Object.keys(std.completedStages || {}).length;

                return (
                  <tr
                    key={std.id}
                    className={`transition-colors ${
                      isCurrent
                        ? 'bg-cyan-950/40 hover:bg-cyan-950/60 text-white font-semibold'
                        : 'hover:bg-slate-800/40 text-slate-300'
                    }`}
                  >
                    <td className="py-3 px-4 text-center">
                      {index === 0 ? (
                        <span className="text-base">🥇</span>
                      ) : index === 1 ? (
                        <span className="text-base">🥈</span>
                      ) : index === 2 ? (
                        <span className="text-base">🥉</span>
                      ) : (
                        <span className="font-mono text-slate-500 font-bold">#{index + 1}</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl ${
                            std.avatarColor || 'bg-slate-700'
                          } text-white font-bold text-xs flex items-center justify-center shrink-0`}
                        >
                          {std.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <span>{std.name}</span>
                            {isCurrent && (
                              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-1.5 py-0.2 rounded font-normal">
                                Siz
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      <div>{std.grade}-sinf</div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[180px]">{std.school || 'Maktab'}</div>
                    </td>
                    <td className="py-3 px-4 text-center font-bold">
                      <span className="text-amber-400">★ {std.averageGrade.toFixed(1)}</span>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-400 font-mono">
                      {completedCount} ta
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-cyan-400 text-sm">
                      {std.totalScore}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => {
                          soundManager.playClick();
                          onSelectStudentProfile(std);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title="Profilni ko‘rish"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
