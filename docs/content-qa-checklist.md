# DuongDuong 学中文 — Content QA Checklist

_Last updated: 2026-05-07_

## 1. Purpose
This checklist is used to review vocabulary content before it is considered ready for:
- lesson use
- flashcard review
- quiz generation
- public beta release

It should apply to HSK1–HSK5, with stricter checks for HSK4–HSK5.

---

## 2. Core QA categories
Content should be checked in 5 layers:
1. structural correctness
2. pinyin and language accuracy
3. lesson fit
4. learning usefulness
5. exam/review readiness

---

## 3. Structural correctness checklist
For every word entry, confirm:
- [ ] `id` exists
- [ ] `level` exists and is valid
- [ ] `moduleId` exists
- [ ] `lessonId` exists
- [ ] `hanzi` exists
- [ ] `pinyin` exists
- [ ] `meaning_vi` exists
- [ ] no obvious duplicate `id`
- [ ] no accidental duplicate `hanzi` within the same intended entry set
- [ ] no missing lesson mapping
- [ ] no word assigned to the wrong level by mistake

---

## 4. Pinyin and language accuracy checklist
For every word entry, confirm:
- [ ] pinyin uses tone marks consistently
- [ ] pinyin spelling is correct
- [ ] tone marks match the intended word
- [ ] meaning_vi is natural Vietnamese
- [ ] meaning_en is usable and not awkward machine translation
- [ ] part_of_speech is reasonable if included

### Reject if
- pinyin is missing
- pinyin mixes tone numbers and tone marks inconsistently
- Vietnamese meaning is confusing or overly literal

---

## 5. Example sentence checklist
For every example, confirm:
- [ ] example_cn exists when required by the level/content goal
- [ ] example sentence is natural Chinese
- [ ] example fits the learner's level
- [ ] example_translation is understandable in Vietnamese
- [ ] the example actually matches the target word meaning
- [ ] sentence is not unnecessarily literary for HSK1–HSK2

### Stronger rule for HSK1–HSK2
- keep examples short
- keep syntax simple
- avoid extra difficult words unless necessary

### Stronger rule for HSK4–HSK5
- examples should show real context
- examples should help with nuance, collocation, or register

---

## 6. Lesson fit checklist
For every lesson, confirm:
- [ ] each word fits the lesson theme
- [ ] the lesson has a clear use case
- [ ] the lesson is not secretly just a part-of-speech dump
- [ ] the lesson does not mix unrelated contexts too much
- [ ] the lesson feels teachable as one coherent block

### Warning signs
- too many unrelated words in one lesson
- words grouped only because of backend tags
- lesson title says one thing but words teach another

---

## 7. Difficulty progression checklist
For each level and lesson sequence, confirm:
- [ ] easier / more frequent words come first
- [ ] concrete vocabulary appears before abstract vocabulary
- [ ] short useful expressions appear before nuanced formal expressions
- [ ] HSK1–HSK2 stay practical and close to daily life
- [ ] HSK4–HSK5 introduce nuance gradually, not randomly

### Reject if
- advanced word appears too early with no reason
- simple lesson contains words far above intended level

---

## 8. Learning usefulness checklist
For every word, ask:
- [ ] is this worth learning at this level?
- [ ] will the learner likely meet or use this soon?
- [ ] does this word help communication, reading, or exam readiness?
- [ ] does it strengthen the lesson goal?

### For HSK1–HSK2
Usefulness means:
- daily conversations
- school / family / food / time / movement / shopping

### For HSK4–HSK5
Usefulness means:
- work and social discussion
- reading comprehension
- collocation precision
- exam usefulness
- abstract topic support

---

## 9. Tag quality checklist
If using tags:
- [ ] tags are relevant
- [ ] tags are not overloaded
- [ ] tags support filtering/search/quiz logic
- [ ] tags are not replacing proper lesson design

Recommended range:
- 2 to 5 tags per word

---

## 10. HSK5-specific quality checklist
For HSK5 words, strongly recommend checking:
- [ ] collocations included where useful
- [ ] near-synonym note included where useful
- [ ] register/formality note included where useful
- [ ] example sentence shows nuance or real context
- [ ] exam_tags support quiz generation
- [ ] word is genuinely relevant to advanced learners

### Reject if
- HSK5 word is presented only as surface translation
- no context is given for subtle or formal words

---

## 11. Quiz readiness checklist
For words used in quizzes, confirm:
- [ ] enough plausible distractors exist
- [ ] pinyin is stable enough for pinyin quiz
- [ ] meaning is specific enough for recognition quiz
- [ ] sentence context is strong enough for cloze quiz
- [ ] HSK5 words with nuance have explanation support

---

## 12. Review readiness checklist
Before adding a word to review system:
- [ ] word has enough meaning clarity
- [ ] user can actually recognize it again later
- [ ] the word is not too vague without context
- [ ] repeated review would be meaningful, not confusing

---

## 13. Lesson-level QA pass criteria
A lesson is ready when:
- [ ] title matches its content
- [ ] word count is reasonable
- [ ] no obvious content mismatch
- [ ] examples are level-appropriate
- [ ] quiz can be generated meaningfully
- [ ] review of that lesson will feel coherent

---

## 14. Release-level QA pass criteria
A level batch is ready for beta when:
- [ ] no obvious pinyin errors remain
- [ ] no obvious translation errors remain
- [ ] lesson mapping is stable
- [ ] content order feels sensible
- [ ] quiz can be generated without nonsense options
- [ ] no placeholder fields remain in the release set

---

## 15. Practical workflow recommendation
### Pass 1 — structure
Check ids, level, module, lesson, duplicates.

### Pass 2 — language accuracy
Check pinyin, meanings, examples.

### Pass 3 — lesson fit
Check whether each word truly belongs in the lesson.

### Pass 4 — product usability
Check whether the learner would benefit from reviewing this word in this lesson.

### Pass 5 — exam/readiness layer
Apply stronger checks for HSK4–HSK5.

---

## 16. Suggested next docs
After this checklist, the next useful files are:
1. `hsk5-priority-word-batch-plan.md`
2. `hsk5-build-ready-lesson-list.md`
3. `ai-content-generation-prompts.md`
