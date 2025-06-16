import Airtable from "airtable";
import bcrypt from "bcryptjs";

const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_USERS_TABLE = import.meta.env.VITE_AIRTABLE_USERS_TABLE;

// 🔐 SIGNUP USER
export const signupUser = async (data) => {
  const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
    AIRTABLE_BASE_ID
  );

  // Hash the password before storing
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const safeData = {
    ...data,
    password: hashedPassword,
  };

  delete safeData.confirmPassword; // Don't store confirm password

  return new Promise((resolve, reject) => {
    base(AIRTABLE_USERS_TABLE).create(
      [
        {
          fields: safeData,
        },
      ],
      function (err, records) {
        if (err) {
          console.error("Signup Airtable error:", err);
          reject(err);
        } else {
          const recordData = {
            id: records[0].getId(),
            ...records[0].fields,
          };
          resolve(recordData);
        }
      }
    );
  });
};

// 🔑 LOGIN USER
export const loginUser = async (data) => {
  const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
    AIRTABLE_BASE_ID
  );

  try {
    const records = await base(AIRTABLE_USERS_TABLE)
      .select({ view: "Grid view" })
      .all();

    for (const record of records) {
      const recordEmail = record.get("email");
      const recordPassword = record.get("password");

      // Check for email match
      if (recordEmail?.toLowerCase() === data.email.toLowerCase()) {
        if (!recordPassword) {
          console.warn("Password missing in Airtable for user:", recordEmail);
          continue;
        }

        const isMatch = await bcrypt.compare(data.password, recordPassword);
        console.log("Checking login for:", data.email);
        console.log("Checking login for:", data.password);
        console.log("Record found:", recordEmail);
        console.log("Stored password:", recordPassword);
        if (isMatch) {
          return {
            id: record.getId(),
            ...record.fields,
          };
        }
      }
    }

    // If no match
    return null;
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
};
