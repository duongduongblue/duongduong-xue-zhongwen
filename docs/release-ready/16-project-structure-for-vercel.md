# DuongDuong 学中文 — Project Structure for Vercel

## Mục tiêu
Chốt cấu trúc project thật rõ để deploy Vercel dễ nhất.

---

## Cấu trúc Vesper khuyên dùng
### 1. Canonical deploy folder
`site/`

Trong đó:
- `site/landing.html` → landing page chính
- `site/preview.html` → preview page chính

### 2. App web build output
`dist/`

Trong đó sau khi build sẽ có:
- `dist/index.html` → Expo web app
- `dist/landing.html` → landing page copy để public
- `dist/preview.html` → preview page copy để public

---

## Vì sao nên tách như vậy
### `site/`
Dùng làm nơi giữ **file public tĩnh chính thức** cho deploy.

### `docs/`
Giữ cho tài liệu, guide, copy, release notes.

### `dist/`
Chỉ là output build, không nên sửa tay trực tiếp.

---

## Chốt thư mục
### Landing
- source: `site/landing.html`
- public route: `/` và `/landing`

### Preview
- source: `site/preview.html`
- public route: `/preview`

### App web
- source build: Expo export
- public route: `/app`

---

## Chốt đường dẫn public
Sau khi deploy lên Vercel, bạn sẽ có:
- `/` → landing
- `/landing` → landing
- `/preview` → preview
- `/app` → app web

Ví dụ:
- `https://your-domain.vercel.app/`
- `https://your-domain.vercel.app/preview`
- `https://your-domain.vercel.app/app`

---

## Cách làm việc từ nay về sau
### Nếu sửa landing
sửa ở:
`site/landing.html`

### Nếu sửa preview
sửa ở:
`site/preview.html`

### Nếu sửa app
sửa ở:
- `src/`
- Expo app files

### Nếu build để deploy
chạy:
```bash
npm run build:web:vercel
```

---

## Nguyên tắc quan trọng
- không sửa tay trong `dist/`
- landing/preview chỉ sửa ở `site/`
- `docs/` dùng cho hướng dẫn/tài liệu
- `dist/` là output cuối để Vercel publish

---

## Kết luận
Để deploy Vercel dễ nhất, Vesper chốt structure chính thức là:
- `site/landing.html`
- `site/preview.html`
- `dist/index.html` (app web)
- public routes: `/`, `/landing`, `/preview`, `/app`
