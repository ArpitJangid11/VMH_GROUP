// File: src/components/AboutUs.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSmile, FaStar, FaThumbsUp, FaClock } from "react-icons/fa";
import { useTranslation } from "react-i18next"; // assuming react-i18next is set up

const AboutUs = ({ user }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: t("testimonials.quote1"),
      author: t("testimonials.author1"),
    },
    { quote: t("testimonials.quote2"), author: t("testimonials.author2") },
    { quote: t("testimonials.quote3"), author: t("testimonials.author3") },
    { quote: t("testimonials.quote4"), author: t("testimonials.author4") },
    { quote: t("testimonials.quote5"), author: t("testimonials.author5") },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes slideInUp { from { opacity: 0; transform: translateY(50px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
      @keyframes slideLeftRight { 0% { transform: translateX(-100%); opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { transform: translateX(100%); opacity: 0; } }
      @keyframes slideInRightToLeft { 0% { opacity: 0; transform: translateX(50px); } 100% { opacity: 1; transform: translateX(0); } }
      .animate-slide-in { animation: slideInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
      .animate-slide-in-testimonial { animation: slideInRightToLeft 0.7s ease forwards; }
      .about-card { opacity: 0; transform: translateY(50px) scale(0.95); }
      .animated-underline { position: relative; overflow: hidden; background: rgba(37, 99, 235, 0.2); }
      .animated-underline::before { content: ''; position: absolute; top: 0; left: 0; width: 40%; height: 100%; background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.8), rgba(37, 99, 235, 1), rgba(37, 99, 235, 0.8), transparent); animation: slideLeftRight 2.5s ease-in-out infinite; border-radius: inherit; }
    `;
    document.head.appendChild(styleSheet);

    const cards = document.querySelectorAll(".about-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-slide-in");
            }, index * 200);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
      if (document.head.contains(styleSheet)) document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Page Title */}
      <header className="text-center py-8 about-card">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-800 mb-4 transition-all duration-700 ease-out hover:scale-105 hover:text-blue-600">
          {t("aboutUs")}
        </h2>
        <div className="flex justify-center mt-4">
          <div className="h-1 w-28 rounded-full animated-underline" />
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <header className="text-center about-card mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-800 leading-tight">
            {t("aboutHeroTitle1")} <span className="text-blue-600">{t("aboutHeroTitle2")}</span>
          </h2>
          <div className="flex justify-center mt-5">
            <div className="h-1 w-24 rounded-full animated-underline" />
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Info */}
          <article className="about-card rounded-2xl border border-blue-600/20 bg-white p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-700">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-xl flex items-center justify-center">
                VMH
              </div>
            </div>
            <p className="text-slate-700 mb-4">{t("aboutUsParagraph.part1")}</p>
            <p className="text-slate-700">{t("aboutUsParagraph.earnMore")}{t("aboutUsParagraph.part2")}</p>
          </article>

          {/* Right Icons */}
          <aside className="about-card relative rounded-2xl border border-blue-600/20 bg-white p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-700">
            <div className="flex flex-col items-center space-y-10">
              <div className="relative">
                <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl">
                  <FaSmile />
                </div>
              </div>
              <div className="relative">
                <div className="w-36 h-8 bg-blue-500 rounded transform rotate-6" />
                <div className="w-36 h-8 bg-blue-600 rounded transform -rotate-3 -mt-2" />
                <div className="w-36 h-8 bg-blue-700 rounded -mt-2" />
              </div>
              <div className="relative">
                <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-6xl text-white">
                  <FaSmile />
                </div>
                <div className="absolute -top-4 -right-4 flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      <FaStar />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Testimonial Slider */}
      <section className="relative bg-gradient-to-r from-blue-100 to-blue-200/80">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <header className="text-center about-card mb-6">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-800">
              {t("testimonialTitle")}
            </h2>
            <div className="flex justify-center mt-4">
              <div className="h-1 w-20 rounded-full animated-underline" />
            </div>
          </header>

          <article key={currentIndex} className="about-card max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-lg text-center animate-slide-in-testimonial">
            <blockquote className="text-gray-800 text-lg leading-relaxed mb-4">
              “{testimonials[currentIndex].quote}”
            </blockquote>
            <footer>
              <p className="text-blue-600 font-semibold italic">— {testimonials[currentIndex].author}</p>
            </footer>
          </article>

          <div className="pointer-events-none" aria-hidden="true">
            <div className=" md:block absolute top-8 left-8 w-12 h-12 bg-blue-300 rounded-full opacity-30 flex items-center justify-center text-white">
              <FaThumbsUp />
            </div>
            <div className=" md:block absolute bottom-8 right-24 w-12 h-12 bg-blue-200 rounded-full opacity-30 flex items-center justify-center text-white">
              <FaClock />
            </div>
            <div className=" md:block absolute top-24 right-12 w-12 h-12 bg-blue-400 rounded-full opacity-30 flex items-center justify-center text-white">
              <FaSmile />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <div className="about-card flex flex-col lg:flex-row items-center justify-between rounded-2xl border border-blue-600/20 bg-white p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-700">
            <div className="flex items-center space-x-6 mb-6 lg:mb-0">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-3xl">
                <FaThumbsUp />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-1">{t("cta.heading")}</h3>
                <p className="text-slate-600">{t("cta.text")}</p>
              </div>
            </div>
            <Link to={!user ? "/signup" : user.role === "admin" ? "/admin" : "/dashboard"}>
              <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-200">
                {!user ? t("cta.buttonJoin") : t("cta.buttonDashboard")}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
