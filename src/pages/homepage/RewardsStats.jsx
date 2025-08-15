import React, { useEffect } from "react";
import { FaUsers, FaCheckCircle, FaGift, FaUserFriends, FaCheck, FaAward } from "react-icons/fa";


const RewardsNationStats = ({t}) => {
  const statsData = [
    {
      icon: <FaUsers size={32} className="text-blue-500" />,
      hoverIcon: <FaUserFriends size={32} className="text-blue-500" />,
      title: t.rewardsNationStats["happyPanelMembers"],
      target: 8000000,
      display: "8M+",
      bg: "bg-blue-500",
      text: "text-white",
      hoverBg: "hover:bg-white",
      // Separate hover colors for number and title
      numberHover: "group-hover:text-blue-500",
      titleHover: "group-hover:text-blue-400", // Slightly different shade
    },
    {
      icon: <FaCheckCircle size={36} className="text-blue-500" />,
      hoverIcon: <FaCheck size={36} className="text-blue-500" />,
      title: t.rewardsNationStats["completes"],
      target: 10000000,
      display: "10M+",
      bg: "bg-blue-100",
      text: "text-blue-500",
      hoverBg: "hover:bg-blue-500",
      numberHover: "group-hover:text-white",
      titleHover: "group-hover:text-blue-100",
    },
    {
      icon: <FaGift size={32} className="text-blue-500" />,
      hoverIcon: <FaAward size={32} className="text-blue-500" />,
      title: t.rewardsNationStats["rewardsGiven"] ,
      target: 15000000,
      display: "15M+",
      bg: "bg-blue-500",
      text: "text-white",
      hoverBg: "hover:bg-white",
      numberHover: "group-hover:text-blue-500",
      titleHover: "group-hover:text-blue-400",
    },
  ];
  useEffect(() => {
    const counters = document.querySelectorAll(".count-up");
    function animateCounter(counter) {
      const target = +counter.getAttribute("data-target");
      const display = counter.getAttribute("data-display");
      const duration = 2000;
      let current = 0;
      const increment = target / (duration / 16);
      function update() {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current).toLocaleString();
          requestAnimationFrame(update);
        } else {
          counter.textContent = display;
        }
      }
      update();
    }
    const observer = new window.IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observerInstance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((counter) => observer.observe(counter));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full bg-white py-8 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto md:my-10 sm:my-10">
        {statsData.map((stat, idx) => (
          <div
            key={stat.title}
            className={`
              group flex-1 flex flex-col items-center justify-center px-6 py-8 shadow-lg min-w-[200px]
              ${stat.bg} ${stat.hoverBg}
              ${idx === 0 ? 'rounded-l-xl' : ''}
              ${idx === statsData.length - 1 ? 'rounded-r-xl' : ''}
              transition-all duration-500 ease-in-out cursor-pointer
              hover:shadow-2xl hover:scale-105
            `}
          >
            {/* Icon container with switching effect */}
            <div className="flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-white relative overflow-hidden group-hover:bg-blue-50 transition-colors duration-500">
              {/* Default icon */}
              <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out group-hover:-translate-y-full group-hover:rotate-180 group-hover:scale-75">
                {stat.icon}
              </div>
              {/* Hover icon */}
              <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out translate-y-full rotate-180 scale-75 group-hover:translate-y-0 group-hover:rotate-0 group-hover:scale-100">
                {stat.hoverIcon}
              </div>
            </div>
            
            {/* Count number - separate hover effect */}
            <span
              className={`
                count-up text-4xl font-bold mb-2 
                ${stat.text} ${stat.numberHover}
                transition-all duration-500 ease-in-out
                group-hover:scale-110
              `}
              data-target={stat.target}
              data-display={stat.display}
            >
              0
            </span>
            
            {/* Title - separate hover effect */}
            <span className={`
              text-lg font-semibold text-center leading-tight 
              ${stat.text} ${stat.titleHover}
              transition-all duration-500 ease-in-out
            `}>
              {stat.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardsNationStats;
