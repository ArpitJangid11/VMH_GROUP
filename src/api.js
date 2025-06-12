import Airtable from "airtable";

const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_USERS_TABLE = import.meta.env.VITE_AIRTABLE_USERS_TABLE;
export const signupUser = async (data) => {
  var base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

  // for create a new row
  base(AIRTABLE_USERS_TABLE).create(
    [
      {
        fields: data,
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log(record.getId());
      });
    }
  );

  return data;
};

// for search login user
export const loginUser = async (data) => {
  const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
    AIRTABLE_BASE_ID
  );

  return new Promise((resolve, reject) => {
    const matchedUsers = [];

    base(AIRTABLE_USERS_TABLE)
      .select({ view: "Grid view" })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach((record) => {
            if (
              data.email === record.get("email") &&
              data.password === record.get("password")
            ) {
              const userData = {
                id: record.getId(),
                ...record.fields,
              };
              matchedUsers.push(userData);
            }
          });

          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error("Error fetching records:", err);
            reject(err);
          } else {
            if (matchedUsers.length > 0) {
              resolve(matchedUsers[0]); // Return the first matched user
            } else {
              alert("incorrect password");
              resolve(null); // No match found
            }
          }
        }
      );
  });
};
