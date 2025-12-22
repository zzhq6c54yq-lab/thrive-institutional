import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MOOD_PROMPTS = {
  calm: "The user is in a calm, reflective state. Encourage mindfulness and self-awareness. Help them deepen their understanding of this peaceful moment.",
  sad: "The user is feeling sad. Validate their emotions without trying to 'fix' them. Offer gentle support and remind them that sadness is a natural response to life's challenges.",
  angry: "The user is feeling angry. Help them identify the root cause beneath the anger (often hurt, fear, or injustice). Suggest healthy ways to express and process this energy.",
  anxious: "The user is feeling anxious. Provide grounding techniques and normalize their feelings. Remind them that anxiety is their mind trying to protect them.",
  hopeful: "The user is feeling hopeful. Reinforce this positive momentum and celebrate their growth. Help them anchor this feeling for harder days ahead."
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, mood } = await req.json();
    
    if (!text || !mood) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: text and mood' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are MirrorAI, a trauma-informed companion for ThriveMT's Unburden feature.
${MOOD_PROMPTS[mood as keyof typeof MOOD_PROMPTS] || MOOD_PROMPTS.sad}

The user shared: "${text}"

Provide a compassionate reflection that:
1. Validates their ${mood} emotion without judgment
2. Reflects back what you hear in their words
3. Offers a gentle reframe or insight
4. Suggests one immediate micro-action they can take
5. Ends with hope and acknowledgment of their courage

Keep it 100-150 words, warm and conversational. Use "you" to speak directly to them.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits depleted. Please contact support.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: 'Failed to generate reflection' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const reflection = data.choices?.[0]?.message?.content;

    if (!reflection) {
      console.error('No reflection in response:', data);
      return new Response(
        JSON.stringify({ error: 'Failed to generate reflection' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        reflection,
        breathingExercise: "Take 3 deep breaths: inhale for 4, hold for 4, exhale for 6.",
        affirmation: "You showed courage by sharing. That's a step forward."
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in unburden-reflect:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
