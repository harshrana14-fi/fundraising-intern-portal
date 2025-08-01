import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  referralCode: {
    type: String,
    unique: true,
    required: true,
  },
  totalDonations: {
    type: Number,
    default: 0,
  },
  rank: {
    type: Number,
    default: 0,
  },
  joinedDate: {
    type: Date,
    default: Date.now,
  },
  rewards: [{
    rewardId: String,
    unlockedAt: Date,
  }],
  isActive: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

// Create referral code before saving
UserSchema.pre('save', function(next) {
  if (!this.referralCode) {
    this.referralCode = this.name.toLowerCase().replace(/\s+/g, '') + '2025';
  }
  next();
});

// Calculate rank based on total donations
UserSchema.methods.calculateRank = async function() {
  const User = mongoose.model('User');
  const higherRanked = await User.countDocuments({
    totalDonations: { $gt: this.totalDonations }
  });
  this.rank = higherRanked + 1;
  return this.rank;
};

export default mongoose.models.User || mongoose.model('User', UserSchema);