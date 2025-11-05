import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        padding: '32px',
        fontFamily: "'Prompt', sans-serif",
        backgroundColor: '#fff5f7',
        backgroundImage: 'radial-gradient(#ffd1dc 1px, transparent 1px), radial-gradient(#b5deff 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px'
      }}
    >
      <div style={{ maxWidth: '1152px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <div 
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            padding: '24px',
            borderRadius: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
            border: '2px solid #ffd1dc',
            marginBottom: '24px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 
                style={{
                  fontSize: '1.875rem',
                  fontWeight: '600',
                  color: '#6c5b7b',
                  marginBottom: '8px',
                  fontFamily: "'Prompt', sans-serif"
                }}
              >
                ยินดีต้อนรับ, {user?.username}! 👋
              </h1>
              <p style={{ color: '#6c5b7b', opacity: 0.7, fontFamily: "'Prompt', sans-serif" }}>
                อีเมล: {user?.email} | บทบาท: {user?.role === 'admin' ? 'ผู้ดูแลระบบ' : 'ผู้ใช้'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.07)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(45deg, #ffd1dc, #e2d1f9)',
                color: '#6c5b7b',
                fontWeight: '600',
                borderRadius: '15px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontFamily: "'Prompt', sans-serif"
              }}
            >
              ออกจากระบบ
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {/* User Info Card */}
          <div 
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              padding: '24px',
              borderRadius: '20px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
              border: '2px solid #b5deff'
            }}
          >
            <h2 
              style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#6c5b7b',
                marginBottom: '16px',
                fontFamily: "'Prompt', sans-serif"
              }}
            >
              ข้อมูลผู้ใช้
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '12px', backgroundColor: 'rgba(255, 209, 220, 0.2)', borderRadius: '10px' }}>
                <p style={{ fontSize: '0.875rem', color: '#6c5b7b', opacity: 0.7, marginBottom: '4px', fontFamily: "'Prompt', sans-serif" }}>ID</p>
                <p style={{ color: '#6c5b7b', fontWeight: '500', fontFamily: "'Prompt', sans-serif" }}>{user?.id}</p>
              </div>
              <div style={{ padding: '12px', backgroundColor: 'rgba(181, 222, 255, 0.2)', borderRadius: '10px' }}>
                <p style={{ fontSize: '0.875rem', color: '#6c5b7b', opacity: 0.7, marginBottom: '4px', fontFamily: "'Prompt', sans-serif" }}>Username</p>
                <p style={{ color: '#6c5b7b', fontWeight: '500', fontFamily: "'Prompt', sans-serif" }}>{user?.username}</p>
              </div>
              <div style={{ padding: '12px', backgroundColor: 'rgba(186, 225, 190, 0.2)', borderRadius: '10px' }}>
                <p style={{ fontSize: '0.875rem', color: '#6c5b7b', opacity: 0.7, marginBottom: '4px', fontFamily: "'Prompt', sans-serif" }}>Email</p>
                <p style={{ color: '#6c5b7b', fontWeight: '500', fontFamily: "'Prompt', sans-serif" }}>{user?.email}</p>
              </div>
              <div style={{ padding: '12px', backgroundColor: 'rgba(226, 209, 249, 0.2)', borderRadius: '10px' }}>
                <p style={{ fontSize: '0.875rem', color: '#6c5b7b', opacity: 0.7, marginBottom: '4px', fontFamily: "'Prompt', sans-serif" }}>Role</p>
                <p style={{ color: '#6c5b7b', fontWeight: '500', fontFamily: "'Prompt', sans-serif" }}>
                  {user?.role === 'admin' ? '👑 ผู้ดูแลระบบ' : '👤 ผู้ใช้'}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Card */}
          <div 
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              padding: '24px',
              borderRadius: '20px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
              border: '2px solid #bae1be'
            }}
          >
            <h2 
              style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#6c5b7b',
                marginBottom: '16px',
                fontFamily: "'Prompt', sans-serif"
              }}
            >
              เมนูหลัก
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 209, 220, 0.4)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 209, 220, 0.2)';
                  e.target.style.transform = 'translateY(0)';
                }}
                style={{
                  width: '100%',
                  padding: '16px',
                  textAlign: 'left',
                  backgroundColor: 'rgba(255, 209, 220, 0.2)',
                  borderRadius: '15px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  color: '#6c5b7b',
                  fontWeight: '500',
                  fontFamily: "'Prompt', sans-serif"
                }}
              >
                📋 ตรวจสอบสลิป
              </button>
              <button 
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(181, 222, 255, 0.4)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(181, 222, 255, 0.2)';
                  e.target.style.transform = 'translateY(0)';
                }}
                style={{
                  width: '100%',
                  padding: '16px',
                  textAlign: 'left',
                  backgroundColor: 'rgba(181, 222, 255, 0.2)',
                  borderRadius: '15px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  color: '#6c5b7b',
                  fontWeight: '500',
                  fontFamily: "'Prompt', sans-serif"
                }}
              >
                📊 รายงาน
              </button>
              {user?.role === 'admin' && (
                <button 
                  onClick={() => navigate('/users')}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(226, 209, 249, 0.4)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(226, 209, 249, 0.2)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                  style={{
                    width: '100%',
                    padding: '16px',
                    textAlign: 'left',
                    backgroundColor: 'rgba(226, 209, 249, 0.2)',
                    borderRadius: '15px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    color: '#6c5b7b',
                    fontWeight: '500',
                    fontFamily: "'Prompt', sans-serif"
                  }}
                >
                  👥 จัดการผู้ใช้
                </button>
              )}
              <button 
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(186, 225, 190, 0.4)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(186, 225, 190, 0.2)';
                  e.target.style.transform = 'translateY(0)';
                }}
                style={{
                  width: '100%',
                  padding: '16px',
                  textAlign: 'left',
                  backgroundColor: 'rgba(186, 225, 190, 0.2)',
                  borderRadius: '15px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  color: '#6c5b7b',
                  fontWeight: '500',
                  fontFamily: "'Prompt', sans-serif"
                }}
              >
                ⚙️ ตั้งค่า
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
