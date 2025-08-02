'use client';

import { Crown, Medal, Trophy, Star, TrendingUp, Award, Zap, Target } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function LeaderboardTable({ leaderboard, currentUserId }) {
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="text-yellow-500" size={20} />;
      case 2:
        return <Medal className="text-gray-400" size={20} />;
      case 3:
        return <Trophy className="text-amber-600" size={20} />;
      default:
        return <Star className="text-gray-300" size={16} />;
    }
  };

  const getRankBadgeColor = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white shadow-lg shadow-yellow-300/50';
      case 2:
        return 'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 text-white shadow-lg shadow-gray-300/50';
      case 3:
        return 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-white shadow-lg shadow-amber-300/50';
      default:
        return 'bg-gradient-to-r from-slate-100 to-slate-200 text-gray-700 border border-gray-200';
    }
  };

  const getRowBackground = (user, rank) => {
    if (user.id === currentUserId) {
      return 'bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-blue-200 shadow-md';
    }
    if (rank <= 3) {
      return 'bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 border-orange-200';
    }
    return 'bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 border-gray-100';
  };

  const getUserImage = (user) => {
    if (user.profileImage || user.avatar) {
      return (
        <img 
          src={user.profileImage || user.avatar} 
          alt={user.name}
          className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-lg"
        />
      );
    }
    const colors = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-blue-600',
      'from-purple-500 to-pink-600',
      'from-red-500 to-orange-600',
      'from-yellow-500 to-red-600',
      'from-indigo-500 to-purple-600',
      'from-pink-500 to-rose-600',
      'from-teal-500 to-cyan-600'
    ];
    
    const colorIndex = user.name.charCodeAt(0) % colors.length;
    const gradientClass = colors[colorIndex];
    
    return (
      <div className={`h-12 w-12 rounded-full bg-gradient-to-r ${gradientClass} flex items-center justify-center border-2 border-white shadow-lg`}>
        <span className="text-white font-bold text-lg">
          {user.name.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  };

  const getPerformanceIndicator = (user, rank) => {
    if (rank === 1) return <TrendingUp className="text-green-500" size={16} />;
    if (rank <= 3) return <Award className="text-blue-500" size={16} />;
    if (rank <= 5) return <Zap className="text-purple-500" size={16} />;
    return <Target className="text-gray-400" size={16} />;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <h2 className="text-3xl font-bold flex items-center mb-2">
          <Trophy className="mr-3 text-yellow-300" size={32} />
          Top Fundraisers</h2>
        <p className="text-indigo-100 text-lg">Rankings based on total donations raised</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Intern
              </th>
              <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Referral Code
              </th>
              <th className="px-8 py-4 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">
                Total Raised
              </th>
              <th className="px-8 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                Achievement
              </th>
              <th className="px-8 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leaderboard.map((user, index) => {
              const rank = index + 1;
              const isCurrentUser = user.id === currentUserId;
              
              return (
                <tr 
                  key={user.id} 
                  className={`${getRowBackground(user, rank)} transition-all duration-300 hover:scale-[1.01] hover:shadow-lg border-l-4 ${
                    isCurrentUser ? 'border-l-blue-500 ring-2 ring-blue-200 animate-pulse' : 
                    rank <= 3 ? 'border-l-yellow-400' : 'border-l-transparent'
                  }`}
                >
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg ${getRankBadgeColor(rank)} transform transition-transform hover:scale-110`}>
                        {rank}
                      </div>
                      <div className="transform transition-transform hover:scale-110">
                        {getRankIcon(rank)}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 relative">
                        {getUserImage(user)}
                        {rank <= 3 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                            <Crown className="text-yellow-800" size={12} />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-lg font-bold text-gray-900 flex items-center">
                          {user.name}
                          {isCurrentUser && (
                            <span className="ml-3 px-3 py-1 text-sm bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-md animate-bounce">
                              You
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          {getPerformanceIndicator(user, rank)}
                          <span className="ml-1">
                            {rank === 1 ? 'Top Performer' : 
                             rank <= 3 ? 'Elite Fundraiser' : 
                             rank <= 5 ? 'Rising Star' : 'Active Member'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-mono bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-2 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                      {user.referralCode}
                    </div>
                  </td>
                  
                  <td className="px-8 py-6 whitespace-nowrap text-right">
                    <div className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      {formatCurrency(user.totalDonations)}
                    </div>
                    {rank <= 3 && (
                      <div className="text-sm font-medium text-gray-600 mt-1">
                        {rank === 1 ? '🏆 Champion' : rank === 2 ? '🥈 Runner-up' : '🥉 Third Place'}
                      </div>
                    )}
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                          rank === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                          rank === 3 ? 'bg-gradient-to-r from-amber-400 to-amber-600' :
                          'bg-gradient-to-r from-blue-400 to-blue-600'
                        }`}
                        style={{ 
                          width: `${Math.min(100, (user.totalDonations / (leaderboard[0]?.totalDonations || 1)) * 100)}%` 
                        }}
                      ></div>
                    </div>
                  </td>
                  
                  <td className="px-8 py-6 whitespace-nowrap text-center">
                    {rank === 1 && (
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg transform hover:scale-105 transition-transform">
                        🏆 Champion
                      </span>
                    )}
                    {rank === 2 && (
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-gray-400 to-gray-600 text-white shadow-lg transform hover:scale-105 transition-transform">
                        🥈 Runner-up
                      </span>
                    )}
                    {rank === 3 && (
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-lg transform hover:scale-105 transition-transform">
                        🥉 Third Place
                      </span>
                    )}
                    {rank > 3 && rank <= 5 && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300">
                        ⭐ Top 5
                      </span>
                    )}
                    {rank > 5 && rank <= 10 && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300">
                        💪 Top 10
                      </span>
                    )}
                    {rank > 10 && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300">
                        🚀 Rising
                      </span>
                    )}
                  </td>

                  <td className="px-8 py-6 whitespace-nowrap text-center">
                    <div className="flex flex-col items-center space-y-1">
                      <div className={`w-3 h-3 rounded-full ${
                        rank === 1 ? 'bg-green-500 animate-pulse' :
                        rank <= 3 ? 'bg-yellow-500' :
                        rank <= 10 ? 'bg-blue-500' :
                        'bg-gray-400'
                      }`}></div>
                      <span className="text-xs text-gray-600 font-medium">
                        {rank === 1 ? 'Leading' :
                         rank <= 3 ? 'Elite' :
                         rank <= 10 ? 'Strong' :
                         'Active'}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-semibold">Showing top {leaderboard.length} fundraisers</span>
            <div className="text-xs text-gray-500 mt-1">Updated in real-time</div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Crown className="text-yellow-500" size={18} />
              <span className="text-sm font-medium text-gray-700">1st Place</span>
            </div>
            <div className="flex items-center space-x-2">
              <Medal className="text-gray-400" size={18} />
              <span className="text-sm font-medium text-gray-700">2nd Place</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="text-amber-600" size={18} />
              <span className="text-sm font-medium text-gray-700">3rd Place</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="text-green-500" size={18} />
              <span className="text-sm font-medium text-gray-700">Top Performers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}