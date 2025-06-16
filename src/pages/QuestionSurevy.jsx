import React from 'react';
import { useParams } from 'react-router-dom';

const allSurveyQuestions = {
  household: [
    "What is your households net worth (not including homeownership)?",
    "How many people live in the household including you?",
    "If there were an Indian General Election tomorrow, how likely is it that you would vote?",
    "Which political party (ies) do you support?",
    "Who did you vote for in the 2019 Lok Sabha Election?"
  ],
  occupation: [
    "What is your job title?",
    "Which industry do you work in?",
    "How many hours do you work per week?"
  ],
  // Add more surveys as needed
};

const SurveyPage = () => {
  const { label } = useParams();
  const questions = allSurveyQuestions[label];

  if (!questions) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 text-center text-red-600">
        Survey not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl font-bold cursor-pointer" onClick={() => window.history.back()}>
          &larr;
        </span>
        <h1 className="text-2xl font-bold capitalize text-gray-800">{label}</h1>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <div
            key={index}
            className="bg-white  rounded-lg shadow-sm px-6 py-4"
          >
            <p className="text-gray-800">{question}</p>
            <p className="text-yellow-600 text-sm mt-1">(unanswered)</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyPage;
