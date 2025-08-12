// File: src/components/HowItWorks.jsx
// Reverted to previous animated underline version

import React, { useEffect, useRef } from "react";
import {
  HiOutlineCheckBadge,
  HiOutlineClipboardDocumentList,
  HiOutlineClipboardDocumentCheck,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import {
  FaUserPlus,
  FaClipboardList,
  FaClipboardCheck,
  FaChartLine,
} from 'react-icons/fa';
import { Link } from "react-router-dom";

const steps = [
  {
    title: 'Register Online',
    description: 'Join our research community with lifetime free membership. Create your account in a few quick steps and verify your email.',
    cta: 'Read More',
    icon: <HiOutlineCheckBadge size={24} className="text-blue-600" />,
    hoverIcon: <FaUserPlus size={24} className="text-blue-600" />,
  },
  {
    title: 'Profiler Survey',
    description: 'Complete your profile survey as soon as you login. This helps us match you with the most relevant surveys and rewards.',
    cta: 'Read More',
    icon: <HiOutlineClipboardDocumentList size={24} className="text-blue-600" />,
    hoverIcon: <FaClipboardList size={24} className="text-blue-600" />,
  },
  {
    title: 'Daily Surveys',
    description: 'After finishing your profiling, receive a wide range of daily surveys tailored to your interests and demographics.',
    cta: 'Read More',
    icon: <HiOutlineClipboardDocumentCheck size={24} className="text-blue-600" />,
    hoverIcon: <FaClipboardCheck size={24} className="text-blue-600" />,
  },
  {
    title: 'How You Grow',
    description: 'The more you participate, the higher your rank and the better your survey eligibility, rewards, and bonuses.',
    cta: 'Read More',
    icon: <HiOutlineChartBar size={24} className="text-blue-600" />,
    hoverIcon: <FaChartLine size={24} className="text-blue-600" />,
  },
];

const HowItWorks = () => {
  const sectionRef = useRef(null);

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
      
      .step-card {
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

    const cards = document.querySelectorAll('.step-card');
    
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
            HOW IT WORKS
          </h2>
          <div className="flex justify-center mb-4">
            <div className="h-1 w-20 rounded-full animated-underline">
            </div>
          </div>
          <p className="text-slate-500 max-w-2xl mx-auto transition-all duration-500 ease-out hover:text-slate-600 hover:scale-105">
            Register free and activate your account with a valid email in seconds.
          </p>
        </header>

        <div className="grid gap-6 sm:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <article
              key={idx}
              className="group step-card relative rounded-2xl border cursor-pointer transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) hover:-translate-y-6 hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/40 bg-white text-slate-700 border-blue-600/30 hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 hover:text-white hover:border-transparent"
            >
              <div className="p-6 sm:p-7 lg:p-8 flex flex-col h-full relative">
                <div className="flex items-center justify-center w-16 h-16 rounded-xl mb-6 relative transition-all duration-600 cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-110 group-hover:-translate-y-3 bg-blue-600/20 group-hover:bg-white/95 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center transition-all duration-800 cubic-bezier(0.25, 0.46, 0.45, 0.94) group-hover:-translate-y-full group-hover:scale-75">
                    {step.icon}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center transition-all duration-800 cubic-bezier(0.25, 0.46, 0.45, 0.94) translate-y-full scale-75 group-hover:translate-y-0 group-hover:scale-100">
                    {React.cloneElement(step.hoverIcon, { 
                      className: "text-blue-600" 
                    })}
                  </div>
                </div>

                <h3 className="text-xl font-semibold tracking-tight mb-3 transition-all duration-600 cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-105 group-hover:-translate-y-1 text-slate-800 group-hover:text-white">
                  {step.title}
                </h3>

                <p className="text-sm leading-6 flex-grow mb-6 transition-all duration-600 cubic-bezier(0.4, 0, 0.2, 1) group-hover:-translate-y-1 group-hover:scale-105 text-slate-600 group-hover:text-blue-50/95">
                  {step.description}
                </p>
              <Link to="/How-it-works">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) hover:scale-110 hover:-translate-y-2 hover:shadow-xl bg-blue-600 text-white group-hover:bg-white/95 group-hover:text-blue-600"
                  >
                    <span className="transition-all duration-400 cubic-bezier(0.4, 0, 0.2, 1) group-hover:translate-x-1">
                      {step.cta}
                    </span>
                    <svg className="ml-2 w-4 h-4 transition-all duration-400 cubic-bezier(0.4, 0, 0.2, 1) group-hover:translate-x-1 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
              </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
