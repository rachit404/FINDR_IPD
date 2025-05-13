// src/pages/Blog.jsx
import React, { useState } from "react";

const Blog = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "John Doe",
      review: "Great machine for our bakery!",
      product: "Potato Chip Slicer",
      email: "johndoe@example.com",
      date: "October 3, 2024",
    },
    {
      id: 2,
      name: "Jane Smith",
      review: "Helped streamline our processing line.",
      product: "Coffee Machines",
      email: "janesmith@example.com",
      date: "September 25, 2024",
    },
  ]);

  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    review: "",
    product: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      feedback.name &&
      feedback.email &&
      feedback.review &&
      feedback.product
    ) {
      setReviews([
        ...reviews,
        {
          id: reviews.length + 1,
          ...feedback,
          date: new Date().toLocaleDateString(),
        },
      ]);
      setFeedback({ name: "", email: "", review: "", product: "" });
    }
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Customer Reviews
        </h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border rounded-lg shadow-lg p-6"
            >
              <h3 className="text-lg font-bold">{review.name}</h3>
              <p className="text-sm text-gray-600">Product: {review.product}</p>
              <p className="text-sm text-gray-600">{review.review}</p>
              <p className="mt-4 text-xs text-gray-500">
                Posted on {review.date}
              </p>
            </div>
          ))}
        </div>

        {/* Feedback Form */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-900">
            Submit Your Feedback
          </h3>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <input
              type="text"
              name="name"
              value={feedback.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <input
              type="email"
              name="email"
              value={feedback.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              name="product"
              value={feedback.product}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <textarea
              name="review"
              value={feedback.review}
              onChange={handleInputChange}
              placeholder="Your Review"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Blog;
