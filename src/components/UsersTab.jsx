import React from "react";
import { FaPhone, FaTrash, FaUserCheck, FaUserTimes } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaEarthAsia } from "react-icons/fa6";

const UsersTab = ({ user, onToggleStatus, onDelete }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all duration-300">

      {/* Left Section */}
      <div className="flex items-center gap-4 w-full md:w-2/3">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl shrink-0">
          {user.fullName?.charAt(0).toUpperCase()}
        </div>

        {/* Info */}
        <div className="space-y-0.5">
          <h3 className="text-lg font-semibold text-gray-800">{user.fullName}</h3>
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <MdEmail className="text-blue-500" /> {user.email}
          </div>
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <FaPhone className="text-green-500" /> {user.phone}
          </div>
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <FaEarthAsia className="text-purple-500" /> {user.country}
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex flex-wrap gap-3 w-full md:w-auto justify-start md:justify-end">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
          }`}
        >
          {user.isActive ? "Active" : "Inactive"}
        </span>

        <button
          onClick={() => onToggleStatus(user.id, user.isActive)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {user.isActive ? <FaUserTimes /> : <FaUserCheck />}
          {user.isActive ? "Deactivate" : "Activate"}
        </button>

        <button
          onClick={() => onDelete(user.id)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition"
        >
          <FaTrash />
          Delete
        </button>
      </div>
    </div>
  );
};

export default UsersTab;
