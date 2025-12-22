import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSMSSubscription } from "@/hooks/useSMSSubscription";

interface CheckInScheduleProps {
  subscription: any;
  userId?: string;
}

const CheckInSchedule = ({ subscription, userId }: CheckInScheduleProps) => {
  const [isActive, setIsActive] = useState(subscription.is_active);
  const [frequency, setFrequency] = useState(subscription.frequency);
  const [time, setTime] = useState(subscription.preferred_time);
  const { updateSubscription } = useSMSSubscription(userId);

  const handleSave = () => {
    updateSubscription.mutate({
      is_active: isActive,
      frequency,
      preferred_time: time,
    });
  };

  return (
    <Card className="p-6 glass-card">
      <h2 className="text-xl font-bold gradient-heading mb-6">SMS Check-in Settings</h2>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label>Active Status</Label>
            <p className="text-sm text-muted-foreground">
              {isActive ? "Check-ins are active" : "Check-ins are paused"}
            </p>
          </div>
          <Switch checked={isActive} onCheckedChange={setIsActive} />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={subscription.phone_number}
            disabled
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="freq">Frequency</Label>
          <select
            id="freq"
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
          <p className="text-xs text-muted-foreground mt-1">
            Timezone: {subscription.timezone}
          </p>
        </div>

        <Button onClick={handleSave} className="w-full" disabled={updateSubscription.isPending}>
          {updateSubscription.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </Card>
  );
};

export default CheckInSchedule;
