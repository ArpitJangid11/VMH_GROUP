// File: src/components/WhyChooseUs.jsx
import React, { useEffect, useRef } from "react";
import { 
  FaShieldAlt, 
  FaDollarSign, 
  FaLock, 
  FaExchangeAlt,
  FaComments,
  FaUser 
} from 'react-icons/fa';
import {
  HiOutlineShieldCheck,
  HiOutlineBanknotes,
  HiOutlineLockClosed,
  HiOutlineArrowPath,
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserCircle
} from 'react-icons/hi2';
import { useTranslation } from "react-i18next";

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  const features = [
    {
      title: t("why.features.freeMembership.title"),
      description: t("why.features.freeMembership.description"),
      icon: <HiOutlineShieldCheck size={24} className="text-blue-600" />,
      hoverIcon: <FaShieldAlt size={24} className="text-blue-600" />,
    },
    {
      title: t("why.features.highEarning.title"),
      description: t("why.features.highEarning.description"),
      icon: <HiOutlineBanknotes size={24} className="text-blue-600" />,
      hoverIcon: <FaDollarSign size={24} className="text-blue-600" />,
    },
    {
      title: t("why.features.secureConfidential.title"),
      description: t("why.features.secureConfidential.description"),
      icon: <HiOutlineLockClosed size={24} className="text-blue-600" />,
      hoverIcon: <FaLock size={24} className="text-blue-600" />,
    },
    {
      title: t("why.features.quickTransfer.title"),
      description: t("why.features.quickTransfer.description"),
      icon: <HiOutlineArrowPath size={24} className="text-blue-600" />,
      hoverIcon: <FaExchangeAlt size={24} className="text-blue-600" />,
    },
    {
      title: t("why.features.anytimeAnywhere.title"),
      description: t("why.features.anytimeAnywhere.description"),
      icon: <HiOutlineChatBubbleLeftRight size={24} className="text-blue-600" />,
      hoverIcon: <FaComments size={24} className="text-blue-600" />,
    },
    {
      title: t("why.features.profileUpdate.title"),
      description: t("why.features.profileUpdate.description"),
      icon: <HiOutlineUserCircle size={24} className="text-blue-600" />,
      hoverIcon: <FaUser size={24} className="text-blue-600" />,
    },
  ];

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
      
      .feature-card {
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

    const cards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-slide-in');
            }, index * 200);
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

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-b from-slate-50 to-blue-50/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <header className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-800 mb-4 transition-all duration-700 ease-out hover:scale-105 hover:text-blue-600">
            {t("why.title")} {/* e.g., WHY CHOOSE US */}
          </h2>
          <div className="flex justify-center mb-4">
            <div className="h-1 w-20 rounded-full animated-underline">
            </div>
          </div>
          <p className="text-slate-500 max-w-2xl mx-auto transition-all duration-500 ease-out hover:text-slate-600 hover:scale-105">
            {t("why.subtitle")}
          </p>
        </header>

        <div className="grid gap-6 sm:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <article
              key={idx}
              className="group feature-card relative rounded-2xl border cursor-pointer transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) hover:-translate-y-6 hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/40 bg-white text-slate-700 border-blue-600/30 hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 hover:text-white hover:border-transparent"
            >
              <div className="p-6 sm:p-7 lg:p-8 flex flex-col h-full relative">
                <div className="flex items-center justify-center w-16 h-16 rounded-xl mb-6 relative transition-all duration-600 cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-110 group-hover:-translate-y-3 bg-blue-600/20 group-hover:bg-white/95 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center transition-all duration-800 cubic-bezier(0.25, 0.46, 0.45, 0.94) group-hover:-translate-y-full group-hover:scale-75">
                    {feature.icon}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center transition-all duration-800 cubic-bezier(0.25, 0.46, 0.45, 0.94) translate-y-full scale-75 group-hover:translate-y-0 group-hover:scale-100">
                    {React.cloneElement(feature.hoverIcon, { 
                      className: "text-blue-600" 
                    })}
                  </div>
                </div>

                <h3 className="text-xl font-semibold tracking-tight mb-3 transition-all duration-600 cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-105 group-hover:-translate-y-1 text-slate-800 group-hover:text-white">
                  {feature.title}
                </h3>

                <p className="text-sm leading-6 flex-grow transition-all duration-600 cubic-bezier(0.4, 0, 0.2, 1) group-hover:-translate-y-1 group-hover:scale-105 text-slate-600 group-hover:text-blue-50/95">
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
