import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { allWords, buildQuizQuestions, lessons, levels, modules } from './data/hsk1';
import { seedProgress } from './data/app-seed';
import { mapMockProgressToPersistedProgress } from './lib/seed-loader';
import { loadProgress, saveProgress } from './storage/progress';
import type { QuizQuestion, TabKey, VocabWord } from './types';

const tabs: Array<{ key: TabKey; label: string; icon: string }> = [
  { key: 'home', label: '首页', icon: '主' },
  { key: 'learn', label: '学', icon: '学' },
  { key: 'flashcards', label: '复', icon: '复' },
  { key: 'quiz', label: '考', icon: '考' },
  { key: 'progress', label: '我', icon: '我' },
];

const heatmapLevels = [
  0, 1, 2, 3, 2, 1, 3,
  2, 0, 1, 3, 2, 3, 3,
  1, 2, 3, 2, 0, 1, 3,
];

const addUnique = (items: string[], value: string) =>
  items.includes(value) ? items : [...items, value];

const removeItem = (items: string[], value: string) => items.filter((item) => item !== value);

const progressPercent = (done: number, total: number) =>
  total === 0 ? 0 : Math.round((done / total) * 100);

const formatStudyDate = (date: Date) => date.toISOString().slice(0, 10);

const calculateStreak = (studyDates: string[]) => {
  if (!studyDates.length) return 0;

  const unique = Array.from(new Set(studyDates)).sort();
  const dateSet = new Set(unique);
  let cursor = new Date();
  let streak = 0;

  while (dateSet.has(formatStudyDate(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
};

const formatStartedAt = (startedAt?: string) => {
  if (!startedAt) return 'Start tracking after your first study action';
  const date = new Date(startedAt);
  if (Number.isNaN(date.getTime())) return 'Start tracking after your first study action';
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

function StatCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <View style={[styles.statCard, { borderColor: accent }]}> 
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ActionButton({
  label,
  onPress,
  variant = 'primary',
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionButton,
        variant === 'secondary' && styles.secondaryButton,
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={[styles.actionButtonText, variant === 'secondary' && styles.secondaryButtonText]}>
        {label}
      </Text>
    </Pressable>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return <View style={styles.sectionCard}>{children}</View>;
}

export default function ChineseLearningApp() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [selectedLessonId, setSelectedLessonId] = useState(lessons[0].id);
  const [learnIndex, setLearnIndex] = useState(0);
  const [flashIndex, setFlashIndex] = useState(0);
  const [showFlashBack, setShowFlashBack] = useState(false);
  const [learnedIds, setLearnedIds] = useState<string[]>([]);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [reviewIds, setReviewIds] = useState<string[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizCorrectCount, setQuizCorrectCount] = useState(0);
  const [completedQuestionIds, setCompletedQuestionIds] = useState<string[]>([]);
  const [studyDates, setStudyDates] = useState<string[]>([]);
  const [startedAt, setStartedAt] = useState<string | undefined>(undefined);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [historicalAccuracy, setHistoricalAccuracy] = useState(seedProgress.summary.accuracy_percentage);
  const [hasLoadedProgress, setHasLoadedProgress] = useState(false);

  const selectedLesson = lessons.find((lesson) => lesson.id === selectedLessonId) ?? lessons[0];
  const currentModule = modules.find((module) => module.id === selectedLesson.moduleId) ?? modules[0];
  const activeLevel = levels.find((level) => level.id === selectedLesson.levelId) ?? levels[0];
  const quizQuestions = useMemo<QuizQuestion[]>(() => buildQuizQuestions(selectedLesson.words), [selectedLesson]);
  const currentLearnWord = selectedLesson.words[learnIndex] ?? selectedLesson.words[0];
  const currentFlashWord = selectedLesson.words[flashIndex] ?? selectedLesson.words[0];
  const currentQuestion = quizQuestions[quizIndex];
  const isQuizFinished = quizIndex >= quizQuestions.length;

  const learningPercent = progressPercent(learnedIds.length, allWords.length);
  const masteredPercent = progressPercent(masteredIds.length, allWords.length);
  const reviewPercent = progressPercent(reviewIds.length, allWords.length);
  const sessionAccuracy = completedQuestionIds.length
    ? Math.round((quizCorrectCount / completedQuestionIds.length) * 100)
    : historicalAccuracy;

  const favoriteWords = allWords.filter((word) => favoriteIds.includes(word.id));
  const reviewWords = allWords.filter((word) => reviewIds.includes(word.id));
  const startedAtLabel = formatStartedAt(startedAt);

  useEffect(() => {
    const hydrateProgress = async () => {
      const savedProgress = await loadProgress();
      const fallbackProgress = mapMockProgressToPersistedProgress(seedProgress);
      const initialProgress = savedProgress ?? fallbackProgress;

      const lessonExists = lessons.some((lesson) => lesson.id === initialProgress.selectedLessonId);

      if (lessonExists && initialProgress.selectedLessonId) {
        setSelectedLessonId(initialProgress.selectedLessonId);
      }

      setLearnedIds(initialProgress.learnedIds ?? []);
      setMasteredIds(initialProgress.masteredIds ?? []);
      setReviewIds(initialProgress.reviewIds ?? []);
      setFavoriteIds(initialProgress.favoriteIds ?? []);
      setQuizCorrectCount(0);
      setCompletedQuestionIds([]);
      const loadedStudyDates = initialProgress.studyDates ?? [];
      setStudyDates(loadedStudyDates);
      setStartedAt(initialProgress.startedAt);
      setCurrentStreak(calculateStreak(loadedStudyDates));
      setHistoricalAccuracy(seedProgress.summary.accuracy_percentage);

      setHasLoadedProgress(true);
    };

    void hydrateProgress();
  }, []);

  useEffect(() => {
    if (!hasLoadedProgress) {
      return;
    }

    void saveProgress({
      selectedLessonId,
      learnedIds,
      masteredIds,
      reviewIds,
      favoriteIds,
      quizCorrectCount,
      completedQuestionIds,
      studyDates,
      startedAt,
    });
  }, [
    completedQuestionIds,
    favoriteIds,
    hasLoadedProgress,
    learnedIds,
    masteredIds,
    quizCorrectCount,
    reviewIds,
    selectedLessonId,
    studyDates,
    startedAt,
  ]);

  const selectLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setLearnIndex(0);
    setFlashIndex(0);
    setQuizIndex(0);
    setSelectedAnswer(null);
    setShowFlashBack(false);
  };

  const toggleFavorite = (wordId: string) => {
    setFavoriteIds((current) =>
      current.includes(wordId) ? removeItem(current, wordId) : [...current, wordId],
    );
  };

  const registerStudyActivity = () => {
    const today = formatStudyDate(new Date());
    setStudyDates((current) => {
      const next = addUnique(current, today);
      setCurrentStreak(calculateStreak(next));
      return next;
    });
    setStartedAt((current) => current ?? new Date().toISOString());
  };

  const markLearned = (wordId: string) => {
    registerStudyActivity();
    setLearnedIds((current) => addUnique(current, wordId));
  };

  const handleFlashResult = (wordId: string, remembered: boolean) => {
    markLearned(wordId);

    if (remembered) {
      setMasteredIds((current) => addUnique(current, wordId));
      setReviewIds((current) => removeItem(current, wordId));
    } else {
      setReviewIds((current) => addUnique(current, wordId));
      setMasteredIds((current) => removeItem(current, wordId));
    }

    setShowFlashBack(false);
    setFlashIndex((current) => (current + 1) % selectedLesson.words.length);
  };

  const answerQuestion = (question: QuizQuestion, answer: string) => {
    if (selectedAnswer) {
      return;
    }

    registerStudyActivity();
    setSelectedAnswer(answer);
    setCompletedQuestionIds((current) => addUnique(current, question.id));

    if (answer === question.correctAnswer) {
      setQuizCorrectCount((current) => current + 1);
    }
  };

  const goToNextQuestion = () => {
    setSelectedAnswer(null);
    setQuizIndex((current) => current + 1);
  };

  const restartQuiz = () => {
    setQuizIndex(0);
    setSelectedAnswer(null);
    setQuizCorrectCount(0);
    setCompletedQuestionIds([]);
  };

  const renderLessonPicker = () => (
    <View style={styles.lessonRow}>
      {lessons.map((lesson) => {
        const isActive = lesson.id === selectedLessonId;
        return (
          <Pressable
            key={lesson.id}
            onPress={() => selectLesson(lesson.id)}
            style={({ pressed }) => [
              styles.lessonPill,
              isActive && { backgroundColor: '#C0392B', borderColor: '#C0392B' },
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={[styles.lessonPillText, isActive && styles.lessonPillTextActive]}>
              {lesson.title}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );

  const renderHSKPills = () => (
    <View style={styles.hskRow}>
      {levels.map((level) => {
        const isActive = level.id === activeLevel.id;
        return (
          <View key={level.id} style={[styles.hskPill, isActive && styles.hskPillActive]}>
            <Text style={[styles.hskPillText, isActive && styles.hskPillTextActive]}>{level.displayName}</Text>
          </View>
        );
      })}
    </View>
  );

  const renderMiniProgress = () => (
    <View style={styles.miniProgressRow}>
      <View style={styles.miniProgressTrack}>
        <View style={[styles.miniProgressFill, { width: `${learningPercent}%` }]} />
      </View>
      <Text style={styles.miniProgressText}>{learnedIds.length} / {allWords.length} từ</Text>
    </View>
  );

  const renderWordMeta = (word: VocabWord) => (
    <>
      <Text style={styles.hanziText}>{word.hanzi}</Text>
      <Text style={styles.pinyinText}>{word.pinyin}</Text>
      <Text style={styles.meaningText}>{word.meaningVi}</Text>
      <View style={styles.divider} />
      <Text style={styles.exampleLabel}>Ví dụ</Text>
      <Text style={styles.exampleCn}>{word.exampleCn}</Text>
      <Text style={styles.exampleVi}>{word.exampleVi}</Text>
    </>
  );

  const renderHome = () => (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>DuongDuong 学中文</Text>
        <Text style={styles.heroDescription}>
          HSK 1 available · HSK 2–5 planned
        </Text>
        <View style={styles.heroActions}>
          <ActionButton label="Start Learning" onPress={() => setActiveTab('learn')} />
          <ActionButton
            label="Review"
            onPress={() => setActiveTab('flashcards')}
            variant="secondary"
          />
        </View>
      </View>

      <View style={styles.statsGrid}>
        <StatCard label="Level" value={activeLevel.displayName} accent="#FF8A65" />
        <StatCard label="Learned" value={`${learnedIds.length}/${allWords.length}`} accent="#4DB6AC" />
        <StatCard label="Review" value={`${reviewIds.length}`} accent="#9575CD" />
        <StatCard label="Accuracy" value={`${sessionAccuracy}%`} accent="#5C6BC0" />
      </View>

      <SectionCard>
        <Text style={styles.sectionTitle}>Today's Focus</Text>
        <Text style={styles.sectionSubtitle}>{selectedLesson.topic}</Text>
        <Text style={styles.bodyText}>
          {selectedLesson.words.length} new words · {reviewIds.length} reviews
        </Text>
        <Text style={styles.metaNote}>{startedAt ? `Started on ${startedAtLabel}` : 'Start learning to begin tracking'}</Text>
      </SectionCard>
    </ScrollView>
  );

  const renderLearn = () => (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <SectionCard>
        <Text style={styles.sectionTitle}>Choose Lesson</Text>
        {renderHSKPills()}
        {renderMiniProgress()}
        {renderLessonPicker()}
        <Text style={styles.sectionSubtitle}>{selectedLesson.topic}</Text>
      </SectionCard>

      <View style={styles.wordCard}> 
        <Text style={styles.wordCardTopic}>{selectedLesson.title}</Text>
        <View style={styles.wordHeaderRow}>
          <Text style={styles.badge}>第 {learnIndex + 1} / {selectedLesson.words.length} 词</Text>
          <Pressable onPress={() => toggleFavorite(currentLearnWord.id)}>
            <Text style={styles.favoriteButton}>
              {favoriteIds.includes(currentLearnWord.id) ? '♥ 已收藏' : '♡ 收藏'}
            </Text>
          </Pressable>
        </View>
        {renderWordMeta(currentLearnWord)}
        <View style={styles.wordActionRow}>
          <ActionButton label="Learned" onPress={() => markLearned(currentLearnWord.id)} />
          <ActionButton
            label="Review Cards"
            onPress={() => {
              setFlashIndex(learnIndex);
              setShowFlashBack(false);
              setActiveTab('flashcards');
            }}
            variant="secondary"
          />
        </View>
      </View>

      <View style={styles.stepperRow}>
        <ActionButton
          label="上一个"
          variant="secondary"
          onPress={() => setLearnIndex((current) => Math.max(0, current - 1))}
        />
        <ActionButton
          label="下一个"
          onPress={() =>
            setLearnIndex((current) => Math.min(selectedLesson.words.length - 1, current + 1))
          }
        />
      </View>
    </ScrollView>
  );

  const renderFlashcards = () => (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <SectionCard>
        <Text style={styles.sectionTitle}>Flashcard Review</Text>
        {renderHSKPills()}
        {renderMiniProgress()}
        {renderLessonPicker()}
        <Text style={styles.sectionSubtitle}>Tap to flip the card.</Text>
      </SectionCard>

      <Pressable
        onPress={() => setShowFlashBack((current) => !current)}
        style={styles.flashcard}
      >
        <Text style={styles.flashcardHint}>{showFlashBack ? 'Back' : 'Front'}</Text>
        <Text style={styles.flashcardCounter}>第 {flashIndex + 1} / {selectedLesson.words.length}</Text>
        {showFlashBack ? (
          <View style={styles.flashBackContent}>
            <Text style={styles.flashMeaning}>{currentFlashWord.meaningVi}</Text>
            <Text style={styles.flashPinyin}>{currentFlashWord.pinyin}</Text>
            <Text style={styles.flashExample}>{currentFlashWord.exampleVi}</Text>
          </View>
        ) : (
          <View style={styles.flashFrontContent}>
            <Text style={styles.flashHanzi}>{currentFlashWord.hanzi}</Text>
            <Text style={styles.flashPinyin}>{currentFlashWord.pinyin}</Text>
          </View>
        )}
      </Pressable>

      <View style={styles.swipeHintRow}>
        <Text style={styles.swipeHintText}>← 不知道</Text>
        <Text style={styles.swipeHintText}>知道了 →</Text>
      </View>

      <View style={styles.stepperRow}>
        <ActionButton
          label="✕ Don't know"
          variant="secondary"
          onPress={() => handleFlashResult(currentFlashWord.id, false)}
        />
        <ActionButton label="✓ Know it" onPress={() => handleFlashResult(currentFlashWord.id, true)} />
      </View>
    </ScrollView>
  );

  const renderQuiz = () => (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <SectionCard>
        <Text style={styles.sectionTitle}>Quiz</Text>
        {renderHSKPills()}
        <Text style={styles.sectionSubtitle}>
          {isQuizFinished
            ? 'You completed this lesson quiz.'
            : `${selectedLesson.title} · Question ${quizIndex + 1}/${quizQuestions.length}`}
        </Text>
      </SectionCard>

      {isQuizFinished ? (
        <SectionCard>
          <Text style={styles.resultEmoji}>🎉</Text>
          <Text style={styles.resultTitle}>Quiz Complete</Text>
          <Text style={styles.resultText}>
            You answered {quizCorrectCount}/{quizQuestions.length} correctly ({sessionAccuracy}%).
          </Text>
          <ActionButton label="Restart Quiz" onPress={restartQuiz} />
        </SectionCard>
      ) : (
        <SectionCard>
          <View style={styles.quizHeaderCenter}>
            <Text style={styles.quizCounter}>Question {quizIndex + 1} / {quizQuestions.length}</Text>
            <Text style={styles.quizPrompt}>{currentQuestion.prompt}</Text>
            <Text style={styles.quizSupportingText}>{currentQuestion.supportingText}</Text>
          </View>
          <View style={styles.quizTimerRow}>
            <View style={styles.quizTimerTrack}>
              <View style={[styles.quizTimerFill, { width: `${Math.max(20, 100 - (quizIndex / Math.max(1, quizQuestions.length)) * 35)}%` }]} />
            </View>
            <Text style={styles.quizTimerText}>{Math.max(8, 15 - quizIndex)}s</Text>
          </View>
          <View style={styles.quizOptions}>
            {currentQuestion.options.map((option) => {
              const isCorrect = option === currentQuestion.correctAnswer;
              const isSelected = option === selectedAnswer;
              const revealState = selectedAnswer
                ? isCorrect
                  ? styles.optionCorrect
                  : isSelected
                    ? styles.optionWrong
                    : undefined
                : undefined;

              return (
                <Pressable
                  key={option}
                  onPress={() => answerQuestion(currentQuestion, option)}
                  style={({ pressed }) => [styles.quizOption, revealState, pressed && styles.buttonPressed]}
                >
                  <Text style={styles.quizOptionText}>{option}</Text>
                </Pressable>
              );
            })}
          </View>

          {selectedAnswer ? (
            <>
              <Text style={styles.feedbackText}>
                {selectedAnswer === currentQuestion.correctAnswer
                  ? 'Correct. Keep going.'
                  : `Correct answer: ${currentQuestion.correctAnswer}`}
              </Text>
              <ActionButton label="Next Question" onPress={goToNextQuestion} />
            </>
          ) : null}
        </SectionCard>
      )}
    </ScrollView>
  );

  const renderProgress = () => (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <SectionCard>
        <View style={styles.avatarRow}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>学</Text>
          </View>
          <View>
            <Text style={styles.avatarName}>Học viên</Text>
            <Text style={styles.avatarLevel}>{activeLevel.displayName} · Streak {currentStreak} days</Text>
            <Text style={styles.avatarStarted}>Started: {startedAtLabel}</Text>
          </View>
        </View>
      </SectionCard>

      <SectionCard>
        <View style={styles.streakCardRow}>
          <Text style={styles.streakIcon}>🔥</Text>
          <View>
            <Text style={styles.streakBigNumber}>{currentStreak}</Text>
            <Text style={styles.streakSmallLabel}>ngày liên tiếp</Text>
          </View>
          <View style={styles.goalWrap}>
            <Text style={styles.goalLabel}>Mục tiêu hôm nay</Text>
            <Text style={styles.goalValue}>{Math.min(learnedIds.length, 18)}<Text style={styles.goalSubValue}>/20 từ</Text></Text>
          </View>
        </View>
      </SectionCard>

      <View style={styles.showcaseStatsGrid}>
        <View style={styles.showcaseStatCard}><Text style={styles.showcaseStatNumber}>{learnedIds.length}</Text><Text style={styles.showcaseStatLabel}>từ đã học</Text></View>
        <View style={styles.showcaseStatCard}><Text style={styles.showcaseStatNumber}>{sessionAccuracy}%</Text><Text style={styles.showcaseStatLabel}>độ chính xác</Text></View>
        <View style={styles.showcaseStatCard}><Text style={styles.showcaseStatNumber}>{favoriteWords.length}</Text><Text style={styles.showcaseStatLabel}>từ yêu thích</Text></View>
        <View style={styles.showcaseStatCard}><Text style={styles.showcaseStatNumber}>HSK 1</Text><Text style={styles.showcaseStatLabel}>cấp độ hiện tại</Text></View>
      </View>

      <SectionCard>
        <Text style={styles.heatmapTitle}>Lịch học 3 tuần</Text>
        <View style={styles.heatmapGrid}>
          {heatmapLevels.map((level, index) => (
            <View
              key={`heat-${index}`}
              style={[
                styles.heatmapCell,
                level === 0 && styles.heat0,
                level === 1 && styles.heat1,
                level === 2 && styles.heat2,
                level === 3 && styles.heat3,
              ]}
            />
          ))}
        </View>
      </SectionCard>

      <SectionCard>
        <Text style={styles.progressLabel}>Hoàn thành học từ</Text>
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: `${learningPercent}%`, backgroundColor: '#4DB6AC' }]} />
        </View>
        <Text style={styles.progressValue}>{learningPercent}% • {learnedIds.length}/{allWords.length} từ</Text>

        <Text style={[styles.progressLabel, styles.progressLabelSpacing]}>Từ đã thuộc</Text>
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: `${masteredPercent}%`, backgroundColor: '#9575CD' }]} />
        </View>
        <Text style={styles.progressValue}>{masteredPercent}% • {masteredIds.length}/{allWords.length} từ</Text>

        <Text style={[styles.progressLabel, styles.progressLabelSpacing]}>Từ cần ôn lại</Text>
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: `${reviewPercent}%`, backgroundColor: '#F59E0B' }]} />
        </View>
        <Text style={styles.progressValue}>{reviewPercent}% • {reviewIds.length}/{allWords.length} từ</Text>
      </SectionCard>

      <SectionCard>
        <Text style={styles.sectionTitle}>Từ yêu thích</Text>
        {favoriteWords.length === 0 ? (
          <Text style={styles.bodyText}>Bạn chưa lưu từ nào.</Text>
        ) : (
          favoriteWords.map((word) => (
            <View key={word.id} style={styles.listRow}>
              <Text style={styles.listPrimary}>{word.hanzi}</Text>
              <Text style={styles.listSecondary}>{word.meaningVi}</Text>
            </View>
          ))
        )}
      </SectionCard>

      <SectionCard>
        <Text style={styles.sectionTitle}>Cần ôn lại</Text>
        {reviewWords.length === 0 ? (
          <Text style={styles.bodyText}>Rất tốt! Hiện chưa có từ nào cần ôn lại.</Text>
        ) : (
          reviewWords.map((word) => (
            <View key={word.id} style={styles.listRow}>
              <Text style={styles.listPrimary}>{word.hanzi}</Text>
              <Text style={styles.listSecondary}>{word.pinyin} • {word.meaningVi}</Text>
            </View>
          ))
        )}
      </SectionCard>

      <SectionCard>
        <Text style={styles.sectionTitle}>Thống kê quiz</Text>
        <Text style={styles.bodyText}>Đã làm trong phiên này: {completedQuestionIds.length} câu</Text>
        <Text style={styles.bodyText}>Số câu đúng trong phiên này: {quizCorrectCount}</Text>
        <Text style={styles.bodyText}>Tỷ lệ đúng hiện tại: {sessionAccuracy}%</Text>
      </SectionCard>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.appShell}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.topBarTitle}>DuongDuong 学中文</Text>
            <Text style={styles.topBarSubtitle}>Chinese vocabulary learning app</Text>
          </View>
          <View style={styles.streakBadge}>
            <Text style={styles.streakBadgeText}>{`🔥 Streak ${currentStreak}`}</Text>
          </View>
        </View>

        {activeTab === 'home' && renderHome()}
        {activeTab === 'learn' && renderLearn()}
        {activeTab === 'flashcards' && renderFlashcards()}
        {activeTab === 'quiz' && renderQuiz()}
        {activeTab === 'progress' && renderProgress()}

        <View style={styles.tabBar}>
          {tabs.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <Pressable
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={({ pressed }) => [styles.tabButton, isActive && styles.tabButtonActive, pressed && styles.buttonPressed]}
              >
                <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>{tab.icon}</Text>
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tab.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5EFE0',
  },
  appShell: {
    flex: 1,
  },
  topBar: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#C0392B',
  },
  topBarTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  topBarSubtitle: {
    marginTop: 2,
    fontSize: 11,
    color: 'rgba(255,255,255,0.82)',
  },
  streakBadge: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  streakBadgeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF7ED',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 120,
    gap: 12,
  },
  heroCard: {
    backgroundColor: '#FDF6E3',
    borderRadius: 20,
    padding: 18,
    gap: 8,
    borderWidth: 1,
    borderColor: '#DDD0B0',
  },
  heroTitle: {
    color: '#2C1810',
    fontSize: 28,
    fontWeight: '700',
  },
  heroDescription: {
    color: '#5F5E5A',
    fontSize: 13,
    lineHeight: 19,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 2,
  },
  heroMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  currentLessonPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: '#F6EBCF',
    borderWidth: 1,
    borderColor: '#D4A017',
  },
  currentLessonPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8A5B0A',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statCard: {
    flexBasis: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    gap: 2,
    minHeight: 84,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C1810',
  },
  statLabel: {
    fontSize: 10,
    color: '#888780',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: '#DDD0B0',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2C1810',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#888780',
    lineHeight: 17,
  },
  bodyText: {
    fontSize: 13,
    color: '#5F5E5A',
    lineHeight: 19,
  },
  metaNote: {
    fontSize: 11,
    color: '#9A8F84',
  },
  pathRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pathChip: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#F7F1E3',
    borderWidth: 1,
    borderColor: '#E6D7BA',
  },
  pathChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B5E53',
  },
  lessonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  hskRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  hskPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#EDE0C8',
    borderWidth: 1,
    borderColor: '#D4A017',
  },
  hskPillActive: {
    backgroundColor: '#C0392B',
    borderColor: '#C0392B',
  },
  hskPillText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#854F0B',
  },
  hskPillTextActive: {
    color: '#FFFFFF',
  },
  miniProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  miniProgressTrack: {
    flex: 1,
    height: 5,
    borderRadius: 999,
    backgroundColor: '#EDE0C8',
    overflow: 'hidden',
  },
  miniProgressFill: {
    height: '100%',
    backgroundColor: '#C0392B',
    borderRadius: 999,
  },
  miniProgressText: {
    fontSize: 10,
    color: '#888780',
  },
  lessonPill: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D4A017',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#EDE0C8',
  },
  lessonPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#854F0B',
  },
  lessonPillTextActive: {
    color: '#FFFFFF',
  },
  wordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    gap: 14,
  },
  wordCardTopic: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8A5B0A',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  wordHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  badge: {
    backgroundColor: '#EDE0C8',
    color: '#854F0B',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    overflow: 'hidden',
    fontSize: 11,
    fontWeight: '600',
  },
  favoriteButton: {
    fontSize: 15,
    fontWeight: '700',
    color: '#D4A017',
  },
  hanziText: {
    fontSize: 56,
    fontWeight: '700',
    color: '#2C1810',
    textAlign: 'center',
    lineHeight: 64,
  },
  pinyinText: {
    fontSize: 14,
    color: '#185FA5',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  meaningText: {
    fontSize: 18,
    color: '#2C1810',
    fontWeight: '700',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#DDD0B0',
    marginVertical: 4,
  },
  exampleLabel: {
    fontSize: 10,
    color: '#888780',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  exampleCn: {
    fontSize: 15,
    color: '#2C1810',
    fontWeight: '600',
    textAlign: 'center',
  },
  exampleVi: {
    fontSize: 12,
    color: '#888780',
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 2,
  },
  wordActionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  stepperRow: {
    flexDirection: 'row',
    gap: 10,
  },
  swipeHintRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  swipeHintText: {
    fontSize: 10,
    color: '#AAA39A',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#C0392B',
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C0392B',
    minHeight: 46,
  },
  secondaryButton: {
    backgroundColor: '#EAF3DE',
    borderColor: '#3B6D11',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  secondaryButtonText: {
    color: '#27500A',
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  flashcard: {
    minHeight: 320,
    borderRadius: 18,
    padding: 24,
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD0B0',
  },
  flashcardHint: {
    color: '#888780',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  flashcardCounter: {
    alignSelf: 'center',
    fontSize: 10,
    color: '#B1A79A',
  },
  flashFrontContent: {
    alignItems: 'center',
    gap: 10,
  },
  flashBackContent: {
    alignItems: 'center',
    gap: 10,
  },
  flashHanzi: {
    color: '#2C1810',
    fontSize: 74,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 82,
  },
  flashMeaning: {
    color: '#2C1810',
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
  },
  flashPinyin: {
    color: '#185FA5',
    fontSize: 15,
    marginTop: 2,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1.8,
  },
  flashExample: {
    color: '#888780',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 2,
    textAlign: 'center',
    maxWidth: 260,
  },
  quizHeaderCenter: {
    alignItems: 'center',
    gap: 8,
    paddingBottom: 6,
  },
  quizCounter: {
    fontSize: 10,
    color: '#888780',
  },
  quizTimerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    marginBottom: 4,
  },
  quizTimerTrack: {
    flex: 1,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#EDE0C8',
    overflow: 'hidden',
  },
  quizTimerFill: {
    height: '100%',
    backgroundColor: '#D4A017',
    borderRadius: 999,
  },
  quizTimerText: {
    fontSize: 10,
    color: '#888780',
  },
  resultEmoji: {
    fontSize: 42,
    textAlign: 'center',
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#2C1810',
  },
  resultText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888780',
    marginBottom: 8,
  },
  quizPrompt: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C1810',
    lineHeight: 30,
    textAlign: 'center',
    maxWidth: 320,
  },
  quizSupportingText: {
    fontSize: 11,
    color: '#888780',
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 16,
  },
  quizOptions: {
    gap: 10,
    marginTop: 12,
  },
  quizOption: {
    borderWidth: 1,
    borderColor: '#DDD0B0',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    minHeight: 52,
    justifyContent: 'center',
  },
  quizOptionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2C1810',
    lineHeight: 18,
  },
  optionCorrect: {
    borderColor: '#3B6D11',
    backgroundColor: '#EAF3DE',
  },
  optionWrong: {
    borderColor: '#C0392B',
    backgroundColor: '#FDECEA',
  },
  feedbackText: {
    marginTop: 10,
    fontSize: 12,
    color: '#5F5E5A',
    lineHeight: 18,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 999,
    backgroundColor: '#C0392B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  avatarName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C1810',
  },
  avatarLevel: {
    fontSize: 10,
    color: '#888780',
    marginTop: 2,
  },
  avatarStarted: {
    fontSize: 10,
    color: '#B1A79A',
    marginTop: 2,
  },
  streakCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  streakIcon: {
    fontSize: 26,
  },
  streakBigNumber: {
    fontSize: 26,
    fontWeight: '700',
    color: '#C0392B',
  },
  streakSmallLabel: {
    fontSize: 10,
    color: '#888780',
  },
  goalWrap: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
  },
  goalLabel: {
    fontSize: 10,
    color: '#888780',
  },
  goalValue: {
    fontSize: 16,
    color: '#C0392B',
    fontWeight: '700',
  },
  goalSubValue: {
    fontSize: 10,
    color: '#888780',
    fontWeight: '400',
  },
  showcaseStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  showcaseStatCard: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDD0B0',
    padding: 10,
  },
  showcaseStatNumber: {
    fontSize: 20,
    color: '#2C1810',
    fontWeight: '700',
  },
  showcaseStatLabel: {
    fontSize: 10,
    color: '#888780',
    marginTop: 2,
  },
  heatmapTitle: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: '#888780',
  },
  heatmapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  heatmapCell: {
    width: '12.5%',
    aspectRatio: 1,
    borderRadius: 3,
  },
  heat0: {
    backgroundColor: '#EDE0C8',
  },
  heat1: {
    backgroundColor: '#F09595',
  },
  heat2: {
    backgroundColor: '#E24B4A',
  },
  heat3: {
    backgroundColor: '#C0392B',
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5F5E5A',
  },
  progressLabelSpacing: {
    marginTop: 14,
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: '#EDE0C8',
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 6,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 999,
  },
  progressValue: {
    marginTop: 6,
    fontSize: 11,
    color: '#888780',
  },
  listRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E2C5',
    gap: 4,
  },
  listPrimary: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C1810',
  },
  listSecondary: {
    fontSize: 12,
    color: '#888780',
  },
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#C0392B',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#A33226',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    borderRadius: 14,
    paddingVertical: 6,
  },
  tabButtonActive: {
    backgroundColor: 'transparent',
  },
  tabIcon: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.55)',
  },
  tabIconActive: {
    color: '#FFFFFF',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.55)',
  },
  tabLabelActive: {
    color: '#FFFFFF',
  },
});
