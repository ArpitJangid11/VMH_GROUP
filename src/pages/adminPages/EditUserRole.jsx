// src/pages/adminPages/EditUserRolesInline.jsx
import React, { useEffect, useState } from "react";
import { getAllUsers, updateUserRole } from "../../services/userService";
import { FaSearch } from "react-icons/fa";

// Removed "moderator"
const roles = ["all", "user", "admin"];

const EditUserRolesInline = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [loadingId, setLoadingId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsers();
      setUsers(data);
      setFilteredUsers(data);
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

  const handleUpdate = async (userId, role) => {
    setLoadingId(userId);
    try {
      await updateUserRole(userId, role);
      setMessage(`✅ Role updated for ${userId}`);
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to update role.");
    } finally {
      setLoadingId(null);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">
        Manage User Roles
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="relative w-full md:w-1/2">
            <input
            type="text"
            placeholder="Search by email..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl border bg-white border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-gray-800 placeholder-gray-500"
            />
             <FaSearch className="absolute left-3 top-1/3 text-gray-400" />
        </div>

        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="w-full md:w-1/3 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role === "all" ? "All Roles" : role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {message && <p className="text-green-600 mb-4">{message}</p>}

      {filteredUsers.length === 0 ? (
        <p className="text-gray-600">No users match your criteria.</p>
      ) : (
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between transition-all duration-200 hover:shadow-lg hover:scale-[1.01]"
            >
              <div>
                <p className="font-semibold text-gray-800">{user.fullName}</p>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="border border-gray-300 px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {roles
                    .filter((r) => r !== "all") // "all" is for filtering only
                    .map((role) => (
                      <option key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                </select>

                <button
                  onClick={() => handleUpdate(user.id, user.role)}
                  disabled={loadingId === user.id}
                  className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-1 rounded shadow-sm"
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
