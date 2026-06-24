// ─────────────────────────────────────────────────────────────
//  server.js  —  Portfolio Contact Form Backend
//  Receives form submissions → sends Gmail notification to you
// ─────────────────────────────────────────────────────────────

require("dotenv").config();
const express    = require("express");
const cors       = require("cors");
const nodemailer = require("nodemailer");

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────
app.use(express.json());

// Allow your portfolio frontend origin (update in production)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// IMPORTANT: handle preflight requests
app.options("*", cors());

// ── Nodemailer transporter (Gmail) ────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // App Password, not account password
  },
});

// Verify connection once on startup
transporter.verify((err) => {
  if (err) {
    console.error("❌  Gmail connection failed:", err.message);
  } else {
    console.log("✅  Gmail transporter is ready");
  }
});

// ── Helper: build a clean HTML email ─────────────────────────
function buildEmailHtml({ fname, lname, email, subject, message }) {
  const fullName = `${fname} ${lname || ""}`.trim();
  return `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0f;border-radius:16px;overflow:hidden;border:1px solid rgba(124,109,240,0.3)">

      <!-- Header -->
      <div style="background:linear-gradient(135deg,#7c6df0,#c4b5fd);padding:32px 36px">
        <h1 style="margin:0;color:#fff;font-size:1.5rem;font-weight:800;letter-spacing:-0.02em">
          📬 New Contact Message
        </h1>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:0.9rem">
          Someone reached out via your portfolio
        </p>
      </div>

      <!-- Body -->
      <div style="padding:32px 36px">

        <table style="width:100%;border-collapse:collapse">
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid rgba(124,109,240,0.15);color:#9896b8;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.1em;width:120px">Name</td>
            <td style="padding:12px 0;border-bottom:1px solid rgba(124,109,240,0.15);color:#f0effe;font-weight:600">${fullName}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid rgba(124,109,240,0.15);color:#9896b8;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.1em">Email</td>
            <td style="padding:12px 0;border-bottom:1px solid rgba(124,109,240,0.15)">
              <a href="mailto:${email}" style="color:#a08fff;text-decoration:none;font-weight:600">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid rgba(124,109,240,0.15);color:#9896b8;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.1em">Subject</td>
            <td style="padding:12px 0;border-bottom:1px solid rgba(124,109,240,0.15);color:#f0effe">${subject || "— no subject —"}</td>
          </tr>
        </table>

        <!-- Message -->
        <div style="margin-top:24px">
          <p style="color:#9896b8;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:12px">Message</p>
          <div style="background:#16161f;border:1px solid rgba(124,109,240,0.15);border-radius:12px;padding:20px;color:#f0effe;line-height:1.75;font-size:0.95rem;white-space:pre-wrap">${message}</div>
        </div>

        <!-- Reply button -->
        <div style="margin-top:28px;text-align:center">
          <a href="mailto:${email}?subject=Re: ${subject || 'Your message'}"
             style="display:inline-block;background:#7c6df0;color:#fff;padding:12px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:0.9rem;letter-spacing:0.02em">
            ↩ Reply to ${fname}
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background:#111118;padding:20px 36px;text-align:center;border-top:1px solid rgba(124,109,240,0.1)">
        <p style="margin:0;color:#5c5b7a;font-size:0.8rem">
          Shamroza Malik · Portfolio Contact System
        </p>
      </div>
    </div>
  `;
}

// ── POST /api/contact ─────────────────────────────────────────
app.post("/api/contact", async (req, res) => {
  const { fname, lname, email, subject, message } = req.body;

  // Basic validation
  if (!fname || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "Name, email, and message are required.",
    });
  }

  // Simple email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: "Invalid email address." });
  }

  try {
    // Send notification email to YOU
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to:   process.env.NOTIFY_EMAIL,
      replyTo: email,                          // clicking Reply goes to visitor
      subject: `📬 New message from ${fname}: ${subject || "(no subject)"}`,
      html: buildEmailHtml({ fname, lname, email, subject, message }),
    });

    // Optional: send a confirmation email to the visitor
    await transporter.sendMail({
      from: `"Shamroza Malik" <${process.env.GMAIL_USER}>`,
      to:   email,
      subject: "Got your message! I'll be in touch soon ✨",
      html: `
        <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:520px;margin:0 auto;background:#0a0a0f;border-radius:16px;overflow:hidden;border:1px solid rgba(124,109,240,0.3);padding:36px">
          <h2 style="color:#a08fff;font-size:1.3rem;margin:0 0 16px">Hey ${fname} 👋</h2>
          <p style="color:#9896b8;line-height:1.75;margin:0 0 12px">
            Thanks for reaching out! I've received your message and will get back to you
            within <strong style="color:#f0effe">24 hours</strong>.
          </p>
          <p style="color:#9896b8;line-height:1.75;margin:0 0 24px">
            In the meantime, feel free to check out my projects or connect on LinkedIn.
          </p>
          <p style="color:#5c5b7a;font-size:0.85rem;margin:0">— Shamroza Malik · MERN Stack Developer</p>
        </div>
      `,
    });

    console.log(`📨  Contact from ${fname} <${email}> — "${subject || "no subject"}"`);

    return res.status(200).json({
      success: true,
      message: "Message sent! I'll get back to you soon.",
    });

  } catch (err) {
    console.error("❌  Email send error:", err.message);
    return res.status(500).json({
      success: false,
      error: "Failed to send message. Please try again later.",
    });
  }
});

// ── Health check ──────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Portfolio contact API is running." });
});

// ── Start server ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀  Server running at http://localhost:${PORT}`);
});