'use client';

import { Gift, Star, TrendingUp, Medal, Trophy, Crown, Lock } from 'lucide-react';
import { rewards, formatCurrency } from '../lib/utils';

export default function RewardsSection({ user }) {
  const getIcon = (iconName) => {
    const icons = {
      Star,
      TrendingUp,
      Medal,
      Trophy,
      Crown
    };
    return icons[iconName] || Star;
  };

  const isRewardUnlocked = (reward) => {
    return user.totalDonations >= reward.amount;
  };

  const getProgressPercentage = (reward) => {
    if (user.totalDonations >= reward.amount) return 100;
    if (reward.amount === 0) return 100;
    return Math.min((user.totalDonations / reward.amount) * 100, 100);
  };

  const getNextReward = () => {
    return rewards.find(reward => !isRewardUnlocked(reward));
  };

  const nextReward = getNextReward();

  return (
    <div className="space-y-6">
      {/* Progress to Next Reward */}
      {nextReward && (
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Next Reward</h3>
            <div className="bg-white bg-opacity-20 rounded-full p-2">
              <Gift size={20} />
            </div>
          </div>
          <div className="mb-4">
            <h4 className="font-medium mb-1">{nextReward.title}</h4>
            <p className="text-purple-100 text-sm">{nextReward.description}</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{formatCurrency(user.totalDonations)}</span>
              <span>{formatCurrency(nextReward.amount)}</span>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage(nextReward)}%` }}
              ></div>
            </div>
            <p className="text-xs text-purple-100">
              {formatCurrency(nextReward.amount - user.totalDonations)} more to unlock
            </p>
          </div>
        </div>
      )}

      {/* Rewards Grid */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Gift className="mr-2 text-purple-500" size={24} />
          Rewards & Achievements
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rewards.map((reward) => {
            const IconComponent = getIcon(reward.icon);
            const unlocked = isRewardUnlocked(reward);
            const progress = getProgressPercentage(reward);
            
            return (
              <div
                key={reward.id}
                className={`relative p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                  unlocked
                    ? 'border-green-200 bg-green-50 hover:bg-green-100 shadow-md'
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                {/* Unlock Status Badge */}
                <div className="absolute top-2 right-2">
                  {unlocked ? (
                    <div className="bg-green-500 text-white rounded-full p-1">
                      <Trophy size={12} />
                    </div>
                  ) : (
                    <div className="bg-gray-400 text-white rounded-full p-1">
                      <Lock size={12} />
                    </div>
                  )}
                </div>

                <div className="flex items-center mb-3">
                  <div className={`p-2 rounded-full ${
                    unlocked ? 'bg-green-500' : 'bg-gray-400'
                  }`}>
                    <IconComponent className="text-white" size={16} />
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-800">{reward.title}</h4>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Target: {formatCurrency(reward.amount)}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        unlocked ? 'bg-green-500' : 'bg-blue-400'
                      }`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {unlocked && (
                  <div className="mt-3 text-center">
                    <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
                      ✨ Unlocked!
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">
                {rewards.filter(r => isRewardUnlocked(r)).length}
              </p>
              <p className="text-xs text-gray-500">Unlocked</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {rewards.length - rewards.filter(r => isRewardUnlocked(r)).length}
              </p>
              <p className="text-xs text-gray-500">Remaining</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round((rewards.filter(r => isRewardUnlocked(r)).length / rewards.length) * 100)}%
              </p>
              <p className="text-xs text-gray-500">Complete</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">
                {nextReward ? formatCurrency(nextReward.amount - user.totalDonations) : '🎉'}
              </p>
              <p className="text-xs text-gray-500">To Next</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}