
import React from "react";
import { Star, ClipboardCheck, Users, PiggyBank, Upload, Gift, Coins } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EarnCreditsTabProps {
  handleEarnCredits: (amount: number, source: string) => void;
  handleUpgradePlan: (plan: string) => void;
  currentPlan: string;
}

const EarnCreditsTab: React.FC<EarnCreditsTabProps> = ({
  handleEarnCredits,
  handleUpgradePlan,
  currentPlan
}) => {
  return (
    <Card className="bg-white border border-amber-200 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl text-amber-800">Earn Co-Pay Credits</CardTitle>
        <CardDescription>Multiple ways to earn credits for your therapy sessions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-amber-200">
                <ClipboardCheck className="h-6 w-6 text-amber-700" />
              </div>
              <h4 className="font-semibold text-lg text-gray-800">Complete Wellness Activities</h4>
            </div>
            <p className="text-gray-600 mb-4 pl-14">Earn $0.10 in credits for each wellness activity you complete. Activities include daily check-ins, mood tracking, journal entries, and more.</p>
            <Button 
              variant="outline"
              className="ml-14 border-amber-300 text-amber-700 hover:bg-amber-100"
              onClick={() => handleEarnCredits(0.1, "wellness activity")}
            >
              Complete Activity
            </Button>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-amber-200">
                <Users className="h-6 w-6 text-amber-700" />
              </div>
              <h4 className="font-semibold text-lg text-gray-800">Refer Friends & Family</h4>
            </div>
            <p className="text-gray-600 mb-4 pl-14">Earn $2.50 for each referral to a family member or friend that signs up with your promo code for Gold or Platinum package.</p>
            <Button 
              variant="outline"
              className="ml-14 border-amber-300 text-amber-700 hover:bg-amber-100"
              onClick={() => handleEarnCredits(2.5, "successful referral")}
            >
              Share Referral Link
            </Button>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-amber-200">
                <PiggyBank className="h-6 w-6 text-amber-700" />
              </div>
              <h4 className="font-semibold text-lg text-gray-800">Subscription Rewards</h4>
            </div>
            <p className="text-gray-600 mb-4 pl-14">Receive up to 10% back in credits on your monthly subscription fees, depending on your membership level.</p>
            <Button 
              variant="outline"
              className="ml-14 border-amber-300 text-amber-700 hover:bg-amber-100"
              onClick={() => handleUpgradePlan(currentPlan === "basic" ? "gold" : "platinum")}
            >
              Upgrade Subscription
            </Button>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-amber-200">
                <Upload className="h-6 w-6 text-amber-700" />
              </div>
              <h4 className="font-semibold text-lg text-gray-800">Participate in Research</h4>
            </div>
            <p className="text-gray-600 mb-4 pl-14">Earn $1.00 for participating in quarterly survey reviews that help us improve our services.</p>
            <Button 
              variant="outline"
              className="ml-14 border-amber-300 text-amber-700 hover:bg-amber-100"
              onClick={() => handleEarnCredits(1.0, "research participation")}
            >
              Take Survey
            </Button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-amber-200">
          <h3 className="text-lg font-medium mb-4 text-amber-800">More Ways to Earn</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-full">
                <Star className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <h5 className="font-medium text-gray-800">Complete Daily Wellness Challenges</h5>
                <p className="text-sm text-gray-600">Earn points that convert to credits by completing daily mental wellness challenges.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-full">
                <Gift className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <h5 className="font-medium text-gray-800">Birthday & Anniversary Bonuses</h5>
                <p className="text-sm text-gray-600">Receive special credits on your birthday and membership anniversaries.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-full">
                <Coins className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <h5 className="font-medium text-gray-800">Bonus Credits for Extended Subscriptions</h5>
                <p className="text-sm text-gray-600">Get extra credits when you commit to longer subscription periods.</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarnCreditsTab;
