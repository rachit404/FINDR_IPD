import React from "react";
import { Link } from "react-router-dom";
import MachineCard from "../components/MachineCard";

const Home = () => {
  const popularMachines = [
    {
      id: 1,
      name: "Ice-Cream Machines",
      url: "/product/ice-cream-machines",
      image:
        "https://m.media-amazon.com/images/I/71kE-V1od6L._AC_UF894,1000_QL80_.jpg",
      description: "High Tech Ice-Cream Machines for industrial use.",
    },
    {
      id: 2,
      name: "Coffee Machines",
      url: "/product/coffee-machines",
      image:
        "https://dgjno4wvg8wqo.cloudfront.net/2024/06/WMF_Coffee_Machines_espresso_Usability_Mood_10380.png",
      description: "Best in Class Coffee Brewing Machines",
    },
    {
      id: 3,
      name: "Grain Processing Machines",
      url: "/product/grain-processing-machines",
      image: "https://www.bangomachinery.com/upload/product8/cereal1-1.jpg",
      description: "Automated Grain Processing machines for various grains.",
    },
  ];

  return (
    <div className="bg-gray-100">
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://png.pngtree.com/thumb_back/fh260/background/20190830/pngtree-automated-machinery-fund-in-a-control-and-production-line-image_309226.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-4xl mx-auto">
            <div className="relative inline-block">
              {/* Background image behind the text */}
              <img
                src="/path/to/inner-text-image.jpg"
                alt="Decorative"
                className="absolute inset-0 w-full h-full object-cover opacity-60 rounded-lg blur-lg"
              />
              <div className="relative p-4">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                  Welcome to F.I.N.D.R.
                </h1>
              </div>
            </div>
            <p className="mt-6 max-w-3xl text-xl text-gray-300">
              Discover quality & affordable food equipment to help you make a
              profit
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Popular Machines
        </h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {popularMachines.map((machine) => (
            <MachineCard key={machine.id} machine={machine} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/product"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            View All Machines
            <svg
              className="ml-2 -mr-1 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Efficiency Banner */}
      <div className="bg-green-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Lower operating costs</span>
            <span className="block text-green-200">
              Efficient energy food processing machines
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              {/* <Link
                to="/product"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50"
              >
                Explore Machines
              </Link> */}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Machine Categories
        </h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-2"></div>
      </div> */}

      {/* Blog and Recommendation Preview */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* <div>
            <h3 className="text-2xl font-extrabold text-gray-900">
              Latest from our Blog
            </h3>
          </div> */}
          <div>
            <h3 className="text-2xl font-extrabold text-gray-900">
              Recommendation System
            </h3>
            <p className="mt-3 text-lg text-gray-500">
              Get personalized machine recommendations for your food business
              startup.
            </p>
            <div className="mt-8">
              <Link
                to="/recommendation"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
              >
                Get Recommendations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
