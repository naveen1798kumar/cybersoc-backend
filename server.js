import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import blogRoutes from './routes/blogRoutes.js'; // Route handler for blogs


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase limit to 10mb
app.use(express.urlencoded({ limit: '10mb', extended: true })); // For form data

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
app.use('/api/blogs', blogRoutes);

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
