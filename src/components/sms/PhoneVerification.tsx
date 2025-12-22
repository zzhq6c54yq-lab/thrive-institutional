import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSMSSubscription } from "@/hooks/useSMSSubscription";

const PhoneVerification = ({ userId }: { userId?: string }) => {
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("09:00");
  const [frequency, setFrequency] = useState("daily");
  const { createSubscription } = useSMSSubscription(userId);

  const handleSubmit = () => {
    createSubscription.mutate({
      phone_number: phone,
      frequency,
      preferred_time: time,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  };

  return (
    <Card className="p-8 glass-card max-w-md mx-auto">
      <h2 className="text-2xl font-bold gradient-heading mb-6">Set Up SMS Check-ins</h2>

      <div className="space-y-6">
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Standard SMS rates may apply
          </p>
        </div>

        <div>
          <Label htmlFor="frequency">Check-in Frequency</Label>
          <select
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-md border border-input bg-background"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        <div>
          <Label htmlFor="time">Preferred Time</Label>
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1"
          />
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={!phone || createSubscription.isPending}
        >
          {createSubscription.isPending ? "Setting Up..." : "Activate SMS Check-ins"}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          We'll send you a wellness check-in at your chosen time. Reply with a number 1-10 to track your mood.
        </p>
      </div>
    </Card>
  );
};

export default PhoneVerification;
