import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads/complaints');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory:', uploadsDir);
}

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure directory exists before saving
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename: timestamp-randomnumber-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'complaint-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  },
  fileFilter: function (req, file, cb) {
    // Accept any image/* MIME type (covers jpeg, png, gif, webp, heic, etc.)
    const isImageMime = file.mimetype && file.mimetype.startsWith('image/');

    // Extra safeguard using extension, but much more permissive than before
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.heic', '.heif'];
    const hasValidExt = allowedExtensions.includes(ext);

    if (isImageMime && hasValidExt) {
      return cb(null, true);
    }

    console.warn('Rejected upload (not a supported image):', {
      originalname: file.originalname,
      mimetype: file.mimetype
    });

    return cb(
      new Error(
        'Only image files are allowed (jpeg, jpg, png, gif, webp, heic, heif). ' +
        'Please choose a valid image from your gallery or camera.'
      )
    );
  }
});

export default upload;

