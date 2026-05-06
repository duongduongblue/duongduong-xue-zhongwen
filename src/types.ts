export type VocabWord = {
  id: string;
  hanzi: string;
  pinyin: string;
  meaningVi: string;
  exampleCn: string;
  exampleVi: string;
  level: 'HSK1';
  lessonId?: string;
  moduleId?: string;
};

export type Level = {
  id: string;
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
