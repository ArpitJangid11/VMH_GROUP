import React from "react";

const ImageSection = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden rounded-b-2xl shadow-1xl">
      {/* Background image */}
      <img
        src="/images/homepage.png"
        alt="Homepage Banner"
        className="
          absolute inset-0 w-full h-full p-3
          object-contain lg:object-cover object-center
          animate-zoomSlow
        "
      />


      {/* Gradient overlays */}
      <div className="absolute inset-0 object-contain bg-black/4 lg:bg-black/20 mix-blend-multiply" />
      <div className="absolute inset-0 object-contain bg-gradient-to-t from-black/10 via-transparent to-black/20" />

      {/* Spotlight effect */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-10 sm:w-48 sm:h-48 lg:w-72 lg:h-72 rounded-full bg-white/5 shadow-lg blur-2xl opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 md:px-8">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-wide text-white drop-shadow-2xl mb-4 animate-fadeInUp">
          Welcome Home
        </h1>

        <p className="text-sm sm:text-lg md:text-xl font-light text-white drop-shadow-xl max-w-sm sm:max-w-xl mb-4 animate-fadeInUp delay-150">
          Modern design, stunning visuals, crafted for you.
        </p>

        <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-xs sm:max-w-md mb-6 animate-fadeInUp delay-300">
          Discover seamless experiences and innovative solutions.
        </p>

        <button
          aria-label="Get started with our platform"
          className="px-4 py-2 sm:px-6 sm:py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm sm:text-base font-semibold text-white shadow-neumorphism focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-75 animate-fadeInUp delay-500"
        >
          Get Started
        </button>
      </div>

      {/* Animations & effects */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }
        .delay-150 {
          animation-delay: 0.15s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }

        @keyframes gradientX {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradientX {
          background-size: 200% 200%;
          animation: gradientX 8s ease infinite;
        }

        @keyframes zoomSlow {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }
        .animate-zoomSlow {
          animation: zoomSlow 18s ease-in-out infinite;
        }

        .shadow-neumorphism {
          box-shadow: 6px 6px 12px rgba(98, 98, 255, 0.25),
            -6px -6px 12px rgba(160, 160, 255, 0.4);
        }
      `}</style>
    </div>
  );
};

export default ImageSection;
