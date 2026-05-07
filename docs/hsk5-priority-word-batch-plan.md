# DuongDuong 学中文 — HSK5 Priority Word Batch Plan

_Last updated: 2026-05-07_

## 1. Purpose
This document defines how HSK5 vocabulary should be prioritized for **DuongDuong 学中文**.

The goal is not to dump all HSK5 words at once.
The goal is to choose the **highest-value HSK5 words first** so the app becomes useful sooner for an HSK5 learner.

---

## 2. Strategy
Instead of doing:
- full HSK1 → full HSK2 → full HSK3 → full HSK4 → full HSK5 linearly

Vesper recommends:
- keep HSK1 as the released structured foundation
- build a focused HSK5 layer early
- use HSK5 as the first advanced-use case for the current learner

---

## 3. Priority batches

## Batch 1 — HSK5 Core Review Set
### Size
100 words

### Goal
Create the first usable HSK5 review mode for the current learner.

### Selection rules
Choose words that are:
- common in advanced reading
- common in exam prep
- useful in formal discussion
- useful across many topics
- not too obscure

### Include fields
- meaning_vi
- pinyin
- example sentence
- collocation
- near synonym if useful
- exam_tags

### Expected result
A usable HSK5 Focus Mode can start from this batch.

---

## Batch 2 — HSK5 Precision Set
### Size
150–200 words

### Goal
Train nuance and accuracy.

### Selection rules
Choose words that are:
- easily confused with near-synonyms
- often used in formal writing
- important in collocation-heavy usage
- useful for cloze and synonym distinction quizzes

### Strong metadata needed
- collocations
- near_synonyms
- register
- common_mistakes_vi

### Expected result
This batch powers higher-quality HSK5 quiz and review.

---

## Batch 3 — HSK5 Reading Set
### Size
200–300 words

### Goal
Support reading comprehension and article-like text.

### Selection rules
Choose words common in:
- society
- economy
- culture
- education
- technology
- workplace
- psychology / relationships

### Expected result
This batch supports reading mini passages and article-based practice.

---

## Batch 4 — HSK5 Breadth Expansion
### Size
Remaining HSK5 words after the first 3 batches

### Goal
Expand the level toward fuller HSK5 coverage.

### Notes
Do this only after:
- batch 1–3 are clean
- HSK5 Focus Mode is usable
- quiz system supports nuance better

---

## 4. Topic priorities for HSK5
These are the most useful topic buckets to prioritize first.

### Tier 1 — Highest priority
- society / social issues
- work / decision making
- education / learning
- formal communication
- abstract feelings / psychology
- media / commentary

### Tier 2 — Strong priority
- technology
- lifestyle
- growth / success / failure
- relationships / human nature
- values / responsibility

### Tier 3 — Later
- highly literary words
- niche cultural expressions
- lower-frequency formal vocabulary with weak reuse value

---

## 5. Selection checklist for each HSK5 word
A word should enter Batch 1 if most of these are true:
- [ ] appears useful for advanced learner review now
- [ ] appears in reading or formal communication often enough
- [ ] supports multiple contexts
- [ ] has clear example sentence potential
- [ ] has useful collocation potential
- [ ] is not overly obscure

A word should move to Batch 2 if:
- [ ] synonym nuance matters
- [ ] register matters
- [ ] collocation matters
- [ ] learner may know the rough meaning but still misuse it

A word should move to Batch 3 if:
- [ ] it is especially useful in short articles / reading passages
- [ ] its value is higher in context than in isolated recall

---

## 6. HSK5 content minimum quality rule
Do not accept a HSK5 word into production if it only has:
- hanzi
- pinyin
- one-line translation

At minimum, HSK5 priority words should have:
- meaning_vi
- example sentence
- at least 2–3 collocations if relevant
- a note on usage or near-synonym when needed

---

## 7. Recommended HSK5 quiz use by batch
### Batch 1
- meaning recall
- pinyin recall
- simple cloze

### Batch 2
- collocation matching
- synonym distinction
- register choice

### Batch 3
- reading mini passage
- sentence interpretation
- vocabulary in article context

---

## 8. Recommended operational workflow
### Step 1
Define Batch 1 list of 100 words.

### Step 2
Generate / clean full metadata for those 100 words.

### Step 3
Load into HSK5 Focus Mode.

### Step 4
Use review + quiz results to detect which word types are most useful.

### Step 5
Only then expand Batch 2.

---

## 9. Recommended next file
After this plan, the next most useful file is:
- `hsk5-build-ready-lesson-list.md`

Because once the word batches are prioritized, they need to be organized into learner-facing lessons or review packs.

---

## 10. Product note
HSK5 content is not just “more difficult words.”
It should feel like:
- better precision
- better reading support
- better exam usefulness
- better real-world advanced Chinese usage

That is why batching and prioritization matter.
