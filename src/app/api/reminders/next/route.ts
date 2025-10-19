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
        reminderTime: {
          gt: now,
        },
        isSent: false,
      },
      orderBy: {
        reminderTime: 'asc',
      },
      select: {
        reminderTime: true,
        title: true,
      },
    });

    if (nextReminder) {
      console.log(`📅 Next reminder: "${nextReminder.title}" at ${nextReminder.reminderTime.toISOString()}`);
      
      return NextResponse.json({
        success: true,
        nextReminderTime: nextReminder.reminderTime.toISOString(),
        title: nextReminder.title,
        timeUntil: nextReminder.reminderTime.getTime() - now.getTime(),
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