import React from "react";

const Contact = (t) => {
  return <div>
            <h2 className="text-2xl font-bold text-blue-900">{t.contact}</h2>
             <p className="mt-4 text-gray-600">{t.contactText}</p>
          </div>;
};

export default Contact;
