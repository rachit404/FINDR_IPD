import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Recommendation from "./pages/Recommendation";
import Blog from "./pages/Blog";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import CategoryProducts from "./pages/CategoryProducts";
import Recommendation1 from "./pages/Recommendation1";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/recommendation" element={<Recommendation />} />
            {/* <Route path="/recommendation" element={<Recommendation1 />} /> */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/product/:categoryName"
              element={<CategoryProducts />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
