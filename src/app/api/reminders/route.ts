import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyCaptcha } from "@/lib/captcha";
import { getSetting } from "@/lib/settings";

// GET - Lấy danh sách reminders hoặc gọi cron job
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    // Nếu có action=cron, gọi endpoint gửi reminder (cron job)
    if (action === "cron") {
      const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/api/reminders/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      return NextResponse.json({
        success: true,
        timestamp: new Date().toISOString(),
        result
      });
    }

    const reminders = await prisma.reminder.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      reminders: reminders.map(reminder => ({
        id: reminder.id,
        title: reminder.title,
        description: reminder.description,
        email: reminder.email.replace(/(.{3}).+(@.+)/, '$1***$2'),
        date: reminder.date.toISOString(),
        time: reminder.time?.toISOString(),
        isRecurring: reminder.isRecurring,
        status: reminder.status,
        createdAt: reminder.createdAt.toISOString()
      }))
    });

  } catch (error) {
    console.error("Error in GET reminders:", error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi lấy danh sách nhắc nhở" },
      { status: 500 }
    );
  }
}

// POST - Tạo reminder mới
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      email, 
      title, 
      description, 
      reminderDate, 
      reminderTime, 
      isRecurring,
      captchaToken 
    } = body;

    // Validate required fields
    if (!email || !title || !reminderDate) {
      return NextResponse.json(
        { error: "Email, tiêu đề và ngày nhắc nhở là bắt buộc" },
        { status: 400 }
      );
    }

    // Verify CAPTCHA if enabled
    const isCaptchaEnabled = await getSetting('enable_captcha') === 'true';
    if (isCaptchaEnabled && captchaToken) {
      const isValidCaptcha = await verifyCaptcha(captchaToken);
      if (!isValidCaptcha) {
        return NextResponse.json(
          { error: "CAPTCHA không hợp lệ" },
          { status: 400 }
        );
      }
    }

    // Parse date
    const dateOnly = new Date(reminderDate);
    dateOnly.setHours(0, 0, 0, 0);

    // Parse time if provided
    let timeDate: Date | null = null;
    if (reminderTime) {
      const [hours, minutes] = reminderTime.split(':').map(Number);
      timeDate = new Date(dateOnly);
      timeDate.setHours(hours, minutes, 0, 0);
    }

    // Create reminder in database
    const reminder = await prisma.reminder.create({
      data: {
        title,
        description: description || null,
        email,
        date: dateOnly,
        time: timeDate,
        isRecurring: isRecurring || false,
        status: "PENDING",
        isEmailSent: false
      }
    });

    return NextResponse.json({
      success: true,
      message: "Nhắc nhở đã được tạo thành công và lưu vào hệ thống",
      reminder: {
        id: reminder.id,
        title: reminder.title,
        description: reminder.description,
        email: reminder.email,
        date: reminder.date,
        time: reminder.time,
        isRecurring: reminder.isRecurring,
        status: reminder.status,
        createdAt: reminder.createdAt
      }
    });

  } catch (error) {
    console.error("Error creating reminder:", error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi tạo nhắc nhở" },
      { status: 500 }
    );
  }
}

// PUT - Cập nhật reminder
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      id,
      email, 
      title, 
      description, 
      reminderDate, 
      reminderTime, 
      isRecurring 
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID nhắc nhở là bắt buộc" },
        { status: 400 }
      );
    }

    // Parse date
    const dateOnly = new Date(reminderDate);
    dateOnly.setHours(0, 0, 0, 0);

    // Parse time if provided
    let timeDate: Date | null = null;
    if (reminderTime) {
      const [hours, minutes] = reminderTime.split(':').map(Number);
      timeDate = new Date(dateOnly);
      timeDate.setHours(hours, minutes, 0, 0);
    }

    // Update reminder
    const updatedReminder = await prisma.reminder.update({
      where: { id },
      data: {
        title,
        description: description || null,
        email,
        date: dateOnly,
        time: timeDate,
        isRecurring: isRecurring || false
      }
    });

    return NextResponse.json({
      success: true,
      message: "Nhắc nhở đã được cập nhật thành công",
      reminder: updatedReminder
    });

  } catch (error) {
    console.error("Error updating reminder:", error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi cập nhật nhắc nhở" },
      { status: 500 }
    );
  }
}

// DELETE - Xóa reminder
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID nhắc nhở là bắt buộc" },
        { status: 400 }
      );
    }

    await prisma.reminder.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: "Nhắc nhở đã được xóa thành công"
    });

  } catch (error) {
    console.error("Error deleting reminder:", error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi xóa nhắc nhở" },
      { status: 500 }
    );
  }
}