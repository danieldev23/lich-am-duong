# 📅 Lịch Việt Nam - Ứng Dụng Lịch Âm Việt Nam

> Ứng dụng lịch âm Việt Nam toàn diện được xây dựng với Next.js 14, bao gồm chuyển đổi âm dương lịch, quản lý sự kiện, nhắc nhở qua email, và thông tin lịch truyền thống Việt Nam với bảng quản trị.

**Demo Trực Tuyến**: [URL deployment của bạn]  
**Công Nghệ**: Next.js 14 + TypeScript + Tailwind CSS + Prisma + MySQL + NextAuth

---

## 📖 Mục Lục

- [Tổng Quan](#-tổng-quan)
- [Tính Năng](#-tính-năng)
- [Công Nghệ Sử Dụng](#️-công-nghệ-sử-dụng)
- [Kiến Trúc](#️-kiến-trúc)
- [Bắt Đầu](#-bắt-đầu)
- [Cấu Trúc Dự Án](#-cấu-trúc-dự-án)
- [Khái Niệm Cốt Lõi](#-khái-niệm-cốt-lõi)
- [Tài Liệu API](#-tài-liệu-api)
- [Cấu Trúc Database](#️-cấu-trúc-database)
- [Hướng Dẫn Components](#-hướng-dẫn-components)
- [Hooks & Quản Lý State](#hooks--quản-lý-state)
- [Xác Thực & Phân Quyền](#-xác-thực--phân-quyền)
- [Tích Hợp Email](#-tích-hợp-email)
- [Triển Khai](#-triển-khai)
- [Hướng Dẫn Phát Triển](#️-hướng-dẫn-phát-triển)
- [Xử Lý Sự Cố](#-xử-lý-sự-cố)

---

## 🎯 Tổng Quan

Lịch Việt Nam là ứng dụng web hiện đại mang lịch âm truyền thống Việt Nam vào kỷ nguyên số. Ứng dụng cung cấp chuyển đổi âm dương lịch chính xác, theo dõi các ngày lễ và sự kiện văn hóa Việt Nam, quản lý nhắc nhở cá nhân với thông báo email, và bao gồm bảng quản trị toàn diện để quản lý nội dung.

## ✨ Tính Năng

### 🌟 Tính Năng Người Dùng

| Tính Năng | Mô Tả | Trang |
|-----------|-------|-------|
| **Hiển Thị Hôm Nay** | Ngày hiện tại với thông tin âm lịch, Can Chi, Tiết Khí, Trực, Giờ Hoàng Đạo | `/` (Trang chủ) |
| **Lịch Tháng** | Lịch tương tác với ngày âm lịch, sự kiện, danh sách ngày lễ | `/calendar` |
| **Lịch Năm** | Tổng quan 12 tháng, click để xem chi tiết, sự kiện cả năm | `/yearly` |
| **Chuyển Đổi Lịch** | Chuyển đổi giữa dương lịch ↔ âm lịch | `/converter` |
| **Đếm Ngược Tết** | Đếm ngược thời gian thực đến Tết Nguyên Đán cùng truyền thống | `/countdown` |
| **Nhắc Nhở Sự Kiện** | Tạo nhắc nhở với thông báo email, sự kiện lặp lại | `/reminders` |
| **Sự Kiện Sắp Tới** | Sự kiện và ngày lễ trong 30 ngày tới | Sidebar trang chủ |
| **Câu Hỏi & Tính Năng** | Phần hỗ trợ và điểm nổi bật | Cuối trang chủ |

### ⚙️ Tính Năng Quản Trị

| Tính Năng | Mô Tả | Trang |
|-----------|-------|-------|
| **Quản Lý Sự Kiện** | Thao tác CRUD cho sự kiện (lịch sử, văn hóa, ngày lễ) | `/admin/events` |
| **Quản Lý Cài Đặt** | Cấu hình website, SEO, bật/tắt tính năng | `/admin/settings` |
| **Quản Lý Nhắc Nhở** | Xem và quản lý nhắc nhở người dùng | `/admin/reminders` |
| **Xác Thực** | Đăng nhập bảo mật với kiểm soát quyền truy cập theo vai trò | `/admin/login` |

## 🛠️ Công Nghệ Sử Dụng

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Ngôn Ngữ**: TypeScript
- **Styling**: Tailwind CSS v3
- **Icons**: Font Awesome
- **Quản Lý State**: Zustand (UI state), React Context (settings)
- **Forms**: React state + HTML5 validation

### Backend
- **Runtime**: Node.js (Serverless trên Vercel)
- **API**: Next.js API Routes
- **Database**: MySQL 8.0+
- **ORM**: Prisma 5.x
- **Xác Thực**: NextAuth.js v4
- **Mã Hóa Mật Khẩu**: bcryptjs

### Email & Thông Báo
- **Dịch Vụ Email**: Nodemailer (Gmail SMTP)
- **Templates**: HTML email templates

### Công Cụ Phát Triển
- **Package Manager**: Yarn / npm
- **Linting**: ESLint
- **Code Formatting**: Prettier (tùy chọn)
- **Version Control**: Git

---

## 🏗️ Kiến Trúc

```
┌─────────────────────────────────────────────────────────┐
│                    Client (Trình duyệt)                  │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐ │
│  │   Trang     │  │  Components  │  │  Hooks/Utils  │ │
│  └─────────────┘  └──────────────┘  └───────────────┘ │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP/HTTPS
┌──────────────────────┴──────────────────────────────────┐
│            Next.js Server (Vercel)                       │
│  ┌─────────────────────────────────────────────────┐   │
│  │  API Routes                                      │   │
│  │  ├─ /api/events        (Công khai)             │   │
│  │  ├─ /api/settings      (Công khai)             │   │
│  │  ├─ /api/reminders     (Công khai)             │   │
│  │  └─ /api/admin/*       (Bảo mật)               │   │
│  └───────────────────┬─────────────────────────────┘   │
│                      │                                   │
│  ┌───────────────────┴─────────────────────────────┐   │
│  │  Middleware & Auth (NextAuth)                   │   │
│  └───────────────────┬─────────────────────────────┘   │
└────────────────────────┴───────────────────────────────┘
                       │
         ┌─────────────┴──────────────┐
         │                            │
┌────────┴────────┐        ┌─────────┴──────────┐
│  MySQL Database │        │  Dịch Vụ Email     │
│  (Prisma ORM)   │        │  (Nodemailer)      │
└─────────────────┘        └────────────────────┘
```

### Luồng Dữ Liệu

1. **Yêu Cầu Client** → Trình duyệt gửi HTTP request đến Next.js
2. **Xử Lý Server** → API routes xử lý logic nghiệp vụ
3. **Xác Thực** → NextAuth validates JWT tokens cho routes bảo mật
4. **Truy Vấn Database** → Prisma ORM query MySQL database
5. **Phản Hồi** → JSON data trả về cho client
6. **Email** → Nodemailer gửi email cho nhắc nhở (bất đồng bộ)

## 🚀 Bắt Đầu

### Yêu Cầu Hệ Thống

Trước khi bắt đầu, đảm bảo bạn đã cài đặt:

- **Node.js** 18.17 trở lên
- **MySQL** 8.0 trở lên (hoặc PlanetScale, AWS RDS)
- **Git** để quản lý phiên bản
- **Yarn** hoặc **npm** package manager

### Hướng Dẫn Cài Đặt Từng Bước

#### 1. Clone Repository

```bash
git clone <repository-url>
cd calendar-next
```

#### 2. Cài Đặt Dependencies

```bash
# Sử dụng Yarn (khuyến nghị)
yarn install

# Hoặc sử dụng npm
npm install
```

#### 3. Thiết Lập Biến Môi Trường

Tạo file `.env` trong thư mục gốc:

```bash
cp env.example .env
```

Chỉnh sửa `.env` với cấu hình của bạn:

```env
# Kết Nối Database
DATABASE_URL="mysql://username:password@localhost:3306/calendar_db"

# Cấu Hình NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-random-secret-key-here"

# Cấu Hình Email (cho nhắc nhở)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-gmail-app-password"
```

**Tạo NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

**Gmail App Password:**
1. Bật xác thực 2 yếu tố trên tài khoản Google
2. Truy cập: https://myaccount.google.com/apppasswords
3. Tạo App Password cho "Mail"
4. Sử dụng password đó cho `EMAIL_PASS`

#### 4. Thiết Lập MySQL Database

Tạo database MySQL mới:

```sql
CREATE DATABASE calendar_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### 5. Khởi Tạo Prisma & Database

```bash
# Tạo Prisma Client
npx prisma generate

# Đẩy schema lên database
npx prisma db push

# (Tùy chọn) Seed dữ liệu ban đầu
npx prisma db seed
```

#### 6. Tạo User Quản Trị

Chạy script này hoặc sử dụng Prisma Studio:

```bash
# Mở Prisma Studio
npx prisma studio
```

Sau đó tạo user với:
- **email**: admin@example.com
- **password**: (hash với bcrypt)
- **role**: ADMIN

Hoặc sử dụng script Node.js:

```javascript
// scripts/create-admin.js
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('your-password', 10);
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN'
    }
  });
  
  console.log('Admin đã tạo:', admin);
}

main();
```

#### 7. Chạy Development Server

```bash
yarn dev
# hoặc
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt.

**Các URL Mặc Định:**
- **Trang Chủ**: http://localhost:3000
- **Bảng Quản Trị**: http://localhost:3000/admin
- **Đăng Nhập Admin**: http://localhost:3000/admin/login

#### 8. Build Cho Production

```bash
yarn build
yarn start
```

---

## 📁 Cấu Trúc Dự Án

```
calendar-next/
├── prisma/
│   ├── schema.prisma           # Định nghĩa schema database
│   └── seed.ts                 # Script seed database
│
├── public/                     # Tài nguyên tĩnh (hình ảnh, fonts)
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (public)/          # Nhóm routes công khai
│   │   │   ├── page.tsx       # Trang chủ
│   │   │   ├── calendar/      # Lịch tháng
│   │   │   ├── yearly/        # Lịch năm
│   │   │   ├── converter/     # Chuyển đổi lịch
│   │   │   ├── countdown/     # Đếm ngược Tết
│   │   │   └── reminders/     # Trang nhắc nhở
│   │   │
│   │   ├── admin/             # Routes quản trị (bảo mật)
│   │   │   ├── page.tsx       # Dashboard quản trị
│   │   │   ├── login/         # Đăng nhập admin
│   │   │   ├── events/        # Quản lý sự kiện
│   │   │   ├── settings/      # Quản lý cài đặt
│   │   │   └── reminders/     # Quản lý nhắc nhở
│   │   │
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # NextAuth endpoints
│   │   │   ├── events/        # Events API (công khai)
│   │   │   ├── settings/      # Settings API (công khai)
│   │   │   ├── reminders/     # Reminders API
│   │   │   └── admin/         # Admin APIs (bảo mật)
│   │   │
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   │
│   ├── components/            # React components
│   │   ├── Header.tsx         # Header toàn cục
│   │   ├── Sidebar.tsx        # Sidebar điều hướng
│   │   ├── TodayDisplay.tsx   # Thông tin lịch hôm nay
│   │   ├── UpcomingEvents.tsx # Danh sách sự kiện sắp tới
│   │   ├── MonthlyCalendar.tsx # Xem theo tháng
│   │   ├── MonthlyHolidays.tsx # Ngày lễ tháng
│   │   ├── ReminderForm.tsx   # Form tạo nhắc nhở
│   │   ├── ReminderList.tsx   # Danh sách nhắc nhở
│   │   ├── FAQ.tsx            # Câu hỏi accordion
│   │   └── Features.tsx       # Giới thiệu tính năng
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useSettings.ts     # Quản lý cài đặt
│   │   └── useEvents.ts       # Quản lý sự kiện
│   │
│   ├── lib/                   # Utilities & config
│   │   ├── lunar-calendar.ts  # Tính toán âm lịch
│   │   ├── constants.ts       # Dữ liệu tĩnh (ngày lễ, sự kiện)
│   │   ├── utils.ts           # Hàm tiện ích
│   │   ├── store.ts           # Zustand state store
│   │   ├── prisma.ts          # Prisma client
│   │   └── auth.ts            # NextAuth config
│   │
│   └── types/                 # TypeScript types
│       └── index.ts
│
├── .env                       # Biến môi trường (gitignored)
├── .env.example              # Template môi trường
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── tailwind.config.ts        # Tailwind config
├── next.config.js            # Next.js config
├── README.md                 # File này (English)
├── README.vi.md              # Bản tiếng Việt
└── HUONG_DAN.md              # Hướng dẫn chi tiết
```

---

**Để xem hướng dẫn chi tiết bằng tiếng Việt, xem [HUONG_DAN.md](./HUONG_DAN.md)**

**For English documentation, see [README.md](./README.md)**
