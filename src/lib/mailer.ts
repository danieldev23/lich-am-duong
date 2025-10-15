import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

export type MailerConfig = {
  from: string | undefined;
  service?: string;
  host?: string;
  port?: number;
  secure?: boolean;
  user?: string;
  pass?: string;
};

async function readSettings(): Promise<Record<string, string>> {
  try {
    const rows = await prisma.siteSettings.findMany();
    return rows.reduce((acc, s) => {
      acc[s.key] = s.value;
      return acc;
    }, {} as Record<string, string>);
  } catch {
    return {};
  }
}

export async function getMailerConfig(): Promise<MailerConfig> {
  const settings = await readSettings();
  const service = (
    process.env.EMAIL_SERVICE ||
    settings["email_service"] ||
    ""
  ).toLowerCase();
  const from =
    process.env.EMAIL_FROM || settings["email_from"] || process.env.EMAIL_USER;
  const host = process.env.EMAIL_HOST || settings["email_host"];
  const portStr = process.env.EMAIL_PORT || settings["email_port"];
  const secureStr = process.env.EMAIL_SECURE || settings["email_secure"];
  const user = process.env.EMAIL_USER || settings["email_user"];
  const pass = process.env.EMAIL_PASS || settings["email_pass"];

  return {
    from,
    service,
    host,
    port: portStr ? Number(portStr) : undefined,
    secure: secureStr === "true",
    user,
    pass,
  };
}

export async function createTransport() {
  const cfg = await getMailerConfig();
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
