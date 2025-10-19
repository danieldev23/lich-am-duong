import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createTransport, getMailerConfig } from "@/lib/mailer";

async function senderFrom() {
  const cfg = await getMailerConfig();
  return cfg.from || cfg.user || "no-reply@example.com";
}

export async function POST(request: NextRequest) {
  try {
    console.log(`[${new Date().toISOString()}] Starting reminder sending process...`);
    
    // Get current date and time
    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    console.log(`Current time: ${now.toISOString()}`);
    console.log(`Today (start): ${today.toISOString()}`);
    console.log(`Tomorrow (end): ${tomorrow.toISOString()}`);
    
    // Find reminders that should be sent (today or overdue)
    const remindersToSend = await prisma.reminder.findMany({
      where: {
        date: {
          lt: tomorrow // Less than tomorrow (includes today and past dates)
        },
        status: "PENDING"
      }
    });

    console.log(`Found ${remindersToSend.length} pending reminders to check`);

    let sentCount = 0;
    let errorCount = 0;
    const results = [];

    for (const reminder of remindersToSend) {
      try {
        const reminderDate = new Date(reminder.date);
        reminderDate.setHours(0, 0, 0, 0);
        
        console.log(`Checking reminder ${reminder.id}: ${reminder.title}`);
        console.log(`  - Reminder date: ${reminderDate.toISOString()}`);
        console.log(`  - Has time: ${!!reminder.time}`);
        
        let shouldSend = false;
        
        // If reminder date is today or in the past
        if (reminderDate <= today) {
          if (reminder.time) {
            // Has specific time - check if it's time to send
            const reminderTime = new Date(reminder.time);
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();
            const reminderHour = reminderTime.getHours();
            const reminderMinute = reminderTime.getMinutes();
            
            const currentTotalMinutes = currentHour * 60 + currentMinute;
            const reminderTotalMinutes = reminderHour * 60 + reminderMinute;
            
            console.log(`  - Current time: ${currentHour}:${currentMinute} (${currentTotalMinutes} mins)`);
            console.log(`  - Reminder time: ${reminderHour}:${reminderMinute} (${reminderTotalMinutes} mins)`);
            
            // Send if current time is at or after reminder time
            // Or if the reminder is from a past date (overdue)
            if (reminderDate < today || currentTotalMinutes >= reminderTotalMinutes) {
              shouldSend = true;
              console.log(`  - Should send: YES (time condition met)`);
            } else {
              console.log(`  - Should send: NO (too early, need to wait ${reminderTotalMinutes - currentTotalMinutes} minutes)`);
            }
          } else {
            // No specific time - send anytime on the reminder date or if overdue
            shouldSend = true;
            console.log(`  - Should send: YES (no specific time)`);
          }
        } else {
          console.log(`  - Should send: NO (future date)`);
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

          console.log(`  - Sending email to: ${reminder.email}`);
          
          // Send email
          const transporter = await createTransport();
          const emailResult = await transporter.sendMail(mailOptions as any);
          
          console.log(`  - Email sent successfully! Message ID: ${emailResult.messageId}`);

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
            status: "sent",
            messageId: emailResult.messageId
          });
        } else {
          console.log(`  - Skipping reminder ${reminder.id} (conditions not met)`);
        }
      } catch (error) {
        console.error(`Error sending reminder ${reminder.id}:`, error);
        
        // Update reminder status to FAILED
        try {
          await prisma.reminder.update({
            where: { id: reminder.id },
            data: {
              status: "FAILED"
            }
          });
          console.log(`  - Updated reminder ${reminder.id} status to FAILED`);
        } catch (updateError) {
          console.error(`Failed to update reminder ${reminder.id} status:`, updateError);
        }
        
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
    console.log(`\n[${new Date().toISOString()}] Processing recurring reminders...`);
    
    const recurringReminders = await prisma.reminder.findMany({
      where: {
        status: "SENT",
        isRecurring: true
      }
    });

    console.log(`Found ${recurringReminders.length} sent recurring reminders to check`);

    let recurringCount = 0;
    for (const oldReminder of recurringReminders) {
      try {
        const oldReminderDate = new Date(oldReminder.date);
        const currentYear = today.getFullYear();
        const reminderMonth = oldReminderDate.getMonth();
        const reminderDay = oldReminderDate.getDate();
        
        // Create the date for this year
        const thisYearDate = new Date(currentYear, reminderMonth, reminderDay);
        thisYearDate.setHours(0, 0, 0, 0);
        
        console.log(`Checking recurring reminder ${oldReminder.id}: ${oldReminder.title}`);
        console.log(`  - Original date: ${oldReminderDate.toISOString()}`);
        console.log(`  - This year date: ${thisYearDate.toISOString()}`);
        
        // Only process if the recurring date is today or in the past this year
        // and we haven't already created a reminder for this year
        if (thisYearDate <= today) {
          const existingRecurring = await prisma.reminder.findFirst({
            where: {
              title: oldReminder.title,
              email: oldReminder.email,
              date: {
                gte: new Date(currentYear, reminderMonth, reminderDay),
                lt: new Date(currentYear, reminderMonth, reminderDay + 1)
              }
            }
          });

          if (!existingRecurring) {
            console.log(`  - Creating new recurring reminder for ${currentYear}`);
            
            // Create new reminder for this year
            const thisYearTime = oldReminder.time ? new Date(oldReminder.time) : null;
            if (thisYearTime) {
              thisYearTime.setFullYear(currentYear);
              thisYearTime.setMonth(reminderMonth);
              thisYearTime.setDate(reminderDay);
            }

            await prisma.reminder.create({
              data: {
                title: oldReminder.title,
                description: oldReminder.description,
                date: thisYearDate,
                time: thisYearTime,
                email: oldReminder.email,
                isEmailSent: false,
                isRecurring: true,
                status: "PENDING",
                userId: oldReminder.userId
              }
            });

            recurringCount++;
            console.log(`  - Created successfully!`);
          } else {
            console.log(`  - Already exists for this year, skipping`);
          }
        } else {
          console.log(`  - Future date, skipping`);
        }
      } catch (error) {
        console.error(`Error creating recurring reminder for ${oldReminder.id}:`, error);
      }
    }

    const finalMessage = `Đã gửi ${sentCount} nhắc nhở, ${errorCount} lỗi, tạo ${recurringCount} nhắc nhở lặp lại`;
    console.log(`\n[${new Date().toISOString()}] Process completed: ${finalMessage}`);

    return NextResponse.json({
      success: true,
      message: finalMessage,
      stats: {
        sent: sentCount,
        errors: errorCount,
        recurring: recurringCount,
        total: remindersToSend.length,
        processed: sentCount + errorCount
      },
      results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Error in reminder sending process:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Có lỗi xảy ra khi gửi nhắc nhở",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Allow GET requests for manual triggering
export async function GET() {
  return POST(new NextRequest("http://localhost/api/reminders/send"));
}