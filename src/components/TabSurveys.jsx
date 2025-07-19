// components/surveysTab.jsx
import React, { useState, useEffect } from "react";

const SurveysTabs = ({ survey, onEdit, onToggleStatus }) => {
  const [isPaused, setIsPaused] = useState(!survey.isActive);
  const [isStarted, setIsStarted] = useState(survey.isActive);
  const [progress, setProgress] = useState(0);
  const [responses, setResponses] = useState(survey.responseCount || 0);

  useEffect(() => {
    let interval;
    if (isStarted && !isPaused) {
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 1, 100));
        setResponses((prev) => prev + Math.floor(Math.random() * 3));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused, isStarted]);

  const handleStart = () => {
    setIsStarted(true);
    setIsPaused(false);
     onToggleStatus({ ...survey, isActive: true });
  };

  const handlePauseToggle = () => {
    if (isStarted) {
      setIsPaused((prev) => !prev);
    }
  };

  const handleEnd = () => {
    setIsStarted(false);
    setIsPaused(true);
    setProgress(0);
    onToggleStatus({ ...survey, isActive: false });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold text-blue-900">{survey.title}</h3>
        <div className="flex gap-2 flex-wrap">
          {!isStarted ? (
            <button
              onClick={handleStart}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
            >
              Start
            </button>
          ) : (
            <>
              <button
                onClick={handlePauseToggle}
                className={`px-4 py-2 rounded-md font-semibold text-white ${
                  isPaused
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {isPaused ? "Resume" : "Pause"}
              </button>
              <button
                onClick={handleEnd}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-md"
              >
                End
              </button>
            </>
          )}
        </div>
      </div>

      <p className="text-gray-700 mb-1">{survey.description}</p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Duration:</strong> {survey.duration} minutes
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Reward:</strong> {survey.rewardPoints} Points
      </p>

      <div className="w-full bg-gray-200 h-3 rounded-full mt-4 overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Real-time Responses: <strong>{responses}</strong>
      </p>

      <div className="mt-4 flex gap-4 flex-wrap">
        <a
          href={survey.link}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
        >
          Open Survey
        </a>
        <button
          onClick={() => onEdit && onEdit(survey)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default SurveysTabs;
