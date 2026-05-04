# DuongDuong 学中文 — Priority Backlog with Acceptance Criteria

## Cách dùng file này
- P0 = phải có trước khi public beta
- P1 = nên có trước khi public rộng hơn
- P2 = để sau

---

# P0 — Must before public beta

## P0.1 Home screen rõ việc cần làm
### Mục tiêu
User mở app biết ngay hôm nay nên làm gì.

### Tasks
- hiển thị current lesson
- hiển thị words due today
- hiển thị streak
- có CTA bắt đầu học / ôn ngay

### Acceptance criteria
- user vào Home trong 5 giây hiểu được nên bấm gì
- có ít nhất 2 CTA rõ ràng
- không có state trống khó hiểu

---

## P0.2 Lesson flow ổn định
### Tasks
- lesson title rõ
- lesson có số thứ tự
- next / previous ổn định
- nội dung card không vỡ layout

### Acceptance criteria
- chuyển lesson không lỗi
- chuyển từ không lỗi
- text không bị tràn xấu trên mobile thường

---

## P0.3 Flashcard flow usable
### Tasks
- lật thẻ ổn
- biết / không biết hoạt động đúng
- update progress đúng

### Acceptance criteria
- user bấm 10 thẻ liên tiếp không gặp lỗi
- từ “không biết” được đưa vào review list
- từ “biết rồi” không tiếp tục spam lại ngay

---

## P0.4 Quiz flow usable
### Tasks
- quiz bám theo lesson
- answer selection rõ
- correct/wrong feedback rõ
- restart quiz được

### Acceptance criteria
- mỗi lesson có ít nhất 5–10 câu usable
- sau khi làm quiz có result screen
- không crash khi làm hết quiz

---

## P0.5 Progress screen cơ bản
### Tasks
- learned words
- review words
- streak
- accuracy

### Acceptance criteria
- progress screen mở được ổn định
- số liệu hiển thị nhất quán với hành động cơ bản
- có empty state nếu chưa học gì

---

## P0.6 Content QA round 1
### Tasks
- rà 30–100 từ đầu tiên
- rà pinyin
- rà nghĩa
- rà ví dụ
- rà tags/lesson grouping

### Acceptance criteria
- không có lỗi pinyin obvious
- ví dụ không quá khó so với HSK1
- không có từ lạc level rõ ràng

---

## P0.7 Public landing page
### Tasks
- landing page rõ positioning
- có preview
- có CTA xem demo
- có short FAQ

### Acceptance criteria
- người lạ nhìn landing hiểu app là gì trong 10 giây
- có ít nhất 1 link dẫn tới preview/demo

---

## P0.8 Basic legal pages
### Tasks
- privacy policy cơ bản
- terms of use cơ bản

### Acceptance criteria
- có file public để dẫn link
- nội dung nói rõ dữ liệu local-first/basic usage

---

# P1 — Strong before wider release

## P1.1 Onboarding
### Acceptance criteria
- user chọn level
- user chọn daily goal
- app không yêu cầu quá nhiều input

## P1.2 Search + word detail
### Acceptance criteria
- search được theo hanzi/pinyin/meaning cơ bản
- mở chi tiết từ được

## P1.3 Saved words deck
### Acceptance criteria
- bookmark lưu đúng
- review bookmarked words được

## P1.4 Weak words section
### Acceptance criteria
- có danh sách từ sai nhiều
- user có thể ôn riêng

## P1.5 Tone-colored pinyin
### Acceptance criteria
- hiển thị rõ từng tone
- không làm UI rối

## P1.6 Better reminder / re-entry
### Acceptance criteria
- user quay lại biết nên học gì tiếp
- continue learning state rõ

---

# P2 — Later
- audio pronunciation
- grammar notes
- mini reading
- custom lists
- cloud sync
- AI review
- HSK2+
