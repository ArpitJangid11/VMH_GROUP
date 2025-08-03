import React from 'react';

const ImageSection = () => {
  return (
    <div className="relative w-full h-[100vh] overflow-hidden rounded-b-3xl shadow-2xl">
      {/* Background image with proper fit */}
      <img
        src="/images/homepage.png"
        alt="Homepage Banner"
        className="absolute top-0 left-0 w-full h-full object-cover animate-zoomSlow"
        style={{ 
          objectPosition: 'center center',
          objectFit: 'cover',
          minWidth: '100%',
          minHeight: '100%'
        }}
      />

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 mix-blend-color-burn opacity-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 animate-gradient-x" />

      {/* Overlays for text readability */}
      <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />

      {/* Spotlight effect behind text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] rounded-full bg-white/5 shadow-lg blur-3xl opacity-30" />
      </div>

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-6 text-center max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-wider leading-tight text-white drop-shadow-2xl mb-6 opacity-0 animate-fadeInUp animate-letterSpacing">
          Welcome Home
        </h1>
        <p className="text-2xl md:text-3xl font-light text-white drop-shadow-xl mb-4 opacity-0 animate-fadeInUp animate-delay-300">
          Modern design, stunning visuals, crafted for you.
        </p>
        <p className="text-md md:text-lg text-white opacity-70 mb-12 drop-shadow-lg">
          Discover seamless experiences and innovative solutions.
        </p>
        <button
          aria-label="Get started with our platform"
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 font-semibold rounded-lg shadow-neumorphism text-white opacity-0 animate-fadeInUp animate-delay-600 transition-colors focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-75"
        >
          Get Started
        </button>
      </div>

      {/* Advanced animations and styles */}
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
          animation: fadeInUp 1s forwards;
        }
        .animate-delay-300 {
          animation-delay: 0.3s;
        }
        .animate-delay-600 {
          animation-delay: 0.6s;
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
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradientX 8s ease infinite;
        }

        @keyframes zoomSlow {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .animate-zoomSlow {
          animation: zoomSlow 20s ease-in-out infinite;
        }

        @keyframes letterSpacing {
          0%, 100% {
            letter-spacing: 0.05em;
          }
          50% {
            letter-spacing: 0.25em;
          }
        }
        .animate-letterSpacing {
          animation: letterSpacing 6s ease-in-out infinite;
        }

        .shadow-neumorphism {
          box-shadow: 8px 8px 15px rgba(100, 100, 255, 0.2),
                      -8px -8px 15px rgba(150, 150, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default ImageSection;
