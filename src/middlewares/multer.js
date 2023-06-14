import multer from "multer";
import { diskStorage } from "multer";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = diskStorage({
  destination: (req, file, callback) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    callback(null, join(__dirname, "../public/images").replace(/\\/g, "/"));
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    const filename = name + Date.now() + "." + extension;
    callback(null, filename);
  },
});

const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 5 } });

export default function (req, res, next) {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error("Multer error:", err);
      return res.status(400).json({ error: "Multer error" });
    } else if (err) {
      console.error("Error uploading image:", err);
      return res.status(500).json({ error: "Image upload failed" });
    }

    // Pass control to the next middleware or route handler
    next && next();
  });
}
