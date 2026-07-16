import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
// Optional — the visitor-facing confirmation. If unset, only the owner notification is sent.
const AUTOREPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID;

const isConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

if (!isConfigured) {
  console.warn(
    "EmailJS env vars are missing — set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in .env (see .env.example)."
  );
}

// Sends a contact-form submission as two emails via EmailJS (no backend required):
// 1. A notification to the site owner — required, template vars: from_name, from_email,
//    subject, message. Its "To Email" in the EmailJS dashboard must be a fixed address.
// 2. An auto-reply confirmation to the visitor — optional/best-effort, same template
//    vars, but its "To Email" in the dashboard must be the dynamic {{from_email}}.
// A failure sending #2 never fails the submission — the owner notification is what
// the caller's success/error state is based on.
export async function sendContactEmail({ fname, lname, email, subject, message }) {
  if (!isConfigured) {
    throw new Error("Email notifications aren't connected yet.");
  }

  const templateParams = {
    from_name: [fname, lname].filter(Boolean).join(" "),
    from_email: email,
    subject: subject || "New message from your portfolio",
    message,
  };

  const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY });

  if (AUTOREPLY_TEMPLATE_ID) {
    try {
      await emailjs.send(SERVICE_ID, AUTOREPLY_TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY });
    } catch (err) {
      console.warn("Owner notification sent, but the visitor auto-reply failed:", err);
    }
  }

  return result;
}
