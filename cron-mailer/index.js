#!/usr/bin/env node

require('dotenv').config();
const cron = require('node-cron');
const ReminderService = require('./lib/reminder-service');
const logger = require('./lib/logger');

class CronMailer {
  constructor() {
    this.reminderService = new ReminderService();
    this.cronSchedule = process.env.CRON_SCHEDULE || '*/5 * * * *'; // Mỗi 5 phút
    this.timezone = process.env.TIMEZONE || 'Asia/Ho_Chi_Minh';
    this.isRunning = false;
  }

  async processReminders() {
    if (this.isRunning) {
      logger.warn('Previous reminder processing is still running, skipping this cycle');
      return;
    }

    this.isRunning = true;
    logger.info('Starting reminder processing cycle...');

    try {
      const result = await this.reminderService.processReminders();
      
      if (result.success) {
        logger.info('Reminder processing completed successfully', {
          stats: result.stats,
          processingTime: result.processingTimeMs
        });
      } else {
        logger.error('Reminder processing failed', {
          error: result.error,
          processingTime: result.processingTimeMs
        });
      }

      return result;
    } catch (error) {
      logger.error('Unexpected error during reminder processing', {
        error: error.message,
        stack: error.stack
      });
      return {
        success: false,
        error: error.message
      };
    } finally {
      this.isRunning = false;
    }
  }

  startCronJob() {
    logger.info('Starting Calendar Cron Mailer', {
      schedule: this.cronSchedule,
      timezone: this.timezone,
      logLevel: process.env.LOG_LEVEL || 'info'
    });

    // Validate cron schedule
    if (!cron.validate(this.cronSchedule)) {
      logger.error('Invalid cron schedule', { schedule: this.cronSchedule });
      process.exit(1);
    }

    // Schedule the cron job
    const task = cron.schedule(this.cronSchedule, async () => {
      await this.processReminders();
    }, {
      scheduled: false,
      timezone: this.timezone
    });

    // Start the cron job
    task.start();
    logger.info('Cron job started successfully');

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      logger.info('Received SIGINT, shutting down gracefully...');
      task.stop();
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      logger.info('Received SIGTERM, shutting down gracefully...');
      task.stop();
      process.exit(0);
    });

    // Keep the process alive
    process.on('uncaughtException', (error) => {
      logger.error('Uncaught exception', {
        error: error.message,
        stack: error.stack
      });
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled rejection', {
        reason: reason,
        promise: promise
      });
      process.exit(1);
    });
  }

  async runOnce() {
    logger.info('Running reminder processing once...');
    const result = await this.processReminders();
    
    if (result.success) {
      logger.info('One-time processing completed successfully');
      process.exit(0);
    } else {
      logger.error('One-time processing failed');
      process.exit(1);
    }
  }

  showHelp() {
    console.log(`
Calendar Cron Mailer - Email Reminder Service

Usage:
  node index.js [options]

Options:
  --test, -t        Run once and exit (for testing)
  --run-once, -o    Run once immediately, then start cron
  --help, -h        Show this help message

Environment Variables:
  CRON_SCHEDULE     Cron schedule (default: */5 * * * *)
  TIMEZONE          Timezone (default: Asia/Ho_Chi_Minh)
  LOG_LEVEL         Log level: debug, info, warn, error (default: info)
  LOG_FILE          Log file path (default: ./logs/cron-mailer.log)

Examples:
  node index.js                    # Start cron service
  node index.js --test             # Run once and exit
  node index.js --run-once         # Run once, then start cron
  CRON_SCHEDULE="* * * * *" node index.js  # Run every minute

For more information, see CRON-MAILER-GUIDE.md
    `);
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const cronMailer = new CronMailer();

  // Parse command line arguments
  if (args.includes('--help') || args.includes('-h')) {
    cronMailer.showHelp();
    return;
  }

  if (args.includes('--test') || args.includes('-t')) {
    await cronMailer.runOnce();
    return;
  }

  if (args.includes('--run-once') || args.includes('-o')) {
    logger.info('Running once immediately before starting cron...');
    await cronMailer.processReminders();
  }

  // Start the cron service
  cronMailer.startCronJob();
}

// Run the application
if (require.main === module) {
  main().catch((error) => {
    logger.error('Failed to start cron mailer', {
      error: error.message,
      stack: error.stack
    });
    process.exit(1);
  });
}

module.exports = CronMailer;