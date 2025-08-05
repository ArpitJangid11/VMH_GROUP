import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RewardsPanel = () => {
   const navigate = useNavigate();
      
        const handleBack = () => {
          navigate(-1); // Go back one page in browser history
        };
  return (
    <div>
      <div className="relative mt-27 mb-6">
          <button
              onClick={handleBack}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-blue-900 hover:text-blue-600 transition"
          >
              <FaArrowLeft size={20} />
          </button>
          <h2 className="text-center text-3xl font-bold text-blue-900">
               Rewards Panel
          </h2>
      </div>
      it is Rewards Panel
    </div>
  )
}

export default RewardsPanel
