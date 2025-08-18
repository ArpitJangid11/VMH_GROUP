import React, { useEffect } from 'react';
import slide5 from "../../assets/HImages/Istockimage.png";
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";   // ✅ i18n hook

const AboutUs = () => {
  const { t } = useTranslation();   // ✅ use translations directly

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(50px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      
      @keyframes slideLeftRight {
        0% {
          transform: translateX(-100%);
          opacity: 0;
        }
        15% {
          opacity: 1;
        }
        85% {
          opacity: 1;
        }
        100% {
          transform: translateX(100%);
          opacity: 0;
        }
      }
      
      .animate-slide-in {
        animation: slideInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      }
      
      .about-content {
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
        top: 0;
        left: 0;
        width: 40%;
        height: 100%;
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

    const elements = document.querySelectorAll('.about-content');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-slide-in');
            }, index * 300);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    elements.forEach((element) => observer.observe(element));
    
    return () => {
      observer.disconnect();
      if (document.head.contains(styleSheet)) {
        document.head.removeChild(styleSheet);
      }
    };
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-blue-50/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Part 1: Image with Advanced Hover Effects */}
          <div className="about-content">
            <figure className="group relative rounded-2xl overflow-hidden shadow-lg border border-blue-600/20 transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) hover:-translate-y-4 hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/40 hover:border-blue-600/50">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <img
                src={slide5}
                alt="Person using laptop on grass with notebooks"
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-20"></div>
            </figure>
          </div>

          {/* Part 2: Title + Paragraph with Interactive Effects */}
          <div className="about-content text-left">
            <header className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-800 mb-4 transition-all duration-700 ease-out hover:scale-105 hover:text-blue-600">
                {t("aboutUsTitle")}
              </h2>
              
              <div className="mt-6 flex items-center group">
                <span className="h-[4px] w-16 rounded-full animated-underline group-hover:w-24 transition-all duration-500" />
              </div>
            </header>

            <div className="relative">
              <p className="text-slate-700 text-base lg:text-lg leading-8 transition-all duration-500 hover:text-slate-900 hover:scale-[1.02] hover:-translate-y-1 cursor-default">
                {t("aboutUsParagraph.part1")}{" "}
                <span className="font-semibold text-blue-600 hover:text-blue-700 hover:scale-105 transition-all duration-300 cursor-pointer inline-block hover:-translate-y-0.5 hover:shadow-lg hover:bg-blue-50 px-1 py-0.5 rounded">
                  {t("aboutUsParagraph.earnMore")}
                </span>{" "}
                {t("aboutUsParagraph.part2")}{" "}
                <span className="font-semibold text-blue-600 hover:text-blue-700 hover:scale-105 transition-all duration-300 cursor-pointer inline-block hover:-translate-y-0.5 hover:shadow-lg hover:bg-blue-50 px-1 py-0.5 rounded">
                  {t("aboutUsParagraph.earnMoney")}
                </span>.
              </p>
              
              {/* Decorative hover line */}
              <div className="absolute -left-4 top-0 w-1 h-0 bg-gradient-to-b from-blue-500 to-blue-600 transition-all duration-700 hover:h-full opacity-0 hover:opacity-100 rounded-full"></div>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <Link
                to="/about"
                className="group inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) hover:scale-110 hover:-translate-y-2 hover:shadow-xl bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-600/50"
              >
                <span className="transition-all duration-400 cubic-bezier(0.4, 0, 0.2, 1) group-hover:translate-x-1">
                  {t("learnMore")}
                </span>
                <svg className="ml-2 w-4 h-4 transition-all duration-400 cubic-bezier(0.4, 0, 0.2, 1) group-hover:translate-x-1 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;
