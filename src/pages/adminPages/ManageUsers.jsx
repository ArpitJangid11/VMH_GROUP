import React, { useCallback, useEffect, useState } from "react";
import {
  getAllUsers,
  updateUserIsActiveStatus,
} from "../../services/userService";
import UsersTab from "../../components/UsersTab";
import { FaSearch, FaFilter, FaTimes, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SurveyLoadingScreen from "../../components/SurveyLoadingScreen";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [customDays, setCustomDays] = useState("");
   const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back one page in browser history
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally{
        setLoading(false);
      }
    };
    fetchUsers();
  }, [refresh]);

  const handleToggleStatus = useCallback(async (id, currentStatus) => {
    try {
      await updateUserIsActiveStatus(id, !currentStatus);
      setRefresh((prev) => !prev);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  }, []);

  const handleBlockUser = useCallback(async (id, currentStatus) => {
    const action = currentStatus ? "block" : "unblock";
    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      try {
        await updateUserIsActiveStatus(id, !currentStatus);
        setRefresh((prev) => !prev);
      } catch (err) {
        console.error(`Error trying to ${action} user:`, err);
      }
    }
  }, []);


  const isWithinDateRange = (dateString) => {
    const userDate = new Date(dateString);
    const now = new Date();
    const startDate = fromDate ? new Date(fromDate) : null;
    const endDate = toDate ? new Date(toDate) : null;

    if (customDays) {
      const daysAgo = new Date();
      daysAgo.setDate(now.getDate() - parseInt(customDays));
      return userDate >= daysAgo;
    }

    if (startDate && userDate < startDate) return false;
    if (endDate && userDate > endDate) return false;
    return true;
  };

  const filteredUsers = users.filter((user) => {
    const matchStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && user.isActive) ||
      (filterStatus === "inactive" && !user.isActive);

    const matchSearch =
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchDate = isWithinDateRange(user.createdAt);

    return matchStatus && matchSearch && matchDate;
  });
   if (loading) {
    return <SurveyLoadingScreen message="Fetching Manage Users..." />;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="relative mb-6">
          <button
              onClick={handleBack}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-blue-900 hover:text-blue-600 transition"
          >
              <FaArrowLeft size={20} />
          </button>
          <h2 className="text-center text-3xl font-bold text-blue-900">
                Manage Users
          </h2>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between mb-4">
        {/* Search Box */}
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        {/* Filter Toggle */}
        <div className="flex gap-2 flex-wrap items-center justify-start sm:justify-end">
          {/* Status Segmented Buttons */}
          {["all", "active", "inactive"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                filterStatus === status
                  ? status === "active"
                    ? "bg-green-600 text-white"
                    : status === "inactive"
                    ? "bg-red-600 text-white"
                    : "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}

          <button
            onClick={() => setShowDateFilter(!showDateFilter)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
          >
            <FaFilter /> Filter by Date
          </button>
        </div>
      </div>

      {/* Date Filter UI */}
      {showDateFilter && (
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4 items-center bg-gray-50 p-4 rounded-lg border border-gray-300">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Or Last (Days)
            </label>
            <input
              type="number"
              placeholder="e.g. 7"
              value={customDays}
              onChange={(e) => setCustomDays(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
            />
          </div>

          <button
            onClick={() => {
              setFromDate("");
              setToDate("");
              setCustomDays("");
            }}
            className="mt-4 sm:mt-6 px-4 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition-all"
          >
            <FaTimes className="inline mr-1" /> Clear Filter
          </button>
        </div>
      )}

      {/* Active Filter Tags */}
      <div className="mb-4 flex flex-wrap gap-2 text-sm">
        {filterStatus !== "all" && (
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            Status: {filterStatus}
          </span>
        )}
        {fromDate && (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
            From: {fromDate}
          </span>
        )}
        {toDate && (
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
            To: {toDate}
          </span>
        )}
        {customDays && (
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
            Last {customDays} days
          </span>
        )}
      </div>

      {/* Users Table */}
      {filteredUsers.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <UsersTab
              key={user.id}
              user={user}
              onToggleStatus={handleToggleStatus}
              onBlockUser={handleBlockUser}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
