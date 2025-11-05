# Test API Endpoints

## Base URL
```
http://localhost:3000
```

## 1. First, create admin user
```bash
npm run seed:admin
```

## 2. Test Endpoints

### Login as Admin
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@checkslip.com",
    "password": "admin123"
  }'
```

Save the token from the response!

### Register a new user
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "test123"
  }'
```

### Get current user info (replace YOUR_TOKEN)
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get all users (Admin only - replace ADMIN_TOKEN)
```bash
curl -X GET http://localhost:3000/api/auth/users \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### Update user role to admin (Admin only - replace USER_ID and ADMIN_TOKEN)
```bash
curl -X PUT http://localhost:3000/api/auth/users/USER_ID/role \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "role": "admin"
  }'
```

### Delete user (Admin only - replace USER_ID and ADMIN_TOKEN)
```bash
curl -X DELETE http://localhost:3000/api/auth/users/USER_ID \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

## Health Check
```bash
curl http://localhost:3000/api/health
```
