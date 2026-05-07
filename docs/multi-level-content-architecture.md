# DuongDuong 学中文 — Multi-Level Content Architecture

_Last updated: 2026-05-07_

## 1. Purpose
This document defines the content architecture needed to move the app from:

> HSK1-only demo structure

to:

> scalable HSK1–HSK5 learning system

It focuses on:
- levels
- modules
- lessons
- vocabulary registries
- progress and review compatibility

---

## 2. Main architecture goal
The app should support:
1. HSK1–HSK5 roadmap in UI
2. partial release by level
3. lesson-based learning flow
4. level-based review and quiz generation
5. later HSK5 focus mode without breaking beginner flow

---

## 3. Architecture principles

### A. Level-first architecture
All content must belong to a level.

### B. Module-first lesson organization
Lessons belong to modules, and modules belong to levels.

### C. Shared word schema
Words across all HSK levels should use the same schema.

### D. Backward compatibility
HSK1 should continue to work while HSK2–HSK5 are added gradually.

---

## 4. Recommended folder structure
```text
src/
  data/
    levels.ts
    modules.ts
    lessons.ts
    registry.ts
    vocab/
      hsk1.ts
      hsk2.ts
      hsk3.ts
      hsk4.ts
      hsk5.ts
```

### Explanation
- `levels.ts` → level metadata only
- `modules.ts` → module metadata only
- `lessons.ts` → lesson definitions only
- `registry.ts` → exported content registry helpers
- `vocab/hskX.ts` → words by level

---

## 5. Recommended runtime structure

### 5.1 Levels
```ts
export const levels = [
  { id: 'HSK1', displayName: 'HSK 1', available: true },
  { id: 'HSK2', displayName: 'HSK 2', available: false },
  { id: 'HSK3', displayName: 'HSK 3', available: false },
  { id: 'HSK4', displayName: 'HSK 4', available: false },
  { id: 'HSK5', displayName: 'HSK 5', available: false },
];
```

### 5.2 Modules
Each module must reference a level.

### 5.3 Lessons
Each lesson must reference:
- levelId
- moduleId
- title
- topic
- list of word ids or source words

### 5.4 Vocabulary
Each word must reference:
- level
- moduleId
- lessonId

---

## 6. App bundle output
A content loader should eventually return a bundle like this:

```ts
type AppContentBundle = {
  levels: Level[];
  modules: Module[];
  lessons: Lesson[];
  words: VocabWord[];
};
```

This makes it possible to:
- build lesson pills by current level
- switch levels later
- build review by level / lesson / module
- build quiz by selected lesson

---

## 7. Current state vs target state

### Current state
- HSK1 data exists
- levels/modules/lessons structure started
- app still behaves mostly like a single-level app

### Target state
- app supports selected level state
- lesson list filters by level
- current lesson depends on selected level
- roadmap reflects availability by level
- vocabulary can scale without changing UI logic repeatedly

---

## 8. Required refactor areas

### A. Types
Update `types.ts` so the app is not conceptually HSK1-only.

### B. Data source split
Separate:
- level metadata
- module metadata
- lesson metadata
- vocabulary data

### C. Selected state
The app should support:
- `selectedLevelId`
- `selectedModuleId?`
- `selectedLessonId`

### D. Derived queries
The app should be able to derive:
- lessons by level
- words by lesson
- words by module
- words by level
- weak words by level

---

## 9. UI architecture implications

### Home
Should show:
- current level
- current lesson
- level roadmap status

### Learn
Should load lesson pills from current level only.

### Flashcards
Should review from current lesson or current level filter.

### Quiz
Should generate based on:
- selected lesson
- current level
- later weak words / review set

### Progress
Should support:
- by level
- by lesson
- by word status

---

## 10. Level availability strategy
Recommended release status:

```ts
HSK1: available
HSK2: in progress
HSK3: planned
HSK4: planned
HSK5: planned
```

Important rule:
> UI can show the roadmap, but content availability must remain honest.

---

## 11. HSK5 Focus Mode compatibility
This architecture must support a later special mode for advanced learners.

That means the app should eventually allow:
- selected level = HSK5
- review source = weak HSK5 words
- quiz source = HSK5 priority words
- fallback review = HSK3–HSK4 support words if needed

This is why a level-based content registry matters early.

---

## 12. Migration path recommendation

### Phase 1
Keep HSK1 working under the new structure.

### Phase 2
Add level registry and level availability state.

### Phase 3
Add HSK2 skeleton data.

### Phase 4
Add HSK5 Focus Mode data entry path.

### Phase 5
Expand HSK2–HSK5 content without restructuring UI each time.

---

## 13. Suggested next docs
After this architecture doc, the best follow-up files are:
1. `hsk5-focus-mode-spec.md`
2. `review-system-spec.md`
3. `quiz-engine-spec.md`
4. `content-qa-checklist.md`
5. `hsk5-build-ready-lesson-list.md`
