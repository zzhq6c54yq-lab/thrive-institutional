
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { journalEntry, userId } = await req.json()
    
    if (!journalEntry || !userId) {
      return new Response(
        JSON.stringify({ error: 'Missing journal entry or user ID' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // Generate AI response (placeholder - would use OpenAI in production)
    const aiResponse = await generateJournalResponse(journalEntry)
    const sentiment = analyzeSentiment(journalEntry)
    const moodScore = calculateMoodScore(journalEntry)

    // Update the journal entry with AI insights
    const { error } = await supabaseClient
      .from('journal_entries')
      .update({
        ai_response: aiResponse,
        ai_sentiment: sentiment,
        mood_score: moodScore
      })
      .eq('user_id', userId)
      .eq('notes', journalEntry)

    if (error) {
      console.error('Error updating journal entry:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to update journal entry' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        aiResponse, 
        sentiment, 
        moodScore 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in ai-journal-companion:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function generateJournalResponse(entry: string): Promise<string> {
  // Placeholder AI response generation
  const supportiveResponses = [
    "Thank you for sharing your thoughts. It takes courage to express your feelings, and I want you to know that your experiences are valid.",
    "I hear you, and what you're going through sounds challenging. Remember that it's okay to feel this way, and you're not alone in this journey.",
    "Your reflection shows great self-awareness. Consider what small step you might take today to nurture your well-being.",
    "It's beautiful that you're taking time to process your emotions through writing. This practice can be incredibly healing.",
    "I appreciate your openness in sharing this. Your feelings matter, and it's important to acknowledge them as you've done here."
  ];
  
  return supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
}

function analyzeSentiment(entry: string): string {
  const positiveWords = ['happy', 'good', 'great', 'awesome', 'love', 'excited', 'grateful', 'blessed'];
  const negativeWords = ['sad', 'angry', 'frustrated', 'worried', 'anxious', 'depressed', 'terrible', 'awful'];
  
  const words = entry.toLowerCase().split(/\s+/);
  let positiveCount = 0;
  let negativeCount = 0;
  
  words.forEach(word => {
    if (positiveWords.some(pw => word.includes(pw))) positiveCount++;
    if (negativeWords.some(nw => word.includes(nw))) negativeCount++;
  });
  
  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
}

function calculateMoodScore(entry: string): number {
  const sentiment = analyzeSentiment(entry);
  switch (sentiment) {
    case 'positive': return Math.floor(Math.random() * 2) + 4; // 4-5
    case 'negative': return Math.floor(Math.random() * 2) + 1; // 1-2
    default: return 3; // neutral
  }
}
