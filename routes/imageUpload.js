// routes/imageUpload.js
import express from 'express';
import imagekit from '../config/imagekit.js'; // Your ImageKit config
import multer from 'multer';

const router = express.Router();
const upload = multer();

router.post('/service', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    if (!file || !file.mimetype.startsWith('image/')) {
      return res.status(400).json({ success: false, message: 'Only image files are allowed.' });
    }

    const uploadResponse = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
      folder: '/services',
    });

    res.status(200).json({ success: true, url: uploadResponse.url });
  } catch (err) {
    console.error('Image upload error:', err);
    res.status(500).json({ success: false, message: 'Upload failed' });
  }
});

export default router;
