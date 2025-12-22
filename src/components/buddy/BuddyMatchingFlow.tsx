import { useState } from "react";
import { useBuddyMatch } from "@/hooks/useBuddyMatch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

const BuddyMatchingFlow = ({ userId }: { userId?: string }) => {
  const { createMatchRequest } = useBuddyMatch(userId);
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    goals: [] as string[],
    communicationStyle: "",
    frequency: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    interests: [] as string[],
  });

  const goalOptions = ["Anxiety Management", "Depression Support", "Sleep Improvement", "Stress Reduction", "Mindfulness", "Exercise"];
  const styleOptions = ["Supportive & Encouraging", "Direct & Honest", "Casual & Friendly", "Structured & Goal-Focused"];
  const frequencyOptions = ["Daily Check-ins", "2-3 times per week", "Weekly Updates", "As Needed"];
  const interestOptions = ["Meditation", "Exercise", "Journaling", "Reading", "Cooking", "Art/Creativity"];

  const handleSubmit = () => {
    createMatchRequest.mutate(preferences);
  };

  return (
    <Card className="p-8 glass-card max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold gradient-heading mb-2">
            Step {step} of 5: {step === 1 ? "Your Goals" : step === 2 ? "Communication Style" : step === 3 ? "Check-in Frequency" : step === 4 ? "Timezone" : "Interests"}
          </h2>
          <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <Label>What are your main goals? (Select all that apply)</Label>
            {goalOptions.map((goal) => (
              <div key={goal} className="flex items-center space-x-2">
                <Checkbox
                  id={goal}
                  checked={preferences.goals.includes(goal)}
                  onCheckedChange={(checked) => {
                    setPreferences(prev => ({
                      ...prev,
                      goals: checked
                        ? [...prev.goals, goal]
                        : prev.goals.filter(g => g !== goal)
                    }));
                  }}
                />
                <label htmlFor={goal} className="text-sm">{goal}</label>
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <Label>What communication style do you prefer?</Label>
            <RadioGroup
              value={preferences.communicationStyle}
              onValueChange={(value) =>
                setPreferences(prev => ({ ...prev, communicationStyle: value }))
              }
            >
              {styleOptions.map((style) => (
                <div key={style} className="flex items-center space-x-2">
                  <RadioGroupItem value={style} id={style} />
                  <Label htmlFor={style}>{style}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <Label>How often would you like to check in?</Label>
            <RadioGroup
              value={preferences.frequency}
              onValueChange={(value) =>
                setPreferences(prev => ({ ...prev, frequency: value }))
              }
            >
              {frequencyOptions.map((freq) => (
                <div key={freq} className="flex items-center space-x-2">
                  <RadioGroupItem value={freq} id={freq} />
                  <Label htmlFor={freq}>{freq}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <Label>Timezone</Label>
            <p className="text-sm text-muted-foreground">
              Detected timezone: <span className="font-semibold">{preferences.timezone}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              We'll match you with someone in a compatible timezone for easier scheduling.
            </p>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <Label>What activities interest you? (Select all that apply)</Label>
            {interestOptions.map((interest) => (
              <div key={interest} className="flex items-center space-x-2">
                <Checkbox
                  id={interest}
                  checked={preferences.interests.includes(interest)}
                  onCheckedChange={(checked) => {
                    setPreferences(prev => ({
                      ...prev,
                      interests: checked
                        ? [...prev.interests, interest]
                        : prev.interests.filter(i => i !== interest)
                    }));
                  }}
                />
                <label htmlFor={interest} className="text-sm">{interest}</label>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-4">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
              Back
            </Button>
          )}
          {step < 5 ? (
            <Button onClick={() => setStep(step + 1)} className="flex-1">
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="flex-1" disabled={createMatchRequest.isPending}>
              {createMatchRequest.isPending ? "Finding Your Match..." : "Find My Buddy"}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default BuddyMatchingFlow;
