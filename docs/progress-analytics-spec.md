# DuongDuong 学中文 — Progress & Analytics Spec

_Last updated: 2026-06-16_

## 1. Mục tiêu
Progress không chỉ là số từ đã học.
App cần cho user thấy:
- mình học bao lâu
- mình học được gì
- mình đang mạnh/yếu ở đâu
- mình đang tiến bộ hay chững lại

---

## 2. Progress principles
### A. Time + Output
Không chỉ đo:
- time spent

Mà cần đo cả:
- words learned
- words reviewed
- quiz accuracy
- weak words improved

### B. Level-aware
Progress nên xem được theo:
- toàn app
- từng HSK level
- từng module / lesson
- HSK5 Focus mode

### C. Simplicity first
MVP analytics phải dễ hiểu, không dashboard quá rối.

---

## 3. Core metrics
### 3.1 Learning volume
- total words learned
- total words reviewed
- total saved words
- total study days

### 3.2 Time metrics
- today study time
- this week study time
- average session time
- total study time

### 3.3 Accuracy metrics
- current quiz accuracy
- best quiz accuracy by lesson
- HSK5 Focus accuracy

### 3.4 Recovery metrics
- weak words count
- weak words recovered this week
- overdue review count

### 3.5 Level progress
- HSK1 progress
- HSK5 Focus progress
- roadmap availability state

---

## 4. MVP home metrics
Recommended Home stats:
1. Level
2. Learned
3. Review
4. Accuracy

Recommended Home secondary metrics:
- Today: 22 min
- This week: 2h 40m
- Started on 07 May 2026

---

## 5. Progress screen structure
### Section 1 — Identity / current level
- active level
- streak
- started tracking date
- last study date

### Section 2 — Key stats
- learned
- review
- accuracy
- saved words
- study days

### Section 3 — Study time
- today
- this week
- total time
- average session

### Section 4 — Heatmap / consistency
- study days heatmap
- weekly consistency

### Section 5 — Review quality
- weak words
- overdue reviews
- recovered words

### Section 6 — HSK5 Focus metrics
- HSK5 focus sessions
- HSK5 review time
- HSK5 weak words
- HSK5 quiz accuracy

---

## 6. Suggested data sources
Progress screen should derive from:
- `studySessions`
- `dailyStudyStats`
- `studyTrackingSummary`
- `word progress`
- `lesson progress`

---

## 7. Useful formulas
### Learned by level
Count words where:
- `word.level === selectedLevel`
- and word status != `new`

### Review by level
Count words where:
- `next_review_at <= now`
- within selected level

### Accuracy
Use recent session or recent quiz result set.

### Study days
Use unique dates from `studySessions` or `studyDates`.

---

## 8. HSK5-specific analytics
For HSK5 Focus Mode, show:
- HSK5 words reviewed this week
- HSK5 weak words count
- HSK5 collocation-heavy words reviewed
- HSK5 accuracy by quiz type later

This is important because the current learner is HSK5.

---

## 9. UI copy recommendation
### English system labels
- Level
- Learned
- Review
- Accuracy
- Study Time
- This Week
- Today
- Saved Words
- Quiz Stats
- HSK5 Focus

### Vietnamese support text
- Hôm nay học bao lâu
- Ôn lại bao nhiêu từ
- Mức độ đều đặn tuần này
- Từ yếu cần quay lại

---

## 10. MVP implementation order
### Step 1
Show current level + learned/review/accuracy

### Step 2
Add started / last study date

### Step 3
Add today / week time

### Step 4
Add saved words and weak word count

### Step 5
Add HSK5 Focus-specific cards

### Step 6
Add chart/heatmap refinements later

---

## 11. Avoid these mistakes
- too many tiny stats at once
- duplicate metrics in multiple sections
- mixing HSK1 and HSK5 numbers without clear level context
- tracking time but not tracking outcomes

---

## 12. Success criteria
Progress analytics is good enough for beta when:
- user knows current level progress
- user knows what to review next
- user knows how much they studied today/this week
- user can see HSK5 review value clearly

---

## 13. Suggested next files
After this doc, useful next specs are:
1. `hsk5-focus-ui-flow.md`
2. `level-roadmap-availability-spec.md`
3. `weak-words-priority-spec.md`
