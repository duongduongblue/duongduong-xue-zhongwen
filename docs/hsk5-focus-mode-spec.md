# DuongDuong 学中文 — HSK5 Focus Mode Spec

_Last updated: 2026-05-07_

## 1. Purpose
HSK5 Focus Mode is designed for learners who are already around HSK5 level and do not want to restart the app from the very beginning.

This mode should allow the user to:
- review HSK5 vocabulary directly
- identify weak HSK5 words
- revisit HSK3–HSK4 support words only when needed
- train for exam-style comprehension and precision

---

## 2. Why this mode matters
The app may support HSK1–HSK5 as a roadmap, but the current learner may already be HSK5.

Without HSK5 Focus Mode, the app risks becoming:
- too slow
- too beginner-heavy
- not useful for the current owner/user

HSK5 Focus Mode solves this by giving immediate value.

---

## 3. Main user goals
A user in HSK5 Focus Mode wants to:
1. review important HSK5 vocabulary quickly
2. fix weak points before exam or reading tasks
3. train collocation, nuance, and synonym distinction
4. read short exam-like passages
5. avoid wasting time on over-basic material unless needed

---

## 4. Entry points
HSK5 Focus Mode can start from:
- Home screen quick action
- Level selector → HSK5
- Progress screen → weak HSK5 words
- Quiz → HSK5 exam practice

---

## 5. Core flows
### A. HSK5 Daily Review
- show due HSK5 words
- prioritize weak words first
- allow review by flashcard

### B. HSK5 Weak Word Repair
- filter words with high wrong_count
- show grouped review set
- allow re-quiz on weak words only

### C. HSK5 Precision Training
- collocations
- near-synonym distinction
- formal vs neutral usage
- sentence meaning in context

### D. HSK5 Reading Practice
- 80–150 character mini passages
- 2–3 questions per passage
- vocabulary linked back to words in the bank

---

## 6. Data requirements
HSK5 words should support richer metadata than HSK1.

Required recommended fields:
- hanzi
- pinyin
- meaning_vi
- meaning_en
- part_of_speech
- topic_tags
- exam_tags
- register
- collocations
- near_synonyms
- example_sentences
- common_mistakes_vi
- review_prompts

---

## 7. Recommended HSK5 content priorities
### Batch 1 — Core HSK5 priority words
- 100 words
- exam useful
- common in reading
- useful in formal explanation

### Batch 2 — Precision layer
- collocation-heavy words
- near-synonym clusters
- register-sensitive words

### Batch 3 — Reading layer
- article vocabulary
- abstract topic vocabulary
- social / media / work / values topics

---

## 8. Quiz types for HSK5 Focus Mode
1. Meaning recall
2. Pinyin recall
3. Fill in the blank
4. Synonym distinction
5. Collocation matching
6. Register choice
7. Reading mini passage

---

## 9. UI behavior
### Home
If HSK5 Focus Mode is active, Home should show:
- HSK5 current level
- weak HSK5 words
- due HSK5 reviews
- direct CTA to HSK5 review

### Learn
HSK5 lessons should be grouped by practical themes, not grammar labels only.

### Quiz
Allow quick mode:
- HSK5 words only
- weak words only
- reading practice only

---

## 10. Review priority logic
Suggested order:
1. weak HSK5 words
2. due HSK5 words
3. recent wrong quiz items
4. support words from HSK3–HSK4 if repeated failure indicates gap

---

## 11. Product rule
HSK5 Focus Mode should not force the learner to go through all HSK1–HSK4 content linearly.

It should:
- respect the learner's current level
- target weak points
- remain compatible with full-level roadmap

---

## 12. Suggested future files
After this spec, the next useful docs are:
1. `hsk5-priority-word-batch-plan.md`
2. `hsk5-build-ready-lesson-list.md`
3. `review-system-spec.md`
4. `quiz-engine-spec.md`
