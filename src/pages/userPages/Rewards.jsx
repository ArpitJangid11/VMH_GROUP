import React, { useEffect, useState } from "react";
import { getProfile } from "../../services/userService";

const PointsRewards = ({ t }) => {
  const [points, setPoints] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const res = await getProfile();
        setPoints(res.user.rewardPoints || 0);
        setHistory(res.user.rewardHistory || []); // assuming backend sends this
      } catch (err) {
        console.error("Failed to load reward info", err);
      }
    };
    fetchRewards();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">
        {t.rewards || "Points & Rewards"}
      </h2>

      {/* Current Balance */}
      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 mb-6">
        <h3 className="text-xl font-semibold text-green-800 mb-2">Current Balance</h3>
        <p className="text-2xl font-bold text-gray-800">{points} points</p>
      </div>

      {/* Reward History */}
      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500 mb-6">
        <h3 className="text-xl font-semibold text-indigo-800 mb-4">Points History</h3>
        {history.length === 0 ? (
          <p className="text-gray-500">No transactions yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {history.map((item, idx) => (
              <li key={idx} className="py-2 flex justify-between">
                <span className="text-gray-700">{item.description}</span>
                <span
                  className={`font-semibold ${
                    item.points >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.points > 0 ? `+${item.points}` : item.points}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Redeem Button */}
      <div className="text-center">
        <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-200">
          {t.redeemNow || "Redeem Rewards"}
        </button>
      </div>
    </div>
  );
};

export default PointsRewards;
