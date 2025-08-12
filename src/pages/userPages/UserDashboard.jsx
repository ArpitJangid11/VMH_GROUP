import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../../components/DashboardCard";
import {
  listSurveys,
  getProfile,
  getUserSurveyHistory,
} from "../../services/userService";
import ProfessionalHouseholdModal from "../../components/ProfessionalHouseholdModal";
import { FaBell, FaChartLine, FaClipboardList, FaMoneyBillWave, FaUser, FaUserFriends } from "react-icons/fa";

// ALL getHighlight FIELDS SHOULD BE FUNCTIONS!
const cardsData = [
  {
    titleKey: "surveys",
    icon: <FaClipboardList size={28} className="text-blue-600"/>,
    description: "Available surveys for you",
    getHighlight: stats => `${stats.totalAvailable} available`,
    borderClass: "border-blue-500",
    bgClass: "bg-blue-50",
    textClass: "text-blue-800",
    route: "/surveys"
  },
  {
    titleKey: "history",
    icon: <FaChartLine size={28} className="text-blue-600"/>,
    description: "Surveys you have completed",
    getHighlight: stats => `${stats.totalCompleted} completed`,
    borderClass: "border-green-500",
    bgClass: "bg-green-50",
    textClass: "text-green-800",
    route: "/survey-history"
  },
  {
    titleKey: "earnings",
    icon: <FaMoneyBillWave size={28} className="text-blue-600"/>,
    description: "Your total reward points",
    getHighlight: stats => `${stats.earnings} points`,
    borderClass: "border-yellow-500",
    bgClass: "bg-yellow-50",
    textClass: "text-yellow-800",
    route: "/earnings"
  },
  {
    titleKey: "refer",
    icon: <FaUserFriends size={28} className="text-blue-600"/>,
    description: "Friends you've referred",
    getHighlight: stats => `${stats.referrals} referred`,
    borderClass: "border-purple-500",
    bgClass: "bg-purple-50",
    textClass: "text-purple-800",
    route: "/refer"
  },
  {
    titleKey: "notification",
    icon: <FaBell size={28} className="text-blue-600"/>,
    description: "Survey alerts and announcements",
    getHighlight: () => `2 new notifications`,
    borderClass: "border-red-500",
    bgClass: "bg-red-50",
    textClass: "text-red-800",
    route: "/notifications"
  },
  {
    titleKey: "profile",
    icon: <FaUser size={28} className="text-blue-600"/>,
    description: "View or update your profile details",
    getHighlight: () => "Tap to edit profile",
    borderClass: "border-indigo-500",
    bgClass: "bg-indigo-50",
    textClass: "text-indigo-800",
    route: "/profile"
  }
];


const UserDashboard = ({ t, user }) => {
  const [surveyStats, setSurveyStats] = useState({
    totalAvailable: 0,
    totalCompleted: 0,
    earnings: 0,
    referrals: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [jobsTitle, setJobsTitle] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const surveys = await listSurveys();
      const userRes = await getProfile();
      const userId = userRes.id;
      setJobsTitle(userRes.jobTitle);
       

      const history = await getUserSurveyHistory(userId);

      const available = (surveys?.length || 0) - (history?.length || 0);
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

  // Card Click Handler
  const handleCardClick = (route) => {
    if (!user.jobTitle && !jobsTitle) {
      setShowModal(true);
      return;
    }
    fetchDashboardData()
    navigate(route);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-27">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-2">{t.dashboard}</h2>
        <p className="text-gray-600">
          Welcome back! Here's your research activity overview.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardsData.map((card) => (
          <div
            key={card.titleKey}
            className="cursor-pointer"
            tabIndex={0}
            role="button"
            aria-label={t[card.titleKey] || card.titleKey}
            onClick={() => handleCardClick(card.route)}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") handleCardClick(card.route);
            }}
          >
            <DashboardCard
              title={t[card.titleKey] || card.titleKey}
              icon={card.icon}
              description={card.description}
              highlight={card.getHighlight(surveyStats)}
              borderClass={card.borderClass}
              bgClass={card.bgClass}
              textClass={card.textClass}
            />
          </div>
        ))}
      </div>

      {showModal && (
        <ProfessionalHouseholdModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default UserDashboard;
