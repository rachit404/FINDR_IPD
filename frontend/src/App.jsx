import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CompareProvider } from "./utils/comparecontext";
import { DataContextProvider } from "./utils/dataContext";
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
import Compare from "./pages/Compare";

const App = () => {
  return (
    <CompareProvider>
      <DataContextProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#333",
                  color: "#fff",
                },
              }}
            />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product" element={<Product />} />
                <Route path="/compare" element={<Compare />} />
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
      </DataContextProvider>
    </CompareProvider>
  );
};

export default App;
