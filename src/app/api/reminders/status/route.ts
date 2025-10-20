import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT - Cập nhật trạng thái reminder (dành cho cron job)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      id,
      status,
      isEmailSent
    } = body;

    // Validate required fields
    if (!id || !status) {
      return NextResponse.json(
        { error: "ID và trạng thái là bắt buộc" },
        { status: 400 }
      );
    }

    // Validate status values
    const validStatuses = ["PENDING", "SENT", "FAILED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Trạng thái không hợp lệ. Chỉ chấp nhận: PENDING, SENT, FAILED" },
        { status: 400 }
      );
    }

    // Check if reminder exists
    const existingReminder = await prisma.reminder.findUnique({
      where: { id }
    });

    if (!existingReminder) {
      return NextResponse.json(
        { error: "Không tìm thấy nhắc nhở" },
        { status: 404 }
      );
    }

    // Update reminder status
    const updatedReminder = await prisma.reminder.update({
      where: { id },
      data: {
        status: status,
        isEmailSent: isEmailSent !== undefined ? isEmailSent : existingReminder.isEmailSent,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      message: `Trạng thái nhắc nhở đã được cập nhật thành ${status}`,
      reminder: {
        id: updatedReminder.id,
        title: updatedReminder.title,
        email: updatedReminder.email,
        status: updatedReminder.status,
        isEmailSent: updatedReminder.isEmailSent,
        updatedAt: updatedReminder.updatedAt
      }
    });

  } catch (error) {
    console.error("Error updating reminder status:", error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi cập nhật trạng thái nhắc nhở" },
      { status: 500 }
    );
  }
}

// GET - Lấy thống kê trạng thái reminders
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let whereClause = {};
    if (status) {
      whereClause = { status };
    }

    const reminders = await prisma.reminder.findMany({
      where: whereClause,
      select: {
        id: true,
        title: true,
        email: true,
        status: true,
        isEmailSent: true,
        date: true,
        time: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { updatedAt: 'desc' }
    });

    // Get status statistics
    const stats = await prisma.reminder.groupBy({
      by: ['status'],
      _count: {
        status: true
      }
    });

    const statusStats = stats.reduce((acc, stat) => {
      acc[stat.status] = stat._count.status;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      success: true,
      reminders: reminders.map(reminder => ({
        ...reminder,
        email: reminder.email.replace(/(.{3}).+(@.+)/, '$1***$2'), // Mask email for privacy
        date: reminder.date.toISOString(),
        time: reminder.time?.toISOString(),
        createdAt: reminder.createdAt.toISOString(),
        updatedAt: reminder.updatedAt?.toISOString()
      })),
      stats: statusStats,
      total: reminders.length
    });

  } catch (error) {
    console.error("Error fetching reminder status:", error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi lấy thông tin trạng thái" },
      { status: 500 }
    );
  }
}