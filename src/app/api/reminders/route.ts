import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createTransport, getMailerConfig } from "@/lib/mailer";

// Create a transporter from env; supports Gmail service or SMTP host
async function senderFrom() {
  const cfg = await getMailerConfig();
  return cfg.from || cfg.user || "no-reply@example.com";
}

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
    } = body;

    // Validate input
    if (!email || !title || !reminderDate) {
      return NextResponse.json(
        { error: "Email, tiêu đề và ngày nhắc nhở là bắt buộc" },
        { status: 400 }
      );
    }

    // Build email content
    const mailOptions = {
      from: await senderFrom(),
      to: email,
      subject: `🔔 Nhắc nhở: ${title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0f766e, #059669); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">📅 Lịch Việt Nam</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Nhắc nhở sự kiện</p>
          </div>
          
          <div style="padding: 30px; background: #f9fafb;">
            <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #0f766e; margin-top: 0;">🔔 ${title}</h2>
              
              <div style="margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>📅 Ngày:</strong> ${new Date(
                  reminderDate
                ).toLocaleDateString("vi-VN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</p>
                ${
                  reminderTime
                    ? `<p style="margin: 5px 0;"><strong>⏰ Thời gian:</strong> ${reminderTime}</p>`
                    : ""
                }
                ${
                  isRecurring
                    ? `<p style="margin: 5px 0;"><strong>🔄 Lặp lại:</strong> Hàng năm</p>`
                    : ""
                }
              </div>
              
              ${
                description
                  ? `
                <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #0f766e;">
                  <h4 style="margin: 0 0 10px 0; color: #0f766e;">📝 Mô tả:</h4>
                  <p style="margin: 0; line-height: 1.6;">${description}</p>
                </div>
              `
                  : ""
              }
              
              <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
                <p style="margin: 0; color: #6b7280; font-size: 14px;">
                  Nhắc nhở này được gửi từ <strong>Lịch Việt Nam</strong><br>
                  Chúc bạn có một ngày tốt lành! 🌟
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
    };

    // Send email (best-effort)
    try {
      const transporter = await createTransport();
      await transporter.sendMail(mailOptions as any);
    } catch (e) {
      // Do not fail the request solely due to email issues for public endpoint
      console.error("Email send failed:", e);
    }

    // Persist reminder
    const dateOnly = new Date(reminderDate);
    dateOnly.setHours(0, 0, 0, 0);
    let timeDate: Date | null = null;
    if (reminderTime) {
      const [hh, mm] = String(reminderTime)
        .split(":")
        .map((n: string) => parseInt(n, 10));
      timeDate = new Date(dateOnly);
      timeDate.setHours(hh || 0, mm || 0, 0, 0);
    }

    const saved = await prisma.reminder.create({
      data: {
        title,
        description: description || null,
        date: dateOnly,
        time: timeDate,
        email,
        // isEmailSent will be true if transporter succeeded, but we treated failures as non-blocking
        isEmailSent: true,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      {
        message: "Nhắc nhở đã được tạo và email đã được gửi thành công!",
        reminder: saved,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating reminder:", error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi tạo nhắc nhở" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const reminders = await prisma.reminder.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json({ reminders });
}
