import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createTransport, getMailerConfig } from "@/lib/mailer";

async function senderFrom() {
  const cfg = await getMailerConfig();
  return cfg.from || cfg.user || "no-reply@example.com";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID nhắc nhở là bắt buộc" },
        { status: 400 }
      );
    }

    // Find the reminder
    const reminder = await prisma.reminder.findUnique({
      where: { id }
    });

    if (!reminder) {
      return NextResponse.json(
        { error: "Không tìm thấy nhắc nhở" },
        { status: 404 }
      );
    }

    // Build email content
    const mailOptions = {
      from: await senderFrom(),
      to: reminder.email,
      subject: `🔔 Nhắc nhở: ${reminder.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0f766e, #059669); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">📅 Lịch Việt Nam</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Nhắc nhở sự kiện</p>
          </div>
          
          <div style="padding: 30px; background: #f9fafb;">
            <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #0f766e; margin-top: 0;">🔔 ${reminder.title}</h2>
              
              <div style="margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>📅 Ngày:</strong> ${new Date(
                  reminder.date
                ).toLocaleDateString("vi-VN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</p>
                ${
                  reminder.time
                    ? `<p style="margin: 5px 0;"><strong>⏰ Thời gian:</strong> ${new Date(reminder.time).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}</p>`
                    : ""
                }
                ${
                  reminder.isRecurring
                    ? `<p style="margin: 5px 0;"><strong>🔄 Lặp lại:</strong> Hàng năm</p>`
                    : ""
                }
              </div>
              
              ${
                reminder.description
                  ? `
                <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #0f766e;">
                  <h4 style="margin: 0 0 10px 0; color: #0f766e;">📝 Mô tả:</h4>
                  <p style="margin: 0; line-height: 1.6;">${reminder.description}</p>
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

    // Send email
    try {
      const transporter = await createTransport();
      await transporter.sendMail(mailOptions as any);

      // Update reminder status
      await prisma.reminder.update({
        where: { id },
        data: {
          status: "SENT",
          isEmailSent: true
        }
      });

      return NextResponse.json({
        success: true,
        message: "Email nhắc nhở đã được gửi thành công!",
        reminder: {
          ...reminder,
          status: "SENT",
          isEmailSent: true
        }
      });

    } catch (error) {
      console.error("Email send failed:", error);
      
      // Update reminder status to failed
      await prisma.reminder.update({
        where: { id },
        data: {
          status: "FAILED"
        }
      });

      return NextResponse.json(
        { error: "Không thể gửi email. Vui lòng thử lại sau." },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("Error in send single reminder:", error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi gửi nhắc nhở" },
      { status: 500 }
    );
  }
}