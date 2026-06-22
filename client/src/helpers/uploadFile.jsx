import axios from "axios";

const uploadFile = async (file, setUploadProgress) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "chat-app-file");

  const url = `https://api.cloudinary.com/v1_1/${
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  }/auto/upload`;

  const response = await axios.post(url, formData, {
    onUploadProgress: (progressEvent) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );

      setUploadProgress(percent);
    },
  });

  return response.data;
};

export default uploadFile;