export type HSKLevelId = 'HSK1' | 'HSK2' | 'HSK3' | 'HSK4' | 'HSK5';

export type VocabWord = {
  id: string;
  hanzi: string;
  pinyin: string;
  meaningVi: string;
  meaningEn?: string;
  exampleCn: string;
  exampleVi: string;
  exampleEn?: string;
  level: HSKLevelId;
  lessonId?: string;
  moduleId?: string;
  appNoteVi?: string;
  appSynonymNoteVi?: string;
  collocationTop?: string[];
};

export type Level = {
  id: HSKLevelId;
  displayName: string;
  available: boolean;
  description?: string;
  targetWordCount?: number;
};

export type Module = {
  id: string;
  levelId: string;
  title: string;
  subtitle: string;
  order: number;
};

export type Lesson = {
  id: string;
  levelId: string;
  moduleId: string;
  title: string;
  topic: string;
  color: string;
  words: VocabWord[];
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  supportingText: string;
  correctAnswer: string;
  options: string[];
};

export type TabKey = 'home' | 'learn' | 'flashcards' | 'quiz' | 'progress';
