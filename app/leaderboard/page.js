'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '../../components/Navigation';
import LeaderboardTable from '../../components/LeaderboardTable';

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-6 text-white mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">🏆 Leaderboard</h1>
            <p className="text-yellow-100">See how you rank against other fundraising interns</p>
          </div>
        </div>

        {/* Your Position */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Your Current Position</h3>
          <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                #{user.rank}
              </div>
              <div>
                <p className="font-medium text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-600">{user.referralCode}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-blue-600 text-lg">
                ${user.totalDonations.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Raised</p>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <LeaderboardTable leaderboard={leaderboard} currentUserId={user._id} />
      </div>
    </div>
  );
}