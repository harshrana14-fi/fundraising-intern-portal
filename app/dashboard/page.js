'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '../../components/Navigation';
import DashboardStats from '../../components/DashboardStats';
import RewardsSection from '../../components/RewardsSection';
import { 
  Gift, TrendingUp, Users, Trophy, Target, Award, BarChart3, Clock, CheckCircle, 
  ArrowRight, Star, Zap, Shield, Lightbulb, Copy, Share2, Download, Bell,
  Calendar, Activity, DollarSign, Crown, Flame, Medal, ChevronRight, Plus,
  TrendingDown, Eye, MessageCircle, Heart, ExternalLink, ChartBar
} from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);
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
        router.push('/auth');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      router.push('/auth');
    } finally {
      setLoading(false);
    }
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(user?.referralCode || 'DEMO001');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/20 to-teal-50/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-100/30 to-transparent rounded-full blur-3xl"></div>
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg font-medium">Loading your executive dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const recentActivity = [
    { type: 'donation', amount: '$500', donor: 'Anonymous', time: '2 hours ago', icon: <DollarSign size={16} /> },
    { type: 'referral', name: 'John Smith', time: '1 day ago', icon: <Users size={16} /> },
    { type: 'milestone', achievement: 'Hit $10K goal', time: '3 days ago', icon: <Trophy size={16} /> },
    { type: 'donation', amount: '$750', donor: 'Sarah Johnson', time: '5 days ago', icon: <DollarSign size={16} /> }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Elements matching homepage */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/20 to-teal-50/20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-100/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-100/30 to-transparent rounded-full blur-3xl"></div>
      
      <Navigation user={user} />
      
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Enhanced Welcome Section - matching homepage style */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 text-white mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-teal-600/90"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center mb-4">
                  <Flame className="text-orange-300 mr-2" size={24} />
                  <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/20">Top Performer</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3">Welcome back, {user.name}!</h1>
                <p className="text-emerald-100 text-lg leading-relaxed">You're making exceptional impact in our fundraising mission</p>
              </div>
              <div className="hidden md:block">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                  <Crown className="text-yellow-300 mx-auto mb-2" size={32} />
                  <p className="text-sm text-emerald-100 font-medium">Elite Status</p>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex justify-between items-center mb-3">
                <span className="text-emerald-100 font-medium">Monthly Goal Progress</span>
                <span className="text-white font-bold text-lg">${user?.totalRaised || 12500} / $15,000</span>
              </div>
              <div className="bg-white/20 rounded-full h-3 mb-3">
                <div className="bg-gradient-to-r from-yellow-300 to-orange-300 h-3 rounded-full shadow-lg" 
                     style={{ width: `${Math.min(((user?.totalRaised || 12500) / 15000) * 100, 100)}%` }}></div>
              </div>
              <p className="text-emerald-100 text-sm">
                {Math.round(((user?.totalRaised || 12500) / 15000) * 100)}% complete • 
                ${Math.max(15000 - (user?.totalRaised || 12500), 0)} remaining
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats user={user} />

        {/* Rewards Section */}
        <RewardsSection user={user} />

        {/* Enhanced Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Left Column - Recent Activity & Analytics */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Activity className="text-emerald-600 mr-3" size={28} />
                  Recent Activity
                </h3>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center hover:bg-emerald-50 px-3 py-1 rounded-lg transition-colors">
                  View All <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:from-emerald-50 hover:to-white transition-all duration-300 border border-gray-100 hover:border-emerald-200">
                    <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-3 rounded-xl text-emerald-600 mr-4">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      {activity.type === 'donation' && (
                        <p className="text-gray-900 font-medium">
                          New donation of <span className="text-emerald-600 font-bold">{activity.amount}</span> from {activity.donor}
                        </p>
                      )}
                      {activity.type === 'referral' && (
                        <p className="text-gray-900 font-medium">
                          New referral: <span className="text-blue-600 font-bold">{activity.name}</span> joined your network
                        </p>
                      )}
                      {activity.type === 'milestone' && (
                        <p className="text-gray-900 font-medium">
                          Achievement unlocked: <span className="text-purple-600 font-bold">{activity.achievement}</span>
                        </p>
                      )}
                      <p className="text-gray-500 text-sm">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Analytics */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <ChartBar className="text-emerald-600 mr-3" size={28} />
                Performance Analytics
              </h3>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-12 text-center border border-emerald-100">
                <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-6 rounded-2xl w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <BarChart3 className="text-emerald-600" size={48} />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Advanced Analytics Coming Soon</h4>
                <p className="text-gray-600 text-lg font-medium mb-2">Track your fundraising trends and optimize performance</p>
                <p className="text-gray-500">Get insights into donor behavior, campaign effectiveness, and growth opportunities</p>
              </div>
            </div>
          </div>

          {/* Right Column - Enhanced Sidebar */}
          <div className="space-y-6">
            
            {/* Enhanced Referral Code Card */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Share2 className="text-emerald-600 mr-2" size={24} />
                Your Referral Code
              </h3>
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-center mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-teal-600/90"></div>
                <div className="relative z-10">
                  <p className="text-emerald-100 text-sm font-medium mb-2">Exclusive Code</p>
                  <p className="text-white text-2xl font-bold tracking-wider mb-2">{user?.referralCode || 'DEMO001'}</p>
                  <p className="text-emerald-100 text-xs">Share and earn premium rewards</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={copyReferralCode}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center justify-center transform hover:-translate-y-0.5">
                  {copiedCode ? <CheckCircle size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
                  {copiedCode ? 'Copied!' : 'Copy'}
                </button>
                <button className="bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300 flex items-center justify-center hover:shadow-md">
                  <Share2 size={16} />
                </button>
              </div>
            </div>



            {/* Achievements Preview */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-xl border border-purple-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Medal className="text-purple-600 mr-2" size={24} />
                Next Milestone
              </h3>
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-2xl mb-4">
                  <Crown className="text-purple-600 mx-auto mb-2" size={32} />
                  <h4 className="font-bold text-purple-900">Elite Performer</h4>
                </div>
                <p className="text-gray-600 mb-4">Reach $15,000 to unlock exclusive benefits</p>
                <div className="bg-white rounded-lg p-3">
                  <div className="bg-purple-200 rounded-full h-2 mb-2">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full" 
                         style={{ width: `${Math.min(((user?.totalRaised || 12500) / 15000) * 100, 100)}%` }}></div>
                  </div>
                  <p className="text-sm text-gray-600">${15000 - (user?.totalRaised || 12500)} to go</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Actions - matching homepage style */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Zap className="text-emerald-600 mr-3" size={28} />
            Strategic Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-2xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 text-left group hover:shadow-lg transform hover:-translate-y-1">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                <Share2 className="text-white" size={24} />
              </div>
              <h4 className="font-bold text-blue-900 mb-2 text-lg">Share Your Code</h4>
              <p className="text-blue-700 mb-3">Expand your network and earn rewards</p>
              <p className="text-blue-600 text-sm font-mono bg-blue-100 px-3 py-1 rounded-lg inline-block">
                {user.referralCode}
              </p>
            </button>
            
            <button className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 rounded-2xl border-2 border-emerald-200 hover:border-emerald-300 transition-all duration-300 text-left group hover:shadow-lg transform hover:-translate-y-1">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                <Plus className="text-white" size={24} />
              </div>
              <h4 className="font-bold text-emerald-900 mb-2 text-lg">Log New Donation</h4>
              <p className="text-emerald-700 mb-3">Record your latest fundraising success</p>
              <p className="text-emerald-600 text-sm">Track progress instantly</p>
            </button>
            
            <button className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-2xl border-2 border-purple-200 hover:border-purple-300 transition-all duration-300 text-left group hover:shadow-lg transform hover:-translate-y-1">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                <Lightbulb className="text-white" size={24} />
              </div>
              <h4 className="font-bold text-purple-900 mb-2 text-lg">Elite Resources</h4>
              <p className="text-purple-700 mb-3">Access premium strategies and tools</p>
              <p className="text-purple-600 text-sm">Exclusive member content</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}