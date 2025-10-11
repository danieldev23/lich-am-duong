# ⚡ Quick Start Guide - Lịch Việt Nam

Get the project running in 5 minutes!

---

## 🚀 Installation (5 minutes)

### Step 1: Clone & Install

```bash
git clone <your-repo-url>
cd calendar-next
yarn install
```

### Step 2: Environment Setup

Create `.env` file:

```bash
cp env.example .env
```

Edit `.env`:

```env
DATABASE_URL="mysql://root:password@localhost:3306/calendar_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
```

### Step 3: Database Setup

```bash
# Create database
mysql -u root -p
CREATE DATABASE calendar_db;
exit;

# Push schema
npx prisma db push
```

### Step 4: Create Admin User

```bash
npx prisma studio
```

Then create a user:
- Email: `admin@example.com`
- Name: `Admin`
- Password: Hash of your password (use bcrypt)
- Role: `ADMIN`

**Or use this script:**

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
  console.log('✅ Admin created:', admin.email);
}

main().finally(() => prisma.$disconnect());
```

Run: `node scripts/create-admin.js`

### Step 5: Start Development Server

```bash
yarn dev
```

Open: http://localhost:3000

---

## 📍 Key URLs

| Page | URL | Description |
|------|-----|-------------|
| Home | http://localhost:3000 | Main calendar page |
| Monthly | http://localhost:3000/calendar | Monthly calendar view |
| Yearly | http://localhost:3000/yearly | Yearly overview |
| Converter | http://localhost:3000/converter | Date converter |
| Countdown | http://localhost:3000/countdown | Tet countdown |
| Reminders | http://localhost:3000/reminders | Create reminders |
| Admin Login | http://localhost:3000/admin/login | Admin login |
| Admin Panel | http://localhost:3000/admin | Admin dashboard |
| Test Page | http://localhost:3000/test-admin | API test page |

---

## 🔑 Default Credentials

After creating admin user:

- **Email**: `admin@example.com`
- **Password**: `admin123` (change this!)

---

## 🛠️ Common Commands

```bash
# Development
yarn dev              # Start dev server
yarn build            # Build for production
yarn start            # Start production server

# Database
npx prisma studio     # Open Prisma Studio
npx prisma db push    # Push schema to database
npx prisma generate   # Generate Prisma Client
npx prisma db pull    # Pull schema from database

# Utilities
yarn lint             # Run ESLint
yarn type-check       # Check TypeScript
```

---

## 📂 Project Structure (Simplified)

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── calendar/             # Monthly calendar
│   ├── yearly/               # Yearly calendar
│   ├── converter/            # Date converter
│   ├── countdown/            # Tet countdown
│   ├── reminders/            # Reminders
│   ├── admin/                # Admin panel
│   └── api/                  # API routes
├── components/               # React components
├── hooks/                    # Custom hooks
└── lib/                      # Utilities
```

---

## 🎯 Quick Feature Overview

### 1. View Today's Calendar

Go to homepage → See lunar date, Can Chi, auspicious hours

### 2. Check Monthly Calendar

Go to `/calendar` → See full month with lunar dates

### 3. Convert Dates

Go to `/converter` → Enter solar date → Get lunar date

### 4. Create Reminder

Go to `/reminders` → Fill form → Submit → Receive email

### 5. Manage Events (Admin)

Login at `/admin/login` → Go to Events → Add/Edit/Delete

---

## 🐛 Troubleshooting

### Problem: Can't connect to database

```bash
# Check if MySQL is running
mysql -u root -p

# Check DATABASE_URL in .env
echo $DATABASE_URL
```

### Problem: Admin login not working

```bash
# Check if admin user exists
npx prisma studio

# Verify NEXTAUTH_SECRET is set
grep NEXTAUTH_SECRET .env
```

### Problem: Email not sending

```bash
# Check email credentials
grep EMAIL_ .env

# Test with simple script
node -e "console.log(process.env.EMAIL_USER)"
```

### Problem: Hydration errors

Clear `.next` folder and rebuild:

```bash
rm -rf .next
yarn dev
```

---

## 📚 Learn More

- **Full Documentation**: See [README.md](./README.md)
- **Implementation Details**: See [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)
- **API Reference**: Check README.md → API Documentation section

---

## ✅ Verification Checklist

After setup, verify these work:

- [ ] Homepage loads successfully
- [ ] Can navigate to all pages
- [ ] Lunar calendar displays correctly
- [ ] Can convert dates
- [ ] Admin login works
- [ ] Can create/edit events in admin panel
- [ ] Can create reminders
- [ ] Email is sent when creating reminder (if configured)
- [ ] Settings are loaded from API
- [ ] No console errors

---

## 🎉 Next Steps

1. **Customize**: Edit `lib/constants.ts` to add more holidays
2. **Style**: Modify `tailwind.config.ts` for custom colors
3. **Deploy**: Follow deployment guide in README.md
4. **Explore**: Check out IMPLEMENTATION_GUIDE.md for deep dive

---

## 💡 Pro Tips

- Use `npx prisma studio` to view/edit database visually
- Check `/test-admin` page to verify APIs are working
- Use Chrome DevTools → Network tab to debug API calls
- Enable TypeScript strict mode for better type safety
- Add `.env` to `.gitignore` (already done)

---

**Need help? Open an issue on GitHub!**

Happy coding! 🚀
