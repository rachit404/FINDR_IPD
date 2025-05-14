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

  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      title: "Extensive Catalog",
      description: "Browse through our comprehensive collection of food processing equipment for all your business needs."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Smart Recommendations",
      description: "Our AI-powered recommendation system helps you find the perfect machinery for your specific requirements."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Cost Efficiency",
      description: "Discover equipment that maximizes your ROI with energy-efficient and cost-effective solutions."
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative h-[550px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1478369402113-1fd53f17e8b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-fadeIn">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
              Welcome to <span className="text-green-400">F.I.N.D.R.</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
              Discover quality & affordable food equipment to help your business thrive
            </p>
            <div className="mt-10 flex gap-4 justify-center">
              <Link
                to="/product"
                className="px-8 py-3 bg-green-600 text-white font-medium rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
              >
                Explore Machines
              </Link>
              <Link
                to="/recommendation"
                className="px-8 py-3 bg-white text-green-600 font-medium rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
              >
                Get Recommendations
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Choose F.I.N.D.R.
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            We help food businesses find the perfect machinery for their unique needs
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="text-green-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Machines */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Popular Machine Categories
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Explore our most sought-after food processing equipment
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {popularMachines.map((machine) => (
              <MachineCard key={machine.id} machine={machine} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link
              to="/product"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-md text-white bg-green-600 hover:bg-green-700 transition duration-300"
            >
              View All Categories
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
      </div>

      {/* Efficiency Banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Lower Operating Costs</span>
              <span className="block text-green-200">
                Energy-efficient food processing solutions
              </span>
            </h2>
            <p className="mt-4 text-lg text-green-100 max-w-xl">
              Our machines are designed with efficiency in mind, helping you reduce energy consumption and operational expenses.
            </p>
          </div>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/product"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-gray-50 transition duration-300"
              >
                Explore Efficient Machines
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation System */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Personalized Recommendations
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Not sure which machine is right for your business? Our recommendation system analyzes your specific requirements to suggest the perfect equipment for your needs.
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-start">
                <svg className="flex-shrink-0 h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="ml-3 text-gray-600">Tailored to your business size</span>
              </li>
              <li className="flex items-start">
                <svg className="flex-shrink-0 h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="ml-3 text-gray-600">Budget-conscious options</span>
              </li>
              <li className="flex items-start">
                <svg className="flex-shrink-0 h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="ml-3 text-gray-600">Specifications that match your production goals</span>
              </li>
            </ul>
            <div className="mt-10">
              <Link
                to="/recommendation"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-md text-white bg-green-600 hover:bg-green-700 transition duration-300"
              >
                Get Your Recommendation
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
          <div className="mt-12 lg:mt-0">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="p-8">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  <h3 className="mt-4 text-xl font-medium text-gray-900">Smart Matching Algorithm</h3>
                  <p className="mt-2 text-gray-600">Our AI-powered system analyzes your requirements and matches them with the perfect machinery.</p>
                </div>
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500">Machine Type</div>
                      <div className="text-lg font-medium text-gray-900">Coffee Machines</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500">Budget</div>
                      <div className="text-lg font-medium text-gray-900">₹10,000 - ₹50,000</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500">Capacity</div>
                      <div className="text-lg font-medium text-gray-900">5-10 kg/hr</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500">Energy</div>
                      <div className="text-lg font-medium text-gray-900">Eco-friendly</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl mx-auto">
            <span className="block">Ready to find your perfect machine?</span>
            <span className="block text-green-400">Start exploring today.</span>
          </h2>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
