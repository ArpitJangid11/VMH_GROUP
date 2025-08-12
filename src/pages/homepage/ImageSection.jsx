import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { slide1, slide2, slide3, slide4, slide5 } from "../../assets/HImages/HeroImages";

const slides = [
  { image: slide1, title: "First Slide", description: "Beautiful background with smooth transitions." },
  { image: slide2, title: "Second Slide", description: "Custom Tailwind animations without Framer Motion." },
  { image: slide3, title: "Third Slide", description: "React Icons for navigation arrows." },
  { image: slide4, title: "Fourth Slide", description: "React Icons for navigation arrows." },
  { image: slide5, title: "Fifth Slide", description: "React Icons for navigation arrows." },
];

export default function TailwindSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const nextSlide = () => setCurrent(prev => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent(prev => prev === 0 ? slides.length - 1 : prev - 1);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(nextSlide, 4000);
    return () => clearInterval(timerRef.current);
  }, [current]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900 group">
      {/* Slides with Hover Effects */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 hover:from-black/40 hover:to-black/20 transition-all duration-500" />
          </div>

          <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center p-4">
            <h2 className="text-2xl sm:text-4xl font-bold mb-4 transition-all duration-300 hover:scale-105 hover:text-yellow-300 cursor-default">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-lg max-w-xl transition-all duration-300 hover:scale-102 hover:text-gray-200 cursor-default">
              {slide.description}
            </p>
          </div>
        </div>
      ))}

      {/* Left Navigation Button with Enhanced Hover Effects */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 z-30 
                   bg-black/40 hover:bg-white/20 backdrop-blur-sm
                   p-2 sm:p-3 rounded-full text-white 
                   transition-all duration-300 
                   hover:scale-110 hover:shadow-lg
                   opacity-70 hover:opacity-100
                   group-hover:translate-x-1"
      >
        <FaChevronLeft 
          size={16} 
          className="sm:w-6 sm:h-6 transition-transform duration-300 hover:scale-110" 
        />
      </button>
      
      {/* Right Navigation Button with Enhanced Hover Effects */}
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 z-30 
                   bg-black/40 hover:bg-white/20 backdrop-blur-sm
                   p-2 sm:p-3 rounded-full text-white 
                   transition-all duration-300 
                   hover:scale-110 hover:shadow-lg
                   opacity-70 hover:opacity-100
                   group-hover:-translate-x-1"
      >
        <FaChevronRight 
          size={16} 
          className="sm:w-6 sm:h-6 transition-transform duration-300 hover:scale-110" 
        />
      </button>

      {/* Dots Navigation with Hover Effects */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full px-4 py-3 transition-all duration-300">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`relative transition-all duration-300 
                         hover:scale-125 hover:-translate-y-1 
                         active:scale-95 group/dot ${
                idx === current 
                  ? "w-8 h-2 bg-white rounded-full shadow-lg" 
                  : "w-3 h-3 bg-gray-400 rounded-full hover:bg-white hover:w-4"
              }`}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-white/30 rounded-full scale-0 group-hover/dot:scale-150 transition-transform duration-300 -z-10" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
