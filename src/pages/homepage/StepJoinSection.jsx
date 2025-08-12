// src/components/StepJoinSection.jsx
import React, { useEffect } from 'react';
import { 
  TbUserPlus, 
  TbShieldCheck, 
  TbClipboardList, 
  TbGift 
} from "react-icons/tb";

const steps = [
  {
    title: "REGISTER",
    text: "Register with your active email id and contact number",
    Icon: TbUserPlus,
    align: "left",
  },
  {
    title: "VERIFY",
    text: "Check your mail and Phone and click on verification links to complete your registration",
    Icon: TbShieldCheck,
    align: "right",
  },
  {
    title: "ACCESS SURVEYS",
    text: "After activating your account participate in available surveys and start sharing your ideas",
    Icon: TbClipboardList,
    align: "left",
  },
  {
    title: "GET REWARDED",
    text: "Achieve your threshold to claim the rewards via paypal",
    Icon: TbGift,
    align: "right",
  },
];

const StepJoinSection = () => {
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
      
      .step-content {
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
      
      .step-row {
        cursor: pointer;
        padding: 8px;
        margin: -8px;
        border-radius: 12px;
        transition: all 0.3s ease;
      }
      
      .step-row:hover {
        background: rgba(59, 130, 246, 0.03);
      }
      
      .icon-rotate {
        transition: transform 0.3s ease;
        transform: rotate(0deg);
      }
      
      .step-title {
        transition: color 0.3s ease;
        color: rgb(30, 41, 59);
      }
    `;
    document.head.appendChild(styleSheet);

    const handleRowInteraction = () => {
      const stepRows = document.querySelectorAll('.step-row');
      
      stepRows.forEach(row => {
        const icon = row.querySelector('.icon-rotate');
        const title = row.querySelector('.step-title');
        
        if (icon && title) {
          const handleMouseEnter = () => {
            icon.style.transform = 'rotate(360deg)';
            icon.style.transition = 'transform 0.8s ease-in-out';
            title.style.color = 'rgb(37, 99, 235)';
            title.style.transition = 'color 0.3s ease';
          };
          
          const handleMouseLeave = () => {
            icon.style.transform = 'rotate(0deg)';
            icon.style.transition = 'transform 0.4s ease-in-out';
            title.style.color = 'rgb(30, 41, 59)';
            title.style.transition = 'color 0.3s ease';
          };
          
          row.removeEventListener('mouseenter', handleMouseEnter);
          row.removeEventListener('mouseleave', handleMouseLeave);
          row.addEventListener('mouseenter', handleMouseEnter);
          row.addEventListener('mouseleave', handleMouseLeave);
          
          row._mouseEnterHandler = handleMouseEnter;
          row._mouseLeaveHandler = handleMouseLeave;
        }
      });
    };

    const initTimeout = setTimeout(handleRowInteraction, 100);

    const elements = document.querySelectorAll('.step-content');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-slide-in');
              if (index === entries.length - 1) {
                setTimeout(handleRowInteraction, 200);
              }
            }, index * 300);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    elements.forEach((element) => observer.observe(element));
    
    return () => {
      clearTimeout(initTimeout);
      observer.disconnect();
      
      const stepRows = document.querySelectorAll('.step-row');
      stepRows.forEach(row => {
        if (row._mouseEnterHandler && row._mouseLeaveHandler) {
          row.removeEventListener('mouseenter', row._mouseEnterHandler);
          row.removeEventListener('mouseleave', row._mouseLeaveHandler);
          delete row._mouseEnterHandler;
          delete row._mouseLeaveHandler;
        }
      });
      
      if (document.head.contains(styleSheet)) {
        document.head.removeChild(styleSheet);
      }
    };
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-blue-50/20">
      <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="step-content text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-800 mb-4 transition-all duration-700 ease-out hover:scale-105 hover:text-blue-600">
            STEPS TO BE A COMMUNITY MEMBER
          </h2>
          
          <div className="flex justify-center mb-6 group">
            <span className="h-[4px] w-16 sm:w-20 rounded-full animated-underline group-hover:w-24 sm:group-hover:w-32 transition-all duration-500" />
          </div>

          <p className="text-slate-700 text-sm sm:text-base lg:text-lg leading-6 sm:leading-8 max-w-3xl lg:max-w-5xl mx-auto hover:text-slate-900 hover:scale-[1.02] cursor-default px-4 transition-all duration-300">
            MyFrequentRewards research panel community provides a very simple and easy way to engage you as our new community member. Follow these complete steps to join our global community and start earning rewards with free registration.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden lg:block h-full w-1 -translate-x-1/2 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-400 rounded-full"></div>

          <ol className="space-y-12 sm:space-y-16 lg:space-y-20">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className={`step-content step-row grid grid-cols-1 lg:grid-cols-2 items-center gap-8 sm:gap-10 lg:gap-12 ${
                  step.align === "left" ? "" : "lg:[&>*:first-child]:order-2"
                }`}
              >
                <div
                  className={`text-center lg:text-left ${
                    step.align === "left"
                      ? "lg:pr-16 xl:pr-24 lg:text-right"
                      : "lg:pl-16 xl:pl-24 lg:text-left"
                  }`}
                >
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 inline-block hover:scale-110 hover:bg-blue-700 transition-all duration-300">
                    STEP {index + 1}
                  </span>
                  
                  <h3 className="step-title text-base sm:text-lg font-bold tracking-wider mb-3 sm:mb-4">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 max-w-sm mx-auto lg:mx-0 hover:text-slate-800 px-2 lg:px-0 transition-all duration-300">
                    {step.text}
                  </p>
                </div>

                <div className="relative flex justify-center lg:block">
                  <div 
                    className={`absolute top-1/2 hidden lg:block h-1 w-16 xl:w-24 -translate-y-1/2 bg-gradient-to-r from-blue-300 to-blue-400 rounded ${
                      step.align === "left" ? "-right-16 xl:-right-24" : "-left-16 xl:-left-24"
                    }`}
                  />
                  
                  <div className="relative z-10 mx-auto grid h-20 w-20 sm:h-24 sm:w-24 place-items-center rounded-full bg-white shadow-xl border-4 border-blue-200 hover:scale-110 hover:shadow-2xl hover:border-blue-600/50 cursor-pointer transition-all duration-300">
                    <step.Icon className="icon-rotate text-3xl sm:text-4xl text-blue-500" />
                    <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 h-6 w-6 sm:h-8 sm:w-8 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="step-content text-center mt-16 sm:mt-20">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mx-auto max-w-sm sm:max-w-md border-2 border-blue-100 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-3 sm:mb-4">
                Ready to Join?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-4 sm:mb-6 leading-relaxed">
                Start your journey with us today and begin earning rewards immediately after verification.
              </p>
              <button
                type="button"
                className="group inline-flex items-center justify-center rounded-full px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 w-full sm:w-auto transition-all duration-300"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  JOIN US NOW
                </span>
                <svg className="ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <p className="text-xs text-slate-500 mt-3 sm:mt-4">
                100% Free Registration • Instant Access
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepJoinSection;
