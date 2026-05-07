# DuongDuong 学中文 — Review System Spec

_Last updated: 2026-05-07_

## 1. Purpose
This document defines the review system for DuongDuong 学中文.

The review system should:
- support HSK1–HSK5
- work for new learners and advanced review users
- prioritize weak words
- remain simple enough for a personal product MVP

---

## 2. Review goals
The system should help users:
1. retain vocabulary over time
2. return to weak words sooner
3. review by lesson / level / mode
4. support HSK5 focus review later

---

## 3. Word status model
Recommended statuses:
- `new`
- `learning`
- `review`
- `mastered`
- `weak`

### Definitions
#### new
Never meaningfully reviewed yet.

#### learning
Seen before but not stable.

#### review
Should come back on a spaced basis.

#### mastered
Repeatedly answered correctly.

#### weak
Wrong often enough to deserve priority review.

---

## 4. Minimum progress fields
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

## 5. Suggested simple review timing
### If correct
- 1st correct → next day
- 2nd correct → +3 days
- 3rd correct → +7 days
- 4th correct → +14 days
- 5th correct → +30 days

### If wrong
- review again same day
- next review should move much closer
- if repeated wrong_count is high → mark as `weak`

---

## 6. Status transition rules
### new → learning
When user sees and studies the word for the first time.

### learning → review
When user gets enough early correct answers.

### review → mastered
When user consistently answers correctly across spaced reviews.

### any status → weak
When wrong_count rises above threshold or repeated failures continue.

### weak → review
When user starts recovering and answers correctly again over multiple attempts.

---

## 7. Suggested thresholds
These can be adjusted later.

### weak threshold
- wrong_count >= 3
or
- wrong ratio high across recent attempts

### mastered threshold
- correct_count >= 5
and
- no recent repeated mistakes

---

## 8. Review queues
The app should be able to generate:

### A. Due Today
Words where `next_review_at <= now`

### B. Weak Words
Words with status `weak`

### C. Lesson Review
Words from current lesson only

### D. Level Review
Words from selected HSK level only

### E. Saved Review
Bookmarked words only

---

## 9. Home screen review priorities
Suggested order on Home:
1. weak words count
2. due review count
3. current lesson continuation
4. quick action to review

---

## 10. HSK5 review rule
For HSK5 Focus Mode, review should prioritize:
1. weak HSK5 words
2. due HSK5 words
3. recent wrong quiz items
4. fallback support words from HSK3–HSK4 only when needed

---

## 11. Session tracking
The review system should also connect to tracking fields:
- `studyDates`
- `startedAt`
- `lastStudyAt`

This allows:
- streak
- started tracking date
- last study date
- study days count

---

## 12. MVP recommendation
For MVP, keep the algorithm simple and understandable.

Use:
- correct_count
- wrong_count
- next_review_at
- weak flag logic

Avoid overbuilding SM-2 or complex memory science too early.

---

## 13. Future upgrades
Later, the review system can add:
- per-skill scoring (meaning / pinyin / recognition / usage)
- confidence input
- reading-linked review
- HSK5 precision review
- review analytics dashboard

---

## 14. Suggested next docs
After this spec, the next useful files are:
1. `quiz-engine-spec.md`
2. `content-qa-checklist.md`
3. `hsk5-priority-word-batch-plan.md`
4. `hsk5-build-ready-lesson-list.md`
