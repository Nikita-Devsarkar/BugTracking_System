import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/Login'
import AdminDashboard from "./pages/AdminDashboard";
import DeveloperDashboard from "./pages/DeveloperDashboard";
import TesterDashboard from "./pages/TesterDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ReportBug from "./pages/ReportBug";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route
          path="/developer"
            element={
              <ProtectedRoute>
                  <DeveloperDashboard />
              </ProtectedRoute>
          }
        />

        <Route
            path="/tester"
            element={
                <ProtectedRoute>
                    <TesterDashboard />
                </ProtectedRoute>
            }
        />
        <Route
            path="/report-bug"
            element={
                <ProtectedRoute>
                    <ReportBug />
                </ProtectedRoute>
            }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App
