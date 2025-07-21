import React, { useEffect, useState } from "react";
import axios from "axios";

const SurveyHistoryTab = ({ token }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchSurveyHistory = async () => {
      try {
        const res = await axios.get("/api/user/survey-history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(res.data);
      } catch (error) {
        console.error("Error fetching survey history:", error);
      }
    };

    fetchSurveyHistory();
  }, [token]);

  return (
    <div className="p-4 bg-white rounded-xl shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">📜 Survey History</h2>

      {history.length === 0 ? (
        <p className="text-gray-500">You have not started or completed any surveys yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {history.map((survey, index) => (
            <div key={index} className="border rounded-xl p-4 shadow-sm">
              <h3 className="font-bold text-lg">{survey.title}</h3>
              <p className="text-sm text-gray-500">Category: {survey.category}</p>
              <p className="text-sm text-gray-500">Points: {survey.rewardPoints}</p>
              <p className="mt-1">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    survey.status === "Completed" ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {survey.status}
                </span>
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className={`h-2.5 rounded-full ${
                    survey.status === "Completed" ? "bg-green-500" : "bg-yellow-500"
                  }`}
                  style={{ width: `${survey.progress || 0}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Last updated: {new Date(survey.submittedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SurveyHistoryTab;
