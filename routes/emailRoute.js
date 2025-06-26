// routes/emailRoute.js
import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"CyberSoc Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `New Message from ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

await transporter.sendMail({
  from: `"CyberSoc Solutions" <${process.env.EMAIL_USER}>`,
  to: email, // user's email
  subject: `Thank you for contacting CyberSoc`,
  html: `
    <p>Dear ${name},</p>
    <p>Thank you for reaching out to CyberSoc Solutions. We have received your message and will get back to you shortly.</p>
    <hr/>
    <p><strong>Your Message:</strong></p>
    <p>${message}</p>
    <br/>
    <p>Best regards,<br/>CyberSoc Team</p>
  `,
});

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Email failed" });
  }
});

export default router;
