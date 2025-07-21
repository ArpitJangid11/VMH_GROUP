import React, { useEffect, useState } from "react";
import { getUserSurveyHistory } from "../../services/userService";
import { FaArrowLeft, FaClock, FaGift } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SurveyHistory = () => {
  const [history, setHistory] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  
   const navigate = useNavigate();
  
    const handleBack = () => {
      navigate(-1); // Go back one page in browser history
    };
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getUserSurveyHistory(user.id);
        setHistory(data);
      } catch (error) {
        console.error("Failed to load history:", error);
      }
    };

    if (user?.id) fetchHistory();
  }, [user]);

  return (
    <div className="p-6">
      {/* <h2 className="text-2xl font-semibold mb-4 text-blue-800">Your Survey History</h2> */}
      <div className="relative mb-6">
        <button
          onClick={handleBack}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-blue-900 hover:text-blue-600 transition"
        >
          <FaArrowLeft size={20} />
        </button>
        <h2 className="text-center text-3xl font-bold text-blue-900">
          Survey History
        </h2>
      </div>
      {history.length === 0 ? (
        <p className="text-gray-600">No surveys attempted yet.</p>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-600"
            >
              <h3 className="text-lg font-bold text-blue-700 mb-2">
                {item.Survey?.title || "Untitled Survey"}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                {item.Survey?.description || "No description available."}
              </p>
              <div className="flex gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FaClock />
                  {item.Survey?.duration ?? "--"} mins
                </div>
                <div className="flex items-center gap-2">
                  <FaGift />
                  {item.Survey?.rewardPoints ?? 0} points
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Started at: {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SurveyHistory;
