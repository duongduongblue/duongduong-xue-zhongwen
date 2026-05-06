# DuongDuong 学中文 — HSK1 Dataset Template

_Last updated: 2026-05-06_

## Mục đích
Template này dùng để nhập dữ liệu HSK1 theo cấu trúc chuẩn, để sau đó có thể:
- import vào app
- map theo lesson
- build quiz
- build review logic
- scale lên HSK2–HSK5 mà không vỡ cấu trúc

---

## 1. File outputs nên có
### A. JSON dataset
- `hsk1-dataset.json`

### B. CSV dataset
- `hsk1-dataset.csv`

### C. Optional mapping sheet
- `hsk1-lesson-word-map.csv`

---

## 2. Recommended JSON schema
```json
{
  "levels": [
    {
      "id": "HSK1",
      "displayName": "HSK 1",
      "targetWordCount": 300,
      "cefrApprox": "A1",
      "description": "Beginner survival Chinese"
    }
  ],
  "modules": [
    {
      "id": "hsk1-module-1",
      "level": "HSK1",
      "title_vi": "Cơ bản sinh tồn",
      "title_zh": "基础生存",
      "order": 1
    }
  ],
  "lessons": [
    {
      "id": "HSK1-M1-L1",
      "level": "HSK1",
      "moduleId": "hsk1-module-1",
      "title_vi": "Chào hỏi cơ bản",
      "title_zh": "问候语",
      "shortTitle_vi": "Chào hỏi",
      "shortTitle_zh": "问候",
      "order": 1,
      "goal": "Biết chào, cảm ơn, xin lỗi, tạm biệt trong tình huống cơ bản.",
      "targetWordCount": 24,
      "grammarFocus": ["phrase usage", "politeness phrases"],
      "quizFocus": ["meaning recognition", "situational choice"],
      "tags": ["greeting", "polite", "beginner"]
    }
  ],
  "words": [
    {
      "id": "hsk1_001",
      "level": "HSK1",
      "moduleId": "hsk1-module-1",
      "lessonId": "HSK1-M1-L1",
      "hanzi": "你好",
      "pinyin": "nǐ hǎo",
      "meaning_vi": "xin chào",
      "meaning_en": "hello",
      "part_of_speech": "phrase",
      "example_cn": "你好，很高兴认识你。",
      "example_translation": "Xin chào, rất vui được gặp bạn.",
      "tags": ["greeting", "polite", "beginner"],
      "difficulty_order": 1,
      "frequency_band": "high"
    }
  ]
}
```

---

## 3. Recommended CSV columns
Vesper khuyên CSV chính nên có các cột sau:

```csv
id,level,moduleId,lessonId,hanzi,pinyin,meaning_vi,meaning_en,part_of_speech,example_cn,example_translation,tags,difficulty_order,frequency_band
```

---

## 4. Example CSV row
```csv
hsk1_001,HSK1,hsk1-module-1,HSK1-M1-L1,你好,nǐ hǎo,xin chào,hello,phrase,你好，很高兴认识你。,Xin chào rất vui được gặp bạn.,greeting|polite|beginner,1,high
```

---

## 5. Required fields
Các field tối thiểu bắt buộc để app chạy ổn:
- `id`
- `level`
- `lessonId`
- `hanzi`
- `pinyin`
- `meaning_vi`
- `meaning_en`

## Strongly recommended
- `example_cn`
- `example_translation`
- `tags`
- `difficulty_order`
- `frequency_band`

---

## 6. HSK1 module template
### hsk1-module-1
- title_vi: Cơ bản sinh tồn
- title_zh: 基础生存

### hsk1-module-2
- title_vi: Con người & đời sống
- title_zh: 人物与日常

### hsk1-module-3
- title_vi: Số, thời gian & di chuyển
- title_zh: 数字、时间与出行

### hsk1-module-4
- title_vi: Hành động & mô tả cơ bản
- title_zh: 基本动作与描述

---

## 7. HSK1 lesson template list
### HSK1-M1-L1
- shortTitle_vi: Chào hỏi
- shortTitle_zh: 问候

### HSK1-M1-L2
- shortTitle_vi: Giới thiệu
- shortTitle_zh: 介绍

### HSK1-M1-L3
- shortTitle_vi: Hỏi đáp
- shortTitle_zh: 提问

### HSK1-M2-L4
- shortTitle_vi: Gia đình
- shortTitle_zh: 家庭

### HSK1-M2-L5
- shortTitle_vi: Trường lớp
- shortTitle_zh: 学校

### HSK1-M2-L6
- shortTitle_vi: Ăn uống
- shortTitle_zh: 饮食

### HSK1-M3-L7
- shortTitle_vi: Số đếm
- shortTitle_zh: 数字

### HSK1-M3-L8
- shortTitle_vi: Thời gian
- shortTitle_zh: 时间

### HSK1-M3-L9
- shortTitle_vi: Di chuyển
- shortTitle_zh: 出行

### HSK1-M4-L10
- shortTitle_vi: Hành động
- shortTitle_zh: 动作

### HSK1-M4-L11
- shortTitle_vi: Mô tả
- shortTitle_zh: 描述

### HSK1-M4-L12
- shortTitle_vi: Tình huống
- shortTitle_zh: 情景

---

## 8. Content QA rules
### Pinyin
- dùng tone marks nhất quán
- không trộn tone number và tone marks

### Meaning
- giữ ngắn gọn
- ưu tiên nghĩa đầu tiên người học cần biết

### Example
- ngắn
- đúng level
- không văn vẻ quá mức

### Tags
- không lạm dụng quá nhiều tags
- 2–4 tags/word là đủ trong HSK1

---

## 9. Suggested next file generation
Sau template này, nên tạo tiếp:
1. `hsk1-dataset-template.json`
2. `hsk1-dataset-template.csv`
3. `hsk1-lesson-word-map-template.csv`
