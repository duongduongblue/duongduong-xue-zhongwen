export type VocabWord = {
  id: string;
  hanzi: string;
  pinyin: string;
  meaningVi: string;
  exampleCn: string;
  exampleVi: string;
  level: 'HSK1';
};

export type Lesson = {
  id: string;
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
