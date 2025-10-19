#!/usr/bin/env node

const http = require('http');

function callCronJob() {
  console.log(`\n[${new Date().toISOString()}] ========== Starting cron job ==========`);
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/reminders/send',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 60000, // 60 second timeout
  };

  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const result = JSON.parse(data);
        console.log(`[${new Date().toISOString()}] ========== Cron job completed ==========`);
        console.log(`Status Code: ${res.statusCode}`);
        console.log(`Success: ${result.success}`);
        console.log(`Message: ${result.message || 'No message'}`);
        
        if (result.stats) {
          console.log(`Stats:`);
          console.log(`  - Total checked: ${result.stats.total}`);
          console.log(`  - Processed: ${result.stats.processed || 0}`);
          console.log(`  - Sent: ${result.stats.sent}`);
          console.log(`  - Errors: ${result.stats.errors}`);
          console.log(`  - Recurring created: ${result.stats.recurring}`);
        }
        
        if (result.results && result.results.length > 0) {
          console.log(`Results:`);
          result.results.forEach((r, i) => {
            console.log(`  ${i + 1}. ${r.title} (${r.email}) - ${r.status}`);
            if (r.error) console.log(`     Error: ${r.error}`);
          });
        }
        
        console.log(`[${new Date().toISOString()}] ========================================\n`);
      } catch (error) {
        console.error(`[${new Date().toISOString()}] Failed to parse response:`, data);
      }
    });
  });

  req.on('error', (error) => {
    console.error(`[${new Date().toISOString()}] Cron job error:`, error.message);
  });

  req.on('timeout', () => {
    console.error(`[${new Date().toISOString()}] Cron job timeout (60s)`);
    req.destroy();
  });

  req.end();
}

// Test server availability first
function testServer() {
  console.log(`[${new Date().toISOString()}] Testing server availability...`);
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/cron/test',
    method: 'GET',
    timeout: 10000,
  };

  const req = http.request(options, (res) => {
    if (res.statusCode === 200) {
      console.log(`[${new Date().toISOString()}] ✅ Server is available!`);
      console.log(`[${new Date().toISOString()}] Starting cron job scheduler...`);
      
      // Chạy ngay lập tức
      setTimeout(() => {
        callCronJob();
      }, 2000); // Wait 2 seconds before first run
      
      // Chạy mỗi 5 phút
      setInterval(callCronJob, 5 * 60 * 1000);
      
      console.log(`[${new Date().toISOString()}] 🚀 Local cron job started - running every 5 minutes`);
      console.log(`[${new Date().toISOString()}] Press Ctrl+C to stop\n`);
    } else {
      console.error(`[${new Date().toISOString()}] ❌ Server not ready, status: ${res.statusCode}`);
      process.exit(1);
    }
  });

  req.on('error', (error) => {
    console.error(`[${new Date().toISOString()}] ❌ Server not available:`, error.message);
    console.log('Please make sure the Next.js server is running on port 3000');
    console.log('Run: npm run dev');
    process.exit(1);
  });

  req.on('timeout', () => {
    console.error(`[${new Date().toISOString()}] ❌ Server test timeout`);
    req.destroy();
    process.exit(1);
  });

  req.end();
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log(`\n[${new Date().toISOString()}] 🛑 Cron job stopped by user`);
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log(`\n[${new Date().toISOString()}] 🛑 Cron job terminated`);
  process.exit(0);
});

// Start by testing server availability
console.log(`[${new Date().toISOString()}] 🔄 Initializing cron job...`);
testServer();