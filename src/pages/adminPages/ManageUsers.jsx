import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  deleteUser,
  toggleUserStatus,
} from "../../services/userService";
import UsersTab from "../../components/UsersTab";
import { FaSearch } from "react-icons/fa";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };
    fetchUsers();
  }, [refresh]);

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await toggleUserStatus(id, !currentStatus);
      setRefresh(!refresh);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        setRefresh(!refresh);
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
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

    return matchStatus && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <h2 className="text-xl sm:text-2xl font-bold text-blue-900 text-center mb-6">
        Manage Users
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between mb-6">
        {/* Search */}
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 bg-white pr-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
          />
          <FaSearch className="absolute left-3 top-1/3 text-gray-400" />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {["all", "active", "inactive"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                filterStatus === status
                  ? status === "active"
                    ? "bg-green-600 text-white"
                    : status === "inactive"
                    ? "bg-red-600 text-white"
                    : "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Users List */}
      {filteredUsers.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <UsersTab
              key={user.id}
              user={user}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
