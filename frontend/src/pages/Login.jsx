import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Auto-hide error message
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        const errorElement = document.querySelector('.error-message');
        if (errorElement) {
          errorElement.style.opacity = '0';
          errorElement.style.transform = 'translateY(-10px)';
          setTimeout(() => setError(''), 500);
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      }
    } catch {
      setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = (e) => {
    e.target.parentElement.style.transform = 'scale(1.02)';
    e.target.style.borderColor = '#b5deff';
    e.target.style.boxShadow = '0 0 0 3px rgba(181, 222, 255, 0.3)';
  };

  const handleBlur = (e) => {
    e.target.parentElement.style.transform = 'scale(1)';
    e.target.style.borderColor = '#e2d1f9';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-5"
      style={{
        fontFamily: "'Prompt', sans-serif",
        backgroundColor: '#fff5f7',
        backgroundImage: 'radial-gradient(#ffd1dc 1px, transparent 1px), radial-gradient(#b5deff 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px'
      }}
    >
      {/* Login Container */}
      <div 
        className="w-full"
        style={{
          maxWidth: '400px',
          animation: 'float 3s ease-in-out infinite'
        }}
      >
        <div 
          style={{ 
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '30px',
            borderRadius: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
            border: '2px solid #ffd1dc'
          }}
        >
          {/* Header */}
          <h2 
            style={{ 
              color: '#6c5b7b',
              textAlign: 'center',
              marginBottom: '30px',
              fontSize: '2em',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
              fontFamily: "'Prompt', sans-serif"
            }}
          >
            เข้าสู่ระบบ
          </h2>

          {/* Error Message */}
          {error && (
            <div 
              className="error-message"
              style={{
                background: '#f8d7da',
                color: '#721c24',
                padding: '10px',
                borderRadius: '10px',
                marginBottom: '20px',
                textAlign: 'center',
                animation: 'shake 0.5s ease-in-out',
                transition: 'all 0.5s ease'
              }}
            >
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div 
              className="form-group"
              style={{ 
                marginBottom: '20px',
                transition: 'transform 0.3s'
              }}
            >
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Username"
                required
                disabled={loading}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e2d1f9',
                  borderRadius: '15px',
                  fontSize: '16px',
                  transition: 'all 0.3s',
                  fontFamily: "'Prompt', sans-serif",
                  outline: 'none'
                }}
              />
            </div>

            {/* Password Input */}
            <div 
              className="form-group"
              style={{ 
                marginBottom: '20px',
                transition: 'transform 0.3s'
              }}
            >
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                disabled={loading}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e2d1f9',
                  borderRadius: '15px',
                  fontSize: '16px',
                  transition: 'all 0.3s',
                  fontFamily: "'Prompt', sans-serif",
                  outline: 'none'
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.07)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
              style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(45deg, #ffd1dc, #e2d1f9)',
                color: '#6c5b7b',
                border: 'none',
                borderRadius: '15px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                fontFamily: "'Prompt', sans-serif",
                opacity: loading ? 0.5 : 1
              }}
            >
              {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
