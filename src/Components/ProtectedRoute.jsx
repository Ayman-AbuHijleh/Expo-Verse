import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#6b7280'
      }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Redirect to appropriate dashboard based on role
  if (location.pathname === '/') {
    if (user.role === 'student') {
      return <Navigate to="/student/profile" replace />;
    } else {
      return <Navigate to="/projects" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;
