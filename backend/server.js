import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Check Slip API',
    status: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    mongodb: 'Connected',
    timestamp: new Date().toISOString(),
  });
});

// Import routes
import authRoutes from './routes/auth.routes.js';
// import slipRoutes from './routes/slip.routes.js';

// Use routes
app.use('/api/auth', authRoutes);
// app.use('/api/slips', slipRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📍 API URL: http://localhost:${PORT}`);
});
