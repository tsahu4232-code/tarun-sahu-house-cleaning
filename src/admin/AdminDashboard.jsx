import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GalleryUpload from "./GalleryUpload";
import { API_BASE_URL } from "../utils/serviceHelpers";
import { adminLogout } from "../utils/adminAuth";

const emptyServiceForm = {
  title: "",
  category: "",
  description: "",
  price: "",
  note: "",
  imageUrl: "",
};

function AdminDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [editingBookingId, setEditingBookingId] = useState("");
  const [bookingForm, setBookingForm] = useState({});
  const [galleryImages, setGalleryImages] = useState([]);
  const [editingImageId, setEditingImageId] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [services, setServices] = useState([]);
  const [serviceForm, setServiceForm] = useState(emptyServiceForm);
  const [editingServiceId, setEditingServiceId] = useState("");
  const [reviews, setReviews] = useState([]);

  const fetchBookings = () => {
    axios
      .get(`${API_BASE_URL}/admin/bookings`)
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 401) {
          navigate("/admin/login");
        }
      });
  };

  const fetchGallery = () => {
    axios
      .get(`${API_BASE_URL}/gallery`)
      .then((res) => {
        setGalleryImages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchServices = () => {
    axios
      .get(`${API_BASE_URL}/services`)
      .then((res) => {
        setServices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchReviews = () => {
    axios
      .get(`${API_BASE_URL}/reviews`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchBookings();
    fetchGallery();
    fetchServices();
    fetchReviews();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`${API_BASE_URL}/admin/bookings/${id}`, { status });
    fetchBookings();
  };

  const startBookingEdit = (booking) => {
    setEditingBookingId(booking._id);
    setBookingForm({
      name: booking.name || "",
      phone: booking.phone || "",
      services: (booking.services || []).join(", "),
      address: booking.address || "",
      date: booking.date || "",
      status: booking.status || "Pending",
    });
  };

  const saveBooking = async (id) => {
    await axios.put(`${API_BASE_URL}/admin/bookings/${id}`, {
      ...bookingForm,
      services: bookingForm.services
        .split(",")
        .map((service) => service.trim())
        .filter(Boolean),
    });

    setEditingBookingId("");
    setBookingForm({});
    fetchBookings();
  };

  const deleteBooking = async (id) => {
    if (!confirm("Delete this booking?")) return;

    await axios.delete(`${API_BASE_URL}/admin/bookings/${id}`);
    fetchBookings();
  };

  const convertToBase64 = (file, setter) => {
    if (!file) {
      setter("");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setter(reader.result);
  };

  const startImageEdit = (image) => {
    setEditingImageId(image._id);
    setImageTitle(image.title || "");
    setImageBase64("");
  };

  const saveImage = async (id) => {
    await axios.put(`${API_BASE_URL}/gallery/${id}`, {
      title: imageTitle,
      image: imageBase64,
    });

    setEditingImageId("");
    setImageTitle("");
    setImageBase64("");
    fetchGallery();
  };

  const deleteImage = async (id) => {
    if (!confirm("Delete this image?")) return;

    await axios.delete(`${API_BASE_URL}/gallery/${id}`);
    fetchGallery();
  };

  const handleServiceChange = (e) => {
    setServiceForm({
      ...serviceForm,
      [e.target.name]: e.target.value,
    });
  };

  const saveService = async (e) => {
    e.preventDefault();

    if (editingServiceId) {
      await axios.put(`${API_BASE_URL}/services/${editingServiceId}`, serviceForm);
    } else {
      await axios.post(`${API_BASE_URL}/services`, serviceForm);
    }

    setServiceForm(emptyServiceForm);
    setEditingServiceId("");
    fetchServices();
  };

  const startServiceEdit = (service) => {
    setEditingServiceId(service._id);
    setServiceForm({
      title: service.title || "",
      category: service.category || "",
      description: service.description || "",
      price: service.price || "",
      note: service.note || "",
      imageUrl: service.imageUrl || "",
    });
  };

  const deleteService = async (id) => {
    if (!confirm("Delete this service?")) return;

    await axios.delete(`${API_BASE_URL}/services/${id}`);
    fetchServices();
  };

  const deleteReview = async (id) => {
    if (!confirm("Delete this review? This cannot be undone.")) return;

    await axios.delete(`${API_BASE_URL}/reviews/${id}`);
    fetchReviews();
  };

  const totalBookings = bookings.length;
  const completedJobs = bookings.filter(
    (booking) => booking.status === "Completed"
  ).length;
  const pendingJobs = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login");
  };

  return (
    <div className="container mx-auto py-6 sm:py-10 px-3 sm:px-4">
      <div className="flex justify-between items-center gap-3 mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Admin Dashboard</h1>

        <button
          onClick={handleLogout}
          className="shrink-0 bg-red-600 text-white px-4 sm:px-5 py-2 rounded-lg font-semibold hover:bg-red-700 transition text-sm sm:text-base"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
        <div className="bg-blue-600 text-white p-6 rounded-xl shadow">
          <h2 className="text-3xl font-bold">{totalBookings}</h2>
          <p>Total Bookings</p>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl shadow">
          <h2 className="text-3xl font-bold">{completedJobs}</h2>
          <p>Completed Jobs</p>
        </div>

        <div className="bg-red-600 text-white p-6 rounded-xl shadow">
          <h2 className="text-3xl font-bold">{pendingJobs}</h2>
          <p>Pending Jobs</p>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-5">Manage Bookings</h2>

        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white p-6 rounded-xl shadow">
              {editingBookingId === booking._id ? (
                <div className="grid md:grid-cols-2 gap-3">
                  {["name", "phone", "address", "date", "status"].map((field) => (
                    <input
                      key={field}
                      type={field === "date" ? "date" : "text"}
                      value={bookingForm[field] || ""}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          [field]: e.target.value,
                        })
                      }
                      placeholder={field}
                      className="border p-3 rounded"
                    />
                  ))}

                  <input
                    value={bookingForm.services || ""}
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        services: e.target.value,
                      })
                    }
                    placeholder="Services comma separated"
                    className="border p-3 rounded md:col-span-2"
                  />

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => saveBooking(booking._id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingBookingId("")}
                      className="bg-gray-600 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p><strong>Name:</strong> {booking.name}</p>
                  <p><strong>Phone:</strong> {booking.phone}</p>
                  <p><strong>Services:</strong> {(booking.services || []).join(", ")}</p>
                  <p><strong>Address:</strong> {booking.address}</p>
                  <p><strong>Date:</strong> {booking.date}</p>
                  <p className="mt-3"><strong>Status:</strong> {booking.status}</p>

                  <div className="flex flex-wrap gap-3 mt-4">
                    <button
                      onClick={() => updateStatus(booking._id, "Completed")}
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => updateStatus(booking._id, "Cancelled")}
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => startBookingEdit(booking)}
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteBooking(booking._id)}
                      className="bg-gray-800 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <GalleryUpload onUploaded={fetchGallery} />

        <h2 className="text-3xl font-bold mt-10 mb-5">Manage Gallery</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div key={image._id} className="bg-white rounded-xl shadow overflow-hidden">
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                {editingImageId === image._id ? (
                  <div className="space-y-3">
                    <input
                      value={imageTitle}
                      onChange={(e) => setImageTitle(e.target.value)}
                      className="w-full border p-3 rounded"
                      placeholder="Image title"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        convertToBase64(e.target.files[0], setImageBase64)
                      }
                      className="w-full"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveImage(image._id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingImageId("")}
                        className="bg-gray-600 text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="font-bold">{image.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <button
                        onClick={() => startImageEdit(image)}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        Change
                      </button>
                      <button
                        onClick={() => deleteImage(image._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-5">Manage Services & Pricing</h2>

        <form onSubmit={saveService} className="bg-white p-6 rounded-xl shadow grid md:grid-cols-2 gap-4 mb-8">
          {[
            ["title", "Service Name"],
            ["category", "Category"],
            ["price", "Price"],
            ["note", "Note"],
            ["imageUrl", "Image URL"],
          ].map(([name, placeholder]) => (
            <input
              key={name}
              name={name}
              value={serviceForm[name]}
              onChange={handleServiceChange}
              placeholder={placeholder}
              className="border p-3 rounded"
              required={["title", "category", "price"].includes(name)}
            />
          ))}

          <textarea
            name="description"
            value={serviceForm.description}
            onChange={handleServiceChange}
            placeholder="Description"
            className="border p-3 rounded md:col-span-2"
          />

          <div className="flex flex-wrap gap-3">
            <button type="submit" className="bg-blue-700 text-white px-6 py-3 rounded">
              {editingServiceId ? "Update Service" : "Add Service"}
            </button>
            {editingServiceId && (
              <button
                type="button"
                onClick={() => {
                  setEditingServiceId("");
                  setServiceForm(emptyServiceForm);
                }}
                className="bg-gray-600 text-white px-6 py-3 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="grid md:grid-cols-2 gap-5">
          {services.map((service) => (
            <div key={service._id} className="bg-white p-5 rounded-xl shadow">
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="text-gray-600">{service.category}</p>
              <p className="text-blue-700 font-bold mt-2">{service.price}</p>
              {service.note && <p className="text-gray-500">{service.note}</p>}
              {service.description && <p className="mt-2">{service.description}</p>}

              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => startServiceEdit(service)}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteService(service._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-5">Manage Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {reviews.map((review) => (
              <div key={review._id} className="bg-white p-5 rounded-xl shadow">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h3 className="text-lg font-bold">{review.name}</h3>
                    <p className="text-yellow-500 font-semibold">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteReview(review._id)}
                    className="shrink-0 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>

                <p className="text-gray-700 mt-3">{review.review}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;
