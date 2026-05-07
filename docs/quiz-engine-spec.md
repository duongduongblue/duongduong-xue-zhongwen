# DuongDuong 学中文 — Quiz Engine Spec

_Last updated: 2026-05-07_

## 1. Purpose
This document defines the quiz engine for DuongDuong 学中文.

The quiz system should support:
- HSK1–HSK5
- lesson-based practice
- review-based practice
- weak-word repair
- HSK5 focus mode
- progression from simple recall to nuanced exam-oriented usage

---

## 2. Main goals
The quiz engine should help users:
1. test recognition and recall
2. reinforce lesson content
3. expose weak words quickly
4. support exam-like practice at higher levels
5. stay modular enough to expand by level

---

## 3. Quiz generation principles
### A. Quiz must follow level difficulty
HSK1 quiz should not feel like HSK5.

### B. Distractors must be plausible
Wrong options should be believable, not random noise.

### C. Quiz should connect to content structure
Quiz source should be filterable by:
- lesson
- module
- level
- weak words
- bookmarked words

### D. HSK5 needs nuance-based testing
At higher levels, meaning recall alone is not enough.

---

## 4. Core quiz sources
The engine should support the following quiz sources:

### 1. Current lesson
Only words from selected lesson.

### 2. Current module
Words from the selected module.

### 3. Current level
Words from current HSK level.

### 4. Weak words
Words with repeated mistakes.

### 5. Bookmarked words
Saved words only.

### 6. Mixed review
A mixed set chosen from due review content.

---

## 5. Quiz types by level

## 5.1 HSK1
Recommended quiz types:
1. Meaning multiple choice
2. Pinyin recognition
3. Hanzi recognition
4. Simple fill-in blank

### Example
**Type:** meaning
- prompt: `"你好" means?`
- options: hello / goodbye / teacher / family

**Type:** pinyin
- prompt: `Pinyin for "谢谢"`
- options: xièxie / zàijiàn / qǐng / shénme

**Type:** recognition
- prompt: `Which word means "xin chào"?`
- options: 你好 / 谢谢 / 再见 / 请

---

## 5.2 HSK2
Recommended quiz types:
1. Meaning multiple choice
2. Pinyin recall
3. Recognition in sentence
4. Fill-in blank
5. Simple comparison / daily use questions

---

## 5.3 HSK3
Recommended quiz types:
1. Meaning recall
2. Pinyin recall
3. Fill-in blank
4. Sentence meaning
5. Practical dialogue completion
6. Simple context reading

---

## 5.4 HSK4
Recommended quiz types:
1. Meaning and pinyin recall
2. Fill-in blank with near distractors
3. Collocation matching
4. Synonym distinction
5. Sentence choice in context
6. Short reading comprehension

---

## 5.5 HSK5
Recommended quiz types:
1. Meaning recall
2. Fill-in blank with nuanced distractors
3. Synonym distinction
4. Collocation matching
5. Register choice
6. Sentence meaning
7. Reading mini passage
8. Article-style vocabulary in context

---

## 6. Quiz question schema
```ts
type QuizQuestion = {
  id: string;
  type: 'meaning' | 'pinyin' | 'recognition' | 'cloze' | 'collocation' | 'synonym' | 'register' | 'reading';
  sourceLevel: string;
  sourceLessonId?: string;
  sourceWordId?: string;
  prompt: string;
  supportingText?: string;
  correctAnswer: string;
  options?: string[];
  explanation?: string;
};
```

---

## 7. Distractor design rules
### Meaning quiz
Wrong options should come from:
- same level
- semantically nearby words
- commonly confused beginner words

### Pinyin quiz
Wrong options should be:
- visually or phonetically plausible
- same level preferred

### Recognition quiz
Wrong Hanzi should:
- be same level
- not be obviously unrelated

### Cloze quiz
Wrong options should:
- fit sentence length/grammar roughly
- differ in meaning or usage

### Synonym quiz
Wrong options should:
- be close enough to require thinking
- not be random easy rejects

---

## 8. HSK5-specific precision rules
For HSK5, quizzes should increasingly rely on:
- collocation
- near-synonym distinction
- formality / register
- reading context
- subtle usage differences

A correct HSK5 quiz engine must not rely only on surface translation.

---

## 9. Reading mini passage mode
Recommended for HSK4–HSK5.

### Passage length
- HSK4: 60–100 chars
- HSK5: 80–150 chars

### Question count
- 2–3 per passage

### Question focus
- meaning in context
- inference
- correct word usage
- main idea

---

## 10. Quiz result behavior
After each quiz session, the app should show:
- total questions
- correct answers
- accuracy
- words answered incorrectly
- CTA to review wrong words

### Recommended CTA
- Review Wrong Words
- Retry This Lesson
- Continue Learning

---

## 11. Quiz and review integration
The quiz engine must feed the review system.

### When user gets a word wrong
- increment `wrong_count`
- mark for closer review
- push into weak queue if repeated

### When user gets a word right
- increment `correct_count`
- extend review interval gradually

---

## 12. Suggested MVP implementation
For current MVP, the best practical order is:

### Step 1
Keep these quiz types working well:
- meaning
- pinyin
- recognition
- simple cloze

### Step 2
Add later:
- collocation
- synonym
- sentence meaning

### Step 3
Add HSK4–HSK5 reading mode later

This keeps complexity under control.

---

## 13. UI behavior recommendations
### Quiz header
Should show:
- lesson title
- question number
- timer (optional)

### Options
Should be:
- easy to tap
- visually distinct by state
- not overcrowded

### Feedback
Keep short:
- `Correct — keep going.`
- `Answer: 安排`

### Result screen
Must feel useful, not decorative.

---

## 14. HSK5 Focus Mode quiz recommendations
When HSK5 Focus Mode is active, prioritize:
1. weak HSK5 words
2. collocation quiz
3. synonym quiz
4. register quiz
5. reading mini passage

---

## 15. Suggested next docs
After this quiz spec, the best next docs are:
1. `content-qa-checklist.md`
2. `hsk5-priority-word-batch-plan.md`
3. `hsk5-build-ready-lesson-list.md`
4. `ai-content-generation-prompts.md`
