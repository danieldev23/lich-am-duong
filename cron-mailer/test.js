#!/usr/bin/env node

require('dotenv').config();
const { createTransport, senderFrom } = require('./lib/mailer');
const ReminderService = require('./lib/reminder-service');
const logger = require('./lib/logger');

class ConfigTester {
  constructor() {
    this.reminderService = new ReminderService();
  }

  async testAPIConnection() {
    console.log('\n🔍 Testing API Connection...');
    try {
      const reminders = await this.reminderService.fetchRemindersFromAPI();
      console.log('✅ API connection successful');
      console.log(`📊 Found ${reminders.length} reminders from API`);
      
      return true;
    } catch (error) {
      console.error('❌ API connection failed:', error.message);
      return false;
    }
  }

  async testEmailConfiguration() {
    console.log('\n📧 Testing Email Configuration...');
    try {
      const transporter = await createTransport();
      const from = await senderFrom();
      
      console.log(`📤 Email sender: ${from}`);
      
      // Verify transporter
      await transporter.verify();
      console.log('✅ Email configuration is valid');
      
      return true;
    } catch (error) {
      console.error('❌ Email configuration failed:', error.message);
      return false;
    }
  }

  async testAPIEndpoints() {
    console.log('\n🌐 Testing API Endpoints...');
    try {
      const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:3000';
      
      // Test /api/reminders/data endpoint
      console.log('📡 Testing /api/reminders/data endpoint...');
      const dataResponse = await fetch(`${apiBaseUrl}/api/reminders/data`);
      
      if (!dataResponse.ok) {
        throw new Error(`Data API failed: ${dataResponse.status} ${dataResponse.statusText}`);
      }
      
      const dataResult = await dataResponse.json();
      console.log(`✅ Data API working - Found ${dataResult.reminders.length} reminders`);
      console.log(`📊 Stats: ${JSON.stringify(dataResult.stats, null, 2)}`);
      
      // Test /api/reminders/status endpoint (GET)
      console.log('\n📡 Testing /api/reminders/status endpoint...');
      const statusResponse = await fetch(`${apiBaseUrl}/api/reminders/status`);
      
      if (!statusResponse.ok) {
        throw new Error(`Status API failed: ${statusResponse.status} ${statusResponse.statusText}`);
      }
      
      const statusResult = await statusResponse.json();
      console.log(`✅ Status API working - Found ${statusResult.reminders.length} reminders`);
      console.log(`📊 Status Stats: ${JSON.stringify(statusResult.stats, null, 2)}`);
      
      return true;
    } catch (error) {
      console.error('❌ API endpoints test failed:', error.message);
      return false;
    }
  }

  async testReminderProcessing() {
    console.log('\n⚙️ Testing Reminder Processing...');
    try {
      const reminders = await this.reminderService.findRemindersToSend();
      console.log(`📋 Found ${reminders.length} pending reminders to check`);
      
      if (reminders.length > 0) {
        const now = new Date();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        console.log('\n📝 Reminder Details:');
        reminders.forEach((reminder, index) => {
          const shouldSend = this.reminderService.shouldSendReminder(reminder, now, today);
          console.log(`${index + 1}. ${reminder.title}`);
          console.log(`   📅 Date: ${new Date(reminder.date).toLocaleDateString('vi-VN')}`);
          console.log(`   ⏰ Time: ${reminder.time ? new Date(reminder.time).toLocaleTimeString('vi-VN') : 'No specific time'}`);
          console.log(`   📧 Email: ${reminder.email}`);
          console.log(`   🔄 Status: ${reminder.status}`);
          console.log(`   ✉️ Should send now: ${shouldSend ? 'YES' : 'NO'}`);
          if (reminder._debug) {
            console.log(`   🐛 Debug: Should process = ${reminder._debug.shouldProcess}`);
          }
          console.log('');
        });
      }
      
      console.log('✅ Reminder processing logic working correctly');
      return true;
    } catch (error) {
      console.error('❌ Reminder processing test failed:', error.message);
      return false;
    }
  }

  async sendTestEmail() {
    console.log('\n📬 Sending Test Email...');
    try {
      const transporter = await createTransport();
      const from = await senderFrom();
      
      const testEmail = {
        from: from,
        to: from, // Send to self for testing
        subject: '🧪 Test Email from Calendar Cron Mailer',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #0f766e, #059669); color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">📅 XEMLICH.ME</h1>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Test Email</p>
            </div>
            
            <div style="padding: 30px; background: #f9fafb;">
              <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h2 style="color: #0f766e; margin-top: 0;">🧪 Test Email</h2>
                
                <p>This is a test email from Calendar Cron Mailer service.</p>
                <p><strong>Sent at:</strong> ${new Date().toLocaleString('vi-VN')}</p>
                <p><strong>From:</strong> ${from}</p>
                
                <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
                  <p style="margin: 0; color: #6b7280; font-size: 14px;">
                    If you received this email, your email configuration is working correctly! 🎉
                  </p>
                </div>
              </div>
            </div>
          </div>
        `
      };
      
      const result = await transporter.sendMail(testEmail);
      console.log(`✅ Test email sent successfully!`);
      console.log(`📧 Message ID: ${result.messageId}`);
      console.log(`📤 Sent to: ${from}`);
      
      return true;
    } catch (error) {
      console.error('❌ Test email failed:', error.message);
      return false;
    }
  }

  async runFullTest() {
    console.log('🚀 Starting Calendar Cron Mailer Configuration Test\n');
    console.log('=' .repeat(60));
    
    const results = {
      api: false,
      email: false,
      processing: false,
      testEmail: false
    };
    
    // Test API connection
    results.api = await this.testAPIConnection();
    
    // Test email configuration
    results.email = await this.testEmailConfiguration();
    
    // Test API endpoints
    results.apiEndpoints = await this.testAPIEndpoints();
    
    // Test reminder processing
    results.processing = await this.testReminderProcessing();
    
    // Send test email (only if email config is working)
    if (results.email) {
      results.testEmail = await this.sendTestEmail();
    }
    
    // Summary
    console.log('\n' + '=' .repeat(60));
    console.log('📊 TEST SUMMARY:');
    console.log('=' .repeat(60));
    
    console.log(`API Connection: ${results.api ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Email Configuration: ${results.email ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`API Endpoints: ${results.apiEndpoints ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Reminder Processing: ${results.processing ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Test Email: ${results.testEmail ? '✅ PASS' : '❌ FAIL'}`);
    
    const allPassed = Object.values(results).every(result => result);
    
    console.log('\n' + '=' .repeat(60));
    if (allPassed) {
      console.log('🎉 ALL TESTS PASSED! Your cron mailer is ready to use.');
      console.log('\nTo start the service:');
      console.log('  node index.js');
      console.log('\nTo run once:');
      console.log('  node index.js --test');
    } else {
      console.log('⚠️  SOME TESTS FAILED! Please check the configuration.');
      console.log('\nCommon solutions:');
      console.log('- Check API_BASE_URL in .env file');
      console.log('- Verify email credentials (EMAIL_HOST, EMAIL_USER, EMAIL_PASS)');
      console.log('- For Gmail: use App Password, not regular password');
      console.log('- Check network connectivity');
      console.log('- Make sure the main application is running');
    }
    console.log('=' .repeat(60));
    
    return allPassed;
  }

  async runSpecificTest(testType) {
    switch (testType) {
      case 'api':
      case 'connection':
        return await this.testAPIConnection();
      
      case 'email':
        const emailTest = await this.testEmailConfiguration();
        if (emailTest) {
          await this.sendTestEmail();
        }
        return emailTest;
      
      case 'endpoints':
        return await this.testAPIEndpoints();
      
      case 'process':
      case 'processing':
        return await this.testReminderProcessing();
      
      default:
        console.error(`Unknown test type: ${testType}`);
        return false;
    }
  }

  showHelp() {
    console.log(`
Calendar Cron Mailer - Configuration Tester

Usage:
  node test.js [options]

Options:
  --email-only      Test only email configuration
  --db-only         Test only database connection
  --api-only        Test only API endpoints
  --process-only    Test only reminder processing
  --help, -h        Show this help message

Examples:
  node test.js                    # Run all tests
  node test.js --email-only       # Test email only
  node test.js --db-only          # Test database only
  node test.js --api-only         # Test API endpoints only
  node test.js --process-only     # Test processing only

Environment Variables Required:
  DATABASE_URL      Database connection string
  EMAIL_HOST        SMTP host
  EMAIL_PORT        SMTP port
  EMAIL_USER        Email username
  EMAIL_PASS        Email password
  EMAIL_FROM        From email address
    `);
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const tester = new ConfigTester();

  try {
    // Parse command line arguments
    if (args.includes('--help') || args.includes('-h')) {
      tester.showHelp();
      return;
    }

    if (args.includes('--email-only')) {
      const success = await tester.runSpecificTest('email');
      process.exit(success ? 0 : 1);
    }

    if (args.includes('--db-only')) {
      const success = await tester.runSpecificTest('database');
      process.exit(success ? 0 : 1);
    }

    if (args.includes('--api-only')) {
      const success = await tester.runSpecificTest('api');
      process.exit(success ? 0 : 1);
    }

    if (args.includes('--process-only')) {
      const success = await tester.runSpecificTest('processing');
      process.exit(success ? 0 : 1);
    }

    // Run full test suite
    const success = await tester.runFullTest();
    process.exit(success ? 0 : 1);

  } catch (error) {
    console.error('❌ Test execution failed:', error.message);
    logger.error('Test execution error', {
      error: error.message,
      stack: error.stack
    });
    process.exit(1);
  }
}

// Run the tests
if (require.main === module) {
  main();
}

module.exports = ConfigTester;