import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddAgent from './pages/AddAgent';
import UploadCSV from './pages/UploadCSV';
import ViewAgentTasks from './pages/ViewAgentTasks';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/view-tasks"
          element={
            <PrivateRoute>
              <ViewAgentTasks />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-agent"
          element={
            <PrivateRoute>
              <AddAgent />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <UploadCSV />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
