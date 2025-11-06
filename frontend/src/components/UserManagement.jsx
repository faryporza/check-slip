import { useState, useEffect } from 'react';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    profilename: '',
    status: 'ยังไม่จ่าย'
  });
  const [stats, setStats] = useState({ total: 0, byStatus: [] });

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingUser
        ? `${import.meta.env.VITE_API_URL}/users/${editingUser._id}`
        : `${import.meta.env.VITE_API_URL}/users`;

      const response = await fetch(url, {
        method: editingUser ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setShowModal(false);
        setFormData({ name: '', profilename: '', status: 'ยังไม่จ่าย' });
        setEditingUser(null);
        fetchUsers();
        fetchStats();
      }
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      profilename: user.profilename,
      status: user.status
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('คุณแน่ใจหรือไม่ที่จะลบผู้ใช้นี้?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        fetchUsers();
        fetchStats();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'จ่ายแล้ว': return 'bg-[#bae1be] text-green-800';
      case 'ยังไม่จ่าย': return 'bg-[#ffd1dc] text-red-800';
      case 'ส่งใหม่อีกครั้ง': return 'bg-[#e2d1f9] text-purple-800';
      case 'รอการตรวจสอบ': return 'bg-[#b5deff] text-blue-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white/95 p-6 rounded-[20px] border-2 border-[#ffd1dc] shadow-[0_4px_6px_rgba(0,0,0,0.07)] mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#6c5b7b]">จัดการผู้ใช้</h2>
          <button
            onClick={() => {
              setEditingUser(null);
              setFormData({ name: '', profilename: '', status: 'ยังไม่จ่าย' });
              setShowModal(true);
            }}
            className="px-6 py-2 bg-gradient-to-br from-[#bae1be] to-[#e2d1f9] text-[#6c5b7b] rounded-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_6px_rgba(0,0,0,0.07)]"
          >
            + เพิ่มผู้ใช้
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-gradient-to-br from-[#b5deff]/20 to-transparent rounded-[15px] border-l-4 border-[#b5deff]">
            <p className="text-sm text-gray-600">ทั้งหมด</p>
            <p className="text-2xl font-bold text-[#6c5b7b]">{stats.total}</p>
          </div>
          {stats.byStatus.map((stat) => (
            <div key={stat._id} className="p-4 bg-gradient-to-br from-[#ffd1dc]/20 to-transparent rounded-[15px] border-l-4 border-[#ffd1dc]">
              <p className="text-sm text-gray-600">{stat._id}</p>
              <p className="text-2xl font-bold text-[#6c5b7b]">{stat.count}</p>
            </div>
          ))}
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[#e2d1f9]">
                <th className="text-left p-3 text-[#6c5b7b] font-semibold">ชื่อ</th>
                <th className="text-left p-3 text-[#6c5b7b] font-semibold">ชื่อโปรไฟล์</th>
                <th className="text-left p-3 text-[#6c5b7b] font-semibold">สถานะ</th>
                <th className="text-center p-3 text-[#6c5b7b] font-semibold">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center p-8 text-gray-500">
                    กำลังโหลด...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-8 text-gray-500">
                    ไม่มีข้อมูล
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="border-b border-gray-200 hover:bg-[#fff5f7] transition-colors">
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.profilename}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="px-4 py-1 bg-[#b5deff] text-[#6c5b7b] rounded-[10px] font-medium hover:shadow-md transition-all"
                        >
                          แก้ไข
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="px-4 py-1 bg-[#ffd1dc] text-[#6c5b7b] rounded-[10px] font-medium hover:shadow-md transition-all"
                        >
                          ลบ
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[20px] p-6 w-full max-w-md border-2 border-[#ffd1dc]">
            <h3 className="text-xl font-semibold text-[#6c5b7b] mb-4">
              {editingUser ? 'แก้ไขผู้ใช้' : 'เพิ่มผู้ใช้ใหม่'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-[#6c5b7b] mb-2">ชื่อ</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full p-3 border-2 border-[#e2d1f9] rounded-[15px] focus:border-[#b5deff] focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#6c5b7b] mb-2">ชื่อโปรไฟล์</label>
                <input
                  type="text"
                  value={formData.profilename}
                  onChange={(e) => setFormData({ ...formData, profilename: e.target.value })}
                  required
                  className="w-full p-3 border-2 border-[#e2d1f9] rounded-[15px] focus:border-[#b5deff] focus:outline-none"
                />
              </div>
              <div className="mb-6">
                <label className="block text-[#6c5b7b] mb-2">สถานะ</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full p-3 border-2 border-[#e2d1f9] rounded-[15px] focus:border-[#b5deff] focus:outline-none"
                >
                  <option value="ยังไม่จ่าย">ยังไม่จ่าย</option>
                  <option value="จ่ายแล้ว">จ่ายแล้ว</option>
                  <option value="รอการตรวจสอบ">รอการตรวจสอบ</option>
                  <option value="ส่งใหม่อีกครั้ง">ส่งใหม่อีกครั้ง</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 p-3 bg-gradient-to-br from-[#bae1be] to-[#e2d1f9] text-[#6c5b7b] rounded-[15px] font-semibold hover:-translate-y-0.5 transition-all disabled:opacity-50"
                >
                  {loading ? 'กำลังบันทึก...' : 'บันทึก'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingUser(null);
                    setFormData({ name: '', profilename: '', status: 'ยังไม่จ่าย' });
                  }}
                  className="flex-1 p-3 bg-gradient-to-br from-[#ffd1dc] to-[#e2d1f9] text-[#6c5b7b] rounded-[15px] font-semibold hover:-translate-y-0.5 transition-all"
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
