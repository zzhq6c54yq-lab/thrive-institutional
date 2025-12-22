import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CommunityServiceTracker } from "@/components/therapy/CommunityServiceTracker";

export default function BarterApplicationPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/app/real-time-therapy")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Therapy
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Financial Assistance Program</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Our community service program allows you to exchange volunteer hours for therapy session credits.
              Complete community service and log your hours below to earn credits toward your sessions.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Rate:</strong> $15 per hour of verified community service
            </p>
          </CardContent>
        </Card>

        <CommunityServiceTracker />
      </div>
    </div>
  );
}