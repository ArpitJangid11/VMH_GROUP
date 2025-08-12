import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAllSurveysByAdmin,
  updateSurveyByAdmin,
} from "../../services/userService";
import { FaArrowLeft } from "react-icons/fa";

const EditSurvey = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    rewardPoints: 0,
    duration: 0,
    preferences: [],
  });
      
  const handleBack = () => {
    navigate(-1); // Go back one page in browser history
  };

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const surveys = await getAllSurveysByAdmin();
        const found = surveys.find((s) => s.survey_id === parseInt(id));
        if (found) {
          setSurvey(found);
          setForm({
            title: found.title,
            description: found.description,
            link: found.link,
            rewardPoints: found.rewardPoints,
            duration: found.duration,
            preferences: found.preferences || [],
          });
        }
      } catch (err) {
        console.error("Error loading survey:", err);
      }
    };

    fetchSurvey();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSurveyByAdmin(id, form);
      navigate("/admin/managesurvey");
    } catch (err) {
      console.error("Update error:", err);
      alert("❌ Failed to update survey");
    }
  };

  if (!survey) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-blue-700 mt-4 text-lg font-medium">Loading survey...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
       <div className="relative mb-6">
            <button
                onClick={handleBack}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600 transition"
            >
                <FaArrowLeft size={20} />
            </button>
            <h2 className="text-center text-3xl font-bold text-blue-600">
                Edit Survey
            </h2>
        </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-blue-700">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter survey title"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-blue-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter survey description"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium text-blue-700">Survey Link</label>
          <input
            type="text"
            name="link"
            value={form.link}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter survey URL"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium text-blue-700">Reward Points</label>
            <input
              type="number"
              name="rewardPoints"
              value={form.rewardPoints}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., 50"
            />
          </div>

          <div className="flex-1">
            <label className="block mb-1 font-medium text-blue-700">Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., 15"
            />
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-all duration-200"
          >
            Update Survey
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSurvey;
