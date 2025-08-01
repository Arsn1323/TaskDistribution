import React, { useState } from 'react';
import axios from 'axios';

const UploadCSV = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('⚠️ Please select a file');

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('https://taskdistribution.onrender.com/api/lists/upload', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('✅ CSV uploaded and distributed successfully.');
      setFile(null);
    } catch (err) {
      alert(err.response?.data?.message || '❌ Upload failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-emerald-200 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md transition duration-300 ease-in-out hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Upload CSV File</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <input
            type="file"
            accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl transition duration-200"
          >
            Upload & Distribute
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadCSV;
