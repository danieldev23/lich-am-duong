const { createTransport, senderFrom } = require('./mailer');
const logger = require('./logger');

class ReminderService {
  constructor() {
    this.apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:3000';
  }

  async fetchRemindersFromAPI() {
    try {
      logger.debug('Fetching reminders from API', {
        url: `${this.apiBaseUrl}/api/reminders/data`
      });

      const response = await fetch(`${this.apiBaseUrl}/api/reminders/data`);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error('API returned unsuccessful response');
      }

      logger.info(`Fetched ${data.reminders.length} reminders from API`);
      return data.reminders;
    } catch (error) {
      logger.error('Failed to fetch reminders from API', {
        error: error.message,
        url: `${this.apiBaseUrl}/api/reminders/data`
      });
      throw error;
    }
  }

  async findRemindersToSend() {
    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    logger.debug('Finding reminders to send', {
      currentTime: now.toISOString(),
      todayStart: today.toISOString(),
      tomorrowStart: tomorrow.toISOString()
    });
    
    // Fetch reminders from API
    const apiReminders = await this.fetchRemindersFromAPI();
    // Filter reminders that should be processed
    const reminders = apiReminders.filter(reminder => {
      const reminderDate = new Date(reminder.date);
      reminderDate.setHours(0, 0, 0, 0);
      return reminderDate < tomorrow && reminder.status === "PENDING";
    });
    logger.info(`Filtered ${reminders.length} pending reminders from API data`);

    return reminders;
  }

  shouldSendReminder(reminder, now, today) {
    const reminderDate = new Date(reminder.date);
    reminderDate.setHours(0, 0, 0, 0);
    
    logger.debug(`Checking reminder ${reminder.id}: ${reminder.title}`, {
      reminderDate: reminderDate.toISOString(),
      hasTime: !!reminder.time
    });
    
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
        
        logger.debug(`Time check for reminder ${reminder.id}`, {
          currentTime: `${currentHour}:${currentMinute} (${currentTotalMinutes} mins)`,
          reminderTime: `${reminderHour}:${reminderMinute} (${reminderTotalMinutes} mins)`
        });
        
        // Send if current time is at or after reminder time
        // Or if the reminder is from a past date (overdue)
        if (reminderDate < today || currentTotalMinutes >= reminderTotalMinutes) {
          logger.debug(`Should send reminder ${reminder.id}: YES (time condition met)`);
          return true;
        } else {
          logger.debug(`Should send reminder ${reminder.id}: NO (too early, need to wait ${reminderTotalMinutes - currentTotalMinutes} minutes)`);
          return false;
        }
      } else {
        // No specific time - send anytime on the reminder date or if overdue
        logger.debug(`Should send reminder ${reminder.id}: YES (no specific time)`);
        return true;
      }
    } else {
      logger.debug(`Should send reminder ${reminder.id}: NO (future date)`);
      return false;
    }
  }

  buildEmailContent(reminder) {
    const reminderDate = new Date(reminder.date);
    reminderDate.setHours(0, 0, 0, 0);

    return {
      subject: `🔔 Nhắc nhở: ${reminder.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0f766e, #059669); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">📅 XEMLICH.ME</h1>
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
                  Nhắc nhở này được gửi từ <strong>XEMLICH.ME</strong><br>
                  Chúc bạn có một ngày tốt lành! 🌟
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
    };
  }

  async sendEmail(reminder, transporter, from) {
    const emailContent = this.buildEmailContent(reminder);
    
    const mailOptions = {
      from: from,
      to: reminder.email,
      subject: emailContent.subject,
      html: emailContent.html,
    };

    logger.debug(`Sending email to: ${reminder.email}`, {
      reminderId: reminder.id,
      subject: emailContent.subject
    });
    
    const emailResult = await transporter.sendMail(mailOptions);
    
    logger.info(`Email sent successfully for reminder ${reminder.id}`, {
      messageId: emailResult.messageId,
      email: reminder.email
    });

    return emailResult;
  }

  async updateReminderStatusViaAPI(reminderId, status, isEmailSent = false) {
    try {
      // Prepare the update data for status endpoint
      const updateData = {
        id: reminderId,
        status: status,
        isEmailSent: isEmailSent
      };

      logger.debug('Updating reminder status via API', {
        reminderId,
        status,
        isEmailSent,
        url: `${this.apiBaseUrl}/api/reminders/status`
      });

      const response = await fetch(`${this.apiBaseUrl}/api/reminders/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API PUT request failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(`API returned unsuccessful response: ${result.error || 'Unknown error'}`);
      }

      logger.info(`Successfully updated reminder ${reminderId} status to ${status} via API`);
      return result;
    } catch (error) {
      logger.error(`Failed to update reminder ${reminderId} status via API`, {
        error: error.message,
        reminderId,
        status
      });
      throw error;
    }
  }

  async updateReminderStatus(reminderId, status, isEmailSent = false) {
    // Update via API only
    await this.updateReminderStatusViaAPI(reminderId, status, isEmailSent);
    logger.debug(`Updated reminder ${reminderId} status to ${status} via API`);
  }

  // Note: Recurring reminders functionality has been removed
  // as it requires direct database access. This should be handled
  // by the main application's business logic instead.

  async processReminders() {
    const startTime = Date.now();
    logger.info('Starting reminder processing...');

    try {
      const now = new Date();
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Get reminders to send
      const remindersToSend = await this.findRemindersToSend();
      
      if (remindersToSend.length === 0) {
        logger.info('No reminders to process');
        return {
          success: true,
          stats: { sent: 0, errors: 0, total: 0, processed: 0 },
          results: []
        };
      }

      // Create email transporter
      const transporter = await createTransport();
      const from = await senderFrom();

      let sentCount = 0;
      let errorCount = 0;
      const results = [];

      // Process each reminder
      for (const reminder of remindersToSend) {
        try {
          if (this.shouldSendReminder(reminder, now, today)) {
            // Send email
            const emailResult = await this.sendEmail(reminder, transporter, from);
            
            // Update status
            await this.updateReminderStatus(reminder.id, "SENT", true);

            sentCount++;
            results.push({
              id: reminder.id,
              title: reminder.title,
              email: reminder.email,
              status: "sent",
              messageId: emailResult.messageId
            });
          } else {
            logger.debug(`Skipping reminder ${reminder.id} (conditions not met)`);
          }
        } catch (error) {
          logger.error(`Error sending reminder ${reminder.id}`, {
            error: error.message,
            reminderId: reminder.id,
            title: reminder.title
          });
          
          // Update status to FAILED
          try {
            await this.updateReminderStatus(reminder.id, "FAILED");
          } catch (updateError) {
            logger.error(`Failed to update reminder ${reminder.id} status`, {
              error: updateError.message
            });
          }
          
          errorCount++;
          results.push({
            id: reminder.id,
            title: reminder.title,
            email: reminder.email,
            status: "error",
            error: error.message
          });
        }
      }

      const processingTime = Date.now() - startTime;
      const finalMessage = `Processed ${remindersToSend.length} reminders: ${sentCount} sent, ${errorCount} errors`;
      
      logger.info('Reminder processing completed', {
        message: finalMessage,
        processingTimeMs: processingTime,
        stats: {
          sent: sentCount,
          errors: errorCount,
          total: remindersToSend.length,
          processed: sentCount + errorCount
        }
      });

      return {
        success: true,
        message: finalMessage,
        stats: {
          sent: sentCount,
          errors: errorCount,
          total: remindersToSend.length,
          processed: sentCount + errorCount
        },
        results,
        processingTimeMs: processingTime
      };

    } catch (error) {
      const processingTime = Date.now() - startTime;
      logger.error('Error in reminder processing', {
        error: error.message,
        processingTimeMs: processingTime
      });
      
      return {
        success: false,
        error: "Có lỗi xảy ra khi gửi nhắc nhở",
        details: error.message,
        processingTimeMs: processingTime
      };
    }
  }

  // No cleanup needed for API-only approach
}

module.exports = ReminderService;