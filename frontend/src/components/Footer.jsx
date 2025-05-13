import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company & Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              F.I.N.D.R.
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Link
                  to="/product"
                  className="block text-gray-300 hover:text-white mb-2"
                >
                  Products
                </Link>
                <Link
                  to="/about"
                  className="block text-gray-300 hover:text-white mb-2"
                >
                  About
                </Link>
              </div>
              <div>
                <Link
                  to="/contact"
                  className="block text-gray-300 hover:text-white mb-2"
                >
                  Contact
                </Link>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white mb-2"
                >
                  Privacy
                </a>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              Contact Us
            </h3>
            <div className="text-gray-300">
              <p className="mb-2">
                <span className="block text-sm">Email:</span>
                <a href="mailto:info@findr.com" className="hover:text-white">
                  info@findr.com
                </a>
              </p>
              <p className="mb-2">
                <span className="block text-sm">Phone:</span>
                <a href="tel:+15551234567" className="hover:text-white">
                  (555) 123-4567
                </a>
              </p>
              <p className="mb-2">
                <span className="block text-sm">Hours:</span>
                Mon-Fri: 9AM-5PM
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-2">
              Subscribe to our newsletter
            </h3>
            <p className="text-sm text-gray-300 mb-3">
              Get updates on new products and upcoming sales.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="bg-white rounded-md py-2 px-3 text-gray-900 placeholder-gray-500 min-w-0 flex-1"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="bg-slate-100 text-green-600 px-4 py-2 rounded-md border border-green-600 hover:bg-green-600 hover:text-white transition-all focus:ring-2 focus:ring-green-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-gray-700 text-sm text-gray-400">
          &copy; 2025 F.I.N.D.R. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
