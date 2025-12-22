import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    console.log('Starting OG image generation...');

    // Detailed prompt for institutional mental health OG image
    const prompt = `Create a professional social media preview image, exactly 1200x630 pixels, ultra high resolution.

Design specifications:
- Background: Deep black (#0a0a0a) with a subtle radial gradient of bronze/copper (#C9A962) emanating from the center, creating depth
- Top section: Large bold white text "ThriveMT" with the "MT" portion in a metallic bronze/gold gradient
- Center: Three connected circular nodes in a horizontal line, connected by thin gradient lines:
  * Left node: White/silver glow representing AI (brain circuit icon inside)
  * Center node: Bronze/copper glow representing Coaching (compass/guidance icon inside)
  * Right node: Gold/amber glow representing Therapy (heart/clinical icon inside)
- Below the nodes: Large white text "Institutional Mental Health Infrastructure" in a clean sans-serif font
- Bottom section: Tagline "Scalable. Compliant. Measurable." in muted bronze/off-white color
- Lower right corner: Small HIPAA compliant shield badge in subtle bronze
- Overall aesthetic: Enterprise, professional, premium, modern, trustworthy
- No stock photo elements, purely designed graphics and typography
- 16:9 aspect ratio for social media preview cards`;

    console.log('Calling Lovable AI Gateway for image generation...');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        modalities: ['image', 'text']
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Payment required. Please add credits to continue.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI response received');

    // Extract the generated image
    const imageData = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageData) {
      console.error('No image in response:', JSON.stringify(data));
      throw new Error('No image generated in response');
    }

    console.log('Image generated successfully, uploading to storage...');

    // Initialize Supabase client with service role for storage access
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Convert base64 to blob
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const fileName = `og-image-${Date.now()}.png`;
    
    // Upload to storage bucket
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('og-images')
      .upload(fileName, bytes, {
        contentType: 'image/png',
        upsert: true
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    console.log('Image uploaded:', uploadData.path);

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('og-images')
      .getPublicUrl(fileName);

    console.log('Public URL:', urlData.publicUrl);

    return new Response(JSON.stringify({ 
      success: true,
      imageUrl: urlData.publicUrl,
      base64Preview: imageData,
      fileName: fileName
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
