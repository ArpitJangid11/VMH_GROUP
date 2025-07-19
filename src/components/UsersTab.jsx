import React from "react";
import { FaPhone, FaTrash, FaUserShield, FaEarthAsia } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const UsersTab = ({ user, onToggleStatus, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 overflow-hidden">
      {/* User Info */}
      <div className="flex items-start sm:items-center gap-4 w-full">
        {/* Avatar */}
        <div className="w-12 h-12 flex-shrink-0 bg-blue-100 text-blue-700 font-bold rounded-full flex items-center justify-center text-lg uppercase">
          {user.fullName?.charAt(0)}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1 text-sm text-gray-700 w-full overflow-hidden">
          <span className="text-base font-semibold break-words">
            {user.fullName}
          </span>

          <span className="flex items-center gap-1 text-xs text-gray-600 break-all">
            <MdEmail className="text-blue-500" />
            <span title={user.email} className="truncate max-w-[220px] sm:max-w-xs">
              {user.email}
            </span>
          </span>

          <span className="flex items-center gap-1 text-xs text-gray-600 break-all">
            <FaPhone className="text-green-500" />
            <span className="truncate max-w-[200px] sm:max-w-xs">
              {user.phone}
            </span>
          </span>

          <span className="flex items-center gap-1 text-xs text-gray-600 break-words">
            <FaEarthAsia className="text-purple-500" />
            <span className="truncate max-w-[200px] sm:max-w-xs">
              {user.country}
            </span>
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-3">
        {/* Status Toggle */}
        <button
          onClick={() => onToggleStatus(user.id, user.isActive)}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
            user.isActive
              ? "bg-red-100 text-red-700 hover:bg-red-200"
              : "bg-green-100 text-green-700 hover:bg-green-200"
          }`}
        >
          {user.isActive ? "Deactivate" : "Activate"}
        </button>

        {/* Role */}
        <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-gray-200 text-gray-800">
          <FaUserShield />
          {user.role}
        </span>

        {/* Delete */}
        <button
          onClick={() => onDelete(user.id)}
          className="text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 text-xs rounded-full flex items-center gap-1"
        >
          <FaTrash className="text-sm" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default UsersTab;
