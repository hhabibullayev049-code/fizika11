import { Student } from '../types/physics';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std-1',
    name: 'Jasur Temirov',
    grade: 9,
    totalScore: 980,
    averageGrade: 5.0,
    school: '1-sonli ixtisoslashtirilgan maktab',
    avatarColor: 'bg-emerald-500',
    completedStages: {
      'g9_s1': true, 'g9_s2': true, 'g9_s3': true, 'g9_s4': true, 'g9_s5': true,
      'g8_s1': true, 'g8_s2': true, 'g8_s3': true, 'g8_s4': true, 'g8_s5': true,
    },
    stageScores: { 'g9_s1': 100, 'g9_s2': 100, 'g9_s3': 95, 'g9_s4': 100, 'g9_s5': 100 },
    examResults: {
      9: { score: 98, maxScore: 100, grade: 5, percentage: 98, date: '2026-03-12', passed: true },
      8: { score: 95, maxScore: 100, grade: 5, percentage: 95, date: '2026-02-18', passed: true }
    }
  },
  {
    id: 'std-2',
    name: 'Madina Karimova',
    grade: 10,
    totalScore: 940,
    averageGrade: 4.9,
    school: 'Prezident maktabi',
    avatarColor: 'bg-indigo-500',
    completedStages: {
      'g10_s1': true, 'g10_s2': true, 'g10_s3': true, 'g10_s4': true,
      'g9_s1': true, 'g9_s2': true, 'g9_s3': true, 'g9_s4': true, 'g9_s5': true
    },
    stageScores: { 'g10_s1': 95, 'g10_s2': 90, 'g10_s3': 95, 'g10_s4': 90 },
    examResults: {
      9: { score: 94, maxScore: 100, grade: 5, percentage: 94, date: '2026-03-10', passed: true }
    }
  },
  {
    id: 'std-3',
    name: 'Behruz Ergashev',
    grade: 11,
    totalScore: 920,
    averageGrade: 4.8,
    school: 'Toshkent shahar 17-maktab',
    avatarColor: 'bg-cyan-500',
    completedStages: {
      'g11_s1': true, 'g11_s2': true, 'g11_s3': true, 'g11_s4': true,
    },
    stageScores: { 'g11_s1': 90, 'g11_s2': 95, 'g11_s3': 90, 'g11_s4': 95 },
    examResults: {
      10: { score: 92, maxScore: 100, grade: 5, percentage: 92, date: '2026-02-28', passed: true }
    }
  },
  {
    id: 'std-4',
    name: 'Nilufar Rustamova',
    grade: 8,
    totalScore: 890,
    averageGrade: 4.8,
    school: 'Samarqand 42-maktab',
    avatarColor: 'bg-rose-500',
    completedStages: { 'g8_s1': true, 'g8_s2': true, 'g8_s3': true, 'g8_s4': true },
    stageScores: { 'g8_s1': 90, 'g8_s2': 88, 'g8_s3': 92, 'g8_s4': 95 },
    examResults: {
      7: { score: 90, maxScore: 100, grade: 5, percentage: 90, date: '2026-03-01', passed: true }
    }
  },
  {
    id: 'std-5',
    name: 'Azizbek Rahmonov',
    grade: 7,
    totalScore: 860,
    averageGrade: 4.7,
    school: 'Buxoro viloyat fizika litseyi',
    avatarColor: 'bg-amber-500',
    completedStages: { 'g7_s1': true, 'g7_s2': true, 'g7_s3': true },
    stageScores: { 'g7_s1': 95, 'g7_s2': 85, 'g7_s3': 90 },
    examResults: {}
  },
  {
    id: 'std-6',
    name: 'Shahlo Qosimova',
    grade: 11,
    totalScore: 850,
    averageGrade: 4.6,
    school: 'Farg‘ona shahar 3-maktab',
    avatarColor: 'bg-purple-500',
    completedStages: { 'g11_s1': true, 'g11_s2': true, 'g11_s3': true },
    stageScores: { 'g11_s1': 85, 'g11_s2': 85, 'g11_s3': 90 },
    examResults: {}
  },
  {
    id: 'std-7',
    name: 'Sardorbek Mirzayev',
    grade: 6,
    totalScore: 830,
    averageGrade: 4.6,
    school: 'Namangan 11-maktab',
    avatarColor: 'bg-teal-500',
    completedStages: { 'g6_s1': true, 'g6_s2': true, 'g6_s3': true, 'g6_s4': true },
    stageScores: { 'g6_s1': 80, 'g6_s2': 85, 'g6_s3': 90, 'g6_s4': 85 },
    examResults: {}
  },
  {
    id: 'std-8',
    name: 'Rayhona Alimova',
    grade: 5,
    totalScore: 810,
    averageGrade: 4.5,
    school: 'Andijon 24-maktab',
    avatarColor: 'bg-pink-500',
    completedStages: { 'g5_s1': true, 'g5_s2': true, 'g5_s3': true },
    stageScores: { 'g5_s1': 85, 'g5_s2': 80, 'g5_s3': 85 },
    examResults: {}
  },
  {
    id: 'std-9',
    name: 'Bobur Mansurov',
    grade: 9,
    totalScore: 790,
    averageGrade: 4.4,
    school: 'Qarshi shahar 8-maktab',
    avatarColor: 'bg-sky-500',
    completedStages: { 'g9_s1': true, 'g9_s2': true, 'g9_s3': true },
    stageScores: { 'g9_s1': 80, 'g9_s2': 80, 'g9_s3': 85 },
    examResults: {}
  },
  {
    id: 'std-10',
    name: 'Dildora Jo‘rayeva',
    grade: 8,
    totalScore: 770,
    averageGrade: 4.4,
    school: 'Jizzax 5-maktab',
    avatarColor: 'bg-violet-500',
    completedStages: { 'g8_s1': true, 'g8_s2': true },
    stageScores: { 'g8_s1': 85, 'g8_s2': 80 },
    examResults: {}
  },
  {
    id: 'std-11',
    name: 'Otabek Yusupov',
    grade: 10,
    totalScore: 760,
    averageGrade: 4.3,
    school: 'Termiz shahar 14-maktab',
    avatarColor: 'bg-blue-600',
    completedStages: { 'g10_s1': true, 'g10_s2': true },
    stageScores: { 'g10_s1': 80, 'g10_s2': 75 },
    examResults: {}
  },
  {
    id: 'std-12',
    name: 'Zuhra Normurodova',
    grade: 7,
    totalScore: 740,
    averageGrade: 4.3,
    school: 'Navoiy shahar 2-maktab',
    avatarColor: 'bg-emerald-600',
    completedStages: { 'g7_s1': true, 'g7_s2': true },
    stageScores: { 'g7_s1': 80, 'g7_s2': 75 },
    examResults: {}
  },
  {
    id: 'std-13',
    name: 'Ulug‘bek Saidov',
    grade: 4,
    totalScore: 720,
    averageGrade: 4.5,
    school: 'Urganch 19-maktab',
    avatarColor: 'bg-yellow-600',
    completedStages: { 'g4_s1': true, 'g4_s2': true, 'g4_s3': true },
    stageScores: { 'g4_s1': 85, 'g4_s2': 85, 'g4_s3': 80 },
    examResults: {}
  },
  {
    id: 'std-14',
    name: 'Kamola Fayzullayeva',
    grade: 3,
    totalScore: 700,
    averageGrade: 4.6,
    school: 'Nukus shahar 1-maktab',
    avatarColor: 'bg-fuchsia-600',
    completedStages: { 'g3_s1': true, 'g3_s2': true, 'g3_s3': true },
    stageScores: { 'g3_s1': 90, 'g3_s2': 85, 'g3_s3': 85 },
    examResults: {}
  },
  {
    id: 'std-15',
    name: 'Javohir G‘aniyev',
    grade: 2,
    totalScore: 680,
    averageGrade: 4.7,
    school: 'Toshkent shahar 287-maktab',
    avatarColor: 'bg-lime-600',
    completedStages: { 'g2_s1': true, 'g2_s2': true, 'g2_s3': true },
    stageScores: { 'g2_s1': 90, 'g2_s2': 90, 'g2_s3': 85 },
    examResults: {}
  },
  {
    id: 'std-16',
    name: 'Mohira Hakimboyeva',
    grade: 1,
    totalScore: 660,
    averageGrade: 4.8,
    school: 'Guliston 6-maktab',
    avatarColor: 'bg-rose-600',
    completedStages: { 'g1_s1': true, 'g1_s2': true, 'g1_s3': true },
    stageScores: { 'g1_s1': 95, 'g1_s2': 90, 'g1_s3': 90 },
    examResults: {}
  },
  {
    id: 'std-17',
    name: 'Farrux Shukurov',
    grade: 11,
    totalScore: 650,
    averageGrade: 4.1,
    school: 'Samarqand 9-maktab',
    avatarColor: 'bg-indigo-600',
    completedStages: { 'g11_s1': true, 'g11_s2': true },
    stageScores: { 'g11_s1': 75, 'g11_s2': 70 },
    examResults: {}
  },
  {
    id: 'std-18',
    name: 'Gulnoza Murodova',
    grade: 6,
    totalScore: 630,
    averageGrade: 4.2,
    school: 'Buxoro 21-maktab',
    avatarColor: 'bg-orange-500',
    completedStages: { 'g6_s1': true, 'g6_s2': true },
    stageScores: { 'g6_s1': 75, 'g6_s2': 75 },
    examResults: {}
  },
  {
    id: 'std-19',
    name: 'Sherzodbek To‘xtasinov',
    grade: 8,
    totalScore: 610,
    averageGrade: 4.0,
    school: 'Farg‘ona 15-maktab',
    avatarColor: 'bg-cyan-600',
    completedStages: { 'g8_s1': true },
    stageScores: { 'g8_s1': 80 },
    examResults: {}
  },
  {
    id: 'std-20',
    name: 'Malika Sobirova',
    grade: 5,
    totalScore: 590,
    averageGrade: 4.1,
    school: 'Toshkent viloyati Bo‘stonliq maktabi',
    avatarColor: 'bg-red-500',
    completedStages: { 'g5_s1': true, 'g5_s2': true },
    stageScores: { 'g5_s1': 75, 'g5_s2': 75 },
    examResults: {}
  },
  {
    id: 'std-21',
    name: 'Iskandar Zokirov',
    grade: 9,
    totalScore: 570,
    averageGrade: 3.9,
    school: 'Namangan 32-maktab',
    avatarColor: 'bg-amber-600',
    completedStages: { 'g9_s1': true },
    stageScores: { 'g9_s1': 70 },
    examResults: {}
  },
  {
    id: 'std-22',
    name: 'Umida Xolmatova',
    grade: 7,
    totalScore: 550,
    averageGrade: 3.9,
    school: 'Andijon 12-maktab',
    avatarColor: 'bg-teal-600',
    completedStages: { 'g7_s1': true },
    stageScores: { 'g7_s1': 75 },
    examResults: {}
  },
  {
    id: 'std-23',
    name: 'Davronbek Odilov',
    grade: 10,
    totalScore: 530,
    averageGrade: 3.8,
    school: 'Xiva 4-maktab',
    avatarColor: 'bg-violet-600',
    completedStages: { 'g10_s1': true },
    stageScores: { 'g10_s1': 70 },
    examResults: {}
  },
  {
    id: 'std-24',
    name: 'Sevara Boymurodova',
    grade: 4,
    totalScore: 510,
    averageGrade: 4.0,
    school: 'Shahrisabz 7-maktab',
    avatarColor: 'bg-pink-600',
    completedStages: { 'g4_s1': true },
    stageScores: { 'g4_s1': 80 },
    examResults: {}
  },
  {
    id: 'std-25',
    name: 'Shohruhbek Nurmatov',
    grade: 3,
    totalScore: 480,
    averageGrade: 4.1,
    school: 'Zarafshon 3-maktab',
    avatarColor: 'bg-blue-500',
    completedStages: { 'g3_s1': true },
    stageScores: { 'g3_s1': 80 },
    examResults: {}
  },
  {
    id: 'std-26',
    name: 'Nigora Asatova',
    grade: 2,
    totalScore: 450,
    averageGrade: 4.2,
    school: 'Kattaqo‘rg‘on 2-maktab',
    avatarColor: 'bg-emerald-500',
    completedStages: { 'g2_s1': true },
    stageScores: { 'g2_s1': 85 },
    examResults: {}
  },
  {
    id: 'std-27',
    name: 'Muhriddin Haydarov',
    grade: 1,
    totalScore: 420,
    averageGrade: 4.3,
    school: 'Chirchiq 10-maktab',
    avatarColor: 'bg-indigo-500',
    completedStages: { 'g1_s1': true },
    stageScores: { 'g1_s1': 85 },
    examResults: {}
  },
  {
    id: 'std-28',
    name: 'Nodira Komilova',
    grade: 6,
    totalScore: 400,
    averageGrade: 3.8,
    school: 'Olmaliq 5-maktab',
    avatarColor: 'bg-cyan-500',
    completedStages: { 'g6_s1': true },
    stageScores: { 'g6_s1': 70 },
    examResults: {}
  },
  {
    id: 'std-29',
    name: 'Mirjalol Qodirov',
    grade: 8,
    totalScore: 370,
    averageGrade: 3.6,
    school: 'Bekobod 8-maktab',
    avatarColor: 'bg-purple-600',
    completedStages: { 'g8_s1': true },
    stageScores: { 'g8_s1': 65 },
    examResults: {}
  },
  {
    id: 'std-30',
    name: 'Zilola Eshonqulova',
    grade: 5,
    totalScore: 350,
    averageGrade: 3.7,
    school: 'Marg‘ilon 20-maktab',
    avatarColor: 'bg-rose-500',
    completedStages: { 'g5_s1': true },
    stageScores: { 'g5_s1': 70 },
    examResults: {}
  },
  {
    id: 'std-31',
    name: 'Akmaljon Bozorov',
    grade: 11,
    totalScore: 320,
    averageGrade: 3.5,
    school: 'Toshkent shahar 110-maktab',
    avatarColor: 'bg-amber-500',
    completedStages: { 'g11_s1': true },
    stageScores: { 'g11_s1': 65 },
    examResults: {}
  }
];
