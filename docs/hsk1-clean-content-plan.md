# DuongDuong 学中文 — HSK1 Clean Content Plan

_Last updated: 2026-05-08_

## Mục tiêu
Bắt đầu đưa HSK1 từ mức seed/demo sang mức content sạch hơn, có thể dùng để:
- học thật
- review thật
- quiz thật
- QA theo lesson

---

## 1. Trạng thái hiện tại
HSK1 hiện đã có:
- 12 lessons
- 100 words structured
- lesson-to-word mapping thực tế
- file JSON/CSV sạch hơn để tiếp tục QA

## 2. Bộ file clean content hiện có
### Lesson JSON
- `content/hsk1/HSK1-M1-L1.json`
- `content/hsk1/HSK1-M1-L2.json`
- ...
- `content/hsk1/HSK1-M4-L12.json`

### Summary
- `content/hsk1/hsk1-content-summary.json`

### Flat CSV
- `content/hsk1/hsk1-clean-content.csv`

---

## 3. Cách QA HSK1 clean content
### Vòng 1 — Accuracy
Kiểm tra từng từ:
- hanzi
- pinyin
- meaning_vi
- meaning_en
- example_cn
- example_translation

### Vòng 2 — Lesson fit
Kiểm tra:
- từ này có đúng lesson không?
- lesson có bị quá loãng không?
- có từ nào nên chuyển lesson không?

### Vòng 3 — Difficulty
Kiểm tra:
- lesson có đi từ dễ → khó hợp lý không?
- có từ nào quá sớm / quá muộn không?

---

## 4. Mức clean content nên đạt trước public beta
### Must-have
- không sai pinyin obvious
- không sai nghĩa obvious
- không có ví dụ quá khó với HSK1
- lesson titles hợp logic
- từ không lạc lesson quá rõ

### Nice-to-have
- mỗi lesson có 1–2 sentence pattern nhất quán
- mỗi lesson có 1 quiz focus rõ
- example translation tự nhiên hơn

---

## 5. Gợi ý cách làm thực tế
### Nếu bạn làm content trước
Mở từng file trong `content/hsk1/` và rà theo lesson.

### Nếu bạn làm bằng sheet
Dùng:
- `content/hsk1/hsk1-clean-content.csv`

Sheet sẽ dễ:
- sort
- filter
- highlight
- review từng lesson

---

## 6. Những lesson nên review đầu tiên
Vesper khuyên review theo thứ tự:
1. HSK1-M1-L1 Chào hỏi cơ bản
2. HSK1-M1-L2 Giới thiệu bản thân
3. HSK1-M1-L3 Hỏi đáp cơ bản
4. HSK1-M2-L6 Ăn uống hằng ngày
5. HSK1-M3-L8 Thời gian và lịch

Lý do: đây là những lesson dễ dùng để test app nhất.

---

## 7. Kết quả mong muốn
Sau vòng clean content HSK1, bạn nên có:
- 1 bộ CSV sạch hơn
- 12 lesson JSON rõ ràng
- 1 app demo dùng content đáng tin hơn
