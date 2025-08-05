import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData = [
  {
    question: "What services does VMH Market Research provide?",
    answer: "We provide in-depth market research, business intelligence, data analysis, and customized consulting services across various industries."
  },
  {
    question: "How can I get support from VMH Market Research?",
    answer: "Contact us via email at support@vmhmarketresearch.com or call us at +91 98765 43210, Monday–Saturday, 9:00 AM–6:00 PM."
  },
  {
    question: "Where is VMH Market Research located?",
    answer: "We are based at Jaipur, India. Visit our Contact page for directions."
  },
  {
    question: "How fast will you respond to my inquiry?",
    answer: "Our team typically responds within one business day to all webform and email inquiries."
  },
  {
    question: "Can VMH Market Research provide tailored research solutions?",
    answer: "Yes, we specialize in customized market research and deliver tailored insights to match your business goals."
  }
];

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = idx => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-white mt-10 flex flex-col items-center py-12 md:py-20">
      <h2 className="text-3xl font-bold text-blue-600 mb-10 text-center mx-3">
        Frequently Asked Questions
      </h2>
      <div className="w-full max-w-2xl mx-auto">
        {faqData.map((item, idx) => (
          <div key={idx} className="mb-4 bg-blue-50 rounded-xl shadow mx-3">
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-lg font-medium text-blue-700 focus:outline-none"
              onClick={() => toggleIndex(idx)}
              aria-expanded={openIndex === idx}
            >
              <span>{item.question}</span>
              {openIndex === idx ? (
                <FaChevronUp className="text-blue-400" />
              ) : (
                <FaChevronDown className="text-blue-400" />
              )}
            </button>
            {openIndex === idx && (
              <div className="px-6 pb-6 text-gray-700 text-base">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
