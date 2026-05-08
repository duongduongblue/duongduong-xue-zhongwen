import type { QuizQuestion, VocabWord } from '../types';
import { buildQuizQuestionsFromSeed, createAppSeedBundle } from '../lib/seed-loader';
import { hsk5FocusLessons, hsk5FocusWords } from './hsk5-focus';

const appSeed = createAppSeedBundle();

export const levels = appSeed.levels;
export const modules = appSeed.modules;
export const lessons = [...appSeed.lessons, ...hsk5FocusLessons];
export const allWords: VocabWord[] = [...appSeed.words, ...hsk5FocusWords];

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
      level: word.level,
      audio_text: word.hanzi,
    })),
    Math.min(words.length, 12),
  );
};
