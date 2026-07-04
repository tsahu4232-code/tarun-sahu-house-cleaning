import { useEffect, useState } from "react";
import API from "../utils/axiosConfig";

function CustomerDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get("/booking/my")
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold">My Bookings</h1>

      <div className="mt-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white shadow p-4 rounded mb-4"
          >
            <h2>{booking.service}</h2>
            <p>{booking.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerDashboard;