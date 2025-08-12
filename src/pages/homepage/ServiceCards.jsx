import React from "react";
import {
  FaUsers,
  FaUserCheck,
  FaQuoteLeft,
  FaHandshake,
  FaSignInAlt,
  FaCalculator,
  FaTachometerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const ServiceCards = ({ user }) => {
  const cardDashs = user
    ? [
        {
          icon: <FaTachometerAlt size={32} className="text-white" />,
          hoverIcon: <FaUsers size={32} className="text-blue-500" />,
          title: "Ready to Participate",
          buttonText: "Go to Dashboard",
          link: user?.role === "admin" ? "/admin" : "/dashboard",
        },
        {
          icon: <FaQuoteLeft size={32} className="text-white" />,
          hoverIcon: <FaCalculator size={32} className="text-blue-500" />,
          title: "Get a Quote",
          buttonText: "Request Quote",
          link: "/contact",
        },
      ]
    : [];

  const cardData = [
    {
      icon: <FaUsers size={32} className="text-white" />,
      hoverIcon: <FaHandshake size={32} className="text-blue-500" />,
      title: "Ready to Participate",
      buttonText: "Join Our Panel",
      link: "/signup",
    },
    {
      icon: <FaUserCheck size={32} className="text-white" />,
      hoverIcon: <FaSignInAlt size={32} className="text-blue-500" />,
      title: "Already Registered",
      buttonText: "Login",
      link: "/login",
    },
    {
      icon: <FaQuoteLeft size={32} className="text-white" />,
      hoverIcon: <FaCalculator size={32} className="text-blue-500" />,
      title: "Get a Quote",
      buttonText: "Request Quote",
      link: "/contact",
    },
  ];

  const cardsToShow = !user ? cardData : cardDashs;

  return (
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10
        ${cardsToShow.length <= 2 ? "flex flex-wrap justify-center gap-6" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"}`}
    >
      {cardsToShow.map((card) => (
        <div
          key={card.title}
          className="group bg-white hover:bg-blue-500 rounded-xl shadow-xl p-6 sm:p-8 text-center
                     transition-all duration-500 ease-in-out cursor-pointer
                     hover:shadow-2xl hover:scale-105"
        >
          {/* Icon */}
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 group-hover:bg-white rounded-full 
                       flex items-center justify-center mx-auto mb-4 sm:mb-6 relative overflow-hidden
                       transition-all duration-500 ease-in-out shadow-lg"
          >
            <div
              className="absolute inset-0 flex items-center justify-center 
                         transition-all duration-500 ease-in-out 
                         group-hover:-translate-y-full group-hover:rotate-180 group-hover:scale-75"
            >
              {card.icon}
            </div>
            <div
              className="absolute inset-0 flex items-center justify-center 
                         transition-all duration-500 ease-in-out 
                         translate-y-full rotate-180 scale-75 
                         group-hover:translate-y-0 group-hover:rotate-0 group-hover:scale-100"
            >
              {card.hoverIcon}
            </div>
          </div>

          {/* Title */}
          <h3
            className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-800 group-hover:text-white
                       transition-all duration-500 ease-in-out group-hover:scale-110"
          >
            {card.title}
          </h3>

          {/* Button */}
          <Link to={card.link} className="block">
            <button
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-5 py-3 text-sm sm:text-base font-semibold 
                         transition-all duration-500 ease-in-out 
                         hover:scale-110 hover:-translate-y-2 hover:shadow-xl 
                         bg-blue-600 text-white group-hover:bg-white/95 group-hover:text-blue-600
                         shadow-md"
            >
              <span
                className="transition-all duration-400 ease-in-out group-hover:translate-x-1"
              >
                {card.buttonText}
              </span>
              <svg
                className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-400 ease-in-out 
                           group-hover:translate-x-1 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ServiceCards;
