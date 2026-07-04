function Footer() {
return ( <footer className="bg-gray-900 text-white mt-20">

  <div className="container mx-auto px-6 py-12">

    <div className="grid md:grid-cols-3 gap-10">

      <div>
        <h2 className="text-2xl font-bold text-blue-400">
          Tarun Sahu House Cleaning
        </h2>

        <p className="mt-4 text-gray-300">
          Professional House Cleaning,
          Sofa Cleaning, Kitchen Deep Cleaning,
          Water Tank Cleaning and more.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">
          Popular Services
        </h3>

        <ul className="space-y-2 text-gray-300">
          <li>House Cleaning</li>
          <li>Sofa Cleaning</li>
          <li>Kitchen Deep Cleaning</li>
          <li>Water Tank Cleaning</li>
          <li>Bathroom Cleaning</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">
          Contact Us
        </h3>

        <p className="text-gray-300">
          📞 9893111900
        </p>

        <p className="text-gray-300">
          📞 8815043056
        </p>

        <p className="text-gray-300 mt-2">
          📧 tsahu4232@gmail.com
        </p>

        <a
          href="https://wa.me/919893111900"
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-4 bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg font-semibold"
        >
          WhatsApp Us
        </a>

      </div>

    </div>

    <hr className="my-8 border-gray-700" />

    <div className="text-center text-gray-400">
      © 2026 Tarun Sahu House Cleaning.
      All Rights Reserved.
    </div>

  </div>

</footer>
);
}

export default Footer;
