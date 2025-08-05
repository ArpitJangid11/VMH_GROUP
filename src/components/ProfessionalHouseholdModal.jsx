import React, { useState } from "react";

const initialState = {
  jobTitle: "",
  industry: "",
  employmentStatus: "",
  primaryBusiness: "",
  numberOfEmployees: "",
  revenueOrganization: "",
  higherDegree: "",
  incomeBeforeTax: "",
  totalMembers: "",
  children: "",
  retiredPerson: "",
  maritalStatus: "",
};

const ProfessionalHouseholdModal = () => {
    const [formData, setFormData] = useState(initialState);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Replace this with your own submit logic (send to backend etc.)
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Form submitted!\n" + JSON.stringify(formData, null, 2));
        // setFormData(initialState); // If you want to reset after submit
    };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full relative">
        <button
          className="absolute top-3 right-3 text-xl text-gray-600 hover:text-blue-800"
        //   onClick={onClose}
        >×</button>
        <h2 className="text-2xl font-bold mb-6 text-blue-900 text-center">
          Professional & Household Details
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* All fields use value={formData.x} and onChange={handleInputChange} */}
          <div>
            <label className="block mb-1">Job Title</label>
            <select
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">--Select--</option>
              <option value="C-level">C-level (CEO, CFO, CTO, CIO, CMO)</option>
              <option value="Owner">Owner, Partners</option>
              <option value="Vice President">Vice President</option>
              <option value="Director">Director</option>
              <option value="Manager">Manager</option>
              <option value="Analyst">Analyst</option>
              <option value="Assistant">Assistant or Associate</option>
              <option value="Administrative">Administrative</option>
              <option value="Consultant">Consultant</option>
              <option value="Intern">Intern</option>
              <option value="Volunteer">Volunteer</option>
              <option value="None">None of the above</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Industry</label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Industry"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Employment Status</label>
            <select
              name="employmentStatus"
              value={formData.employmentStatus}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">--Select--</option>
              <option value="Employed for wages">Employed for wages</option>
              <option value="Self employed">Self employed</option>
              <option value="Employed full-time">Employed full-time</option>
              <option value="Employed part-time">Employed part-time</option>
              <option value="Contract/Freelancer">Contract, Freelancer or Temporary Employee</option>
              <option value="Homemaker">A homemaker</option>
              <option value="Student">A student</option>
              <option value="Military">Military</option>
              <option value="Retired">Retired</option>
              <option value="Unable to work">Unable to work</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Primary Business</label>
            <select
              name="primaryBusiness"
              value={formData.primaryBusiness}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">--Select--</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Aerospace and Defence">Aerospace and Defence</option>
              <option value="Automotive">Automotive</option>
              <option value="Banking and Financial Service">Banking and Financial Service</option>
              <option value="Chemicals">Chemicals</option>
              <option value="Construction">Construction</option>
              <option value="eCommerce">eCommerce</option>
              <option value="Education">Education</option>
              <option value="Energy">Energy</option>
              <option value="Engineering">Engineering</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Government and Public Sector">Government and Public Sector</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Insurance">Insurance</option>
              <option value="Life Science">Life Science</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Mining and Extraction">Mining and Extraction</option>
              <option value="Non-profit Sector">Non-profit Sector</option>
              <option value="Publishing and Media">Publishing and Media</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Retail and Wholesale Trade">Retail and Wholesale Trade</option>
              <option value="Technology">Technology</option>
              <option value="Telecommunication">Telecommunication</option>
              <option value="Transport">Transport</option>
              <option value="Logistics">Logistics</option>
              <option value="Travel and Hospitality">Travel and Hospitality</option>
              <option value="Utilities">Utilities</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Number of Employees</label>
            <select
              name="numberOfEmployees"
              value={formData.numberOfEmployees}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">--Select--</option>
              <option value="1 TO 49">1 TO 49 EMPLOYEES</option>
              <option value="50 TO 249">50 TO 249 EMPLOYEES</option>
              <option value="250 TO 499">250 TO 499 EMPLOYEES</option>
              <option value="500 TO 999">500 TO 999 EMPLOYEES</option>
              <option value="1000 TO 1999">1000 TO 1999 EMPLOYEES</option>
              <option value="2000 TO 4999">2000 TO 4999 EMPLOYEES</option>
              <option value="5000+">5000+ EMPLOYEES</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Organization Revenue</label>
            <select
              name="revenueOrganization"
              value={formData.revenueOrganization}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">--Select--</option>
              <option value="UNDER $10000">UNDER $10000</option>
              <option value="$10000-$24999">$10000-$24999</option>
              <option value="$25000 - $49999">$25000 - $49999</option>
              <option value="$50000 - $99999">$50000 - $99999</option>
              <option value="$1MILLION – $4.99MILLION">$1MILLION – $4.99MILLION</option>
              <option value="$5MILLION – $9.99MILLION">$5MILLION – $9.99MILLION</option>
              <option value="$10MILLION – $49.99MILLION">$10MILLION – $49.99MILLION</option>
              <option value="$50MILLION – $99.99MILLION">$50MILLION – $99.99MILLION</option>
              <option value="$100MILLION – $249.99MILLION">$100MILLION – $249.99MILLION</option>
              <option value="$250MILLION – $499.99MILLION">$250MILLION – $499.99MILLION</option>
              <option value="$500MILLION – $999.99MILLION">$500MILLION – $999.99MILLION</option>
              <option value="$1BILLION+">$1BILLION+</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Highest Degree or Level of School</label>
            <select
              name="higherDegree"
              value={formData.higherDegree}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">--Select--</option>
              <option value="Nursery School to 8th Grade">Nursery School to 8th Grade</option>
              <option value="Some High school">Some High school</option>
              <option value="High school graduate">High school graduate</option>
              <option value="Associate degree">Associate degree</option>
              <option value="Bachelor's degree">Bachelor's degree</option>
              <option value="Master's degree">Master's degree</option>
              <option value="Professional degree">Professional degree</option>
              <option value="Doctorate degree">Doctorate degree</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Income Before Tax</label>
            <input
              type="number"
              name="incomeBeforeTax"
              value={formData.incomeBeforeTax}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Total Household Members</label>
            <input
              type="number"
              name="totalMembers"
              value={formData.totalMembers}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Number of Children</label>
            <input
              type="number"
              name="children"
              value={formData.children}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Number of Retired Persons</label>
            <input
              type="number"
              name="retiredPerson"
              value={formData.retiredPerson}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Marital Status</label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">--Select--</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:scale-105 transition"
            >
              Save & Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfessionalHouseholdModal;
