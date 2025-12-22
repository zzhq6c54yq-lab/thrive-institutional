import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  role?: string;
  message: string;
}

const CEO_EMAIL = 'damien@thrive-mental.com';

const getRoleLabel = (role?: string): string => {
  switch (role) {
    case 'client':
      return 'Potential Client';
    case 'therapist':
      return 'Therapist';
    case 'coach':
      return 'Coach';
    case 'investor':
      return 'Investor';
    case 'partner':
      return 'Business Partner';
    default:
      return 'General Inquiry';
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, role, message }: ContactRequest = await req.json();

    console.log("Processing contact form from:", name, email, "role:", role);

    const roleLabel = getRoleLabel(role);

    // Send notification directly to CEO
    await resend.emails.send({
      from: "ThriveMT Priority <noreply@thrive-mental.com>",
      to: [CEO_EMAIL],
      reply_to: email,
      subject: `🔔 Direct Inquiry from ${name} (${roleLabel})`,
      html: `
        <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #D4A574 0%, #B87333 100%); padding: 24px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #000; margin: 0; font-size: 22px; font-weight: 600; letter-spacing: 0.5px;">Priority Message Received</h1>
            <p style="color: #000; margin: 8px 0 0 0; font-size: 14px; opacity: 0.8;">Direct to CEO Channel</p>
          </div>
          <div style="padding: 32px; background: #0d0d0d; color: #fff;">
            <div style="background: linear-gradient(135deg, rgba(212, 165, 116, 0.1) 0%, rgba(184, 115, 51, 0.1) 100%); border: 1px solid rgba(212, 165, 116, 0.3); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
              <p style="margin: 0; color: #D4A574; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Sender Profile</p>
              <h2 style="margin: 8px 0 4px 0; color: #fff; font-size: 20px;">${name}</h2>
              <p style="margin: 0; color: #888;"><a href="mailto:${email}" style="color: #D4A574; text-decoration: none;">${email}</a></p>
              <p style="margin: 8px 0 0 0; color: #fff; font-size: 14px;"><strong>Interest:</strong> ${roleLabel}</p>
            </div>
            
            <div style="margin-bottom: 24px;">
              <p style="margin: 0 0 12px 0; color: #D4A574; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Message</p>
              <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; border-left: 3px solid #D4A574;">
                <p style="margin: 0; color: #fff; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <a href="mailto:${email}?subject=Re: Your ThriveMT Inquiry" style="display: inline-block; background: linear-gradient(135deg, #D4A574 0%, #B87333 100%); color: #000; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
              Respond Directly →
            </a>
          </div>
          <div style="padding: 16px 20px; background: #000; text-align: center; color: #666; font-size: 11px; border-radius: 0 0 8px 8px;">
            <p style="margin: 0;">ThriveMT Executive Communications • ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
      `,
    });

    // Send confirmation to sender - emphasizing CEO connection
    await resend.emails.send({
      from: "ThriveMT <noreply@thrive-mental.com>",
      to: [email],
      subject: "Your Message Has Been Received by Our Leadership Team",
      html: `
        <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #D4A574 0%, #B87333 100%); padding: 24px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #000; margin: 0; font-size: 22px; font-weight: 600;">Thank You, ${name}</h1>
          </div>
          <div style="padding: 32px; background: #0d0d0d; color: #fff;">
            <p style="font-size: 16px; line-height: 1.7; margin: 0 0 20px 0;">
              Your message has been received and <strong style="color: #D4A574;">forwarded directly to our CEO, Damien</strong>, for personal review.
            </p>
            <p style="font-size: 16px; line-height: 1.7; margin: 0 0 20px 0;">
              At ThriveMT, we believe every inquiry deserves executive attention. You can expect a thoughtful response within 24-48 business hours.
            </p>
            
            <div style="margin: 28px 0; padding: 20px; background: #1a1a1a; border-radius: 8px; border-left: 3px solid #D4A574;">
              <p style="margin: 0 0 8px 0; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Your Message</p>
              <p style="margin: 0; color: #fff; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            
            <p style="font-size: 14px; color: #888; margin: 0;">
              In the meantime, explore what we're building at <a href="https://thrive-mental.com" style="color: #D4A574; text-decoration: none;">thrive-mental.com</a>
            </p>
          </div>
          <div style="padding: 16px 20px; background: #000; text-align: center; color: #666; font-size: 11px; border-radius: 0 0 8px 8px;">
            <p style="margin: 0;">© ${new Date().getFullYear()} ThriveMT • Here for you.</p>
          </div>
        </div>
      `,
    });

    // Send confirmation to sender
    await resend.emails.send({
      from: "ThriveMT <noreply@thrive-mental.com>",
      to: [email],
      subject: "We Received Your Message - ThriveMT",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #D4A574 0%, #B87333 100%); padding: 20px; text-align: center;">
            <h1 style="color: #000; margin: 0;">Thank You, ${name}!</h1>
          </div>
          <div style="padding: 30px; background: #1a1a1a; color: #fff;">
            <p style="font-size: 16px; line-height: 1.6;">
              We've received your message and appreciate you reaching out to us.
            </p>
            <p style="font-size: 16px; line-height: 1.6;">
              Our team typically responds within 24-48 hours during business days (Monday-Friday, 9am-6pm MT).
            </p>
            
            <div style="margin-top: 30px; padding: 20px; background: #2a2a2a; border-radius: 8px;">
              <p style="margin: 0; color: #888; font-size: 14px;">
                <strong style="color: #D4A574;">Your Message:</strong><br><br>
                ${message}
              </p>
            </div>
            
            <p style="font-size: 14px; color: #888; margin-top: 20px;">
              In the meantime, explore our resources at <a href="https://thrive-mental.com" style="color: #D4A574;">thrive-mental.com</a>
            </p>
          </div>
          <div style="padding: 20px; background: #0d0d0d; text-align: center; color: #666; font-size: 12px;">
            <p>© ${new Date().getFullYear()} ThriveMT. Here for you.</p>
          </div>
        </div>
      `,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
