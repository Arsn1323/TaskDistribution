import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://taskdistribution.onrender.com/api/auth/register', form);
      alert('✅ Registration successful. Please login.');
      navigate('/');
    } catch (err) {
  const message = err.response?.data?.message || 'Registration failed';
  if (message.includes('disabled')) {
    alert(message);
    navigate('/');
  } else {
    alert(message);
  }
}}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-100 to-green-200 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md transition duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Admin Registration</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl transition duration-200"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 text-sm">
          Already registered?{' '}
          <span
            onClick={() => navigate('/')}
            className="text-green-600 font-semibold cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
