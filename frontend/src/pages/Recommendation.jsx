import React, { useState, useEffect } from "react";
import { dropdown2Options, dropdown3Options } from "./dropdown.js";
import axios from "axios";

import { useContext } from "react";
import { CompareContext } from "../utils/comparecontext";
import { DataContext } from "../utils/dataContext";

const Recommendation = () => {
  const { data, setData } = useContext(DataContext);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    manufacturer: "",
    priceMin: "",
    priceMax: "",
    machineName: "",
    displayCount: "10",
  });

  const [dropdownValues, setDropdownValues] = useState({
    dropdown1: "Coffee",
    dropdown2: "Machine Name",
    dropdown3: "Espressione Concierge 8212S",
  });

  const [dropdown2Choices, setDropdown2Choices] = useState(
    dropdown2Options[dropdownValues.dropdown1]
  );
  const [dropdown3Choices, setDropdown3Choices] = useState(
    dropdown3Options[dropdownValues.dropdown1]?.[dropdownValues.dropdown2]
  );

  const [showData, setShowData] = useState(false);

  const { compareList, setCompareList } = useContext(CompareContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:5001/post-recommendation", dropdownValues, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response Data:", response.data);
        setData(response.data);
        setShowData(true);
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
      });
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setDropdownValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    setDropdown2Choices(dropdown2Options[dropdownValues.dropdown1]);
    setDropdownValues((prevValues) => ({
      ...prevValues,
      dropdown2: dropdown2Options[dropdownValues.dropdown1][0],
    }));
  }, [dropdownValues.dropdown1]);

  useEffect(() => {
    setDropdown3Choices(
      dropdown3Options[dropdownValues.dropdown1]?.[dropdownValues.dropdown2]
    );
    setDropdownValues((prevValues) => ({
      ...prevValues,
      dropdown3:
        dropdown3Options[dropdownValues.dropdown1]?.[
          dropdownValues.dropdown2
        ][0],
    }));
  }, [dropdownValues.dropdown2]);

  useEffect(() => {
    if (data.length > 0) {
      let filtered = [...data];

      if (filters.manufacturer) {
        filtered = filtered.filter((item) =>
          (item.Manufacturer || item.Brand || "")
            .toLowerCase()
            .includes(filters.manufacturer.toLowerCase())
        );
      }

      if (filters.machineName) {
        filtered = filtered.filter((item) =>
          (
            item["Model Name"] ||
            item["MachineName"] ||
            item["Machine Name"] ||
            ""
          )
            .toLowerCase()
            .includes(filters.machineName.toLowerCase())
        );
      } // Helper function to parse price
      const parsePrice = (priceStr) => {
        if (!priceStr) return 0;
        // Convert to string and clean up the price string
        const cleaned = priceStr
          .toString()
          .replace(/[^\d.,]/g, "") // Remove everything except digits, dots, and commas
          .replace(/,/g, "."); // Replace commas with dots
        // Get the last valid number (in case there are multiple dots)
        const numbers = cleaned.split(".");
        const integer = numbers[0];
        const decimal = numbers[1] || "00";
        return parseFloat(integer + "." + decimal);
      };

      if (filters.priceMin) {
        const minPrice = parseFloat(filters.priceMin);
        if (!isNaN(minPrice)) {
          filtered = filtered.filter((item) => {
            const price = parsePrice(
              item.Price || item["Price (Rs)"] || item.price
            );
            return price >= minPrice;
          });
        }
      }

      if (filters.priceMax) {
        const maxPrice = parseFloat(filters.priceMax);
        if (!isNaN(maxPrice)) {
          filtered = filtered.filter((item) => {
            const price = parsePrice(
              item.Price || item["Price (Rs)"] || item.price
            );
            return price <= maxPrice;
          });
        }
      }

      filtered = filtered.slice(0, parseInt(filters.displayCount));
      setFilteredData(filtered);
    }
  }, [data, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCompare = (item) => {
    setCompareList((prevList) => {
      if (!prevList.includes(item)) {
        return [...prevList, item];
      }
      return prevList;
    });
    console.log("Compare List:", compareList);
  };

  const renderCards = () => {
    if (!filteredData || filteredData.length === 0) {
      return (
        <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
          <div className="animate-pulse">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-xl font-medium text-gray-900">
            No recommendations available.
          </h3>
          <p className="mt-2 text-gray-500">
            Try adjusting your search criteria.
          </p>
        </div>
      );
    }

    const excludedKeys = ["Model", "Image URL", "Unnamed: 12", "Price (USD)"];

    return (
      <div className="grid grid-cols-1 gap-6">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-blue-200"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-3/4 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 hover:text-blue-600 transition-colors">
                  {item["Model Name"] ||
                    item["MachineName"] ||
                    item["Grain Machine"] ||
                    item["Model"] ||
                    item["Machine Name"] ||
                    "Machine"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(item)
                    .filter(([key]) => !excludedKeys.includes(key))
                    .map(([key, value], rowIndex) => (
                      <div
                        key={rowIndex}
                        className="flex justify-between items-center border-b border-gray-100 pb-2 hover:bg-gray-50 rounded-lg px-3 transition-colors"
                      >
                        <span className="text-sm text-gray-600 font-medium capitalize">
                          {key}:
                        </span>
                        <span className="text-sm text-gray-900 font-semibold">
                          {value}
                        </span>
                      </div>
                    ))}{" "}
                  <button
                    type="submit"
                    className="w-48 bg-slate-100 text-blue-600 px-4 py-2 rounded-md border border-blue-600 hover:bg-blue-600 hover:text-white transition-all focus:ring-2 focus:ring-blue-500"
                    onClick={() =>
                      handleCompare(
                        item["Model Name"] ||
                          item["MachineName"] ||
                          item["Machine Name"] ||
                          "Unknown Machine"
                      )
                    }
                  >
                    Add To Compare
                  </button>
                </div>
              </div>
              {item["Image URL"] && (
                <div className="md:w-1/4 p-6 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <img
                    src={item["Image URL"]}
                    alt={`Image of ${item["Machine Name"]}`}
                    className="h-48 w-auto object-contain transform transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!showData ? (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
              Find Your Perfect Machine
            </h2>
            <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-opacity-90">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-6">
                  <div className="group">
                    <label
                      htmlFor="dropdown1"
                      className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors"
                    >
                      Type of Machine
                    </label>
                    <select
                      id="dropdown1"
                      name="dropdown1"
                      value={dropdownValues.dropdown1}
                      onChange={handleDropdownChange}
                      className="block w-full p-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value="Coffee">Coffee Machine</option>
                      <option value="Fruit">Fruit Processing</option>
                      <option value="Grain">Grain Processing</option>
                      <option value="Ice-cream">Ice Cream Maker</option>
                      <option value="Juice">Juice Maker</option>
                      <option value="Nut">Nut Processing</option>
                    </select>
                  </div>

                  <div className="group">
                    <label
                      htmlFor="dropdown2"
                      className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors"
                    >
                      Features
                    </label>
                    <select
                      id="dropdown2"
                      name="dropdown2"
                      value={dropdownValues.dropdown2}
                      onChange={handleDropdownChange}
                      className="block w-full p-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    >
                      {dropdown2Choices.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="group">
                    <label
                      htmlFor="dropdown3"
                      className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors"
                    >
                      Model Selection
                    </label>
                    <select
                      id="dropdown3"
                      name="dropdown3"
                      value={dropdownValues.dropdown3}
                      onChange={handleDropdownChange}
                      className="block w-full p-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    >
                      {dropdown3Choices.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg font-medium 
                           transition-all duration-200 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98]"
                >
                  Find Recommendations
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="animate-fadeIn">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Recommended Machines
              </h2>
              <button
                onClick={() => setShowData(false)}
                className="px-6 py-2 text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-600 hover:text-white
                         transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Search
              </button>
            </div>
            <div className="flex gap-6">
              {/* Filter Panel */}
              <div className="w-1/4">
                <div className="sticky top-6 bg-white rounded-2xl shadow-lg p-6 max-h-[calc(100vh-3rem)] overflow-y-auto">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Filters
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Manufacturer
                      </label>
                      <input
                        type="text"
                        name="manufacturer"
                        value={filters.manufacturer}
                        onChange={handleFilterChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter manufacturer name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Machine Name
                      </label>
                      <input
                        type="text"
                        name="machineName"
                        value={filters.machineName}
                        onChange={handleFilterChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter machine name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price Range (Rs)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          name="priceMin"
                          value={filters.priceMin}
                          onChange={handleFilterChange}
                          className="w-1/2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Min"
                        />
                        <input
                          type="number"
                          name="priceMax"
                          value={filters.priceMax}
                          onChange={handleFilterChange}
                          className="w-1/2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Display Count
                      </label>
                      <select
                        name="displayCount"
                        value={filters.displayCount}
                        onChange={handleFilterChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              {/* Main Content */}
              <div className="w-3/4">{renderCards()}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendation;
