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
import { Plus, Download, Edit2, Check, X } from 'lucide-react';
import { CohortRetention } from '@/hooks/useEngagementMetrics';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface CohortRetentionSectionProps {
  cohorts: CohortRetention[];
  onAddCohort: (cohort: Omit<CohortRetention, 'id' | 'created_at' | 'updated_at'>) => Promise<unknown>;
  onUpdateCohort: (id: string, updates: Partial<CohortRetention>) => Promise<void>;
  onExport: (data: unknown[], filename: string) => void;
}

export default function CohortRetentionSection({
  cohorts,
  onAddCohort,
  onUpdateCohort,
  onExport,
}: CohortRetentionSectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<CohortRetention>>({});
  const [formData, setFormData] = useState({
    cohort_signup_week: new Date().toISOString().split('T')[0],
    cohort_name: '',
    user_count: 0,
    day_1_retention: 0,
    day_7_retention: 0,
    day_14_retention: null as number | null,
    day_30_retention: 0,
    day_60_retention: null as number | null,
    day_90_retention: null as number | null,
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAddCohort(formData);
    setIsDialogOpen(false);
    setFormData({
      cohort_signup_week: new Date().toISOString().split('T')[0],
      cohort_name: '',
      user_count: 0,
      day_1_retention: 0,
      day_7_retention: 0,
      day_14_retention: null,
      day_30_retention: 0,
      day_60_retention: null,
      day_90_retention: null,
      notes: '',
    });
  };

  const startEditing = (cohort: CohortRetention) => {
    setEditingId(cohort.id);
    setEditValues({
      day_7_retention: cohort.day_7_retention,
      day_14_retention: cohort.day_14_retention,
      day_30_retention: cohort.day_30_retention,
      day_60_retention: cohort.day_60_retention,
      day_90_retention: cohort.day_90_retention,
    });
  };

  const saveEdit = async () => {
    if (editingId) {
      await onUpdateCohort(editingId, editValues);
      setEditingId(null);
      setEditValues({});
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({});
  };

  const getRetentionColor = (rate: number | null) => {
    if (rate === null) return 'text-muted-foreground';
    if (rate >= 70) return 'text-green-500';
    if (rate >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Prepare chart data
  const chartData = cohorts
    .slice()
    .reverse()
    .map(cohort => ({
      name: cohort.cohort_name || new Date(cohort.cohort_signup_week).toLocaleDateString(),
      'Day 1': cohort.day_1_retention,
      'Day 7': cohort.day_7_retention,
      'Day 30': cohort.day_30_retention,
      'Day 60': cohort.day_60_retention || 0,
      'Day 90': cohort.day_90_retention || 0,
    }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Cohort Retention</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onExport(cohorts, 'cohort_retention')}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Cohort
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Cohort</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Signup Week</Label>
                  <Input
                    type="date"
                    value={formData.cohort_signup_week}
                    onChange={(e) => setFormData({ ...formData, cohort_signup_week: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Cohort Name</Label>
                  <Input
                    value={formData.cohort_name}
                    onChange={(e) => setFormData({ ...formData, cohort_name: e.target.value })}
                    placeholder="e.g., December Week 3"
                  />
                </div>
                <div>
                  <Label>User Count</Label>
                  <Input
                    type="number"
                    value={formData.user_count}
                    onChange={(e) => setFormData({ ...formData, user_count: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Day 1 Retention (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      max="100"
                      value={formData.day_1_retention}
                      onChange={(e) => setFormData({ ...formData, day_1_retention: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label>Day 7 Retention (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      max="100"
                      value={formData.day_7_retention}
                      onChange={(e) => setFormData({ ...formData, day_7_retention: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label>Day 30 Retention (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      max="100"
                      value={formData.day_30_retention}
                      onChange={(e) => setFormData({ ...formData, day_30_retention: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <div>
                  <Label>Notes</Label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any observations about this cohort..."
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Cohort</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Retention Curve Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Retention Curves by Cohort</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`${value}%`, '']}
                />
                <Legend />
                <Area type="monotone" dataKey="Day 1" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                <Area type="monotone" dataKey="Day 7" stackId="2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="Day 30" stackId="3" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Cohort Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cohort</TableHead>
                  <TableHead className="text-right">Users</TableHead>
                  <TableHead className="text-right">Day 1</TableHead>
                  <TableHead className="text-right">Day 7</TableHead>
                  <TableHead className="text-right">Day 14</TableHead>
                  <TableHead className="text-right">Day 30</TableHead>
                  <TableHead className="text-right">Day 60</TableHead>
                  <TableHead className="text-right">Day 90</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cohorts.map((cohort) => (
                  <TableRow key={cohort.id}>
                    <TableCell className="font-medium">
                      <div>
                        {cohort.cohort_name || 'Unnamed'}
                        <div className="text-xs text-muted-foreground">
                          {new Date(cohort.cohort_signup_week).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{cohort.user_count}</TableCell>
                    <TableCell className={`text-right ${getRetentionColor(cohort.day_1_retention)}`}>
                      {cohort.day_1_retention}%
                    </TableCell>
                    <TableCell className={`text-right ${getRetentionColor(cohort.day_7_retention)}`}>
                      {editingId === cohort.id ? (
                        <Input
                          type="number"
                          className="w-16 h-6 text-xs"
                          value={editValues.day_7_retention || ''}
                          onChange={(e) => setEditValues({ ...editValues, day_7_retention: parseFloat(e.target.value) || 0 })}
                        />
                      ) : (
                        `${cohort.day_7_retention}%`
                      )}
                    </TableCell>
                    <TableCell className={`text-right ${getRetentionColor(cohort.day_14_retention)}`}>
                      {editingId === cohort.id ? (
                        <Input
                          type="number"
                          className="w-16 h-6 text-xs"
                          value={editValues.day_14_retention || ''}
                          onChange={(e) => setEditValues({ ...editValues, day_14_retention: e.target.value ? parseFloat(e.target.value) : null })}
                        />
                      ) : (
                        cohort.day_14_retention !== null ? `${cohort.day_14_retention}%` : '-'
                      )}
                    </TableCell>
                    <TableCell className={`text-right ${getRetentionColor(cohort.day_30_retention)}`}>
                      {editingId === cohort.id ? (
                        <Input
                          type="number"
                          className="w-16 h-6 text-xs"
                          value={editValues.day_30_retention || ''}
                          onChange={(e) => setEditValues({ ...editValues, day_30_retention: parseFloat(e.target.value) || 0 })}
                        />
                      ) : (
                        `${cohort.day_30_retention}%`
                      )}
                    </TableCell>
                    <TableCell className={`text-right ${getRetentionColor(cohort.day_60_retention)}`}>
                      {editingId === cohort.id ? (
                        <Input
                          type="number"
                          className="w-16 h-6 text-xs"
                          value={editValues.day_60_retention || ''}
                          onChange={(e) => setEditValues({ ...editValues, day_60_retention: e.target.value ? parseFloat(e.target.value) : null })}
                        />
                      ) : (
                        cohort.day_60_retention !== null ? `${cohort.day_60_retention}%` : '-'
                      )}
                    </TableCell>
                    <TableCell className={`text-right ${getRetentionColor(cohort.day_90_retention)}`}>
                      {editingId === cohort.id ? (
                        <Input
                          type="number"
                          className="w-16 h-6 text-xs"
                          value={editValues.day_90_retention || ''}
                          onChange={(e) => setEditValues({ ...editValues, day_90_retention: e.target.value ? parseFloat(e.target.value) : null })}
                        />
                      ) : (
                        cohort.day_90_retention !== null ? `${cohort.day_90_retention}%` : '-'
                      )}
                    </TableCell>
                    <TableCell className="max-w-[150px] truncate" title={cohort.notes || ''}>
                      {cohort.notes || '-'}
                    </TableCell>
                    <TableCell>
                      {editingId === cohort.id ? (
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={saveEdit}>
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={cancelEdit}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => startEditing(cohort)}>
                          <Edit2 className="h-3 w-3" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {cohorts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center text-muted-foreground py-8">
                      No cohorts yet. Add your first cohort to start tracking retention.
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
