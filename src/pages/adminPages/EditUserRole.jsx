// src/pages/adminPages/EditUserRolesInline.jsx
import React, { useEffect, useState } from "react";
import { getAllUsers, updateUserRole } from "../../services/userService";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SurveyLoadingScreen from "../../components/SurveyLoadingScreen";

const roles = ["all", "user", "admin"];

const EditUserRolesInline = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [loadingId, setLoadingId] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [loading, setLoading] = useState(true);
   const navigate = useNavigate();
      
    const handleBack = () => {
      navigate(-1); // Go back one page in browser history
    };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        console.error(err);
        setMessage("❌ Failed to load users.");
        setMessageType("error");
      } finally {
        setLoading(false); // stop loader after fetch
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    if (filterRole !== "all") {
      filtered = filtered.filter((user) => user.role === filterRole);
    }

    if (searchEmail.trim() !== "") {
      filtered = filtered.filter((user) =>
        user.email.toLowerCase().includes(searchEmail.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  }, [searchEmail, filterRole, users]);

  const handleRoleChange = (userId, newRole) => {
    setFilteredUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
  };

  const handleUpdate = async (userId, newRole) => {
    setLoading(true)
    const user = users.find((u) => u.id === userId);
    if (user.role === newRole) return;

    setLoadingId(userId);
    try {
      await updateUserRole(userId, newRole);
      setMessage(`✅ Role updated for ${user.email}`);
      setMessageType("success");
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to update role.");
      setMessageType("error");
    } finally {
      setLoading(false)
      setLoadingId(null);
      setTimeout(() => setMessage(""), 3000);
    }
  };
   if (loading) {
    return <SurveyLoadingScreen message="Fetching Users..."/>;
  }
  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="relative mb-6">
            <button
                onClick={handleBack}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-blue-900 hover:text-blue-600 transition"
            >
                <FaArrowLeft size={20} />
            </button>
            <h2 className="text-center text-3xl font-bold text-blue-900">
                 Manage User Roles
            </h2>
        </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search by email..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl border bg-white border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 placeholder-gray-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="w-full sm:w-1/4 border border-gray-300 px-4 py-3 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role === "all" ? "All Roles" : role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {message && (
        <p className={`mb-4 text-sm ${messageType === "error" ? "text-red-600" : "text-green-600"}`}>
          {message}
        </p>
      )}

      {filteredUsers.length === 0 ? (
        <p className="text-gray-600 text-center">No users match your criteria.</p>
      ) : (
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:shadow-lg hover:scale-[1.01] transition-all duration-200"
            >
              <div>
                <p className="font-semibold text-gray-800">{user.fullName}</p>
                <p className="text-gray-500 text-sm break-all">{user.email}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="border border-gray-300 px-4 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {roles
                    .filter((r) => r !== "all")
                    .map((role) => (
                      <option key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                </select>

                <button
                  onClick={() => handleUpdate(user.id, user.role)}
                  disabled={loadingId === user.id}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-sm transition-all disabled:opacity-50"
                >
                  {loadingId === user.id ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditUserRolesInline;
