function ServiceCard({
image,
title,
price,
description,
note
}) {
return ( <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border">


  <div className="relative">

    <img
      src={image}
      alt={title}
      loading="lazy"
      className="w-full h-56 object-cover"
    />

    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
      Popular
    </div>

  </div>

  <div className="p-5">

    <h3 className="text-xl font-bold text-gray-800">
      {title}
    </h3>

    <p className="text-gray-600 mt-3 min-h-[50px]">
      {description}
    </p>

    <div className="mt-4">

      <span className="text-2xl font-extrabold text-green-600">
        {price}
      </span>

      {note && (
        <p className="text-xs text-gray-500 mt-1">
          {note}
        </p>
      )}

    </div>

    <a
      href={`https://wa.me/919893111900?text=Hello, I want to book ${title}`}
      target="_blank"
      rel="noreferrer"
      className="block text-center w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
    >
      Book Now
    </a>
  </div>
</div>
);
}

export default ServiceCard;
