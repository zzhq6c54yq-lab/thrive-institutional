import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { WeeklyLog } from '@/hooks/useEngagementMetrics';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface EngagementTrendsSectionProps {
  logs: WeeklyLog[];
  onExport: (data: unknown[], filename: string) => void;
}

const COLORS = ['#B87333', '#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899'];

export default function EngagementTrendsSection({ logs, onExport }: EngagementTrendsSectionProps) {
  // Prepare data sorted by date
  const sortedLogs = [...logs].sort((a, b) => 
    new Date(a.week_ending).getTime() - new Date(b.week_ending).getTime()
  );

  // DAU/WAU/MAU trend data
  const userTrendData = sortedLogs.map(log => ({
    date: new Date(log.week_ending).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    DAU: log.dau,
    WAU: log.wau,
    MAU: log.mau,
  }));

  // Engagement Score trend
  const engagementTrendData = sortedLogs.map(log => ({
    date: new Date(log.week_ending).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: log.engagement_score,
    target: 80,
  }));

  // Retention vs Churn
  const retentionChurnData = sortedLogs.map(log => ({
    date: new Date(log.week_ending).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    retention: log.retention_rate,
    churn: log.churn_rate,
  }));

  // Platform distribution (latest week)
  const latestLog = sortedLogs[sortedLogs.length - 1];
  const platformData = latestLog ? [
    { name: 'Mobile', value: latestLog.mobile_percentage, color: '#B87333' },
    { name: 'Desktop', value: latestLog.desktop_percentage, color: '#3b82f6' },
  ] : [];

  // NPS trend
  const npsTrendData = sortedLogs
    .filter(log => log.nps_score !== null)
    .map(log => ({
      date: new Date(log.week_ending).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      nps: log.nps_score,
    }));

  // Feature adoption & conversion
  const conversionData = sortedLogs.map(log => ({
    date: new Date(log.week_ending).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    adoption: log.feature_adoption,
    conversion: log.conversion_rate,
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Trends & Visualizations</h2>
        <Button variant="outline" size="sm" onClick={() => onExport(sortedLogs, 'engagement_trends')}>
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">User Activity (DAU/WAU/MAU)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="DAU" stroke="#B87333" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="WAU" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="MAU" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Score Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Engagement Score Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="score" stroke="#B87333" fill="#B87333" fillOpacity={0.3} name="Score" />
                  <Line type="monotone" dataKey="target" stroke="#22c55e" strokeDasharray="5 5" name="Target (80)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Retention vs Churn */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Retention vs Churn Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={retentionChurnData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`${value}%`, '']}
                  />
                  <Legend />
                  <Bar dataKey="retention" fill="#22c55e" name="Retention %" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="churn" fill="#ef4444" name="Churn %" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Platform Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`${value}%`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* NPS Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Net Promoter Score Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={npsTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} domain={[-100, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="nps" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} name="NPS" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Feature Adoption & Conversion */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Feature Adoption & Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={conversionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`${value}%`, '']}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="adoption" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Feature Adoption %" />
                  <Area type="monotone" dataKey="conversion" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} name="Conversion %" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      {sortedLogs.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Period Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">DAU Growth</p>
                <p className={`text-lg font-semibold ${
                  sortedLogs[sortedLogs.length - 1].dau > sortedLogs[0].dau ? 'text-green-500' : 'text-red-500'
                }`}>
                  {((sortedLogs[sortedLogs.length - 1].dau - sortedLogs[0].dau) / sortedLogs[0].dau * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Avg Engagement Score</p>
                <p className="text-lg font-semibold">
                  {(sortedLogs.reduce((sum, l) => sum + l.engagement_score, 0) / sortedLogs.length).toFixed(1)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Avg Retention</p>
                <p className="text-lg font-semibold text-green-500">
                  {(sortedLogs.reduce((sum, l) => sum + l.retention_rate, 0) / sortedLogs.length).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Avg Churn</p>
                <p className="text-lg font-semibold text-yellow-500">
                  {(sortedLogs.reduce((sum, l) => sum + l.churn_rate, 0) / sortedLogs.length).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
