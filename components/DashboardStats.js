'use client';

import { TrendingUp, Gift, Trophy, Users, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { formatCurrency, getRankSuffix } from '../lib/utils';

export default function DashboardStats({ user }) {
  const [copied, setCopied] = useState(false);

  const handleCopyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(user.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const stats = [
    {
      title: 'Your Referral Code',
      value: user.referralCode,
      icon: TrendingUp,
      color: 'blue',
      description: 'Share this code to earn referrals',
      action: true
    },
    {
      title: 'Total Raised',
      value: formatCurrency(user.totalDonations),
      icon: Gift,
      color: 'green',
      description: '+$2,400 this month',
      growth: true
    },
    {
      title: 'Your Rank',
      value: `${user.rank}${getRankSuffix(user.rank)} Place`,
      icon: Trophy,
      color: 'yellow',
      description: 'Out of 50 interns'
    },
    {
      title: 'Active Days',
      value: Math.floor((new Date() - new Date(user.joinedDate)) / (1000 * 60 * 60 * 24)),
      icon: Users,
      color: 'purple',
      description: 'Since you joined'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: { bg: 'bg-blue-50', icon: 'text-blue-500', border: 'border-blue-200' },
      green: { bg: 'bg-green-50', icon: 'text-green-500', border: 'border-green-200' },
      yellow: { bg: 'bg-yellow-50', icon: 'text-yellow-500', border: 'border-yellow-200' },
      purple: { bg: 'bg-purple-50', icon: 'text-purple-500', border: 'border-purple-200' }
    };
    return colors[color];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const colors = getColorClasses(stat.color);
        
        return (
          <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">{stat.title}</h3>
              <div className={`p-2 rounded-lg ${colors.bg}`}>
                <Icon className={colors.icon} size={24} />
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <p className="text-2xl font-bold text-gray-800">
                {typeof stat.value === 'number' ? stat.value : stat.value}
              </p>
              {stat.action && (
                <button
                  onClick={handleCopyReferralCode}
                  className={`p-2 rounded-lg transition-all ${
                    copied 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                  title="Copy referral code"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <p className={`text-sm ${
                stat.growth ? 'text-green-600' : 'text-gray-500'
              }`}>
                {stat.description}
              </p>
              {stat.growth && (
                <TrendingUp className="text-green-500" size={16} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}