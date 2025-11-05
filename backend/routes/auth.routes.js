import express from 'express';
import {
  register,
  login,
  getCurrentUser,
  getAllUsers,
  updateUserRole,
  deleteUser,
} from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/admin.middleware.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes (require authentication)
router.get('/me', authenticateToken, getCurrentUser);

// Admin only routes
router.get('/users', authenticateToken, isAdmin, getAllUsers);
router.put('/users/:id/role', authenticateToken, isAdmin, updateUserRole);
router.delete('/users/:id', authenticateToken, isAdmin, deleteUser);

export default router;
