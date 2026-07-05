import { useEffect, useState } from "react";
import API from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import GalleryUpload from "./GalleryUpload";
import { adminLogout } from "../utils/adminAuth";
import StarRating from "../components/StarRating";

const emptyServiceForm = {
  title: "",
  category: "",
  description: "",
  price: "",
  note: "",
  imageUrl: "",
};

const STATUS_OPTIONS = ["Pending", "Confirmed", "Completed", "Cancelled"];

function AdminDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [services, setServices] = useState([]);
  const [activeTab, setActiveTab] = useState("bookings");
  const [serviceForm, setServiceForm] = useState(emptyServiceForm);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [savingService, setSavingService] = useState(false);

  const fetchBookings = () => {
    API.get("/admin/bookings")
      .then((res) => setBookings(res.data))
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 401) {
          navigate("/admin/login");
        }
      });
  };

  const fetchReviews = () => {
    API.get("/reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err));
  };

  const fetchServices = () => {
    API.get("/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBookings();
    fetchReviews();
    fetchServices();
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/admin/bookings/${id}`, { status });
    fetchBookings();
  };

  const deleteBooking = async (id) => {
    await API.delete(`/admin/bookings/${id}`);
    fetchBookings();
  };

  const saveService = async (serviceData, editingServiceId) => {
    if (editingServiceId) {
      await API.put(`/services/${editingServiceId}`, serviceData);
    } else {
      await API.post("/services", serviceData);
    }
    fetchServices();
  };

  const deleteService = async (id) => {
    await API.delete(`/services/${id}`);
    fetchServices();
  };

  const handleServiceFormChange = (e) => {
    const { name, value } = e.target;
    setServiceForm((prev) => ({ ...prev, [name]: value }));
  };

  const startEditService = (service) => {
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

  const cancelEditService = () => {
    setEditingServiceId(null);
    setServiceForm(emptyServiceForm);
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setSavingService(true);
    try {
      await saveService(serviceForm, editingServiceId);
      cancelEditService();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to save service");
    } finally {
      setSavingService(false);
    }
  };

  const deleteReview = async (id) => {
    await API.delete(`/reviews/${id}`);
    fetchReviews();
  };

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login");
  };

  const tabs = [
    { key: "bookings", label: `Bookings (${bookings.length})` },
    { key: "services", label: `Services (${services.length})` },
    { key: "reviews", label: `Reviews (${reviews.length})` },
    { key: "gallery", label: "Gallery" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-5 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-2 mb-6 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 font-medium ${
              activeTab === tab.key
                ? "border-b-2 border-blue-700 text-blue-700"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "bookings" && (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Services</th>
                <th className="p-3">Address</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 && (
                <tr>
                  <td className="p-3 text-gray-500" colSpan={7}>
                    No bookings yet.
                  </td>
                </tr>
              )}
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-t">
                  <td className="p-3">{booking.name}</td>
                  <td className="p-3">{booking.phone}</td>
                  <td className="p-3">
                    {Array.isArray(booking.services)
                      ? booking.services.join(", ")
                      : booking.services}
                  </td>
                  <td className="p-3">{booking.address}</td>
                  <td className="p-3">{booking.date}</td>
                  <td className="p-3">
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        updateStatus(booking._id, e.target.value)
                      }
                      className="border rounded p-1"
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteBooking(booking._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "services" && (
        <div className="grid md:grid-cols-2 gap-6">
          <form
            onSubmit={handleServiceSubmit}
            className="bg-white p-6 rounded-xl shadow space-y-4 h-fit"
          >
            <h2 className="text-xl font-bold">
              {editingServiceId ? "Edit Service" : "Add Service"}
            </h2>
            <input
              name="title"
              value={serviceForm.title}
              onChange={handleServiceFormChange}
              placeholder="Title"
              className="w-full border p-3 rounded"
              required
            />
            <input
              name="category"
              value={serviceForm.category}
              onChange={handleServiceFormChange}
              placeholder="Category"
              className="w-full border p-3 rounded"
              required
            />
            <textarea
              name="description"
              value={serviceForm.description}
              onChange={handleServiceFormChange}
              placeholder="Description"
              className="w-full border p-3 rounded"
              rows={3}
            />
            <input
              name="price"
              value={serviceForm.price}
              onChange={handleServiceFormChange}
              placeholder="Price"
              className="w-full border p-3 rounded"
              required
            />
            <input
              name="note"
              value={serviceForm.note}
              onChange={handleServiceFormChange}
              placeholder="Note"
              className="w-full border p-3 rounded"
            />
            <input
              name="imageUrl"
              value={serviceForm.imageUrl}
              onChange={handleServiceFormChange}
              placeholder="Image URL"
              className="w-full border p-3 rounded"
            />
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={savingService}
                className="bg-blue-700 text-white px-6 py-3 rounded"
              >
                {savingService
                  ? "Saving..."
                  : editingServiceId
                  ? "Update Service"
                  : "Add Service"}
              </button>
              {editingServiceId && (
                <button
                  type="button"
                  onClick={cancelEditService}
                  className="border px-6 py-3 rounded"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="space-y-4">
            {services.length === 0 && (
              <p className="text-gray-500">No services yet.</p>
            )}
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-white p-4 rounded-xl shadow flex justify-between items-start gap-4"
              >
                <div>
                  <h3 className="font-bold">{service.title}</h3>
                  <p className="text-sm text-gray-500">{service.category}</p>
                  <p className="text-sm mt-1">{service.description}</p>
                  <p className="font-semibold mt-1">{service.price}</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => startEditService(service)}
                    className="text-blue-700 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteService(service._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="space-y-4">
          {reviews.length === 0 && (
            <p className="text-gray-500">No reviews yet.</p>
          )}
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-start gap-4"
            >
              <div>
                <h3 className="font-bold">{review.name}</h3>
                <StarRating rating={review.rating} size="text-lg" />
                <p className="text-sm mt-1">{review.review}</p>
              </div>
              <button
                onClick={() => deleteReview(review._id)}
                className="text-red-600 hover:underline shrink-0"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === "gallery" && (
        <GalleryUpload onUploaded={() => {}} />
      )}
    </div>
  );
}

export default AdminDashboard;