import Seo from "../components/Seo";

function Contact() {
  return (
    <div className="container mx-auto py-10">
      <Seo
        title="Contact Us"
        description="Get in touch with Tarun Sahu House Cleaning for bookings, quotes and support. Call, WhatsApp or email us."
        path="/contact"
      />

      <h1 className="text-4xl font-bold">
        Contact Us
      </h1>

      <p className="mt-4">
        Phone: 9893111900
      </p>

      <p>
        WhatsApp: 9893111900
      </p>

      <p>
        Email: tsahu4232@gmail.com
      </p>

      {/* Google Map */}
      <div className="mt-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=YOUR_LOCATION"
          width="100%"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
          title="Google Map"
        ></iframe>
      </div>

    </div>
  );
}

export default Contact;