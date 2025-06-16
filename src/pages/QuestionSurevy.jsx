import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const allSurveyQuestions = {
 household: [
    {
      question: "What is your household's net worth (not including homeownership)?",
      options: [
        "1 person",
        "2 persons",
        "3 persons",
        "4 persons",
        "5 persons",
        "More than 5 persons",
        "Prefer not to say"
      ]
    },
    { question: "How many people live in the household including you?",
      options: [
        "Very likely that I would vote",
        "Fairly likely that I would vote",
        "Neither likely nor unlikely",
        "Fairly unlikely that I would vote",
        "Very unlikely that I would vote",
        "Prefer not to say"
      ]
    },
    { question: "If there were an Indian General Election tomorrow, how likely is it that you would vote?",
      options: [
       "Bhartiya Janta Party",
        "Indian National Congress",
        "Communist Party of India (Marxist)",
        "Aam Aadmi Party",
        "Bahujan Samaj Party",
        "National People's Party",
        "A different party",
        "Prefer not to say",
        "None of the above"
      ]
      
    },
    { question: "Which political party (ies) do you support?",
      options: [
       "Bhartiya Janta Party",
        "Indian National Congress",
        "Communist Party of India (Marxist)",
        "Aam Aadmi Party",
        "Bahujan Samaj Party",
        "National People's Party",
        "A different party",
        "Prefer not to say",
        "None of the above"
      ]
      
    },
    { question: "Who did you vote for in the 2019 Lok Sabha Election?",
      options: [
        "Bharatiya Janata Party",
        "Indian National Congress",
        "Communist Party of India (Marxist)",
        "Bahujan Samaj Party",
        "Dravida Munnetra Kazhagam",
        "All India Trinamool Congress",
        "National People's Party",
        "Shiv Sena",
        "Janata Dal (United)",
        "Aam Aadmi Party",
        "Other",
        "Did not vote",
        "Prefer not to say"
      ]
      
    }
  ],
  occupation: [
    { question: "What is your current occupational status?",
      options: [
       "Studies",
        "Full-time work",
        "Part-time work",
        "Own business / Self-employed / Freelance",
        "Active military service",
        "Parental leave",
        "Retired",
        "Unemployed",
        "Homemaker",
        "Leave of absence",
        "Unable to work",
        "Other type of paid work",
        "Prefer not to say"
      ]
      
    },
    { question: "What is your occupation?",
      options: [
         "Unskilled Worker",
          "Skilled Worker",
          "Petty Trader",
          "Shop Owner",
          "Businessman / Industrialist - No employees",
          "Businessman / Industrialist - 1-9 employees",
          "Businessman / Industrialist - 10+ employees",
          "Self Employed Professional",
          "Clerical / Salesman",
          "Supervisory Level",
          "Officers / Executives - Junior",
          "Officers / Executives - Middle / Senior"
      ]
      
    },
    { question: "Which of the following categories best describes your organisation's primary industry?",
      options: [
        "Accounting",
        "Advertising",
        "Agriculture/Fishing",
        "Architecture",
        "Automotive",
        "Aviation",
        "Banking/Financial",
        "Bio-Tech",
        "Brokerage",
        "Carpentry/Electrical installations/Plumbing",
        "Chemicals/Plastics/Rubber",
        "Communications/Information",
        "Computer Hardware",
        "Computer Reseller (software/hardware)",
        "Computer Software",
        "Construction",
        "Consulting",
        "Consumer Electronics",
        "Consumer Packaged Goods",
        "Education",
        "Energy/Utilities/Oil and Gas",
        "Engineering",
        "Environmental Services",
        "Fashion/Apparel",
        "Government/Public Sector",
        "Healthcare",
        "Hospitality/Tourism",
        "Human Resources",
        "Information Technology/IT",
        "Insurance",
        "Internet",
        "Investment management, investment company",
        "Legal/Law",
        "Manufacturing",
        "Market Research",
        "Marketing/Sales",
        "Media/Entertainment",
        "Military",
        "Non Profit/Social services",
        "Personal Services",
        "Pharmaceuticals",
        "Printing Publishing",
        "Public Relations",
        "Real Estate/Property",
        "Restaurant / Food",
        "Retail/Wholesale trade",
        "Security",
        "Shipping/Distribution",
        "Telecommunications",
        "Transportation",
        "Wholesale",
        "Other",
        "I don't work",
        "Prefer not to say"
      ]

     }
  ],
  // Add more surveys as needed
};
  // Add more surveys as needed

const SurveyPage = () => {
  const { label } = useParams();
  const questions = allSurveyQuestions[label];
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [answers, setAnswers] = useState({});

  if (!questions) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 text-center text-red-600">
        Survey not found.
      </div>
    );
  }

  const handleToggleOption = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const handleSubmit = () => {
    setAnswers((prev) => ({
      ...prev,
      [activeIndex]: selectedOptions
    }));
    setSelectedOptions([]);
    setActiveIndex(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl font-bold cursor-pointer" onClick={() => window.history.back()}>
          &larr;
        </span>
        <h1 className="text-2xl font-bold capitalize text-gray-800">{label}</h1>
      </div>

      <div className="space-y-4">
        {questions.map((q, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm px-6 py-4">
            <p
              className="text-gray-800 cursor-pointer font-medium"
              onClick={() => setActiveIndex(index)}
            >
              {q.question}
            </p>

            {answers[index] && (
              <p className="text-green-600 text-sm mt-1">Answered ✅</p>
            )}
            {!answers[index] && activeIndex !== index && (
              <p className="text-yellow-600 text-sm mt-1">Unanswered</p>
            )}

            {activeIndex === index && (
              <div className="mt-4 space-y-2">
                {q.options.map((opt, i) => (
                  <div
                    key={i}
                    className={`border rounded-md px-4 py-2 cursor-pointer ${
                      selectedOptions.includes(opt)
                        ? 'border-yellow-500 bg-yellow-50'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleToggleOption(opt)}
                  >
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedOptions.includes(opt)}
                        onChange={() => handleToggleOption(opt)}
                        className="form-checkbox text-yellow-500"
                      />
                      <span>{opt}</span>
                    </label>
                  </div>
                ))}

                <button
                  onClick={handleSubmit}
                  className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md"
                >
                  Save Answer
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyPage;
