import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Clock, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/contexts/UserContext";

export function BarterPaymentOption() {
  const { user } = useUser();
  const [barterStatus, setBarterStatus] = useState<{
    hasApplication: boolean;
    status: string | null;
    creditBalance: number;
  }>({
    hasApplication: false,
    status: null,
    creditBalance: 0,
  });

  useEffect(() => {
    const checkBarterStatus = async () => {
      if (!user) return;

      const { data: application } = await supabase
        .from("barter_applications")
        .select("status")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (application) {
        // Check community service credits
        const { data: credits } = await supabase
          .from("community_service_hours")
          .select("credit_value")
          .eq("user_id", user.id)
          .eq("verified", true);

        const totalCredits = credits?.reduce((sum, c) => sum + (c.credit_value || 0), 0) || 0;

        setBarterStatus({
          hasApplication: true,
          status: application.status,
          creditBalance: totalCredits,
        });
      }
    };

    checkBarterStatus();
  }, [user]);

  if (!barterStatus.hasApplication || barterStatus.status !== "approved") {
    return null;
  }

  const canUseBarter = barterStatus.creditBalance >= 200;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
      >
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                <Heart className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold">Financial Assistance Available</h4>
                  <Badge variant="outline" className="text-xs border-green-600 text-green-600">
                    Approved
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  You're approved for our community service program. Your service hours can be used as credits toward therapy sessions.
                </p>

                <div className="flex items-center justify-between bg-background/50 p-3 rounded-lg mb-3">
                  <span className="text-sm">Available Credits</span>
                  <span className="font-bold text-green-600 dark:text-green-400">
                    ${barterStatus.creditBalance.toFixed(2)}
                  </span>
                </div>

                {canUseBarter ? (
                  <Alert className="border-green-200 dark:border-green-800">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertDescription>
                      You can use your credits to pay for this session!
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert>
                    <Clock className="h-4 w-4" />
                    <AlertDescription>
                      You need ${(200 - barterStatus.creditBalance).toFixed(2)} more in credits to book a session.
                      Complete community service hours to earn more credits.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}