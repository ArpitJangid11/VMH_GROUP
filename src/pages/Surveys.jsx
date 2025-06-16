import React from 'react';
import { Link } from 'react-router-dom';

const surveys = [
  { label: 'household', questions: 21, icon: '🏠' },
  { label: 'occupation', questions: 17, icon: '💼' },
  { label: 'auto', questions: 15, icon: '🛵' },
  { label: 'electronics', questions: 13, icon: '🔌' },
  { label: 'healthcare', questions: 12, icon: '➕' },
  { label: 'hobbies_and_interests', questions: 10, icon: '👍' },
  { label: 'notifications', questions: 2, icon: '🔔' },
  { label: 'media', questions: 8, icon: '🎹' },
  { label: 'education', questions: 7, icon: '🎓' },
  { label: 'Computer_and_video_Gaming', questions: 7, icon: '🎮' },
  { label: 'travel', questions: 7, icon: '✈️' },
  { label: 'food_and_beverage', questions: 6, icon: '🍽️' },
  { label: 'research', questions: 6, icon: '🔍' },
  { label: 'smoking_and_tobacco', questions: 5, icon: '🚬' },
  { label: 'ethnicity', questions: 1, icon: '🧑‍🤝‍🧑' },
  { label: 'region', questions: 0, icon: '📍', completed: true },
];

const AvailableSurveys = ({ t }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">{t.surveys}</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {surveys.map(({ label, questions, icon, completed }) => {
          const surveyCard = (
            <div
              className={`flex flex-col items-center justify-center text-center p-6 rounded-xl bg-white transition-all duration-300 ${
                completed
                  ? 'opacity-50 pointer-events-none'
                  : 'hover:shadow-xl hover:scale-105 transform'
              }`}
            >
              <div className="text-5xl mb-3">{icon}</div>
              <h2 className="text-lg font-semibold text-gray-800">
                {t[label]}
              </h2>
              <p
                className={`mt-1 text-sm ${
                  completed ? 'text-green-600' : 'text-yellow-600'
                }`}
              >
                {completed
                  ? t.completedSurvey
                  : t.questionsToAnswer.replace('{count}', questions)}
              </p>
            </div>
          );

          return completed ? (
            <div key={label}>{surveyCard}</div>
          ) : (
            <Link to={`/surveys/${label}`} key={label}>
              {surveyCard}
            </Link>
          );
        })}

      </div>
    </div>
  );
};

export default AvailableSurveys;
