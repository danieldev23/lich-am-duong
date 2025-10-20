import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Lấy danh sách reminders cho cron job (không mask email)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const includeAll = searchParams.get("includeAll") === "true";

    let whereClause: any = {};
    
    if (status) {
      whereClause.status = status;
    } else if (!includeAll) {
      // Mặc định chỉ lấy PENDING reminders
      whereClause.status = "PENDING";
    }

    // Lấy reminders cần xử lý (hôm nay và quá hạn)
    if (!includeAll) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      whereClause.date = {
        lt: tomorrow // Less than tomorrow (includes today and past dates)
      };
    }

    const reminders = await prisma.reminder.findMany({
      where: whereClause,
      orderBy: [
        { date: 'asc' },
        { time: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    // Thêm thông tin debug về thời gian
    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const processedReminders = reminders.map(reminder => ({
      id: reminder.id,
      title: reminder.title,
      description: reminder.description,
      email: reminder.email, // Không mask email cho cron job
      date: reminder.date.toISOString(),
      time: reminder.time?.toISOString(),
      isRecurring: reminder.isRecurring,
      status: reminder.status,
      isEmailSent: reminder.isEmailSent,
      createdAt: reminder.createdAt.toISOString(),
      updatedAt: reminder.updatedAt?.toISOString(),
      // Thêm thông tin debug
      _debug: {
        reminderDate: reminder.date.toISOString().split('T')[0],
        reminderTime: reminder.time ? 
          `${reminder.time.getHours().toString().padStart(2, '0')}:${reminder.time.getMinutes().toString().padStart(2, '0')}` : 
          null,
        currentTime: now.toISOString(),
        isToday: reminder.date.toDateString() === today.toDateString(),
        isPast: reminder.date < today,
        shouldProcess: reminder.date <= today && reminder.status === "PENDING"
      }
    }));

    // Thống kê
    const stats = {
      total: processedReminders.length,
      pending: processedReminders.filter(r => r.status === "PENDING").length,
      sent: processedReminders.filter(r => r.status === "SENT").length,
      failed: processedReminders.filter(r => r.status === "FAILED").length,
      today: processedReminders.filter(r => r._debug.isToday).length,
      past: processedReminders.filter(r => r._debug.isPast).length,
      shouldProcess: processedReminders.filter(r => r._debug.shouldProcess).length
    };

    return NextResponse.json({
      success: true,
      reminders: processedReminders,
      stats: stats,
      timestamp: now.toISOString(),
      query: {
        status: status || "PENDING",
        includeAll: includeAll,
        whereClause: whereClause
      }
    });

  } catch (error) {
    console.error("Error in GET reminders/data:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Có lỗi xảy ra khi lấy danh sách nhắc nhở",
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}