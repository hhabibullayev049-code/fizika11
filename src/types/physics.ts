export interface Student {
  id: string;
  name: string;
  grade: number; // 1 - 11
  totalScore: number;
  averageGrade: number; // e.g. 4.8
  completedStages: Record<string, boolean>; // key: "g{grade}_s{stageNumber}"
  stageScores: Record<string, number>;
  examResults: Record<number, {
    score: number;
    maxScore: number;
    grade: number; // 2, 3, 4, 5
    percentage: number;
    date: string;
    passed: boolean;
  }>;
  avatarColor: string;
  school?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  points: number;
}

export interface StageData {
  stageNumber: 1 | 2 | 3 | 4 | 5;
  stageType: 'basics' | 'concepts' | 'formulas' | 'experiment' | 'exam';
  stageName: string;
  title: string;
  description: string;
  theory: string;
  keyPoints: string[];
  formulaName?: string;
  formulaLatex?: string;
  examples: {
    problem: string;
    solution: string;
  }[];
  experimentType?: 'pendulum' | 'gravity' | 'ohm' | 'buoyancy' | 'optics' | 'density';
  experimentPrompt?: string;
  questions: QuizQuestion[];
}

export interface GradeData {
  grade: number;
  title: string;
  tagline: string;
  description: string;
  ageGroup: string;
  accentColor: string;
  stages: StageData[];
}

export interface FormulaItem {
  id: string;
  name: string;
  grade: number;
  topic: string;
  symbol: string;
  formula: string;
  description: string;
  unit: string;
  inputs: {
    key: string;
    label: string;
    unit: string;
    defaultValue: number;
    min: number;
    max: number;
    step: number;
  }[];
  calculate: (values: Record<string, number>) => { result: number; stepByStep: string };
}
