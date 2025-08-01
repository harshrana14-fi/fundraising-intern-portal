'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Gift, TrendingUp, Users, Trophy } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const token = document.cookie.includes('token=');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      {/* Navigation */}
      <nav className="p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Gift className="text-white" size={32} />
            <span className="text-white text-2xl font-bold">FundRaise Portal</span>
          </div>
          <button
            onClick={() => router.push('/auth')}
            className="bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Fundraising Made
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Simple & Rewarding
            </span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join our intern program, track your fundraising progress, earn rewards, 
            and compete with fellow interns to make a real difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/auth')}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
            >
              Get Started Today
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your fundraising progress in real-time with detailed analytics and insights.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Trophy className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Earn Rewards</h3>
              <p className="text-gray-600">
                Unlock achievements and rewards as you reach fundraising milestones.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Compete & Connect</h3>
              <p className="text-gray-600">
                See how you rank against other interns and build a community of fundraisers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}