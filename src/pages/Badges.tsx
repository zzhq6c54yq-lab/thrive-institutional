import React from "react";
import { AchievementBadgesGallery } from "@/components/gamification/AchievementBadgesGallery";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BadgesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/app/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <AchievementBadgesGallery />
      </div>
    </div>
  );
}