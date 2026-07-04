import houseCleaning from "../assets/services/Home Cleaning/house-cleaning.jpg";

// Reads the backend URL from the environment. In production (Vercel/Netlify)
// set VITE_API_BASE_URL to your deployed backend URL, e.g.
// https://your-backend.onrender.com/api
// In local dev, if no .env is set, it falls back to localhost.
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const groupServicesByCategory = (services) => {
  const grouped = services.reduce((categories, service) => {
    const categoryTitle = service.category || "Other Services";
    const existingCategory = categories.find(
      (category) => category.title === categoryTitle
    );
    const serviceItem = {
      ...service,
      image: service.image || service.imageUrl || houseCleaning,
    };

    if (existingCategory) {
      existingCategory.services.push(serviceItem);
      return categories;
    }

    return [
      ...categories,
      {
        title: categoryTitle,
        services: [serviceItem],
      },
    ];
  }, []);

  return grouped;
};

export const flattenServiceCategories = (serviceCategories) =>
  serviceCategories.flatMap((category) =>
    category.services.map((service) => ({
      ...service,
      category: category.title,
    }))
  );
