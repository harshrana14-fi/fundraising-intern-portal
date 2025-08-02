'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Gift, Home, Trophy, LogOut, Menu, X, User, Edit3, Camera, Save, XCircle } from 'lucide-react';
import { useState, useRef } from 'react';

export default function Navigation({ user, onUserUpdate }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email || '',
    phone: user.phone || '',
    bio: user.bio || '',
    profileImage: user.profileImage || null
  });
  const fileInputRef = useRef(null);

  const handleLogout = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/');
  };

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          profileImage: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    if (onUserUpdate) {
      onUserUpdate(profileData);
    }
    setEditingProfile(false);
    setProfileModalOpen(false);
    setProfileDropdownOpen(false);
  };

  const handleCancelEdit = () => {
    setProfileData({
      name: user.name,
      email: user.email || '',
      phone: user.phone || '',
      bio: user.bio || '',
      profileImage: user.profileImage || null
    });
    setEditingProfile(false);
  };

  const NavLink = ({ item, mobile = false }) => {
    const Icon = item.icon;
    const isActive = pathname === item.href;
    
    return (
      <button
        onClick={() => {
          router.push(item.href);
          if (mobile) setMobileMenuOpen(false);
        }}
        className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 cursor-pointer ${
          isActive
            ? 'bg-emerald-100 text-emerald-700 shadow-md'
            : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
        } ${mobile ? 'w-full text-left' : ''}`}
      >
        <Icon size={20} />
        <span>{item.name}</span>
      </button>
    );
  };

  const ProfileAvatar = ({ size = 'w-8 h-8', textSize = 'text-sm' }) => (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-2">
      <div className={`${size} bg-white rounded-xl flex items-center justify-center overflow-hidden`}>
        {profileData.profileImage ? (
          <img 
            src={profileData.profileImage} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        ) : (
          <span className={`${textSize} font-bold text-emerald-600`}>
            {user.name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <>
      <nav className="p-6 relative z-50 backdrop-blur-sm bg-white/90 border-b border-gray-100 sticky top-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-2 rounded-xl">
              <Gift className="text-white" size={24} />
            </div>
            <span className="text-gray-800 text-2xl font-bold">FundRaise Portal</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">#{user.referralCode}</p>
                </div>
                <ProfileAvatar />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 z-50">
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                      <ProfileAvatar size="w-12 h-12" textSize="text-lg" />
                      <div>
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-sm text-gray-300">{user.email || 'No email'}</p>
                        <p className="text-xs text-gray-400">Code: {user.referralCode}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setProfileModalOpen(true);
                        setProfileDropdownOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-left rounded-xl hover:bg-gray-700 transition-colors text-gray-200 hover:text-white"
                    >
                      <User size={16} />
                      <span className="text-sm">View Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        setProfileModalOpen(true);
                        setEditingProfile(true);
                        setProfileDropdownOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-left rounded-xl hover:bg-gray-700 transition-colors text-gray-200 hover:text-white"
                    >
                      <Edit3 size={16} />
                      <span className="text-sm">Edit Profile</span>
                    </button>
                    <hr className="my-2 border-gray-600" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-left rounded-xl hover:bg-red-600 text-red-400 hover:text-white transition-colors"
                    >
                      <LogOut size={16} />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 pt-4 mt-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <NavLink key={item.name} item={item} mobile />
              ))}

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-3 px-3 py-2">
                  <ProfileAvatar />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">#{user.referralCode}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setProfileModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors w-full text-left"
                >
                  <User size={20} />
                  <span className="font-medium">Profile</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors w-full text-left mt-2"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {profileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingProfile ? 'Edit Profile' : 'Profile'}
                </h2>
                <button
                  onClick={() => {
                    setProfileModalOpen(false);
                    setEditingProfile(false);
                    handleCancelEdit();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <ProfileAvatar size="w-24 h-24" textSize="text-2xl" />
                    {editingProfile && (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute -bottom-2 -right-2 bg-emerald-600 text-white rounded-full p-2 hover:bg-emerald-700 transition-colors"
                      >
                        <Camera size={16} />
                      </button>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {editingProfile && (
                    <p className="text-xs text-gray-500 mt-2">Click camera to change photo</p>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    {editingProfile ? (
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900 placeholder-gray-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    {editingProfile ? (
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900 placeholder-gray-500"
                        placeholder="Enter your email"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.email || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    {editingProfile ? (
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900 placeholder-gray-500"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.phone || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    {editingProfile ? (
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900 placeholder-gray-500 resize-none"
                        rows={3}
                        placeholder="Tell us about yourself..."
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.bio || 'No bio provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Referral Code
                    </label>
                    <p className="text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded-xl">
                      {user.referralCode}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  {editingProfile ? (
                    <>
                      <button
                        onClick={handleSaveProfile}
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
                      >
                        <Save size={16} />
                        <span>Save Changes</span>
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
                      >
                        <XCircle size={16} />
                        <span>Cancel</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setEditingProfile(true)}
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
                    >
                      <Edit3 size={16} />
                      <span>Edit Profile</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {profileDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setProfileDropdownOpen(false)}
        />
      )}
    </>
  );
}