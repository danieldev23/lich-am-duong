# ⚡ Hướng Dẫn Nhanh - Lịch Việt Nam

Cài đặt và chạy dự án trong 5 phút!

---

## 🚀 Cài Đặt (5 phút)

### Bước 1: Clone & Cài Đặt

```bash
git clone <your-repo-url>
cd calendar-next
yarn install
```

### Bước 2: Thiết Lập Môi Trường

Tạo file `.env`:

```bash
cp env.example .env
```

Chỉnh sửa `.env`:

```env
DATABASE_URL="mysql://root:password@localhost:3306/calendar_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
```

### Bước 3: Thiết Lập Database

```bash
# Tạo database
mysql -u root -p
CREATE DATABASE calendar_db;
exit;

# Push schema
npx prisma db push
```

### Bước 4: Tạo User Quản Trị

```bash
npx prisma studio
```

Sau đó tạo user:
- Email: `admin@example.com`
- Name: `Admin`
- Password: Hash mật khẩu của bạn (dùng bcrypt)
- Role: `ADMIN`

**Hoặc dùng script:**

```javascript
// scripts/create-admin.js
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN'
    }
  });
  console.log('✅ Admin đã tạo:', admin.email);
}

main().finally(() => prisma.$disconnect());
```

Chạy: `node scripts/create-admin.js`

### Bước 5: Khởi Động Server

```bash
yarn dev
```

Mở: http://localhost:3000

---

## 📍 Các URL Chính

| Trang | URL | Mô Tả |
|------|-----|-------|
| Trang Chủ | http://localhost:3000 | Trang lịch chính |
| Lịch Tháng | http://localhost:3000/calendar | Xem theo tháng |
| Lịch Năm | http://localhost:3000/yearly | Tổng quan năm |
| Chuyển Đổi | http://localhost:3000/converter | Chuyển đổi lịch |
| Đếm Ngược | http://localhost:3000/countdown | Đếm ngược Tết |
| Nhắc Nhở | http://localhost:3000/reminders | Tạo nhắc nhở |
| Đăng Nhập Admin | http://localhost:3000/admin/login | Đăng nhập quản trị |
| Bảng Quản Trị | http://localhost:3000/admin | Dashboard admin |
| Trang Test | http://localhost:3000/test-admin | Test API |

---

## 🔑 Thông Tin Đăng Nhập Mặc Định

Sau khi tạo admin user:

- **Email**: `admin@example.com`
- **Mật khẩu**: `admin123` (hãy đổi mật khẩu này!)

---

## 🛠️ Các Lệnh Thường Dùng

```bash
# Development
yarn dev              # Khởi động dev server
yarn build            # Build cho production
yarn start            # Khởi động production server

# Database
npx prisma studio     # Mở Prisma Studio
npx prisma db push    # Push schema lên database
npx prisma generate   # Tạo Prisma Client
npx prisma db pull    # Pull schema từ database

# Utilities
yarn lint             # Chạy ESLint
yarn type-check       # Kiểm tra TypeScript
```

---

## 📂 Cấu Trúc Dự Án (Đơn Giản Hóa)

```
src/
├── app/
│   ├── page.tsx              # Trang chủ
│   ├── calendar/             # Lịch tháng
│   ├── yearly/               # Lịch năm
│   ├── converter/            # Chuyển đổi lịch
│   ├── countdown/            # Đếm ngược Tết
│   ├── reminders/            # Nhắc nhở
│   ├── admin/                # Bảng quản trị
│   └── api/                  # API routes
├── components/               # React components
├── hooks/                    # Custom hooks
└── lib/                      # Utilities
```

---

## 🎯 Tổng Quan Tính Năng Nhanh

### 1. Xem Lịch Hôm Nay

Vào trang chủ → Xem ngày âm lịch, Can Chi, giờ hoàng đạo

### 2. Kiểm Tra Lịch Tháng

Vào `/calendar` → Xem toàn bộ tháng với ngày âm lịch

### 3. Chuyển Đổi Ngày

Vào `/converter` → Nhập ngày dương lịch → Nhận ngày âm lịch

### 4. Tạo Nhắc Nhở

Vào `/reminders` → Điền form → Gửi → Nhận email

### 5. Quản Lý Sự Kiện (Admin)

Đăng nhập tại `/admin/login` → Vào Events → Thêm/Sửa/Xóa

---

## 🐛 Xử Lý Sự Cố

### Vấn đề: Không kết nối được database

```bash
# Kiểm tra MySQL đang chạy
mysql -u root -p

# Kiểm tra DATABASE_URL trong .env
echo $DATABASE_URL
```

### Vấn đề: Đăng nhập admin không hoạt động

```bash
# Kiểm tra xem admin user có tồn tại không
npx prisma studio

# Xác minh NEXTAUTH_SECRET đã set
grep NEXTAUTH_SECRET .env
```

### Vấn đề: Email không gửi được

```bash
# Kiểm tra thông tin email
grep EMAIL_ .env

# Test với script đơn giản
node -e "console.log(process.env.EMAIL_USER)"
```

### Vấn đề: Lỗi hydration

Xóa thư mục `.next` và rebuild:

```bash
rm -rf .next
yarn dev
```

---

## 📚 Tìm Hiểu Thêm

- **Tài liệu đầy đủ**: Xem [README.vi.md](./README.vi.md)
- **Chi tiết triển khai**: Xem [HUONG_DAN.md](./HUONG_DAN.md)
- **Tham khảo API**: Kiểm tra README.vi.md → Phần Tài Liệu API

---

## ✅ Danh Sách Kiểm Tra

Sau khi thiết lập, xác minh những điều sau hoạt động:

- [ ] Trang chủ tải thành công
- [ ] Có thể điều hướng đến tất cả các trang
- [ ] Lịch âm hiển thị chính xác
- [ ] Có thể chuyển đổi ngày
- [ ] Đăng nhập admin hoạt động
- [ ] Có thể tạo/sửa sự kiện trong bảng quản trị
- [ ] Có thể tạo nhắc nhở
- [ ] Email được gửi khi tạo nhắc nhở (nếu đã cấu hình)
- [ ] Settings được tải từ API
- [ ] Không có lỗi console

---

## 🎉 Bước Tiếp Theo

1. **Tùy chỉnh**: Sửa `lib/constants.ts` để thêm ngày lễ
2. **Style**: Điều chỉnh `tailwind.config.ts` cho màu sắc tùy chỉnh
3. **Triển khai**: Làm theo hướng dẫn triển khai trong README.vi.md
4. **Khám phá**: Xem HUONG_DAN.md để tìm hiểu sâu

---

## 💡 Mẹo Chuyên Nghiệp

- Dùng `npx prisma studio` để xem/sửa database trực quan
- Kiểm tra trang `/test-admin` để xác minh APIs hoạt động
- Dùng Chrome DevTools → tab Network để debug API calls
- Bật TypeScript strict mode để kiểm tra type tốt hơn
- Thêm `.env` vào `.gitignore` (đã có sẵn)

---

**Cần trợ giúp? Mở issue trên GitHub!**

Chúc code vui vẻ! 🚀
