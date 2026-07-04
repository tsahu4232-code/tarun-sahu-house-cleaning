import { useEffect, useState } from "react";
import API from "../utils/axiosConfig";
import Seo from "../components/Seo";
import { API_BASE_URL } from "../utils/serviceHelpers";

function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/gallery`)
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="container mx-auto py-16 px-4">
      <Seo
        title="Gallery"
        description="See our completed cleaning work - houses, sofas, kitchens and more, cleaned by Tarun Sahu House Cleaning."
        path="/gallery"
      />
      <h2 className="text-4xl font-bold text-center mb-10">
        Our Work Gallery
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {images.map((img) => (
          <div
            key={img._id}
            className="bg-white rounded-xl shadow overflow-hidden"
          >
            <img
              src={img.imageUrl}
              alt={img.title}
              loading="lazy"
              className="w-full h-64 object-cover"
            />

            <div className="p-4 text-center font-bold">
              {img.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;