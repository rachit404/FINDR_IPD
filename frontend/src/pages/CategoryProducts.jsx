import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [row, setRow] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // New state for tracking view mode

  useEffect(() => {
    // Fetch initial row from backend
    if (categoryName) {
      axios
        .get(
          `http://127.0.0.1:5001/${categoryName
            .toLowerCase()
            .replace(/ /g, "-")}`
        )
        .then((response) => {
          try {
            if (typeof response.data === "string") {
              const sanitizedData = response.data.replace(/NaN/g, "null");
              const parsedData = JSON.parse(sanitizedData);
              setRow(parsedData);
            } else {
              setRow(response.data);
            }
          } catch (error) {
            console.error("Error parsing response data:", error);
          }
        })
        .catch((error) => {
          console.error("Error fetching row:", error);
        });
    }
  }, [categoryName]);

  // Render details of a single product
  if (selectedProduct) {
    return (
      <div className="bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            className="mb-4"
            onClick={() => setSelectedProduct(null)}
            style={{
              position: "relative",
              display: "inline-block",
              margin: "10px",
              padding: "10px 20px",
              textAlign: "center",
              fontSize: "14px",
              letterSpacing: "0.8px",
              textDecoration: "none",
              color: "#16A34A",
              background: "transparent",
              cursor: "pointer",
              transition: "ease-out 0.2s",
              border: "2px solid #16A34A",
              borderRadius: "8px",
              boxShadow: "inset 0 0 0 0 #16A34A",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "white";
              e.target.style.boxShadow = "inset 0 -100px 0 0 #16A34A";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#16A34A";
              e.target.style.boxShadow = "inset 0 0 0 0 #16A34A";
            }}
            onMouseDown={(e) => {
              e.target.style.transform = "scale(0.9)";
            }}
            onMouseUp={(e) => {
              e.target.style.transform = "scale(1)";
            }}
          >
            Back
          </button>
          <div className="bg-white border rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
              <div className="w-full h-full">
                {selectedProduct["Image URL"] ? (
                  <img
                    src={selectedProduct["Image URL"]}
                    alt={selectedProduct["Machine Name"] || "Machine"}
                    className="h-120 w-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="bg-gray-200 h-64 flex items-center justify-center rounded-lg">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-xl font-bold">
                  {selectedProduct["Machine Name"] || "Machine"}
                </h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-600 border border-gray-300 rounded-lg">
                    <thead className="bg-gray-100 text-gray-700 uppercase">
                      <tr>
                        <th className="px-4 py-2 border-b">Attribute</th>
                        <th className="px-4 py-2 border-b">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(selectedProduct).map(([key, value]) => {
                        if (
                          key !== "Machine Name" &&
                          key !== "Image URL" &&
                          key !== "Price (USD)"
                        )
                          return (
                            <tr key={key} className="hover:bg-gray-50">
                              <td className="px-4 py-2 border-b font-medium">
                                {key}
                              </td>
                              <td className="px-4 py-2 border-b">
                                {value || "N/A"}
                              </td>
                            </tr>
                          );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render product in grid view
  const renderGridView = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {row.map((item, rowIndex) => (
          <div
            key={rowIndex}
            className="bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className="h-48">
              {item["Image URL"] ? (
                <img
                  src={item["Image URL"]}
                  alt={item["Machine Name"] || "Machine"}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="bg-gray-200 h-full flex items-center justify-center">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">
                {item["Machine Name"] || `Item ${rowIndex + 1}`}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Price:</strong> ₹{item["Price (INR)"] || "N/A"}
              </p>
              <button
                onClick={() => {
                  setSelectedProduct(item);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full py-2 px-4 text-center text-green-600 border border-green-600 rounded-md hover:bg-green-600 hover:text-white transition-colors duration-300"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render product in list view
  const renderListView = () => {
    return (
      <div className="flex flex-col gap-4">
        {row.map((item, rowIndex) => (
          <div
            key={rowIndex}
            className="bg-white border rounded-lg shadow-lg overflow-hidden flex flex-row hover:shadow-xl transition-all duration-300"
          >
            <div className="w-1/3 max-w-[200px]">
              {item["Image URL"] ? (
                <img
                  src={item["Image URL"]}
                  alt={item["Machine Name"] || "Machine"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="bg-gray-200 h-full flex items-center justify-center">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
            </div>
            <div className="w-2/3 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold">
                  {item["Machine Name"] || `Item ${rowIndex + 1}`}
                </h3>
                <p className="text-sm text-gray-600">
                  <strong>Price:</strong> ₹{item["Price (INR)"] || "N/A"}
                </p>
                {/* Show 1-2 additional details if available */}
                {item["Type"] && (
                  <p className="text-sm text-gray-600">
                    <strong>Type:</strong> {item["Type"]}
                  </p>
                )}
                {item["Manufacturer"] && (
                  <p className="text-sm text-gray-600">
                    <strong>Manufacturer:</strong> {item["Manufacturer"]}
                  </p>
                )}
              </div>
              <button
                onClick={() => {
                  setSelectedProduct(item);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="mt-2 py-2 px-4 text-green-600 border border-green-600 rounded-md hover:bg-green-600 hover:text-white transition-colors duration-300 max-w-xs"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900 capitalize">
            {categoryName.replace(/-/g, " ")}
          </h2>
          
          {/* View mode toggle buttons */}
          <div className="flex items-center space-x-2 bg-white rounded-lg shadow p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${
                viewMode === 'grid' 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
              title="Grid View"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${
                viewMode === 'list' 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
              title="List View"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {row.length > 0 ? (
          <div className="transition-all duration-300">
            {viewMode === 'grid' ? renderGridView() : renderListView()}
          </div>
        ) : (
          <div className="bg-white border rounded-lg shadow-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-600 text-lg">
              No products found for this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
