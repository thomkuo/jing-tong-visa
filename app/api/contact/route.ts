import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ── In-memory rate limiting ──────────────────────────────────────────────────
const ipMap = new Map<string, { count: number; resetAt: number }>();
let globalDaily = { count: 0, resetAt: 0 };

const IP_LIMIT = 3;
const IP_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const DAILY_LIMIT = 50;

export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // ── Layer 1: Honeypot ──────────────────────────────────────────────────────
  if (body.website) {
    // Bot filled the hidden field — silently succeed without sending
    return NextResponse.json({ success: true });
  }

  // ── Layer 2: Rate limiting ─────────────────────────────────────────────────
  const now = Date.now();

  // Global daily cap (resets at midnight UTC)
  const midnight = new Date();
  midnight.setUTCHours(24, 0, 0, 0);
  if (now >= globalDaily.resetAt) {
    globalDaily = { count: 0, resetAt: midnight.getTime() };
  }
  if (globalDaily.count >= DAILY_LIMIT) {
    return NextResponse.json({ error: "Service temporarily unavailable" }, { status: 429 });
  }

  // Per-IP cap
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const ipEntry = ipMap.get(ip);
  if (ipEntry && now < ipEntry.resetAt) {
    if (ipEntry.count >= IP_LIMIT) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    ipEntry.count++;
  } else {
    ipMap.set(ip, { count: 1, resetAt: now + IP_WINDOW_MS });
  }

  globalDaily.count++;

  // ── Field extraction ───────────────────────────────────────────────────────
  const { name, email, phone, wechat, visaType, state, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const emailBody = `
    <h2 style="color:#C0392B">New Contact Form Submission</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px">
      <tr><td style="padding:8px 0;color:#666;width:140px"><strong>Name</strong></td><td>${name}</td></tr>
      <tr><td style="padding:8px 0;color:#666"><strong>Email</strong></td><td>${email}</td></tr>
      <tr><td style="padding:8px 0;color:#666"><strong>Phone</strong></td><td>${phone || "Not provided"}</td></tr>
      <tr><td style="padding:8px 0;color:#666"><strong>WeChat</strong></td><td>${wechat || "Not provided"}</td></tr>
      <tr><td style="padding:8px 0;color:#666"><strong>Visa Type</strong></td><td>${visaType || "Not specified"}</td></tr>
      <tr><td style="padding:8px 0;color:#666"><strong>State</strong></td><td>${state || "Not provided"}</td></tr>
    </table>
    <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
    <p style="color:#666"><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${message}</p>
  `;

  if (!process.env.RESEND_API_KEY) {
    // Development fallback: log and succeed without sending
    console.warn(
      "[contact] RESEND_API_KEY not set — logging submission instead of sending email."
    );
    console.log("[contact]", { name, email, phone, wechat, visaType, state, message });
    return NextResponse.json({ success: true });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Jing Tong Visa Website <noreply@contact.jingtongvisa.com>",
      to: "contact@jingtongvisa.com",
      replyTo: email,
      subject: `Contact Form — ${visaType || "General Inquiry"} from ${name}`,
      html: emailBody,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact] Failed to send email:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
