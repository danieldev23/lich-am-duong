import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    console.log(`[${new Date().toISOString()}] Getting next reminder time...`);

    const now = new Date();
    
    // Find the next reminder that needs to be sent
    const nextReminder = await prisma.reminder.findFirst({
      where: {
        date: {
          gte: now,
        },
        isEmailSent: false,
        status: 'PENDING',
      },
      orderBy: {
        date: 'asc',
      },
      select: {
        date: true,
        time: true,
        title: true,
        id: true,
      },
    });

    if (nextReminder) {
      // Combine date and time for accurate reminder time
      let reminderDateTime = new Date(nextReminder.date);
      
      if (nextReminder.time) {
        const timeDate = new Date(nextReminder.time);
        reminderDateTime.setHours(timeDate.getHours());
        reminderDateTime.setMinutes(timeDate.getMinutes());
        reminderDateTime.setSeconds(timeDate.getSeconds());
      }

      console.log(`📅 Next reminder: "${nextReminder.title}" at ${reminderDateTime.toISOString()}`);
      
      return NextResponse.json({
        success: true,
        nextReminderTime: reminderDateTime.toISOString(),
        title: nextReminder.title,
        timeUntil: reminderDateTime.getTime() - now.getTime(),
        reminderId: nextReminder.id,
      });
    } else {
      console.log('📭 No upcoming reminders found');
      
      return NextResponse.json({
        success: true,
        nextReminderTime: null,
        message: 'No upcoming reminders',
      });
    }

  } catch (error: any) {
    console.error('❌ Error getting next reminder:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// Enum type definition (should match your Prisma schema)
enum ReminderStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}