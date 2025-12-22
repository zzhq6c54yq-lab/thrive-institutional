import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Download, TrendingUp, TrendingDown } from 'lucide-react';
import { WeeklyLog } from '@/hooks/useEngagementMetrics';

interface WeeklyEngagementLogSectionProps {
  logs: WeeklyLog[];
  onAddLog: (log: Omit<WeeklyLog, 'id' | 'created_at'>) => Promise<unknown>;
  onExport: (data: unknown[], filename: string) => void;
}

export default function WeeklyEngagementLogSection({
  logs,
  onAddLog,
  onExport,
}: WeeklyEngagementLogSectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    week_ending: new Date().toISOString().split('T')[0],
    dau: 0,
    wau: 0,
    mau: 0,
    sessions_per_user: 0,
    avg_session_length_minutes: 0,
    retention_rate: 0,
    churn_rate: 0,
    feature_adoption: 0,
    nps_score: null as number | null,
    error_rate: 0,
    phi_opt_in_rate: 100,
    mobile_percentage: 0,
    desktop_percentage: 0,
    conversion_rate: 0,
    user_growth: 0,
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAddLog({
      ...formData,
      recorded_by: null,
      engagement_score: 0, // Will be calculated
      metadata: {},
    });
    setIsDialogOpen(false);
    setFormData({
      week_ending: new Date().toISOString().split('T')[0],
      dau: 0,
      wau: 0,
      mau: 0,
      sessions_per_user: 0,
      avg_session_length_minutes: 0,
      retention_rate: 0,
      churn_rate: 0,
      feature_adoption: 0,
      nps_score: null,
      error_rate: 0,
      phi_opt_in_rate: 100,
      mobile_percentage: 0,
      desktop_percentage: 0,
      conversion_rate: 0,
      user_growth: 0,
      notes: '',
    });
  };

  const getRetentionColor = (rate: number) => {
    if (rate >= 70) return 'text-green-500';
    if (rate >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getChurnColor = (rate: number) => {
    if (rate <= 5) return 'text-green-500';
    if (rate <= 8) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Weekly Engagement Log</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onExport(logs, 'weekly_engagement_logs')}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Week
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add Weekly Engagement Log</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Week Ending</Label>
                    <Input
                      type="date"
                      value={formData.week_ending}
                      onChange={(e) => setFormData({ ...formData, week_ending: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>DAU</Label>
                    <Input
                      type="number"
                      value={formData.dau}
                      onChange={(e) => setFormData({ ...formData, dau: parseInt(e.target.value) || 0 })}
                      required
                    />
                  </div>
                  <div>
                    <Label>WAU</Label>
                    <Input
                      type="number"
                      value={formData.wau}
                      onChange={(e) => setFormData({ ...formData, wau: parseInt(e.target.value) || 0 })}
                      required
                    />
                  </div>
                  <div>
                    <Label>MAU</Label>
                    <Input
                      type="number"
                      value={formData.mau}
                      onChange={(e) => setFormData({ ...formData, mau: parseInt(e.target.value) || 0 })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Sessions/User</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.sessions_per_user}
                      onChange={(e) => setFormData({ ...formData, sessions_per_user: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label>Avg Session Length (min)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.avg_session_length_minutes}
                      onChange={(e) => setFormData({ ...formData, avg_session_length_minutes: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label>Retention Rate (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      max="100"
                      value={formData.retention_rate}
                      onChange={(e) => setFormData({ ...formData, retention_rate: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label>Churn Rate (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      max="100"
                      value={formData.churn_rate}
                      onChange={(e) => setFormData({ ...formData, churn_rate: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label>Feature Adoption (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      max="100"
                      value={formData.feature_adoption}
                      onChange={(e) => setFormData({ ...formData, feature_adoption: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label>NPS Score</Label>
                    <Input
                      type="number"
                      min="-100"
                      max="100"
                      value={formData.nps_score || ''}
                      onChange={(e) => setFormData({ ...formData, nps_score: e.target.value ? parseInt(e.target.value) : null })}
                    />
                  </div>
                  <div>
                    <Label>Error Rate (%)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      max="100"
                      value={formData.error_rate}
                      onChange={(e) => setFormData({ ...formData, error_rate: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label>PHI Opt-in Rate (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      max="100"
                      value={formData.phi_opt_in_rate}
                      onChange={(e) => setFormData({ ...formData, phi_opt_in_rate: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label>Mobile %</Label>
                    <Input
                      type="number"
                      step="0.1"
                      max="100"
                      value={formData.mobile_percentage}
                      onChange={(e) => setFormData({ ...formData, mobile_percentage: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label>Desktop %</Label>
                    <Input
                      type="number"
                      step="0.1"
                      max="100"
                      value={formData.desktop_percentage}
                      onChange={(e) => setFormData({ ...formData, desktop_percentage: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label>Conversion Rate (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      max="100"
                      value={formData.conversion_rate}
                      onChange={(e) => setFormData({ ...formData, conversion_rate: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label>User Growth</Label>
                    <Input
                      type="number"
                      value={formData.user_growth}
                      onChange={(e) => setFormData({ ...formData, user_growth: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <div>
                  <Label>Notes</Label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Add any notes about this week's metrics..."
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Log</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Week</TableHead>
                  <TableHead className="text-right">DAU</TableHead>
                  <TableHead className="text-right">WAU</TableHead>
                  <TableHead className="text-right">MAU</TableHead>
                  <TableHead className="text-right">Sessions/User</TableHead>
                  <TableHead className="text-right">Avg Session</TableHead>
                  <TableHead className="text-right">Retention</TableHead>
                  <TableHead className="text-right">Churn</TableHead>
                  <TableHead className="text-right">Adoption</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log, index) => {
                  const prevLog = logs[index + 1];
                  const dauTrend = prevLog ? log.dau - prevLog.dau : 0;
                  
                  return (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">
                        {new Date(log.week_ending).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {log.dau}
                          {dauTrend !== 0 && (
                            dauTrend > 0 ? (
                              <TrendingUp className="h-3 w-3 text-green-500" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-red-500" />
                            )
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{log.wau}</TableCell>
                      <TableCell className="text-right">{log.mau}</TableCell>
                      <TableCell className="text-right">{log.sessions_per_user}</TableCell>
                      <TableCell className="text-right">{log.avg_session_length_minutes}m</TableCell>
                      <TableCell className={`text-right ${getRetentionColor(log.retention_rate)}`}>
                        {log.retention_rate}%
                      </TableCell>
                      <TableCell className={`text-right ${getChurnColor(log.churn_rate)}`}>
                        {log.churn_rate}%
                      </TableCell>
                      <TableCell className="text-right">{log.feature_adoption}%</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={log.engagement_score >= 80 ? 'default' : 'secondary'}>
                          {log.engagement_score}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate" title={log.notes || ''}>
                        {log.notes || '-'}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {logs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={11} className="text-center text-muted-foreground py-8">
                      No weekly logs yet. Add your first entry to start tracking.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
