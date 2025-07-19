import React from "react";
import { FaClock, FaGift } from "react-icons/fa";
import { incrementSurveyResponseCount } from "../services/userService";

const AvailableSurveyCard = ({ survey }) => {
  const handleStartSurvey = async () => {
  if (!survey?.link) {
    alert("Survey link is not available.");
    return;
  }

  try {
    await incrementSurveyResponseCount(survey.survey_id || survey.id); // ✅ update server
    window.open(survey.link, "_blank", "noopener,noreferrer"); // ✅ open link
  } catch (error) {
    console.error("Failed to increment response count:", error);
    alert("Could not register response. Please try again.");
  }
};

  return (
    <div className="w-full bg-white border-l-4 border-blue-600 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 mb-5 flex flex-col md:flex-row justify-between items-start md:items-center">
      {/* Left Section */}
      <div className="flex-1 mb-4 md:mb-0 md:pr-6">
        <h3 className="text-xl font-semibold text-blue-800 mb-2">{survey.title || "Untitled Survey"}</h3>
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
          {survey.description || "No description provided."}
        </p>

        <div className="flex gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FaClock className="text-blue-500" />
            <span>{survey.duration ?? "--"} mins</span>
          </div>
          <div className="flex items-center gap-2">
            <FaGift className="text-yellow-500" />
            <span>{survey.rewardPoints ?? 0} points</span>
          </div>
        </div>
      </div>

      {/* Right Section: Start Button */}
      <div className="flex-shrink-0">
        <button
          onClick={handleStartSurvey}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-sm transition-all disabled:opacity-50"
          disabled={!survey.link}
        >
          Start Survey
        </button>
      </div>
    </div>
  );
};

export default AvailableSurveyCard;
