// app/api/auth/login/route.js

import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../lib/models/User';
import { verifyPassword, generateToken } from '../../../../lib/utils';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Please provide email and password' },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.isActive) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    await user.calculateRank();
    await user.save();

    const token = generateToken(user._id);

    const response = NextResponse.json({
  message: 'Login successful',
  user: userResponse,
});

response.cookies.set({
  name: 'token',
  value: token,
  httpOnly: true,
  secure: true,
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7 days
  sameSite: 'lax'
});

return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
