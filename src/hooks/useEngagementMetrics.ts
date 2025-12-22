import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface WeeklyLog {
  id: string;
  week_ending: string;
  recorded_by: string | null;
  dau: number;
  wau: number;
  mau: number;
  sessions_per_user: number;
  avg_session_length_minutes: number;
  retention_rate: number;
  churn_rate: number;
  feature_adoption: number;
  engagement_score: number;
  nps_score: number | null;
  error_rate: number;
  phi_opt_in_rate: number;
  mobile_percentage: number;
  desktop_percentage: number;
  conversion_rate: number;
  user_growth: number;
  notes: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

export interface FeatureAdoption {
  id: string;
  week_ending: string;
  feature_name: string;
  feature_category: string;
  users_count: number;
  percentage_active_users: number;
  avg_sessions_per_user: number;
  total_sessions: number;
  avg_duration_minutes: number;
  notes: string | null;
  created_at: string;
}

export interface CohortRetention {
  id: string;
  cohort_signup_week: string;
  cohort_name: string | null;
  user_count: number;
  day_1_retention: number;
  day_7_retention: number;
  day_14_retention: number | null;
  day_30_retention: number;
  day_60_retention: number | null;
  day_90_retention: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserSegment {
  id: string;
  segment_name: string;
  segment_type: string;
  week_ending: string;
  user_count: number;
  dau: number;
  retention_rate: number;
  engagement_score: number;
  avg_session_length: number;
  conversion_rate: number;
  notes: string | null;
  created_at: string;
}

export interface MetricDefinition {
  id: string;
  metric_name: string;
  definition: string;
  formula: string | null;
  frequency: string;
  category: string;
  notes: string | null;
  created_at: string;
}

export interface ChangeLogEntry {
  id: string;
  user_id: string | null;
  editor_name: string;
  change_description: string;
  reason: string | null;
  affected_table: string | null;
  affected_record_id: string | null;
  compliance_note: string | null;
  previous_value: Record<string, unknown> | null;
  new_value: Record<string, unknown> | null;
  created_at: string;
}

export interface EngagementSummary {
  totalUsers: number;
  currentDAU: number;
  currentWAU: number;
  currentMAU: number;
  engagementScore: number;
  retentionRate: number;
  churnRate: number;
  npsScore: number | null;
  errorRate: number;
  phiOptInRate: number;
  featureAdoptionRate: number;
  weekOverWeekGrowth: number;
  mobilePercentage: number;
  desktopPercentage: number;
}

export function useEngagementMetrics() {
  const [weeklyLogs, setWeeklyLogs] = useState<WeeklyLog[]>([]);
  const [featureAdoption, setFeatureAdoption] = useState<FeatureAdoption[]>([]);
  const [cohortRetention, setCohortRetention] = useState<CohortRetention[]>([]);
  const [userSegments, setUserSegments] = useState<UserSegment[]>([]);
  const [metricDefinitions, setMetricDefinitions] = useState<MetricDefinition[]>([]);
  const [changeLog, setChangeLog] = useState<ChangeLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<EngagementSummary | null>(null);
  const { toast } = useToast();

  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      
      const [logsRes, featuresRes, cohortsRes, segmentsRes, defsRes, changeRes] = await Promise.all([
        supabase.from('engagement_weekly_logs').select('*').order('week_ending', { ascending: false }),
        supabase.from('engagement_feature_adoption').select('*').order('week_ending', { ascending: false }),
        supabase.from('engagement_cohort_retention').select('*').order('cohort_signup_week', { ascending: false }),
        supabase.from('engagement_user_segments').select('*').order('week_ending', { ascending: false }),
        supabase.from('engagement_metrics_definitions').select('*').order('category'),
        supabase.from('engagement_change_log').select('*').order('created_at', { ascending: false }).limit(100),
      ]);

      if (logsRes.data) setWeeklyLogs(logsRes.data as WeeklyLog[]);
      if (featuresRes.data) setFeatureAdoption(featuresRes.data as FeatureAdoption[]);
      if (cohortsRes.data) setCohortRetention(cohortsRes.data as CohortRetention[]);
      if (segmentsRes.data) setUserSegments(segmentsRes.data as UserSegment[]);
      if (defsRes.data) setMetricDefinitions(defsRes.data as MetricDefinition[]);
      if (changeRes.data) setChangeLog(changeRes.data as ChangeLogEntry[]);

      // Calculate summary from latest data
      if (logsRes.data && logsRes.data.length > 0) {
        const latest = logsRes.data[0] as WeeklyLog;
        const previous = logsRes.data.length > 1 ? (logsRes.data[1] as WeeklyLog) : null;
        
        const weekOverWeekGrowth = previous 
          ? ((latest.dau - previous.dau) / previous.dau) * 100 
          : 0;

        setSummary({
          totalUsers: latest.mau,
          currentDAU: latest.dau,
          currentWAU: latest.wau,
          currentMAU: latest.mau,
          engagementScore: latest.engagement_score,
          retentionRate: latest.retention_rate,
          churnRate: latest.churn_rate,
          npsScore: latest.nps_score,
          errorRate: latest.error_rate,
          phiOptInRate: latest.phi_opt_in_rate,
          featureAdoptionRate: latest.feature_adoption,
          weekOverWeekGrowth,
          mobilePercentage: latest.mobile_percentage,
          desktopPercentage: latest.desktop_percentage,
        });
      }
    } catch (error) {
      console.error('Error fetching engagement data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load engagement metrics',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Calculate engagement score formula
  const calculateEngagementScore = (
    dau: number,
    avgSessionLength: number,
    featureAdoptionRate: number,
    retentionRate: number,
    targetDAU = 150,
    targetSessionLength = 15
  ): number => {
    const dauScore = Math.min((dau / targetDAU) * 100, 100) * 0.4;
    const sessionScore = Math.min((avgSessionLength / targetSessionLength) * 100, 100) * 0.2;
    const adoptionScore = featureAdoptionRate * 0.2;
    const retentionScore = retentionRate * 0.2;
    return Math.round(dauScore + sessionScore + adoptionScore + retentionScore);
  };

  // Add weekly log
  const addWeeklyLog = async (log: Omit<WeeklyLog, 'id' | 'created_at'>) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const engagementScore = calculateEngagementScore(
        log.dau,
        log.avg_session_length_minutes,
        log.feature_adoption,
        log.retention_rate
      );

      const insertData = {
        ...log,
        engagement_score: engagementScore,
        recorded_by: userData.user?.id,
        metadata: log.metadata ? JSON.parse(JSON.stringify(log.metadata)) : null,
      };
      const { data, error } = await supabase
        .from('engagement_weekly_logs')
        .insert([insertData])
        .select()
        .single();

      if (error) throw error;

      await logChange(
        userData.user?.email || 'Unknown',
        `Added weekly log for ${log.week_ending}`,
        'New data entry',
        'engagement_weekly_logs',
        data.id,
        null,
        log as unknown as Record<string, unknown>
      );

      toast({ title: 'Success', description: 'Weekly log added successfully' });
      fetchAllData();
      return data;
    } catch (error) {
      console.error('Error adding weekly log:', error);
      toast({ title: 'Error', description: 'Failed to add weekly log', variant: 'destructive' });
      throw error;
    }
  };

  // Update weekly log
  const updateWeeklyLog = async (id: string, updates: Partial<WeeklyLog>) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const existing = weeklyLogs.find(l => l.id === id);
      const { metadata, ...rest } = updates;
      const updateData = metadata ? { ...rest, metadata: JSON.parse(JSON.stringify(metadata)) } : rest;

      const { error } = await supabase
        .from('engagement_weekly_logs')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      await logChange(
        userData.user?.email || 'Unknown',
        `Updated weekly log for ${existing?.week_ending}`,
        'Data update',
        'engagement_weekly_logs',
        id,
        existing as unknown as Record<string, unknown>,
        updates as unknown as Record<string, unknown>
      );

      toast({ title: 'Success', description: 'Weekly log updated successfully' });
      fetchAllData();
    } catch (error) {
      console.error('Error updating weekly log:', error);
      toast({ title: 'Error', description: 'Failed to update weekly log', variant: 'destructive' });
      throw error;
    }
  };

  // Add feature adoption
  const addFeatureAdoption = async (feature: Omit<FeatureAdoption, 'id' | 'created_at'>) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('engagement_feature_adoption')
        .insert([feature])
        .select()
        .single();

      if (error) throw error;

      await logChange(
        userData.user?.email || 'Unknown',
        `Added feature adoption for ${feature.feature_name}`,
        'New feature data',
        'engagement_feature_adoption',
        data.id,
        null,
        feature as unknown as Record<string, unknown>
      );

      toast({ title: 'Success', description: 'Feature adoption added successfully' });
      fetchAllData();
      return data;
    } catch (error) {
      console.error('Error adding feature adoption:', error);
      toast({ title: 'Error', description: 'Failed to add feature adoption', variant: 'destructive' });
      throw error;
    }
  };

  // Add cohort retention
  const addCohortRetention = async (cohort: Omit<CohortRetention, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('engagement_cohort_retention')
        .insert([cohort])
        .select()
        .single();

      if (error) throw error;

      await logChange(
        userData.user?.email || 'Unknown',
        `Added cohort ${cohort.cohort_name}`,
        'New cohort data',
        'engagement_cohort_retention',
        data.id,
        null,
        cohort as unknown as Record<string, unknown>
      );

      toast({ title: 'Success', description: 'Cohort retention added successfully' });
      fetchAllData();
      return data;
    } catch (error) {
      console.error('Error adding cohort retention:', error);
      toast({ title: 'Error', description: 'Failed to add cohort retention', variant: 'destructive' });
      throw error;
    }
  };

  // Update cohort retention
  const updateCohortRetention = async (id: string, updates: Partial<CohortRetention>) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const existing = cohortRetention.find(c => c.id === id);

      const { error } = await supabase
        .from('engagement_cohort_retention')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      await logChange(
        userData.user?.email || 'Unknown',
        `Updated cohort ${existing?.cohort_name}`,
        'Cohort update',
        'engagement_cohort_retention',
        id,
        existing as unknown as Record<string, unknown>,
        updates as unknown as Record<string, unknown>
      );

      toast({ title: 'Success', description: 'Cohort retention updated successfully' });
      fetchAllData();
    } catch (error) {
      console.error('Error updating cohort retention:', error);
      toast({ title: 'Error', description: 'Failed to update cohort retention', variant: 'destructive' });
      throw error;
    }
  };

  // Add user segment
  const addUserSegment = async (segment: Omit<UserSegment, 'id' | 'created_at'>) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('engagement_user_segments')
        .insert([segment])
        .select()
        .single();

      if (error) throw error;

      await logChange(
        userData.user?.email || 'Unknown',
        `Added segment ${segment.segment_name}`,
        'New segment data',
        'engagement_user_segments',
        data.id,
        null,
        segment as unknown as Record<string, unknown>
      );

      toast({ title: 'Success', description: 'User segment added successfully' });
      fetchAllData();
      return data;
    } catch (error) {
      console.error('Error adding user segment:', error);
      toast({ title: 'Error', description: 'Failed to add user segment', variant: 'destructive' });
      throw error;
    }
  };

  // Log change
  const logChange = async (
    editorName: string,
    description: string,
    reason: string,
    affectedTable?: string,
    affectedRecordId?: string,
    previousValue?: Record<string, unknown> | null,
    newValue?: Record<string, unknown> | null,
    complianceNote?: string
  ) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      await supabase.from('engagement_change_log').insert([{
        user_id: userData.user?.id,
        editor_name: editorName,
        change_description: description,
        reason,
        affected_table: affectedTable,
        affected_record_id: affectedRecordId,
        previous_value: previousValue ? JSON.parse(JSON.stringify(previousValue)) : null,
        new_value: newValue ? JSON.parse(JSON.stringify(newValue)) : null,
        compliance_note: complianceNote,
      }]);
    } catch (error) {
      console.error('Error logging change:', error);
    }
  };

  // Export to CSV
  const exportToCSV = (data: unknown[], filename: string) => {
    if (!data.length) return;
    
    const headers = Object.keys(data[0] as object);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = (row as Record<string, unknown>)[header];
          if (typeof value === 'string' && value.includes(',')) {
            return `"${value}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Get trends for charts
  const getTrends = () => {
    const sortedLogs = [...weeklyLogs].sort((a, b) => 
      new Date(a.week_ending).getTime() - new Date(b.week_ending).getTime()
    );

    return {
      dauTrend: sortedLogs.map(l => ({ date: l.week_ending, value: l.dau })),
      wauTrend: sortedLogs.map(l => ({ date: l.week_ending, value: l.wau })),
      mauTrend: sortedLogs.map(l => ({ date: l.week_ending, value: l.mau })),
      engagementTrend: sortedLogs.map(l => ({ date: l.week_ending, value: l.engagement_score })),
      retentionTrend: sortedLogs.map(l => ({ date: l.week_ending, value: l.retention_rate })),
      churnTrend: sortedLogs.map(l => ({ date: l.week_ending, value: l.churn_rate })),
      npsTrend: sortedLogs.map(l => ({ date: l.week_ending, value: l.nps_score || 0 })),
    };
  };

  return {
    weeklyLogs,
    featureAdoption,
    cohortRetention,
    userSegments,
    metricDefinitions,
    changeLog,
    summary,
    loading,
    fetchAllData,
    addWeeklyLog,
    updateWeeklyLog,
    addFeatureAdoption,
    addCohortRetention,
    updateCohortRetention,
    addUserSegment,
    logChange,
    exportToCSV,
    getTrends,
    calculateEngagementScore,
  };
}
