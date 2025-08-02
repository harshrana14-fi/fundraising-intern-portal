import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { verifyToken } from '@/lib/utils';

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }
    await connectDB();

    const users = await User.find({ isActive: true })
      .select('-password -email -rewards -createdAt -updatedAt')
      .sort({ totalDonations: -1 })
      .limit(50); 
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

export async function POST() {
  try {
    await connectDB();

    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
      return NextResponse.json(
        { message: 'Dummy data already exists' },
        { status: 400 }
      );
    }

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
        name: 'Demo User',
        email: 'demo@example.com',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj9jWd5vH9K6', // 'demo123'
        referralCode: 'demouser2025',
        totalDonations: 8500,
        isActive: true,
      }
    ];

    await User.insertMany(dummyUsers);

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