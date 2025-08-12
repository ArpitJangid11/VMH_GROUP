import React, { useState } from "react";
import { createSurvey } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const preferenceOptions = ["B2B", "B2C", "Healthcare"];

const AssignSurveys = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    duration: "",
    rewardPoints: "",
    preferences: [],
  });

  const [cardData, setCardData] = useState(null);
   const navigate = useNavigate();
    
      const handleBack = () => {
        navigate(-1); // Go back one page in browser history
      };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      preferences: checked
        ? [...prev.preferences, value]
        : prev.preferences.filter((pref) => pref !== value),
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await createSurvey(formData);
    setCardData(response.survey);
    setFormData({
      title: "",
      description: "",
      link: "",
      duration: "",
      rewardPoints: "",
      preferences: [],
    });
  } catch (err) {
    console.error("Survey creation failed", err);
    alert("Survey creation failed. Check console.");
  }
};

  return (
    <div className="max-w-md mx-auto">
      {/* FORM */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="relative mb-6">
            <button
                onClick={handleBack}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600 transition"
            >
                <FaArrowLeft size={20} />
            </button>
            <h2 className="text-center text-3xl font-bold text-blue-600">
                Assign Survey
            </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Survey Title"
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Survey Description"
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />

          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            placeholder="Survey Link"
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />

          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            placeholder="Duration (in minutes)"
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />

          <input
            type="number"
            name="rewardPoints"
            value={formData.rewardPoints}
            onChange={handleInputChange}
            placeholder="Reward Points"
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Preferences</p>
            <div className="flex gap-4 flex-wrap">
              {preferenceOptions.map((option) => (
                <label key={option} className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    value={option}
                    checked={formData.preferences.includes(option)}
                    onChange={handleCheckboxChange}
                    className="accent-blue-500"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg"
          >
            Assign Survey
          </button>
        </form>
      </div>

      {/* RESULT CARD */}
      {cardData && (
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-blue-900 mb-2">{cardData.title}</h3>
          <p className="text-gray-700 mb-2">{cardData.description}</p>
          <p className="text-sm text-gray-600">
            <strong>Duration:</strong> {cardData.duration} minutes
          </p>
          <p className="text-sm text-gray-600">
            <strong>Points:</strong> {cardData.rewardPoints}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <strong>Link:</strong>{" "}
            <a
              href={cardData.link}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              Start Survey
            </a>
          </p>
          {cardData.preferences.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-semibold text-gray-700">Preferences:</p>
              <ul className="list-disc ml-5 text-sm text-gray-600 mt-1">
                {cardData.preferences.map((pref, index) => (
                  <li key={index}>{pref}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AssignSurveys;
