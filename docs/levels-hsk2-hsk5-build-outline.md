# DuongDuong 学中文 — HSK2–HSK5 Build Outline

_Last updated: 2026-05-06_

## Mục đích
Tài liệu này mở rộng từ HSK1 dataset template sang các level còn lại, để project có thể scale theo một structure nhất quán.

---

# 1. HSK2 Build Outline
## Level metadata
- id: HSK2
- displayName: HSK 2
- targetWordCount: 500
- cefrApprox: A1/A2 bridge

## Modules
### hsk2-module-1
- title_vi: Giao tiếp hằng ngày
- title_zh: 日常交流

### hsk2-module-2
- title_vi: Đời sống thực tế
- title_zh: 生活应用

### hsk2-module-3
- title_vi: Kế hoạch và sở thích
- title_zh: 计划与喜好

### hsk2-module-4
- title_vi: Tình huống đời thường
- title_zh: 日常情景

## Sample lesson buckets
- Small Talk
- Family & Friends
- Daily Routine
- Shopping & Prices
- Food Orders
- Transportation
- Plans & Schedule
- Feelings & Preferences

---

# 2. HSK3 Build Outline
## Level metadata
- id: HSK3
- displayName: HSK 3
- targetWordCount: 1000
- cefrApprox: A2

## Modules
### hsk3-module-1
- title_vi: Trải nghiệm cá nhân
- title_zh: 个人经历

### hsk3-module-2
- title_vi: Giao tiếp và diễn đạt
- title_zh: 表达与交流

### hsk3-module-3
- title_vi: Dịch vụ và xã hội
- title_zh: 服务与社会

### hsk3-module-4
- title_vi: Đọc hiểu ngắn
- title_zh: 短篇阅读

## Sample lesson buckets
- Experience
- Health
- Travel Plans
- Giving Opinions
- Comparisons
- Solving Problems
- Services
- Practical Dialogues

---

# 3. HSK4 Build Outline
## Level metadata
- id: HSK4
- displayName: HSK 4
- targetWordCount: 2000
- cefrApprox: B1

## Modules
### hsk4-module-1
- title_vi: Công việc và trách nhiệm
- title_zh: 工作与责任

### hsk4-module-2
- title_vi: Cảm xúc và tâm lý
- title_zh: 情绪与心理

### hsk4-module-3
- title_vi: Quan điểm và thảo luận
- title_zh: 观点与讨论

### hsk4-module-4
- title_vi: Đời sống nâng cao
- title_zh: 进阶生活

### hsk4-module-5
- title_vi: Độ chính xác ngôn ngữ
- title_zh: 语言精度

## Sample lesson buckets
- Workplace
- Pressure & Confidence
- Decision Making
- Influence & Impact
- Lifestyle
- Society Commentary
- Synonyms
- Collocations

---

# 4. HSK5 Build Outline
## Level metadata
- id: HSK5
- displayName: HSK 5
- targetWordCount: 3600
- cefrApprox: B2

## Modules
### hsk5-module-1
- title_vi: Chủ đề trừu tượng
- title_zh: 抽象主题

### hsk5-module-2
- title_vi: Giao tiếp trang trọng
- title_zh: 正式表达

### hsk5-module-3
- title_vi: Đọc hiểu nâng cao
- title_zh: 进阶阅读

### hsk5-module-4
- title_vi: Diễn đạt phức tạp
- title_zh: 复杂表达

### hsk5-module-5
- title_vi: Thành ngữ và ngữ cảnh
- title_zh: 成语与语境

## Sample lesson buckets
- Society & Change
- Values & Responsibility
- Formal Register
- Media Vocabulary
- News Reading
- Precision & Nuance
- Idiomatic Use
- Chengyu Foundations

---

# 5. Shared schema rules across all levels
Tất cả các level HSK2–HSK5 nên giữ cùng schema như HSK1:
- levels
- modules
- lessons
- words
- word progress
- lesson progress

Điều này giúp:
- reuse code
- scale UI sạch hơn
- maintain quiz/review logic thống nhất

---

# 6. Implementation recommendation
## Phase 1
Hoàn thiện HSK1 sạch trước.

## Phase 2
Tạo skeleton JSON/CSV cho HSK2–HSK5.

## Phase 3
Mở roadmap HSK2–HSK5 trong UI với trạng thái:
- Available
- In progress
- Planned

## Phase 4
Nhập content từng level theo module và lesson.

---

# 7. Suggested next files
Vesper khuyên tiếp theo nên tạo:
1. `hsk2-dataset-template.json`
2. `hsk3-dataset-template.json`
3. `hsk4-dataset-template.json`
4. `hsk5-dataset-template.json`
5. `level-roadmap-availability-spec.md`
