import cloudinary from "cloudinary";
import dotenv from "dotenv";

/* Accessing .env content */
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadToCloudinary = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      (result, error) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result.url,
            id: result.public_id,
          });
        }
      },
      {
        resource_type: "auto",
        folder: folder,
      }
    );
  });
};

export default uploadToCloudinary;
