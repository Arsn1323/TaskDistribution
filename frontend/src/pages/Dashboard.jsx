import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">Admin Dashboard</h2>
        <div className="flex flex-col gap-4">
          <Link to="/add-agent" className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-full shadow">Add Agent</Link>
          <Link to="/upload" className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-full shadow">Upload CSV</Link>
          <Link to="/view-tasks" className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-full shadow">View Agent Tasks</Link>
          <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-full shadow">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;