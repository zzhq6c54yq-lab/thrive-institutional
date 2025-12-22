
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Brain, Heart, Sparkles, Send } from 'lucide-react';

const AIJournalForm: React.FC = () => {
  const [entry, setEntry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [moodScore, setMoodScore] = useState(0);
  const { user } = useUser();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!entry.trim() || !user) return;

    setIsLoading(true);

    try {
      // First, save the journal entry
      const { data: journalData, error: journalError } = await supabase
        .from('journal_entries')
        .insert({
          user_id: user.id,
          notes: entry,
          mood: 'processing' // temporary mood while AI processes
        })
        .select()
        .single();

      if (journalError) throw journalError;

      // Call AI companion edge function
      const { data: aiData, error: aiError } = await supabase.functions.invoke(
        'ai-journal-companion',
        {
          body: {
            journalEntry: entry,
            userId: user.id
          }
        }
      );

      if (aiError) {
        console.error('AI processing error:', aiError);
        // Still show success for journal entry even if AI fails
        toast({
          title: "Journal entry saved!",
          description: "AI insights are temporarily unavailable.",
          variant: "success"
        });
      } else {
        setAiResponse(aiData.aiResponse);
        setSentiment(aiData.sentiment);
        setMoodScore(aiData.moodScore);
        
        toast({
          title: "Journal entry processed!",
          description: "Your AI companion has some insights for you.",
          variant: "success"
        });
      }

      setEntry('');
    } catch (error) {
      console.error('Error saving journal entry:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getMoodColor = (score: number) => {
    if (score >= 4) return 'bg-green-500';
    if (score === 3) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center text-indigo-900">
            <Brain className="h-6 w-6 text-indigo-600 mr-2" />
            AI Journal Companion
          </CardTitle>
          <p className="text-indigo-700">
            Share your thoughts and receive personalized insights from your AI companion.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="What's on your mind today? Share your thoughts, feelings, or experiences..."
              className="min-h-[200px] resize-none border-indigo-300 focus:border-indigo-500"
              disabled={isLoading}
            />
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {entry.length}/1000 characters
              </p>
              <Button
                type="submit"
                disabled={!entry.trim() || isLoading}
                className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Brain className="h-4 w-4 animate-pulse" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Share with AI
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {aiResponse && (
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-900">
              <Sparkles className="h-6 w-6 text-purple-600 mr-2" />
              AI Insights
            </CardTitle>
            <div className="flex gap-2 mt-2">
              {sentiment && (
                <Badge className={getSentimentColor(sentiment)}>
                  {sentiment} sentiment
                </Badge>
              )}
              {moodScore > 0 && (
                <Badge className="bg-blue-100 text-blue-800">
                  <Heart className="h-3 w-3 mr-1" />
                  Mood: {moodScore}/5
                  <div className={`w-2 h-2 rounded-full ml-1 ${getMoodColor(moodScore)}`} />
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-white/70 p-4 rounded-lg">
              <p className="text-gray-800 leading-relaxed">{aiResponse}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIJournalForm;
