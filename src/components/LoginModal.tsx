import React, { useState } from 'react';
import { Atom, KeyRound, Eye, EyeOff, User, GraduationCap, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/sound';
import { INITIAL_STUDENTS } from '../data/studentsData';

interface LoginModalProps {
  onLoginSuccess: (studentName: string, grade: number) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onLoginSuccess }) => {
  const [name, setName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<number>(7);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [quickStudentPicker, setQuickStudentPicker] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();

    if (!name.trim()) {
      setErrorMessage('Iltimos, o‘quvchining ism-familiyasini kiriting!');
      soundManager.playWrong();
      return;
    }

    if (password !== '0026') {
      setErrorMessage('Parol noto‘g‘ri! Qaytadan urinib ko‘ring');
      soundManager.playWrong();
      return;
    }

    setErrorMessage('');
    soundManager.playLevelUp();
    onLoginSuccess(name.trim(), selectedGrade);
  };

  const handleSelectQuickStudent = (studentName: string, grade: number) => {
    setName(studentName);
    setSelectedGrade(grade);
    setPassword('0026');
    setErrorMessage('');
    soundManager.playClick();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 overflow-y-auto">
      {/* Background Physics Orbits Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-30">
        <div className="w-[500px] h-[500px] rounded-full border border-cyan-500/20 animate-spin" style={{ animationDuration: '30s' }} />
        <div className="absolute w-[700px] h-[700px] rounded-full border border-blue-500/15 animate-spin" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />
        <div className="absolute w-[900px] h-[900px] rounded-full border border-indigo-500/10 animate-spin" style={{ animationDuration: '60s' }} />
        
        {/* Floating formulas in background */}
        <span className="absolute top-12 left-16 text-cyan-500/20 font-mono text-2xl font-bold animate-float-slow">E = mc²</span>
        <span className="absolute bottom-20 left-24 text-blue-500/20 font-mono text-2xl font-bold animate-float-slow" style={{ animationDelay: '1.5s' }}>F = ma</span>
        <span className="absolute top-24 right-20 text-purple-500/20 font-mono text-2xl font-bold animate-float-slow" style={{ animationDelay: '3s' }}>I = U/R</span>
        <span className="absolute bottom-16 right-32 text-emerald-500/20 font-mono text-2xl font-bold animate-float-slow" style={{ animationDelay: '2s' }}>p = ρgh</span>
      </div>

      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/40 z-10">
        {/* Atom Animated Badge */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative w-20 h-20 mb-3 flex items-center justify-center">
            {/* Pulsing center nucleus */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/50 flex items-center justify-center animate-pulse">
              <Atom className="w-5 h-5 text-white" />
            </div>
            {/* Orbit ring 1 */}
            <div className="absolute inset-0 rounded-full border border-cyan-400/50 animate-spin" style={{ animationDuration: '6s' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-sm shadow-cyan-400 absolute -top-1 left-1/2 -translate-x-1/2" />
            </div>
            {/* Orbit ring 2 */}
            <div className="absolute -inset-2 rounded-full border border-blue-400/40 animate-spin" style={{ animationDuration: '9s', animationDirection: 'reverse' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-300 shadow-sm shadow-indigo-400 absolute top-1/2 -right-1 -translate-y-1/2" />
            </div>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            FIZIKA <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">1–11</span>
          </h1>
          <p className="text-cyan-300/80 text-sm font-medium mt-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Bilim — kelajak kaliti!
          </p>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              O‘quvchining ismi va familiyasi
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masalan: Jasur Temirov"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Grade Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Sinfni tanlang (1–11)
            </label>
            <div className="relative">
              <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(Number(e.target.value))}
                className="w-full pl-10 pr-8 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                {Array.from({ length: 11 }, (_, i) => i + 1).map((g) => (
                  <option key={g} value={g} className="bg-slate-900 text-white">
                    {g}-sinf {g <= 4 ? '(Boshlang‘ich fizika)' : g <= 9 ? '(Asosiy fizika)' : '(Yuqori fizika)'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Kirish kodi (Parol)
              </label>
              <span className="text-[11px] text-cyan-400/80 font-mono">Standart: 0026</span>
            </div>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Kirish kodini kiriting"
                className="w-full pl-10 pr-11 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                title={showPassword ? 'Yashirish' : 'Ko‘rsatish'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full mt-2 py-3 px-5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Ilovaga kirish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Student Selector Helper */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
          <button
            type="button"
            onClick={() => setQuickStudentPicker(!quickStudentPicker)}
            className="text-xs text-slate-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            <span>{quickStudentPicker ? 'Ro‘yxatni yopish' : 'Mavjud 30+ o‘quvchilardan tanlash'}</span>
          </button>

          {quickStudentPicker && (
            <div className="mt-3 max-h-40 overflow-y-auto bg-slate-950/60 rounded-xl p-2 border border-slate-800 text-left space-y-1">
              {INITIAL_STUDENTS.slice(0, 10).map((std) => (
                <button
                  key={std.id}
                  type="button"
                  onClick={() => handleSelectQuickStudent(std.name, std.grade)}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800/80 text-xs text-slate-300 flex items-center justify-between group transition-colors"
                >
                  <span className="font-medium group-hover:text-cyan-300">{std.name}</span>
                  <span className="text-slate-500 text-[10px]">{std.grade}-sinf · {std.totalScore} ball</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
