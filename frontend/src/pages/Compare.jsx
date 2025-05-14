import { useContext, useState, useCallback } from "react";
import { CompareContext } from "../utils/comparecontext";
import { DataContext } from "../utils/dataContext";
import { toast } from "react-hot-toast";
import { ChevronLeft, ChevronRight, Copy } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ComparisonChatbot from "../components/ComparisonChatbot";

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
  const { data } = useContext(DataContext);
  const { compareList, setCompareList } = useContext(CompareContext);
  const [removedItems, setRemovedItems] = useState([]);

  const handleRemoveItem = useCallback(
    (machineName) => {
      setRemovedItems((prev) => [machineName, ...prev]);
      setCompareList((prev) => prev.filter((name) => name !== machineName));

      toast(
        (t) => (
          <div className="flex items-center gap-4 p-4 bg-white text-gray-800 rounded-lg shadow-md border border-gray-200 max-w-md">
            {/* Icon */}
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 text-green-600 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm font-medium">{machineName} removed</p>
              <p className="text-xs text-gray-500">You can undo this action.</p>
            </div>

            {/* Undo Button */}
            <button
              onClick={() => {
                setCompareList((prev) => [machineName, ...prev]);
                setRemovedItems((prev) =>
                  prev.filter((item) => item !== machineName)
                );
                toast.dismiss(t.id);
              }}
              className="px-3 py-1 text-sm font-semibold text-green-600 border border-green-600 rounded hover:bg-green-600 hover:text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Undo
            </button>
          </div>
        ),
        {
          duration: 2000,
          position: "bottom-right",
          style: {
            background: "transparent", // Style moved into content box
            padding: 0,
            boxShadow: "none",
          },
        }
      );
    },
    [setCompareList, setRemovedItems]
  );

  const handleClearAll = useCallback(() => {
    const itemsToRemove = [...compareList];

    setCompareList([]);
    setRemovedItems((prev) => [...itemsToRemove, ...prev]);

    toast(
      (t) => (
        <div className="flex items-center gap-4 p-4 bg-white text-gray-800 rounded-lg shadow-lg border border-gray-200 max-w-md">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13h6m2 0a2 2 0 100-4H7a2 2 0 100 4h10zm-2 0v6m0-6v-6"
              />
            </svg>
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium">All items cleared</p>
            <p className="text-xs text-gray-500">You can undo this action.</p>
          </div>

          <button
            onClick={() => {
              setCompareList(itemsToRemove);
              setRemovedItems((prev) =>
                prev.filter((item) => !itemsToRemove.includes(item))
              );
              toast.dismiss(t.id);
            }}
            className="px-3 py-1 text-sm font-semibold text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Undo
          </button>
        </div>
      ),
      {
        duration: 5000,
        position: "top-right",
        style: {
          background: "transparent", // background moved to inner div for better styling
          boxShadow: "none",
          padding: 0,
        },
      }
    );
  }, [compareList, setCompareList, setRemovedItems]);

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
            className="group px-4 py-2 rounded-lg border border-red-200 bg-red-50 text-red-600 flex items-center gap-2 transition-all duration-300 ease-in-out hover:bg-red-600 hover:text-white"
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
              className="transition-colors duration-300 ease-in-out group-hover:stroke-white"
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
              .map((item, index) => {
                const machineName =
                  item["Model Name"] ||
                  item["MachineName"] ||
                  item["Machine Name"] ||
                  "Unknown Machine";

                return (
                  <div key={index} className="px-4">
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow h-full">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {machineName}
                        </h3>
                        <button
                          onClick={() => handleRemoveItem(machineName)}
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
                            alt={`Image of ${machineName}`}
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

                              navigator.clipboard.writeText(textToCopy);
                              toast.success(
                                "Machine details copied to clipboard"
                              );
                            }}
                            className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600"
                          >
                            <Copy className="w-4 h-4" />
                            Copy Details
                          </button>
                        </div>

                        {Object.entries(item)
                          .filter(([key]) => !excludedKeys.includes(key))
                          .map(([key, value], i) => (
                            <div
                              key={i}
                              className="flex justify-between border-b py-1 text-sm"
                            >
                              <span className="font-medium text-gray-600">
                                {key}
                              </span>
                              <span className="text-gray-800 text-right">
                                {value || "-"}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
      <ComparisonChatbot />
    </div>
  );
};

export default Compare;
