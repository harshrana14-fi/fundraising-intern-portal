'use client';

import { Crown, Medal, Trophy, Star } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

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
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getRowBackground = (user, rank) => {
    if (user.id === currentUserId) {
      return 'bg-blue-50 border-blue-200';
    }
    if (rank <= 3) {
      return 'bg-gradient-to-r from-yellow-50 to-orange-50';
    }
    return 'bg-white hover:bg-gray-50';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Trophy className="mr-2 text-yellow-500" size={28} />
          Top Fundraisers
        </h2>
        <p className="text-gray-600 mt-1">Rankings based on total donations raised</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Intern
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Referral Code
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Raised
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Achievement
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
                  className={`${getRowBackground(user, rank)} transition-colors ${
                    isCurrentUser ? 'ring-2 ring-blue-300' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${getRankBadgeColor(rank)}`}>
                        {rank}
                      </div>
                      {getRankIcon(rank)}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white font-bold">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          {user.name}
                          {isCurrentUser && (
                            <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                              You
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">
                      {user.referralCode}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-bold text-gray-900">
                      {formatCurrency(user.totalDonations)}
                    </div>
                    {rank <= 3 && (
                      <div className="text-xs text-gray-500">
                        Top {rank === 1 ? 'Performer' : rank === 2 ? 'Achiever' : 'Contributor'}
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {rank === 1 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        🏆 Champion
                      </span>
                    )}
                    {rank === 2 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        🥈 Runner-up
                      </span>
                    )}
                    {rank === 3 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        🥉 Third Place
                      </span>
                    )}
                    {rank > 3 && rank <= 5 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ⭐ Top 5
                      </span>
                    )}
                    {rank > 5 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        💪 Rising
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Leaderboard Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            Showing top {leaderboard.length} fundraisers
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Crown className="text-yellow-500" size={16} />
              <span>1st Place</span>
            </div>
            <div className="flex items-center space-x-2">
              <Medal className="text-gray-400" size={16} />
              <span>2nd Place</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="text-amber-600" size={16} />
              <span>3rd Place</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}