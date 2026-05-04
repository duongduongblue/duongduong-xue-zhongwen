import AsyncStorage from '@react-native-async-storage/async-storage';

export type PersistedProgress = {
  selectedLessonId: string;
  learnedIds: string[];
  masteredIds: string[];
  reviewIds: string[];
  favoriteIds: string[];
  quizCorrectCount: number;
  completedQuestionIds: string[];
};

const STORAGE_KEY = 'trung-moi-ngay-progress';

const ensureStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];

export async function loadProgress(): Promise<Partial<PersistedProgress> | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<PersistedProgress>;

    return {
      selectedLessonId:
        typeof parsed.selectedLessonId === 'string' ? parsed.selectedLessonId : '',
      learnedIds: ensureStringArray(parsed.learnedIds),
      masteredIds: ensureStringArray(parsed.masteredIds),
      reviewIds: ensureStringArray(parsed.reviewIds),
      favoriteIds: ensureStringArray(parsed.favoriteIds),
      quizCorrectCount:
        typeof parsed.quizCorrectCount === 'number' ? parsed.quizCorrectCount : 0,
      completedQuestionIds: ensureStringArray(parsed.completedQuestionIds),
    };
  } catch (error) {
    console.warn('Không thể tải tiến độ đã lưu:', error);
    return null;
  }
}

export async function saveProgress(progress: PersistedProgress): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.warn('Không thể lưu tiến độ học:', error);
  }
}
