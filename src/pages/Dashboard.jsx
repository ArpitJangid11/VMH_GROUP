import React from "react";

const Dashboard = (t) => {
  return <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-blue-900 mb-2">{t.dashboard}</h2>
                  <p className="text-gray-600">Welcome back! Here's your research activity overview.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-blue-900">{t.surveys}</h3>
                      <div className="text-2xl">📋</div>
                    </div>
                    <p className="text-gray-600 mb-4">Available surveys will be listed here.</p>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <span className="text-sm font-medium text-blue-800">3 new surveys available</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-blue-900">{t.history}</h3>
                      <div className="text-2xl">📈</div>
                    </div>
                    <p className="text-gray-600 mb-4">Your survey history will be displayed here.</p>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <span className="text-sm font-medium text-green-800">12 surveys completed</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-yellow-500">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-blue-900">{t.earnings}</h3>
                      <div className="text-2xl">💰</div>
                    </div>
                    <p className="text-gray-600 mb-4">Track your reward points and cash earnings.</p>
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <span className="text-sm font-medium text-yellow-800">$125.50 earned</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-500">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-blue-900">{t.refer}</h3>
                      <div className="text-2xl">🤝</div>
                    </div>
                    <p className="text-gray-600 mb-4">Refer friends and earn bonus points.</p>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <span className="text-sm font-medium text-purple-800">5 friends referred</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-red-500">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-blue-900">{t.notification}</h3>
                      <div className="text-2xl">🔔</div>
                    </div>
                    <p className="text-gray-600 mb-4">Manage your notification settings.</p>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <span className="text-sm font-medium text-red-800">2 new notifications</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-gray-500 flex items-center justify-center">
                    <button
                      // onClick={() => {setUser(null); setPage('home');}}
                      className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      {t.logout}
                    </button>
                  </div>
                </div>
              </div>
           
};

export default Dashboard;
