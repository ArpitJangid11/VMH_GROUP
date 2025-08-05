// pages/adminPages/ManageSurveys.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllSurveysByAdmin,
  updateSurveyByAdmin,
} from "../../services/userService";
import SurveysTab from "../../components/TabSurveys";
import { FaArrowLeft } from "react-icons/fa";
import SurveyLoadingScreen from "../../components/SurveyLoadingScreen";

const ManageSurveys = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
      
  const handleBack = () => {
    navigate(-1); // Go back one page in browser history
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const data = await getAllSurveysByAdmin();
      
      setSurveys(data);
    } catch (err) {
      console.error("Error fetching surveys:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (survey) => {
    navigate(`/admin/edit-survey/${survey.survey_id}`);
  };

  const handleToggleStatus = async (survey) => {
    const toggledStatus = !survey.isActive;
    try {
      const { survey: updatedSurvey } = await updateSurveyByAdmin(
        survey.survey_id,
        { isActive: toggledStatus }
      );
      setSurveys((prev) =>
        prev.map((s) =>
          s.survey_id === updatedSurvey.survey_id ? updatedSurvey : s
        )
      );
    } catch (err) {
      console.error("Error updating survey status:", err);
    }
  };

  return (
    <div className="p-6 mt-27">
      <div className="relative mb-6">
            <button
                onClick={handleBack}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-blue-900 hover:text-blue-600 transition"
            >
                <FaArrowLeft size={20} />
            </button>
            <h2 className="text-center text-3xl font-bold text-blue-900">
                 Manage Surveys
            </h2>
        </div>
      {loading ? (
        <SurveyLoadingScreen message="Fetching Manage Surveys..."/>
      ) : surveys.length > 0 ? (
        <div className="flex flex-col gap-6">
          {surveys.map((survey) => (
            <SurveysTab
              key={survey.survey_id}
              survey={survey}
              onEdit={handleEdit}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No surveys created yet.</p>
      )}
    </div>
  );
};

export default ManageSurveys;
