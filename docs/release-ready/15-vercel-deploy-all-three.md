# DuongDuong 学中文 — Vercel Deploy Guide (Landing + Preview + App Web)

## Mục tiêu
Deploy cùng lúc 3 thứ trên Vercel:
1. **Landing page**
2. **Preview page**
3. **App web**

---

## Vesper đã sắp route sẵn cho bạn
Sau khi deploy thành công, structure sẽ là:

- `/` → landing page
- `/landing` → landing page
- `/preview` → preview page
- `/app` → Expo web app

---

## File đã chuẩn bị sẵn
- `vercel.json`
- `scripts/prepare-vercel-dist.js`
- `package.json` script `build:web:vercel`

---

## Trước khi deploy
### Bước 1
Đảm bảo bạn đang ở thư mục:
```bash
cd chinese-learning-app
```

### Bước 2
Chạy build local để kiểm tra:
```bash
npm install
npm run build:web:vercel
```

### Bước 3
Sau khi chạy xong, kiểm tra thư mục `dist` có:
- `index.html` → app web
- `landing.html` → landing page
- `preview.html` → preview page

---

## Cách deploy bằng GitHub + Vercel
### Bước 1 — Up project lên GitHub
- tạo repo mới trên GitHub
- push toàn bộ folder `chinese-learning-app`

### Bước 2 — Vào Vercel
- đăng nhập Vercel
- chọn **Add New Project**
- import repo GitHub của bạn

### Bước 3 — Chọn root directory đúng
Nếu repo chứa nhiều folder, hãy chọn đúng root là:
- `chinese-learning-app`

### Bước 4 — Vercel sẽ tự đọc
- `vercel.json`
- `build:web:vercel`
- `dist`

Thông thường bạn không cần chỉnh nhiều nếu root directory đúng.

### Bước 5 — Bấm Deploy
Chờ build xong.

---

## Sau khi deploy
Test các đường dẫn:
- yourdomain.vercel.app/
- yourdomain.vercel.app/landing
- yourdomain.vercel.app/preview
- yourdomain.vercel.app/app

---

## Nếu có lỗi
### Lỗi 1 — Build fail vì thiếu package
Chạy local trước:
```bash
npm install
npm run build:web:vercel
```

### Lỗi 2 — Vercel build đúng nhưng route sai
Kiểm tra lại:
- `vercel.json`
- root directory đã chọn đúng chưa

### Lỗi 3 — Landing/preview không hiện
Kiểm tra local build xem `dist/landing.html` và `dist/preview.html` có được tạo không.

---

## Khuyến nghị thực tế
### Public đầu tiên nên share link nào?
Vesper khuyên share:
- `/` để giới thiệu
- `/app` cho người muốn dùng thử

### Preview dùng khi nào?
- khi present
- khi muốn show concept/UI
- khi chưa muốn user đi thẳng vào app

---

## Câu chốt
Nếu bạn muốn deploy cả landing + preview + app web theo cách dễ nhất cho non-tech founder,
**GitHub + Vercel với cấu hình hiện tại là đường đi phù hợp nhất.**
