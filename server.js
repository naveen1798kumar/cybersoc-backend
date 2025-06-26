import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import blogRoutes from './routes/blogRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js'; // <-- Add this line
import nodemailer from 'nodemailer';
import emailRoutes from './routes/emailRoute.js';



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cyber-soc', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Base route
app.get('/', (req, res) => {
  res.send('✅ API is running');
});

// Blog routes
app.use('/blogs', blogRoutes);
app.use('/api/blogs', blogRoutes); 

// Category routes
app.use('/categories', categoryRoutes);

// Service routes
app.use('/services', serviceRoutes); // <-- Add this line

app.use('/api', emailRoutes);

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Create the transporter using Hostinger SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true, // true for port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Compose the message
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.EMAIL_USER,
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Email send failed:", error);
    res.status(500).json({ success: false, message: "Email failed to send." });
  }
});
