// pages/adminPages/ManageSurveys.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllSurveysByAdmin,
  updateSurveyByAdmin,
} from "../../services/userService";
import SurveysTab from "../../components/TabSurveys";

const ManageSurveys = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">
        Manage Surveys
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading surveys...</p>
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
