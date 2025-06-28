import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/send-email', async (req, res) => {
  const { name, email, message, service } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: true, // true for 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to Admin (operations@...)
    await transporter.sendMail({
      from: `"CyberSoc Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>📩 New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service Required:</strong> ${service}</p>
        <p><strong>Message:</strong><br/>${message}</p>
        <hr/>
        <p>Received via the website contact form</p>
      `,
    });

    // Confirmation email to sender
    await transporter.sendMail({
      from: `"CyberSoc Solutions" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `✅ We've received your message at CyberSoc`,
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for contacting <strong>CyberSoc Solutions</strong> regarding <strong>${service}</strong>.</p>
        <p>We have received your message and our team will respond within 24 hours.</p>
        <hr/>
        <p><strong>Your Message:</strong></p>
        <p>${message}</p>
        <br/>
        <p>Best regards,<br/>CyberSoc Team</p>
        <p style="font-size: 0.85rem; color: #888;">This is an automated email, please do not reply.</p>
      `,
    });

    res.status(200).json({ success: true, message: 'Emails sent successfully.' });
  } catch (error) {
    console.error("❌ Email error:", error);
    res.status(500).json({ success: false, message: "Email failed to send." });
  }
});

export default router;
