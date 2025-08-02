import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { hashPassword, generateToken } from '@/lib/utils';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { message: 'Name must be at least 2 characters long' },
        { status: 400 }
      );
    }
    await connectDB();

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      );
    }

    const baseReferralCode = name.toLowerCase().replace(/[^a-z0-9]/g, '') + '2025';

    let finalReferralCode = baseReferralCode;
    let counter = 1;
    while (await User.findOne({ referralCode: finalReferralCode })) {
      finalReferralCode = baseReferralCode + counter;
      counter++;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      referralCode: finalReferralCode,
      totalDonations: Math.floor(Math.random() * 5000) + 1000, // Random amount for demo
      joinedDate: new Date(),
      isActive: true,
      rewards: []
    });

    await newUser.save();
    await newUser.calculateRank();
    await newUser.save();

    const token = generateToken(newUser._id);

    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      referralCode: newUser.referralCode,
      totalDonations: newUser.totalDonations,
      rank: newUser.rank,
      joinedDate: newUser.joinedDate,
      rewards: newUser.rewards,
    };

    return NextResponse.json({
      message: 'User created successfully',
      user: userResponse,
      token,
    }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json(
        { message: `${field} already exists` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}