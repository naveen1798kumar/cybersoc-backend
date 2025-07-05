// routes/resumeUpload.js
import express from 'express';
import multer from 'multer';
import imagekit from '../config/imagekit.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/resume', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const result = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
      folder: "/resumes",
    });

    res.json({ url: result.url });
  } catch (err) {
    console.error("Resume upload error:", err.message);
    res.status(500).json({ message: "Resume upload failed" });
  }
});

export default router;
