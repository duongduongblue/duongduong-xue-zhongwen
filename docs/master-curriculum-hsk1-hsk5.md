# DuongDuong 学中文 — Master Curriculum Doc (HSK1–HSK5)

_Last updated: 2026-05-06_

## 1. Mục đích tài liệu
Tài liệu này là bản gốc định hướng curriculum cho project **DuongDuong 学中文**.

Nó dùng để chốt:
- chuẩn HSK tham chiếu
- cấu trúc level → module → lesson
- logic tăng độ khó từ HSK1 đến HSK5
- nguyên tắc sắp xếp từ vựng, bài học, quiz và review
- cách tách **data structure** và **learning structure**

Tài liệu này nên được xem là nguồn tham chiếu chính trước khi:
- nhập dữ liệu từ vựng
- build lesson pills
- viết logic review
- mở rộng từ HSK1 lên HSK5

---

## 2. Chuẩn tham chiếu
### 2.1 Chuẩn nội bộ được chọn
Vesper khuyên dùng **HSK 3.0** làm chuẩn nội bộ.

### 2.2 Mốc từ vựng tham chiếu
- HSK1: ~300 từ
- HSK2: ~500 từ
- HSK3: ~1000 từ
- HSK4: ~2000 từ
- HSK5: ~3600 từ

### 2.3 Ghi chú thực tế
Trong UI public, app vẫn có thể hiển thị đơn giản là:
- HSK1
- HSK2
- HSK3
- HSK4
- HSK5

Nhưng bên trong data/product structure nên giữ logic theo HSK 3.0 để scale tốt hơn về sau.

---

## 3. Curriculum principles
### 3.1 Theme-based, không POS-based
Không tổ chức bài học theo kiểu:
- động từ
n- tính từ
- trạng từ

Nên tổ chức theo:
- ngữ cảnh
- tình huống giao tiếp
- mục tiêu sử dụng

### 3.2 Từ dễ đến khó
Progression phải đi theo:
1. từ tần suất cao
2. tình huống đời sống gần gũi
3. câu ngắn
4. ý nghĩa cụ thể
5. sau đó mới tới từ trừu tượng, nuance, register

### 3.3 Tách 3 lớp
#### A. Standard / Data structure
- level
- module
- lesson
- word metadata
- tags

#### B. Learning structure
- lesson order
- module flow
- grammar focus
- review progression

#### C. UI structure
- lesson pills
- progress view
- quiz by lesson
- roadmap badges

### 3.4 Beginner-first design
User-facing lesson phải trả lời được câu hỏi:
> học bài này để dùng trong tình huống nào?

---

## 4. Product-facing curriculum model
## 4.1 Structure tổng thể
### Level → Module → Lesson → Word / Sentence / Quiz

Ví dụ:
- HSK1
  - Module 1: Survival Basics
  - Module 2: Daily Life Core
  - Module 3: Numbers, Time & Movement

### 4.2 UI principle
User nhìn thấy:
- level
- module / lesson
- mục tiêu học

User không nên phải thấy trực tiếp:
- tags kỹ thuật
- part-of-speech grouping
- backend taxonomy

---

## 5. HSK1 curriculum
## 5.1 Mục tiêu level
HSK1 phải giúp người học:
- chào hỏi cơ bản
- tự giới thiệu
- hỏi đáp ngắn
- nói về gia đình, trường lớp, ăn uống
- dùng số đếm, thời gian và di chuyển cơ bản

## 5.2 HSK1 modules
### Module 1 — Survival Basics
1. Greetings & Politeness
2. Introducing Yourself
3. Basic Questions

### Module 2 — People & Daily Life
4. Family & People
5. School & Study
6. Food & Drink

### Module 3 — Numbers, Time & Movement
7. Numbers
8. Time & Date
9. Going Places

### Module 4 — Core Actions & Description
10. Common Actions
11. Everyday Descriptions
12. Simple Daily Situations

## 5.3 HSK1 lesson list
### HSK1-M1-L1
- VI: Chào hỏi cơ bản
- ZH: 问候语
- Goal: chào, cảm ơn, xin lỗi, tạm biệt
- Word target: 20–25

### HSK1-M1-L2
- VI: Giới thiệu bản thân
- ZH: 自我介绍
- Goal: nói tôi là ai, tên gì, bạn là ai
- Word target: 20–25

### HSK1-M1-L3
- VI: Hỏi đáp cơ bản
- ZH: 基本问答
- Goal: hỏi cái gì, ai, ở đâu, bao nhiêu
- Word target: 20–25

### HSK1-M2-L4
- VI: Gia đình và người thân
- ZH: 家庭
- Goal: nói về người trong gia đình
- Word target: 20–25

### HSK1-M2-L5
- VI: Trường lớp và học tập
- ZH: 学校
- Goal: nói về trường, sách, việc học
- Word target: 20–25

### HSK1-M2-L6
- VI: Ăn uống hằng ngày
- ZH: 吃喝
- Goal: nói muốn ăn gì, uống gì
- Word target: 25–30

### HSK1-M3-L7
- VI: Số đếm cơ bản
- ZH: 数字
- Goal: dùng số 1–10 và số lượng cơ bản
- Word target: 15–20

### HSK1-M3-L8
- VI: Thời gian và lịch
- ZH: 时间
- Goal: hôm nay, ngày mai, giờ, tuần
- Word target: 20–25

### HSK1-M3-L9
- VI: Đi lại và nơi chốn
- ZH: 出行
- Goal: nói đi, đến, về, sống ở đâu
- Word target: 20–25

### HSK1-M4-L10
- VI: Hành động cơ bản
- ZH: 基本动作
- Goal: mô tả hành động thường gặp
- Word target: 20–25

### HSK1-M4-L11
- VI: Mô tả cơ bản
- ZH: 基本描述
- Goal: nói to/nhỏ, nóng/lạnh, tốt/xấu, vui/mệt
- Word target: 20–25

### HSK1-M4-L12
- VI: Tình huống hằng ngày
- ZH: 日常情景
- Goal: ôn tập tổng hợp qua use case thật
- Word target: mixed review

## 5.4 HSK1 release recommendation
### MVP public
- 6 lessons đầu
- 120–150 từ core

### Full HSK1 beta
- 12 lessons
- 240–300 từ usable

---

## 6. HSK2 curriculum
## 6.1 Mục tiêu level
HSK2 phải giúp người học:
- xử lý hội thoại thường ngày tốt hơn
- diễn đạt lịch trình, sở thích, thói quen, giá cả
- hiểu thêm từ dùng thực tế trong ăn uống, đi lại, mua sắm, trường lớp

## 6.2 HSK2 modules
### Module 1 — Everyday Interaction
1. Making Small Talk
2. Family & Friends
3. Daily Routine
4. Free Time

### Module 2 — Functional Life
5. Shopping & Prices
6. Food Orders & Dining
7. Transportation & Directions
8. School / Work Basics

### Module 3 — Personal Expression
9. Likes & Preferences
10. Plans & Schedule
11. Feelings & Reactions
12. Frequency & Habit

### Module 4 — Practical Use
13. Asking for Help
14. Comparisons
15. Daily Situations
16. Mixed Review

## 6.3 HSK2 design note
HSK2 vẫn phải giữ cảm giác everyday-use, chưa nên chuyển sang academic tone quá sớm.

---

## 7. HSK3 curriculum
## 7.1 Mục tiêu level
HSK3 phải giúp người học:
- kể chuyện đơn giản
- nói về trải nghiệm
- giải thích lý do ở mức cơ bản
- dùng từ vựng đời sống rộng hơn

## 7.2 HSK3 modules
### Module 1 — Personal Life & Experience
1. Life Events
2. Study & Work
3. Health & Body
4. Travel Plans

### Module 2 — Communication
5. Explaining Reasons
6. Giving Opinions
7. Making Comparisons
8. Handling Problems

### Module 3 — Daily Society
9. Services & Shopping
10. Technology in Daily Life
11. Weather & Activities
12. Social Situations

### Module 4 — Reading Context
13. Short Stories
14. Practical Dialogues
15. Situational Vocabulary
16. Mixed Review

## 7.3 HSK3 design note
Đây là level bắt đầu cần thêm context sentence, short story, practical dialogue.

---

## 8. HSK4 curriculum
## 8.1 Mục tiêu level
HSK4 phải giúp người học:
- giao tiếp độc lập hơn
- xử lý tình huống công việc / học tập / xã hội
- diễn đạt cảm xúc và quan điểm rõ hơn
- dùng từ với nuance tốt hơn

## 8.2 HSK4 modules
### Module 1 — Work & Responsibility
1. Jobs & Roles
2. Workplace Communication
3. Efficiency & Processes
4. Rules & Expectations

### Module 2 — Emotions & Psychology
5. Feelings
6. Worry / Confidence / Stress
7. Self-Reflection
8. Interpersonal Tension

### Module 3 — Discussion & Reasoning
9. Agree / Disagree
10. Decisions & Reasons
11. Influence & Impact
12. Problem Solving

### Module 4 — Advanced Daily Life
13. Travel Problems
14. Lifestyle & Balance
15. Learning & Growth
16. Society Commentary

### Module 5 — Precision
17. Near-Synonyms
18. Common Collocations
19. Register Use
20. HSK4 Review

## 8.3 HSK4 design note
Từ HSK4 trở đi, user-facing lesson vẫn theo theme, nhưng bên trong bắt đầu cần thêm:
- synonym discrimination
- collocation
- formal vs informal use

---

## 9. HSK5 curriculum
## 9.1 Mục tiêu level
HSK5 phải giúp người học:
- đọc đoạn dài hơn
- xử lý chủ đề trừu tượng hơn
- dùng từ chính xác hơn trong viết và nói
- hiểu register, media-like language, argumentation

## 9.2 HSK5 modules
### Module 1 — Abstract Topics
1. Society & Change
2. Responsibility & Values
3. Success & Failure
4. Human Nature & Relationships

### Module 2 — Formal Communication
5. Formal Expression
6. Argument & Explanation
7. Register & Tone
8. Media Language

### Module 3 — Reading Depth
9. Short Articles
10. Opinion Pieces
11. News Vocabulary
12. Inference in Context

### Module 4 — Advanced Expression
13. Complex Ideas
14. Cause & Nuance
15. Precision & Word Choice
16. Situational Advanced Use

### Module 5 — Idiomatic Layer
17. Chengyu Foundations
18. Figurative Meaning
19. Contextual Expression
20. HSK5 Review

## 9.3 HSK5 design note
HSK5 nên có thêm:
- short article mode
- register markers
- formal written usage
- idiomatic context (light, not overbuilt too early)

---

## 10. Vocabulary sequencing rules
## 10.1 From easy to hard
### HSK1–HSK2
Ưu tiên:
- high-frequency words
- concrete nouns
- short verbs
- simple questions
- real-life situations

### HSK3
Thêm:
- connectors
- cause/reason language
- description with more nuance
- broader practical vocabulary

### HSK4
Thêm:
- collocations
- workplace / social / emotional vocabulary
- opinion and reasoning language

### HSK5
Thêm:
- abstract vocabulary
- register-sensitive terms
- news / article style words
- idiomatic and nuanced usage

## 10.2 Do not sequence by grammar label alone
Không nên cho user thấy lesson kiểu:
- verbs
- adjectives
- pronouns

Các nhãn đó chỉ nên tồn tại như internal tags.

---

## 11. Data structure vs learning structure
## 11.1 Data structure
Phục vụ:
- storage
- search
- filtering
- quiz generation
- analytics

Nó gồm:
- level
- moduleId
- lessonId
- tags
- part_of_speech
- frequency band
- difficulty order

## 11.2 Learning structure
Phục vụ:
- lesson order
- UI pills
- curriculum flow
- review path
- roadmap display

Nó gồm:
- roadmap by level
- module titles
- lesson titles
- lesson goals
- lesson progression

## 11.3 Product rule
> Data tags must not become beginner-facing lesson pills by default.

---

## 12. Recommended dataset schema
## 12.1 Level
```ts
type HSKLevel = {
  id: string;
  displayName: string;
  targetWordCount: number;
  cefrApprox?: string;
  description?: string;
};
```

## 12.2 Module
```ts
type Module = {
  id: string;
  level: string;
  title_vi: string;
  title_zh: string;
  order: number;
  description?: string;
};
```

## 12.3 Lesson
```ts
type Lesson = {
  id: string;
  level: string;
  moduleId: string;
  title_vi: string;
  title_zh: string;
  shortTitle_vi?: string;
  shortTitle_zh?: string;
  order: number;
  goal: string;
  targetWordCount: number;
  grammarFocus?: string[];
  quizFocus?: string[];
  tags?: string[];
};
```

## 12.4 Word
```ts
type Word = {
  id: string;
  level: string;
  moduleId: string;
  lessonId: string;
  hanzi: string;
  pinyin: string;
  meaning_vi: string;
  meaning_en: string;
  part_of_speech?: string;
  example_cn?: string;
  example_translation?: string;
  tags?: string[];
  difficulty_order?: number;
  frequency_band?: 'high' | 'medium' | 'low';
};
```

## 12.5 Progress
```ts
type WordProgress = {
  word_id: string;
  status: 'new' | 'learning' | 'review' | 'mastered';
  correct_count: number;
  wrong_count: number;
  last_reviewed_at?: string;
  next_review_at?: string;
  bookmarked: boolean;
};
```

## 12.6 Lesson progress
```ts
type LessonProgress = {
  lesson_id: string;
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  learned_word_count: number;
  review_due_count: number;
  quiz_best_score?: number;
};
```

---

## 13. UI rules by level roadmap
## 13.1 What users should see
- HSK1
- HSK2
- HSK3
- HSK4
- HSK5

## 13.2 What users should not assume
Nếu app hiện chỉ có HSK1, UI phải nói rõ:
- HSK1 — Available
- HSK2 — Planned / Coming soon
- HSK3 — Planned
- HSK4 — Planned
- HSK5 — Planned

## 13.3 Roadmap principle
Roadmap có thể hiện full 1–5, nhưng content availability phải honest.

---

## 14. Review of current project direction
## 14.1 What is already right
- app direction: vocab + flashcard + quiz + progress
- mobile-first flow
- theme-based lesson direction is possible
- public structure already exists

## 14.2 What still needs curriculum refactor
- current HSK1 lesson mapping is still prototype-level
- dataset tags are stronger than curriculum structure right now
- HSK2–HSK5 are roadmap, not implemented curriculum yet

## 14.3 Next curriculum milestone
Before scaling UI further, the project should have:
1. finalized HSK1 lesson list
2. finalized module structure HSK1–HSK5
3. stable schema for words / lessons / levels

---

## 15. Build order recommendation
### Phase 1
Finalize:
- HSK1 lesson list
- dataset schema
- level roadmap metadata

### Phase 2
Refactor app to read:
- levels
- modules
- lessons
- words

### Phase 3
Load HSK1 clean content first

### Phase 4
Open HSK2–HSK5 as roadmap + partial release plan

---

## 16. Decision log summary
### Final recommendation
- Use HSK 3.0 internally
- Organize lessons by theme and use case
- Separate data structure from learning structure
- Ship HSK1 first, but design the product to scale to HSK5
- Keep roadmap visible, but content availability honest

---

## 17. Suggested follow-up docs
After this master doc, the next most useful docs are:
1. `HSK1 build-ready lesson list`
2. `HSK1 dataset mapping sheet`
3. `level roadmap availability spec`
4. `quiz focus by lesson doc`
5. `review logic by lesson/word status`
