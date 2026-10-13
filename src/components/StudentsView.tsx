import React, { useState } from 'react';
import { Student } from '../types/physics';
import { soundManager } from '../utils/sound';
import {
  UserPlus,
  Search,
  GraduationCap,
  Award,
  CheckCircle2,
  Printer,
  ChevronRight,
  School,
  X,
  FileText,
  UserCheck,
  Trash2,
  AlertTriangle
} from 'lucide-react';

interface StudentsViewProps {
  students: Student[];
  currentStudent: Student;
  onSelectActiveStudent: (student: Student) => void;
  onAddNewStudent: (name: string, grade: number, school: string) => void;
  onDeleteStudent: (studentId: string) => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({
  students,
  currentStudent,
  onSelectActiveStudent,
  onAddNewStudent,
  onDeleteStudent,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState<number | 'all'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newGrade, setNewGrade] = useState<number>(7);
  const [newSchool, setNewSchool] = useState('');
  const [inspectedStudent, setInspectedStudent] = useState<Student | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const filteredStudents = students.filter((std) => {
    const matchesGrade = gradeFilter === 'all' || std.grade === gradeFilter;
    const matchesSearch =
      std.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (std.school && std.school.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesGrade && matchesSearch;
  });

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    soundManager.playLevelUp();
    onAddNewStudent(
      newName.trim(),
      newGrade,
      newSchool.trim() || 'O‘zbekiston umumta’lim maktabi'
    );
    setNewName('');
    setNewSchool('');
    setIsAddModalOpen(false);
    showFeedback(`«${newName.trim()}» ro‘yxatga qo‘shildi!`);
  };

  const handleConfirmDelete = () => {
    if (!studentToDelete) return;
    soundManager.playClick();
    const deletedName = studentToDelete.name;
    onDeleteStudent(studentToDelete.id);
    if (inspectedStudent?.id === studentToDelete.id) {
      setInspectedStudent(null);
    }
    setStudentToDelete(null);
    showFeedback(`«${deletedName}» muvaffaqiyatli o‘chirildi.`);
  };

  const showFeedback = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {feedbackMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 border border-cyan-500/50 text-cyan-300 text-xs px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">👨‍🎓</span>
            O‘quvchilar ro‘yxati va hisoboti ({students.length} nafar)
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Barcha o‘quvchilar profili, o‘zlashtirish tabeli, baholari va ortiqcha o‘quvchilarni o‘chirish imkoniyati.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => {
              soundManager.playClick();
              setIsAddModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Yangi o‘quvchi qo‘shish</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="O‘quvchi ismi yoki maktabi bo‘yicha qidiruv..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setGradeFilter('all')}
            className={`px-3 py-2 rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap ${
              gradeFilter === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            Hammasi
          </button>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((g) => (
            <button
              key={g}
              onClick={() => setGradeFilter(g)}
              className={`px-3 py-2 rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap ${
                gradeFilter === g
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {g}-sinf
            </button>
          ))}
        </div>
      </div>

      {/* Students Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-slate-900/60 rounded-3xl border border-slate-800 text-slate-400 text-sm">
            Qidiruv bo‘yicha o‘quvchilar topilmadi.
          </div>
        ) : (
          filteredStudents.map((std) => {
            const isCurrent = std.name.toLowerCase() === currentStudent.name.toLowerCase();
            const completedCount = Object.keys(std.completedStages || {}).length;

            return (
              <div
                key={std.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between group ${
                  isCurrent
                    ? 'bg-slate-900 border-cyan-500 shadow-xl shadow-cyan-950/20 ring-1 ring-cyan-500/50'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-2xl ${
                          std.avatarColor || 'bg-slate-700'
                        } text-white font-black text-sm flex items-center justify-center shadow-md`}
                      >
                        {std.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                          <span>{std.name}</span>
                          {isCurrent && (
                            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-1.5 py-0.2 rounded font-normal">
                              Faol
                            </span>
                          )}
                        </h4>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <GraduationCap className="w-3 h-3 text-cyan-400" />
                          <span>{std.grade}-sinf o‘quvchisi</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
                        ★ {std.averageGrade.toFixed(1)}
                      </span>

                      {/* Delete student trigger */}
                      <button
                        onClick={() => {
                          soundManager.playClick();
                          setStudentToDelete(std);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800/80 text-slate-400 hover:text-rose-400 hover:bg-rose-950/60 border border-transparent hover:border-rose-500/40 transition-colors cursor-pointer"
                        title="Ortiqcha o‘quvchini o‘chirish"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 p-2.5 bg-slate-950/60 rounded-xl text-xs space-y-1 text-slate-400">
                    <div className="flex justify-between">
                      <span>Maktab:</span>
                      <span className="text-slate-200 truncate max-w-[150px]">{std.school || 'Maktab'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>O‘tilgan bosqichlar:</span>
                      <span className="text-cyan-400 font-mono font-semibold">{completedCount} ta bosqich</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Umumiy reyting bali:</span>
                      <span className="text-amber-400 font-mono font-bold">{std.totalScore} ball</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80 mt-4">
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setInspectedStudent(std);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Tabel / Hisobot</span>
                  </button>

                  {!isCurrent ? (
                    <button
                      onClick={() => {
                        soundManager.playClick();
                        onSelectActiveStudent(std);
                        showFeedback(`«${std.name}» faol o‘quvchi sifatida tanlandi`);
                      }}
                      className="py-2 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 text-xs font-bold border border-cyan-500/30 transition-all cursor-pointer"
                      title="Bu o‘quvchi profiliga o‘tish"
                    >
                      <span>Tanlash</span>
                    </button>
                  ) : (
                    <span className="py-2 px-3 text-[11px] font-semibold text-cyan-400 bg-cyan-950/40 rounded-xl border border-cyan-800/40">
                      Joriy profil
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* CONFIRM DELETE MODAL */}
      {studentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-slate-900 border border-rose-500/40 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl relative space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">O‘quvchini o‘chirishni tasdiqlang</h3>
                <p className="text-xs text-slate-400">Bu amalni ortga qaytarib bo‘lmaydi</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              Haqiqatan ham <strong className="text-white">«{studentToDelete.name}»</strong> ({studentToDelete.grade}-sinf, {studentToDelete.totalScore} ball) o‘quvchisini ro‘yxatdan o‘chirmoqchimisiz?
              {studentToDelete.id === currentStudent.id && (
                <div className="mt-2 text-amber-400 font-semibold">
                  Diqqat: Ushbu o‘quvchi hozirda faol hisoblanadi. O‘chirilgandan keyin tizim boshqa o‘quvchiga o‘tadi.
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setStudentToDelete(null);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Bekor qilish
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Ha, o‘chirilsin</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STUDENT REPORT CARD MODAL */}
      {inspectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative space-y-6">
            <button
              onClick={() => setInspectedStudent(null)}
              className="absolute right-5 top-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer no-print"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Printable Transcript Header */}
            <div className="text-center pb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                O‘ZBEKISTON RESPUBLIKASI MAKTAB TA’LIMI TIZIMI
              </span>
              <h3 className="text-2xl font-black text-white mt-1">
                O‘QUVCHINING FIZIKA FANIDAN BAHOLAR TABELI
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                F.I.SH: <strong className="text-white">{inspectedStudent.name}</strong> · {inspectedStudent.grade}-sinf · {inspectedStudent.school || 'Maktab'}
              </p>
            </div>

            {/* Summary statistics */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-slate-950 rounded-xl">
                <span className="text-[11px] text-slate-400">Jami to‘plangan ball:</span>
                <div className="text-xl font-mono font-bold text-cyan-400 mt-0.5">{inspectedStudent.totalScore}</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl">
                <span className="text-[11px] text-slate-400">O‘rtacha akademik baho:</span>
                <div className="text-xl font-mono font-bold text-amber-400 mt-0.5">★ {inspectedStudent.averageGrade.toFixed(1)}</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl">
                <span className="text-[11px] text-slate-400">Tugallangan bosqichlar:</span>
                <div className="text-xl font-mono font-bold text-emerald-400 mt-0.5">{Object.keys(inspectedStudent.completedStages || {}).length} ta</div>
              </div>
            </div>

            {/* Exam Results Table */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Sinflar bo‘yicha imtihon ko‘rsatkichlari:
              </h4>
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800/80 space-y-2">
                {Object.keys(inspectedStudent.examResults || {}).length === 0 ? (
                  <div className="text-xs text-slate-500 text-center py-2">
                    Ushbu o‘quvchi hali rasmiy imtihon topshirmagan.
                  </div>
                ) : (
                  Object.entries(inspectedStudent.examResults).map(([grd, res]) => (
                    <div key={grd} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-900 last:border-0">
                      <span className="font-bold text-white">{grd}-sinf Yakuniy Imtihoni</span>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400">{res.score}/{res.maxScore} ball</span>
                        <span className="font-mono text-cyan-400 font-bold">{res.percentage}%</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                          Baho: {res.grade}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Print & Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800 no-print">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setStudentToDelete(inspectedStudent);
                }}
                className="px-4 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500 text-rose-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-rose-500/30 transition-all cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>O‘quvchini o‘chirish</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md shadow-amber-500/20"
                >
                  <Printer className="w-4 h-4" />
                  <span>Tabelni chop etish</span>
                </button>
                <button
                  onClick={() => setInspectedStudent(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Yopish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD STUDENT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-cyan-400" />
                <span>Yangi o‘quvchi ro‘yxatga olish</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  O‘quvchining ismi va familiyasi
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Masalan: Anvar Qodirov"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Sinf (1–11)
                </label>
                <select
                  value={newGrade}
                  onChange={(e) => setNewGrade(parseInt(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
                >
                  {Array.from({ length: 11 }, (_, i) => i + 1).map((g) => (
                    <option key={g} value={g}>{g}-sinf</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Maktab nomi (ixtiyoriy)
                </label>
                <input
                  type="text"
                  value={newSchool}
                  onChange={(e) => setNewSchool(e.target.value)}
                  placeholder="Masalan: Toshkent 14-maktab"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
