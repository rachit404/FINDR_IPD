import React, { useState } from "react";
import { Link } from "react-router-dom";

const MachineCard = ({ machine }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative bg-white rounded-lg shadow-md overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={machine.image}
          alt={machine.name}
          className={`w-full h-full object-cover transition-transform duration-300 ease-in-out ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            {/* <button
              className="p-2 bg-white rounded-full mr-2"
              onClick={() => console.log("Open full image")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button> */}
            {/* <Link to={`${machine.url}`} className="p-2 bg-white rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Link> */}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{machine.name}</h3>
        <p className="mt-2 text-sm text-gray-600">{machine.description}</p>
        <div className="mt-4 flex justify-end">
          <Link
            to={`${machine.url}`}
            className="text-sm font-medium text-green-600 hover:text-green-500"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MachineCard;
