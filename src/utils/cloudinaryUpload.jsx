// src/utils/cloudinaryUpload.js

import axios from 'axios';

const uploadToCloudinary = async (file, setUploadProgress) => {
  try {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "wnsxe2pa");
    data.append("folder", "SKFood")
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dzvsrft15/image/upload`,
      data,
      {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (setUploadProgress) {
            setUploadProgress(percentCompleted);
          }
        }
      }
    );

    if (response.status === 200) {
      return response.data.url;
    } else {
      throw new Error('Failed to upload image');
    }
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
};

export default uploadToCloudinary;
