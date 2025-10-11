# 📚 Hướng Dẫn Triển Khai - Lịch Việt Nam

Hướng dẫn này giải thích cách xây dựng ứng dụng lịch từ đầu, bao gồm quyết định kiến trúc, chi tiết triển khai và best practices.

---

## Mục Lục

1. [Thiết Lập Dự Án](#thiết-lập-dự-án)
2. [Thiết Kế Database](#thiết-kế-database)
3. [Thuật Toán Lịch Âm](#thuật-toán-lịch-âm)
4. [Kiến Trúc Components](#kiến-trúc-components)
5. [Thiết Kế API](#thiết-kế-api)
6. [Hệ Thống Xác Thực](#hệ-thống-xác-thực)
7. [Tích Hợp Email](#tích-hợp-email)
8. [Quản Lý State](#quản-lý-state)
9. [Styling & UI](#styling--ui)
10. [Chiến Lược Testing](#chiến-lược-testing)

---

## 1. Thiết Lập Dự Án

### Lệnh Thiết Lập Ban Đầu

```bash
# Tạo Next.js app với TypeScript
npx create-next-app@latest calendar-next --typescript --tailwind --app --src-dir

# Cài đặt dependencies chính
yarn add prisma @prisma/client next-auth bcryptjs zustand

# Cài đặt dev dependencies
yarn add -D @types/bcryptjs

# Khởi tạo Prisma
npx prisma init
```

### Triết Lý Cấu Trúc File

```
src/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/            # Nhóm authentication
│   ├── admin/             # Routes quản trị
│   ├── api/               # API routes
│   └── [pages]/           # Trang công khai
├── components/            # React components tái sử dụng
│   ├── ui/               # Base UI components
│   └── features/         # Feature-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities & configurations
│   ├── lunar-calendar.ts # Logic lịch chính
│   ├── constants.ts      # Dữ liệu tĩnh
│   ├── utils.ts          # Hàm helper
│   ├── store.ts          # Zustand store
│   ├── prisma.ts         # Database client
│   └── auth.ts           # NextAuth config
└── types/                # TypeScript definitions
```

---

## 2. Thiết Kế Database

### Prisma Schema

```prisma
// prisma/schema.prisma

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String?
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
}

model Event {
  id          String    @id @default(cuid())
  title       String
  description String?   @db.Text
  date        String    // Format: MM-DD
  type        EventType
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  @@index([date])
  @@index([type])
}

enum EventType {
  HOLIDAY
  HISTORY
  CULTURE
}

model Reminder {
  id           String   @id @default(cuid())
  email        String
  title        String
  description  String?  @db.Text
  reminderDate DateTime
  reminderTime String?
  isRecurring  Boolean  @default(false)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  @@index([email])
  @@index([reminderDate])
}
```

### Quyết Định Thiết Kế

1. **CUID vs UUID**: Dùng CUID cho URL-friendliness và sortability tốt hơn
2. **Lưu Trữ Ngày**: Lưu dạng string (MM-DD) cho sự kiện lặp lại hàng năm
3. **Indexing**: Thêm indexes trên các field thường query
4. **Enums**: Dùng Prisma enums cho type safety

---

## 3. Thuật Toán Lịch Âm

### Các Hàm Chính

#### Tính Toán Julian Day

```typescript
function jdFromDate(day: number, month: number, year: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  
  let jd = day + Math.floor((153 * m + 2) / 5) + 365 * y;
  jd += Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  
  return jd;
}
```

#### Chuyển Đổi Dương Sang Âm Lịch

```typescript
export function convertSolar2Lunar(
  day: number,
  month: number,
  year: number,
  timeZone: number = 7
): { day: number; month: number; year: number } {
  // Tính Julian day number
  const dayNumber = jdFromDate(day, month, year);
  
  // Tìm ngày trăng mới gần nhất
  const k = INT((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = getNewMoonDay(k + 1, timeZone);
  
  if (monthStart > dayNumber) {
    monthStart = getNewMoonDay(k, timeZone);
  }
  
  // Tính năm âm lịch
  let a11 = getLunarMonth11(year, timeZone);
  let b11 = a11;
  let lunarYear;
  
  if (a11 >= monthStart) {
    lunarYear = year;
    a11 = getLunarMonth11(year - 1, timeZone);
  } else {
    lunarYear = year + 1;
    b11 = getLunarMonth11(year + 1, timeZone);
  }
  
  // Tính ngày, tháng âm lịch
  const lunarDay = dayNumber - monthStart + 1;
  const diff = INT((monthStart - a11) / 29);
  let lunarMonth = diff + 11;
  
  // Xử lý tháng nhuận
  if (b11 - a11 > 365) {
    const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;
    }
  }
  
  if (lunarMonth > 12) {
    lunarMonth = lunarMonth - 12;
  }
  if (lunarMonth >= 11 && diff < 4) {
    lunarYear -= 1;
  }
  
  return { day: lunarDay, month: lunarMonth, year: lunarYear };
}
```

#### Hệ Thống Can Chi

```typescript
export function getCanChi(day: number, month: number, year: number): string {
  const can = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  const chi = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
  
  const jd = jdFromDate(day, month, year);
  const canIndex = (jd + 9) % 10;
  const chiIndex = (jd + 1) % 12;
  
  return can[canIndex] + ' ' + chi[chiIndex];
}
```

### Nguồn Thuật Toán

- Dựa trên Lịch Quốc Gia Việt Nam
- Tính toán thiên văn từ Calendrical Calculations (Dershowitz & Reingold)
- Điều chỉnh cho múi giờ Việt Nam (GMT+7)

---

## 4. Kiến Trúc Components

### Hệ Thống Phân Cấp Component

```
App
├── Header (Toàn cục)
│   └── useSettings() hook
├── Sidebar (Điều hướng)
│   └── useCalendarStore() 
└── Trang
    ├── Home
    │   ├── TodayDisplay
    │   │   └── Tính toán âm lịch
    │   ├── UpcomingEvents
    │   │   └── useEvents() hook
    │   ├── MonthlyCalendar
    │   ├── FAQ
    │   └── Features
    ├── Calendar
    │   ├── MonthlyCalendar
    │   └── MonthlyHolidays
    │       └── useEvents() hook
    ├── Yearly
    │   └── MiniCalendar (x12)
    ├── Converter
    │   └── Solar/Lunar forms
    ├── Countdown
    │   └── Real-time timer
    └── Reminders
        ├── ReminderForm
        │   └── useSettings()
        └── ReminderList
```

### Các Pattern Thiết Kế Component

#### 1. **Container/Presentational Pattern**

```typescript
// Container Component
export function TodayDisplay() {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    setCurrentDate(new Date());
  }, []);
  
  if (!mounted || !currentDate) {
    return <LoadingSkeleton />;
  }
  
  return <TodayDisplayView date={currentDate} />;
}

// Presentational Component
function TodayDisplayView({ date }: { date: Date }) {
  const lunar = convertSolar2Lunar(date.getDate(), date.getMonth() + 1, date.getFullYear());
  return <div>{/* Render UI */}</div>;
}
```

#### 2. **Custom Hooks Pattern**

```typescript
// hooks/useSettings.ts
export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchSettings();
  }, []);
  
  const fetchSettings = async () => {
    const response = await fetch('/api/settings');
    const data = await response.json();
    setSettings(data.data);
    setIsLoading(false);
  };
  
  const getSetting = (key: string, defaultValue: string = '') => {
    return settings?.[key] || defaultValue;
  };
  
  return { settings, isLoading, getSetting };
}
```

#### 3. **Hydration-Safe Pattern**

```typescript
export function Component() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <Skeleton />;  // Server-rendered fallback
  }
  
  return <ActualContent />;  // Client-only content
}
```

---

## 5. Thiết Kế API

### Cấu Trúc RESTful API

```
/api
├── /events                # Public events API
│   GET    - Danh sách sự kiện
│   POST   - Tạo sự kiện (bảo mật)
│
├── /settings             # Public settings
│   GET    - Lấy cài đặt công khai
│
├── /reminders            # Reminders API
│   GET    - Danh sách nhắc nhở
│   POST   - Tạo nhắc nhở với email
│
└── /admin                # Admin-only APIs
    ├── /events
    │   GET    - Danh sách sự kiện
    │   POST   - Tạo sự kiện
    │   PUT    - Cập nhật sự kiện
    │   DELETE - Xóa sự kiện
    │
    ├── /settings
    │   GET    - Danh sách cài đặt
    │   POST   - Tạo cài đặt
    │   PUT    - Cập nhật cài đặt
    │   DELETE - Xóa cài đặt
    │
    └── /reminders
        GET    - Danh sách tất cả nhắc nhở
        DELETE - Xóa nhắc nhở
```

### Pattern Triển Khai API

```typescript
// app/api/events/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    // Logic query
    const events = await prisma.event.findMany({
      where: type ? { type } : {},
      orderBy: { date: 'asc' }
    });
    
    return NextResponse.json({
      success: true,
      data: events
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Lỗi server nội bộ' },
      { status: 500 }
    );
  }
}
```

---

## 6. Hệ Thống Xác Thực

### Cấu Hình NextAuth

```typescript
// lib/auth.ts
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email }
        });
        
        if (!user || !user.password) return null;
        
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        
        if (!isValid) return null;
        
        return {
          id: user.id,
          email: user.email,
          role: user.role
        };
      }
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    }
  }
};
```

### Bảo Vệ Route

```typescript
// app/admin/page.tsx
export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session || session.user?.role !== 'ADMIN') {
      router.push('/admin/login');
    }
  }, [session, status, router]);
  
  if (status === 'loading') return <Loading />;
  
  return <AdminContent />;
}
```

---

## 7. Tích Hợp Email

### Thiết Lập Nodemailer

```typescript
// app/api/reminders/route.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function POST(request: NextRequest) {
  const { email, title, reminderDate } = await request.json();
  
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: `🔔 Nhắc nhở: ${title}`,
    html: createEmailTemplate({ title, reminderDate })
  });
  
  return NextResponse.json({ success: true });
}
```

### Email Template

```typescript
function createEmailTemplate(data) {
  return `
    <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
      <div style="background: #0f766e; color: white; padding: 20px;">
        <h1>📅 Lịch Việt Nam</h1>
      </div>
      <div style="padding: 20px;">
        <h2>${data.title}</h2>
        <p>Ngày: ${formatDate(data.reminderDate)}</p>
      </div>
    </div>
  `;
}
```

---

## 8. Quản Lý State

### Zustand Store

```typescript
// lib/store.ts
import { create } from 'zustand';

interface CalendarStore {
  selectedDate: Date | null;
  isSidebarOpen: boolean;
  setSelectedDate: (date: Date | null) => void;
  toggleSidebar: () => void;
}

export const useCalendarStore = create<CalendarStore>((set) => ({
  selectedDate: null,
  isSidebarOpen: false,
  setSelectedDate: (date) => set({ selectedDate: date }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen }))
}));
```

### Custom Hooks Cho Data Fetching

```typescript
// hooks/useEvents.ts
export function useEvents() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchEvents();
  }, []);
  
  const fetchEvents = async () => {
    const response = await fetch('/api/events');
    const data = await response.json();
    setEvents(data.data);
    setIsLoading(false);
  };
  
  return { events, isLoading, refetch: fetchEvents };
}
```

---

## 9. Styling & UI

### Cấu Hình Tailwind

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f766e',
          light: '#14b8a6',
          dark: '#115e59'
        },
        accent: '#f59e0b'
      }
    }
  }
};
```

### Pattern Styling Component

```typescript
// Dùng cn utility cho conditional classes
import { cn } from '@/lib/utils';

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  variant === 'primary' && "primary-classes"
)} />
```

---

## 10. Tối Ưu Performance

### 1. Code Splitting
- Tự động với Next.js App Router
- Dynamic imports cho heavy components

### 2. Chiến Lược Caching
- Dữ liệu tĩnh cached trong constants
- API responses cached ở client
- Revalidation khi cần

### 3. Tối Ưu Database
- Indexed fields cho queries nhanh
- Connection pooling với Prisma
- Query optimization

### 4. Tối Ưu Image
- Next.js Image component
- WebP format
- Lazy loading

---

## Kết Luận

Hướng dẫn triển khai này bao gồm kiến trúc cốt lõi và các quyết định thiết kế được đưa ra khi xây dựng ứng dụng Lịch Việt Nam. Mỗi phần thể hiện sự cân nhắc cẩn thận về khả năng mở rộng, bảo trì và trải nghiệm người dùng.

---

**Để xem tài liệu đầy đủ, hãy xem [README.vi.md](./README.vi.md)**
