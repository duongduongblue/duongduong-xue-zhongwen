# DuongDuong 学中文

A soft, warm, Chinese-inspired vocabulary learning app demo.

## Product direction
**DuongDuong 学中文** is a mobile-first Chinese learning app focused on:
- daily vocabulary study
- flashcard review
- short quizzes
- streak and progress motivation
- a gentle, modern Chinese study aesthetic

This project now stands on its own product direction and demo identity.
It is presented as a standalone Chinese learning concept with a soft DuongDuong style.

---

## What is included
### Working app
- HSK1 seed dataset
- lesson-based learning flow
- flashcard review
- lesson-based quiz
- progress screen with streak, stats, and heatmap feel
- seeded mock progress for better demo experience
- local persistence with AsyncStorage

### Visual preview
- Chinese-inspired warm UI preview
- DuongDuong branding direction
- concept screens for presentation and alignment

---

## Quick start
```bash
cd chinese-learning-app
npm install
npm start
```

### Run on web
```bash
npm run web
```

### Run on Android
```bash
npm run android
```

### Type check
```bash
npx tsc --noEmit
```

---

## Key files
### Main app
- `App.tsx`
- `src/ChineseLearningApp.tsx`

### Seed data
- `src/data/app-seed.ts`
- `src/lib/seed-loader.ts`
- `../datasets/chinese-daily-hsk1-full-100.json`
- `../datasets/chinese-daily-mock-progress.json`

### Preview and docs
- `site/landing.html`
- `site/preview.html`
- `docs/duongduong-xue-zhongwen-preview.html`
- `docs/duongduong-xue-zhongwen-landing.html`
- `docs/landing-page-copy.md`
- `docs/landing-page-bilingual.md`
- `docs/demo-guide.md`
- `docs/demo-runbook.md`
- `docs/screenshot-spec-bilingual.md`
- `docs/release-ready/01-release-strategy-for-nontech-founder.md`
- `docs/release-ready/02-priority-backlog-with-acceptance-criteria.md`
- `docs/release-ready/03-release-ready-files-checklist.md`
- `docs/release-ready/04-nontech-step-by-step-public-launch.md`
- `docs/release-ready/05-faq-template.md`
- `docs/release-ready/06-known-issues-template.md`
- `docs/release-ready/07-feedback-form-template.md`
- `docs/release-ready/08-privacy-policy-draft.md`
- `docs/release-ready/09-terms-of-use-draft.md`
- `docs/release-ready/10-web-first-vs-app-store-recommendation.md`
- `docs/release-ready/11-store-release-path-for-nontech-founder.md`
- `docs/release-ready/12-store-assets-checklist.md`
- `docs/release-ready/13-store-copy-template.md`
- `docs/release-ready/14-web-first-deploy-steps.md`
- `docs/release-ready/15-vercel-deploy-all-three.md`
- `docs/release-ready/16-project-structure-for-vercel.md`
- `docs/release-ready/17-github-upload-step-by-step.md`
- `eas.json`
- `vercel.json`
- `scripts/prepare-vercel-dist.js`
- `scripts/demo-launch.ps1`

---

## Recommended demo flow
### 1. Open the visual preview
Use:
- `docs/duongduong-xue-zhongwen-preview.html`
- or run `scripts/demo-launch.ps1` on Windows to open the preview and start Expo web

This helps present:
- the visual direction
- the brand vibe
- the target polish level

### 2. Open the working app
Show this sequence:
1. Home
2. Learn
3. Flashcards
4. Quiz
5. Progress

### 3. Explain the positioning
Recommended line:
> DuongDuong 学中文 là app học tiếng Trung theo hướng nhẹ nhàng, hiện đại, mobile-first, tập trung vào từ vựng, flashcard, quiz ngắn và progress hằng ngày.

---

## Current limitations
This is still an MVP demo.

Not included yet:
- audio pronunciation
- AI writing review logic
- Chengyu learning flow
- full HSK 1–5 roadmap
- production sync/authentication
- advanced spaced repetition

---

## Suggested next steps
- polish typography and spacing further
- add tone-colored pinyin rendering
- add audio pronunciation
- expand HSK1 lesson quality
- create a dedicated landing page
- deploy a web demo for easy sharing

---

## Brand note
Use this product name consistently:
- **DuongDuong 学中文**

Suggested English subtitle:
- **A soft and modern Chinese vocabulary learning app**

Suggested Vietnamese subtitle:
- **App học tiếng Trung nhẹ nhàng, hiện đại và dễ duy trì mỗi ngày**
