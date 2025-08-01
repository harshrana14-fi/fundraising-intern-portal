import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '../../../lib/mongodb';
import User from '../../../lib/models/User';
import { verifyToken } from '../../../lib/utils';

export async function GET() {
  try {
    // Get token from cookies for authentication
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Connect to database
    await connectDB();

    // Get all active users sorted by total donations (descending)
    const users = await User.find({ isActive: true })
      .select('-password -email -rewards -createdAt -updatedAt')
      .sort({ totalDonations: -1 })
      .limit(50); // Limit to top 50 users

    // Add rank to each user and format response
    const leaderboard = users.map((user, index) => ({
      id: user._id.toString(),
      name: user.name,
      referralCode: user.referralCode,
      totalDonations: user.totalDonations,
      rank: index + 1,
      joinedDate: user.joinedDate,
    }));

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error('Leaderboard error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Add dummy data endpoint for initial setup
export async function POST() {
  try {
    // Connect to database
    await connectDB();

    // Check if we already have users
    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
      return NextResponse.json(
        { message: 'Dummy data already exists' },
        { status: 400 }
      );
    }

    // Create dummy users for leaderboard
    const dummyUsers = [
      {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj9jWd5vH9K6', // hashed 'password123'
        referralCode: 'sarahjohnson2025',
        totalDonations: 25400,
        isActive: true,
      },
      {
        name: 'Mike Chen',
        email: 'mike.chen@example.com',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj9jWd5vH9K6',
        referralCode: 'mikechen2025',
        totalDonations: 22100,
        isActive: true,
      },
      {
        name: 'Emma Wilson',
        email: 'emma.wilson@example.com',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj9jWd5vH9K6',
        referralCode: 'emmawilson2025',
        totalDonations: 19200,
        isActive: true,
      },
      {
        name: 'Alex Rodriguez',
        email: 'alex.rodriguez@example.com',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj9jWd5vH9K6',
        referralCode: 'alexrodriguez2025',
        totalDonations: 16800,
        isActive: true,
      },
      {
        name: 'Lisa Park',
        email: 'lisa.park@example.com',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj9jWd5vH9K6',
        referralCode: 'lisapark2025',
        totalDonations: 14500,
        isActive: true,
      },
      {
        name: 'David Kim',
        email: 'david.kim@example.com',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj9jWd5vH9K6',
        referralCode: 'davidkim2025',
        totalDonations: 12200,
        isActive: true,
      },
      {
        name: 'Rachel Green',
        email: 'rachel.green@example.com',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj9jWd5vH9K6',
        referralCode: 'rachelgreen2025',
        totalDonations: 10750,
        isActive: true,
      },
      {
        name: 'Demo User',
        email: 'demo@example.com',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj9jWd5vH9K6', // 'demo123'
        referralCode: 'demouser2025',
        totalDonations: 8500,
        isActive: true,
      }
    ];

    // Insert dummy users
    await User.insertMany(dummyUsers);

    // Calculate ranks for all users
    const users = await User.find({ isActive: true });
    for (const user of users) {
      await user.calculateRank();
      await user.save();
    }

    return NextResponse.json({
      message: 'Dummy data created successfully',
      count: dummyUsers.length,
    });
  } catch (error) {
    console.error('Create dummy data error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}