import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import { Progress } from '@/components/ui/progress';
import { Plus, Download, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { FeatureAdoption } from '@/hooks/useEngagementMetrics';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface FeatureAdoptionSectionProps {
  features: FeatureAdoption[];
  onAddFeature: (feature: Omit<FeatureAdoption, 'id' | 'created_at'>) => Promise<unknown>;
  onExport: (data: unknown[], filename: string) => void;
}

const FEATURE_CATEGORIES = [
  'AI Companion',
  'Wellness',
  'Core',
  'Engagement',
  'Social',
  'Expression',
  'Professional',
  'Education',
];

const CHART_COLORS = [
  '#B87333', // bronze
  '#3b82f6',
  '#22c55e',
  '#f59e0b',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4',
  '#84cc16',
];

export default function FeatureAdoptionSection({
  features,
  onAddFeature,
  onExport,
}: FeatureAdoptionSectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<string | 'all'>('all');
  const [formData, setFormData] = useState({
    week_ending: new Date().toISOString().split('T')[0],
    feature_name: '',
    feature_category: 'Core',
    users_count: 0,
    percentage_active_users: 0,
    avg_sessions_per_user: 0,
    total_sessions: 0,
    avg_duration_minutes: 0,
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAddFeature(formData);
    setIsDialogOpen(false);
    setFormData({
      week_ending: new Date().toISOString().split('T')[0],
      feature_name: '',
      feature_category: 'Core',
      users_count: 0,
      percentage_active_users: 0,
      avg_sessions_per_user: 0,
      total_sessions: 0,
      avg_duration_minutes: 0,
      notes: '',
    });
  };

  // Get unique weeks
  const weeks = [...new Set(features.map(f => f.week_ending))].sort().reverse();
  
  // Filter by selected week
  const filteredFeatures = selectedWeek === 'all' 
    ? features.filter(f => f.week_ending === weeks[0]) // Latest week by default
    : features.filter(f => f.week_ending === selectedWeek);

  // Prepare chart data
  const chartData = filteredFeatures
    .sort((a, b) => b.percentage_active_users - a.percentage_active_users)
    .slice(0, 10)
    .map((feature, index) => ({
      name: feature.feature_name,
      adoption: feature.percentage_active_users,
      users: feature.users_count,
      fill: CHART_COLORS[index % CHART_COLORS.length],
    }));

  const getAdoptionBadge = (rate: number) => {
    if (rate >= 70) return <Badge variant="default">High</Badge>;
    if (rate >= 40) return <Badge variant="secondary">Medium</Badge>;
    return <Badge variant="outline">Low</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-xl font-semibold">Feature Adoption</h2>
        <div className="flex gap-2 items-center">
          <Select value={selectedWeek} onValueChange={setSelectedWeek}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Latest Week</SelectItem>
              {weeks.map(week => (
                <SelectItem key={week} value={week}>
                  {new Date(week).toLocaleDateString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={() => onExport(filteredFeatures, 'feature_adoption')}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Feature Adoption Data</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <Label>Feature Name</Label>
                  <Input
                    value={formData.feature_name}
                    onChange={(e) => setFormData({ ...formData, feature_name: e.target.value })}
                    placeholder="e.g., Henry AI Chat"
                    required
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select 
                    value={formData.feature_category} 
                    onValueChange={(value) => setFormData({ ...formData, feature_category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FEATURE_CATEGORIES.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Users Count</Label>
                    <Input
                      type="number"
                      value={formData.users_count}
                      onChange={(e) => setFormData({ ...formData, users_count: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label>% Active Users</Label>
                    <Input
                      type="number"
                      step="0.1"
                      max="100"
                      value={formData.percentage_active_users}
                      onChange={(e) => setFormData({ ...formData, percentage_active_users: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label>Avg Sessions/User</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.avg_sessions_per_user}
                      onChange={(e) => setFormData({ ...formData, avg_sessions_per_user: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label>Total Sessions</Label>
                    <Input
                      type="number"
                      value={formData.total_sessions}
                      onChange={(e) => setFormData({ ...formData, total_sessions: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <div>
                  <Label>Notes</Label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any notes about this feature's performance..."
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Feature</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Top Features Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Top Features by Adoption Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  type="number" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `${value}%`}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  width={120}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number, name: string) => [
                    name === 'adoption' ? `${value}%` : value,
                    name === 'adoption' ? 'Adoption Rate' : 'Users'
                  ]}
                />
                <Bar dataKey="adoption" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Features Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Feature</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Users</TableHead>
                  <TableHead className="text-right">Adoption</TableHead>
                  <TableHead className="text-right">Sessions/User</TableHead>
                  <TableHead>Adoption Level</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFeatures
                  .sort((a, b) => b.percentage_active_users - a.percentage_active_users)
                  .map((feature) => (
                    <TableRow key={feature.id}>
                      <TableCell className="font-medium">{feature.feature_name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{feature.feature_category}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{feature.users_count}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Progress value={feature.percentage_active_users} className="w-16 h-2" />
                          <span className="w-12 text-right">{feature.percentage_active_users}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{feature.avg_sessions_per_user}</TableCell>
                      <TableCell>{getAdoptionBadge(feature.percentage_active_users)}</TableCell>
                      <TableCell className="max-w-[150px] truncate" title={feature.notes || ''}>
                        {feature.notes || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                {filteredFeatures.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      No feature data available for the selected period.
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
