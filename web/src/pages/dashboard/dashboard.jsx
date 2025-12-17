import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import expoLogo from "../../assets/expo-logo.png";
import "./dashboard.css";

function Dashboard({ onNavigate }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavClick = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  // Different navigation for students vs admin
  const studentNavItems = [
    { path: "/student/profile", label: "My Profile", icon: "👤" },
    { path: "/student/my-project", label: "My Project", icon: "📝" },
    { path: "/student/other-projects", label: "Other Projects", icon: "📁" },
    { path: "/student/companies", label: "Companies", icon: "🏢" },
    { path: "/student/map", label: "Exhibition Map", icon: "🗺️" },
  ];

  const adminNavItems = [
    { path: "/projects", label: "Projects", icon: "📁" },
    { path: "/students", label: "Students", icon: "👥" },
    { path: "/companies", label: "Companies", icon: "🏢" },
    { path: "/map", label: "Exhibition Map", icon: "🗺️" },
  ];

  const navItems = user?.role === 'student' ? studentNavItems : adminNavItems;

  return (
    <div className="dashboard-sidebar">
      <div className="dashboard-logo">
        <div className="logo-wrapper">
          <div className="logo-icon">
            <img src={expoLogo} alt="TEDI Expo" />
          </div>
          <div>
            <h2>TEDI-Expo</h2>
            <p>Management System</p>
          </div>
        </div>
      </div>

      <nav>
        <ul className="dashboard-nav">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
                onClick={handleNavClick}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="dashboard-footer">
        {user && (
          <div className="user-info">
            <div className="user-avatar">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="user-details">
              <h4>{user.name}</h4>
              <p>{user.role || "User"}</p>
            </div>
          </div>
        )}
        <button onClick={handleLogout} className="logout-btn">
          <span>🚪</span> Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
