// app/leaderboard/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import LeaderboardTable from '@/components/LeaderboardTable';
import { Trophy, Crown, Medal, Star, TrendingUp, Users, Target, Award, Flame, Zap } from 'lucide-react';

export default function LeaderboardPage() {
  const [user, setUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [userResponse, leaderboardResponse] = await Promise.all([
        fetch('/api/user'),
        fetch('/api/leaderboard')
      ]);

      if (userResponse.ok && leaderboardResponse.ok) {
        const userData = await userResponse.json();
        const leaderboardData = await leaderboardResponse.json();
        setUser(userData);
        setLeaderboard(leaderboardData);
      } else {
        router.push('/auth');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      router.push('/auth');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/20 to-teal-50/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-100/30 to-transparent rounded-full blur-3xl"></div>
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg font-medium">Loading elite leaderboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getRankBadge = (rank) => {
    if (rank === 1) return { icon: '👑', color: 'from-yellow-500 to-orange-500', text: 'Champion' };
    if (rank === 2) return { icon: '🥈', color: 'from-gray-400 to-gray-600', text: 'Runner-up' };
    if (rank === 3) return { icon: '🥉', color: 'from-orange-400 to-orange-600', text: 'Third Place' };
    if (rank <= 10) return { icon: '⭐', color: 'from-emerald-500 to-teal-500', text: 'Top 10' };
    return { icon: '🚀', color: 'from-blue-500 to-indigo-500', text: 'Rising Star' };
  };

  const userRankBadge = getRankBadge(user.rank || 15);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Elements matching homepage */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/20 to-teal-50/20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-100/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-100/30 to-transparent rounded-full blur-3xl"></div>
      
      <Navigation user={user} />
      
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Enhanced Hero Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 text-white mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-teal-600/90"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center mb-4">
              <Flame className="text-orange-300 mr-3" size={32} />
              <span className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-medium border border-white/20">Elite Competition</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              <Trophy className="inline-block mr-4 text-yellow-300" size={48} />
              Elite Leaderboard
            </h1>
            <p className="text-emerald-100 text-xl leading-relaxed max-w-3xl mx-auto">
              Witness the pinnacle of fundraising excellence. See how the top performers are reshaping the industry.
            </p>
          </div>
        </div>

        {/* Enhanced Your Position Card */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mb-8 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <Star className="text-emerald-600 mr-3" size={28} />
              Your Elite Position
            </h3>
            <div className="hidden md:block">
              <div className={`bg-gradient-to-r ${userRankBadge.color} px-4 py-2 rounded-xl text-white text-sm font-medium`}>
                {userRankBadge.text}
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`bg-gradient-to-r ${userRankBadge.color} rounded-2xl p-4 text-white shadow-lg`}>
                  <div className="text-center">
                    <div className="text-2xl mb-1">{userRankBadge.icon}</div>
                    <div className="text-2xl font-bold">#{user.rank || 15}</div>
                  </div>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{user.name}</p>
                  <p className="text-emerald-600 font-mono text-sm bg-white px-3 py-1 rounded-lg inline-block mt-1">
                    {user.referralCode}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">Elite Fundraising Intern</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-emerald-600 mb-1">
                  ${(user.totalDonations || 12500).toLocaleString()}
                </p>
                <p className="text-gray-600 font-medium">Total Raised</p>
                <div className="flex items-center justify-end mt-2 text-emerald-600">
                  <TrendingUp size={16} className="mr-1" />
                  <span className="text-sm font-medium">+18% this month</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-3 rounded-xl text-blue-600 group-hover:scale-110 transition-transform duration-300">
                <Users size={24} />
              </div>
              <span className="text-blue-600 text-sm font-medium bg-blue-50 px-3 py-1 rounded-full">Live</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{leaderboard.length || 156}</h3>
            <p className="text-gray-600 font-medium">Elite Competitors</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-3 rounded-xl text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                <Target size={24} />
              </div>
              <span className="text-emerald-600 text-sm font-medium bg-emerald-50 px-3 py-1 rounded-full">Active</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">$2.8M+</h3>
            <p className="text-gray-600 font-medium">Total Raised</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 rounded-xl text-purple-600 group-hover:scale-110 transition-transform duration-300">
                <Award size={24} />
              </div>
              <span className="text-purple-600 text-sm font-medium bg-purple-50 px-3 py-1 rounded-full">Updated</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">97%</h3>
            <p className="text-gray-600 font-medium">Success Rate</p>
          </div>
        </div>

        {/* Enhanced Leaderboard Table */}
        <LeaderboardTable leaderboard={leaderboard} currentUserId={user._id} />
      </div>
    </div>
  );
}