import { useEffect, useState } from "react";
import Seo from "../components/Seo";
import { serviceCategories } from "../data/servicesData";
import serviceDetails from "../data/serviceDetails";
import {
  API_BASE_URL,
  flattenServiceCategories,
} from "../utils/serviceHelpers";

function Pricing() {
  const fallbackPricingData = [
    { service: "Floor Cleaning", price: "₹4 - ₹5 / Sq.Ft" },

    {
      service: "House Cleaning",
      price: "₹5 - ₹8 / Sq.Ft",
      note: "(Size & Condition Based)",
    },

    { service: "Sofa Cleaning", price: "₹249 Per Seat" },

    {
      service: "Carpet Cleaning",
      price: "₹499 - ₹1999",
      note: "(Based on Size & Condition)",
    },

    {
      service: "Bathroom Cleaning",
      price: "₹499 - ₹799",
      note: "(Based on Bathroom Size & Condition)",
    },

    {
      service: "Fridge Cleaning",
      price: "Single Door ₹399 | Double Door ₹599 | Triple Door ₹799",
      note: "(Based on Size)",
    },

    { service: "Mattress Cleaning", price: "₹599" },

    { service: "Water Tank Cleaning", price: "₹599 / Tank" },

    {
      service: "Kitchen Deep Cleaning",
      price: "₹1499 - ₹1999",
      note: "Flat Rate",
    },

    {
      service: "Kitchen Chimney Deep Cleaning",
      price: "₹1199",
      note: "(Condition Based)",
    },

    {
      service: "Chimney Cleaning",
      price: "₹499 - ₹1599",
      note: "(Based on Size)",
    },

    { service: "Fan Cleaning", price: "₹99" },
    { service: "Exhaust Fan Cleaning", price: "₹99" },

    { service: "Kitchen Sink Cleaning", price: "₹199" },
    { service: "Gas Stove Cleaning", price: "₹119" },
    { service: "Microwave Cleaning", price: "₹149" },
    { service: "Wash Basin Cleaning", price: "₹149" },

    {
      service: "Glass Cleaning",
      price: "₹49 - ₹999",
      note: "(Based on Size)",
    },

    { service: "Door Cleaning", price: "₹99" },

    {
      service: "Switch Board & Light Holder",
      price: "₹29 - ₹49",
      note: "(Based on Size)",
    },

    { service: "Water Purifier Check-up", price: "₹249" },

    {
      service: "Windows Cleaning",
      price: "₹99 - ₹499",
      note: "(Based on Size)",
    },

    {
      service: "Tap Cleaning",
      price: "₹49 - ₹99",
    },

    {
      service: "Office Chair Cleaning",
      price: "₹59 - ₹99",
      note: "(Based on Size)",
    },

    { service: "Bed Cleaning", price: "₹499" },

    {
      service: "Dining Table & Chair Cleaning",
      price: "₹499",
      note: "(Condition Based)",
    },

    {
      service: "Car Washing (Normal)",
      price: "₹399",
    },

    {
      service: "Car Washing (Deep Cleaning)",
      price: "₹1599 - ₹2199",
      note: "(Condition Based)",
    },

    {
      service: "Fish Pot Cleaning",
      price: "₹499 - ₹999",
      note: "(Based on Size)",
    },

    { service: "Pillow Cleaning", price: "₹49" },

    { service: "Couch Cleaning", price: "₹499" },
  ];
  const [pricingData, setPricingData] = useState(fallbackPricingData);
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Looks up included/not-included details for a service name,
  // matching case-insensitively so it works regardless of whether
  // the price list came from the backend or the fallback data.
  const getServiceDetails = (serviceName) => {
    if (!serviceName) return null;

    const normalizedTarget = serviceName.trim().toLowerCase();

    const matchKey = Object.keys(serviceDetails).find(
      (key) => key.trim().toLowerCase() === normalizedTarget
    );

    return matchKey ? serviceDetails[matchKey] : null;
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/services`)
      .then((res) => res.json())
      .then((services) => {
        if (services.length > 0) {
          setPricingData(
            services.map((service) => ({
              service: service.title,
              price: service.price,
              note: service.note,
            }))
          );
          return;
        }

        setPricingData(
          flattenServiceCategories(serviceCategories).map((service) => ({
            service: service.title,
            price: service.price,
            note: service.note,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <Seo
        title="Pricing"
        description="Transparent, affordable pricing for house cleaning, sofa cleaning, kitchen deep cleaning and more. No hidden charges."
        path="/pricing"
      />
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
        Service Pricing
      </h1>

      <p className="text-center text-gray-600 mb-10">
        Transparent Pricing • No Hidden Charges
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {pricingData.map((item, index) => {
          const details = getServiceDetails(item.service);
          const isExpanded = expandedIndex === index;

          return (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition"
            >
              <h3 className="text-xl font-bold mb-3">
                {item.service}
              </h3>

              <p className="text-2xl font-semibold text-blue-600">
                {item.price}
              </p>

              {item.note && (
                <p className="text-gray-500 mt-2">
                  {item.note}
                </p>
              )}

              {details && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedIndex(isExpanded ? null : index)
                    }
                    className="mt-4 text-sm font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                  >
                    {isExpanded ? "Hide Details" : "View Details"}
                    <span
                      className={`transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    >
                      ▾
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="mt-4 border-t pt-4 space-y-4">
                      {details.included?.length > 0 && (
                        <div>
                          <p className="font-semibold text-green-700 mb-2">
                            ✅ What's Covered
                          </p>
                          <ul className="space-y-1">
                            {details.included.map((point, i) => (
                              <li
                                key={i}
                                className="text-sm text-gray-700 flex gap-2"
                              >
                                <span className="text-green-600 shrink-0">
                                  ✔
                                </span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {details.notIncluded?.length > 0 && (
                        <div>
                          <p className="font-semibold text-red-700 mb-2">
                            ❌ What's Not Covered
                          </p>
                          <ul className="space-y-1">
                            {details.notIncluded.map((point, i) => (
                              <li
                                key={i}
                                className="text-sm text-gray-700 flex gap-2"
                              >
                                <span className="text-red-600 shrink-0">
                                  ✘
                                </span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Pricing;
