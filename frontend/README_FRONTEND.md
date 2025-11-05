# Check Slip - Frontend

## 🎨 Login Page with Pastel Theme

Frontend สำหรับระบบ Check Slip พร้อมหน้า Login ที่มี Pastel Theme สวยงาม

## 🚀 การเริ่มใช้งาน

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. ตั้งค่า Environment Variables
สร้างไฟล์ `.env` ในโฟลเดอร์ frontend:
```env
VITE_API_URL=http://localhost:3000/api
```

### 3. เริ่มต้น Development Server
```bash
npm run dev
```

Frontend จะรันที่ `http://localhost:5173`

## 📁 โครงสร้างโปรเจค

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Login.jsx          # หน้า Login
│   │   └── Dashboard.jsx      # หน้า Dashboard
│   ├── context/
│   │   └── AuthContext.jsx    # Context สำหรับ Authentication
│   ├── services/
│   │   └── api.js             # API Service & Axios Config
│   ├── components/            # Components อื่นๆ
│   ├── App.jsx                # Main App with Routes
│   ├── main.jsx               # Entry Point
│   └── index.css              # Global Styles
├── .env                       # Environment Variables
└── package.json
```

## 🎨 Design Features

### Pastel Color Palette
- **Pastel Pink**: #ffd1dc
- **Pastel Blue**: #b5deff
- **Pastel Green**: #bae1be
- **Pastel Purple**: #e2d1f9
- **Text Color**: #6c5b7b

### Animations
- **Float Animation**: Login container มีการลอยขึ้นลง
- **Shake Animation**: Error message มีการสั่น
- **Hover Effects**: Input และ Button มีการขยายเมื่อ hover
- **Smooth Transitions**: การเปลี่ยนแปลงทุกอย่างมีความนุ่มนวล

### Font
- **Prompt** (Google Fonts): ฟอนต์ภาษาไทยที่สวยงาม

## 🔐 การใช้งาน Login

### บัญชีทดสอบ (Admin)
```
Email: admin@checkslip.com
Password: admin123
```

### Flow การทำงาน
1. เปิด `http://localhost:5173`
2. ถ้ายังไม่ได้ login จะถูก redirect ไปหน้า `/login`
3. กรอก Email และ Password
4. กดปุ่ม "เข้าสู่ระบบ"
5. ระบบจะตรวจสอบข้อมูลกับ Backend API
6. ถ้าสำเร็จจะ redirect ไปหน้า `/dashboard`
7. ระบบจะเก็บ Token และข้อมูลผู้ใช้ใน localStorage

## 🛡️ Protected Routes

### Public Routes (ไม่ต้อง login)
- `/login` - หน้า Login

### Protected Routes (ต้อง login)
- `/dashboard` - หน้า Dashboard
- `/` - Redirect to Dashboard

### Route Protection
- ถ้าไม่ได้ login พยายามเข้า protected routes → redirect to `/login`
- ถ้า login แล้วพยายามเข้าหน้า login → redirect to `/dashboard`
- Token หมดอายุ → Auto logout และ redirect to `/login`

## 🔧 Technologies

- **React 19** - UI Library
- **React Router DOM** - Routing
- **Axios** - HTTP Client
- **Tailwind CSS 4** - Styling
- **Vite** - Build Tool
- **Context API** - State Management

## 📱 Responsive Design

- รองรับทุกขนาดหน้าจอ
- Mobile First Approach
- Smooth animations on all devices

## 🎯 Features

### Authentication System
- Login with Email & Password
- Auto token management
- Token refresh handling
- Protected routes
- Auto redirect on authentication state change

### User Interface
- Beautiful pastel theme
- Smooth animations
- Error handling with friendly messages
- Loading states
- Auto-hide error messages (3 seconds)

### API Integration
- Axios interceptors for token management
- Auto logout on 401 errors
- Centralized API calls
- Error handling

## 🔄 API Endpoints ที่ใช้

- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/register` - Register (if needed)

## 📝 การใช้งาน Auth Context

```jsx
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, isAdmin, login, logout, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user.username}!</p>
          {isAdmin && <p>You are an admin!</p>}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
}
```

## 🐛 Debugging

### Check if Backend is running
```bash
curl http://localhost:3000/api/health
```

### Check Environment Variables
```bash
echo $VITE_API_URL
```

### Clear LocalStorage (if having issues)
```javascript
localStorage.clear();
```

## 📦 Build for Production

```bash
npm run build
```

สิ่งที่ build จะอยู่ในโฟลเดอร์ `dist/`

## 🎨 Customization

### เปลี่ยนสี
แก้ไขใน `src/index.css`:
```css
:root {
  --pastel-pink: #ffd1dc;
  --pastel-blue: #b5deff;
  --pastel-green: #bae1be;
  --pastel-purple: #e2d1f9;
}
```

### เปลี่ยน Animation
แก้ไขใน `src/index.css`:
```css
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}
```

## 🚀 Next Steps

- [ ] เพิ่มหน้า Register
- [ ] เพิ่มหน้าจัดการ Slips
- [ ] เพิ่มหน้าจัดการ Users (Admin)
- [ ] เพิ่ม Profile Page
- [ ] เพิ่ม Image Upload
- [ ] เพิ่ม Forgot Password

---

สนุกกับการพัฒนา! 🎉
