import { useState, useEffect } from 'react';

export default function UploadSlip() {
  const [uploadableUsers, setUploadableUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Fetch uploadable users
      const uploadableRes = await fetch(`${import.meta.env.VITE_API_URL}/upload/users`);
      const uploadableData = await uploadableRes.json();
      if (uploadableData.success) {
        setUploadableUsers(uploadableData.data);
      }

      // Fetch all users for display
      const allRes = await fetch(`${import.meta.env.VITE_API_URL}/upload/all-users`);
      const allData = await allRes.json();
      if (allData.success) {
        setAllUsers(allData.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleFileChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      if (file.size > 5000000) {
        setMessage({ type: 'error', text: 'ขนาดไฟล์ต้องไม่เกิน 5MB' });
        return;
      }

      setImageFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setMessage({ type: '', text: '' });
    } else {
      setMessage({ type: 'error', text: 'กรุณาเลือกไฟล์รูปภาพเท่านั้น' });
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedUser) {
      setMessage({ type: 'error', text: 'กรุณาเลือกชื่อผู้ใช้' });
      return;
    }

    if (!imageFile) {
      setMessage({ type: 'error', text: 'กรุณาเลือกไฟล์รูปภาพ' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Image = e.target.result;

        const response = await fetch(`${import.meta.env.VITE_API_URL}/upload/slip`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: selectedUser,
            image: base64Image
          })
        });

        const data = await response.json();

        if (data.success) {
          setMessage({ type: 'success', text: data.message });
          
          // Update user status in the local state immediately
          setAllUsers(prevUsers => 
            prevUsers.map(user => 
              user._id === selectedUser 
                ? { ...user, status: data.data.user.status }
                : user
            )
          );

          // Remove user from uploadable list if status changed
          setUploadableUsers(prevUsers => 
            prevUsers.filter(user => user._id !== selectedUser)
          );

          // Reset form
          setSelectedUser('');
          setImageFile(null);
          setImagePreview('');
          
          // Refresh user list from server after a short delay
          setTimeout(() => {
            fetchUsers();
          }, 1000);
          
          setTimeout(() => {
            setMessage({ type: '', text: '' });
          }, 5000);
        } else {
          setMessage({ type: 'error', text: data.message });
        }
        
        setLoading(false);
      };
      reader.readAsDataURL(imageFile);
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ type: 'error', text: 'เกิดข้อผิดพลาดในการอัพโหลด' });
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'จ่ายแล้ว': return 'bg-[#bae1be] text-green-800';
      case 'ยังไม่จ่าย': return 'bg-[#ffd1dc] text-red-800';
      case 'ส่งใหม่อีกครั้ง': return 'bg-[#ffeeb4] text-yellow-800';
      case 'รอการตรวจสอบ': return 'bg-[#b5deff] text-blue-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#fff5f7] font-['Prompt',sans-serif] p-4"
         style={{
           backgroundImage: `radial-gradient(#ffd1dc 1px, transparent 1px), radial-gradient(#b5deff 1px, transparent 1px)`,
           backgroundSize: '20px 20px',
           backgroundPosition: '0 0, 10px 10px'
         }}>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#6c5b7b] text-center mb-6 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.1)] animate-float">
          อัพโหลดสลิป
        </h1>

        {/* Upload Form */}
        <div className="bg-white/95 p-6 rounded-[20px] border-2 border-[#ffd1dc] shadow-[0_4px_6px_rgba(0,0,0,0.07)] mb-6">
          
          <div className="bg-[#b7fffa] text-gray-600 p-4 rounded-[15px] mb-6 text-sm">
            * เมื่ออัพโหลดแล้ว สถานะจะเปลี่ยนเป็น "รอการตรวจสอบ" โปรดรอการตรวจสอบจากแอดมิน
          </div>

          {message.text && (
            <div className={`p-4 rounded-[15px] mb-6 ${
              message.type === 'success' 
                ? 'bg-[#bae1be] text-green-800' 
                : 'bg-[#ffe5e5] text-red-800'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-[#6c5b7b] font-medium mb-2">
                เลือกชื่อผู้ใช้:
              </label>
              {uploadableUsers.length === 0 ? (
                <div className="bg-[#ffeeb4] text-yellow-800 p-4 rounded-[15px]">
                  มีผู้ใช้จ่ายครบหมดแล้ว หรือรอการตรวจสอบภายหลัง
                </div>
              ) : (
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  required
                  className="w-full p-3 border-2 border-[#e2d1f9] rounded-[15px] focus:border-[#b5deff] focus:outline-none"
                >
                  <option value="">กรุณาเลือกชื่อผู้ใช้</option>
                  {uploadableUsers.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name} ({user.profilename})
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-[#6c5b7b] font-medium mb-2">
                อัพโหลดสลิป:
              </label>
              
              <div
                className={`border-2 border-dashed rounded-[15px] p-8 text-center cursor-pointer transition-all ${
                  dragActive 
                    ? 'border-[#bae1be] bg-[#f0fff4]' 
                    : 'border-[#b5deff] bg-white hover:bg-[#fff5f7]'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('fileInput').click()}
              >
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files[0])}
                  className="hidden"
                />
                <p className="text-[#6c5b7b]">
                  ลากไฟล์มาวางที่นี่ หรือ คลิกเพื่อเลือกไฟล์
                </p>
              </div>

              {imagePreview && (
                <div className="mt-4 text-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full max-h-48 mx-auto rounded-[15px] shadow-md"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || uploadableUsers.length === 0}
              className="w-full p-3 bg-gradient-to-br from-[#ffd1dc] to-[#e2d1f9] text-[#6c5b7b] rounded-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_6px_rgba(0,0,0,0.07)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'กำลังอัพโหลด...' : 'อัพโหลด'}
            </button>
          </form>
        </div>

        {/* Users List */}
        <div className="bg-white/95 p-6 rounded-[20px] border-2 border-[#b5deff] shadow-[0_4px_6px_rgba(0,0,0,0.07)]">
          <h2 className="text-xl md:text-2xl font-semibold text-[#6c5b7b] mb-4">
            รายชื่อผู้ใช้ทั้งหมด
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#e2d1f9]">
                  <th className="text-left p-3 text-[#6c5b7b] font-semibold">ชื่อ</th>
                  <th className="text-left p-3 text-[#6c5b7b] font-semibold">ชื่อโปรไฟล์</th>
                  <th className="text-left p-3 text-[#6c5b7b] font-semibold">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user) => (
                  <tr key={user._id} className="border-b border-gray-200 hover:bg-[#fff5f7]">
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.profilename}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
