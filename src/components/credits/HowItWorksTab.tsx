
import React from "react";
import { Star, Heart, Gift, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface HowItWorksTabProps {
  setActiveTab: (tab: string) => void;
}

const HowItWorksTab: React.FC<HowItWorksTabProps> = ({ setActiveTab }) => {
  return (
    <Card className="bg-white border border-amber-200 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl text-amber-800">About Co-Pay Credits</CardTitle>
        <CardDescription>Understanding our rewards program</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
          <h3 className="text-lg font-medium mb-4 text-amber-800">How It Works</h3>
          <p className="text-gray-700 mb-4">
            As a member of our program, you can earn back dollar-value credits from your spending:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-amber-200 mt-1">
                <Star className="h-4 w-4 text-amber-700" />
              </div>
              <div>
                <span className="font-medium text-gray-800">Gold Membership:</span>
                <p className="text-gray-600">Earn $5 back on every $100 spent. This applies to all therapy costs and monthly subscriptions.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-amber-200 mt-1">
                <Star className="h-4 w-4 text-amber-700" />
              </div>
              <div>
                <span className="font-medium text-gray-800">Platinum Membership:</span>
                <p className="text-gray-600">Enjoy even greater rewards with $10 back on every $100 spent. The platinum tier is designed for those who want to maximize their benefits.</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-amber-200">
          <h3 className="text-lg font-medium mb-4 text-amber-800">Why Join?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <div className="p-2 rounded-full bg-amber-200 w-12 h-12 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-amber-700" />
              </div>
              <h4 className="font-medium mb-2 text-gray-800">Encourage Self-Care</h4>
              <p className="text-sm text-gray-600">Our program incentivizes you to invest in your mental well-being, making it easier to prioritize self-care.</p>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <div className="p-2 rounded-full bg-amber-200 w-12 h-12 flex items-center justify-center mb-4">
                <Gift className="h-6 w-6 text-amber-700" />
              </div>
              <h4 className="font-medium mb-2 text-gray-800">Flexible Rewards</h4>
              <p className="text-sm text-gray-600">Use your co-pay credits on therapy sessions, subscription upgrades, or at thrive-apparel.com for exclusive merchandise.</p>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <div className="p-2 rounded-full bg-amber-200 w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-amber-700" />
              </div>
              <h4 className="font-medium mb-2 text-gray-800">Community Support</h4>
              <p className="text-sm text-gray-600">Join a community that values mental health, where your investments not only benefit you but also support our mission to promote wellness.</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-lg bg-gradient-to-r from-amber-100 to-amber-200 border border-amber-300">
          <h3 className="text-lg font-medium mb-3 text-amber-800">Getting Started</h3>
          <p className="text-gray-700">
            Join our co-pay credits program by upgrading to Gold or Platinum membership. You'll immediately start earning credits on your therapy expenses and can redeem them any time.
          </p>
          <Button 
            className="mt-4 bg-amber-500 hover:bg-amber-600 text-black font-semibold shadow-md"
            onClick={() => setActiveTab("earn")}
          >
            Learn How to Earn Credits
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HowItWorksTab;
