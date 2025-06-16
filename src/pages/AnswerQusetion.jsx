import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SurveyPage = () => {
  const { label } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await fetch(`http://localhost:3001/surveys/${label}`);
        if (!response.ok) throw new Error('Failed to load survey');
        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSurvey();
  }, [label]);

  const handleToggleOption = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((opt) => opt !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedOptions.length === 0) {
      alert('Please select at least one option.');
      return;
    }

    const currentQuestion = questions[currentIndex];

    setResponses((prev) => [
      ...prev,
      { question: currentQuestion.question, answers: selectedOptions }
    ]);

    setSelectedOptions([]);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log('All answers submitted:', responses);
      alert('Survey Completed! ✅');
      // Optional: POST to backend here
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">← {currentQuestion.question}</h2>

        <form className="space-y-3" onSubmit={handleSubmit}>
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={`border rounded-md px-4 py-2 cursor-pointer ${
                selectedOptions.includes(option)
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handleToggleOption(option)}
            >
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name={`question-${currentIndex}`}
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleToggleOption(option)}
                  className="form-checkbox text-yellow-500"
                />
                <span>{option}</span>
              </label>
            </div>
          ))}

          <button
            type="submit"
            className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md"
          >
            {currentIndex < questions.length - 1 ? 'Next' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SurveyPage;
