import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
     const navigate = useNavigate();
        
          const handleBack = () => {
            navigate(-1); // Go back one page in browser history
          };
  return (
    <div>
       <div className="relative mb-6">
            <button
                onClick={handleBack}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-blue-900 hover:text-blue-600 transition"
            >
                <FaArrowLeft size={20} />
            </button>
            <h2 className="text-center text-3xl font-bold text-blue-900">
                Notification
            </h2>
        </div>
          It is Notification Page
    </div>
  )
}

export default Notification
