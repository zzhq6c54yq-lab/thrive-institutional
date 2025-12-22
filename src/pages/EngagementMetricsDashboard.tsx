import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart3, Calendar, Users, TrendingUp, Layers, FileText, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEngagementMetrics } from '@/hooks/useEngagementMetrics';
import EngagementSummarySection from '@/components/engagement/EngagementSummarySection';
import WeeklyEngagementLogSection from '@/components/engagement/WeeklyEngagementLogSection';
import CohortRetentionSection from '@/components/engagement/CohortRetentionSection';
import FeatureAdoptionSection from '@/components/engagement/FeatureAdoptionSection';
import EngagementTrendsSection from '@/components/engagement/EngagementTrendsSection';
import UserSegmentationSection from '@/components/engagement/UserSegmentationSection';
import EngagementChangeLogSection from '@/components/engagement/EngagementChangeLogSection';
import MetricsDefinitionsSection from '@/components/engagement/MetricsDefinitionsSection';

export default function EngagementMetricsDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('summary');
  const {
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
    exportToCSV,
  } = useEngagementMetrics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/app/dashboard')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">Engagement Metrics Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Track user engagement, retention, and feature adoption
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="flex flex-wrap h-auto gap-1 bg-background/50 p-1">
            <TabsTrigger value="summary" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Summary
            </TabsTrigger>
            <TabsTrigger value="weekly" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Weekly Log
            </TabsTrigger>
            <TabsTrigger value="cohorts" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Cohorts
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Features
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trends
            </TabsTrigger>
            <TabsTrigger value="segments" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Segments
            </TabsTrigger>
            <TabsTrigger value="changelog" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Change Log
            </TabsTrigger>
            <TabsTrigger value="definitions" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Definitions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary">
            <EngagementSummarySection 
              summary={summary} 
              loading={loading} 
              onRefresh={fetchAllData} 
            />
          </TabsContent>

          <TabsContent value="weekly">
            <WeeklyEngagementLogSection 
              logs={weeklyLogs} 
              onAddLog={addWeeklyLog} 
              onExport={exportToCSV} 
            />
          </TabsContent>

          <TabsContent value="cohorts">
            <CohortRetentionSection 
              cohorts={cohortRetention} 
              onAddCohort={addCohortRetention} 
              onUpdateCohort={updateCohortRetention}
              onExport={exportToCSV} 
            />
          </TabsContent>

          <TabsContent value="features">
            <FeatureAdoptionSection 
              features={featureAdoption} 
              onAddFeature={addFeatureAdoption} 
              onExport={exportToCSV} 
            />
          </TabsContent>

          <TabsContent value="trends">
            <EngagementTrendsSection 
              logs={weeklyLogs} 
              onExport={exportToCSV} 
            />
          </TabsContent>

          <TabsContent value="segments">
            <UserSegmentationSection 
              segments={userSegments} 
              onAddSegment={addUserSegment} 
              onExport={exportToCSV} 
            />
          </TabsContent>

          <TabsContent value="changelog">
            <EngagementChangeLogSection 
              changeLog={changeLog} 
              onExport={exportToCSV} 
            />
          </TabsContent>

          <TabsContent value="definitions">
            <MetricsDefinitionsSection 
              definitions={metricDefinitions} 
              onExport={exportToCSV} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
