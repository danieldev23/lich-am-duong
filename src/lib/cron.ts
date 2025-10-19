// Global cron job manager
let cronInterval: NodeJS.Timeout | null = null;
let isRunning = false;
let intervalSeconds = 30; // Default to 30 seconds for real-time responsiveness
let smartScheduling = true; // Enable smart scheduling

export async function startCronJob(customIntervalSeconds?: number) {
  if (isRunning) {
    console.log('🔄 Cron job already running');
    return;
  }

  if (customIntervalSeconds) {
    intervalSeconds = customIntervalSeconds;
    smartScheduling = false; // Disable smart scheduling if custom interval is set
  }

  console.log(`🚀 Starting real-time cron job scheduler (${intervalSeconds}s intervals, smart: ${smartScheduling})...`);
  isRunning = true;

  // Chạy ngay lập tức
  setTimeout(async () => {
    await runCronJob();
  }, 2000); // Wait 2 seconds after server start

  // Start the scheduling loop
  scheduleNextRun();

  console.log(`✅ Real-time cron job started - running every ${intervalSeconds} second(s)`);
}

// Smart scheduling function
async function scheduleNextRun() {
  if (!isRunning) return;

  let nextInterval = intervalSeconds * 1000;

  if (smartScheduling) {
    // Get next reminder time to optimize scheduling
    const nextReminderTime = await getNextReminderTime();
    if (nextReminderTime) {
      const timeUntilNext = nextReminderTime - Date.now();
      
      if (timeUntilNext > 0 && timeUntilNext < 5 * 60 * 1000) { // Within 5 minutes
        // If reminder is within 5 minutes, check more frequently
        nextInterval = Math.min(15000, timeUntilNext / 4); // Check 4 times before reminder
        console.log(`⚡ Smart scheduling: Next reminder in ${Math.round(timeUntilNext/1000)}s, checking in ${Math.round(nextInterval/1000)}s`);
      }
    }
  }

  cronInterval = setTimeout(async () => {
    await runCronJob();
    scheduleNextRun(); // Schedule the next run
  }, nextInterval);
}

// Manual trigger function
export async function triggerCronJob() {
  console.log('🔥 Manual trigger requested');
  await runCronJob();
}

export function stopCronJob() {
  if (cronInterval) {
    clearTimeout(cronInterval);
    cronInterval = null;
  }
  isRunning = false;
  console.log('🛑 Cron job stopped');
}

// Get the next reminder time for smart scheduling
async function getNextReminderTime(): Promise<number | null> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/reminders/next`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const result = await response.json();
      return result.nextReminderTime ? new Date(result.nextReminderTime).getTime() : null;
    }
  } catch (error) {
    // Silently fail and use default scheduling
  }
  return null;
}

async function runCronJob() {
  try {
    console.log(`\n[${new Date().toISOString()}] ========== Running cron job ==========`);
    
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/reminders/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    
    console.log(`Status: ${response.status}`);
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
      result.results.forEach((r: any, i: number) => {
        console.log(`  ${i + 1}. ${r.title} (${r.email}) - ${r.status}`);
        if (r.error) console.log(`     Error: ${r.error}`);
      });
    }
    
    console.log(`[${new Date().toISOString()}] ========================================\n`);
  } catch (error: any) {
    console.error(`[${new Date().toISOString()}] Cron job error:`, error.message);
  }
}

export function getCronStatus() {
  return {
    isRunning,
    intervalSeconds,
    smartScheduling,
    nextRun: cronInterval ? new Date(Date.now() + intervalSeconds * 1000) : null,
  };
}