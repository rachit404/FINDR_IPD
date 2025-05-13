import React, { useState, useEffect } from "react";
import { dropdown2Options, dropdown3Options } from "./dropdown.js";
import axios from "axios";

const FilterSelect = ({
  label,
  name,
  value,
  options = [],
  onChange,
  className = "",
}) => {
  // Ensure options is always an array
  const safeOptions = Array.isArray(options) ? options : [];

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        {label}
      </label>
      <select
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full p-2.5 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
      >
        {safeOptions.map((option) => (
          <option key={option.value || option} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    </div>
  );
};

const Card = ({ item }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
    {item["Image URL"] && (
      <div className="h-48 bg-gray-50 border-b">
        <img
          src={item["Image URL"]}
          alt={item["Machine Name"]}
          className="w-full h-full object-contain p-4"
        />
      </div>
    )}
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        {item["Machine Name"] ||
          item["Model Name"] ||
          item["Grain Machine"] ||
          item["Model"] ||
          "Machine"}
      </h2>
      <div className="space-y-3">
        {Object.entries(item)
          .filter(
            ([key]) => !["Model", "Image URL", "Unnamed: 12"].includes(key)
          )
          .map(([key, value], idx) => (
            <div
              key={idx}
              className="flex justify-between items-center border-b border-gray-100 pb-2"
            >
              <span className="text-sm text-gray-600 font-medium">{key}:</span>
              <span className="text-sm text-gray-900">{value}</span>
            </div>
          ))}
      </div>
    </div>
  </div>
);

const NoResults = () => (
  <div className="text-center py-12 bg-white rounded-xl shadow-lg">
    <svg
      className="mx-auto h-12 w-12 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <h3 className="mt-2 text-lg font-medium text-gray-900">No Results Found</h3>
    <p className="mt-1 text-gray-500">
      Try adjusting your filters to find more machines.
    </p>
  </div>
);

const Recommendation1 = () => {
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [dropdownValues, setDropdownValues] = useState({
    dropdown1: "Coffee",
    dropdown2: dropdown2Options["Coffee"][0],
    dropdown3: "Espressione Concierge 8212S",
  });

  const [dropdown2Choices, setDropdown2Choices] = useState(
    dropdown2Options[dropdownValues.dropdown1] || []
  );
  const [dropdown3Choices, setDropdown3Choices] = useState(
    dropdown3Options[dropdownValues.dropdown1]?.[dropdownValues.dropdown2] || []
  );

  const [filters, setFilters] = useState({
    coffee: {
      easeOfUse: "",
      powerRange: "",
      brewTimeRange: "",
      priceRange: "",
    },
    fruit: {
      speedRange: "",
      powerInputRange: "",
      efficiencyRange: "",
      priceRange: "",
    },
    grain: { capacityRange: "", powerOutputRange: "", priceRange: "" },
    iceCream: {
      capacityRange: "",
      processingTimeRange: "",
      batchOutputRange: "",
      priceRange: "",
    },
    juice: {
      material: "",
      juicerType: "",
      motorPowerRange: "",
      priceRange: "",
    },
  });

  const filterOptions = {
    ranges: {
      power: [
        { value: "", label: "Any" },
        { value: "0-1", label: "0-1 kW" },
        { value: "1-2", label: "1-2 kW" },
        { value: "2-3", label: "2-3 kW" },
        { value: "3+", label: "3+ kW" },
      ],
      price: [
        { value: "", label: "Any" },
        { value: "0-1000", label: "0-1,000" },
        { value: "1000-2000", label: "1,000-2,000" },
        { value: "2000-3000", label: "2,000-3,000" },
        { value: "3000+", label: "3,000+" },
      ],
      time: [
        { value: "", label: "Any" },
        { value: "0-5", label: "0-5 mins" },
        { value: "5-10", label: "5-10 mins" },
        { value: "10-15", label: "10-15 mins" },
        { value: "15+", label: "15+ mins" },
      ],
      capacity: [
        { value: "", label: "Any" },
        { value: "0-100", label: "0-100 kg/hr" },
        { value: "100-200", label: "100-200 kg/hr" },
        { value: "200-300", label: "200-300 kg/hr" },
        { value: "300+", label: "300+ kg/hr" },
      ],
      efficiency: [
        { value: "", label: "Any" },
        { value: "0-50", label: "0-50%" },
        { value: "50-75", label: "50-75%" },
        { value: "75-90", label: "75-90%" },
        { value: "90+", label: "90+" },
      ],
    },
    coffee: {
      easeOfUse: [
        { value: "", label: "Any" },
        { value: "Beginner", label: "Beginner" },
        { value: "Intermediate", label: "Intermediate" },
        { value: "Advanced", label: "Advanced" },
      ],
    },
    juice: {
      material: [
        { value: "", label: "Any" },
        { value: "Steel", label: "Steel" },
        { value: "Plastic", label: "Plastic" },
        { value: "Glass", label: "Glass" },
      ],
      juicerType: [
        { value: "", label: "Any" },
        { value: "Centrifugal", label: "Centrifugal" },
        { value: "Masticating", label: "Masticating" },
        { value: "Twin Gear", label: "Twin Gear" },
      ],
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5001/post-recommendation",
        dropdownValues,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setData(response.data);
      setShowData(true);
    } catch (error) {
      setError("Failed to fetch recommendations. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setDropdownValues((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const choices = dropdown2Options[dropdownValues.dropdown1] || [];
    setDropdown2Choices(choices);
    if (choices.length > 0) {
      setDropdownValues((prev) => ({
        ...prev,
        dropdown2: choices[0],
      }));
    }
  }, [dropdownValues.dropdown1]);

  useEffect(() => {
    const choices =
      dropdown3Options[dropdownValues.dropdown1]?.[dropdownValues.dropdown2] ||
      [];
    setDropdown3Choices(choices);
    if (choices.length > 0) {
      setDropdownValues((prev) => ({
        ...prev,
        dropdown3: choices[0],
      }));
    }
  }, [dropdownValues.dropdown1, dropdownValues.dropdown2]);

  const handleFilterChange = (dataset, e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [dataset]: { ...prev[dataset], [name]: value },
    }));
  };

  const applyRangeFilter = (value, itemValue) => {
    if (!value) return true;
    const [min, max] = value.split("-").map(Number);
    const numValue = Number(itemValue);
    return max ? numValue >= min && numValue <= max : numValue >= min;
  };

  const applyFilters = (rawData) => {
    const currentDataset = dropdownValues.dropdown1.toLowerCase();
    const currentFilters = filters[currentDataset];

    return rawData.filter((item) => {
      return Object.entries(currentFilters).every(([key, value]) => {
        if (!value) return true;

        const mapping = {
          easeOfUse: "Ease of Use",
          powerRange: "Power Output (kW)",
          brewTimeRange: "Brew Time (Minutes)",
          speedRange: "Speed (kg/hr)",
          powerInputRange: "Power Input (kW)",
          efficiencyRange: "Efficiency (%)",
          capacityRange: "Capacity",
          processingTimeRange: "Processing Time",
          batchOutputRange: "Batch Output",
          material: "Material",
          juicerType: "Type of Juicer",
          motorPowerRange: "Motor Power (W)",
          priceRange: "Price (USD)",
        };

        const itemKey = mapping[key];
        const itemValue = item[itemKey];

        if (key.includes("Range")) {
          return applyRangeFilter(value, itemValue);
        }
        return itemValue?.toLowerCase() === value.toLowerCase();
      });
    });
  };

  const renderFilterSection = () => {
    const currentDataset = dropdownValues.dropdown1.toLowerCase();
    const filterConfigs = {
      coffee: {
        easeOfUse: "Ease of Use",
        powerRange: "Power Range",
        brewTimeRange: "Brew Time",
      },
      fruit: {
        speedRange: "Speed",
        powerInputRange: "Power Input",
        efficiencyRange: "Efficiency",
      },
      grain: {
        capacityRange: "Capacity",
        powerOutputRange: "Power Output",
      },
      "ice-cream": {
        capacityRange: "Capacity",
        processingTimeRange: "Processing Time",
        batchOutputRange: "Batch Output",
      },
      juice: {
        material: "Material",
        juicerType: "Juicer Type",
        motorPowerRange: "Motor Power",
      },
    };

    const currentConfig = filterConfigs[currentDataset] || {};

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b">
          Filter Options
        </h3>
        <div className="space-y-4">
          {Object.entries(currentConfig).map(([key, label]) => (
            <FilterSelect
              key={key}
              label={label}
              name={key}
              value={filters[currentDataset][key]}
              options={
                key.includes("Range")
                  ? filterOptions.ranges[key.replace("Range", "").toLowerCase()]
                  : filterOptions[currentDataset][key]
              }
              onChange={(e) => handleFilterChange(currentDataset, e)}
            />
          ))}
          <FilterSelect
            label="Price Range"
            name="priceRange"
            value={filters[currentDataset].priceRange}
            options={filterOptions.ranges.price}
            onChange={(e) => handleFilterChange(currentDataset, e)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!showData ? (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">
              Find Your Perfect Machine
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <FilterSelect
                  label="Select Machine Type"
                  name="dropdown1"
                  value={dropdownValues.dropdown1}
                  options={[
                    { value: "Coffee", label: "Coffee Machine" },
                    { value: "Fruit", label: "Fruit & Vegetable Processing" },
                    { value: "Grain", label: "Grain Processing" },
                    { value: "Ice-cream", label: "Ice Cream Maker" },
                    { value: "Juice", label: "Juice Maker" },
                  ]}
                  onChange={handleDropdownChange}
                />
                <FilterSelect
                  label="Select Feature"
                  name="dropdown2"
                  value={dropdownValues.dropdown2}
                  options={dropdown2Choices.map((value) => ({
                    value,
                    label: value,
                  }))}
                  onChange={handleDropdownChange}
                />
                <FilterSelect
                  label="Select Model"
                  name="dropdown3"
                  value={dropdownValues.dropdown3}
                  options={dropdown3Choices.map((value) => ({
                    value,
                    label: value,
                  }))}
                  onChange={handleDropdownChange}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md font-medium transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Find Recommendations"
                  )}
                </button>
                {error && (
                  <div className="text-red-600 text-sm mt-2">{error}</div>
                )}
              </form>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Recommended Machines
              </h2>
              <button
                onClick={() => setShowData(false)}
                className="px-4 py-2 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                ← Back to Search
              </button>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/4">{renderFilterSection()}</div>
              <div className="lg:w-3/4">
                {data.length === 0 ? (
                  <NoResults />
                ) : (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {applyFilters(data).map((item, index) => (
                      <Card key={index} item={item} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendation1;
