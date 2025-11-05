import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  
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
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
        setTimeout(() => setError(''), 500);
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
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-[#fff5f7]">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle, #ffd1dc 1px, transparent 1px),
            radial-gradient(circle, #b5deff 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px'
        }}
      />

      {/* Login Container */}
      <div className="relative w-full max-w-md animate-float">
        <div className="bg-white/95 backdrop-blur-sm p-8 rounded-[20px] shadow-soft border-2 border-[#ffd1dc]">
          {/* Header */}
          <h2 className="text-4xl font-semibold text-[#6c5b7b] text-center mb-8 drop-shadow-md">
            เข้าสู่ระบบ
          </h2>

          {/* Error Message */}
          {error && (
            <div 
              className={`bg-red-100 text-red-800 px-4 py-3 rounded-[10px] mb-5 text-center transition-all duration-500 ${
                showError ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
              } animate-shake`}
            >
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="form-group transition-transform duration-300 hover:scale-[1.02]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-[#e2d1f9] rounded-[15px] text-base
                  font-prompt focus:border-[#b5deff] focus:ring-4 focus:ring-[#b5deff]/30 
                  focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Password Input */}
            <div className="form-group transition-transform duration-300 hover:scale-[1.02]">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-[#e2d1f9] rounded-[15px] text-base
                  font-prompt focus:border-[#b5deff] focus:ring-4 focus:ring-[#b5deff]/30 
                  focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-gradient-to-r from-[#ffd1dc] to-[#e2d1f9] 
                text-[#6c5b7b] font-semibold text-base rounded-[15px] border-none cursor-pointer
                transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
                font-prompt"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#6c5b7b]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  กำลังเข้าสู่ระบบ...
                </span>
              ) : (
                'เข้าสู่ระบบ'
              )}
            </button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-[#b5deff]/20 rounded-[10px] border border-[#b5deff]/40">
            <p className="text-sm text-[#6c5b7b] text-center font-prompt">
              <strong>บัญชีทดสอบ:</strong><br />
              Email: admin@checkslip.com<br />
              Password: admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
