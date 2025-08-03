import React from 'react';

const SurveyLoadingScreen = ({ message = "Loading surveys..." }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Main Survey Icon with Animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto animate-bounce">
            {/* Survey Document */}
            <div className="w-full h-20 bg-white rounded-lg shadow-lg border-2 border-blue-200 relative overflow-hidden">
              {/* Header */}
              <div className="h-3 bg-blue-500 w-full"></div>
              
              {/* Survey Lines */}
              <div className="p-3 space-y-2">
                <div className="h-1 bg-blue-300 w-3/4 rounded animate-pulse"></div>
                <div className="h-1 bg-blue-300 w-1/2 rounded animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="h-1 bg-blue-300 w-2/3 rounded animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
              
              {/* Option Circles */}
              <div className="absolute bottom-2 left-3 flex space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{animationDelay: '0.3s'}}></div>
                <div className="w-2 h-2 bg-red-400 rounded-full animate-ping" style={{animationDelay: '0.6s'}}></div>
              </div>
            </div>
          </div>
          
          {/* Floating Particles */}
          <div className="absolute -top-4 -left-4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute -top-2 -right-6 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute -bottom-2 -left-6 w-1 h-1 bg-green-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Loading Text */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-3 animate-pulse">
            {message}
          </h2>
          
          {/* Animated Dots */}
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SurveyLoadingScreen;
