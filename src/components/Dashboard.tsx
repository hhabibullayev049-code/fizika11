import React from 'react';
import { Student } from '../types/physics';
import { GRADES_DATA } from '../data/gradesData';
import { soundManager } from '../utils/sound';
import {
  Sparkles,
  GraduationCap,
  Award,
  BookOpen,
  FlaskConical,
  Calculator,
  Trophy,
  Users,
  BarChart3,
  Flame,
  ArrowRight,
  Atom,
  Compass,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface DashboardProps {
  currentStudent: Student;
  onNavigateTab: (tabId: string) => void;
  onSelectGrade: (grade: number) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentStudent,
  onNavigateTab,
  onSelectGrade,
}) => {
  const completedStagesCount = Object.keys(currentStudent.completedStages || {}).length;
  const currentGradeData = GRADES_DATA.find((g) => g.grade === currentStudent.grade) || GRADES_DATA[6];

  // Daily physics facts in Uzbek
  const dailyPhysicsFacts = [
    { title: 'Yorug‘lik tezligi', text: 'Yorug‘lik nuri vakuumda 1 sekundda 300,000 km masofani bosib o‘tadi — bu Yer ekvatorini 1 sekundda 7.5 marta aylanib chiqishga teng!' },
    { title: 'Eynshteyn kashfiyoti', text: 'E = mc² formulasiga binoan oddiy bir dona olma massasidagi to‘liq energiya butun bir shaharni oylar davomida elektr bilan ta’minlay oladi.' },
    { title: 'Arximed qonuni', text: 'Temir mix suvga cho‘kadi, lekin ulkan po‘lat kema suzadi — chunki kemaning suv ostidagi umumiy o‘rtacha zichligi suvdan kamroqdir.' },
  ];
  const todayFact = dailyPhysicsFacts[0];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Welcome & Student Status Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Xush kelibsiz, yosh fizik!</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Assalomu alaykum, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">{currentStudent.name}</span>!
          </h2>

          <p className="text-slate-300 text-sm mt-2 max-w-xl leading-relaxed">
            Siz hozirda <strong className="text-white">{currentStudent.grade}-sinf</strong> kursidasiz. Fizika olami bo‘ylab sayohatni davom ettiring, bosqichlarni zabt eting va imtihonlardan o‘ting.
          </p>

          {/* Core Dashboard Metric Badges (Strictly meeting prompt requirements) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 backdrop-blur-sm">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Tanlangan sinf
              </span>
              <div className="text-xl font-black text-white mt-0.5 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                <span>{currentStudent.grade}-sinf</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 backdrop-blur-sm">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Jami ballar
              </span>
              <div className="text-xl font-black text-cyan-400 font-mono mt-0.5 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>{currentStudent.totalScore} ball</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 backdrop-blur-sm">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                O‘rtacha baho
              </span>
              <div className="text-xl font-black text-amber-400 font-mono mt-0.5 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>★ {currentStudent.averageGrade.toFixed(1)}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 backdrop-blur-sm">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Bajarilgan bosqichlar
              </span>
              <div className="text-xl font-black text-emerald-400 font-mono mt-0.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{completedStagesCount} / 55</span>
              </div>
            </div>
          </div>
        </div>

        {/* Orbit Background visual */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none hidden lg:block">
          <Atom className="w-64 h-64 text-cyan-400 animate-spin" style={{ animationDuration: '40s' }} />
        </div>
      </div>

      {/* 2. Quick Feature Launchers (Interactive Shortcuts) */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Asosiy interaktiv bo‘limlar:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Classes */}
          <div
            onClick={() => {
              soundManager.playClick();
              onNavigateTab('grades');
            }}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/60 hover:bg-slate-850 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                1–11-sinflar
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Har bir sinfda 5 ta bosqich: nazariya, tajriba va testlar.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-cyan-400 mt-4">
              <span>Sinflarga o‘tish</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Virtual Laboratory */}
          <div
            onClick={() => {
              soundManager.playClick();
              onNavigateTab('lab');
            }}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/60 hover:bg-slate-850 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <FlaskConical className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                Fizika laboratoriyasi
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Mayatnik, erkin tushish, Om qonuni, Arximed va optika simulyatsiyalari.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400 mt-4">
              <span>Tajribani boshlash</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Formulas */}
          <div
            onClick={() => {
              soundManager.playClick();
              onNavigateTab('formulas');
            }}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/60 hover:bg-slate-850 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Calculator className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                Formulalar kitobi
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Tezlik, kuch, energiya, zaryad, issiqlik kalkulyatorlari.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-blue-400 mt-4">
              <span>Formulalarni hisoblash</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Exams & Diploma */}
          <div
            onClick={() => {
              soundManager.playClick();
              onNavigateTab('exam');
            }}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/60 hover:bg-slate-850 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                Davlat Imtihoni
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Vaqtli sinov, baholash va rasmiy sertifikat/diplom olish.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-amber-400 mt-4">
              <span>Imtihon topshirish</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Daily Physics Discovery & Recommended Next Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recommended Stage for Student */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Tavsiya etilgan dars:
            </span>
            <span className="text-xs text-slate-400 font-mono">{currentGradeData.grade}-sinf</span>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white">{currentGradeData.title}</h4>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              {currentGradeData.stages[0]?.description}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 flex items-center justify-between">
            <span>Dastlabki 1-etap: <strong>{currentGradeData.stages[0]?.title}</strong></span>
            <button
              onClick={() => {
                soundManager.playClick();
                onSelectGrade(currentGradeData.grade);
                onNavigateTab('grades');
              }}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors cursor-pointer"
            >
              Bosqichga o‘tish
            </button>
          </div>
        </div>

        {/* Daily Physics Curiosity */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/30 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Kunning qiziqarli fizik faktı</span>
          </div>

          <h4 className="text-base font-bold text-white">{todayFact.title}</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {todayFact.text}
          </p>

          <div className="pt-2 text-[11px] text-indigo-300/80 font-mono">
            Fizika — koinotning asosiy tili!
          </div>
        </div>
      </div>
    </div>
  );
};
