import React from "react";
import { FaUsers, FaUserCheck, FaQuoteLeft, FaHandshake, FaSignInAlt, FaCalculator } from "react-icons/fa";
import { Link } from "react-router-dom";

const ServiceCards = () => {
  const cardData = [
    {
      icon: <FaUsers size={32} className="text-white" />,
      hoverIcon: <FaHandshake size={32} className="text-blue-500" />,
      title: "Ready to Participate",
      buttonText: "Join Our Panel",
      link: "/signup"
    },
    {
      icon: <FaUserCheck size={32} className="text-white" />,
      hoverIcon: <FaSignInAlt size={32} className="text-blue-500" />,
      title: "Already Registered",
      buttonText: "Login",
      link :"/login"
    },
    {
      icon: <FaQuoteLeft size={32} className="text-white" />,
      hoverIcon: <FaCalculator size={32} className="text-blue-500" />,
      title: "Get a Quote",
      buttonText: "Request Quote",
      link: "/quote"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 py-12">
      {cardData.map((card) => (
        <div
          key={card.title}
          className="group bg-white hover:bg-blue-500 rounded-xl shadow-xl p-8 text-center 
                     transition-all duration-500 ease-in-out cursor-pointer
                     hover:shadow-2xl hover:scale-105"
        >
          {/* Icon container */}
          <div className="w-16 h-16 bg-blue-600 group-hover:bg-white rounded-full 
                          flex items-center justify-center mx-auto mb-6 relative overflow-hidden
                          transition-all duration-500 ease-in-out shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center 
                           transition-all duration-500 ease-in-out 
                           group-hover:-translate-y-full group-hover:rotate-180 group-hover:scale-75">
              {card.icon}
            </div>
            <div className="absolute inset-0 flex items-center justify-center 
                           transition-all duration-500 ease-in-out 
                           translate-y-full rotate-180 scale-75 
                           group-hover:translate-y-0 group-hover:rotate-0 group-hover:scale-100">
              {card.hoverIcon}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold mb-6 text-gray-800 group-hover:text-white
                        transition-all duration-500 ease-in-out group-hover:scale-110">
            {card.title}
          </h3>

          {/* Button */}
          <Link to={card.link}>
            <button className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold 
                              transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) 
                              hover:scale-110 hover:-translate-y-2 hover:shadow-xl 
                              bg-blue-600 text-white group-hover:bg-white/95 group-hover:text-blue-600
                              shadow-md">
              <span className="transition-all duration-400 cubic-bezier(0.4, 0, 0.2, 1) group-hover:translate-x-1">
                {card.buttonText}
              </span>
              <svg className="ml-2 w-4 h-4 transition-all duration-400 cubic-bezier(0.4, 0, 0.2, 1) 
                            group-hover:translate-x-1 group-hover:scale-110" 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ServiceCards;
