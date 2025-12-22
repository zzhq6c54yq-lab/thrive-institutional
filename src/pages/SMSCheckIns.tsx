import { useUser } from "@/contexts/UserContext";
import { useSMSSubscription } from "@/hooks/useSMSSubscription";
import PhoneVerification from "@/components/sms/PhoneVerification";
import CheckInSchedule from "@/components/sms/CheckInSchedule";
import SMSHistory from "@/components/sms/SMSHistory";
import { Card } from "@/components/ui/card";
import { Smartphone, Clock, MessageCircle, TrendingUp } from "lucide-react";

const SMSCheckIns = () => {
  const { user } = useUser();
  const { subscription, isLoading } = useSMSSubscription(user?.id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading SMS check-ins...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold gradient-heading">
            SMS Wellness Check-ins
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay connected with daily or weekly text message check-ins. We'll reach you where you are.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 glass-card text-center space-y-3">
            <Smartphone className="w-12 h-12 mx-auto text-primary" />
            <h3 className="font-semibold">Convenient</h3>
            <p className="text-sm text-muted-foreground">
              Check-ins come to you via SMS
            </p>
          </Card>

          <Card className="p-6 glass-card text-center space-y-3">
            <Clock className="w-12 h-12 mx-auto text-primary" />
            <h3 className="font-semibold">Flexible</h3>
            <p className="text-sm text-muted-foreground">
              Choose daily, weekly, or custom frequency
            </p>
          </Card>

          <Card className="p-6 glass-card text-center space-y-3">
            <MessageCircle className="w-12 h-12 mx-auto text-primary" />
            <h3 className="font-semibold">Simple</h3>
            <p className="text-sm text-muted-foreground">
              Just reply with a number 1-10
            </p>
          </Card>

          <Card className="p-6 glass-card text-center space-y-3">
            <TrendingUp className="w-12 h-12 mx-auto text-primary" />
            <h3 className="font-semibold">Tracked</h3>
            <p className="text-sm text-muted-foreground">
              Responses logged to your progress
            </p>
          </Card>
        </div>

        {!subscription ? (
          <PhoneVerification userId={user?.id} />
        ) : (
          <>
            <CheckInSchedule subscription={subscription} userId={user?.id} />
            <SMSHistory userId={user?.id} />
          </>
        )}
      </div>
    </div>
  );
};

export default SMSCheckIns;
