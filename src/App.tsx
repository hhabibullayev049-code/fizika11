import React, { useState, useEffect } from 'react';
import { Student, GradeData, StageData } from './types/physics';
import { INITIAL_STUDENTS } from './data/studentsData';
import { GRADES_DATA } from './data/gradesData';
import { soundManager } from './utils/sound';
import { LoginModal } from './components/LoginModal';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { GradesView } from './components/GradesView';
import { StageView } from './components/StageView';
import { ExamView } from './components/ExamView';
import { LessonsView } from './components/LessonsView';
import { TestsCenterView } from './components/TestsCenterView';
import { FormulasView } from './components/FormulasView';
import { LaboratoryView } from './components/LaboratoryView';
import { LeaderboardView } from './components/LeaderboardView';
import { StudentsView } from './components/StudentsView';
import { ResultsView } from './components/ResultsView';
import { SettingsView } from './components/SettingsView';

const STORAGE_KEY_STUDENTS = 'fizika1_11_students';
const STORAGE_KEY_CURRENT = 'fizika1_11_current_student';
const STORAGE_KEY_AUTH = 'fizika1_11_is_authenticated';

export default function App() {
  // Load persistent students list
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STUDENTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_STUDENTS;
  });

  // Current active student
  const [currentStudent, setCurrentStudent] = useState<Student>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CURRENT);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_STUDENTS[0];
  });

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [activeGradeNumber, setActiveGradeNumber] = useState<number>(currentStudent?.grade || 7);
  const [activeStageSession, setActiveStageSession] = useState<{
    gradeData: GradeData;
    stageData: StageData;
  } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(soundManager.isEnabled());

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
    } catch {
      // ignore
    }
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(currentStudent));
    } catch {
      // ignore
    }
  }, [currentStudent]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_AUTH, isAuthenticated ? 'true' : 'false');
    } catch {
      // ignore
    }
  }, [isAuthenticated]);

  // Handle Login with 0026 verification
  const handleLoginSuccess = (name: string, grade: number) => {
    // Check if student already exists in database
    const existing = students.find((s) => s.name.toLowerCase() === name.toLowerCase());

    if (existing) {
      setCurrentStudent(existing);
      setActiveGradeNumber(existing.grade);
    } else {
      const newStd: Student = {
        id: `std-${Date.now()}`,
        name,
        grade,
        totalScore: 100,
        averageGrade: 5.0,
        school: 'Umumta’lim maktabi',
        avatarColor: 'bg-cyan-600',
        completedStages: {},
        stageScores: {},
        examResults: {},
      };
      setStudents((prev) => [newStd, ...prev]);
      setCurrentStudent(newStd);
      setActiveGradeNumber(grade);
    }

    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(STORAGE_KEY_AUTH);
  };

  const handleToggleSound = () => {
    const next = soundManager.toggle();
    setSoundEnabled(next);
  };

  // Complete a stage
  const handleCompleteStage = (grade: number, stageNumber: number, earnedPoints: number, mark: number) => {
    const stageKey = `g${grade}_s${stageNumber}`;

    setCurrentStudent((prev) => {
      const updatedStages = { ...prev.completedStages, [stageKey]: true };
      const updatedScores = { ...prev.stageScores, [stageKey]: earnedPoints };
      const newTotalScore = prev.totalScore + earnedPoints;

      // Recalculate average grade
      const allMarks = Object.values(updatedScores).map((score) => {
        if (score >= 90) return 5;
        if (score >= 75) return 4;
        if (score >= 60) return 3;
        return 2;
      });
      const avg = allMarks.length > 0 ? allMarks.reduce((a, b) => a + b, 0) / allMarks.length : 5.0;

      const updatedStudent: Student = {
        ...prev,
        completedStages: updatedStages,
        stageScores: updatedScores,
        totalScore: newTotalScore,
        averageGrade: Number(avg.toFixed(1)),
      };

      // Also update in students array
      setStudents((all) => all.map((s) => (s.id === updatedStudent.id ? updatedStudent : s)));
      return updatedStudent;
    });
  };

  // Complete an exam
  const handleRecordExamResult = (
    grade: number,
    score: number,
    maxScore: number,
    gradeMark: number,
    percentage: number,
    passed: boolean
  ) => {
    setCurrentStudent((prev) => {
      const updatedExams = {
        ...prev.examResults,
        [grade]: {
          score,
          maxScore,
          grade: gradeMark,
          percentage,
          date: new Date().toISOString().split('T')[0],
          passed,
        },
      };

      const updatedStudent: Student = {
        ...prev,
        totalScore: prev.totalScore + score,
        examResults: updatedExams,
      };

      setStudents((all) => all.map((s) => (s.id === updatedStudent.id ? updatedStudent : s)));
      return updatedStudent;
    });
  };

  // Earn general points from test quiz trainer
  const handleEarnScore = (points: number) => {
    setCurrentStudent((prev) => {
      const updated: Student = {
        ...prev,
        totalScore: prev.totalScore + points,
      };
      setStudents((all) => all.map((s) => (s.id === updated.id ? updated : s)));
      return updated;
    });
  };

  // Add new student
  const handleAddNewStudent = (name: string, grade: number, school: string) => {
    const newStudent: Student = {
      id: `std-${Date.now()}`,
      name,
      grade,
      totalScore: 0,
      averageGrade: 5.0,
      school,
      avatarColor: 'bg-emerald-600',
      completedStages: {},
      stageScores: {},
      examResults: {},
    };
    setStudents((prev) => [newStudent, ...prev]);
    setCurrentStudent(newStudent);
    setActiveGradeNumber(grade);
  };

  // Delete student
  const handleDeleteStudent = (studentId: string) => {
    const remaining = students.filter((s) => s.id !== studentId);
    if (remaining.length === 0) {
      const fallback: Student = {
        id: `std-${Date.now()}`,
        name: 'Yangi O‘quvchi',
        grade: 7,
        totalScore: 0,
        averageGrade: 5.0,
        school: 'Umumta’lim maktabi',
        avatarColor: 'bg-cyan-600',
        completedStages: {},
        stageScores: {},
        examResults: {},
      };
      setStudents([fallback]);
      setCurrentStudent(fallback);
      setActiveGradeNumber(7);
    } else {
      setStudents(remaining);
      if (currentStudent.id === studentId) {
        setCurrentStudent(remaining[0]);
        setActiveGradeNumber(remaining[0].grade);
      }
    }
  };

  // Switch active student
  const handleSelectActiveStudent = (std: Student) => {
    setCurrentStudent(std);
    setActiveGradeNumber(std.grade);
    setActiveStageSession(null);
  };

  // Reset progress for active student
  const handleResetStudentProgress = () => {
    setCurrentStudent((prev) => {
      const resetStudent: Student = {
        ...prev,
        completedStages: {},
        stageScores: {},
        examResults: {},
        totalScore: 0,
        averageGrade: 5.0,
      };
      setStudents((all) => all.map((s) => (s.id === resetStudent.id ? resetStudent : s)));
      return resetStudent;
    });
  };

  // Open a stage
  const handleOpenStage = (gradeData: GradeData, stageData: StageData) => {
    setActiveStageSession({ gradeData, stageData });
  };

  // Next stage progression
  const handleNextStage = () => {
    if (!activeStageSession) return;
    const currentNum = activeStageSession.stageData.stageNumber;
    if (currentNum < 5) {
      const nextStage = activeStageSession.gradeData.stages.find((s) => s.stageNumber === currentNum + 1);
      if (nextStage) {
        setActiveStageSession({
          gradeData: activeStageSession.gradeData,
          stageData: nextStage,
        });
      }
    } else {
      // Completed all 5 stages of grade -> Navigate to Exam!
      setActiveStageSession(null);
      setActiveTab('exam');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* 1. Login Modal if not logged in with password 0026 */}
      {!isAuthenticated && <LoginModal onLoginSuccess={handleLoginSuccess} />}

      {/* 2. Top Navbar */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setActiveStageSession(null);
        }}
        currentStudent={currentStudent}
        onLogout={handleLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* 3. Main Workspace */}
      <main className="lg:pl-64 flex-1 flex flex-col">
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Active Stage Learning Engine takes precedence if opened */}
          {activeStageSession ? (
            <StageView
              gradeData={activeStageSession.gradeData}
              stageData={activeStageSession.stageData}
              onCompleteStage={handleCompleteStage}
              onBackToGrade={() => setActiveStageSession(null)}
              onNextStage={handleNextStage}
              isCompletedAlready={
                !!currentStudent.completedStages[
                  `g${activeStageSession.gradeData.grade}_s${activeStageSession.stageData.stageNumber}`
                ]
              }
            />
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <Dashboard
                  currentStudent={currentStudent}
                  onNavigateTab={(tab) => {
                    setActiveTab(tab);
                    setActiveStageSession(null);
                  }}
                  onSelectGrade={(g) => {
                    setActiveGradeNumber(g);
                    setActiveTab('grades');
                  }}
                />
              )}

              {activeTab === 'lessons' && (
                <LessonsView
                  onOpenStage={handleOpenStage}
                  activeGrade={activeGradeNumber}
                />
              )}

              {activeTab === 'grades' && (
                <GradesView
                  currentStudent={currentStudent}
                  activeGradeNumber={activeGradeNumber}
                  onSelectGrade={setActiveGradeNumber}
                  onOpenStage={handleOpenStage}
                />
              )}

              {activeTab === 'exam' && (
                <ExamView
                  currentStudent={currentStudent}
                  activeGrade={activeGradeNumber}
                  onRecordExamResult={handleRecordExamResult}
                />
              )}

              {activeTab === 'tests' && (
                <TestsCenterView onEarnScore={handleEarnScore} />
              )}

              {activeTab === 'formulas' && <FormulasView />}

              {activeTab === 'lab' && <LaboratoryView />}

              {activeTab === 'leaderboard' && (
                <LeaderboardView
                  students={students}
                  currentStudent={currentStudent}
                  onSelectStudentProfile={(std) => {
                    handleSelectActiveStudent(std);
                    setActiveTab('results');
                  }}
                />
              )}

              {activeTab === 'students' && (
                <StudentsView
                  students={students}
                  currentStudent={currentStudent}
                  onSelectActiveStudent={handleSelectActiveStudent}
                  onAddNewStudent={handleAddNewStudent}
                  onDeleteStudent={handleDeleteStudent}
                />
              )}

              {activeTab === 'results' && (
                <ResultsView
                  currentStudent={currentStudent}
                  onNavigateToExam={(grade) => {
                    setActiveGradeNumber(grade);
                    setActiveTab('exam');
                  }}
                />
              )}

              {activeTab === 'settings' && (
                <SettingsView
                  currentStudent={currentStudent}
                  onLogout={handleLogout}
                  onResetStudentProgress={handleResetStudentProgress}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
