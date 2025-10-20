module.exports = {
  apps: [{
    name: 'calendar-cron-mailer',
    script: 'index.js',
    cwd: './cron-mailer',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      LOG_LEVEL: 'info',
      CRON_SCHEDULE: '*/1 * * * *',
      TIMEZONE: 'Asia/Ho_Chi_Minh'
    },
    env_development: {
      NODE_ENV: 'development',
      LOG_LEVEL: 'debug',
      CRON_SCHEDULE: '*/1 * * * *', // Every minute for development
      TIMEZONE: 'Asia/Ho_Chi_Minh'
    },
    log_file: './logs/pm2-combined.log',
    out_file: './logs/pm2-out.log',
    error_file: './logs/pm2-error.log',
    time: true,
    merge_logs: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    
    // Restart policy
    min_uptime: '10s',
    max_restarts: 10,
    
    // Advanced PM2 features
    kill_timeout: 5000,
    listen_timeout: 3000,
    
    // Environment variables that can be overridden
    env_variables: [
      'DATABASE_URL',
      'EMAIL_HOST',
      'EMAIL_PORT',
      'EMAIL_SECURE',
      'EMAIL_USER',
      'EMAIL_PASS',
      'EMAIL_FROM',
      'CRON_SCHEDULE',
      'TIMEZONE',
      'LOG_LEVEL',
      'LOG_FILE'
    ]
  }]
};