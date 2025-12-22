import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartHandshake, ChevronRight, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function BuddySystemSection() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Card className="bg-gradient-to-br from-amber-500/5 to-orange-500/5 border-amber-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <HeartHandshake className="w-6 h-6 text-amber-500" />
              Accountability Partners
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/app/buddy-system")}
              className="gap-1"
            >
              Find Partner
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="text-center py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Connect with someone who shares your goals. Stay motivated together through shared challenges and progress updates.
          </p>
          <Button 
            onClick={() => navigate("/app/buddy-system")}
            className="bg-amber-500 hover:bg-amber-600 text-white gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Get Matched with a Buddy
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
