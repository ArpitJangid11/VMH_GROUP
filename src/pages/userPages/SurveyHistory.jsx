import { useEffect, useState } from "react";
import { getSurveyHistory } from "../../services/userService";

const SurveyHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getSurveyHistory(); // ✅ use new API
        setHistory(Array.isArray(data) ? data : []); // safeguard against bad response
      } catch (err) {
        console.error("Failed to fetch history", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Survey History</h2>
      {Array.isArray(history) && history.length > 0 ? (
        <div className="space-y-4">
          {history.map((entry) => (
            <div
              key={entry.id}
              className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold text-blue-700">
                {entry.Survey?.title || "Untitled Survey"}
              </h3>
              <p className="text-sm text-gray-600">
                {entry.Survey?.description || "No description provided"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Submitted on: {new Date(entry.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-green-600 mt-1">
                Earned: {entry.Survey?.points || 0} points
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No surveys submitted yet.</p>
      )}
    </div>
  );
};

export default SurveyHistory;
