import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.model.js';

// Load environment variables
dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@checkslip.com' });

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists');
      console.log('Email:', existingAdmin.email);
      console.log('Username:', existingAdmin.username);
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      username: 'admin',
      email: 'admin@checkslip.com',
      password: 'admin123', // Will be hashed automatically
      role: 'admin',
    });

    console.log('✅ Admin user created successfully!');
    console.log('----------------------------------------');
    console.log('Email:', admin.email);
    console.log('Username:', admin.username);
    console.log('Password: admin123');
    console.log('Role:', admin.role);
    console.log('----------------------------------------');
    console.log('⚠️  Please change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
