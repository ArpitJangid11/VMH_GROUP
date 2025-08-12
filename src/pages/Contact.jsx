// File: src/components/ContactUs.jsx
import React, { useState, useEffect, useRef } from "react";
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
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const sectionRef = useRef(null);

  useEffect(() => {
    // Inject animation styles
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes slideInUp {
        from { opacity: 0; transform: translateY(50px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes slideLeftRight {
        0% { transform: translateX(-100%); opacity: 0; }
        15% { opacity: 1; }
        85% { opacity: 1; }
        100% { transform: translateX(100%); opacity: 0; }
      }
      .animate-slide-in {
        animation: slideInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      }
      .contact-card {
        opacity: 0;
        transform: translateY(50px) scale(0.95);
      }
      .animated-underline {
        position: relative;
        overflow: hidden;
        background: rgba(37, 99, 235, 0.2);
      }
      .animated-underline::before {
        content: '';
        position: absolute;
        inset: 0;
        width: 40%;
        background: linear-gradient(90deg,
          transparent,
          rgba(37, 99, 235, 0.8),
          rgba(37, 99, 235, 1),
          rgba(37, 99, 235, 0.8),
          transparent
        );
        animation: slideLeftRight 2.5s ease-in-out infinite;
        border-radius: inherit;
      }
    `;
    document.head.appendChild(styleSheet);

    // Scroll reveal
    const cards = document.querySelectorAll(".contact-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-slide-in");
            }, idx * 200);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
      if (document.head.contains(styleSheet)) {
        document.head.removeChild(styleSheet);
      }
    };
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${form.name}! Your message has been submitted.`);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-slate-50 to-blue-50/20"
    >
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
        {/* ===== HEADER ===== */}
        <header className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-800 mb-4 hover:scale-105 hover:text-blue-600 transition-all duration-700 ease-out">
            CONTACT VMH MARKET RESEARCH
          </h2>
          <div className="flex justify-center mb-4">
            <div className="h-1 w-20 rounded-full animated-underline"></div>
          </div>
          <p className="text-slate-500 max-w-2xl mx-auto transition-all duration-500 ease-out hover:text-slate-600 hover:scale-105">
            We’d love to hear from you — send us a message or connect directly.
          </p>
        </header>

        {/* ===== CARDS CONTAINER ===== */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 justify-center items-stretch">
          {/* ===== LEFT CARD ===== */}
          <div className="contact-card flex flex-col w-full sm:max-w-sm md:w-[390px] bg-blue-50 rounded-2xl border border-blue-600/30 px-6 sm:px-8 py-6 sm:py-7 cursor-pointer transition-all duration-700 cubic-bezier(0.4,0,0.2,1) hover:-translate-y-6 hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/40">
            <h3 className="flex items-center text-blue-600 text-base sm:text-lg font-semibold mb-4 sm:mb-6">
              <FaPaperPlane className="mr-2 flex-shrink-0" /> Get in Touch
            </h3>
            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-slate-700 text-sm sm:text-base">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 text-blue-600 mr-3 flex-shrink-0" />
                <span>
                  <strong>Office:</strong> Jaipur, Rajasthan, India
                </span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="text-blue-600 mr-3 flex-shrink-0" />
                <span>
                  <strong>Phone:</strong> +91 98765 43210
                </span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-blue-600 mr-3 flex-shrink-0" />
                <a
                  href="mailto:support@vmhgroup.com"
                  className="hover:text-blue-700 break-all"
                >
                  <strong>Email:</strong> support@vmhgroup.com
                </a>
              </li>
              <li className="flex items-center">
                <FaClock className="text-blue-600 mr-3 flex-shrink-0" />
                <span>
                  <strong>Hours:</strong> Mon - Sat: 9:00 AM - 6:00 PM
                </span>
              </li>
            </ul>
            <hr className="my-4 text-blue-600" />
            <p className="text-center text-gray-700 my-4 sm:my-8 text-sm sm:text-base">
              Follow Us
            </p>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-gray-700 text-xl sm:text-2xl pb-4">
              <a
                href="#"
                className="hover:text-blue-700 transform transition-transform duration-200 hover:scale-125"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="hover:text-pink-600 transform transition-transform duration-200 hover:scale-125"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="hover:text-blue-900 transform transition-transform duration-200 hover:scale-125"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* ===== RIGHT CARD ===== */}
          <div className="contact-card flex flex-col w-full sm:max-w-sm md:w-[390px] bg-white rounded-2xl border border-blue-600/30 px-6 sm:px-8 py-6 sm:py-7 cursor-pointer transition-all duration-700 cubic-bezier(0.4,0,0.2,1) hover:-translate-y-6 hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/40">
            <h3 className="flex items-center text-blue-600 text-base sm:text-lg font-semibold mb-4 sm:mb-6">
              <FaPaperPlane className="mr-2 flex-shrink-0" /> Send a Message
            </h3>
            <form
              className="flex flex-col space-y-3 sm:space-y-4 flex-grow"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={form.name}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-3 sm:px-4 py-2 focus:outline-none focus:border-blue-500 transition-shadow focus:shadow-lg duration-200 text-sm sm:text-base"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email *"
                value={form.email}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-3 sm:px-4 py-2 focus:outline-none focus:border-blue-500 transition-shadow focus:shadow-lg duration-200 text-sm sm:text-base"
              />

              <input
                type="text"
                name="phone"
                placeholder="Your Phone *"
                value={form.phone}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-3 sm:px-4 py-2 focus:outline-none focus:border-blue-500 transition-shadow focus:shadow-lg duration-200 text-sm sm:text-base"
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject (Optional)"
                value={form.subject}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 sm:px-4 py-2 focus:outline-none focus:border-blue-500 text-sm sm:text-base"
              />

              <textarea
                name="message"
                placeholder="Your Message *"
                rows={4}
                value={form.message}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-3 sm:px-4 py-2 resize-none focus:outline-none focus:border-blue-500 transition-shadow focus:shadow-lg duration-200 text-sm sm:text-base"
              />

              <button
                type="submit"
                className="mt-auto flex items-center justify-center gap-2 py-2 sm:py-3 w-full rounded-md font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 shadow-sm hover:shadow-lg text-sm sm:text-base"
              >
                <FaPaperPlane /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
