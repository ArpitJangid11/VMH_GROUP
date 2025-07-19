/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../../services/userService";

const AdminProfile = ({ t, setUser }) => {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false); // 🔁 for Save button

  // Load user from localStorage or API
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setForm(savedUser);
      setUser && setUser(savedUser);
    } else {
      const fetchUser = async () => {
        try {
          const fetchedUser = await getProfile();
          setForm(fetchedUser);
          setUser && setUser(fetchedUser);
          localStorage.setItem("user", JSON.stringify(fetchedUser));
        } catch (err) {
          console.error("Failed to load user:", err);
        }
      };
      fetchUser();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleEdit = () => {
    setEditMode((prev) => !prev);
  };

  const handleSave = async () => {
    setLoading(true); // start loading
    try {
      const updated = await updateProfile(form);
      const newUser = updated.user || updated;
      setForm(newUser);
      setEditMode(false);
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser && setUser(newUser);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update profile. Try again.");
    } finally {
      setLoading(false); // stop loading
    }
  };

  if (!form || Object.keys(form).length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        {t?.loading || "Loading profile..."}
      </div>
    );
  }

  const fields = [
    { label: t?.name || "Full Name", key: "fullName", editable: true },
    { label: t?.email || "Email", key: "email", editable: false },
    { label: t?.phone || "Phone", key: "phone", editable: false },
    { label: t?.dob || "DOB", key: "DOB", editable: true },
    { label: t?.gender || "Gender", key: "gender", editable: true },
    { label: t?.country || "Country", key: "country", editable: true },
    { label: t?.jobTitle || "Job Title", key: "jobTitle", editable: true },
    { label: t?.industry || "Industry", key: "industry", editable: true },
    { label: t?.role || "Role", key: "role", editable: false },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mt-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6 text-center">
          {t?.profile || "Profile"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-gray-700">
          {fields.map(({ label, key, editable }) => (
            <div key={key}>
              <p className="text-sm text-gray-500 mb-1 font-medium">{label}</p>
              {editMode && editable ? (
                <input
                  type="text"
                  name={key}
                  value={form[key] || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                />
              ) : (
                <div className="text-base text-gray-800 break-words">
                  {form[key]}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={editMode ? handleSave : handleToggleEdit}
            disabled={loading}
            className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : editMode
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading
              ? t?.saving || "Saving..."
              : editMode
              ? t?.save || "Save"
              : t?.edit || "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
