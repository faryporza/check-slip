import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

export default function UserManagement() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user'
  });

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
    }
  }, [isAdmin, navigate]);

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getAllUsers();
      setUsers(response.data.data);
    } catch (err) {
      setError('ไม่สามารถโหลดข้อมูลผู้ใช้ได้');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle add user
  const handleAddUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      console.log('Attempting to create user:', formData);
      const response = await authAPI.register(formData);
      console.log('User created successfully:', response.data);
      setSuccess('เพิ่มผู้ใช้สำเร็จ');
      setShowAddModal(false);
      setFormData({ username: '', email: '', password: '', role: 'user' });
      fetchUsers();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error creating user:', err);
      console.error('Error response:', err.response?.data);
      setError(err.response?.data?.message || 'ไม่สามารถเพิ่มผู้ใช้ได้');
    }
  };

  // Handle delete user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('คุณแน่ใจหรือไม่ที่จะลบผู้ใช้นี้?')) {
      return;
    }

    try {
      await authAPI.deleteUser(userId);
      setSuccess('ลบผู้ใช้สำเร็จ');
      fetchUsers();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('ไม่สามารถลบผู้ใช้ได้');
    }
  };

  // Handle update role
  const handleUpdateRole = async (userId, newRole) => {
    try {
      await authAPI.updateUserRole(userId, newRole);
      setSuccess('อัปเดตบทบาทสำเร็จ');
      fetchUsers();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('ไม่สามารถอัปเดตบทบาทได้');
    }
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
                👥 จัดการผู้ใช้
              </h1>
              <p style={{ color: '#6c5b7b', opacity: 0.7, fontFamily: "'Prompt', sans-serif" }}>
                จำนวนผู้ใช้ทั้งหมด: {users.length} คน
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowAddModal(true)}
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
                  background: 'linear-gradient(45deg, #bae1be, #b5deff)',
                  color: '#6c5b7b',
                  fontWeight: '600',
                  borderRadius: '15px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontFamily: "'Prompt', sans-serif"
                }}
              >
                ➕ เพิ่มผู้ใช้
              </button>
              <button
                onClick={() => navigate('/dashboard')}
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
                ← กลับ
              </button>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div 
            style={{
              background: '#d4edda',
              color: '#155724',
              padding: '12px',
              borderRadius: '10px',
              marginBottom: '20px',
              textAlign: 'center',
              animation: 'shake 0.5s ease-in-out',
              fontFamily: "'Prompt', sans-serif"
            }}
          >
            {success}
          </div>
        )}
        {error && (
          <div 
            style={{
              background: '#f8d7da',
              color: '#721c24',
              padding: '12px',
              borderRadius: '10px',
              marginBottom: '20px',
              textAlign: 'center',
              animation: 'shake 0.5s ease-in-out',
              fontFamily: "'Prompt', sans-serif"
            }}
          >
            {error}
          </div>
        )}

        {/* Users Table */}
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
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6c5b7b', fontFamily: "'Prompt', sans-serif" }}>
              กำลังโหลด...
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e2d1f9' }}>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#6c5b7b', fontFamily: "'Prompt', sans-serif" }}>Username</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#6c5b7b', fontFamily: "'Prompt', sans-serif" }}>Email</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#6c5b7b', fontFamily: "'Prompt', sans-serif" }}>Role</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#6c5b7b', fontFamily: "'Prompt', sans-serif" }}>สถานะ</th>
                    <th style={{ padding: '12px', textAlign: 'center', color: '#6c5b7b', fontFamily: "'Prompt', sans-serif" }}>จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} style={{ borderBottom: '1px solid rgba(226, 209, 249, 0.3)' }}>
                      <td style={{ padding: '12px', color: '#6c5b7b', fontFamily: "'Prompt', sans-serif" }}>{u.username}</td>
                      <td style={{ padding: '12px', color: '#6c5b7b', fontFamily: "'Prompt', sans-serif" }}>{u.email}</td>
                      <td style={{ padding: '12px', fontFamily: "'Prompt', sans-serif" }}>
                        <select
                          value={u.role}
                          onChange={(e) => handleUpdateRole(u._id, e.target.value)}
                          disabled={u._id === user?.id}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '10px',
                            border: '2px solid #e2d1f9',
                            color: '#6c5b7b',
                            fontFamily: "'Prompt', sans-serif",
                            cursor: u._id === user?.id ? 'not-allowed' : 'pointer'
                          }}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td style={{ padding: '12px', fontFamily: "'Prompt', sans-serif" }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '10px',
                          backgroundColor: u.isActive ? 'rgba(186, 225, 190, 0.3)' : 'rgba(255, 209, 220, 0.3)',
                          color: '#6c5b7b',
                          fontSize: '0.875rem'
                        }}>
                          {u.isActive ? '✓ Active' : '✗ Inactive'}
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        {u._id !== user?.id && (
                          <button
                            onClick={() => handleDeleteUser(u._id)}
                            style={{
                              padding: '6px 16px',
                              background: 'linear-gradient(45deg, #ffd1dc, #e2d1f9)',
                              color: '#6c5b7b',
                              border: 'none',
                              borderRadius: '10px',
                              cursor: 'pointer',
                              fontFamily: "'Prompt', sans-serif",
                              fontSize: '0.875rem'
                            }}
                          >
                            🗑️ ลบ
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setShowAddModal(false)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '30px',
              borderRadius: '20px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
              border: '2px solid #ffd1dc',
              maxWidth: '500px',
              width: '100%'
            }}
          >
            <h2 
              style={{
                color: '#6c5b7b',
                textAlign: 'center',
                marginBottom: '24px',
                fontSize: '1.5rem',
                fontFamily: "'Prompt', sans-serif"
              }}
            >
              ➕ เพิ่มผู้ใช้ใหม่
            </h2>

            <form onSubmit={handleAddUser}>
              <div style={{ marginBottom: '16px' }}>
                <input
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2d1f9',
                    borderRadius: '15px',
                    fontSize: '16px',
                    fontFamily: "'Prompt', sans-serif",
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2d1f9',
                    borderRadius: '15px',
                    fontSize: '16px',
                    fontFamily: "'Prompt', sans-serif",
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <input
                  type="password"
                  placeholder="Password (อย่างน้อย 6 ตัวอักษร)"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                  minLength={6}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2d1f9',
                    borderRadius: '15px',
                    fontSize: '16px',
                    fontFamily: "'Prompt', sans-serif",
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2d1f9',
                    borderRadius: '15px',
                    fontSize: '16px',
                    fontFamily: "'Prompt', sans-serif",
                    outline: 'none'
                  }}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'linear-gradient(45deg, #bae1be, #b5deff)',
                    color: '#6c5b7b',
                    fontWeight: '600',
                    border: 'none',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    fontFamily: "'Prompt', sans-serif"
                  }}
                >
                  เพิ่มผู้ใช้
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'linear-gradient(45deg, #ffd1dc, #e2d1f9)',
                    color: '#6c5b7b',
                    fontWeight: '600',
                    border: 'none',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    fontFamily: "'Prompt', sans-serif"
                  }}
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
