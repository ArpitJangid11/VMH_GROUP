import Airtable from "airtable";

const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_USERS_TABLE = import.meta.env.VITE_AIRTABLE_USERS_TABLE;
export const signupUser = async (data) => {
  var base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

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
