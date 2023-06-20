import multer from "multer";
import { diskStorage } from "multer";

const storage = diskStorage({
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = file.mimetype.split("/")[1];
    const filename = name + Date.now() + "." + extension;
    callback(null, filename);
  },
});

const upload = multer({ storage });

export default upload;
