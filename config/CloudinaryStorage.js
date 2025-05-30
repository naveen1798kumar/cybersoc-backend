const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'services', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

module.exports = storage;