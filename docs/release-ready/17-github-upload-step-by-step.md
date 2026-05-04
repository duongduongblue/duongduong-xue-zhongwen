# DuongDuong 学中文 — Hướng dẫn up GitHub từng link, từng file, từng bước

_Last updated: 2026-05-04_

## Mục tiêu
Đưa project `chinese-learning-app` lên GitHub theo cách dễ nhất cho người non-tech.

---

# PHẦN 1 — Bạn sẽ up folder nào?
## Chỉ up folder này
`chinese-learning-app`

## Không cần up cả workspace
Bạn không cần up toàn bộ:
- `duong-hr`
- các folder HR khác
- các project khác trong workspace

Chỉ cần đúng project này là đủ.

---

# PHẦN 2 — Các link bạn cần mở
## 1. GitHub homepage
https://github.com/

## 2. Tạo repo mới trên GitHub
https://github.com/new

## 3. Nếu sau này cần tải Git
https://git-scm.com/downloads

## 4. Nếu cần tạo tài khoản GitHub
https://github.com/signup

---

# PHẦN 3 — Những file quan trọng đã sẵn trong project
## File cấu hình an toàn để push
- `.gitignore`

## File deploy Vercel
- `vercel.json`
- `eas.json`
- `scripts/prepare-vercel-dist.js`

## File public quan trọng
- `site/landing.html`
- `site/preview.html`

## File app
- `src/`
- `App.tsx`
- `app.json`
- `package.json`

## File docs quan trọng
- `README.md`
- `docs/release-ready/`

---

# PHẦN 4 — Bước 1: Tạo repo GitHub
## Mở link
https://github.com/new

## Điền như sau
### Repository name
`duongduong-xue-zhongwen`

### Description
`Soft Chinese vocabulary learning app demo`

### Public hay Private?
- Chọn **Private** nếu bạn chưa muốn public ngay
- Chọn **Public** nếu bạn muốn dễ nối Vercel và share demo

## Rất quan trọng
**KHÔNG tick** các ô sau:
- Add a README file
- Add .gitignore
- Choose a license

## Sau đó bấm
**Create repository**

---

# PHẦN 5 — Bước 2: Mở terminal đúng thư mục
## Trong terminal, chạy:
```bash
cd C:\Users\sipher\.vesper\workspaces\duong-hr\chinese-learning-app
```

## Hoặc nếu bạn đang ở workspace rồi:
```bash
cd chinese-learning-app
```

---

# PHẦN 6 — Bước 3: Kiểm tra Git
## Chạy:
```bash
git status
```

## Nếu thấy lỗi:
`not a git repository`
Thì bình thường, qua bước tiếp theo.

---

# PHẦN 7 — Bước 4: Khởi tạo Git repo local
## Chạy:
```bash
git init
```

## Sau đó chạy lại:
```bash
git status
```

---

# PHẦN 8 — Bước 5: Kiểm tra file trước khi add
## Chạy:
```bash
git status
```

## Bạn nên thấy các file project, nhưng KHÔNG nên thấy:
- `node_modules/`
- `dist/`
- `.expo/`
- `.env`

Nếu không thấy các file này, nghĩa là `.gitignore` đang hoạt động ổn.

---

# PHẦN 9 — Bước 6: Add file vào Git
## Chạy:
```bash
git add .
```

## Kiểm tra lại:
```bash
git status
```

## Mục tiêu
Bạn sẽ thấy danh sách file chuẩn bị commit.

---

# PHẦN 10 — Bước 7: Commit lần đầu
## Chạy:
```bash
git commit -m "Initial commit for DuongDuong 学中文"
```

Nếu commit thành công, bạn đã xong phần local.

---

# PHẦN 11 — Bước 8: Copy link repo GitHub
Sau khi tạo repo trên GitHub, bạn sẽ thấy URL giống như:

```bash
https://github.com/YOUR-USERNAME/duongduong-xue-zhongwen.git
```

## Hãy copy link đó.

---

# PHẦN 12 — Bước 9: Nối local repo với GitHub repo
## Chạy:
```bash
git remote add origin https://github.com/YOUR-USERNAME/duongduong-xue-zhongwen.git
```

## Nhớ thay:
`YOUR-USERNAME`
bằng username GitHub thật của bạn.

---

# PHẦN 13 — Bước 10: Đẩy code lên GitHub
## Chạy:
```bash
git branch -M main
git push -u origin main
```

---

# PHẦN 14 — Nếu GitHub yêu cầu đăng nhập
## Trường hợp thường gặp
GitHub có thể mở browser để bạn đăng nhập.

## Nếu hỏi password mà không nhận
GitHub thường không dùng password tài khoản thường nữa.
Khi đó bạn có thể cần:
- đăng nhập qua browser
- hoặc dùng Personal Access Token

Nếu tới bước này bị kẹt, chụp lỗi/paste lỗi cho Vesper.

---

# PHẦN 15 — Sau khi push xong
## Mở lại repo GitHub của bạn
Ví dụ:
https://github.com/YOUR-USERNAME/duongduong-xue-zhongwen

## Kiểm tra xem đã có các file chưa
### Nên có:
- `README.md`
- `app.json`
- `package.json`
- `src/`
- `site/`
- `docs/`
- `scripts/`
- `vercel.json`

### Không nên có:
- `node_modules/`
- `dist/`
- `.expo/`

---

# PHẦN 16 — Lệnh đầy đủ nếu bạn muốn copy 1 lần
```bash
cd C:\Users\sipher\.vesper\workspaces\duong-hr\chinese-learning-app
git init
git status
git add .
git status
git commit -m "Initial commit for DuongDuong 学中文"
git remote add origin https://github.com/YOUR-USERNAME/duongduong-xue-zhongwen.git
git branch -M main
git push -u origin main
```

---

# PHẦN 17 — Checklist cuối cùng trước khi push
- [ ] Đã tạo repo GitHub
- [ ] Đã vào đúng folder `chinese-learning-app`
- [ ] `git status` không thấy `node_modules/`
- [ ] `git add .` thành công
- [ ] `git commit` thành công
- [ ] Đã copy đúng link repo GitHub
- [ ] `git push -u origin main` thành công

---

# PHẦN 18 — Sau GitHub là gì?
Sau khi push GitHub xong, bước tiếp theo là:

## Nối với Vercel
Bạn sẽ import repo này vào Vercel để public các route:
- `/`
- `/landing`
- `/preview`
- `/app`

---

# PHẦN 19 — Nếu bạn muốn ít thao tác hơn nữa
Bạn có thể gửi lại cho Vesper 1 trong 3 thứ:
- ảnh chụp màn hình repo GitHub mới tạo
- link repo GitHub
- lỗi terminal khi `git push`

Vesper sẽ hướng dẫn bạn bước tiếp theo rất cụ thể.
