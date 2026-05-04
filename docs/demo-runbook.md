# Demo Runbook — DuongDuong 学中文

## Goal
Run a clean demo of **DuongDuong 学中文** with:
1. visual preview
2. working app
3. short closing pitch

---

## 1) Before demo
Open these in advance:
- `docs/duongduong-xue-zhongwen-preview.html`
- Expo app or Expo web
- `docs/demo-guide.md` if you want a talk track nearby

Make sure:
- the app opens without blank state
- one lesson is already selected
- Progress screen has visible streak / stats / heatmap

---

## 2) Terminal commands
### Install once
```bash
cd chinese-learning-app
npm install
```

### Run web demo
```bash
npm run web
```

### Run Expo default
```bash
npm start
```

### Type check before presenting
```bash
npx tsc --noEmit
```

---

## 3) 3-minute demo flow
### Part A — visual direction
Open preview HTML first.

Say:
> Đây là hướng giao diện của DuongDuong 学中文: nhẹ nhàng, ấm, hiện đại và đậm chất Chinese learning.

### Part B — app flow
Show in this order:
1. Home
2. Learn
3. Flashcards
4. Quiz
5. Progress

### Part C — close
Say:
> Đây là bản MVP chạy được với HSK1 seed data. Hướng tiếp theo là polish UI thêm, thêm audio và mở rộng lesson flow.

---

## 4) Fast pitch
### Vietnamese
> DuongDuong 学中文 là app học tiếng Trung mobile-first, tập trung vào từ vựng, flashcard, quiz ngắn và progress hằng ngày, với giao diện mềm, ấm và dễ duy trì thói quen học.

### English
> DuongDuong 学中文 is a mobile-first Chinese learning app focused on vocabulary, flashcards, short quizzes, and daily progress, with a warm and gentle interface.

---

## 5) If something goes wrong
### If Expo is slow
Use the preview HTML first and continue the concept demo.

### If web layout looks off
Switch to the preview HTML and then reopen the Learn / Flashcard screens only.

### If you need a shorter demo
Show only:
- preview HTML
- Learn
- Flashcards
- Progress

---

## 6) Best final screen
End on:
- Progress screen in app
or
- preview HTML profile/progress concept

That gives the strongest close.
