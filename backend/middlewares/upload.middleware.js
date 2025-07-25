// upload.middleware.js
import multer from "multer";

// Store files in memory (RAM)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit: 5MB per file
});

export default upload;