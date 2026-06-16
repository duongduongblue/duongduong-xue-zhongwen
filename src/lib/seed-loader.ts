import type { Lesson, Level, Module, QuizQuestion, VocabWord } from '../types';
import { seedProgress, seedWords, type SeedProgress, type SeedWord } from '../data/app-seed';
import { hsk1LessonDefs, levels, modules } from '../data/curriculum-hsk1';
import type { PersistedProgress } from '../storage/progress';

export type AppSeedBundle = {
  levels: Level[];
  modules: Module[];
  words: VocabWord[];
  lessons: Lesson[];
  quizQuestions: QuizQuestion[];
  initialProgress: PersistedProgress;
  mockProgress: SeedProgress;
};

export function mapSeedWordToVocabWord(word: SeedWord, lessonId?: string, moduleId?: string): VocabWord {
  return {
    id: word.id,
    hanzi: word.hanzi,
    pinyin: word.pinyin,
    meaningVi: word.meaning_vi,
    meaningEn: word.meaning_en,
    exampleCn: word.example_cn ?? '',
    exampleVi: word.example_translation ?? '',
    level: 'HSK1',
    lessonId,
    moduleId,
  };
}

export function buildLessonsFromSeed(words: SeedWord[]): Lesson[] {
  const wordByHanzi = new Map(words.map((word) => [word.hanzi, word]));

  return hsk1LessonDefs.map((lessonDef) => ({
    id: lessonDef.id,
    levelId: lessonDef.levelId,
    moduleId: lessonDef.moduleId,
    title: lessonDef.title,
    topic: lessonDef.topic,
    color: lessonDef.color,
    words: lessonDef.words
      .map((hanzi) => wordByHanzi.get(hanzi))
      .filter(Boolean)
      .map((word) => mapSeedWordToVocabWord(word as SeedWord, lessonDef.id, lessonDef.moduleId)),
  }));
}

function uniqueOptions(correct: string, distractors: string[]) {
  return Array.from(new Set([correct, ...distractors])).slice(0, 4);
}

export function buildQuizQuestionsFromSeed(words: SeedWord[], limit = 12): QuizQuestion[] {
  return words.slice(0, limit).map((word, index) => {
    const otherWords = words.filter((item) => item.id !== word.id);
    const meaning = word.meaning_en || word.meaning_vi;
    const distractorMeanings = otherWords.slice(index, index + 6).map((item) => item.meaning_en || item.meaning_vi);

    if (index % 3 === 0) {
      return {
        id: word.id + '-meaning',
        prompt: '"' + word.hanzi + '" 是什么意思? / What does "' + word.hanzi + '" mean?',
        supportingText: '拼音 / Pinyin: ' + word.pinyin,
        correctAnswer: meaning,
        options: uniqueOptions(meaning, distractorMeanings),
      };
    }
    if (index % 3 === 1) {
      return {
        id: word.id + '-pinyin',
        prompt: '哪个拼音对应 "' + word.hanzi + '"? / Which pinyin matches "' + word.hanzi + '"?',
        supportingText: '意思 / Meaning: ' + meaning,
        correctAnswer: word.pinyin,
        options: uniqueOptions(word.pinyin, otherWords.slice(index, index + 6).map((item) => item.pinyin)),
      };
    }
    return {
      id: word.id + '-recognition',
      prompt: '哪个词表示 "' + meaning + '"? / Which word means "' + meaning + '"?',
      supportingText: '例句 / Example: ' + (word.example_cn ?? ''),
      correctAnswer: word.hanzi,
      options: uniqueOptions(word.hanzi, otherWords.slice(index, index + 6).map((item) => item.hanzi)),
    };
  });
}

export function mapMockProgressToPersistedProgress(mock: SeedProgress = seedProgress): PersistedProgress {
  const progressItems = Object.values(mock.progress ?? {});
  return {
    selectedLessonId: 'HSK1-M1-L1',
    learnedIds: progressItems.filter((item) => item.status !== 'new').map((item) => item.word_id),
    masteredIds: progressItems.filter((item) => item.status === 'mastered').map((item) => item.word_id),
    reviewIds: progressItems.filter((item) => item.status === 'learning' || item.status === 'reviewing').map((item) => item.word_id),
    favoriteIds: progressItems.filter((item) => item.bookmarked).map((item) => item.word_id),
    quizCorrectCount: (mock.recentSessions ?? []).filter((item) => item.mode === 'quiz').reduce((sum, item) => sum + (item.correct_count ?? 0), 0),
    completedQuestionIds: [],
    studyDates: [],
    startedAt: undefined,
    lastStudyAt: undefined,
  };
}

export function createAppSeedBundle(): AppSeedBundle {
  const lessons = buildLessonsFromSeed(seedWords);
  const words = lessons.flatMap((lesson) => lesson.words);
  return {
    levels,
    modules,
    words,
    lessons,
    quizQuestions: buildQuizQuestionsFromSeed(seedWords),
    initialProgress: mapMockProgressToPersistedProgress(seedProgress),
    mockProgress: seedProgress,
  };
}
