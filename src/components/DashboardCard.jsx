import React from "react";

const DashboardCard = ({
  title,
  icon,
  description,
  highlight,
  borderClass,
  bgClass,
  textClass,
}) => {
  return (
    <div
      className={`
        bg-white p-6 rounded-xl shadow-md border-l-4
        transition-all duration-200 ease-in-out
        hover:scale-105 hover:shadow-2xl
        ${borderClass}
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-blue-900">{title}</h3>
        <div className="text-2xl">{icon}</div>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className={`p-3 rounded-lg ${bgClass}`}>
        <span className={`text-sm font-medium ${textClass}`}>
          {highlight}
        </span>
      </div>
    </div>
  );
};

export default DashboardCard;
