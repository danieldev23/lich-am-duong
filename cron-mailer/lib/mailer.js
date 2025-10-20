const nodemailer = require('nodemailer');
const logger = require('./logger');

class MailerConfig {
  constructor() {
    this.from = null;
    this.service = null;
    this.host = null;
    this.port = null;
    this.secure = null;
    this.user = null;
    this.pass = null;
  }
}

// Settings are now read from environment variables only
// Database settings have been removed for API-only approach

async function getMailerConfig() {
  const service = (process.env.EMAIL_SERVICE || "").toLowerCase();
  
  const config = new MailerConfig();
  config.from = process.env.EMAIL_FROM || process.env.EMAIL_USER;
  config.service = service;
  config.host = process.env.EMAIL_HOST;
  config.port = process.env.EMAIL_PORT;
  config.secure = process.env.EMAIL_SECURE;
  config.user = process.env.EMAIL_USER;
  config.pass = process.env.EMAIL_PASS;

  return {
    from: config.from,
    service: config.service,
    host: config.host,
    port: config.port ? Number(config.port) : undefined,
    secure: config.secure === "true",
    user: config.user,
    pass: config.pass,
  };
}

async function createTransport() {
  const cfg = await getMailerConfig();
  
  logger.debug('Creating email transport', {
    service: cfg.service,
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    hasAuth: !!(cfg.user && cfg.pass)
  });

  if (
    cfg.service === "gmail" ||
    cfg.service === "gmailapp" ||
    cfg.service === "gmail_app"
  ) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: { user: cfg.user, pass: cfg.pass },
    });
  }
  
  return nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port ?? 587,
    secure: cfg.secure ?? false,
    auth: cfg.user && cfg.pass ? { user: cfg.user, pass: cfg.pass } : undefined,
  });
}

async function senderFrom() {
  const cfg = await getMailerConfig();
  return cfg.from || cfg.user || "no-reply@example.com";
}

module.exports = {
  getMailerConfig,
  createTransport,
  senderFrom
};