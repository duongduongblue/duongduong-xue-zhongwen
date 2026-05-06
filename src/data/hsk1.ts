import type { QuizQuestion, VocabWord } from '../types';
import { buildQuizQuestionsFromSeed, createAppSeedBundle } from '../lib/seed-loader';

const appSeed = createAppSeedBundle();

export const levels = appSeed.levels;
export const modules = appSeed.modules;
export const lessons = appSeed.lessons;
export const allWords: VocabWord[] = appSeed.words;

export const buildQuizQuestions = (words: VocabWord[] = allWords): QuizQuestion[] => {
  if (!words.length || words === allWords) {
    return appSeed.quizQuestions;
  }

  return buildQuizQuestionsFromSeed(
    words.map((word) => ({
      id: word.id,
      hanzi: word.hanzi,
      pinyin: word.pinyin,
      meaning_en: word.meaningVi,
      meaning_vi: word.meaningVi,
      example_cn: word.exampleCn,
      example_translation: word.exampleVi,
      level: 'HSK1' as const,
      audio_text: word.hanzi,
    })),
    Math.min(words.length, 12),
  );
};
