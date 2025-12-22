
import React from "react";
import { CreditCard, Download } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ActivityHistoryCard: React.FC = () => {
  const { toast } = useToast();
  
  const recentActivity = [
    { date: "Apr 15, 2024", action: "Used for session", amount: -25 },
    { date: "Apr 12, 2024", action: "Thrive Apparel purchase", amount: -15 },
    { date: "Apr 10, 2024", action: "Wellness challenge", amount: 15 },
    { date: "Apr 5, 2024", action: "Referral bonus", amount: 30 },
    { date: "Mar 28, 2024", action: "Used for session", amount: -25 },
    { date: "Mar 20, 2024", action: "Monthly subscription", amount: 10 }
  ];
  
  const handleDownloadTransactions = () => {
    toast({
      title: "Transactions Downloaded",
      description: "Your transaction history has been downloaded successfully."
    });
  };
  
  return (
    <Card className="bg-white shadow-md border border-amber-200">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200">
        <CardTitle className="text-xl flex items-center gap-2 text-amber-800">
          <CreditCard className="h-5 w-5 text-amber-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="max-h-[360px] overflow-y-auto pt-6">
        <div className="space-y-4">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex justify-between py-3 border-b border-gray-100 last:border-0">
              <div>
                <div className="text-sm font-medium text-gray-800">{item.action}</div>
                <div className="text-xs text-gray-500">{item.date}</div>
              </div>
              <div className={`font-medium ${item.amount > 0 ? 'text-green-600' : 'text-amber-600'}`}>
                {item.amount > 0 ? `+$${item.amount}` : `-$${Math.abs(item.amount)}`}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2 bg-amber-50">
        <Button 
          variant="outline" 
          className="w-full text-amber-700 border-amber-300 hover:bg-amber-100"
          onClick={handleDownloadTransactions}
        >
          <Download className="h-4 w-4 mr-2" />
          View All Transactions
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActivityHistoryCard;
