// File: src/components/HowItWorks.jsx
import React, { useEffect, useRef } from "react";
import { 
  FiUserPlus, 
  FiClipboard, 
  FiCalendar, 
  FiTrendingUp 
} from 'react-icons/fi';
import {
  HiOutlineCheckBadge,
  HiOutlineClipboardDocumentList,
  HiOutlineClipboardDocumentCheck,
  HiOutlineChartBar,
} from 'react-icons/hi2';

const steps = [
  {
    title: 'REGISTER ONLINE',
    description: 'We have a lifetime free membership to join our research community, we have a very simple and quick way to join, you just need to register with your active email id and in a single click you become our community member. Once you make registration you are able to get free bonus points of 200Pts.',
    additionalText: 'You do not have to spend much time on being a member, as you will receive an email invitation, when there is a new survey available. So you do not have to login to the site to check yourself every time.',
    icon: <HiOutlineCheckBadge size={28} className="text-blue-600" />,
    hoverIcon: <FiUserPlus size={28} className="text-blue-600" />,
  },
  {
    title: 'PROFILER SURVEY',
    description: 'Click on Profile Survey as soon as you get enter into your Dashboard to get rewarded with your first Reward and complete your profiling with few quick inputs to earn more rewards value.',
    additionalText: 'You will be rewarded with value points to complete each your profiling. Our profiling points system have a higher pay-out to achieve your threshold therefore as compare to other earning portals, it does not take too long to reach the threshold on MyFrequent Rewards.',
    icon: <HiOutlineClipboardDocumentList size={28} className="text-blue-600" />,
    hoverIcon: <FiClipboard size={28} className="text-blue-600" />,
  },
  {
    title: 'DAILY SURVEYS',
    description: 'Once you complete your all profiling survey you start receiving wide range of Surveys daily according to your profiling. After each survey participation and achieving your threshold or more, you will be rewarded with value points and those points will be redeemed to your PayPal account on every month billing Cycle into cash.',
    additionalText: 'Incase, you are unable to achieve your threshold in current month then all your existing rewards point will be forwarded to your coming month points and it will be continued till the threshold will not be achieved , you will be paid once you achieve your threshold or more.',
    icon: <HiOutlineClipboardDocumentCheck size={28} className="text-blue-600" />,
    hoverIcon: <FiCalendar size={28} className="text-blue-600" />,
  },
  {
    title: 'HOW YOU GROW',
    description: 'The higher your survey participation , climbs you in the survey ranking, and the more attractive it becomes for potential participants - and the more people participate in it.',
    additionalText: 'The better your survey is ranked in the Survey Ranking, the more points others receive for their participation (You will get Incentivise Points of 1500 every month with your current points if you achieve your threshold or more continuously for 6 months in the Survey Ranking).',
    icon: <HiOutlineChartBar size={28} className="text-blue-600" />,
    hoverIcon: <FiTrendingUp size={28} className="text-blue-600" />,
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
          transform: translateY(30px) scale(0.95);
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
        transform: translateY(30px) scale(0.95);
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
      
      /* Mobile specific animations */
      @media (max-width: 768px) {
        .animate-slide-in {
          animation: slideInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .step-card {
          transform: translateY(20px) scale(0.98);
        }
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
            }, index * 150);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
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
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        {/* Header - Fully Responsive */}
        <header className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-800 mb-3 sm:mb-4 transition-all duration-700 ease-out hover:scale-105 hover:text-blue-600">
            HOW IT WORKS
          </h2>
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="h-0.5 sm:h-1 w-16 sm:w-20 rounded-full animated-underline">
            </div>
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-slate-500 max-w-xl lg:max-w-2xl mx-auto px-2 sm:px-0 transition-all duration-500 ease-out hover:text-slate-600 hover:scale-105">
            Register free and activate your account with a valid email in seconds.
          </p>
        </header>

        {/* Cards Container - Responsive Spacing */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12">
          {steps.map((step, idx) => (
            <article
              key={idx}
              className="group step-card relative rounded-xl sm:rounded-2xl border transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) hover:scale-[1.02] sm:hover:scale-105 hover:shadow-lg sm:hover:shadow-2xl hover:shadow-blue-600/20 sm:hover:shadow-blue-600/40 bg-white text-slate-700 border-blue-600/30 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white hover:border-transparent"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 md:gap-8 lg:gap-10 p-4 sm:p-6 md:p-8 lg:p-10">
                {/* Icon Section - Responsive */}
                <div className="flex-shrink-0 w-full sm:w-auto flex justify-center sm:justify-start">
                  <div className="flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-lg sm:rounded-xl relative transition-all duration-600 cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-105 sm:group-hover:scale-110 bg-blue-600/20 group-hover:bg-white/95 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center transition-all duration-800 cubic-bezier(0.25, 0.46, 0.45, 0.94) group-hover:-translate-y-full group-hover:scale-75">
                      {React.cloneElement(step.icon, {
                        size: window.innerWidth < 640 ? 24 : window.innerWidth < 1024 ? 28 : 32,
                        className: "text-blue-600"
                      })}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center transition-all duration-800 cubic-bezier(0.25, 0.46, 0.45, 0.94) translate-y-full scale-75 group-hover:translate-y-0 group-hover:scale-100">
                      {React.cloneElement(step.hoverIcon, { 
                        size: window.innerWidth < 640 ? 24 : window.innerWidth < 1024 ? 28 : 32,
                        className: "text-blue-600" 
                      })}
                    </div>
                  </div>
                </div>

                {/* Content Section - Responsive */}
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight mb-2 sm:mb-3 md:mb-4 transition-all duration-600 cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-[1.02] sm:group-hover:scale-105 text-slate-800 group-hover:text-white">
                    {step.title}
                  </h3>

                  <p className="text-sm sm:text-base md:text-lg leading-6 sm:leading-7 mb-2 sm:mb-3 md:mb-4 transition-all duration-600 cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-[1.02] sm:group-hover:scale-105 text-slate-600 group-hover:text-blue-50/95">
                    {step.description}
                  </p>

                  {step.additionalText && (
                    <p className="text-xs sm:text-sm md:text-base leading-5 sm:leading-6 transition-all duration-600 cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-[1.02] sm:group-hover:scale-105 text-slate-500 group-hover:text-blue-100/90">
                      {step.additionalText}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
