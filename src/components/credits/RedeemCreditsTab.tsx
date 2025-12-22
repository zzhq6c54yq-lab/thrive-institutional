
import React from "react";
import { ArrowLeft, CreditCard, BadgePercent, ShoppingBag, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface RedeemCreditsTabProps {
  credits: number;
  handleCashOut: (amount: number) => void;
  handleUpgradePlan: (plan: string) => void;
}

const RedeemCreditsTab: React.FC<RedeemCreditsTabProps> = ({
  credits,
  handleCashOut,
  handleUpgradePlan
}) => {
  const { toast } = useToast();
  
  return (
    <Card className="bg-white border border-amber-200 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl text-amber-800">Redeem Your Credits</CardTitle>
        <CardDescription>Use your earned credits for therapy sessions and more</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Credit conversions */}
        <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
          <h3 className="text-lg font-medium mb-4 text-amber-800">Convert to Thrive Credits</h3>
          <p className="text-gray-700 mb-6">
            Convert your earned co-pay credits to usable Thrive credits in $5 increments.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
            {[5, 10, 15, 20, 25].map(amount => (
              <Button
                key={amount}
                className={`${credits >= amount ? 'bg-amber-500 hover:bg-amber-600 text-black' : 'bg-gray-200 text-gray-500'} font-medium`}
                disabled={credits < amount}
                onClick={() => handleCashOut(amount)}
              >
                ${amount}
              </Button>
            ))}
          </div>
          <div className="bg-white p-4 rounded border border-amber-300 text-sm text-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-4 w-4 text-amber-600" />
              <span className="font-medium text-gray-700">How Cash Out Works</span>
            </div>
            <p>
              Select an amount above to convert your co-pay credits to usable Thrive credits. 
              These can be used immediately for therapy sessions, program upgrades, or in the Thrive Apparel shop.
            </p>
          </div>
        </div>
        
        {/* Where to use credits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white border border-amber-200">
            <CardHeader className="bg-amber-50">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-amber-600" />
                Therapy Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-600 mb-4">Apply your credits to reduce the cost of your next therapy session.</p>
              <Button 
                className="w-full bg-amber-500 hover:bg-amber-600 text-black"
                onClick={() => {
                  if (credits >= 5) {
                    handleCashOut(5);
                    toast({
                      title: "Credits Applied",
                      description: "Your credits have been applied to your next therapy session."
                    });
                  } else {
                    toast({
                      title: "Not enough credits",
                      description: "You need at least $5 in credits to apply to a therapy session.",
                      variant: "destructive"
                    });
                  }
                }}
              >
                Apply to Next Session
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-white border border-amber-200">
            <CardHeader className="bg-amber-50">
              <CardTitle className="text-lg flex items-center gap-2">
                <BadgePercent className="h-5 w-5 text-amber-600" />
                Subscription Upgrade
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-600 mb-4">Use your credits to upgrade your membership and earn even more rewards.</p>
              <Button 
                className="w-full bg-amber-500 hover:bg-amber-600 text-black"
                onClick={() => {
                  if (credits >= 5) {
                    handleUpgradePlan("gold");
                    toast({
                      title: "Redirecting to Upgrade Page",
                      description: "You'll be able to use your credits to upgrade your membership."
                    });
                  } else {
                    toast({
                      title: "Not enough credits",
                      description: "You need at least $5 in credits to upgrade your membership.",
                      variant: "destructive"
                    });
                  }
                }}
              >
                Upgrade Membership
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-white border border-amber-200">
            <CardHeader className="bg-amber-50">
              <CardTitle className="text-lg flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-amber-600" />
                Thrive Apparel
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-600 mb-4">Shop for mental wellness merchandise with your credits at our apparel store.</p>
              <a href="https://thrive-apparel.com" target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black">
                  Shop Now
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
        
        <div className="p-6 rounded-lg bg-white border border-amber-200">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2 text-amber-800 border-amber-300">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RedeemCreditsTab;
