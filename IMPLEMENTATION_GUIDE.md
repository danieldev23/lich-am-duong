# 📚 Implementation Guide - Lịch Việt Nam

This guide explains how the calendar application was built from scratch, including architecture decisions, implementation details, and best practices.

---

## Table of Contents

1. [Project Setup](#project-setup)
2. [Database Design](#database-design)
3. [Lunar Calendar Algorithms](#lunar-calendar-algorithms)
4. [Components Architecture](#components-architecture)
5. [API Design](#api-design)
6. [Authentication System](#authentication-system)
7. [Email Integration](#email-integration)
8. [State Management](#state-management)
9. [Styling & UI](#styling--ui)
10. [Testing Strategy](#testing-strategy)

---

## 1. Project Setup

### Initial Setup Commands

```bash
# Create Next.js app with TypeScript
npx create-next-app@latest calendar-next --typescript --tailwind --app --src-dir

# Install core dependencies
yarn add prisma @prisma/client next-auth bcryptjs zustand

# Install dev dependencies
yarn add -D @types/bcryptjs

# Initialize Prisma
npx prisma init
```

### File Structure Philosophy

```
src/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/            # Authentication group
│   ├── admin/             # Admin routes
│   ├── api/               # API routes
│   └── [pages]/           # Public pages
├── components/            # Reusable React components
│   ├── ui/               # Base UI components
│   └── features/         # Feature-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities & configurations
│   ├── lunar-calendar.ts # Core calendar logic
│   ├── constants.ts      # Static data
│   ├── utils.ts          # Helper functions
│   ├── store.ts          # Zustand store
│   ├── prisma.ts         # Database client
│   └── auth.ts           # NextAuth config
└── types/                # TypeScript definitions
```

---

## 2. Database Design

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

### Design Decisions

1. **CUID vs UUID**: Using CUID for better URL-friendliness and sortability
2. **Date Storage**: Storing as string (MM-DD) for yearly recurring events
3. **Indexing**: Added indexes on frequently queried fields
4. **Enums**: Using Prisma enums for type safety

---

## 3. Lunar Calendar Algorithms

### Core Functions

#### Julian Day Calculation

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

#### Solar to Lunar Conversion

```typescript
export function convertSolar2Lunar(
  day: number,
  month: number,
  year: number,
  timeZone: number = 7
): { day: number; month: number; year: number } {
  const dayNumber = jdFromDate(day, month, year);
  const k = INT((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = getNewMoonDay(k + 1, timeZone);
  
  if (monthStart > dayNumber) {
    monthStart = getNewMoonDay(k, timeZone);
  }
  
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
  
  const lunarDay = dayNumber - monthStart + 1;
  const diff = INT((monthStart - a11) / 29);
  let lunarLeap = 0;
  let lunarMonth = diff + 11;
  
  if (b11 - a11 > 365) {
    const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;
      if (diff == leapMonthDiff) {
        lunarLeap = 1;
      }
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

#### Can Chi (Stem-Branch) System

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

### Algorithm Sources

- Based on Vietnamese National Calendar
- Astronomical calculations from Calendrical Calculations (Dershowitz & Reingold)
- Adapted for Vietnam timezone (GMT+7)

---

## 4. Components Architecture

### Component Hierarchy

```
App
├── Header (Global)
│   └── useSettings() hook
├── Sidebar (Navigation)
│   └── useCalendarStore() 
└── Pages
    ├── Home
    │   ├── TodayDisplay
    │   │   └── Lunar calculations
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

### Component Design Patterns

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

## 5. API Design

### RESTful API Structure

```
/api
├── /events                # Public events API
│   GET    - List all events
│   POST   - Create event (protected)
│
├── /settings             # Public settings
│   GET    - Get public settings
│
├── /reminders            # Reminders API
│   GET    - List reminders
│   POST   - Create reminder with email
│
└── /admin                # Admin-only APIs
    ├── /events
    │   GET    - List all events
    │   POST   - Create event
    │   PUT    - Update event
    │   DELETE - Delete event
    │
    ├── /settings
    │   GET    - List settings
    │   POST   - Create setting
    │   PUT    - Update setting
    │   DELETE - Delete setting
    │
    └── /reminders
        GET    - List all reminders
        DELETE - Delete reminder
```

### API Implementation Pattern

```typescript
// app/api/events/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    // Query logic
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
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Error Handling Strategy

```typescript
try {
  // Operation
} catch (error) {
  console.error('Operation failed:', error);
  return NextResponse.json(
    { 
      success: false,
      error: 'User-friendly message',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    },
    { status: 500 }
  );
}
```

---

## 6. Authentication System

### NextAuth Configuration

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

### Protected Route Pattern

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

### API Route Protection

```typescript
// app/api/admin/events/route.ts
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user?.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  // Process request
}
```

---

## 7. Email Integration

### Nodemailer Setup

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

## 8. State Management

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

### Custom Hooks for Data Fetching

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

### Tailwind Configuration

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

### Component Styling Pattern

```typescript
// Using cn utility for conditional classes
import { cn } from '@/lib/utils';

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  variant === 'primary' && "primary-classes"
)} />
```

---

## 10. Performance Optimizations

### 1. Code Splitting
- Automatic with Next.js App Router
- Dynamic imports for heavy components

### 2. Caching Strategy
- Static data cached in constants
- API responses cached on client
- Revalidation on demand

### 3. Database Optimization
- Indexed fields for fast queries
- Connection pooling with Prisma
- Query optimization

### 4. Image Optimization
- Next.js Image component
- WebP format
- Lazy loading

---

## Conclusion

This implementation guide covers the core architecture and design decisions made while building the Vietnamese Lunar Calendar application. Each section represents careful consideration of scalability, maintainability, and user experience.
