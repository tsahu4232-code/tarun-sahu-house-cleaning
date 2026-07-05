import { useEffect, useState } from "react";
import API from "../utils/axiosConfig";

function GalleryUpload({ onUploaded }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [gallery, setGallery] = useState([]);

  const fetchGallery = async () => {
    try {
      const res = await API.get("/gallery");
      setGallery(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

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
      return alert("Please select an image");
    }

    try {
      setIsUploading(true);

      await API.post("/gallery", {
        title,
        image,
      });

      alert("Image Uploaded Successfully");

      setTitle("");
      setImage("");

      fetchGallery();

      if (onUploaded) {
        onUploaded();
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Upload Failed");
    } finally {
      setIsUploading(false);
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await API.delete(`/gallery/${id}`);
      alert("Image Deleted Successfully");
      fetchGallery();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Delete Failed");
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

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-5">
        Gallery Images
      </h2>

      {gallery.length === 0 ? (
        <p>No Images Found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {gallery.map((img) => (
            <div
              key={img._id}
              className="bg-gray-100 rounded-xl shadow overflow-hidden"
            >
              <img
                src={img.imageUrl}
                alt={img.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">
                <h3 className="font-bold">{img.title}</h3>

                <button
                  onClick={() => deleteImage(img._id)}
                  className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GalleryUpload;