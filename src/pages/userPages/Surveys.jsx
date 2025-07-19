/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AvailableSurveyCard from "../../components/AvailableSurveyCard";
import { listSurveys } from "../../services/userService";
import { FaSearch } from "react-icons/fa";

const Surveys = ({ t }) => {
  const [surveys, setSurveys] = useState([]);
  const [filteredSurveys, setFilteredSurveys] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const data = await listSurveys();
        if (!Array.isArray(data)) throw new Error("Invalid survey data received");
        setSurveys(data);
        setFilteredSurveys(data);
      } catch (err) {
        setError(t.failedToFetchSurveys || "Failed to fetch surveys.");
        console.error("❌ Fetch surveys error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSurveys();
  }, []);

  useEffect(() => {
    const filtered = surveys.filter((survey) => {
      const prefs = survey?.preferences;
      if (!prefs) return false;

      if (typeof prefs === "string") {
        return prefs.toLowerCase().includes(searchTerm.toLowerCase());
      }

      if (Array.isArray(prefs)) {
        return prefs.some((pref) =>
          pref.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      return false;
    });

    setFilteredSurveys(filtered);
  }, [searchTerm, surveys]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">{t.surveys}</h2>
      <div className="relative w-full mb-10">
        <input
          type="text"
          placeholder={t.searchPlaceholder || "Search by preferences..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-2xl border bg-white border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-gray-800 placeholder-gray-500"
          />
           <FaSearch className="absolute left-3 top-1/3 text-gray-400" />
      </div>

      {loading ? (
        <p className="text-center text-blue-700 font-medium">{t.loading || "Loading surveys..."}</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredSurveys.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">
          {t.noSurveysFound || "No surveys match your search."}
        </p>
      ) : (
        <div className="flex flex-col space-y-6">
          {filteredSurveys.map((survey) => (
            <AvailableSurveyCard
              key={survey.survey_id || survey.id} // fallback to `id` if needed
              survey={survey}
              t={t}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Surveys;
