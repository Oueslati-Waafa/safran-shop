import multer from "multer";
import { diskStorage } from "multer";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const storage = diskStorage({
  destination: (req, file, callback) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const directory = join(__dirname, "../public/images").replace(
      /\\/g,
      "/"
    );
    callback(null, directory);
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = file.mimetype.split("/")[1];
    const filename = name + Date.now() + "." + extension;
    callback(null, filename);
  },
});

const upload = multer({ storage });

export default upload;
