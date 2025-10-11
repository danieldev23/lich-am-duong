# 📚 Chỉ Mục Tài Liệu - Lịch Việt Nam

Hướng dẫn đầy đủ để hiểu và làm việc với dự án này.

---

## 📖 Cấu Trúc Tài Liệu

Dự án này có tài liệu toàn diện được tổ chức thành các file khác nhau:

### 1. **README.vi.md** - Tài Liệu Chính
> **Bắt đầu ở đây!** Tổng quan đầy đủ về dự án.

**Nội dung:**
- ✨ Tổng quan tính năng
- 🛠️ Công nghệ sử dụng
- 🏗️ Sơ đồ kiến trúc
- 🚀 Hướng dẫn cài đặt từng bước
- 📁 Cấu trúc dự án
- 📡 Tài liệu API
- 🗄️ Cấu trúc database
- 🎨 Hướng dẫn components
- 🔐 Hướng dẫn xác thực
- 🚢 Hướng dẫn triển khai
- 🐛 Xử lý sự cố

**Phù hợp cho:** Hiểu toàn bộ dự án, tài liệu tham khảo

---

### 2. **QUICK_START.vi.md** - Thiết Lập 5 Phút
> **Cho người vội!** Chạy nhanh.

**Nội dung:**
- ⚡ Cài đặt 5 phút
- 🔑 Thông tin đăng nhập mặc định
- 🛠️ Lệnh thường dùng
- ✅ Danh sách kiểm tra
- 💡 Mẹo chuyên nghiệp

**Phù hợp cho:** Bắt đầu nhanh, thiết lập lần đầu

---

### 3. **HUONG_DAN.md** - Tìm Hiểu Kỹ Thuật Sâu
> **Cho developers!** Hiểu CÁCH hoạt động.

**Nội dung:**
- 🏗️ Quyết định kiến trúc
- 🧮 Thuật toán lịch âm
- 🎨 Các pattern component
- 📡 Triết lý thiết kế API
- 🔐 Triển khai xác thực
- 📧 Chi tiết tích hợp email
- 💾 Quản lý state
- 🎯 Best practices

**Phù hợp cho:** Hiểu chi tiết triển khai, học khái niệm nâng cao

---

## 🎯 Chọn Lộ Trình Của Bạn

### Lộ Trình 1: "Tôi chỉ muốn chạy được" 🏃‍♂️

```
QUICK_START.vi.md → Test ứng dụng → Xong!
```

**Thời gian:** 5-10 phút

---

### Lộ Trình 2: "Tôi muốn sử dụng và tùy chỉnh" 🎨

```
1. QUICK_START.vi.md     → Chạy được
2. README.vi.md          → Hiểu tính năng
3. Tùy chỉnh configs     → Làm theo ý mình
4. Triển khai            → Lên production
```

**Thời gian:** 1-2 giờ

---

### Lộ Trình 3: "Tôi muốn hiểu mọi thứ" 🧠

```
1. README.vi.md (Tổng quan)      → Bức tranh toàn cảnh
2. QUICK_START.vi.md             → Thiết lập local
3. HUONG_DAN.md                  → Tìm hiểu sâu
4. Khám phá codebase             → Học các pattern
5. Xây dựng tính năng riêng      → Master nó
```

**Thời gian:** 1-2 tuần

---

### Lộ Trình 4: "Tôi đang debug lỗi" 🐛

```
1. README.vi.md → Phần Xử lý sự cố
2. Kiểm tra lỗi console
3. Test APIs tại /test-admin
4. Xem HUONG_DAN.md → Phần liên quan
5. Mở GitHub issue nếu bị kẹt
```

**Thời gian:** Tùy thuộc

---

## 📂 Hướng Dẫn Tham Khảo File

### File Cấu Hình

| File | Mục Đích | Khi Nào Sửa |
|------|----------|-------------|
| `.env` | Biến môi trường | Luôn luôn (không trong git) |
| `env.example` | Template cho .env | Khi thêm biến env mới |
| `package.json` | Dependencies | Khi thêm packages |
| `tsconfig.json` | Cấu hình TypeScript | Hiếm khi |
| `tailwind.config.ts` | Cấu hình Tailwind | Cho màu/theme tùy chỉnh |
| `next.config.js` | Cấu hình Next.js | Cho cài đặt Next.js tùy chỉnh |
| `prisma/schema.prisma` | Schema database | Khi thay đổi cấu trúc DB |

### File Logic Chính

| File | Mục Đích | Độ Phức Tạp |
|------|----------|-------------|
| `src/lib/lunar-calendar.ts` | Tính toán âm lịch | 🔴 Phức tạp |
| `src/lib/constants.ts` | Dữ liệu tĩnh | 🟢 Đơn giản |
| `src/lib/auth.ts` | Cấu hình auth | 🟡 Trung bình |
| `src/lib/store.ts` | Quản lý state | 🟢 Đơn giản |
| `src/lib/utils.ts` | Hàm tiện ích | 🟢 Đơn giản |

### Components Chính

| File | Mục Đích | Dependencies |
|------|----------|--------------|
| `src/components/Header.tsx` | Header toàn cục | useSettings |
| `src/components/TodayDisplay.tsx` | Thông tin hôm nay | lunar-calendar |
| `src/components/MonthlyCalendar.tsx` | Lưới lịch | lunar-calendar, store |
| `src/components/ReminderForm.tsx` | Tạo nhắc nhở | useSettings |
| `src/components/UpcomingEvents.tsx` | Danh sách sự kiện | useEvents |

### API Routes

| Route | Loại | Cần Auth |
|-------|------|----------|
| `/api/events` | Công khai | ❌ Không |
| `/api/settings` | Công khai | ❌ Không |
| `/api/reminders` | Công khai | ❌ Không |
| `/api/admin/*` | Bảo mật | ✅ Có (Admin) |

---

## 🗺️ Sơ Đồ Khái Niệm

```
Dự Án Lịch Việt Nam
│
├── Frontend (Next.js)
│   ├── Trang (App Router)
│   ├── Components (React)
│   ├── Hooks (Custom)
│   └── State (Zustand)
│
├── Backend (API Routes)
│   ├── Public APIs
│   ├── Admin APIs (Bảo mật)
│   └── Xác thực (NextAuth)
│
├── Database (MySQL + Prisma)
│   ├── Users
│   ├── Events
│   └── Reminders
│
└── Dịch Vụ Ngoài
    └── Email (Nodemailer)
```

---

## 📊 Lộ Trình Học

### Tuần 1: Thiết Lập & Cơ Bản
- [ ] Đọc QUICK_START.vi.md
- [ ] Cài đặt và chạy local
- [ ] Khám phá tất cả trang
- [ ] Thử tất cả tính năng
- [ ] Test bảng quản trị

### Tuần 2: Hiểu Biết
- [ ] Đọc README.vi.md đầy đủ
- [ ] Hiểu cấu trúc dự án
- [ ] Xem tài liệu API
- [ ] Test APIs với Postman/curl
- [ ] Nghiên cứu schema database

### Tuần 3: Tìm Hiểu Sâu
- [ ] Đọc HUONG_DAN.md
- [ ] Nghiên cứu thuật toán lịch âm
- [ ] Hiểu luồng auth
- [ ] Học các pattern component
- [ ] Xem quản lý state

### Tuần 4: Tùy Chỉnh
- [ ] Thêm sự kiện tùy chỉnh
- [ ] Điều chỉnh styling
- [ ] Tạo tính năng mới
- [ ] Viết tests
- [ ] Triển khai lên production

---

## 🔍 Tra Cứu Nhanh

### "Làm thế nào để...?"

| Câu Hỏi | Vị Trí Trả Lời |
|---------|----------------|
| Cài đặt dự án? | QUICK_START.vi.md → Cài Đặt |
| Hiểu kiến trúc? | README.vi.md → Kiến Trúc |
| Thêm API route mới? | README.vi.md → Hướng Dẫn Phát Triển |
| Sửa lỗi hydration? | README.vi.md → Xử Lý Sự Cố |
| Triển khai lên Vercel? | README.vi.md → Triển Khai |
| Hiểu tính toán âm lịch? | HUONG_DAN.md → Lịch Âm |
| Thêm xác thực? | HUONG_DAN.md → Xác Thực |
| Gửi email? | HUONG_DAN.md → Tích Hợp Email |
| Quản lý state? | HUONG_DAN.md → Quản Lý State |
| Style components? | HUONG_DAN.md → Styling & UI |

---

## 🎓 Giá Trị Giáo Dục

Dự án này tuyệt vời để học:

### Frontend
- ✅ Next.js 14 App Router
- ✅ React Server Components
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Quản lý state với Zustand
- ✅ Custom React hooks

### Backend
- ✅ Next.js API Routes
- ✅ Thiết kế RESTful API
- ✅ Xác thực với NextAuth
- ✅ Database với Prisma ORM
- ✅ Tích hợp email

### DevOps
- ✅ Cấu hình môi trường
- ✅ Database migrations
- ✅ Chiến lược triển khai
- ✅ Xử lý lỗi
- ✅ Kỹ thuật debugging

---

## 🆘 Nhận Trợ Giúp

### Tự Giúp Mình (Thử trước)
1. Tìm kiếm trong tài liệu này
2. Kiểm tra phần Xử lý sự cố
3. Xem xét kỹ thông báo lỗi
4. Test APIs tại `/test-admin`
5. Dùng browser DevTools

### Trợ Giúp Cộng Đồng
1. GitHub Issues
2. GitHub Discussions
3. Stack Overflow (tag: nextjs, prisma)

### Phản Hồi Tài Liệu
Tìm thấy lỗi? Tài liệu không rõ ràng?
- Mở issue
- Gửi PR
- Liên hệ người maintain

---

## 📝 Tiêu Chuẩn Tài Liệu

Dự án này tuân theo các nguyên tắc tài liệu:

1. **Cấu Trúc Rõ Ràng**: Dễ điều hướng
2. **Nhiều Cấp Độ**: Từ quick start đến deep dive
3. **Ví Dụ Code**: Show, đừng chỉ nói
4. **Hỗ Trợ Trực Quan**: Sơ đồ và bảng
5. **Cập Nhật**: Đồng bộ với code
6. **Thực Tế**: Ví dụ thực tế

---

## 💼 Cho Các Vai Trò Khác Nhau

### Developers
- Bắt đầu: HUONG_DAN.md
- Tập trung: Kiến trúc, patterns, thuật toán
- Công cụ: Prisma Studio, DevTools

### Designers
- Bắt đầu: README.vi.md → Tính Năng
- Tập trung: Components, styling, UX
- Công cụ: Browser, Figma integration

### Project Managers
- Bắt đầu: README.vi.md → Tổng Quan
- Tập trung: Tính năng, timeline, triển khai
- Công cụ: GitHub Projects

### End Users
- Bắt đầu: QUICK_START.vi.md
- Tập trung: Tính năng, cách sử dụng
- Công cụ: Web browser

---

**Chúc học tốt! 📚✨**

*Tất cả tài liệu đều open source - đóng góp được hoan nghênh!*
