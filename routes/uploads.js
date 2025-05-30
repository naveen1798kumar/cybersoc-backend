const express = require('express');
const multer = require('multer');
const storage = require('../config/cloudinaryStorage');
const uploadRoutes = require('./routes/upload');

const upload = multer({ storage });
const router = express.Router();

router.post('/image', upload.single('image'), (req, res) => {
  // req.file.path is the Cloudinary URL
  res.json({ url: req.file.path });
});

app.use('/api/upload', uploadRoutes);

module.exports = router;