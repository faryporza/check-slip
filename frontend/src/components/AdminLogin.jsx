import { useState } from 'react';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'เข้าสู่ระบบไม่สำเร็จ');
        return;
      }

      // Save token to localStorage
      localStorage.setItem('adminToken', data.data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.data.admin));

      // Call onLoginSuccess callback
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-[#fff5f7] font-['Prompt',sans-serif]"
         style={{
           backgroundImage: `radial-gradient(#ffd1dc 1px, transparent 1px), radial-gradient(#b5deff 1px, transparent 1px)`,
           backgroundSize: '20px 20px',
           backgroundPosition: '0 0, 10px 10px'
         }}>
      
      <div className="bg-white/95 p-8 rounded-[20px] w-full max-w-[400px] border-2 border-[#ffd1dc] shadow-[0_4px_6px_rgba(0,0,0,0.07)] animate-float">
        
        <h2 className="text-[#6c5b7b] text-center mb-8 text-4xl font-semibold drop-shadow-[2px_2px_4px_rgba(0,0,0,0.1)]">
          เข้าสู่ระบบ
        </h2>
        
        {error && (
          <div className="bg-[#f8d7da] text-[#721c24] p-3 rounded-[10px] mb-5 text-center animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5 transition-transform duration-300 focus-within:scale-[1.02]">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full p-3 border-2 border-[#e2d1f9] rounded-[15px] text-base transition-all duration-300 font-['Prompt',sans-serif] focus:border-[#b5deff] focus:shadow-[0_0_0_3px_rgba(181,222,255,0.3)] focus:outline-none"
            />
          </div>
          
          <div className="mb-5 transition-transform duration-300 focus-within:scale-[1.02]">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-3 border-2 border-[#e2d1f9] rounded-[15px] text-base transition-all duration-300 font-['Prompt',sans-serif] focus:border-[#b5deff] focus:shadow-[0_0_0_3px_rgba(181,222,255,0.3)] focus:outline-none"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-gradient-to-br from-[#ffd1dc] to-[#e2d1f9] text-[#6c5b7b] border-none rounded-[15px] text-base font-semibold cursor-pointer transition-all duration-300 font-['Prompt',sans-serif] hover:-translate-y-0.5 hover:shadow-[0_4px_6px_rgba(0,0,0,0.07)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>
      </div>
    </div>
  );
}
