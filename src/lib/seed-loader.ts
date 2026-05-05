import type { Lesson, QuizQuestion, VocabWord } from '../types';
import { seedProgress, seedWords, type SeedProgress, type SeedWord } from '../data/app-seed';
import type { PersistedProgress } from '../storage/progress';

const TOPIC_META: Record<string, { topic: string; color: string }> = {
  greeting: { topic: 'Chào hỏi & lịch sự', color: '#C0392B' },
  people: { topic: 'Con người & giới thiệu', color: '#2D6A4F' },
  'question word': { topic: 'Từ để hỏi', color: '#6C5CE7' },
  number: { topic: 'Số đếm cơ bản', color: '#8E44AD' },
  time: { topic: 'Thời gian & lịch', color: '#7F8C8D' },
  education: { topic: 'Trường lớp', color: '#00A8E8' },
  'daily life': { topic: 'Sinh hoạt thường ngày', color: '#FF8A65' },
  food: { topic: 'Đồ ăn & thức uống', color: '#D4A017' },
  family: { topic: 'Gia đình', color: '#E84393' },
  adjective: { topic: 'Tính từ cơ bản', color: '#16A085' },
  verb: { topic: 'Động từ & mẫu câu cơ bản', color: '#2980B9' },
  weather: { topic: 'Thời tiết', color: '#3498DB' },
  shopping: { topic: 'Mua sắm & tiền', color: '#E67E22' },
  transport: { topic: 'Di chuyển & địa điểm', color: '#34495E' },
  language: { topic: 'Ngôn ngữ', color: '#27AE60' },
};

const TOPIC_ORDER = [
  'greeting',
  'people',
  'question word',
  'number',
  'time',
  'education',
  'daily life',
  'food',
  'family',
  'adjective',
  'verb',
  'weather',
  'shopping',
  'transport',
  'language',
] as const;

const TOPIC_ALIASES: Record<string, string> = {
  greeting: 'greeting',
  polite: 'greeting',
  introduction: 'greeting',
  pronoun: 'people',
  demonstrative: 'people',
  people: 'people',
  relationship: 'people',
  country: 'people',
  'question word': 'question word',
  number: 'number',
  time: 'time',
  education: 'education',
  'daily life': 'daily life',
  object: 'daily life',
  place: 'daily life',
  animal: 'daily life',
  health: 'daily life',
  food: 'food',
  drink: 'food',
  fruit: 'food',
  family: 'family',
  adjective: 'adjective',
  emotion: 'adjective',
  quantity: 'adjective',
  verb: 'verb',
  'basic grammar': 'verb',
  negation: 'verb',
  possession: 'verb',
  modal: 'verb',
  desire: 'verb',
  preference: 'verb',
  movement: 'verb',
  job: 'verb',
  weather: 'weather',
  shopping: 'shopping',
  money: 'shopping',
  transport: 'transport',
  language: 'language',
};

const FALLBACK_META = { topic: 'Từ vựng mở rộng', color: '#9B59B6' };

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
    const tags = word.tags ?? [];
    const resolvedKey = tags
      .map((tag) => TOPIC_ALIASES[tag] ?? tag)
      .find((tag) => tag in TOPIC_META) ?? 'misc';

    const current = grouped.get(resolvedKey) ?? [];
    current.push(word);
    grouped.set(resolvedKey, current);
  }

  const orderedKeys = [
    ...TOPIC_ORDER.filter((key) => grouped.has(key)),
    ...Array.from(grouped.keys()).filter((key) => !TOPIC_ORDER.includes(key as (typeof TOPIC_ORDER)[number])),
  ];

  return orderedKeys.map((key, index) => {
    const meta = TOPIC_META[key] ?? FALLBACK_META;
    const group = grouped.get(key) ?? [];

    return {
      id: key.replace(/\s+/g, '-'),
      title: 'Bài ' + (index + 1),
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
