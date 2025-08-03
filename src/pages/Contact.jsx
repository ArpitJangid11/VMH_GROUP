import React from "react";

const Contact = (t) => {
  return <div className="mt-27">
            <h2 className="text-2xl font-bold  text-blue-900">{t.contact}</h2>
             <p className="mt-4 text-gray-600">{t.contactText} contact</p>
          </div>;
};

export default Contact;
