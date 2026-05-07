# DuongDuong 学中文 — HSK1 Build-Ready Lesson List

_Last updated: 2026-05-06_

## Mục đích
Tài liệu này chuyển HSK1 curriculum thành dạng **build-ready** để có thể:
- nhập dữ liệu
- chia lesson trong app
- gắn quiz/review logic
- làm content QA

Tài liệu này nên được dùng cùng với:
- `docs/master-curriculum-hsk1-hsk5.md`

---

# 1. HSK1 build scope đề xuất
## Version public đầu tiên
Vesper khuyên chia 2 mức:

### A. MVP launch scope
- 6 lessons đầu
- khoảng 120–150 từ
- đủ để user học và test loop

### B. Full HSK1 beta scope
- 12 lessons
- khoảng 240–300 từ
- đủ để chứng minh product structure

---

# 2. Build-ready structure
Mỗi lesson nên có:
- lesson code
- module
- title VI
- title ZH
- short title UI
- goal
- target word count
- suggested grammar focus
- sample word set
- quiz focus
- review note

---

# 3. HSK1 Modules overview
## Module 1 — Survival Basics
- HSK1-M1-L1 Greetings & Politeness
- HSK1-M1-L2 Introducing Yourself
- HSK1-M1-L3 Basic Questions

## Module 2 — People & Daily Life
- HSK1-M2-L4 Family & People
- HSK1-M2-L5 School & Study
- HSK1-M2-L6 Food & Drink

## Module 3 — Numbers, Time & Movement
- HSK1-M3-L7 Numbers
- HSK1-M3-L8 Time & Date
- HSK1-M3-L9 Going Places

## Module 4 — Core Actions & Description
- HSK1-M4-L10 Common Actions
- HSK1-M4-L11 Everyday Descriptions
- HSK1-M4-L12 Simple Daily Situations

---

# 4. Detailed lesson list

## HSK1-M1-L1
### Title
- VI: Chào hỏi cơ bản
- ZH: 问候语
- UI short: Chào hỏi / 问候

### Goal
Người học biết chào, cảm ơn, xin lỗi, mời và tạm biệt trong các tình huống đơn giản.

### Target word count
20–25

### Grammar focus
- phrase usage
- politeness phrases
- sentence fragments in context

### Sample words
- 你好
- 谢谢
- 不客气
- 对不起
- 没关系
- 请
- 再见
- 喂

### Quiz focus
- phrase meaning
- situational recognition
- pinyin recall

### Review note
Đây là lesson mở đầu, cần có tỷ lệ nhớ cao và xuất hiện nhiều trong spaced review sớm.

---

## HSK1-M1-L2
### Title
- VI: Giới thiệu bản thân
- ZH: 自我介绍
- UI short: Giới thiệu / 介绍

### Goal
Người học biết nói tôi là ai, tên gì, người khác là ai.

### Target word count
20–25

### Grammar focus
- 是
- 叫
- basic pronouns

### Sample words
- 我
- 你
- 他
- 她
- 我们
- 名字
- 叫
- 是
- 中国
- 学生
- 老师

### Quiz focus
- pronoun recognition
- pinyin
- matching sentence meaning

### Review note
Nên ưu tiên kết hợp mẫu câu ngắn thay vì chỉ học từ đơn lẻ.

---

## HSK1-M1-L3
### Title
- VI: Hỏi đáp cơ bản
- ZH: 基本问答
- UI short: Hỏi đáp / 提问

### Goal
Người học biết hỏi cơ bản: cái gì, ai, đâu, mấy, bao nhiêu.

### Target word count
20–25

### Grammar focus
- 什么
- 谁
- 哪
- 几
- 多少
- 吗 / 呢

### Sample words
- 什么
- 谁
- 哪
- 几
- 多少
- 这
- 那
- 吗
- 呢

### Quiz focus
- question word usage
- fill blank
- sentence comprehension

### Review note
Lesson này nên có quiz ngữ cảnh mạnh hơn learn-by-meaning thuần túy.

---

## HSK1-M2-L4
### Title
- VI: Gia đình và người thân
- ZH: 家庭
- UI short: Gia đình / 家庭

### Goal
Người học biết giới thiệu người thân, bạn bè và nói về nhà.

### Target word count
20–25

### Grammar focus
- possession basics
- pronouns in family context

### Sample words
- 家
- 妈妈
- 爸爸
- 朋友
- 人
- 我们

### Quiz focus
- family vocab recognition
- simple relation matching
- sentence meaning

### Review note
Nên dùng ví dụ ngắn và gần với tự giới thiệu để kết nối với lesson 2.

---

## HSK1-M2-L5
### Title
- VI: Trường lớp và học tập
- ZH: 学校
- UI short: Trường lớp / 学校

### Goal
Người học biết nói về trường học, sách vở, học tập và giáo viên.

### Target word count
20–25

### Grammar focus
- 在 in light context
- 学习 / 读 / 写 / 听 / 说 in simple patterns

### Sample words
- 学校
- 学生
- 老师
- 书
- 汉语
- 学习
- 写
- 读
- 听
- 说

### Quiz focus
- action + object matching
- school context recognition
- pinyin/hanzi recall

### Review note
Lesson này rất quan trọng để shape app identity vì app là learning product.

---

## HSK1-M2-L6
### Title
- VI: Ăn uống hằng ngày
- ZH: 吃喝
- UI short: Ăn uống / 饮食

### Goal
Người học biết nói muốn ăn/uống gì và nhận diện từ cơ bản về đồ ăn, thức uống.

### Target word count
25–30

### Grammar focus
- 想
- 吃 / 喝
- basic object pattern

### Sample words
- 水
- 茶
- 饭
- 苹果
- 吃
- 喝
- 想

### Quiz focus
- food/drink meaning
- sentence choice
- daily context mini dialogue

### Review note
Đây là lesson nên được demo trong landing/preview vì rất đời thường và trực quan.

---

## HSK1-M3-L7
### Title
- VI: Số đếm cơ bản
- ZH: 数字
- UI short: Số đếm / 数字

### Goal
Người học nhận diện và dùng được số 1–10 và khái niệm số lượng rất cơ bản.

### Target word count
15–20

### Grammar focus
- counting
- quantity basics

### Sample words
- 一
- 二
- 三
- 四
- 五
- 六
- 七
- 八
- 九
- 十

### Quiz focus
- order
- recognition
- quantity meaning

### Review note
Lesson này nên có chế độ quiz đặc thù theo number recognition để tăng tốc học.

---

## HSK1-M3-L8
### Title
- VI: Thời gian và lịch
- ZH: 时间
- UI short: Thời gian / 时间

### Goal
Người học biết nói hôm nay, ngày mai, hôm qua, giờ và đơn vị thời gian cơ bản.

### Target word count
20–25

### Grammar focus
- time expressions
- date/time phrases

### Sample words
- 今天
- 明天
- 昨天
- 现在
- 点
- 分钟
- 月
- 日
- 星期

### Quiz focus
- time recognition
- fill blank
- practical sentence meaning

### Review note
Lesson này nên bám theo use case lịch học / giờ học để phù hợp app learning.

---

## HSK1-M3-L9
### Title
- VI: Đi lại và nơi chốn
- ZH: 出行
- UI short: Di chuyển / 出行

### Goal
Người học biết nói đi đâu, đến đâu, về nhà, ở đâu và một vài phương tiện cơ bản.

### Target word count
20–25

### Grammar focus
- 去 / 来 / 回 / 住

### Sample words
- 去
- 来
- 回
- 住
- 车
- 出租车
- 飞机
- 门
- 医院
- 商店

### Quiz focus
- movement verbs
- place recognition
- simple transport context

### Review note
Lesson này phù hợp để nối về sau với HSK2 travel/directions.

---

## HSK1-M4-L10
### Title
- VI: Hành động cơ bản
- ZH: 基本动作
- UI short: Hành động / 动作

### Goal
Người học biết mô tả các hành động cơ bản trong đời sống.

### Target word count
20–25

### Grammar focus
- verb usage in short patterns
- can/do/want light usage

### Sample words
- 看
- 听
- 说
- 写
- 买
- 开
- 坐
- 工作
- 会
- 能

### Quiz focus
- action recognition
- sentence completion
- pinyin recall

### Review note
Dù đây là hành động/verb, user-facing phải vẫn hiểu đây là lesson dùng trong đời sống, không phải bài ngữ pháp khô.

---

## HSK1-M4-L11
### Title
- VI: Mô tả cơ bản
- ZH: 基本描述
- UI short: Mô tả / 描述

### Goal
Người học biết dùng tính từ phổ biến để mô tả người, vật, cảm giác, thời tiết.

### Target word count
20–25

### Grammar focus
- 很 + adjective
- contrast pairs

### Sample words
- 大
- 小
- 多
- 少
- 好
- 冷
- 热
- 忙
- 累
- 高兴

### Quiz focus
- meaning recognition
- contrast pairs
- sentence context

### Review note
Lesson này nên xuất hiện sau khi user đã có vốn danh từ/động từ cơ bản để mô tả có ý nghĩa hơn.

---

## HSK1-M4-L12
### Title
- VI: Tình huống hằng ngày
- ZH: 日常情景
- UI short: Tình huống / 情景

### Goal
Ôn lại HSK1 qua các tình huống trộn: chào hỏi, gia đình, trường lớp, ăn uống, giờ giấc, đi lại.

### Target word count
Mixed review

### Grammar focus
- mixed lesson review

### Sample contexts
- gặp người mới
- vào lớp học
- ăn uống đơn giản
- hỏi giờ
- nói muốn đi đâu

### Quiz focus
- mixed review
- situational choice
- dialogue completion

### Review note
Lesson này nên là lesson khóa cuối module HSK1 để gom review và test practical recall.

---

# 5. Suggested release plan
## HSK1 public MVP
### Release 1
- HSK1-M1-L1
- HSK1-M1-L2
- HSK1-M1-L3
- HSK1-M2-L4
- HSK1-M2-L5
- HSK1-M2-L6

### Why
6 lesson đầu đủ để user hiểu:
- app dạy gì
- app có cấu trúc ra sao
- app có đáng quay lại không

---

## HSK1 beta expansion
### Release 2
- thêm HSK1-M3-L7
- HSK1-M3-L8
- HSK1-M3-L9

### Release 3
- thêm HSK1-M4-L10
- HSK1-M4-L11
- HSK1-M4-L12

---

# 6. UI notes for lesson display
## User-facing pills
Không hiển thị:
- Bài 1
- Bài 2
- Bài thêm

Nên hiển thị:
- Chào hỏi / 问候
- Giới thiệu / 介绍
- Hỏi đáp / 提问
- Gia đình / 家庭
- Trường lớp / 学校
- Ăn uống / 饮食
...

## Lesson detail card
Nên hiển thị:
- lesson title VI
- lesson title ZH
- goal ngắn
- số từ trong lesson

---

# 7. Build-ready next docs
Sau file này, Vesper khuyên làm tiếp:
1. HSK1 dataset template (JSON/CSV)
2. HSK1 lesson-to-word mapping sheet
3. HSK1 quiz focus template
4. HSK1 content QA checklist
