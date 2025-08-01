// app/dashboard/page.js
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '../../components/Navigation';
import DashboardStats from '../../components/DashboardStats';
import RewardsSection from '../../components/RewardsSection';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // If unauthorized, redirect to auth
        router.push('/auth');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
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
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
              <p className="text-blue-100">Keep up the amazing work raising funds for our cause</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white bg-opacity-20 rounded-full p-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats user={user} />

        {/* Rewards Section */}
        <RewardsSection user={user} />

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors text-left">
              <h4 className="font-medium text-blue-900 mb-2">Share Your Code</h4>
              <p className="text-blue-700 text-sm">Copy your referral code: {user.referralCode}</p>
            </button>
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors text-left">
              <h4 className="font-medium text-green-900 mb-2">Log New Donation</h4>
              <p className="text-green-700 text-sm">Record a new fundraising success</p>
            </button>
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors text-left">
              <h4 className="font-medium text-purple-900 mb-2">View Resources</h4>
              <p className="text-purple-700 text-sm">Access fundraising tips and materials</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}