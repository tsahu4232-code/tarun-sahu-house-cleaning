import { useEffect, useState } from "react";
import API from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import GalleryUpload from "./GalleryUpload";
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
  const [reviews, setReviews] = useState([]);
  const [services, setServices] = useState([]);

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

  const deleteReview = async (id) => {
    await API.delete(`/reviews/${id}`);
    fetchReviews();
  };

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login");
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;