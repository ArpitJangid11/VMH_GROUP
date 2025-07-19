import React from 'react'
import ManageUsers from './ManageUsers';
import { Link } from 'react-router-dom';
const AdminDashboardCard = ({ title, description, bg = "bg-white", text = "text-gray-800" }) => {
  return (
    <div
      className={`rounded-xl shadow-md p-6 transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-lg cursor-pointer ${bg} ${text}`}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
};
const Admin = ({t}) => {
  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">{t.admin }{" "}{t.dashboard}</h2>
            <p className="text-gray-600">Welcome back! Here's your research activity overview.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          <Link to="/admin/manageuser">
            <AdminDashboardCard 
              title="Manage Users" 
              description="Add, remove, and update user details from this section."
            />
          </Link>
          <Link to="/admin/assignsurvey">
            <AdminDashboardCard 
              title="Assign Survey" 
              description="Track the number of surveys created and completed."
              />
          </Link>
          <Link to="/admin/managesurvey">
            <AdminDashboardCard 
              title="Manage Survey" 
              description="Review and approve reward redemption requests from users."
            />
          </Link>
          <Link to="/admin/edit-user-role">
            <AdminDashboardCard 
              title="Create Admin or User"
              description="Assign your user to admin and Admin to User"
            />
          </Link>
          <Link to="/admin/rewardpanel">
            <AdminDashboardCard 
              title="Reward Panel" 
              description="Review and approve reward redemption requests from users."
            />
          </Link>
          <Link to="/admin/profile">
            <AdminDashboardCard 
              title="Profile" 
              description="Review and approve reward redemption requests from users."
              />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Admin
