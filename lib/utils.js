// lib/Utils.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

export const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(amount);
};

export const getRankSuffix = (rank) => {
  if (rank === 1) return 'st';
  if (rank === 2) return 'nd';
  if (rank === 3) return 'rd';
  return 'th';
};

export const rewards = [
  { id: 1, title: 'Welcome Badge', description: 'Complete your first donation', amount: 0, icon: 'Star' },
  { id: 2, title: 'Rising Star', description: 'Raise $1,000', amount: 1000, icon: 'TrendingUp' },
  { id: 3, title: 'Fundraising Hero', description: 'Raise $5,000', amount: 5000, icon: 'Medal' },
  { id: 4, title: 'Champion Fundraiser', description: 'Raise $10,000', amount: 10000, icon: 'Trophy' },
  { id: 5, title: 'Elite Contributor', description: 'Raise $20,000', amount: 20000, icon: 'Crown' },
  { id: 6, title: 'Legendary Fundraiser', description: 'Raise $50,000', amount: 50000, icon: 'Crown' }
];