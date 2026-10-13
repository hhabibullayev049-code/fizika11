import React, { useState, useEffect } from 'react';
import { GRADES_DATA } from '../data/gradesData';
import { Student } from '../types/physics';
import { soundManager } from '../utils/sound';
import confetti from 'canvas-confetti';
import {
  Timer,
  CheckCircle2,
  XCircle,
  Award,
  Printer,
  RotateCcw,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface ExamViewProps {
  currentStudent: Student;
  activeGrade: number;
  onRecordExamResult: (
    grade: number,
    score: number,
    maxScore: number,
    gradeMark: number,
    percentage: number,
    passed: boolean
  ) => void;
}

export const ExamView: React.FC<ExamViewProps> = ({
  currentStudent,
  activeGrade,
  onRecordExamResult,
}) => {
  const [selectedExamGrade, setSelectedExamGrade] = useState<number>(activeGrade);
  const [examStatus, setExamStatus] = useState<'idle' | 'in_progress' | 'completed'>('idle');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(600); // 10 minutes
  const [showCertificate, setShowCertificate] = useState(false);

  // Compile exam questions from all 5 stages of the selected grade
  const targetGradeData = GRADES_DATA.find((g) => g.grade === selectedExamGrade) || GRADES_DATA[6];
  const examQuestions = targetGradeData.stages.flatMap((s) => s.questions);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (examStatus === 'in_progress' && timeLeftSeconds > 0) {
      interval = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [examStatus, timeLeftSeconds]);

  const handleStartExam = () => {
    soundManager.playClick();
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setTimeLeftSeconds(600);
    setExamStatus('in_progress');
    setShowCertificate(false);
  };

  const handleSelectAnswer = (qIdx: number, optIdx: number) => {
    soundManager.playClick();
    setSelectedAnswers((prev) => ({
      ...prev,
      [qIdx]: optIdx,
    }));
  };

  const handleFinishExam = () => {
    soundManager.playClick();
    let earned = 0;
    let total = 0;

    examQuestions.forEach((q, idx) => {
      total += q.points;
      if (selectedAnswers[idx] === q.correctIndex) {
        earned += q.points;
      }
    });

    const percentage = total > 0 ? Math.round((earned / total) * 100) : 0;
    let mark = 5;
    if (percentage < 60) mark = 2;
    else if (percentage < 75) mark = 3;
    else if (percentage < 88) mark = 4;
    else mark = 5;

    const passed = mark >= 3;
    setExamStatus('completed');

    if (passed) {
      soundManager.playLevelUp();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      if (mark >= 4) {
        setShowCertificate(true);
      }
    } else {
      soundManager.playWrong();
    }

    onRecordExamResult(selectedExamGrade, earned, total, mark, percentage, passed);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const existingResult = currentStudent.examResults[selectedExamGrade];

  // 1. COMPLETED EXAM VIEW OR DIPLOMA
  if (examStatus === 'completed') {
    let earned = 0;
    let total = 0;
    examQuestions.forEach((q, idx) => {
      total += q.points;
      if (selectedAnswers[idx] === q.correctIndex) {
        earned += q.points;
      }
    });
    const percentage = total > 0 ? Math.round((earned / total) * 100) : 0;
    let mark = 5;
    if (percentage < 60) mark = 2;
    else if (percentage < 75) mark = 3;
    else if (percentage < 88) mark = 4;
    else mark = 5;
    const passed = mark >= 3;

    return (
      <div className="space-y-6 max-w-3xl mx-auto pb-12">
        {/* Certificate / Diploma Component */}
        {showCertificate && passed && (
          <div className="p-8 rounded-3xl bg-slate-900 border-2 border-amber-500/50 shadow-2xl relative overflow-hidden text-center space-y-6 print:border-4 print:border-amber-600 print:bg-white print:text-black">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
                <Award className="w-10 h-10" />
              </div>
            </div>

            <div>
              <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
                O‘ZBEKISTON RESPUBLIKASI MAKTAB FIZIKA TA’LIMI
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-1">
                RASMIY SERTIFIKAT VA DIPLOM
              </h2>
              <p className="text-slate-400 text-xs mt-1">
                Fizika fanidan muvaffaqiyatli yakuniy imtihon topshirganligi uchun
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-center max-w-md mx-auto">
              <div className="text-xs text-slate-400">Taqdirlanuvchi o‘quvchi:</div>
              <div className="text-2xl font-black text-white mt-1">{currentStudent.name}</div>
              <div className="text-xs text-cyan-400 mt-1 font-medium">
                {selectedExamGrade}-sinf fizika kursi · Baho: {mark} (A’lo)
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs text-slate-300 max-w-md mx-auto">
              <div className="p-2 bg-slate-800/40 rounded-xl">
                <div className="text-slate-500 text-[10px]">Ball:</div>
                <div className="font-bold text-white">{earned} / {total}</div>
              </div>
              <div className="p-2 bg-slate-800/40 rounded-xl">
                <div className="text-slate-500 text-[10px]">O‘zlashtirish:</div>
                <div className="font-bold text-emerald-400">{percentage}%</div>
              </div>
              <div className="p-2 bg-slate-800/40 rounded-xl">
                <div className="text-slate-500 text-[10px]">Sana:</div>
                <div className="font-bold text-white">{new Date().toLocaleDateString('uz-UZ')}</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2 no-print">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Sertifikatni chop etish</span>
              </button>
            </div>
          </div>
        )}

        {/* Results summary card */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-white">Imtihon natijalari</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {selectedExamGrade}-sinf fizika imtihoni yakunlandi
              </p>
            </div>

            <div className={`px-4 py-2 rounded-xl text-sm font-bold border ${
              passed
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
            }`}>
              {passed ? `IMTIHONDAN O‘TDI (Baho: ${mark})` : 'QAYTA TOPSHIRING'}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-slate-950 rounded-xl">
              <div className="text-slate-400 text-[11px]">To‘plangan ball</div>
              <div className="text-lg font-bold text-white mt-1">{earned} / {total}</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl">
              <div className="text-slate-400 text-[11px]">Foiz ko‘rsatkichi</div>
              <div className="text-lg font-bold text-cyan-400 mt-1">{percentage}%</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl">
              <div className="text-slate-400 text-[11px]">Akademik baho</div>
              <div className="text-lg font-bold text-amber-400 mt-1">{mark}</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl">
              <div className="text-slate-400 text-[11px]">To‘g‘ri javoblar</div>
              <div className="text-lg font-bold text-emerald-400 mt-1">
                {Object.keys(selectedAnswers).filter((idx) => selectedAnswers[Number(idx)] === examQuestions[Number(idx)].correctIndex).length} ta
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              onClick={() => setExamStatus('idle')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Imtihonlar menyusiga qaytish</span>
            </button>
            <button
              onClick={handleStartExam}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <span>Qaytadan topshirish</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. IN-PROGRESS EXAM VIEW
  if (examStatus === 'in_progress') {
    const currentQuestion = examQuestions[currentQuestionIndex];
    const isAnswered = selectedAnswers[currentQuestionIndex] !== undefined;

    return (
      <div className="space-y-6 max-w-3xl mx-auto pb-12">
        {/* Exam top status bar */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-cyan-400">{selectedExamGrade}-sinf Imtihoni</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300">
              {currentQuestionIndex + 1} / {examQuestions.length}-savol
            </span>
          </div>

          {/* Live countdown timer */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold border ${
            timeLeftSeconds < 120
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
              : 'bg-slate-800 text-cyan-300 border-slate-700'
          }`}>
            <Timer className="w-4 h-4" />
            <span>Qolgan vaqt: {formatTimer(timeLeftSeconds)}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-cyan-500 transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / examQuestions.length) * 100}%` }}
          />
        </div>

        {/* Current question card */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400">
              {currentQuestion.points} ballik savol
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectAnswer(currentQuestionIndex, optIdx)}
                  className={`w-full p-4 rounded-2xl border text-sm text-left transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200 font-semibold shadow-md shadow-cyan-950'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <span>{option}</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                    isSelected ? 'border-cyan-400 bg-cyan-500 text-slate-950' : 'border-slate-700'
                  }`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-slate-950" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation between questions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                soundManager.playClick();
                setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
              }}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-medium disabled:opacity-40 cursor-pointer"
            >
              Oldingi savol
            </button>

            {currentQuestionIndex < examQuestions.length - 1 ? (
              <button
                onClick={() => {
                  soundManager.playClick();
                  setCurrentQuestionIndex((prev) => Math.min(examQuestions.length - 1, prev + 1));
                }}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 cursor-pointer"
              >
                <span>Keyingi savol</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinishExam}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <span>Imtihonni topshirish</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Quick jump questions palette */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400 mb-2">Savollar xaritasi:</div>
          <div className="flex flex-wrap gap-2">
            {examQuestions.map((_, idx) => {
              const answered = selectedAnswers[idx] !== undefined;
              const isCurrent = idx === currentQuestionIndex;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    soundManager.playClick();
                    setCurrentQuestionIndex(idx);
                  }}
                  className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                    isCurrent
                      ? 'ring-2 ring-cyan-400 bg-cyan-500 text-slate-950 font-extrabold'
                      : answered
                      ? 'bg-emerald-950 border border-emerald-500/50 text-emerald-300'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 3. IDLE / EXAM SELECTION SCREEN
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">🧪</span>
            Fizika davlat attestatsiyasi va imtihon markazi
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Har bir sinf bo‘yicha rasmiy imtihon topshiring, baho oling va diplomga ega bo‘ling.
          </p>
        </div>
      </div>

      {/* Select Grade for Exam */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
          Imtihon topshiriladigan sinfni tanlang:
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {GRADES_DATA.map((g) => {
            const isSelected = selectedExamGrade === g.grade;
            const res = currentStudent.examResults[g.grade];
            return (
              <button
                key={g.grade}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedExamGrade(g.grade);
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 border-cyan-400 shadow-md shadow-cyan-950'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-white">{g.grade}-sinf</div>
                {res ? (
                  <div className="text-[10px] text-emerald-400 font-medium mt-1">
                    Baho: {res.grade} ({res.percentage}%)
                  </div>
                ) : (
                  <div className="text-[10px] text-slate-500 mt-1">Topshirilmagan</div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Grade Exam Details */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="text-xs text-cyan-400 font-semibold">{targetGradeData.title}</div>
              <h3 className="text-lg font-bold text-white mt-0.5">Yakuniy Attestatsiya Imtihoni</h3>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Timer className="w-4 h-4 text-amber-400" /> 10 daqiqa
              </span>
              <span>·</span>
              <span>{examQuestions.length} ta savol</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1 leading-relaxed">
            <span className="font-semibold text-white">Baholash mezonlari:</span>
            <p>
              • 88% va undan yuqori — <strong>5 (A’lo) baho</strong> + Rasmiy sertifikat/diplom.<br />
              • 75% – 87% — <strong>4 (Yaxshi) baho</strong>.<br />
              • 60% – 74% — <strong>3 (Qoniqarli) baho</strong>.<br />
              • 60% dan past — <strong>2 (Qoniqarsiz)</strong>, imtihon qayta topshiriladi.
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleStartExam}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Imtihonni boshlash</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
