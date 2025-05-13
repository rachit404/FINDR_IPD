import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [row, setRow] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
              {/* <div className="p-4">
                <h3 className="text-xl font-bold">
                  {selectedProduct["Machine Name"] || "Machine"}
                </h3>
                <ul className="mt-4 text-sm text-gray-600">
                  {Object.entries(selectedProduct).map(([key, value]) => {
                    if (key != "Machine Name" && key != "Image URL")
                      return (
                        <li key={key} className="mt-1">
                          <strong>{key}:</strong> {value || "N/A"}
                        </li>
                      );
                  })}
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 capitalize">
          {categoryName.replace(/-/g, " ")}
        </h2>
        <div className="mt-8 grid gap-8">
          {row.length > 0 ? (
            row.map((item, rowIndex) => (
              <div
                key={rowIndex}
                className="bg-white border rounded-lg shadow-lg overflow-hidden flex items-center"
              >
                <div className="w-1/3">
                  {item["Image URL"] ? (
                    <img
                      src={item["Image URL"]}
                      alt={item["Machine Name"] || "Machine"}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      style={{
                        width: "500px",
                        height: "225px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div className="bg-gray-200 h-full flex items-center justify-center">
                      <span className="text-gray-500">No Image Available</span>
                    </div>
                  )}
                </div>
                <div className="w-2/3 p-4">
                  <h3 className="text-lg font-bold">
                    {item["Machine Name"] || `Item ${rowIndex + 1}`}
                  </h3>
                  <p className="text-sm text-gray-600">
                    <strong>Price:</strong> ₹{item["Price (INR)"] || "N/A"}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedProduct(item);
                      window.scrollTo({ top: 0, behavior: "smooth" }); // Scrolls to top smoothly
                    }}
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
                    Read More
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">
              No products found for this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
