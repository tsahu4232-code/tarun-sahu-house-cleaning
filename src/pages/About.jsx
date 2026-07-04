import Seo from "../components/Seo";

function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Seo
        title="About Us"
        description="Learn about Tarun Sahu House Cleaning - trusted, professional cleaning services for homes, offices and more across Bhilai, Durg & Raipur."
        path="/about"
      />
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          About Tarun Sahu House Cleaning
        </h1>

        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We provide professional cleaning services for homes,
          offices, kitchens, bathrooms, furniture, vehicles,
          water tanks, and more. Our goal is to deliver a clean,
          healthy, and hygienic environment for every customer.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mt-12">
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-4xl font-bold text-blue-600">5+</h2>
          <p className="mt-2">Years Experience</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-4xl font-bold text-blue-600">5+</h2>
          <p className="mt-2">Professional Team Members</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-4xl font-bold text-blue-600">9 AM - 10 PM</h2>
          <p className="mt-2">Working Hours</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-4xl font-bold text-blue-600">100%</h2>
          <p className="mt-2">Customer Satisfaction</p>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-4">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-6 rounded-xl">
            ✅ Experienced Cleaning Professionals
          </div>

          <div className="bg-gray-100 p-6 rounded-xl">
            ✅ Affordable Pricing
          </div>

          <div className="bg-gray-100 p-6 rounded-xl">
            ✅ Modern Cleaning Equipment
          </div>

          <div className="bg-gray-100 p-6 rounded-xl">
            ✅ Fast & Reliable Service
          </div>

          <div className="bg-gray-100 p-6 rounded-xl">
            ✅ Same Day Booking Available
          </div>

          <div className="bg-gray-100 p-6 rounded-xl">
            ✅ Serving Bhilai, Durg & Nearby Areas
          </div>
        </div>
      </div>

      <div className="mt-16 bg-blue-600 text-white rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold">
          Professional Cleaning You Can Trust
        </h2>

        <p className="mt-4">
          From house cleaning to deep cleaning services,
          we help keep your home and workplace fresh,
          hygienic, and spotless.
        </p>
      </div>
    </div>
  );
}

export default About;