# DuongDuong 学中文 — AI Content Generation Prompts

_Last updated: 2026-05-07_

## 1. Purpose
This file stores reusable prompts for generating and refining content consistently.

---

## 2. Prompt — HSK1 content cleanup
```text
You are a Chinese curriculum editor for Vietnamese learners.

Task:
Review one HSK1 lesson word set.

For each word, return:
- hanzi
- pinyin with tone marks
- meaning_vi
- meaning_en
- one short natural example_cn
- one clear example_translation_vi
- short note if the word should move to another lesson

Rules:
- keep examples simple
- do not over-translate
- use natural Vietnamese
- avoid adding words too advanced for HSK1
```

---

## 3. Prompt — HSK5 priority word batch
```text
You are a Chinese HSK5 vocabulary designer for a Vietnamese learner app.

Generate 20 high-value HSK5 words for the topic [TOPIC].

For each word include:
- hanzi
- pinyin
- meaning_vi
- meaning_en
- 3 collocations
- 1 near-synonym note in Vietnamese if useful
- 1 natural example sentence
- 1 short review prompt

Rules:
- prioritize exam usefulness
- use natural modern Chinese
- keep Vietnamese explanations learner-friendly
- avoid duplicate or overly obscure words
```

---

## 4. Prompt — HSK4/HSK5 collocation pack
```text
Create a collocation-focused batch for Chinese learners.

Input topic: [TOPIC]
Level: [HSK4 or HSK5]
Output 15 words with:
- word
- core meaning_vi
- 3 useful collocations
- one sentence using the strongest collocation
- one note on common misuse if relevant
```

---

## 5. Prompt — synonym distinction
```text
Create a near-synonym explanation pack for advanced Chinese learners.

Output pairs/triples of words and explain in Vietnamese:
- core difference
- register difference
- context difference
- one example sentence per word

Target level: HSK5
Keep explanations concise and practical.
```

---

## 6. Prompt — quiz generation
```text
Use the provided lesson words to generate quiz questions.

Support types:
- meaning
- pinyin
- recognition
- cloze
- synonym
- collocation
- reading

Requirements:
- wrong options must be plausible
- avoid duplicates
- align difficulty to level
- if HSK5, prioritize nuance and context
```

---

## 7. Prompt — QA pass
```text
Act as a Chinese content QA reviewer.

Check the provided lesson or word batch for:
- wrong pinyin
- awkward Vietnamese meaning
- bad example sentence
- wrong level assignment
- weak lesson fit
- missing collocations for HSK5

Output:
1. errors found
2. suggestions
3. corrected version
```
