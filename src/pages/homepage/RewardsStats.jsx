import React, { useEffect } from "react";
import { FaUsers, FaCheckCircle, FaGift } from "react-icons/fa";

const statsData = [
  {
    icon: <FaUsers size={32} className="text-blue-500" />,
    title: "Happy Panel Members",
    target: 10000000,
    display: "10M+",
    bg: "bg-blue-500",
    text: "text-white",
  },
  {
    icon: <FaCheckCircle size={36} className="text-blue-500" />,
    title: "Completes",
    target: 13000000,
    display: "13M+",
    bg: "bg-blue-100",
    text: "text-blue-500",
  },
  {
    icon: <FaGift size={32} className="text-blue-500" />,
    title: "Rewards Given",
    target: 15000000,
    display: "15M+",
    bg: "bg-blue-500",
    text: "text-white",
  },
];

const RewardsNationStats = () => {
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
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto  md:my-10 sm:my-10">
        {statsData.map((stat, idx) => (
          <div
            key={stat.title}
            className={`
              flex-1 flex flex-col items-center justify-center px-6 py-8 shadow-lg min-w-[200px]
              ${stat.bg} 
              ${idx === 0 ? 'rounded-l-xl' : ''}
              ${idx === statsData.length - 1 ? 'rounded-r-xl' : ''}
            `}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-white">
              {stat.icon}
            </div>
            <span
              className={`count-up text-4xl font-bold mb-2 ${stat.text}`}
              data-target={stat.target}
              data-display={stat.display}
            >
              0
            </span>
            <span className={`text-lg font-semibold text-center leading-tight ${stat.text}`}>
              {stat.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardsNationStats;
