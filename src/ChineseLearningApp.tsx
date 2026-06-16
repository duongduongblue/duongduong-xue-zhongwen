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
  { key: 'home', label: 'Home\n首页', icon: '首' },
  { key: 'learn', label: 'Learn\n学习', icon: '学' },
  { key: 'flashcards', label: 'Cards\n卡片', icon: '卡' },
  { key: 'quiz', label: 'Quiz\n测验', icon: '测' },
  { key: 'progress', label: 'Progress\n进度', icon: '进' },
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
  if (!startedAt) return '开始记录 / Start tracking after your first study action';
  const date = new Date(startedAt);
  if (Number.isNaN(date.getTime())) return '开始记录 / Start tracking after your first study action';
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const formatLastStudyAt = (lastStudyAt?: string) => {
  if (!lastStudyAt) return '暂无学习记录 / No study session yet';
  const date = new Date(lastStudyAt);
  if (Number.isNaN(date.getTime())) return '暂无学习记录 / No study session yet';
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
  const [lastStudyAt, setLastStudyAt] = useState<string | undefined>(undefined);
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

  const activeLevelWords = allWords.filter((word) => word.level === activeLevel.id);
  const activeLevelWordIds = new Set(activeLevelWords.map((word) => word.id));
  const activeLevelLearnedCount = learnedIds.filter((id) => activeLevelWordIds.has(id)).length;
  const activeLevelMasteredCount = masteredIds.filter((id) => activeLevelWordIds.has(id)).length;
  const activeLevelReviewCount = reviewIds.filter((id) => activeLevelWordIds.has(id)).length;

  const learningPercent = progressPercent(activeLevelLearnedCount, activeLevelWords.length);
  const masteredPercent = progressPercent(activeLevelMasteredCount, activeLevelWords.length);
  const reviewPercent = progressPercent(activeLevelReviewCount, activeLevelWords.length);
  const sessionAccuracy = completedQuestionIds.length
    ? Math.round((quizCorrectCount / completedQuestionIds.length) * 100)
    : historicalAccuracy;

  const favoriteWords = activeLevelWords.filter((word) => favoriteIds.includes(word.id));
  const reviewWords = activeLevelWords.filter((word) => reviewIds.includes(word.id));
  const startedAtLabel = formatStartedAt(startedAt);
  const lastStudyAtLabel = formatLastStudyAt(lastStudyAt);

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
      setLastStudyAt(initialProgress.lastStudyAt);
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
      lastStudyAt,
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
    lastStudyAt,
  ]);

  const selectLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setLearnIndex(0);
    setFlashIndex(0);
    setQuizIndex(0);
    setSelectedAnswer(null);
    setShowFlashBack(false);
  };

  const selectLevel = (levelId: string) => {
    const firstLesson = lessons.find((lesson) => lesson.levelId === levelId);
    if (!firstLesson) return;
    selectLesson(firstLesson.id);
  };

  const toggleFavorite = (wordId: string) => {
    setFavoriteIds((current) =>
      current.includes(wordId) ? removeItem(current, wordId) : [...current, wordId],
    );
  };

  const registerStudyActivity = () => {
    const now = new Date();
    const today = formatStudyDate(now);
    setStudyDates((current) => {
      const next = addUnique(current, today);
      setCurrentStreak(calculateStreak(next));
      return next;
    });
    const nowIso = now.toISOString();
    setStartedAt((current) => current ?? nowIso);
    setLastStudyAt(nowIso);
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
      {lessons.filter((lesson) => lesson.levelId === activeLevel.id).map((lesson) => {
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
          <Pressable
            key={level.id}
            onPress={() => level.available && selectLevel(level.id)}
            style={[styles.hskPill, isActive && styles.hskPillActive, !level.available && styles.hskPillDisabled]}
          >
            <Text style={[styles.hskPillText, isActive && styles.hskPillTextActive, !level.available && styles.hskPillTextDisabled]}>{level.displayName}</Text>
          </Pressable>
        );
      })}
    </View>
  );

  const renderMiniProgress = () => (
    <View style={styles.miniProgressRow}>
      <View style={styles.miniProgressTrack}>
        <View style={[styles.miniProgressFill, { width: `${learningPercent}%` }]} />
      </View>
      <Text style={styles.miniProgressText}>{activeLevelLearnedCount} / {activeLevelWords.length} 词 / words</Text>
    </View>
  );

  const renderWordMeta = (word: VocabWord) => (
    <>
      <Text style={styles.hanziText}>{word.hanzi}</Text>
      <Text style={styles.pinyinText}>{word.pinyin}</Text>
      <Text style={styles.meaningText}>{word.meaningEn ?? word.meaningVi}</Text>
      <View style={styles.divider} />
      <Text style={styles.exampleLabel}>例句 / Example</Text>
      <Text style={styles.exampleCn}>{word.exampleCn}</Text>
      {word.exampleEn ? <Text style={styles.exampleVi}>{word.exampleEn}</Text> : null}
    </>
  );

  const renderHome = () => (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>DuongDuong 学中文</Text>
        <Text style={styles.heroDescription}>
          HSK 1 available · HSK 5 focus prototype ready
        </Text>
        <View style={styles.heroActions}>
          <ActionButton label="开始学习 / Start Learning" onPress={() => setActiveTab('learn')} />
          <ActionButton
            label="复习 / Review"
            onPress={() => setActiveTab('flashcards')}
            variant="secondary"
          />
        </View>
        <View style={styles.heroActions}>
          <ActionButton label="HSK5重点 / HSK5 Focus" onPress={() => { selectLevel('HSK5'); setActiveTab('learn'); }} />
        </View>
      </View>

      <View style={styles.statsGrid}>
        <StatCard label="等级 / Level" value={activeLevel.displayName} accent="#FF8A65" />
        <StatCard label="已学 / Learned" value={`${activeLevelLearnedCount}/${activeLevelWords.length}`} accent="#4DB6AC" />
        <StatCard label="复习 / Review" value={`${activeLevelReviewCount}`} accent="#9575CD" />
        <StatCard label="正确率 / Accuracy" value={`${sessionAccuracy}%`} accent="#5C6BC0" />
      </View>

      <SectionCard>
        <Text style={styles.sectionTitle}>今日重点 / Today's Focus</Text>
        <Text style={styles.sectionSubtitle}>{selectedLesson.topic}</Text>
        <Text style={styles.bodyText}>
          {selectedLesson.words.length} 个新词 / new words · {activeLevelReviewCount} 次复习 / reviews
        </Text>
        <Text style={styles.metaNote}>{startedAt ? `开始于 / Started on ${startedAtLabel}` : '开始学习后将开始记录 / Start learning to begin tracking'}</Text>
      </SectionCard>
    </ScrollView>
  );

  const renderLearn = () => (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <SectionCard>
        <Text style={styles.sectionTitle}>选择课程 / Choose Lesson</Text>
        {renderHSKPills()}
        {renderMiniProgress()}
        {renderLessonPicker()}
        <Text style={styles.sectionSubtitle}>{selectedLesson.topic}</Text>
        <Text style={styles.metaNote}>模块 / Module: {currentModule.title} · {currentModule.subtitle}</Text>
      </SectionCard>

      <View style={styles.wordCard}> 
        <Text style={styles.wordCardTopic}>{selectedLesson.title}</Text>
        <View style={styles.wordHeaderRow}>
          <Text style={styles.badge}>第 {learnIndex + 1} 词 / Word {learnIndex + 1} of {selectedLesson.words.length}</Text>
          <Pressable onPress={() => toggleFavorite(currentLearnWord.id)}>
            <Text style={styles.favoriteButton}>
              {favoriteIds.includes(currentLearnWord.id) ? '已保存 / Saved' : '保存 / Save'}
            </Text>
          </Pressable>
        </View>
        {renderWordMeta(currentLearnWord)}
        <View style={styles.wordActionRow}>
          <ActionButton label="学会了 / Learned" onPress={() => markLearned(currentLearnWord.id)} />
          <ActionButton
            label={activeLevel.id === 'HSK5' ? '重点复习 / Focus Review' : '卡片复习 / Review Cards'}
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
          label="上一词 / Previous"
          variant="secondary"
          onPress={() => setLearnIndex((current) => Math.max(0, current - 1))}
        />
        <ActionButton
          label="下一词 / Next"
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
        <Text style={styles.sectionTitle}>卡片复习 / Flashcard Review</Text>
        {renderHSKPills()}
        {renderMiniProgress()}
        {renderLessonPicker()}
        <Text style={styles.sectionSubtitle}>点击翻卡 / Tap to flip the card.</Text>
        <Text style={styles.metaNote}>上次学习 / Last study: {lastStudyAtLabel}</Text>
      </SectionCard>

      <Pressable
        onPress={() => setShowFlashBack((current) => !current)}
        style={styles.flashcard}
      >
        <Text style={styles.flashcardHint}>{showFlashBack ? '背面 / Back' : '正面 / Front'}</Text>
        <Text style={styles.flashcardCounter}>卡片 {flashIndex + 1} / Card {flashIndex + 1} of {selectedLesson.words.length}</Text>
        {showFlashBack ? (
          <View style={styles.flashBackContent}>
            <Text style={styles.flashMeaning}>{currentFlashWord.meaningEn ?? currentFlashWord.meaningVi}</Text>
            <Text style={styles.flashPinyin}>{currentFlashWord.pinyin}</Text>
            <Text style={styles.flashExampleLabel}>例句 / Example</Text>
            <Text style={styles.flashExample}>{currentFlashWord.exampleCn}</Text>
            {currentFlashWord.exampleEn ? <Text style={styles.flashExample}>{currentFlashWord.exampleEn}</Text> : null}
          </View>
        ) : (
          <View style={styles.flashFrontContent}>
            <Text style={styles.flashHanzi}>{currentFlashWord.hanzi}</Text>
            <Text style={styles.flashPinyin}>{currentFlashWord.pinyin}</Text>
          </View>
        )}
      </Pressable>

      <View style={styles.swipeHintRow}>
        <Text style={styles.swipeHintText}>不会 / Don't know</Text>
        <Text style={styles.swipeHintText}>会了 / Know it</Text>
      </View>

      <View style={styles.stepperRow}>
        <ActionButton
          label="✕ 不会 / Don't know"
          variant="secondary"
          onPress={() => handleFlashResult(currentFlashWord.id, false)}
        />
        <ActionButton label="✓ 会了 / Know it" onPress={() => handleFlashResult(currentFlashWord.id, true)} />
      </View>
    </ScrollView>
  );

  const renderQuiz = () => (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <SectionCard>
        <Text style={styles.sectionTitle}>测验 / Quiz</Text>
        {renderHSKPills()}
        <Text style={styles.sectionSubtitle}>
          {isQuizFinished
            ? '你已完成本课测验 / You completed this lesson quiz.'
            : `${selectedLesson.title} · 第 ${quizIndex + 1} 题 / Question ${quizIndex + 1}/${quizQuestions.length}`}
        </Text>
        <Text style={styles.metaNote}>上次学习 / Last study: {lastStudyAtLabel}</Text>
      </SectionCard>

      {isQuizFinished ? (
        <SectionCard>
          <Text style={styles.resultEmoji}>OK</Text>
          <Text style={styles.resultTitle}>测验完成 / Quiz Complete</Text>
          <Text style={styles.resultText}>
            你答对了 {quizCorrectCount}/{quizQuestions.length} 题 / You answered {quizCorrectCount}/{quizQuestions.length} correctly ({sessionAccuracy}%).
          </Text>
          <ActionButton label="重新开始 / Restart Quiz" onPress={restartQuiz} />
        </SectionCard>
      ) : (
        <SectionCard>
          <View style={styles.quizHeaderCenter}>
            <Text style={styles.quizCounter}>第 {quizIndex + 1} 题 / Question {quizIndex + 1} of {quizQuestions.length}</Text>
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
                  ? '正确，继续 / Correct - keep going.'
                  : `答案 / Answer: ${currentQuestion.correctAnswer}`}
              </Text>
              <ActionButton label="下一题 / Next Question" onPress={goToNextQuestion} />
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
            <Text style={styles.avatarName}>学习者 / Learner</Text>
            <Text style={styles.avatarLevel}>{activeLevel.displayName} · 连续 {currentStreak} 天 / Streak {currentStreak} days</Text>
            <Text style={styles.avatarStarted}>开始时间 / Started: {startedAtLabel}</Text>
          </View>
        </View>
      </SectionCard>

      <SectionCard>
        <View style={styles.streakCardRow}>
          <Text style={styles.streakIcon}>连续</Text>
          <View>
            <Text style={styles.streakBigNumber}>{currentStreak}</Text>
            <Text style={styles.streakSmallLabel}>连续天数 / day streak</Text>
          </View>
          <View style={styles.goalWrap}>
            <Text style={styles.goalLabel}>今日目标 / Today's goal</Text>
            <Text style={styles.goalValue}>{Math.min(learnedIds.length, 18)}<Text style={styles.goalSubValue}>/20 词 / words</Text></Text>
          </View>
        </View>
      </SectionCard>

      <View style={styles.showcaseStatsGrid}>
        <View style={styles.showcaseStatCard}><Text style={styles.showcaseStatNumber}>{learnedIds.length}</Text><Text style={styles.showcaseStatLabel}>已学词数 / words learned</Text></View>
        <View style={styles.showcaseStatCard}><Text style={styles.showcaseStatNumber}>{sessionAccuracy}%</Text><Text style={styles.showcaseStatLabel}>正确率 / accuracy</Text></View>
        <View style={styles.showcaseStatCard}><Text style={styles.showcaseStatNumber}>{favoriteWords.length}</Text><Text style={styles.showcaseStatLabel}>已保存 / saved words</Text></View>
        <View style={styles.showcaseStatCard}><Text style={styles.showcaseStatNumber}>{studyDates.length}</Text><Text style={styles.showcaseStatLabel}>学习天数 / study days</Text></View>
      </View>

      <SectionCard>
        <Text style={styles.heatmapTitle}>三周学习记录 / 3-week study streak</Text>
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
        <Text style={styles.progressLabel}>已学词数 / Words learned</Text>
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: `${learningPercent}%`, backgroundColor: '#4DB6AC' }]} />
        </View>
        <Text style={styles.progressValue}>{learningPercent}% • {activeLevelLearnedCount}/{activeLevelWords.length} 词 / words</Text>

        <Text style={[styles.progressLabel, styles.progressLabelSpacing]}>已掌握 / Words mastered</Text>
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: `${masteredPercent}%`, backgroundColor: '#9575CD' }]} />
        </View>
        <Text style={styles.progressValue}>{masteredPercent}% • {activeLevelMasteredCount}/{activeLevelWords.length} 词 / words</Text>

        <Text style={[styles.progressLabel, styles.progressLabelSpacing]}>待复习 / Words to review</Text>
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: `${reviewPercent}%`, backgroundColor: '#F59E0B' }]} />
        </View>
        <Text style={styles.progressValue}>{reviewPercent}% • {activeLevelReviewCount}/{activeLevelWords.length} 词 / words</Text>
      </SectionCard>

      <SectionCard>
        <Text style={styles.sectionTitle}>已保存词语 / Saved words</Text>
        {favoriteWords.length === 0 ? (
          <Text style={styles.bodyText}>还没有保存的词语 / No saved words yet.</Text>
        ) : (
          favoriteWords.map((word) => (
            <View key={word.id} style={styles.listRow}>
              <Text style={styles.listPrimary}>{word.hanzi}</Text>
              <Text style={styles.listSecondary}>{word.meaningEn ?? word.meaningVi}</Text>
            </View>
          ))
        )}
      </SectionCard>

      <SectionCard>
        <Text style={styles.sectionTitle}>复习列表 / Review list</Text>
        {reviewWords.length === 0 ? (
          <Text style={styles.bodyText}>做得很好，目前没有需要复习的词 / Great work. No review words right now.</Text>
        ) : (
          reviewWords.map((word) => (
            <View key={word.id} style={styles.listRow}>
              <Text style={styles.listPrimary}>{word.hanzi}</Text>
              <Text style={styles.listSecondary}>{word.pinyin} • {word.meaningEn ?? word.meaningVi}</Text>
            </View>
          ))
        )}
      </SectionCard>

      <SectionCard>
        <Text style={styles.sectionTitle}>测验统计 / Quiz Stats</Text>
        <Text style={styles.bodyText}>本次已答题数 / Questions answered this session: {completedQuestionIds.length}</Text>
        <Text style={styles.bodyText}>本次答对题数 / Correct answers this session: {quizCorrectCount}</Text>
        <Text style={styles.bodyText}>当前正确率 / Current accuracy: {sessionAccuracy}%</Text>
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
            <Text style={styles.topBarSubtitle}>中文词汇学习应用 / Chinese vocabulary learning app</Text>
          </View>
          <View style={styles.streakBadge}>
            <Text style={styles.streakBadgeText}>{`连续 ${currentStreak} 天 / Streak ${currentStreak}`}</Text>
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
  hskPillDisabled: {
    opacity: 0.45,
  },
  hskPillText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#854F0B',
  },
  hskPillTextActive: {
    color: '#FFFFFF',
  },
  hskPillTextDisabled: {
    color: '#8F867D',
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
  flashExampleLabel: {
    fontSize: 10,
    color: '#B1A79A',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
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
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#A33226',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderRadius: 14,
    paddingVertical: 6,
  },
  tabButtonActive: {
    backgroundColor: 'transparent',
  },
  tabIcon: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.55)',
  },
  tabIconActive: {
    color: '#FFFFFF',
  },
  tabLabel: {
    fontSize: 9,
    lineHeight: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.55)',
    textAlign: 'center',
  },
  tabLabelActive: {
    color: '#FFFFFF',
  },
});
