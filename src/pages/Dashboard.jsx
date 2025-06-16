import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";

const Dashboard = ({t,setUser}) => {
  const navigate= useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null); // Assuming you're passing setUser as a prop
    navigate('/')// or use navigate()
  };
  return(
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">{t.dashboard}</h2>
          <p className="text-gray-600">Welcome back! Here's your research activity overview.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Surveys Card */}
          <div onClick={() => navigate("/surveys")} className="cursor-pointer">
            <DashboardCard
                title={t.surveys}
                icon="📋"
                description="Available surveys will be listed here."
                highlight="3 new surveys available"
                borderClass="border-blue-500"
                bgClass="bg-blue-50"
                textClass="text-blue-800"
              />
          </div>
          {/* History Card */}
          <DashboardCard
            title={t.history}
            icon="📈"
            description="Your survey history will be displayed here."
            highlight="12 surveys completed"
            borderClass="border-green-500"
            bgClass="bg-green-50"
            textClass="text-green-800"
          />

          <DashboardCard
            title={t.earnings}
            icon="💰"
            description="Track your reward points and cash earnings."
            highlight="$125.50 earned"
            borderClass="border-yellow-500"
            bgClass="bg-yellow-50"
            textClass="text-yellow-800"
          />

          <DashboardCard
            title={t.refer}
            icon="🤝"
            description="Refer friends and earn bonus points."
            highlight="5 friends referred"
            borderClass="border-purple-500"
            bgClass="bg-purple-50"
            textClass="text-purple-800"
          />

          <DashboardCard
            title={t.notification}
            icon="🔔"
            description="Manage your notification settings."
            highlight="2 new notifications"
            borderClass="border-red-500"
            bgClass="bg-red-50"
            textClass="text-red-800"
          />

          {/* Logout */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-gray-500 flex items-center justify-center">
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {t.logout}
            </button>
          </div>
        </div>
      </div>
    );
  };
export default Dashboard;
