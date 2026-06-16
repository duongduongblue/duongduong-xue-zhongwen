# DuongDuong 学中文 — Study Time Tracking Spec

_Last updated: 2026-06-16_

## 1. Mục tiêu
Track **thời gian học thật** của người dùng theo cách practical, không over-engineer.

App cần trả lời được:
- hôm nay học bao lâu
- tuần này học bao lâu
- đang học mode nào nhiều nhất
- đã bắt đầu dùng app từ khi nào
- HSK5 Focus chiếm bao nhiêu thời gian học

---

## 2. Product principles
### A. Track theo session thật
Không chỉ track `opened app`, mà track:
- Learn
- Flashcards
- Quiz
- HSK5 Focus

### B. Không đếm thời gian idle
Nếu user mở app rồi bỏ đó, không nên cộng thời gian học.

### C. Auto-first, manual-friendly
Ưu tiên:
- auto start
- auto pause on idle
- auto stop on exit / tab hidden
- vẫn có thể thêm `End Session` sau này nếu cần

---

## 3. Core definitions
## Study Session
Một phiên học liên tục trong một mode cụ thể.

Ví dụ:
- 10 phút Learn
- 6 phút Flashcards
- 4 phút Quiz

## Active interaction
Một hành động chứng minh user đang học thật, ví dụ:
- chọn lesson
- next word
- mark learned
- flip flashcard
- answer quiz
- bookmark
- switch HSK5 Focus item

## Idle state
Không có interaction trong một khoảng thời gian nhất định.

---

## 4. Data model
### 4.1 StudySession
```ts
type StudySession = {
  id: string;
  startedAt: string;                 // ISO datetime
  endedAt?: string;                  // ISO datetime
  durationSeconds: number;
  mode: 'learn' | 'flashcards' | 'quiz' | 'hsk5_focus';
  levelId: 'HSK1' | 'HSK2' | 'HSK3' | 'HSK4' | 'HSK5';
  moduleId?: string;
  lessonId?: string;
  wordsReviewed?: number;
  wordsLearned?: number;
  questionsAnswered?: number;
  source: 'auto' | 'manual';
};
```

### 4.2 DailyStudyStats
```ts
type DailyStudyStats = {
  date: string;                      // YYYY-MM-DD
  totalStudySeconds: number;
  sessionCount: number;
  wordsLearned: number;
  wordsReviewed: number;
  quizQuestionsAnswered: number;
  byMode?: {
    learn?: number;
    flashcards?: number;
    quiz?: number;
    hsk5_focus?: number;
  };
};
```

### 4.3 StudyTrackingSummary
```ts
type StudyTrackingSummary = {
  startedAt?: string;
  lastStudyAt?: string;
  totalStudySeconds: number;
  totalStudyDays: number;
  currentStreak: number;
  bestStreak: number;
  averageSessionSeconds?: number;
  averageDailySeconds?: number;
};
```

### 4.4 CurrentRuntimeTracking
```ts
type CurrentRuntimeTracking = {
  activeSessionId?: string;
  activeMode?: 'learn' | 'flashcards' | 'quiz' | 'hsk5_focus';
  lastInteractionAt?: string;
  paused: boolean;
};
```

---

## 5. Session lifecycle
### 5.1 Start session
Auto start a session when user:
- enters Learn / Flashcards / Quiz screen
- enters HSK5 Focus mode
- performs first interaction after idle state

### 5.2 Keep session active
Session remains active while interactions continue within idle threshold.

### 5.3 Pause session
Pause if no interaction within:
- **60–90 seconds** recommended

### 5.4 Resume session
Resume when user interacts again.

### 5.5 End session
End when:
- app/tab hidden too long
- user closes app
- user switches to another learning mode
- optional manual stop later

---

## 6. Idle rules
### Recommended threshold
- idle after **75 seconds** of no interaction

### On idle
- stop counting time
- session enters paused state

### On resume
- update `lastInteractionAt`
- continue same session if short gap
- or create new session if long gap threshold exceeded

### Long gap threshold
If user returns after:
- **15 minutes+**
create a new session

---

## 7. What counts as an interaction
### Learn
- select lesson
- next / previous word
- mark learned
- bookmark

### Flashcards
- flip card
- know it
- don’t know
- lesson switch

### Quiz
- answer question
- next question
- restart quiz
- quiz start

### HSK5 Focus
- open HSK5 lesson
- review word
- answer HSK5 quiz item

---

## 8. Storage strategy
For MVP, local-first is enough.

### Recommended local storage items
- `studySessions`
- `dailyStudyStats`
- `studyTrackingSummary`
- `currentRuntimeTracking`

### Note
Do not rely only on `studyDates` anymore if proper time tracking is introduced.
Keep `studyDates` for streak calculation if useful, but let `StudySession` become the real source of time truth.

---

## 9. UI surfaces
### Home
Show:
- Today: 18 min
- This week: 2h 10m
- HSK5 Focus this week: 45 min

### Progress
Show:
- total study time
- average session time
- average daily study time
- study days
- last study date
- started tracking date
- by mode breakdown

### HSK5 Focus
Show:
- total HSK5 review time
- HSK5 sessions this week
- weak words reviewed

---

## 10. Product copy recommendation
### Home cards
- Today
- This week
- HSK5 Focus
- Average session

### Tracking lines
- Started on 07 May 2026
- Last study: 16 Jun 2026
- Today: 22 min
- This week: 2h 40m

---

## 11. MVP implementation order
### Step 1
Add session model + runtime tracking state

### Step 2
Track interactions in Learn / Flashcards / Quiz

### Step 3
Add idle pause logic

### Step 4
Aggregate daily stats

### Step 5
Show simple time metrics on Home + Progress

### Step 6
Add HSK5 Focus-specific metrics

---

## 12. Success criteria
Study time tracking is good enough for beta when:
- user can see started date
- user can see last study date
- user can see total time today
- idle time is not wildly overcounted
- level/mode sessions are separated enough to be useful

---

## 13. Future upgrades
Later add:
- manual session start/stop
- Pomodoro integration
- weekly trends chart
- reminders based on inactive days
- time vs output correlation
