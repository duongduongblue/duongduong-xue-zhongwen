import type { Lesson, QuizQuestion, VocabWord } from '../types';
import { seedProgress, seedWords, type SeedProgress, type SeedWord } from '../data/app-seed';
import type { PersistedProgress } from '../storage/progress';

const TOPIC_META: Record<string, { title: string; topic: string; color: string }> = {
  greeting: { title: 'Bài 1', topic: 'Chào hỏi cơ bản', color: '#C0392B' },
  polite: { title: 'Bài 2', topic: 'Lịch sự hằng ngày', color: '#D4A017' },
  pronoun: { title: 'Bài 3', topic: 'Đại từ nhân xưng', color: '#2D6A4F' },
  'question word': { title: 'Bài 4', topic: 'Từ để hỏi', color: '#6C5CE7' },
  education: { title: 'Bài 5', topic: 'Trường lớp', color: '#00A8E8' },
  'daily life': { title: 'Bài 6', topic: 'Sinh hoạt thường ngày', color: '#FF8A65' },
  time: { title: 'Bài 7', topic: 'Thời gian & lịch', color: '#7F8C8D' },
  number: { title: 'Bài 8', topic: 'Số đếm cơ bản', color: '#8E44AD' },
  adjective: { title: 'Bài 9', topic: 'Tính từ thông dụng', color: '#16A085' },
  verb: { title: 'Bài 10', topic: 'Động từ nền tảng', color: '#2980B9' },
  weather: { title: 'Bài 11', topic: 'Thời tiết', color: '#3498DB' },
  shopping: { title: 'Bài 12', topic: 'Mua sắm', color: '#E67E22' },
  family: { title: 'Bài 13', topic: 'Gia đình', color: '#E84393' },
  transport: { title: 'Bài 14', topic: 'Di chuyển', color: '#34495E' },
  language: { title: 'Bài 15', topic: 'Ngôn ngữ', color: '#27AE60' },
};

const FALLBACK_META = { title: 'Bài thêm', topic: 'Từ vựng mở rộng', color: '#9B59B6' };

export type AppSeedBundle = {
  words: VocabWord[];
  lessons: Lesson[];
  quizQuestions: QuizQuestion[];
  initialProgress: PersistedProgress;
  mockProgress: SeedProgress;
};

export function mapSeedWordToVocabWord(word: SeedWord): VocabWord {
  return {
    id: word.id,
    hanzi: word.hanzi,
    pinyin: word.pinyin,
    meaningVi: word.meaning_vi,
    exampleCn: word.example_cn ?? '',
    exampleVi: word.example_translation ?? '',
    level: 'HSK1',
  };
}

export function buildLessonsFromSeed(words: SeedWord[]): Lesson[] {
  const grouped = new Map<string, SeedWord[]>();
  for (const word of words) {
    const key = word.tags?.[0] ?? 'misc';
    const current = grouped.get(key) ?? [];
    current.push(word);
    grouped.set(key, current);
  }
  return Array.from(grouped.entries()).map(([key, group], index) => {
    const meta = TOPIC_META[key] ?? FALLBACK_META;
    return {
      id: key.replace(/\s+/g, '-'),
      title: meta.title || ('Bài ' + (index + 1)),
      topic: meta.topic,
      color: meta.color,
      words: group.slice(0, 8).map(mapSeedWordToVocabWord),
    };
  });
}

function uniqueOptions(correct: string, distractors: string[]) {
  return Array.from(new Set([correct, ...distractors])).slice(0, 4);
}

export function buildQuizQuestionsFromSeed(words: SeedWord[], limit = 12): QuizQuestion[] {
  return words.slice(0, limit).map((word, index) => {
    const otherWords = words.filter((item) => item.id !== word.id);
    if (index % 3 === 0) {
      return {
        id: word.id + '-meaning',
        prompt: '"' + word.hanzi + '" có nghĩa là gì?',
        supportingText: 'Pinyin: ' + word.pinyin,
        correctAnswer: word.meaning_vi,
        options: uniqueOptions(word.meaning_vi, otherWords.slice(index, index + 6).map((item) => item.meaning_vi)),
      };
    }
    if (index % 3 === 1) {
      return {
        id: word.id + '-pinyin',
        prompt: 'Pinyin đúng của "' + word.hanzi + '" là gì?',
        supportingText: 'Nghĩa: ' + word.meaning_vi,
        correctAnswer: word.pinyin,
        options: uniqueOptions(word.pinyin, otherWords.slice(index, index + 6).map((item) => item.pinyin)),
      };
    }
    return {
      id: word.id + '-recognition',
      prompt: 'Từ nào có nghĩa là "' + word.meaning_vi + '"?',
      supportingText: 'Gợi ý: ' + (word.example_cn ?? ''),
      correctAnswer: word.hanzi,
      options: uniqueOptions(word.hanzi, otherWords.slice(index, index + 6).map((item) => item.hanzi)),
    };
  });
}

export function mapMockProgressToPersistedProgress(mock: SeedProgress = seedProgress): PersistedProgress {
  const progressItems = Object.values(mock.progress ?? {});
  return {
    selectedLessonId: 'greeting',
    learnedIds: progressItems.filter((item) => item.status !== 'new').map((item) => item.word_id),
    masteredIds: progressItems.filter((item) => item.status === 'mastered').map((item) => item.word_id),
    reviewIds: progressItems.filter((item) => item.status === 'learning' || item.status === 'reviewing').map((item) => item.word_id),
    favoriteIds: progressItems.filter((item) => item.bookmarked).map((item) => item.word_id),
    quizCorrectCount: (mock.recentSessions ?? []).filter((item) => item.mode === 'quiz').reduce((sum, item) => sum + (item.correct_count ?? 0), 0),
    completedQuestionIds: [],
  };
}

export function createAppSeedBundle(): AppSeedBundle {
  const lessons = buildLessonsFromSeed(seedWords);
  const words = lessons.flatMap((lesson) => lesson.words);
  return {
    words,
    lessons,
    quizQuestions: buildQuizQuestionsFromSeed(seedWords),
    initialProgress: mapMockProgressToPersistedProgress(seedProgress),
    mockProgress: seedProgress,
  };
}
