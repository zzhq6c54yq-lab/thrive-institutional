import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TherapistRecord {
  id: string;
  name: string;
  license_expiry_date: string | null;
  license_number: string | null;
  license_state: string | null;
  malpractice_expiry_date: string | null;
  malpractice_policy_number: string | null;
  dea_expiry_date: string | null;
  dea_number: string | null;
  is_active: boolean;
}

interface ExpiryAlert {
  therapist_id: string;
  alert_type: string;
  severity: string;
  title: string;
  message: string;
  expiry_date: string;
  days_until_expiry: number;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    console.log("Starting license expiry check...");

    // Get all active therapists with expiry dates
    const { data: therapists, error: therapistsError } = await supabase
      .from("therapists")
      .select("id, name, license_expiry_date, license_number, license_state, malpractice_expiry_date, malpractice_policy_number, dea_expiry_date, dea_number, is_active")
      .eq("is_active", true);

    if (therapistsError) {
      console.error("Error fetching therapists:", therapistsError);
      throw therapistsError;
    }

    const alerts: ExpiryAlert[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const autoDeactivated: string[] = [];

    for (const therapist of therapists as TherapistRecord[]) {
      // Check license expiry
      if (therapist.license_expiry_date) {
        const expiryDate = new Date(therapist.license_expiry_date);
        const daysUntil = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        let severity = "";
        if (daysUntil <= 0) {
          severity = "critical";
        } else if (daysUntil <= 30) {
          severity = "critical";
        } else if (daysUntil <= 60) {
          severity = "warning";
        } else if (daysUntil <= 90) {
          severity = "info";
        }

        if (severity) {
          alerts.push({
            therapist_id: therapist.id,
            alert_type: "license_expiry",
            severity,
            title: daysUntil <= 0 ? "License Expired" : "License Expiring Soon",
            message: daysUntil <= 0
              ? `${therapist.name}'s license (${therapist.license_number || "N/A"} - ${therapist.license_state || "N/A"}) has expired`
              : `${therapist.name}'s license (${therapist.license_number || "N/A"} - ${therapist.license_state || "N/A"}) expires in ${daysUntil} days`,
            expiry_date: therapist.license_expiry_date,
            days_until_expiry: daysUntil,
          });

          // Auto-deactivate if expired
          if (daysUntil <= 0) {
            const { error: updateError } = await supabase
              .from("therapists")
              .update({
                is_active: false,
                compliance_status: "non_compliant",
                compliance_notes: "Auto-deactivated due to expired license",
                last_compliance_check: new Date().toISOString(),
              })
              .eq("id", therapist.id);

            if (!updateError) {
              autoDeactivated.push(therapist.name);
            }
          }
        }
      }

      // Check malpractice insurance expiry
      if (therapist.malpractice_expiry_date) {
        const expiryDate = new Date(therapist.malpractice_expiry_date);
        const daysUntil = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        let severity = "";
        if (daysUntil <= 0) {
          severity = "critical";
        } else if (daysUntil <= 30) {
          severity = "warning";
        } else if (daysUntil <= 60) {
          severity = "info";
        }

        if (severity) {
          alerts.push({
            therapist_id: therapist.id,
            alert_type: "malpractice_expiry",
            severity,
            title: daysUntil <= 0 ? "Malpractice Insurance Expired" : "Malpractice Insurance Expiring",
            message: daysUntil <= 0
              ? `${therapist.name}'s malpractice insurance has expired`
              : `${therapist.name}'s malpractice insurance expires in ${daysUntil} days`,
            expiry_date: therapist.malpractice_expiry_date,
            days_until_expiry: daysUntil,
          });
        }
      }

      // Check DEA license expiry
      if (therapist.dea_expiry_date) {
        const expiryDate = new Date(therapist.dea_expiry_date);
        const daysUntil = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        let severity = "";
        if (daysUntil <= 0) {
          severity = "critical";
        } else if (daysUntil <= 30) {
          severity = "warning";
        } else if (daysUntil <= 60) {
          severity = "info";
        }

        if (severity) {
          alerts.push({
            therapist_id: therapist.id,
            alert_type: "dea_expiry",
            severity,
            title: daysUntil <= 0 ? "DEA License Expired" : "DEA License Expiring",
            message: daysUntil <= 0
              ? `${therapist.name}'s DEA license (${therapist.dea_number || "N/A"}) has expired`
              : `${therapist.name}'s DEA license (${therapist.dea_number || "N/A"}) expires in ${daysUntil} days`,
            expiry_date: therapist.dea_expiry_date,
            days_until_expiry: daysUntil,
          });
        }
      }
    }

    // Clear old unresolved alerts and insert new ones
    if (alerts.length > 0) {
      // Delete old unresolved alerts
      await supabase
        .from("compliance_alerts")
        .delete()
        .eq("is_resolved", false);

      // Insert new alerts
      const { error: insertError } = await supabase
        .from("compliance_alerts")
        .insert(alerts);

      if (insertError) {
        console.error("Error inserting alerts:", insertError);
      }
    }

    console.log(`License check complete. Generated ${alerts.length} alerts. Auto-deactivated: ${autoDeactivated.length} therapists.`);

    return new Response(
      JSON.stringify({
        success: true,
        alerts_generated: alerts.length,
        auto_deactivated: autoDeactivated,
        summary: {
          critical: alerts.filter(a => a.severity === "critical").length,
          warning: alerts.filter(a => a.severity === "warning").length,
          info: alerts.filter(a => a.severity === "info").length,
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in license expiry check:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
