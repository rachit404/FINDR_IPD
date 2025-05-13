// src/pages/Product.jsx
import React from "react";
import { Link } from "react-router-dom";
const categories = [
  {
    name: "Vegetable & Fruit Equipment",
    image:
      "https://www.snackfoodm.com/wp-content/uploads/2020/02/bubble-type-vegetable-and-fruit-washing-machine.jpg",
  },
  {
    name: "Grain Processing Machines",
    image: "https://www.bangomachinery.com/upload/product8/cereal1-1.jpg",
  },
  {
    name: "Juice Machines",
    image:
      "https://m.media-amazon.com/images/I/71bMVY95UxL._AC_UF894,1000_QL80_.jpg",
  },
  {
    name: "Ice Cream Machines",
    image:
      "https://images-cdn.ubuy.co.in/65e923dcfc084c1dff63c6c2-cuisinart-ice-cream-maker-machine-1-5.jpg",
  },
  {
    name: "Coffee Machines",
    image:
      "https://dgjno4wvg8wqo.cloudfront.net/2024/06/WMF_Coffee_Machines_espresso_Usability_Mood_10380.png",
  },
  // {
  //   name: "Nut Processing Machines",
  //   image:
  //     "https://shellingmachine.com/wp-content/uploads/2018/05/automatic-cashew-cracking-machine.jpg",
  // },
];

const Product = () => {
  return (
    <div className="bg-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900">
          All Product Categories
        </h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative group">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition"></div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold py-1">{category.name}</h3>
                <Link
                  to={`/product/${category.name
                    .toLowerCase()
                    .replace(/ /g, "-")}`}
                  className="text-white bg-blue-600 px-4 py-2 rounded-md shadow-md inline-block"
                >
                  View Machines
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
