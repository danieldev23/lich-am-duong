import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createTransport, getMailerConfig } from "@/lib/mailer";

async function senderFrom() {
  const cfg = await getMailerConfig();
  return cfg.from || cfg.user || "no-reply@example.com";
}

export async function POST(request: NextRequest) {
  try {
    // Get current date and time
    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Find reminders that should be sent today
    const remindersToSend = await prisma.reminder.findMany({
      where: {
        date: {
          lte: today
        },
        status: "PENDING"
      }
    });

    let sentCount = 0;
    let errorCount = 0;
    const results = [];

    for (const reminder of remindersToSend) {
      try {
        // Check if it's time to send this reminder
        const reminderDate = new Date(reminder.date);
        const shouldSend = reminderDate <= today;
        
        // If reminder has a specific time, check if it's time
        if (reminder.time) {
          const reminderTime = new Date(reminder.time);
          const currentHour = now.getHours();
          const currentMinute = now.getMinutes();
          const reminderHour = reminderTime.getHours();
          const reminderMinute = reminderTime.getMinutes();
          
          // Only send if current time is at or after reminder time
          if (currentHour < reminderHour || (currentHour === reminderHour && currentMinute < reminderMinute)) {
            continue;
          }
        }

        if (shouldSend) {
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
                      <p style="margin: 5px 0;"><strong>📅 Ngày:</strong> ${reminderDate.toLocaleDateString("vi-VN", {
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
          const transporter = await createTransport();
          await transporter.sendMail(mailOptions as any);

          // Update reminder status
          await prisma.reminder.update({
            where: { id: reminder.id },
            data: {
              status: "SENT",
              isEmailSent: true
            }
          });

          sentCount++;
          results.push({
            id: reminder.id,
            title: reminder.title,
            email: reminder.email,
            status: "sent"
          });
        }
      } catch (error) {
        console.error(`Error sending reminder ${reminder.id}:`, error);
        errorCount++;
        results.push({
          id: reminder.id,
          title: reminder.title,
          email: reminder.email,
          status: "error",
          error: error instanceof Error ? error.message : "Unknown error"
        });
      }
    }

    // Handle recurring reminders (yearly)
    const recurringReminders = await prisma.reminder.findMany({
      where: {
        status: "SENT",
        isRecurring: true,
        // Find reminders that were sent exactly 1 year ago
        date: {
          gte: new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()),
          lt: new Date(today.getFullYear() - 1, today.getMonth(), today.getDate() + 1)
        }
      }
    });

    let recurringCount = 0;
    for (const oldReminder of recurringReminders) {
      try {
        // Check if we already created a recurring reminder for this year
        const existingRecurring = await prisma.reminder.findFirst({
          where: {
            title: oldReminder.title,
            email: oldReminder.email,
            date: {
              gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
              lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
            }
          }
        });

        if (!existingRecurring) {
          // Create new reminder for this year
          const thisYear = new Date(oldReminder.date);
          thisYear.setFullYear(today.getFullYear());
          
          const thisYearTime = oldReminder.time ? new Date(oldReminder.time) : null;
          if (thisYearTime) {
            thisYearTime.setFullYear(today.getFullYear());
          }

          await prisma.reminder.create({
            data: {
              title: oldReminder.title,
              description: oldReminder.description,
              date: thisYear,
              time: thisYearTime,
              email: oldReminder.email,
              isEmailSent: false,
              isRecurring: true,
              status: "PENDING",
              userId: oldReminder.userId
            }
          });

          recurringCount++;
        }
      } catch (error) {
        console.error(`Error creating recurring reminder for ${oldReminder.id}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Đã gửi ${sentCount} nhắc nhở, ${errorCount} lỗi, tạo ${recurringCount} nhắc nhở lặp lại`,
      stats: {
        sent: sentCount,
        errors: errorCount,
        recurring: recurringCount,
        total: remindersToSend.length
      },
      results
    });

  } catch (error) {
    console.error("Error in reminder sending process:", error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi gửi nhắc nhở" },
      { status: 500 }
    );
  }
}

// Allow GET requests for manual triggering
export async function GET() {
  return POST(new NextRequest("http://localhost/api/reminders/send"));
}