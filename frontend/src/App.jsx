import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddAgent from './pages/AddAgent';
import UploadCSV from './pages/UploadCSV';
        import ViewAgentTasks from './pages/ViewAgentTasks';

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/" />} />

<Route
  path="/view-tasks"
  element={isAuthenticated() ? <ViewAgentTasks /> : <Navigate to="/" />}
/>

        <Route path="/add-agent" element={isAuthenticated() ? <AddAgent /> : <Navigate to="/" />} />
        <Route path="/upload" element={isAuthenticated() ? <UploadCSV /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;