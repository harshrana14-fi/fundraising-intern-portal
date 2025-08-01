// app/api/user/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '../../../lib/mongodb';
import User from '../../../lib/models/User';
import { verifyToken } from '../../../lib/utils';

export async function GET() {
  try {
    // Get token from cookies
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

    // Find user by ID
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        { message: 'Account is deactivated' },
        { status: 401 }
      );
    }

    // Update rank
    await user.calculateRank();
    await user.save();

    // Return user data
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      referralCode: user.referralCode,
      totalDonations: user.totalDonations,
      rank: user.rank,
      joinedDate: user.joinedDate,
      rewards: user.rewards,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return NextResponse.json(userResponse);
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update user profile
export async function PUT(request) {
  try {
    // Get token from cookies
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

    const { name, totalDonations } = await request.json();

    // Connect to database
    await connectDB();

    // Find and update user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Update fields if provided
    if (name) user.name = name;
    if (totalDonations !== undefined) user.totalDonations = totalDonations;

    // Recalculate rank if donations changed
    if (totalDonations !== undefined) {
      await user.calculateRank();
    }

    await user.save();

    // Return updated user data (without password)
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      referralCode: user.referralCode,
      totalDonations: user.totalDonations,
      rank: user.rank,
      joinedDate: user.joinedDate,
      rewards: user.rewards,
    };

    return NextResponse.json({
      message: 'User updated successfully',
      user: userResponse,
    });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}