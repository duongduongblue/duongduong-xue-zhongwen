# DuongDuong 学中文 — Vocabulary Dataset Schema

_Last updated: 2026-05-07_

## 1. Purpose
This document defines the canonical vocabulary data schema for **DuongDuong 学中文**.

It should be used as the source of truth before:
- generating HSK1–HSK5 content
- importing CSV/JSON into the app
- building review logic
- building quiz types
- expanding from HSK1 to HSK5

---

## 2. Design goals
The schema must:
1. support HSK1–HSK5
2. support both beginner learning and advanced review
3. support Vietnamese learners as the primary explanation audience
4. support flashcards, quiz, review, reading, and HSK5 nuance later
5. remain simple enough for JSON/CSV workflows

---

## 3. Core entity layers
The content model should be separated into 4 layers:

### A. Level
Defines the HSK level.

### B. Module / Lesson
Defines curriculum structure and learning order.

### C. Word
Defines vocabulary item data.

### D. Progress / Review
Defines user interaction and memory status.

---

## 4. Level schema
```ts
type HSKLevel = {
  id: 'HSK1' | 'HSK2' | 'HSK3' | 'HSK4' | 'HSK5';
  displayName: string;            // HSK 1
  targetWordCount: number;        // 300 / 500 / 1000 / 2000 / 3600
  cefrApprox?: string;            // A1, A2, B1, B2
  available: boolean;             // currently released or not
  description?: string;
};
```

---

## 5. Module schema
```ts
type Module = {
  id: string;                     // hsk1-module-1
  levelId: string;                // HSK1
  title: string;                  // Survival Basics
  subtitle: string;               // 基础生存
  order: number;
  description?: string;
};
```

---

## 6. Lesson schema
```ts
type Lesson = {
  id: string;                     // HSK1-M1-L1
  levelId: string;                // HSK1
  moduleId: string;               // hsk1-module-1
  title: string;                  // Chào hỏi / 问候
  topic: string;                  // Chào hỏi cơ bản / 问候语
  color?: string;
  order?: number;
  goal?: string;
  targetWordCount?: number;
  grammarFocus?: string[];
  quizFocus?: string[];
  tags?: string[];
};
```

---

## 7. Word schema — minimum version
This is the minimum viable schema for HSK1–HSK2 starter content.

```ts
type VocabWord = {
  id: string;
  level: 'HSK1' | 'HSK2' | 'HSK3' | 'HSK4' | 'HSK5';
  moduleId: string;
  lessonId: string;
  hanzi: string;
  pinyin: string;
  meaning_vi: string;
  meaning_en: string;
  part_of_speech?: string;
  example_cn?: string;
  example_translation?: string;
  tags?: string[];
  difficulty_order?: number;
  frequency_band?: 'high' | 'medium' | 'low';
};
```

---

## 8. Word schema — recommended full version
This is the recommended long-term schema for HSK1–HSK5, especially useful for HSK4–HSK5.

```ts
type RichVocabWord = {
  id: string;
  level: 'HSK1' | 'HSK2' | 'HSK3' | 'HSK4' | 'HSK5';
  moduleId: string;
  lessonId: string;

  hanzi: string;
  traditional?: string;
  pinyin: string;

  meaning_vi: string;
  meaning_en?: string;
  part_of_speech?: string;

  topic_tags?: string[];
  exam_tags?: string[];
  register?: 'spoken' | 'neutral' | 'formal' | 'written';
  difficulty?: 1 | 2 | 3 | 4 | 5;
  frequency_rank?: number;
  frequency_band?: 'high' | 'medium' | 'low';

  grammar_pattern?: string;
  collocations?: string[];
  antonyms?: string[];

  near_synonyms?: Array<{
    word: string;
    difference_vi: string;
  }>;

  example_sentences?: Array<{
    zh: string;
    pinyin?: string;
    vi: string;
    context?: string;
    level?: string;
  }>;

  common_mistakes_vi?: string[];

  review_prompts?: Array<{
    type: 'meaning' | 'pinyin' | 'recognition' | 'cloze' | 'synonym' | 'reading';
    prompt: string;
    answer: string;
  }>;

  source_note?: string;
};
```

---

## 9. Progress schema
```ts
type WordProgress = {
  word_id: string;
  status: 'new' | 'learning' | 'review' | 'mastered' | 'weak';
  correct_count: number;
  wrong_count: number;
  last_reviewed_at?: string;
  next_review_at?: string;
  bookmarked: boolean;
};
```

---

## 10. Lesson progress schema
```ts
type LessonProgress = {
  lesson_id: string;
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  learned_word_count: number;
  review_due_count: number;
  quiz_best_score?: number;
  last_studied_at?: string;
};
```

---

## 11. Tracking schema
```ts
type StudyTracking = {
  startedAt?: string;
  lastStudyAt?: string;
  studyDates: string[];           // YYYY-MM-DD entries
  totalStudyDays?: number;
  currentStreak?: number;
};
```

---

## 12. CSV column recommendation
For practical editing in Sheets / Excel, use this flat structure:

```csv
id,level,moduleId,lessonId,hanzi,traditional,pinyin,meaning_vi,meaning_en,part_of_speech,topic_tags,exam_tags,register,difficulty,frequency_rank,frequency_band,grammar_pattern,collocations,near_synonyms,example_cn,example_translation,common_mistakes_vi,source_note
```

### Field formatting rules
- `topic_tags`: pipe-separated, e.g. `greeting|polite|beginner`
- `exam_tags`: pipe-separated
- `collocations`: pipe-separated
- `near_synonyms`: text note or JSON string if needed
- `common_mistakes_vi`: pipe-separated

---

## 13. Required vs optional fields

### Required for all levels
- id
- level
- moduleId
- lessonId
- hanzi
- pinyin
- meaning_vi

### Strongly recommended for all levels
- meaning_en
- part_of_speech
- example_cn
- example_translation
- tags / topic_tags
- difficulty_order or difficulty

### Especially recommended for HSK4–HSK5
- collocations
- near_synonyms
- grammar_pattern
- register
- common_mistakes_vi
- review_prompts

---

## 14. Quality rules

### Pinyin
- always use tone marks
- do not mix tone numbers and tone marks

### Meanings
- keep concise
- prioritize beginner-usable meaning first
- avoid dictionary overload in one line

### Examples
- short and level-appropriate
- natural Chinese first
- Vietnamese translation should be learner-friendly, not machine-like

### Tags
- 2–5 tags per word is enough
- do not overload tags
- tags are for internal filtering, not always user-facing

---

## 15. Product rule
> Data structure and learning structure must remain separate.

That means:
- tags like `verb`, `adjective`, `modal`, `pronoun` should remain internal metadata
- lesson pills should reflect learning themes and use cases, not raw data taxonomy

---

## 16. Suggested next files
After this schema, the next useful files are:
1. `multi-level-content-architecture.md`
2. `hsk5-focus-mode-spec.md`
3. `review-system-spec.md`
4. `quiz-engine-spec.md`
5. `content-qa-checklist.md`
