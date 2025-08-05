import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardCard from "../../components/DashboardCard";
import {
  listSurveys,
  getProfile,
  getUserSurveyHistory,
} from "../../services/userService";

const UserDashboard = ({ t }) => {
  const [surveyStats, setSurveyStats] = useState({
    totalAvailable: 0,
    totalCompleted: 0,
    earnings: 0,
    referrals: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const surveys = await listSurveys(); // available surveys
      const userRes = await getProfile();  // get profile
      const userId = userRes.id;
      console.log(userId);
      
      const history = await getUserSurveyHistory(userId); // completed history
      console.log(history.length);

      const available = surveys?.length - history?.length|| 0;
      const completed = history?.length || 0;
      const earnings = userRes?.user?.points || 0;
      const referrals = userRes?.user?.referrals?.length || 0;

      setSurveyStats({
        totalAvailable: available,
        totalCompleted: completed,
        earnings,
        referrals,
      });
    } catch (err) {
      console.error("Error loading dashboard:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-27">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-2">{t.dashboard}</h2>
        <p className="text-gray-600">
          Welcome back! Here's your research activity overview.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Surveys */}
        <Link to="/surveys">
          <DashboardCard
            title={t.surveys}
            icon="📋"
            description="Available surveys for you"
            highlight={`${surveyStats.totalAvailable} available`}
            borderClass="border-blue-500"
            bgClass="bg-blue-50"
            textClass="text-blue-800"
          />
        </Link>

        {/* History */}
        <Link to="/survey-history">
          <DashboardCard
            title={t.history}
            icon="📈"
            description="Surveys you have completed"
            highlight={`${surveyStats.totalCompleted} completed`}
            borderClass="border-green-500"
            bgClass="bg-green-50"
            textClass="text-green-800"
          />
        </Link>

        {/* Earnings */}
        <Link to="/earnings">
          <DashboardCard
            title={t.earnings}
            icon="💰"
            description="Your total reward points"
            highlight={`${surveyStats.earnings} points`}
            borderClass="border-yellow-500"
            bgClass="bg-yellow-50"
            textClass="text-yellow-800"
          />
        </Link>

        {/* Referrals */}
        <Link to="/refer">
          <DashboardCard
            title={t.refer}
            icon="🤝"
            description="Friends you've referred"
            highlight={`${surveyStats.referrals} referred`}
            borderClass="border-purple-500"
            bgClass="bg-purple-50"
            textClass="text-purple-800"
          />
        </Link>

        {/* Notifications */}
        <Link to="/notifications">
          <DashboardCard
            title={t.notification}
            icon="🔔"
            description="Survey alerts and announcements"
            highlight="2 new notifications"
            borderClass="border-red-500"
            bgClass="bg-red-50"
            textClass="text-red-800"
          />
        </Link>

        {/* Profile */}
        <Link to="/profile">
          <DashboardCard
            title={t.profile || "Profile"}
            icon="👤"
            description="View or update your profile details"
            highlight="Tap to edit profile"
            borderClass="border-indigo-500"
            bgClass="bg-indigo-50"
            textClass="text-indigo-800"
          />
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
