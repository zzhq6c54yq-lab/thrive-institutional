import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Smartphone,
  Monitor,
  Download,
  RefreshCw
} from 'lucide-react';
import { EngagementSummary } from '@/hooks/useEngagementMetrics';
import jsPDF from 'jspdf';

interface EngagementSummarySectionProps {
  summary: EngagementSummary | null;
  loading: boolean;
  onRefresh: () => void;
}

export default function EngagementSummarySection({ 
  summary, 
  loading,
  onRefresh 
}: EngagementSummarySectionProps) {
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500/20';
    if (score >= 60) return 'bg-yellow-500/20';
    return 'bg-red-500/20';
  };

  const exportPDF = () => {
    if (!summary) return;
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(184, 115, 51);
    doc.text('ThriveMT Engagement Metrics Summary', pageWidth / 2, 20, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 28, { align: 'center' });
    
    // Metrics
    doc.setFontSize(12);
    doc.setTextColor(0);
    let y = 45;
    
    const metrics = [
      ['Total Users (MAU)', summary.currentMAU.toString()],
      ['Daily Active Users', summary.currentDAU.toString()],
      ['Weekly Active Users', summary.currentWAU.toString()],
      ['Engagement Score', `${summary.engagementScore}/100`],
      ['Retention Rate', `${summary.retentionRate}%`],
      ['Churn Rate', `${summary.churnRate}%`],
      ['Feature Adoption', `${summary.featureAdoptionRate}%`],
      ['NPS Score', summary.npsScore?.toString() || 'N/A'],
      ['Error Rate', `${summary.errorRate}%`],
      ['PHI Opt-in Rate', `${summary.phiOptInRate}%`],
      ['Mobile Usage', `${summary.mobilePercentage}%`],
      ['Desktop Usage', `${summary.desktopPercentage}%`],
      ['Week-over-Week Growth', `${summary.weekOverWeekGrowth.toFixed(1)}%`],
    ];
    
    metrics.forEach(([label, value]) => {
      doc.text(label + ':', 20, y);
      doc.text(value, 100, y);
      y += 8;
    });
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text('ThriveMT - Mental Health & Wellness Platform', pageWidth / 2, 280, { align: 'center' });
    
    doc.save('engagement_summary.pdf');
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded w-1/2 mb-2" />
              <div className="h-8 bg-muted rounded w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!summary) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No engagement data available. Add weekly logs to see metrics.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Dashboard Overview</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={exportPDF}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Engagement Score Card */}
      <Card className={`${getScoreBg(summary.engagementScore)} border-none`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Engagement Score</p>
              <p className={`text-5xl font-bold ${getScoreColor(summary.engagementScore)}`}>
                {summary.engagementScore}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Target: 80+ | Formula: 0.4×DAU + 0.2×Session + 0.2×Adoption + 0.2×Retention
              </p>
            </div>
            <div className="text-right">
              <Badge variant={summary.weekOverWeekGrowth >= 0 ? 'default' : 'destructive'}>
                {summary.weekOverWeekGrowth >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {summary.weekOverWeekGrowth >= 0 ? '+' : ''}{summary.weekOverWeekGrowth.toFixed(1)}% WoW
              </Badge>
            </div>
          </div>
          <Progress value={summary.engagementScore} className="mt-4 h-3" />
        </CardContent>
      </Card>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* DAU */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Daily Active Users</p>
                <p className="text-2xl font-bold">{summary.currentDAU.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>

        {/* WAU */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Weekly Active Users</p>
                <p className="text-2xl font-bold">{summary.currentWAU.toLocaleString()}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500/50" />
            </div>
          </CardContent>
        </Card>

        {/* MAU */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Monthly Active Users</p>
                <p className="text-2xl font-bold">{summary.currentMAU.toLocaleString()}</p>
              </div>
              <Target className="h-8 w-8 text-green-500/50" />
            </div>
          </CardContent>
        </Card>

        {/* NPS */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Net Promoter Score</p>
                <p className="text-2xl font-bold">{summary.npsScore ?? 'N/A'}</p>
              </div>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                (summary.npsScore || 0) >= 50 ? 'bg-green-500/20' : 'bg-yellow-500/20'
              }`}>
                {(summary.npsScore || 0) >= 50 ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Retention Rate */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Retention Rate</p>
              <Badge variant={summary.retentionRate >= 70 ? 'default' : 'secondary'}>
                {summary.retentionRate >= 70 ? 'Good' : 'Needs Work'}
              </Badge>
            </div>
            <p className="text-2xl font-bold text-green-500">{summary.retentionRate}%</p>
            <Progress value={summary.retentionRate} className="mt-2 h-2" />
          </CardContent>
        </Card>

        {/* Churn Rate */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Churn Rate</p>
              <Badge variant={summary.churnRate <= 5 ? 'default' : 'destructive'}>
                {summary.churnRate <= 5 ? 'Healthy' : 'High'}
              </Badge>
            </div>
            <p className={`text-2xl font-bold ${summary.churnRate <= 5 ? 'text-green-500' : 'text-red-500'}`}>
              {summary.churnRate}%
            </p>
            <Progress value={summary.churnRate} max={10} className="mt-2 h-2" />
          </CardContent>
        </Card>

        {/* Feature Adoption */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Feature Adoption</p>
              <Badge variant={summary.featureAdoptionRate >= 50 ? 'default' : 'secondary'}>
                {summary.featureAdoptionRate >= 50 ? 'Strong' : 'Growing'}
              </Badge>
            </div>
            <p className="text-2xl font-bold">{summary.featureAdoptionRate}%</p>
            <Progress value={summary.featureAdoptionRate} className="mt-2 h-2" />
          </CardContent>
        </Card>

        {/* Error Rate */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Error Rate</p>
              <Badge variant={summary.errorRate <= 1 ? 'default' : 'destructive'}>
                {summary.errorRate <= 1 ? 'Low' : 'High'}
              </Badge>
            </div>
            <p className={`text-2xl font-bold ${summary.errorRate <= 1 ? 'text-green-500' : 'text-red-500'}`}>
              {summary.errorRate}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Compliance & Platform */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PHI Opt-in (Compliance) */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              PHI Opt-in Rate (HIPAA Compliance)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className={`text-3xl font-bold ${
                summary.phiOptInRate >= 95 ? 'text-green-500' : 'text-yellow-500'
              }`}>
                {summary.phiOptInRate}%
              </p>
              <Badge variant={summary.phiOptInRate >= 95 ? 'default' : 'secondary'}>
                Target: ≥95%
              </Badge>
            </div>
            <Progress value={summary.phiOptInRate} className="mt-3 h-2" />
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Platform Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xl font-bold">{summary.mobilePercentage}%</p>
                  <p className="text-xs text-muted-foreground">Mobile</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Monitor className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-xl font-bold">{summary.desktopPercentage}%</p>
                  <p className="text-xs text-muted-foreground">Desktop</p>
                </div>
              </div>
            </div>
            <div className="flex mt-3 h-2 rounded-full overflow-hidden bg-muted">
              <div 
                className="bg-primary" 
                style={{ width: `${summary.mobilePercentage}%` }} 
              />
              <div 
                className="bg-blue-500" 
                style={{ width: `${summary.desktopPercentage}%` }} 
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
