# Authentication API Documentation

## User Model (Admin Table)

### Schema
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  isActive: Boolean (default: true),
  timestamps: true
}
```

## API Endpoints

### 1. Register User
**POST** `/api/auth/register`

**Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user" // optional, default: "user", can be "admin"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "username": "john_doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "jwt_token"
  }
}
```

---

### 2. Login
**POST** `/api/auth/login`

**Body:**
```json
{
  "email": "admin@checkslip.com",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "username": "admin",
      "email": "admin@checkslip.com",
      "role": "admin"
    },
    "token": "jwt_token"
  }
}
```

---

### 3. Get Current User
**GET** `/api/auth/me`

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "username": "admin",
      "email": "admin@checkslip.com",
      "role": "admin",
      "isActive": true,
      "createdAt": "2025-11-06T..."
    }
  }
}
```

---

### 4. Get All Users (Admin Only)
**GET** `/api/auth/users`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "user_id_1",
      "username": "admin",
      "email": "admin@checkslip.com",
      "role": "admin",
      "isActive": true,
      "createdAt": "2025-11-06T..."
    },
    {
      "id": "user_id_2",
      "username": "john_doe",
      "email": "john@example.com",
      "role": "user",
      "isActive": true,
      "createdAt": "2025-11-06T..."
    }
  ]
}
```

---

### 5. Update User Role (Admin Only)
**PUT** `/api/auth/users/:id/role`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Body:**
```json
{
  "role": "admin" // or "user"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "User role updated successfully",
  "data": {
    "id": "user_id",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "admin",
    "isActive": true
  }
}
```

---

### 6. Delete User (Admin Only)
**DELETE** `/api/auth/users/:id`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied. Admin privileges required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "User not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error"
}
```

---

## Setup Instructions

### 1. Create Admin User
Run the seeding script to create the default admin user:
```bash
npm run seed:admin
```

Default admin credentials:
- **Email:** admin@checkslip.com
- **Password:** admin123
- **Role:** admin

**⚠️ Important:** Change the password after first login!

### 2. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### 3. Test the API
Use Postman, Thunder Client, or curl to test the endpoints.

Example with curl:
```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"test123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@checkslip.com","password":"admin123"}'

# Get current user (replace {token} with actual token)
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer {token}"
```

---

## Security Features

1. **Password Hashing:** Passwords are hashed using bcrypt before storing
2. **JWT Authentication:** Secure token-based authentication
3. **Role-Based Access Control:** Admin and user roles with different permissions
4. **Protected Routes:** Middleware to verify authentication and admin privileges
5. **Token Expiration:** JWT tokens expire after 7 days
