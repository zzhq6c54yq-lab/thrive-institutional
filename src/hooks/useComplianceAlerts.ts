import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ComplianceAlert {
  id: string;
  therapist_id: string;
  alert_type: string;
  severity: string;
  title: string;
  message: string;
  expiry_date: string | null;
  days_until_expiry: number | null;
  is_resolved: boolean;
  resolved_at: string | null;
  resolved_by: string | null;
  created_at: string;
  therapist?: {
    name: string;
    title: string;
    image_url: string | null;
  };
}

export interface CAQHVerificationLog {
  id: string;
  therapist_id: string;
  verification_status: string;
  insurance_panel: string | null;
  verification_date: string;
  expiry_date: string | null;
  notes: string | null;
  verified_by: string | null;
  created_at: string;
}

export interface TherapistLicenseHistory {
  id: string;
  therapist_id: string;
  license_number: string;
  license_state: string;
  license_type: string | null;
  issue_date: string | null;
  expiry_date: string;
  verification_status: string;
  verification_url: string | null;
  created_at: string;
}

export function useComplianceAlerts() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all compliance alerts
  const alertsQuery = useQuery({
    queryKey: ["compliance-alerts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("compliance_alerts")
        .select(`
          *,
          therapist:therapists(name, title, image_url)
        `)
        .order("severity", { ascending: true })
        .order("days_until_expiry", { ascending: true });

      if (error) throw error;
      return data as ComplianceAlert[];
    },
  });

  // Fetch unresolved alerts count
  const unresolvedCountQuery = useQuery({
    queryKey: ["compliance-alerts-unresolved-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("compliance_alerts")
        .select("*", { count: "exact", head: true })
        .eq("is_resolved", false);

      if (error) throw error;
      return count || 0;
    },
  });

  // Resolve an alert
  const resolveAlertMutation = useMutation({
    mutationFn: async (alertId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from("compliance_alerts")
        .update({
          is_resolved: true,
          resolved_at: new Date().toISOString(),
          resolved_by: user?.id,
        })
        .eq("id", alertId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["compliance-alerts"] });
      queryClient.invalidateQueries({ queryKey: ["compliance-alerts-unresolved-count"] });
      toast({
        title: "Alert Resolved",
        description: "The compliance alert has been marked as resolved.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to resolve alert. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Run license check manually
  const runLicenseCheckMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("check-license-expiry");
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["compliance-alerts"] });
      queryClient.invalidateQueries({ queryKey: ["compliance-alerts-unresolved-count"] });
      toast({
        title: "License Check Complete",
        description: `Generated ${data.alerts_generated} alerts. ${data.auto_deactivated?.length || 0} therapists auto-deactivated.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to run license check. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    alerts: alertsQuery.data || [],
    isLoading: alertsQuery.isLoading,
    unresolvedCount: unresolvedCountQuery.data || 0,
    resolveAlert: resolveAlertMutation.mutate,
    runLicenseCheck: runLicenseCheckMutation.mutate,
    isRunningCheck: runLicenseCheckMutation.isPending,
  };
}

export function useCAQHVerification() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch CAQH logs for a therapist
  const useCAQHLogs = (therapistId?: string) => {
    return useQuery({
      queryKey: ["caqh-logs", therapistId],
      queryFn: async () => {
        let query = supabase
          .from("caqh_verification_logs")
          .select("*")
          .order("created_at", { ascending: false });

        if (therapistId) {
          query = query.eq("therapist_id", therapistId);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data as CAQHVerificationLog[];
      },
      enabled: therapistId !== undefined,
    });
  };

  // Add CAQH verification
  const addVerificationMutation = useMutation({
    mutationFn: async (verification: Omit<CAQHVerificationLog, "id" | "created_at">) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from("caqh_verification_logs")
        .insert({
          ...verification,
          verified_by: user?.id,
        });

      if (error) throw error;

      // Update therapist CAQH status
      await supabase
        .from("therapists")
        .update({
          caqh_status: verification.verification_status,
          caqh_last_verified: new Date().toISOString(),
        })
        .eq("id", verification.therapist_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["caqh-logs"] });
      queryClient.invalidateQueries({ queryKey: ["therapists"] });
      toast({
        title: "CAQH Verification Added",
        description: "The verification record has been saved.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add verification. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    useCAQHLogs,
    addVerification: addVerificationMutation.mutate,
    isAdding: addVerificationMutation.isPending,
  };
}

export function useLicenseHistory() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch license history for a therapist
  const useLicenseHistoryQuery = (therapistId?: string) => {
    return useQuery({
      queryKey: ["license-history", therapistId],
      queryFn: async () => {
        let query = supabase
          .from("therapist_license_history")
          .select("*")
          .order("created_at", { ascending: false });

        if (therapistId) {
          query = query.eq("therapist_id", therapistId);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data as TherapistLicenseHistory[];
      },
      enabled: therapistId !== undefined,
    });
  };

  // Add license record
  const addLicenseMutation = useMutation({
    mutationFn: async (license: Omit<TherapistLicenseHistory, "id" | "created_at">) => {
      const { error } = await supabase
        .from("therapist_license_history")
        .insert(license);

      if (error) throw error;

      // Update therapist main license info
      await supabase
        .from("therapists")
        .update({
          license_number: license.license_number,
          license_state: license.license_state,
          license_type: license.license_type,
          license_expiry_date: license.expiry_date,
        })
        .eq("id", license.therapist_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["license-history"] });
      queryClient.invalidateQueries({ queryKey: ["therapists"] });
      toast({
        title: "License Added",
        description: "The license record has been saved.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add license. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    useLicenseHistoryQuery,
    addLicense: addLicenseMutation.mutate,
    isAdding: addLicenseMutation.isPending,
  };
}
