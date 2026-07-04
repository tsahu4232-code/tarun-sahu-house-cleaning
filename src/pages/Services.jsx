import { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import Seo from "../components/Seo";
import { serviceCategories } from "../data/servicesData";
import { API_BASE_URL, groupServicesByCategory } from "../utils/serviceHelpers";

function Services() {
const [categories, setCategories] = useState(serviceCategories);

useEffect(() => {
  fetch(`${API_BASE_URL}/services`)
    .then((res) => res.json())
    .then((services) => {
      if (services.length > 0) {
        setCategories(groupServicesByCategory(services));
      }
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

return (
<>
  <Seo
    title="Our Services"
    description="30+ professional cleaning services for homes, offices, kitchens, bathrooms, furniture, vehicles and commercial spaces in Bhilai, Durg & Raipur."
    path="/services"
  />
  {/* PAGE HERO */}

  <section className="bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-600 text-white py-24">

    <div className="container mx-auto px-4 text-center">

      <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold">
        Our Services
      </h1>

      <p className="text-xl mt-5 max-w-3xl mx-auto">
        30+ Professional Cleaning Services For Homes,
        Offices, Kitchens, Bathrooms, Furniture,
        Vehicles And Commercial Spaces.
      </p>

    </div>

  </section>

  {/* SERVICES */}

  <section className="container mx-auto px-4 py-16">

    {categories.map((category, index) => (

      <div
        key={index}
        className="mb-20"
      >

        <div className="flex items-center gap-4 mb-8">

          <div className="h-1 w-12 bg-blue-600 rounded"></div>

          <h2 className="text-4xl font-bold text-gray-800">
            {category.title}
          </h2>

        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">

          {category.services.map((service, i) => (

            <ServiceCard
              key={i}
              {...service}
            />

          ))}

        </div>

      </div>

    ))}

  </section>

  {/* CTA */}

  <section className="bg-gradient-to-r from-blue-900 to-cyan-600 text-white py-20">

    <div className="container mx-auto text-center px-4">

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
        Need Professional Cleaning?
      </h2>

      <p className="text-xl mt-6">
        Book our cleaning experts today.
      </p>

      <a
        href="https://wa.me/919893111900"
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-8 bg-green-500 px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition"
      >
        Book On WhatsApp
      </a>

    </div>

  </section>

</>
);
}

export default Services;
