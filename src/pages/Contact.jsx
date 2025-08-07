import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
} from "react-icons/fa";

export default function ContactUs() {
  // State for form fields
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // Handle changes in any input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add validation, API calls here
    alert(
      `Thank you, ${form.name}! Your message has been submitted.\n\n(You can replace this alert with your actual submit logic.)`
    );
    // Reset form
    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-white mt-10 flex flex-col items-center justify-start py-12 md:py-20">
      <h2 className="text-center text-3xl font-bold text-blue-600 mb-10 mt-2">
        Contact VMH Market Research
      </h2>
      <div className="flex flex-col md:flex-row gap-8 md:gap-10 justify-center items-start">
        {/* Left Card */}
        <div className="w-full md:w-[390px] bg-blue-50 rounded-2xl shadow-md px-8 py-7
                        transition-transform duration-300 hover:shadow-xl hover:-translate-y-2 group">
          {/* ... (Left card code stays the same as before) ... */}
          <h3 className="flex items-center text-blue-600 text-lg font-semibold mb-6">
            <FaPaperPlane className="mr-2" />
            Get in Touch
          </h3>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start transition-colors duration-200 group-hover:text-blue-700">
              <FaMapMarkerAlt className="mt-1 text-blue-600 mr-3" />
              <div>
                <span className="font-bold">Office:</span> Jaipur, Rajasthan, India
              </div>
            </li>
            <li className="flex items-center transition-colors duration-200 group-hover:text-blue-700">
              <FaPhoneAlt className="text-blue-600 mr-3" />
              <div>
                <span className="font-bold">Phone:</span> +91 98765 43210
              </div>
            </li>
            <li className="flex items-center transition-colors duration-200 group-hover:text-blue-700">
              <FaEnvelope className="text-blue-600 mr-3" />
              <div>
                <span className="font-bold">Email:</span> support@vmhgroup.com
              </div>
            </li>
            <li className="flex items-center transition-colors duration-200 group-hover:text-blue-700">
              <FaClock className="text-blue-600 mr-3" />
              <div>
                <span className="font-bold">Hours:</span> Mon - Sat: 9:00 AM - 6:00 PM
              </div>
            </li>
          </ul>
          <hr className="my-4 text-blue-600" />
          <p className="text-center text-gray-700 my-8">Follow Us</p>
          <div className="flex justify-center gap-8 px-3 text-gray-700 text-2xl mt-1 mb-30">
            <a href="#" aria-label="Facebook"
              className="hover:text-blue-700 transform transition-transform duration-200 hover:scale-150 active:scale-110"
            >
              <FaFacebook />
            </a>
            <a href="#" aria-label="Instagram"
              className="hover:text-pink-600 transform transition-transform duration-200 hover:scale-150 active:scale-110"
            >
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn"
              className="hover:text-blue-900 transform transition-transform duration-200 hover:scale-150 active:scale-110"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
        {/* Right Card */}
        <div className="w-full md:w-[390px] bg-white rounded-2xl shadow-md px-8 py-7
                        transition-transform duration-300 hover:shadow-xl hover:-translate-y-2">
          <h3 className="flex items-center text-blue-600 text-lg font-semibold mb-6">
            <FaPaperPlane className="mr-2" />
            Send a Message
          </h3>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 transition-shadow focus:shadow-lg duration-200"
              type="text"
              name="name"
              placeholder="Your Name *"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 transition-shadow focus:shadow-lg duration-200"
              type="email"
              name="email"
              placeholder="Your Email *"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 transition-shadow focus:shadow-lg duration-200"
              type="text"
              name="phone"
              placeholder="Your Phone *"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <input
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 transition-shadow focus:shadow-lg duration-200"
              type="text"
              name="subject"
              placeholder="Subject (Optional)"
              value={form.subject}
              onChange={handleChange}
            />
            <textarea
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 resize-none transition-shadow focus:shadow-lg duration-200"
              rows={4}
              name="message"
              placeholder="Your Message *"
              value={form.message}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 py-3 w-full rounded-md font-semibold text-white 
                bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-600 hover:to-blue-700 
                transform transition-transform duration-150 hover:scale-105
                shadow-sm hover:shadow-lg"
            >
              <FaPaperPlane /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
