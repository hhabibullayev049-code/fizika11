import React, { useState } from 'react';
import { soundManager } from '../utils/sound';
import { Student } from '../types/physics';
import {
  Volume2,
  VolumeX,
  KeyRound,
  RotateCcw,
  LogOut,
  Info,
  ShieldCheck,
  CheckCircle2,
  Atom,
  Sparkles
} from 'lucide-react';

interface SettingsViewProps {
  currentStudent: Student;
  onLogout: () => void;
  onResetStudentProgress: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentStudent,
  onLogout,
  onResetStudentProgress,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(soundManager.isEnabled());
  const [isResetConfirmed, setIsResetConfirmed] = useState(false);

  const toggleSound = () => {
    const newState = soundManager.toggle();
    setSoundEnabled(newState);
    if (newState) soundManager.playClick();
  };

  const handleReset = () => {
    soundManager.playClick();
    onResetStudentProgress();
    setIsResetConfirmed(true);
    setTimeout(() => setIsResetConfirmed(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700">⚙️</span>
          Tizim Sozlamalari
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Ilova audio effektlari, xavfsizlik va ma’lumotlarni boshqarish.
        </p>
      </div>

      {/* Preferences List */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
        {/* Sound toggle */}
        <div className="flex items-center justify-between py-2 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-800 text-cyan-400">
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Ovoz effektlari</h4>
              <p className="text-xs text-slate-400">Tugmalar bosilishi, to‘g‘ri va noto‘g‘ri javob ohanglari</p>
            </div>
          </div>

          <button
            onClick={toggleSound}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {soundEnabled ? 'Ovoz yoqilgan' : 'Ovoz o‘chirilgan'}
          </button>
        </div>

        {/* Security / Password Info */}
        <div className="flex items-center justify-between py-2 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-800 text-amber-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Kirish kodi (Parol)</h4>
              <p className="text-xs text-slate-400">Tizimga kirish uchun o‘rnatilgan maxsus kod: <strong className="text-amber-400 font-mono">0026</strong></p>
            </div>
          </div>

          <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-400">
            KOD: 0026
          </span>
        </div>

        {/* Current Active Account & Logout */}
        <div className="flex items-center justify-between py-2 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 font-bold text-sm flex items-center justify-center">
              {currentStudent.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">{currentStudent.name}</h4>
              <p className="text-xs text-slate-400">{currentStudent.grade}-sinf o‘quvchisi · {currentStudent.totalScore} ball</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onLogout();
            }}
            className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white text-xs font-semibold border border-rose-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Chiqish</span>
          </button>
        </div>

        {/* Reset progress */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-800 text-rose-400">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Natijalarni qayta o‘rnatish</h4>
              <p className="text-xs text-slate-400">Joriy o‘quvchining o‘tilgan bosqichlarini nolga qaytarish</p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-950 hover:text-rose-300 text-slate-400 text-xs font-semibold transition-all cursor-pointer"
          >
            {isResetConfirmed ? 'Qayta o‘rnatildi!' : 'Natijalarni tozalash'}
          </button>
        </div>
      </div>

      {/* App Information Card */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
          <Info className="w-4 h-4" />
          <span>Ilova haqida ma’lumot</span>
        </div>
        <h4 className="text-base font-bold text-white">FIZIKA 1–11 Ta’lim va Imtihon Platformasi</h4>
        <p className="text-xs text-slate-400 leading-relaxed">
          Ushbu interaktiv ta’lim tizimi O‘zbekiston umumta’lim maktablari 1-sinfdan 11-sinfgacha bo‘lgan o‘quvchilari uchun fizika fanini qiziqarli, tajribali va chuqur o‘rganish maqsadida yaratilgan.
        </p>
        <div className="pt-2 text-[11px] text-slate-500 font-mono">
          Versiya: 2.5.0 · Kirish kodi: 0026 · Standart: O‘zbekiston DTS
        </div>
      </div>
    </div>
  );
};
