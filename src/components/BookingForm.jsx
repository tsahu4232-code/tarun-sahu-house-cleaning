import { useEffect, useState } from "react";
import { API_BASE_URL, flattenServiceCategories } from "../utils/serviceHelpers";
import { serviceCategories } from "../data/servicesData";

function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    services: [],
    address: "",
    date: ""
  });

  const [phoneError, setPhoneError] = useState("");

  const [serviceList, setServiceList] = useState([
    "House Cleaning",
    "Kitchen Cleaning",
    "Sofa Cleaning",
    "Bathroom Cleaning",
    "Water Tank Cleaning",
    "Carpet Cleaning"
  ]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/services`)
      .then((res) => res.json())
      .then((services) => {
        if (services.length > 0) {
          setServiceList(services.map((service) => service.title));
          return;
        }

        setServiceList(
          flattenServiceCategories(serviceCategories).map(
            (service) => service.title
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhoneChange = (e) => {
    // Keep digits only, and never allow more than 10 of them
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);

    setFormData({
      ...formData,
      phone: digitsOnly
    });

    if (digitsOnly.length === 0) {
      setPhoneError("");
    } else if (digitsOnly.length < 10) {
      setPhoneError("Phone number must be exactly 10 digits");
    } else {
      setPhoneError("");
    }
  };

  const handleServiceChange = (service) => {
    if (formData.services.includes(service)) {
      setFormData({
        ...formData,
        services: formData.services.filter((item) => item !== service)
      });
    } else {
      setFormData({
        ...formData,
        services: [...formData.services, service]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits");
      return;
    }

    await fetch(`${API_BASE_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const message =
      `New Booking:%0A` +
      `Name: ${formData.name}%0A` +
      `Phone: ${formData.phone}%0A` +
      `Services: ${formData.services.join(", ")}%0A` +
      `Address: ${formData.address}%0A` +
      `Date: ${formData.date}`;

    window.open(
      `https://wa.me/919893111900?text=${message}`,
      "_blank"
    );

    alert("Booking Submitted Successfully");
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 max-w-3xl mx-auto">

      <h2 className="text-3xl font-bold mb-6 text-center">
        Book Cleaning Service
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
          required
        />

        <div>
          <input
            type="tel"
            name="phone"
            inputMode="numeric"
            pattern="[0-9]{10}"
            maxLength={10}
            placeholder="10-Digit Mobile Number"
            value={formData.phone}
            onChange={handlePhoneChange}
            className={`w-full border p-4 rounded-xl ${
              phoneError ? "border-red-500" : ""
            }`}
            required
          />
          {phoneError && (
            <p className="text-red-600 text-sm mt-1">{phoneError}</p>
          )}
        </div>

        <div>
          <h3 className="font-bold mb-2">Select Services</h3>

          <div className="grid md:grid-cols-2 gap-3">

            {serviceList.map((service, index) => (
              <label key={index} className="flex gap-2">
                <input
                  type="checkbox"
                  onChange={() => handleServiceChange(service)}
                />
                {service}
              </label>
            ))}

          </div>
        </div>

        <textarea
          name="address"
          placeholder="Full Address"
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
          required
        />

        <input
          type="date"
          name="date"
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold"
        >
          Confirm Booking
        </button>

      </form>

    </div>
  );
}

export default BookingForm;
