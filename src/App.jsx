import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

// Auth Pages
import Login from "./pages/login/login.jsx";
import SignUp from "./pages/signup/signup.jsx";
import Verify from "./pages/verify/verify.jsx";

// Admin Pages
import Projects from "./pages/projects/projects.jsx";
import Students from "./pages/students/students.jsx";
import Companies from "./pages/companies/companies.jsx";
import Map from "./pages/map/map.jsx";

// Student Pages
import MyProfile from "./pages/student/myProfile/myProfile.jsx";
import MyProject from "./pages/student/myProject/myProject.jsx";
import OtherProjects from "./pages/student/otherProjects/otherProjects.jsx";

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify" element={<Verify />} />

          {/* Student Routes */}
          <Route
            path="/student/profile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/my-project"
            element={
              <ProtectedRoute>
                <MyProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/other-projects"
            element={
              <ProtectedRoute>
                <OtherProjects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/companies"
            element={
              <ProtectedRoute>
                <Companies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/map"
            element={
              <ProtectedRoute>
                <Map />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes - Projects is now the default home */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/students"
            element={
              <ProtectedRoute>
                <Students />
              </ProtectedRoute>
            }
          />
          <Route
            path="/companies"
            element={
              <ProtectedRoute>
                <Companies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <Map />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
