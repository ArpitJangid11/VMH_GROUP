import API from "../api";

// Register new user and send OTP
export const signupUser = async (data) => {
  const res = await API.post("/api/auth/register", data);
  return res.data; // { message: "OTP sent to your email" }
};

// Verify OTP for the given email
export const verifyOtp = async ({ email, otp }) => {
  const res = await API.post("/api/auth/verify-otp", { email, otp });
  return res.data; // { message: "OTP verified successfully" }
};
export const verifyOtps = async ({ email, otp }) => {
  const res = await API.post("/api/auth/verify-otp", { email, otp });
  return res.data; // { message: "OTP verified successfully" }
};

export const resendVerificationOtp = async (email) => {
  const res = await API.post("/api/auth/resend-otp", { email });
  return res.data;
};

// Login user with email and password (after OTP verification)
export const loginUser = async (data) => {
  const res = await API.post("/api/auth/login", data);
  return res.data; // { token, user }
};

// Get authenticated user's profile (JWT required in header)
export const getProfile = async () => {
  const token = localStorage.getItem("token");
  const res = await API.get("/api/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Update user profile (e.g., fullname, phone, etc.)
export const updateProfile = async (data) => {
  const token = localStorage.getItem("token");
  const res = await API.put("/api/users/me", data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data; // { user }
};

// Admin: Get all users (JWT must be admin)
export const getAllUsers = async () => {
  const res = await API.get("/api/admin/users");
  return res.data; // [{...}, {...}]
};
// Admin: Toggle active/inactive status for user
export const toggleUserStatus = async (userId, status) => {
  const token = localStorage.getItem("token");
  const res = await API.patch(
    `/api/admin/users/${userId}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data; // { message }
};


// Admin: Delete a user by ID
export const deleteUser = async (userId) => {
  const res = await API.delete(`/api/admin/users/${userId}`);
  return res.data; // { message: "User deleted" }
};

// Forgot password (send OTP)
export const sendForgotPasswordOtp = async (email) => {
  const res = await API.post("/api/auth/forgot-password", { email });
  return res.data; // { message: "OTP sent" }
};

// Reset password using OTP
export const resetPassword = async ({ email, otp, newPassword }) => {
  const res = await API.post("/api/auth/reset-password", { email, otp, newPassword });
  return res.data; // { message: "Password updated" }
};

// Assign a Survey
export const createSurvey = async (data) => {
  const token = localStorage.getItem("token");
  const res = await API.post("/api/admin/surveys", data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  // console.log("Received body:", req.body);
  return res.data; // { message: "Survey assigned successfully" }
};
// Admin: Get all surveys created by admin
export const getAllSurveysByAdmin = async () => {
  const token = localStorage.getItem("token");
  const res = await API.get("/api/admin/surveys", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.surveys; // assuming the response format is { surveys: [...] }
};

// Admin: update surveys created by admin
export const updateSurveyByAdmin = async (id, updatedData) => {
  const token = localStorage.getItem("token");
  const res = await API.put(`/api/admin/surveys/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data; // { message: "Survey updated", survey }
};


export const updateUserIsActiveStatus = async (userId, isActive) => {
  const token = localStorage.getItem("token");
  const res = await API.patch(
    `/api/admin/users/${userId}/status`,
    { isActive },
    {
      headers: {
        Authorization: `Bearer ${token}` },
    }
  );
  return res.data; // { message }
};


//  User side available surveys
export const listSurveys = async () => {
  const token = localStorage.getItem("token");
  const res = await API.get("/api/surveys", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data; //  API returns array directly
};

//  User: Get submitted survey history
export const getSurveyHistory = async () => {
  const token = localStorage.getItem("token");
  const res = await API.get("/api/users/survey-history", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data; // Should return an array: [ { Survey, createdAt, ... }, ... ]
};

//  Rseponse count
export const incrementSurveyResponseCount = async (surveyId) => {
  const token = localStorage.getItem("token");
  return API.post(
    `/api/surveys/increment-response/${surveyId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// change role of user by admin
export const updateUserRole = async (userId, newRole) => {
  const token = localStorage.getItem("token");
  const res = await API.put(
    `/api/admin/users/${userId}/role`,
    { role: newRole },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data; // { message, user }
};

export const createSurveyResponse = async (userId, surveyId) => {
  const token = localStorage.getItem("token");

  const res = await API.post(
    "/api/users/start",  // ✅ This matches your Express route
    { userId, surveyId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};


// Get all surveys a user has responded to
export const getUserSurveyHistory = async (userId) => {
  const token = localStorage.getItem("token");

  const res = await API.get(`/api/users/history/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data; // returns the response history array
};
