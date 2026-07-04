import { Link } from "react-router-dom";
import { useState } from "react";
import Seo from "../components/Seo";
import { serviceCategories } from "../data/servicesData";
import ServiceCard from "../components/ServiceCard";
import ReviewForm from "../components/ReviewForm";
import ReviewsList from "../components/ReviewsList";
import BookingForm from "../components/BookingForm";
import homeCleaning from "../assets/services/Home Cleaning/house-cleaning.jpg";
import kitchenCleaning from "../assets/services/Kitchen Cleaning/kitchen-cleaning.jpg";
import furnitureCleaning from "../assets/services/Furniture Cleaning/sofa-cleaning.jpg";
import logo from "../assets/logo.png";

function Home() {
  const [search, setSearch] = useState("");
  const [newReview, setNewReview] = useState(null);
  const allServices = serviceCategories.flatMap(
    (category) => category.services
  );

  const filteredServices = allServices.filter((service) =>
    service.title.toLowerCase().includes(search.toLowerCase())
  );

  const services = [
    {
      title: "House Cleaning",
      price: "₹5 - ₹8 / Sq.Ft",
      image: homeCleaning,
    },
    {
      title: "Kitchen Deep Cleaning",
      price: "₹1499 - ₹1999",
      image: kitchenCleaning,
    },
    {
      title: "Sofa Cleaning",
      price: "₹249 / Seat",
      image: furnitureCleaning,
    },
  ];

  return (
    <>
      <Seo
        title="Home"
        description="Professional house cleaning, sofa cleaning, kitchen deep cleaning and water tank cleaning across Bhilai, Durg & Raipur. 5000+ homes cleaned, 4.9★ rated."
        path="/"
      />
      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-600 text-white py-32">
        <div className="container mx-auto px-4 text-center">

          <img
            src={logo}
            alt="Tarun Sahu House Cleaning Logo"
            className="mx-auto mb-6 h-32 w-auto"
          />

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold">
            Tarun Sahu House Cleaning
          </h1>

          <p className="text-2xl mt-6 max-w-4xl mx-auto">
            Professional House Cleaning, Sofa Cleaning,
            Kitchen Deep Cleaning, Water Tank Cleaning
            Across Bhilai, Durg & Raipur.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <Link
               to="/contact"
               className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold shadow-lg"
            >
                  Get Instant Quote
            </Link>

            <a
              href="https://wa.me/919893111900"
              target="_blank"
              rel="noreferrer"
              className="bg-green-500 px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition"
            >
              WhatsApp
            </a>

          </div>

          {/* Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search cleaning service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-6 py-4 rounded-xl text-black shadow-lg outline-none border border-gray-200"
            />
          </div>

        </div>
      </section>

      {/* Search Results */}
      {search && (
        <section className="container mx-auto py-12 px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Search Results
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))
            ) : (
              <p className="text-center col-span-3">
                No service found.
              </p>
            )}
          </div>
        </section>
      )}
        <section className="py-16 bg-gray-100">
           <BookingForm />
        </section>

      {/* STATS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">

          <div className="grid md:grid-cols-4 gap-8 text-center">

            <div>
              <h2 className="text-4xl font-bold text-blue-600">5000+</h2>
              <p>Homes Cleaned</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-blue-600">4.9★</h2>
              <p>Customer Rating</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-blue-600">30+</h2>
              <p>Cleaning Services</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-blue-600">24x7</h2>
              <p>Support</p>
            </div>

          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="bg-white py-10">
        <div className="container mx-auto">

          <div className="flex flex-wrap justify-center gap-6">

            <div className="bg-green-100 px-6 py-3 rounded-full">
              ✓ Verified Professionals
            </div>

            <div className="bg-blue-100 px-6 py-3 rounded-full">
              ✓ Eco Friendly Products
            </div>

            <div className="bg-yellow-100 px-6 py-3 rounded-full">
              ✓ Affordable Pricing
            </div>

            <div className="bg-purple-100 px-6 py-3 rounded-full">
              ✓ 100% Satisfaction
            </div>

          </div>
        </div>
      </section>

      {/* POPULAR SERVICES */}
      <section className="container mx-auto py-20 px-4">

        <h2 className="text-4xl font-bold text-center">
          Popular Services
        </h2>

        <p className="text-center text-gray-500 mt-4">
          Most booked cleaning services.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

      </section>

      {/* SERVICE CATEGORIES */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">

          <h2 className="text-4xl font-bold text-center">
            Service Categories
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <img src={homeCleaning} alt="Professional home cleaning service in Bhilai" loading="lazy" className="h-60 w-full object-cover" />
              <div className="p-5 font-bold text-center">
                Home Cleaning Services
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <img src={kitchenCleaning} alt="Kitchen deep cleaning service" loading="lazy" className="h-60 w-full object-cover" />
              <div className="p-5 font-bold text-center">
                Kitchen Cleaning Services
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <img src={furnitureCleaning} alt="Furniture and sofa cleaning service" loading="lazy" className="h-60 w-full object-cover" />
              <div className="p-5 font-bold text-center">
                Furniture Cleaning Services
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto">

          <h2 className="text-4xl font-bold text-center mb-10">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            <div className="bg-white p-6 rounded-xl shadow text-center">
              🧹 <br /> Trained Staff
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-center">
              ⚙️ <br /> Premium Equipment
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-center">
              💰 <br /> Affordable Pricing
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-center">
              🚀 <br /> Same Day Service
            </div>

          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-16 bg-white">

       <h2 className="text-4xl font-bold text-center">
           Customer Reviews
        </h2>

        <div className="container mx-auto px-4 mt-10">

          <ReviewForm onReviewAdded={(review) => setNewReview(review)} />

          <ReviewsList newReview={newReview} />

        </div>

      </section>

      {/* FAQ */}
      <section className="container mx-auto py-16 px-4">

        <h2 className="text-4xl font-bold text-center">
          Frequently Asked Questions
        </h2>

        <div className="mt-10 space-y-4 max-w-4xl mx-auto">

          <div className="bg-white p-5 rounded-xl shadow">
            How long does house cleaning take?
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            Do you provide same day service?
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            What payment methods are accepted?
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-r from-blue-900 to-cyan-600 text-white py-20">

        <div className="container mx-auto text-center">

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Ready For A Spotless Home?
          </h2>

          <p className="text-xl mt-6">
            Book professional cleaning services today.
          </p>

          <a
            href="https://wa.me/919893111900"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-8 bg-green-500 px-8 py-4 rounded-xl font-bold"
          >
            Book On WhatsApp
          </a>

        </div>
      </section>
    </>
  );
}

export default Home;