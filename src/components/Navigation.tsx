import React from 'react';
import {
  Home,
  BookOpen,
  GraduationCap,
  FlaskConical,
  FileQuestion,
  Calculator,
  Compass,
  Trophy,
  Users,
  BarChart3,
  Settings,
  Atom,
  Volume2,
  VolumeX,
  LogOut,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { soundManager } from '../utils/sound';
import { Student } from '../types/physics';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Bosh sahifa', icon: Home },
  { id: 'lessons', label: 'Fizika darslari', icon: BookOpen },
  { id: 'grades', label: 'Sinflar: 1–11', icon: GraduationCap, badge: '11 sinf' },
  { id: 'exam', label: 'Imtihon', icon: FlaskConical, badge: 'Diplom' },
  { id: 'tests', label: 'Testlar', icon: FileQuestion },
  { id: 'formulas', label: 'Formulalar', icon: Calculator },
  { id: 'lab', label: 'Fizika laboratoriyasi', icon: Compass, badge: 'Interaktiv' },
  { id: 'leaderboard', label: 'Reyting', icon: Trophy },
  { id: 'students', label: 'O‘quvchilar', icon: Users, badge: '30+' },
  { id: 'results', label: 'Mening natijalarim', icon: BarChart3 },
  { id: 'settings', label: 'Sozlamalar', icon: Settings },
];

interface NavigationProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  currentStudent: Student;
  onLogout: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  currentStudent,
  onLogout,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <>
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo and App Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 lg:hidden cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div
              onClick={() => {
                soundManager.playClick();
                onSelectTab('dashboard');
              }}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/30 group-hover:scale-105 transition-transform">
                <Atom className="w-5 h-5 text-white animate-spin" style={{ animationDuration: '15s' }} />
              </div>
              <div>
                <span className="text-base font-extrabold text-white tracking-tight flex items-center gap-1.5">
                  FIZIKA <span className="text-cyan-400">1–11</span>
                </span>
                <span className="text-[10px] text-slate-400 block -mt-1 font-medium">
                  Interaktiv Ta’lim & Imtihon
                </span>
              </div>
            </div>
          </div>

          {/* Right Header items: Student Badge, Sound Toggle, Switch */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={onToggleSound}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                soundEnabled
                  ? 'bg-slate-900 text-cyan-400 border-slate-800 hover:border-cyan-500/40'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
              title={soundEnabled ? 'Ovozni o‘chirish' : 'Ovozni yoqish'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Student profile chip */}
            <div
              onClick={() => {
                soundManager.playClick();
                onSelectTab('results');
              }}
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
            >
              <div
                className={`w-7 h-7 rounded-lg ${
                  currentStudent.avatarColor || 'bg-cyan-600'
                } text-white font-bold text-xs flex items-center justify-center`}
              >
                {currentStudent.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-white leading-tight">
                  {currentStudent.name}
                </div>
                <div className="text-[10px] text-cyan-400 leading-tight">
                  {currentStudent.grade}-sinf · {currentStudent.totalScore} ball
                </div>
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={() => {
                soundManager.playClick();
                onLogout();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-colors cursor-pointer"
              title="Chiqish"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-slate-950 border-r border-slate-800/80 p-4 overflow-y-auto transition-transform duration-200 lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } no-print`}
      >
        <div className="space-y-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 py-2">
            Bo‘limlar (1–11)
          </div>

          {NAV_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  soundManager.playClick();
                  onSelectTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{idx + 1}. {item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                      isActive
                        ? 'bg-slate-950 text-cyan-300'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Access Code reminder at sidebar footer */}
        <div className="mt-8 p-3 rounded-2xl bg-slate-900 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
          <div className="font-bold text-white flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Kirish kodi:</span>
          </div>
          <div className="font-mono text-cyan-400 font-bold">0026</div>
        </div>
      </aside>
    </>
  );
};
