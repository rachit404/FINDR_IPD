import { useContext, useState, useEffect, useCallback } from "react";
import { CompareContext } from "../utils/comparecontext";
import { DataContext } from "../utils/dataContext";
import { toast } from "react-hot-toast";
import { ChevronLeft, ChevronRight, Copy } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomPrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-all"
  >
    <ChevronLeft className="w-6 h-6 text-gray-600" />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-all"
  >
    <ChevronRight className="w-6 h-6 text-gray-600" />
  </button>
);

const Compare = () => {
  const { data, setData } = useContext(DataContext);
  const { compareList, setCompareList } = useContext(CompareContext);
  const [removedItems, setRemovedItems] = useState([]);
  const [undoTimers, setUndoTimers] = useState({});

  // Debug effect to monitor state changes
  useEffect(() => {
    console.log("State updated:", {
      compareList,
      removedItems,
      undoTimers,
    });
  }, [compareList, removedItems, undoTimers]);

  useEffect(() => {
    // Cleanup timers when component unmounts
    return () => {
      Object.values(undoTimers).forEach((timer) => clearTimeout(timer));
    };
  }, [undoTimers]);
  const handleUndo = useCallback(() => {
    console.log("handleUndo called", { removedItems, undoTimers }); // Debug log

    if (removedItems.length > 0) {
      const [lastRemoved, ...remainingRemoved] = removedItems;
      console.log("Attempting to restore item:", {
        lastRemoved,
        remainingRemoved,
        currentCompareList: compareList,
      });

      // Update compare list first
      setCompareList((prevList) => {
        const newList = [...prevList, lastRemoved];
        console.log("Updated compare list:", newList);
        return newList;
      });

      // Then update removed items
      setRemovedItems(remainingRemoved);

      // Clear the timer for this item
      if (undoTimers[lastRemoved]) {
        clearTimeout(undoTimers[lastRemoved]);
        setUndoTimers((prev) => {
          const newTimers = { ...prev };
          delete newTimers[lastRemoved];
          return newTimers;
        });
      }

      toast(
        (t) => (
          <div className="flex items-center gap-2 text-white">
            <span>✓</span>
            <span>Item restored successfully!</span>
          </div>
        ),
        {
          duration: 3000,
          position: "top-right",
          style: {
            background: "#22c55e",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            fontSize: "1rem",
            fontWeight: "500",
          },
        }
      );
    } else {
      console.log("No items to restore"); // Debug log
    }
  }, [removedItems, undoTimers, setCompareList]);
  const handleRemoveItem = useCallback(
    (machineName) => {
      console.log("Removing item:", machineName); // Debug log

      // First update the removed items list
      setRemovedItems((prev) => {
        console.log("Previous removedItems:", prev); // Debug log
        const newRemovedItems = [machineName, ...prev];
        console.log("New removedItems:", newRemovedItems); // Debug log
        return newRemovedItems;
      });

      // Then update the compare list
      setCompareList((prev) => {
        console.log("Previous compareList:", prev); // Debug log
        const newCompareList = prev.filter((name) => name !== machineName);
        console.log("New compareList:", newCompareList); // Debug log
        return newCompareList;
      });

      // Clear existing timer if any
      if (undoTimers[machineName]) {
        clearTimeout(undoTimers[machineName]);
      }

      // Set new timer
      const timer = setTimeout(() => {
        console.log("Timer expired for:", machineName); // Debug log
        setRemovedItems((prev) => {
          const updated = prev.filter((item) => item !== machineName);
          console.log("Removing item from removedItems after timeout:", {
            prev,
            updated,
            machineName,
          });
          return updated;
        });
        setUndoTimers((prev) => {
          const newTimers = { ...prev };
          delete newTimers[machineName];
          return newTimers;
        });
      }, 5000);

      // Store timer reference
      setUndoTimers((prev) => ({
        ...prev,
        [machineName]: timer,
      }));

      toast(
        (t) => (
          <div className="flex items-center gap-4">
            <span>Item removed</span>
            <button
              onClick={() => {
                handleUndo();
                toast.dismiss(t.id);
              }}
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Undo
            </button>
          </div>
        ),
        {
          duration: 5000,
          position: "top-right",
          style: {
            background: "#fff",
            color: "#333",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
        }
      );
    },
    [undoTimers, handleUndo, setCompareList]
  );

  const handleClearAll = useCallback(() => {
    // Store current list before clearing
    const itemsToRemove = [...compareList];

    // Clear compare list
    setCompareList([]);

    // Add all items to removed items
    setRemovedItems((prev) => [...itemsToRemove, ...prev]);

    // Clear any existing timers
    Object.values(undoTimers).forEach((timer) => clearTimeout(timer));

    // Set new timer for the batch
    const batchTimer = setTimeout(() => {
      setRemovedItems((prev) =>
        prev.filter((item) => !itemsToRemove.includes(item))
      );
    }, 5000);

    // Store timer reference for each item
    const newTimers = itemsToRemove.reduce((acc, item) => {
      acc[item] = batchTimer;
      return acc;
    }, {});

    setUndoTimers(newTimers);

    toast(
      (t) => (
        <div className="flex items-center gap-4">
          <span>All items cleared</span>
          <button
            onClick={() => {
              handleUndo();
              toast.dismiss(t.id);
            }}
            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Undo
          </button>
        </div>
      ),
      {
        duration: 5000,
        position: "top-right",
        style: {
          background: "#fff",
          color: "#333",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      }
    );
  }, [compareList, undoTimers, handleUndo]);

  const excludedKeys = ["Image URL", "Unnamed: 12"];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: compareList.length > 2 ? 3 : compareList.length,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, compareList.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (!data || data.length === 0 || !compareList || compareList.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <h3 className="text-2xl font-medium text-gray-900 mb-4">
              No items to compare
            </h3>
            <p className="text-gray-500">
              Add some machines to your comparison list to see them here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Compare Machines</h2>
          <button
            onClick={handleClearAll}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all flex items-center gap-2 border border-red-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
            Clear All
          </button>
        </div>
        <div className="relative px-8">
          <Slider {...settings} className="compare-slider -mx-4">
            {data
              .filter((item) =>
                compareList.includes(
                  item["Model Name"] ||
                    item["MachineName"] ||
                    item["Machine Name"] ||
                    "Unknown Machine"
                )
              )
              .map((item, index) => (
                <div key={index} className="px-4">
                  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow h-full">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {item["Model Name"] ||
                          item["MachineName"] ||
                          item["Machine Name"] ||
                          "Unknown Machine"}
                      </h3>
                      <button
                        onClick={() => {
                          const machineName =
                            item["Model Name"] ||
                            item["MachineName"] ||
                            item["Machine Name"] ||
                            "Unknown Machine";
                          handleRemoveItem(machineName);
                        }}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                    {item["Image URL"] && (
                      <div className="relative w-full mb-6 p-4 bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl shadow-inner overflow-hidden group">
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <img
                          src={item["Image URL"]}
                          alt={`Image of ${item["Machine Name"]}`}
                          className="h-64 w-full object-contain transform transition-all duration-500 hover:scale-110 hover:rotate-1 mx-auto"
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <div className="flex justify-end mb-4">
                        <button
                          onClick={() => {
                            const textToCopy = Object.entries(item)
                              .filter(([key]) => !excludedKeys.includes(key))
                              .map(([key, value]) => `${key}: ${value}`)
                              .join("\n");
                            navigator.clipboard
                              .writeText(textToCopy)
                              .then(() => {
                                toast.success("Specs copied to clipboard!", {
                                  duration: 2000,
                                  position: "bottom-right",
                                });
                              });
                          }}
                          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                          <span>Copy specs</span>
                        </button>
                      </div>
                      {Object.entries(item)
                        .filter(([key]) => !excludedKeys.includes(key))
                        .map(([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between items-center border-b border-gray-100 pb-2"
                          >
                            <span className="text-sm text-gray-600 font-medium capitalize">
                              {key}:
                            </span>
                            <span className="text-sm text-gray-900">
                              {value}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Compare;
