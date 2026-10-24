import multer from "multer";
import path from "path";

const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const id = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `avatar-${id}${path.extname(file.originalname)}`);
  },
});

export default multer({
  storage,
  fileFilter: (req, file, cb) => allowed.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Only image files are allowed")),
  limits: { fileSize: 5 * 1024 * 1024 },
});
