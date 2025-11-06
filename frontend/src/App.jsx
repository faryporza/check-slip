import { useState, useEffect } from 'react';
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import UploadSlip from './components/UploadSlip';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('upload');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsLoggedIn(!!token);

    // Simple routing based on URL hash
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('upload');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
    window.location.hash = 'dashboard';
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsLoggedIn(false);
    setCurrentPage('upload');
    window.location.hash = '';
  };

  // Public upload page (no login required)
  if (currentPage === 'upload') {
    return (
      <div>
        <div className="bg-white/95 p-4 border-b-2 border-[#ffd1dc] shadow-[0_4px_6px_rgba(0,0,0,0.07)] sticky top-0 z-10">
          <div className="max-w-7xl mx-auto flex justify-end">
            <button
              onClick={() => {
                setCurrentPage('login');
                window.location.hash = 'login';
              }}
              className="px-6 py-2 bg-gradient-to-br from-[#ffd1dc] to-[#e2d1f9] text-[#6c5b7b] rounded-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5"
            >
              🔐 Admin Login
            </button>
          </div>
        </div>
        <UploadSlip />
      </div>
    );
  }

  // Login page
  if (currentPage === 'login' && !isLoggedIn) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  // Admin pages (require login)
  if (!isLoggedIn) {
    setCurrentPage('upload');
    window.location.hash = '';
    return null;
  }

  return (
    <div className="min-h-screen bg-[#fff5f7] font-['Prompt',sans-serif]"
         style={{
           backgroundImage: `radial-gradient(#ffd1dc 1px, transparent 1px), radial-gradient(#b5deff 1px, transparent 1px)`,
           backgroundSize: '20px 20px',
           backgroundPosition: '0 0, 10px 10px'
         }}>
      
      {/* Header Navigation */}
      <div className="bg-white/95 p-4 border-b-2 border-[#ffd1dc] shadow-[0_4px_6px_rgba(0,0,0,0.07)] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <button
              onClick={() => {
                setCurrentPage('upload');
                window.location.hash = '';
              }}
              className={`px-4 py-2 rounded-[15px] font-medium transition-all ${
                currentPage === 'upload'
                  ? 'bg-gradient-to-br from-[#ffd1dc] to-[#e2d1f9] text-[#6c5b7b]'
                  : 'text-[#6c5b7b] hover:bg-[#fff5f7]'
              }`}
            >
              หน้าอัพโหลด
            </button>
            <button
              onClick={() => {
                setCurrentPage('dashboard');
                window.location.hash = 'dashboard';
              }}
              className={`px-4 py-2 rounded-[15px] font-medium transition-all ${
                currentPage === 'dashboard'
                  ? 'bg-gradient-to-br from-[#ffd1dc] to-[#e2d1f9] text-[#6c5b7b]'
                  : 'text-[#6c5b7b] hover:bg-[#fff5f7]'
              }`}
            >
              แดชบอร์ด
            </button>
            <button
              onClick={() => {
                setCurrentPage('users');
                window.location.hash = 'users';
              }}
              className={`px-4 py-2 rounded-[15px] font-medium transition-all ${
                currentPage === 'users'
                  ? 'bg-gradient-to-br from-[#ffd1dc] to-[#e2d1f9] text-[#6c5b7b]'
                  : 'text-[#6c5b7b] hover:bg-[#fff5f7]'
              }`}
            >
              จัดการผู้ใช้
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-gradient-to-br from-[#ffd1dc] to-[#e2d1f9] text-[#6c5b7b] rounded-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_6px_rgba(0,0,0,0.07)]"
          >
            ออกจากระบบ
          </button>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto">
        {currentPage === 'upload' && <UploadSlip />}
        {currentPage === 'dashboard' && <Dashboard onLogout={handleLogout} />}
        {currentPage === 'users' && <UserManagement />}
      </div>
    </div>
  );
}
