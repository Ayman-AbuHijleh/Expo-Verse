import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import expoLogo from '../../assets/expo-logo.png';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">
            <img src={expoLogo} alt="TEDI Expo" />
          </div>
          <h1>Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email or Username</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="forgot-password">
            <a href="#" className="forgot-link">Forgot Password?</a>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'SIGNING IN...' : 'LOGIN'}
          </button>
        </form>

        <div className="auth-divider">
          <div className="auth-divider-line"></div>
          <span className="auth-divider-text">or continue with</span>
          <div className="auth-divider-line"></div>
        </div>

        <div className="social-login">
          <button className="social-button" type="button">📧</button>
          <button className="social-button" type="button">🍎</button>
          <button className="social-button" type="button">📘</button>
        </div>

        <p className="auth-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

