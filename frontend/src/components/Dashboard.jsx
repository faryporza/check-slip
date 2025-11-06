import { useState, useEffect } from 'react';

export default function Dashboard({ onLogout }) {
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({
    totalSlips: 0,
    pendingSlips: 0,
    verifiedSlips: 0,
    rejectedSlips: 0
  });

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('adminToken');
    const adminUser = localStorage.getItem('adminUser');

    if (!token || !adminUser) {
      if (onLogout) {
        onLogout();
      }
      return;
    }

    setAdmin(JSON.parse(adminUser));
    fetchStats(token);
  }, [onLogout]);

  const fetchStats = async (token) => {
    try {
      // Example: Fetch statistics from API
      const response = await fetch(`${import.meta.env.VITE_API_URL}/slips/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data.data);
      } else {
        // For now, using mock data if API fails
        setStats({
          totalSlips: 150,
          pendingSlips: 25,
          verifiedSlips: 100,
          rejectedSlips: 25
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Using mock data on error
      setStats({
        totalSlips: 150,
        pendingSlips: 25,
        verifiedSlips: 100,
        rejectedSlips: 25
      });
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  if (!admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#fff5f7] font-['Prompt',sans-serif] p-6"
         style={{
           backgroundImage: `radial-gradient(#ffd1dc 1px, transparent 1px), radial-gradient(#b5deff 1px, transparent 1px)`,
           backgroundSize: '20px 20px',
           backgroundPosition: '0 0, 10px 10px'
         }}>
      
      {/* Header */}
      <div className="bg-white/95 p-6 rounded-[20px] border-2 border-[#ffd1dc] shadow-[0_4px_6px_rgba(0,0,0,0.07)] mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-[#6c5b7b] drop-shadow-[2px_2px_4px_rgba(0,0,0,0.1)]">
              แดชบอร์ด
            </h1>
            <p className="text-gray-600 mt-1">ยินดีต้อนรับ, {admin.username}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-gradient-to-br from-[#ffd1dc] to-[#e2d1f9] text-[#6c5b7b] rounded-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_6px_rgba(0,0,0,0.07)]"
          >
            ออกจากระบบ
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Slips */}
        <div className="bg-white/95 p-6 rounded-[20px] border-2 border-[#b5deff] shadow-[0_4px_6px_rgba(0,0,0,0.07)] transition-transform duration-300 hover:scale-105 animate-float"
             style={{ animationDelay: '0s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">สลิปทั้งหมด</p>
              <p className="text-3xl font-bold text-[#6c5b7b]">{stats.totalSlips}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-[#b5deff] to-[#e2d1f9] rounded-full flex items-center justify-center">
              <span className="text-2xl">📄</span>
            </div>
          </div>
        </div>

        {/* Pending Slips */}
        <div className="bg-white/95 p-6 rounded-[20px] border-2 border-[#ffd1dc] shadow-[0_4px_6px_rgba(0,0,0,0.07)] transition-transform duration-300 hover:scale-105 animate-float"
             style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">รอตรวจสอบ</p>
              <p className="text-3xl font-bold text-[#6c5b7b]">{stats.pendingSlips}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-[#ffd1dc] to-[#e2d1f9] rounded-full flex items-center justify-center">
              <span className="text-2xl">⏳</span>
            </div>
          </div>
        </div>

        {/* Verified Slips */}
        <div className="bg-white/95 p-6 rounded-[20px] border-2 border-[#bae1be] shadow-[0_4px_6px_rgba(0,0,0,0.07)] transition-transform duration-300 hover:scale-105 animate-float"
             style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">ยืนยันแล้ว</p>
              <p className="text-3xl font-bold text-[#6c5b7b]">{stats.verifiedSlips}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-[#bae1be] to-[#e2d1f9] rounded-full flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        {/* Rejected Slips */}
        <div className="bg-white/95 p-6 rounded-[20px] border-2 border-[#e2d1f9] shadow-[0_4px_6px_rgba(0,0,0,0.07)] transition-transform duration-300 hover:scale-105 animate-float"
             style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">ปฏิเสธ</p>
              <p className="text-3xl font-bold text-[#6c5b7b]">{stats.rejectedSlips}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-[#e2d1f9] to-[#ffd1dc] rounded-full flex items-center justify-center">
              <span className="text-2xl">❌</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/95 p-6 rounded-[20px] border-2 border-[#e2d1f9] shadow-[0_4px_6px_rgba(0,0,0,0.07)] mb-6">
        <h2 className="text-xl font-semibold text-[#6c5b7b] mb-4">เมนูด่วน</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-gradient-to-br from-[#b5deff] to-[#e2d1f9] rounded-[15px] text-[#6c5b7b] font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_6px_8px_rgba(0,0,0,0.1)]">
            📋 ดูสลิปทั้งหมด
          </button>
          <button className="p-4 bg-gradient-to-br from-[#ffd1dc] to-[#e2d1f9] rounded-[15px] text-[#6c5b7b] font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_6px_8px_rgba(0,0,0,0.1)]">
            ⏳ ตรวจสอบสลิป
          </button>
          <button className="p-4 bg-gradient-to-br from-[#bae1be] to-[#e2d1f9] rounded-[15px] text-[#6c5b7b] font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_6px_8px_rgba(0,0,0,0.1)]">
            📊 รายงาน
          </button>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white/95 p-6 rounded-[20px] border-2 border-[#ffd1dc] shadow-[0_4px_6px_rgba(0,0,0,0.07)]">
        <h2 className="text-xl font-semibold text-[#6c5b7b] mb-4">กิจกรรมล่าสุด</h2>
        <div className="space-y-3">
          <div className="p-4 bg-gradient-to-r from-[#b5deff]/20 to-transparent rounded-[15px] border-l-4 border-[#b5deff]">
            <p className="text-[#6c5b7b] font-medium">สลิปใหม่รอการตรวจสอบ</p>
            <p className="text-gray-600 text-sm">5 นาทีที่แล้ว</p>
          </div>
          <div className="p-4 bg-gradient-to-r from-[#bae1be]/20 to-transparent rounded-[15px] border-l-4 border-[#bae1be]">
            <p className="text-[#6c5b7b] font-medium">ยืนยันสลิป #12345</p>
            <p className="text-gray-600 text-sm">15 นาทีที่แล้ว</p>
          </div>
          <div className="p-4 bg-gradient-to-r from-[#ffd1dc]/20 to-transparent rounded-[15px] border-l-4 border-[#ffd1dc]">
            <p className="text-[#6c5b7b] font-medium">สลิปใหม่รอการตรวจสอบ</p>
            <p className="text-gray-600 text-sm">30 นาทีที่แล้ว</p>
          </div>
        </div>
      </div>
    </div>
  );
}
