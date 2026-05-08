# DuongDuong 学中文 — HSK5 Top 20 Readiness Note

_Last updated: 2026-05-07_

## 1. Trạng thái hiện tại
Top 20 HSK5 hiện đã có 3 lớp dữ liệu:

### A. Refined candidate list
- `docs/hsk5-batch1-priority-50-refined.csv`
- `docs/hsk5-batch1-priority-50-refined.json`

### B. Enriched source entries
- `docs/hsk5-batch1-top10-enriched.json`
- `docs/hsk5-batch1-11-20-enriched.json`

### C. App-display version
- `docs/hsk5-batch1-top20-app-display.json`

---

## 2. Readiness verdict
### Internal/source readiness
Top 20 hiện đủ tốt để:
- tiếp tục QA
- review consistency
- dùng làm source cho HSK5 Focus Mode prototype

### App prototype readiness
Top 20 hiện đủ tốt để:
- hiện trong app ở chế độ internal / test mode
- thử flashcard
- thử quiz meaning / cloze / collocation / synonym

### Public production readiness
Top 20 chưa nên coi là final public content nếu chưa:
- reference check
- consistency QA lần cuối
- split display vs source usage thật rõ

---

## 3. Rule chốt trước khi đưa vào app
### Rule 1
`meaning_vi` luôn để nghĩa phổ biến nhất trước.

### Rule 2
Không lạm dụng dấu `;` nếu không cần.

### Rule 3
Giữ long note trong source/docs.

### Rule 4
Dùng `app_note_vi` và `app_synonym_note_vi` cho mobile display.

### Rule 5
Giữ `needs_reference_check = true` cho đến khi cross-check xong.

---

## 4. Khi nào ready update lên app?
### Ready for internal prototype
Khi:
- schema đúng
- app_display fields có đủ
- quiz prompts usable
- no obvious content mismatch

### Ready for public beta content
Khi thêm 3 điều kiện:
- reference cross-check xong
- common mistakes được QA lại
- collocation chọn ra 2 field hiển thị tốt nhất trong app

---

## 5. Recommendation
### Nên làm ngay
- đưa top 20 vào app theo mode internal / hidden / prototype

### Chưa nên làm ngay
- public top 20 này như final HSK5 release set

---

## 6. Next best step
Sau note này, Vesper khuyên:
1. tạo file app-ready JSON import cho top 20
2. hoặc enrich tiếp 21–30
3. hoặc gắn top 20 vào HSK5 Focus Mode prototype
