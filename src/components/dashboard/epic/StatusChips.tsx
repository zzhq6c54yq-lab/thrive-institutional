import React from 'react';
import { TrendingUp, Minus, TrendingDown, Flame, DollarSign } from 'lucide-react';
import { DashboardData } from '@/hooks/useTodayDashboard';

interface StatusChipsProps {
  dashboardData: DashboardData;
}

export const StatusChips: React.FC<StatusChipsProps> = ({ dashboardData }) => {
  // Calculate mood average from recent check-ins
  const recentMood = dashboardData.recentCheckIns[0]?.mood_score || 0;
  const moodTrend = dashboardData.weeklyStats.moodTrend.length >= 2 
    ? dashboardData.weeklyStats.moodTrend[dashboardData.weeklyStats.moodTrend.length - 1].score > 
      dashboardData.weeklyStats.moodTrend[dashboardData.weeklyStats.moodTrend.length - 2].score
      ? 'rising' : 'steady'
    : 'steady';

  const TrendIcon = moodTrend === 'rising' ? TrendingUp : Minus;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {/* Mood Chip */}
      {recentMood > 0 && (
        <div className="px-2 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs text-foreground flex items-center gap-1.5">
          <TrendIcon className="w-3 h-3" />
          <span>Mood: {recentMood.toFixed(1)}/5</span>
        </div>
      )}
      
      {/* Streak Chip */}
      {dashboardData.checkInStreak > 0 && (
        <div className="px-2 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs text-foreground flex items-center gap-1.5">
          <Flame className="w-3 h-3" />
          <span>{dashboardData.checkInStreak} days</span>
        </div>
      )}
      
      {/* Credits Chip */}
      {dashboardData.rewardsWallet && dashboardData.rewardsWallet.copay_credits_usd > 0 && (
        <div className="px-2 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs text-foreground flex items-center gap-1.5">
          <DollarSign className="w-3 h-3" />
          <span>${dashboardData.rewardsWallet.copay_credits_usd.toFixed(2)} credit</span>
        </div>
      )}
    </div>
  );
};
