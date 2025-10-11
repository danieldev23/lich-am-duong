# 📅 Lịch Việt Nam - Vietnamese Lunar Calendar

> A comprehensive Vietnamese lunar calendar application built with Next.js 14

**[🇻🇳 Xem tài liệu tiếng Việt](./README.vi.md)** | **[🇬🇧 View English Documentation](./README.md)**

---

## 📚 Documentation / Tài Liệu

### 🇬🇧 English

- **[README.md](./README.md)** - Complete documentation (Current file)
- **[QUICK_START.md](./QUICK_START.md)** - 5-minute setup guide
- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - Technical deep dive
- **[DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** - Navigation hub

### 🇻🇳 Tiếng Việt

- **[README.vi.md](./README.vi.md)** - Tài liệu đầy đủ
- **[QUICK_START.vi.md](./QUICK_START.vi.md)** - Hướng dẫn cài đặt 5 phút
- **[HUONG_DAN.md](./HUONG_DAN.md)** - Tìm hiểu kỹ thuật sâu
- **[DOCUMENTATION_INDEX.vi.md](./DOCUMENTATION_INDEX.vi.md)** - Chỉ mục tài liệu

---

## 📖 Table of Contents

- [Tổng Quan](#tổng-quan)
- [Tính Năng](#tính-năng)
- [Công Nghệ Sử Dụng](#công-nghệ-sử-dụng)
- [Kiến Trúc](#kiến-trúc)
- [Bắt Đầu](#bắt-đầu)
- [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
- [Khái Niệm Cốt Lõi](#khái-niệm-cốt-lõi)
- [Tài Liệu API](#tài-liệu-api)
- [Cấu Trúc Database](#cấu-trúc-database)
- [Hướng Dẫn Components](#hướng-dẫn-components)
- [Hooks & Quản Lý State](#hooks--quản-lý-state)
- [Xác Thực & Phân Quyền](#xác-thực--phân-quyền)
- [Tích Hợp Email](#tích-hợp-email)
- [Triển Khai](#triển-khai)
- [Hướng Dẫn Phát Triển](#hướng-dẫn-phát-triển)
- [Xử Lý Sự Cố](#xử-lý-sự-cố)

---

## 🎯 Tổng Quan

Lịch Việt Nam là ứng dụng web hiện đại mang lịch âm truyền thống Việt Nam vào kỷ nguyên số. Ứng dụng cung cấp chuyển đổi âm dương lịch chính xác, theo dõi các ngày lễ và sự kiện văn hóa Việt Nam, quản lý nhắc nhở cá nhân với thông báo email, và bao gồm bảng quản trị toàn diện để quản lý nội dung.

## ✨ Features

### 🌟 User Features

| Feature | Description | Page |
|---------|-------------|------|
| **Today Display** | Current date with lunar info, Can Chi, Tiet Khi, Truc, Gio Hoang Dao | `/` (Home) |
| **Monthly Calendar** | Interactive calendar with lunar dates, events, holidays list | `/calendar` |
| **Yearly Calendar** | 12-month overview, click to view details, annual events | `/yearly` |
| **Lunar Converter** | Convert between solar ↔ lunar dates | `/converter` |
| **Tet Countdown** | Real-time countdown to Vietnamese New Year with traditions | `/countdown` |
| **Event Reminders** | Create reminders with email notifications, recurring events | `/reminders` |
| **Upcoming Events** | Next 30 days events and holidays | Home sidebar |
| **FAQ & Features** | Help section and feature highlights | Home bottom |

### ⚙️ Admin Features

| Feature | Description | Page |
|---------|-------------|------|
| **Events Management** | CRUD operations for events (history, culture, holidays) | `/admin/events` |
| **Settings Management** | Site configuration, SEO, feature toggles | `/admin/settings` |
| **Reminders Management** | View and manage user reminders | `/admin/reminders` |
| **Authentication** | Secure login with role-based access control | `/admin/login` |

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Icons**: Font Awesome
- **State Management**: Zustand (UI state), React Context (settings)
- **Forms**: Native React state + HTML5 validation

### Backend
- **Runtime**: Node.js (Serverless on Vercel)
- **API**: Next.js API Routes
- **Database**: MySQL 8.0+
- **ORM**: Prisma 5.x
- **Authentication**: NextAuth.js v4
- **Password Hashing**: bcryptjs

### Email & Notifications
- **Email Service**: Nodemailer (Gmail SMTP)
- **Templates**: HTML email templates

### Development Tools
- **Package Manager**: Yarn / npm
- **Linting**: ESLint
- **Code Formatting**: Prettier (optional)
- **Version Control**: Git

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client (Browser)                      │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐ │
│  │   Pages     │  │  Components  │  │  Hooks/Utils  │ │
│  └─────────────┘  └──────────────┘  └───────────────┘ │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP/HTTPS
┌──────────────────────┴──────────────────────────────────┐
│              Next.js Server (Vercel)                     │
│  ┌─────────────────────────────────────────────────┐   │
│  │  API Routes                                      │   │
│  │  ├─ /api/events        (Public)                 │   │
│  │  ├─ /api/settings      (Public)                 │   │
│  │  ├─ /api/reminders     (Public)                 │   │
│  │  └─ /api/admin/*       (Protected)              │   │
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
│  MySQL Database │        │  Email Service     │
│  (Prisma ORM)   │        │  (Nodemailer)      │
└─────────────────┘        └────────────────────┘
```

### Data Flow

1. **Client Request** → Browser sends HTTP request to Next.js
2. **Server Processing** → API routes handle business logic
3. **Authentication** → NextAuth validates JWT tokens for protected routes
4. **Database Query** → Prisma ORM queries MySQL database
5. **Response** → JSON data returned to client
6. **Email** → Nodemailer sends emails for reminders (async)

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.17 or later
- **MySQL** 8.0 or later (or PlanetScale, AWS RDS)
- **Git** for version control
- **Yarn** or **npm** package manager

### Step-by-Step Installation

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd calendar-next
```

#### 2. Install Dependencies

```bash
# Using Yarn (recommended)
yarn install

# Or using npm
npm install
```

#### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp env.example .env
```

Edit `.env` with your configuration:

```env
# Database Connection
DATABASE_URL="mysql://username:password@localhost:3306/calendar_db"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-random-secret-key-here"

# Email Configuration (for reminders)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-gmail-app-password"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

**Gmail App Password:**
1. Enable 2-Factor Authentication in your Google Account
2. Go to: https://myaccount.google.com/apppasswords
3. Generate an App Password for "Mail"
4. Use that password in `EMAIL_PASS`

#### 4. Set Up MySQL Database

Create a new MySQL database:

```sql
CREATE DATABASE calendar_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### 5. Initialize Prisma & Database

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Seed initial data
npx prisma db seed
```

#### 6. Create Admin User

Run this script or use Prisma Studio:

```bash
# Open Prisma Studio
npx prisma studio
```

Then create a user with:
- **email**: admin@example.com
- **password**: (hashed with bcrypt)
- **role**: ADMIN

Or use this Node.js script:

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
  
  console.log('Admin created:', admin);
}

main();
```

#### 7. Run Development Server

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Default URLs:**
- **Home**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Admin Login**: http://localhost:3000/admin/login

#### 8. Build for Production

```bash
yarn build
yarn start
```

## 📁 Project Structure

```
calendar-next/
├── prisma/
│   ├── schema.prisma           # Database schema definition
│   └── seed.ts                 # Database seeding script
│
├── public/                     # Static assets (images, fonts)
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (public)/          # Public routes group
│   │   │   ├── page.tsx       # Home page
│   │   │   ├── calendar/      # Monthly calendar
│   │   │   ├── yearly/        # Yearly calendar
│   │   │   ├── converter/     # Date converter
│   │   │   ├── countdown/     # Tet countdown
│   │   │   └── reminders/     # Reminders page
│   │   │
│   │   ├── admin/             # Admin routes (protected)
│   │   │   ├── page.tsx       # Admin dashboard
│   │   │   ├── login/         # Admin login
│   │   │   ├── events/        # Events management
│   │   │   ├── settings/      # Settings management
│   │   │   └── reminders/     # Reminders management
│   │   │
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # NextAuth endpoints
│   │   │   ├── events/        # Events API (public)
│   │   │   ├── settings/      # Settings API (public)
│   │   │   ├── reminders/     # Reminders API
│   │   │   └── admin/         # Admin APIs (protected)
│   │   │
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   │
│   ├── components/            # React components
│   │   ├── Header.tsx         # Global header
│   │   ├── Sidebar.tsx        # Navigation sidebar
│   │   ├── TodayDisplay.tsx   # Today's calendar info
│   │   ├── UpcomingEvents.tsx # Upcoming events list
│   │   ├── MonthlyCalendar.tsx # Monthly view
│   │   ├── MonthlyHolidays.tsx # Monthly holidays
│   │   ├── ReminderForm.tsx   # Create reminder form
│   │   ├── ReminderList.tsx   # Reminders list
│   │   ├── FAQ.tsx            # FAQ accordion
│   │   └── Features.tsx       # Features showcase
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useSettings.ts     # Settings management
│   │   └── useEvents.ts       # Events management
│   │
│   ├── lib/                   # Utilities & config
│   │   ├── lunar-calendar.ts  # Lunar calculations
│   │   ├── constants.ts       # Static data (holidays, events)
│   │   ├── utils.ts           # Helper functions
│   │   ├── store.ts           # Zustand state store
│   │   ├── prisma.ts          # Prisma client
│   │   └── auth.ts            # NextAuth config
│   │
│   └── types/                 # TypeScript types
│       └── index.ts
│
├── .env                       # Environment variables (gitignored)
├── .env.example              # Environment template
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── tailwind.config.ts        # Tailwind config
├── next.config.js            # Next.js config
├── README.md                 # This file
└── IMPLEMENTATION_GUIDE.md   # Detailed implementation guide
```

## 🧠 Core Concepts

### 1. Lunar Calendar System

The Vietnamese lunar calendar is based on:
- **Lunar months**: 29-30 days each
- **Lunar year**: 12 or 13 months (with leap month)
- **Can Chi**: 60-year cycle system
- **Tiet Khi**: 24 solar terms
- **Gio Hoang Dao**: Auspicious hours

**Key Functions:**
- `convertSolar2Lunar()`: Solar → Lunar conversion
- `convertLunar2Solar()`: Lunar → Solar conversion
- `getCanChi()`: Get Can Chi for a date
- `getTietKhi()`: Get solar term
- `getGioHoangDao()`: Get auspicious hours

### 2. State Management

**Client State (Zustand):**
- UI state (sidebar open/close)
- Selected date
- Global loading states

**Server State (React Query pattern):**
- Settings from API
- Events from API
- User reminders

### 3. Authentication Flow

```
User → Login Page → NextAuth → JWT Token → Protected Routes
                        ↓
                   Database ← Verify credentials
```

**Roles:**
- `USER`: Default user (can create reminders)
- `ADMIN`: Admin user (full access to admin panel)

### 4. Data Flow

```
Component → Custom Hook → API Route → Prisma → Database
    ↑                                            ↓
    └────────────← JSON Response ←──────────────┘
```

---

## 📡 API Documentation

### Public APIs

#### GET `/api/events`

Get list of events (holidays, history, culture).

**Query Parameters:**
- `type` (optional): Filter by event type (holiday/history/culture)
- `month` (optional): Filter by month (1-12)
- `search` (optional): Search by title or description

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx123",
      "title": "Tết Nguyên Đán",
      "description": "Vietnamese New Year",
      "date": "01-01",
      "type": "HOLIDAY"
    }
  ],
  "total": 50
}
```

#### GET `/api/settings`

Get public site settings.

**Response:**
```json
{
  "success": true,
  "data": {
    "site_title": "Lịch Việt Nam",
    "site_description": "Vietnamese Lunar Calendar",
    "contact_email": "contact@example.com",
    "enable_reminders": "true"
  }
}
```

#### POST `/api/reminders`

Create a new reminder with email notification.

**Request Body:**
```json
{
  "email": "user@example.com",
  "title": "Sinh nhật",
  "description": "Sinh nhật mẹ",
  "reminderDate": "2024-12-25",
  "reminderTime": "09:00",
  "isRecurring": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Reminder created and email sent",
  "reminder": { /* reminder object */ }
}
```

### Admin APIs (Protected)

#### GET `/api/admin/events`

Get all events (requires admin auth).

**Headers:**
```
Cookie: next-auth.session-token=...
```

**Response:**
```json
{
  "success": true,
  "data": [ /* array of events */ ]
}
```

#### POST `/api/admin/events`

Create new event (requires admin auth).

**Request Body:**
```json
{
  "title": "New Event",
  "description": "Event description",
  "date": "12-25",
  "type": "HOLIDAY"
}
```

#### PUT `/api/admin/events`

Update existing event (requires admin auth).

**Request Body:**
```json
{
  "id": "clx123",
  "title": "Updated Event",
  "description": "New description",
  "date": "12-25",
  "type": "CULTURE"
}
```

#### DELETE `/api/admin/events?id=clx123`

Delete event (requires admin auth).

---

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String?   // Hashed with bcrypt
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
}
```

### Event Model
```prisma
model Event {
  id          String    @id @default(cuid())
  title       String
  description String?   @db.Text
  date        String    // Format: MM-DD (for yearly recurring)
  type        EventType
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  @@index([date])
  @@index([type])
}

enum EventType {
  HOLIDAY   // Ngày lễ quốc gia
  HISTORY   // Sự kiện lịch sử
  CULTURE   // Văn hóa truyền thống
}
```

### Reminder Model
```prisma
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

---

## 🎨 Components Guide

### Core Components

#### 1. **Header** (`components/Header.tsx`)

Global header with site title from settings.

**Features:**
- Displays site title and description
- Real-time clock
- Mobile menu toggle
- Uses `useSettings()` hook

**Usage:**
```tsx
import { Header } from '@/components/Header';

<Header />
```

#### 2. **TodayDisplay** (`components/TodayDisplay.tsx`)

Display today's date with full lunar information.

**Features:**
- Solar and lunar dates
- Can Chi, Tiet Khi, Truc
- Gio Hoang Dao (auspicious hours)
- Today's events
- Hydration-safe rendering

**Data displayed:**
- Current date (solar)
- Lunar date (âm lịch)
- Can Chi (Stem-Branch)
- Tiet Khi (solar term)
- Truc (zodiac position)
- Auspicious hours
- Today's holidays/events

#### 3. **MonthlyCalendar** (`components/MonthlyCalendar.tsx`)

Interactive monthly calendar view.

**Features:**
- Grid layout with lunar dates
- Event indicators
- Click to see day details
- Month/year navigation
- Today highlighting

#### 4. **ReminderForm** (`components/ReminderForm.tsx`)

Form to create reminders with email notifications.

**Features:**
- Email input with validation
- Date and time pickers
- Recurring option
- Feature toggle check (uses `useSettings`)
- Success/error messages
- Email sent immediately

### Custom Hooks

#### `useSettings()`

Fetch and manage site settings.

```typescript
const { settings, isLoading, getSetting, isFeatureEnabled } = useSettings();

// Get a setting
const siteTitle = getSetting('site_title', 'Default Title');

// Check if feature is enabled
if (isFeatureEnabled('enable_reminders')) {
  // Show reminder form
}
```

#### `useEvents()`

Fetch and manage events.

```typescript
const { events, isLoading, getUpcomingEvents, getEventsByMonth } = useEvents();

// Get upcoming events (next N days)
const upcoming = getUpcomingEvents(30);

// Get events for specific month
const monthEvents = getEventsByMonth(12, 2024);
```

---

## 🔐 Authentication & Authorization

### Login Flow

1. User visits `/admin/login`
2. Enters email + password
3. NextAuth validates credentials
4. If valid, creates JWT session
5. Redirects to `/admin`

### Protected Routes

```typescript
// Check auth in page component
const { data: session } = useSession();

if (!session || session.user?.role !== 'ADMIN') {
  redirect('/admin/login');
}
```

### API Protection

```typescript
// Check auth in API route
const session = await getServerSession(authOptions);

if (!session || session.user?.role !== 'ADMIN') {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

---

## 📧 Email Integration

### Setup Gmail SMTP

1. Enable 2FA on Gmail
2. Generate App Password
3. Add to `.env`:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

### Email Template

HTML email with Vietnamese styling:
- Header with gradient
- Reminder details
- Formatted date/time
- Mobile-responsive

---

## 🚢 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to vercel.com
   - Import your repository
   - Add environment variables
   - Deploy

3. **Environment Variables on Vercel:**
   ```
   DATABASE_URL=mysql://...
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your-secret
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Database Options:**
   - **PlanetScale** (recommended): Free tier, serverless
   - **AWS RDS**: Production-grade
   - **DigitalOcean**: Managed MySQL

### Manual Deployment

```bash
# Build
yarn build

# Start
yarn start

# Or with PM2
pm2 start yarn --name "calendar" -- start
```

---

## 🛠️ Development Guide

### Adding a New Page

1. Create file in `src/app/[page-name]/page.tsx`
2. Import components
3. Add to navigation in `Sidebar.tsx`

```tsx
// src/app/my-page/page.tsx
export default function MyPage() {
  return (
    <div>
      <Header />
      <Sidebar />
      <main>{/* Content */}</main>
    </div>
  );
}
```

### Adding a New API Route

1. Create file in `src/app/api/[route]/route.ts`
2. Export HTTP methods (GET, POST, PUT, DELETE)

```typescript
// src/app/api/my-route/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ data: [] });
}
```

### Adding a New Component

1. Create file in `src/components/MyComponent.tsx`
2. Export function component
3. Use TypeScript for props

```tsx
// src/components/MyComponent.tsx
interface MyComponentProps {
  title: string;
}

export function MyComponent({ title }: MyComponentProps) {
  return <div>{title}</div>;
}
```

---

## 🐛 Troubleshooting

### Common Issues

**1. Hydration Errors**
```
Error: Hydration failed because the server rendered HTML...
```

**Solution:** Use the mounted pattern:
```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return <Skeleton />;
```

**2. Database Connection Failed**
```
Error: Can't reach database server
```

**Solutions:**
- Check `DATABASE_URL` in `.env`
- Verify MySQL is running
- Check firewall settings
- Test connection: `npx prisma db pull`

**3. NextAuth Session Not Working**
```
Error: No session found
```

**Solutions:**
- Check `NEXTAUTH_SECRET` is set
- Clear cookies and try again
- Check `NEXTAUTH_URL` matches your domain

**4. Email Not Sending**
```
Error: Invalid login
```

**Solutions:**
- Use Gmail App Password, not regular password
- Enable "Less secure app access" (if not using App Password)
- Check `EMAIL_USER` and `EMAIL_PASS` in `.env`

### Debug Tools

```bash
# Check database connection
npx prisma studio

# View logs in development
yarn dev

# Check build errors
yarn build

# Test API endpoints
curl http://localhost:3000/api/events
```

---

## 📚 Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Prisma Documentation**: https://www.prisma.io/docs
- **NextAuth.js**: https://next-auth.js.org
- **Tailwind CSS**: https://tailwindcss.com
- **Vietnamese Lunar Calendar**: https://www.informatik.uni-leipzig.de/~duc/amlich/

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m 'Add my feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Submit pull request

---

## 📄 License

MIT License - See LICENSE file for details.

---

## 👥 Authors

**Your Name** - Initial work

---

## 🙏 Acknowledgments

- Vietnamese lunar calendar algorithms
- Open source community
- Cultural heritage preservation

---

**For detailed implementation guide, see [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)**

---

## 🎓 Learning Path

If you want to understand and build this project from scratch, follow this order:

### 1. **Fundamentals** (Week 1-2)
- [ ] Learn Next.js 14 App Router
- [ ] Understand TypeScript basics
- [ ] Study Tailwind CSS
- [ ] Learn Prisma ORM

### 2. **Core Features** (Week 3-4)
- [ ] Implement lunar calendar calculations (`lib/lunar-calendar.ts`)
- [ ] Build calendar UI components
- [ ] Create API routes
- [ ] Set up database with Prisma

### 3. **Advanced Features** (Week 5-6)
- [ ] Implement authentication with NextAuth
- [ ] Add email functionality
- [ ] Create admin panel
- [ ] Add state management with Zustand

### 4. **Polish & Deploy** (Week 7-8)
- [ ] Add error handling
- [ ] Optimize performance
- [ ] Write tests
- [ ] Deploy to production

### Recommended Resources

1. **Next.js**: https://nextjs.org/learn
2. **TypeScript**: https://www.typescriptlang.org/docs/
3. **Prisma**: https://www.prisma.io/docs/getting-started
4. **Tailwind**: https://tailwindcss.com/docs
5. **NextAuth**: https://next-auth.js.org/getting-started/example

---

## 📊 Project Stats

- **Total Files**: ~80 files
- **Total Lines of Code**: ~8,000 LOC
- **Components**: 15+
- **API Routes**: 10+
- **Database Models**: 3
- **Pages**: 8

---

## 🔮 Future Enhancements

Potential features to add:

- [ ] **Mobile App**: React Native version
- [ ] **Push Notifications**: Browser notifications for reminders
- [ ] **Social Sharing**: Share calendar events
- [ ] **Export Calendar**: iCal, Google Calendar integration
- [ ] **Multi-language**: English, Vietnamese support
- [ ] **Dark Mode**: Theme switching
- [ ] **Weather Integration**: Show weather on calendar
- [ ] **Horoscope**: Daily horoscope based on Vietnamese astrology
- [ ] **Analytics**: Track user engagement
- [ ] **API Documentation**: Swagger/OpenAPI docs

---

## ❓ FAQ

### Q: Can I use this for commercial projects?
A: Yes, this project is MIT licensed.

### Q: How accurate are the lunar calculations?
A: Based on Vietnamese National Calendar algorithms, accurate for years 1900-2100.

### Q: Can I customize the holidays and events?
A: Yes, through the admin panel or by modifying `lib/constants.ts`.

### Q: Does this work offline?
A: Basic calendar functions work offline, but reminders and admin features require internet.

### Q: How do I backup my data?
A: Use `npx prisma db pull` to export schema, or mysqldump for full backup.

---

## 📞 Support

- **Issues**: https://github.com/your-repo/issues
- **Discussions**: https://github.com/your-repo/discussions
- **Email**: your-email@example.com

---

## 🌟 Star History

If you find this project helpful, please consider giving it a star ⭐

---

**Built with ❤️ for the Vietnamese community**

*Preserving cultural heritage through modern technology*
