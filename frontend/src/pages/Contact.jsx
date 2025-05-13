import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { EMAILJS_KEY, ABSTRACT_API_KEY } from "../secrets/env.js";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    emailjs.init(EMAILJS_KEY); // EmailJS public key
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkEmailValidity = async (email) => {
    if (!/\S+@\S+\.\S+/.test(email)) return; // Skip if invalid format

    try {
      const response = await axios.get(
        `https://emailvalidation.abstractapi.com/v1/?api_key=${ABSTRACT_API_KEY}&email=${email}`
      );

      const { deliverability } = response.data;

      if (deliverability !== "DELIVERABLE") {
        setErrors((prev) => ({
          ...prev,
          email: "This email address does not appear to exist. Try again!",
        }));
      } else {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated.email;
          return updated;
        });
      }
    } catch (error) {
      console.error("Abstract API error:", error);
      setErrors((prev) => ({
        ...prev,
        email: "Could not validate email address. Try again later.",
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Real-time format validation
    if (name === "email") {
      if (!/\S+@\S+\.\S+/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email",
        }));
      } else {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated.email;
          return updated;
        });
      }
    }
  };

  const handleEmailBlur = async () => {
    if (formData.email && /\S+@\S+\.\S+/.test(formData.email)) {
      await checkEmailValidity(formData.email);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const templateParams = {
        to_email: "doshirachit28@gmail.com",
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || "New Contact Form Submission",
        message: formData.message,
      };

      await emailjs.send("service_xfoi2zf", "template_po0h9g7", templateParams);

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800">Contact Us</h2>
          <p className="mt-2 text-lg text-slate-600">
            We'd love to hear from you. Please fill out the form below.
          </p>
        </div>

        {submitStatus === "success" && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800">
              Thank you for your message! We'll get back to you soon.
            </p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800">
              Something went wrong. Please try again later.
            </p>
          </div>
        )}

        <form
          className="bg-white p-8 shadow-md rounded-xl space-y-6 border border-slate-200"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              name="name"
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-base py-3 px-4 ${
                errors.name ? "border-red-300" : "border-slate-300"
              }`}
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              onBlur={handleEmailBlur}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-base py-3 px-4 ${
                errors.email ? "border-red-300" : "border-slate-300"
              }`}
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-base py-3 px-4"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What is this regarding?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Message *
            </label>
            <textarea
              name="message"
              rows="5"
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-slate-500 focus:border-slate-500 sm:text-sm ${
                errors.message ? "border-red-300" : "border-slate-300"
              }`}
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message here..."
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
