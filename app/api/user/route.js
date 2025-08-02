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

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { message: 'Account is deactivated' },
        { status: 401 }
      );
    }
    await user.calculateRank();
    await user.save();

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      referralCode: user.referralCode,
      phone: user.phone || '',
      bio: user.bio || '',
      profileImage: user.profileImage || null,
      totalDonations: user.totalDonations,
      rank: user.rank,
      joinedDate: user.joinedDate,
      rewards: user.rewards,
      isActive: user.isActive,
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

export async function PUT(request) {
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

    const body = await request.json();
    const { name, email, phone, bio, profileImage, totalDonations } = body;
    await connectDB();

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { message: 'Account is deactivated' },
        { status: 401 }
      );
    }

    if (name !== undefined && name.trim() !== '') {
      user.name = name.trim();
    }
    
    if (email !== undefined && email.trim() !== '') {
      const existingUser = await User.findOne({ 
        email: email.toLowerCase().trim(), 
        _id: { $ne: user._id } 
      });
      
      if (existingUser) {
        return NextResponse.json(
          { message: 'Email is already in use' },
          { status: 400 }
        );
      }
      
      user.email = email.toLowerCase().trim();
    }
    
    if (phone !== undefined) {
      user.phone = phone.trim();
    }
    
    if (bio !== undefined) {
      user.bio = bio.trim();
    }
    
    if (profileImage !== undefined) {
      user.profileImage = profileImage;
    }
    
    if (totalDonations !== undefined && totalDonations >= 0) {
      user.totalDonations = totalDonations;
      await user.calculateRank();
    }

    await user.save();

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      referralCode: user.referralCode,
      phone: user.phone,
      bio: user.bio,
      profileImage: user.profileImage,
      totalDonations: user.totalDonations,
      rank: user.rank,
      joinedDate: user.joinedDate,
      rewards: user.rewards,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: userResponse,
    });
  } catch (error) {
    console.error('Update user error:', error);

    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { message: 'Validation error', errors: errorMessages },
        { status: 400 }
      );
    }

    if (error.code === 11000) {
      return NextResponse.json(
        { message: 'Email is already in use' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
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

    const body = await request.json();
    await connectDB();

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    const updateFields = {};
    const allowedFields = ['name', 'phone', 'bio', 'profileImage'];
    
    allowedFields.forEach(field => {
      if (body[field] !== undefined) {
        updateFields[field] = field === 'profileImage' ? body[field] : body[field].trim();
      }
    });

    if (body.email !== undefined && body.email.trim() !== '') {
      const existingUser = await User.findOne({ 
        email: body.email.toLowerCase().trim(), 
        _id: { $ne: user._id } 
      });
      
      if (existingUser) {
        return NextResponse.json(
          { message: 'Email is already in use' },
          { status: 400 }
        );
      }
      
      updateFields.email = body.email.toLowerCase().trim();
    }

    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select('-password');

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        referralCode: updatedUser.referralCode,
        phone: updatedUser.phone,
        bio: updatedUser.bio,
        profileImage: updatedUser.profileImage,
        totalDonations: updatedUser.totalDonations,
        rank: updatedUser.rank,
        joinedDate: updatedUser.joinedDate,
        rewards: updatedUser.rewards,
        isActive: updatedUser.isActive,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      },
    });
  } catch (error) {
    console.error('Patch user error:', error);
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { message: 'Validation error', errors: errorMessages },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}