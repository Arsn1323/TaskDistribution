import React, { useState } from 'react';
import axios from 'axios';

const AddAgent = () => {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '' });

  const handleAddAgent = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/agents/add', form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('✅ Agent added successfully.');
      setForm({ name: '', email: '', mobile: '', password: '' });
    } catch (err) {
      alert(err.response?.data?.message || '❌ Error adding agent');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md transition duration-300 ease-in-out hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Add New Agent</h2>
        <form onSubmit={handleAddAgent} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition duration-200"
          >
            Add Agent
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAgent;
