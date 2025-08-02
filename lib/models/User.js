import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'], 
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
    uppercase: true, 
  },
  phone: {
    type: String,
    default: '',
    trim: true,
    validate: {
      validator: function(v) {
        return v === '' || /^[\+]?[1-9][\d]{0,15}$/.test(v);
      },
      message: 'Please provide a valid phone number'
    }
  },
  bio: {
    type: String,
    default: '',
    maxlength: [500, 'Bio cannot be more than 500 characters'],
    trim: true,
  },
  profileImage: {
    type: String, 
    default: null,
    validate: {
      validator: function(v) {
        return v === null || v === '' || v.startsWith('data:image/');
      },
      message: 'Profile image must be a valid base64 image format'
    }
  },
  totalDonations: {
    type: Number,
    default: 0,
    min: [0, 'Total donations cannot be negative'],
  },
  rank: {
    type: Number,
    default: 0,
    min: [0, 'Rank cannot be negative'],
  },
  joinedDate: {
    type: Date,
    default: Date.now,
  },
  rewards: [{
    rewardId: {
      type: String,
      required: true,
    },
    unlockedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  lastLoginAt: {
    type: Date,
    default: null,
  },
  profileCompletedAt: {
    type: Date,
    default: null,
  }
}, {
  timestamps: true,
});

UserSchema.index({ email: 1 });
UserSchema.index({ referralCode: 1 });
UserSchema.index({ totalDonations: -1 }); 
UserSchema.index({ rank: 1 });

UserSchema.pre('save', function(next) {
  if (!this.referralCode) {
    this.referralCode = (this.name.toLowerCase().replace(/\s+/g, '') + '2025').toUpperCase();
  }

  if (this.name && this.email && this.phone && this.bio && !this.profileCompletedAt) {
    this.profileCompletedAt = new Date();
  }
  
  next();
});

UserSchema.methods.calculateRank = async function() {
  const User = mongoose.model('User');
  const higherRanked = await User.countDocuments({
    totalDonations: { $gt: this.totalDonations },
    isActive: true 
  });
  this.rank = higherRanked + 1;
  await this.save();
  return this.rank;
};

UserSchema.methods.isProfileComplete = function() {
  return !!(this.name && this.email && this.phone && this.bio);
};

UserSchema.methods.getProfileCompletionPercentage = function() {
  const fields = ['name', 'email', 'phone', 'bio', 'profileImage'];
  const completedFields = fields.filter(field => {
    const value = this[field];
    return value !== null && value !== undefined && value !== '';
  });
  return Math.round((completedFields.length / fields.length) * 100);
};

UserSchema.methods.toProfileJSON = function() {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    referralCode: this.referralCode,
    phone: this.phone,
    bio: this.bio,
    profileImage: this.profileImage,
    totalDonations: this.totalDonations,
    rank: this.rank,
    joinedDate: this.joinedDate,
    rewards: this.rewards,
    isActive: this.isActive,
    profileCompletionPercentage: this.getProfileCompletionPercentage(),
    isProfileComplete: this.isProfileComplete(),
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

export default mongoose.models.User || mongoose.model('User', UserSchema);