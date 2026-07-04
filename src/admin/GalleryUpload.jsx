import { useState } from "react";
import API from "../utils/axiosConfig";

function GalleryUpload({ onUploaded }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const convertToBase64 = (file) => {
    if (!file) {
      setImage("");
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image first");
      return;
    }

    try {
      setIsUploading(true);

      const res = await API.post("/gallery", {
        title,
        image,
      });

      console.log(res.data);

      alert("Image Uploaded Successfully");

      setTitle("");
      setImage("");
      onUploaded?.();
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Upload Failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-10">
      <h2 className="text-2xl font-bold mb-5">
        Upload Gallery Image
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Image Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => convertToBase64(e.target.files[0])}
          className="w-full"
          required
        />

        <button
          type="submit"
          disabled={isUploading}
          className="bg-blue-700 text-white px-6 py-3 rounded"
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}

export default GalleryUpload;