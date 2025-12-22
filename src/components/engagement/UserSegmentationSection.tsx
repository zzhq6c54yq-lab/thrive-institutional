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
import { Plus, Download, Users, TrendingUp } from 'lucide-react';
import { UserSegment } from '@/hooks/useEngagementMetrics';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface UserSegmentationSectionProps {
  segments: UserSegment[];
  onAddSegment: (segment: Omit<UserSegment, 'id' | 'created_at'>) => Promise<unknown>;
  onExport: (data: unknown[], filename: string) => void;
}

const SEGMENT_TYPES = ['tier', 'location', 'device'];
const COLORS = ['#B87333', '#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

export default function UserSegmentationSection({
  segments,
  onAddSegment,
  onExport,
}: UserSegmentationSectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [formData, setFormData] = useState({
    segment_name: '',
    segment_type: 'tier',
    week_ending: new Date().toISOString().split('T')[0],
    user_count: 0,
    dau: 0,
    retention_rate: 0,
    engagement_score: 0,
    avg_session_length: 0,
    conversion_rate: 0,
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAddSegment(formData);
    setIsDialogOpen(false);
    setFormData({
      segment_name: '',
      segment_type: 'tier',
      week_ending: new Date().toISOString().split('T')[0],
      user_count: 0,
      dau: 0,
      retention_rate: 0,
      engagement_score: 0,
      avg_session_length: 0,
      conversion_rate: 0,
      notes: '',
    });
  };

  // Filter segments
  const filteredSegments = filterType === 'all' 
    ? segments 
    : segments.filter(s => s.segment_type === filterType);

  // Get unique weeks and filter to latest
  const latestWeek = [...new Set(segments.map(s => s.week_ending))].sort().reverse()[0];
  const latestSegments = filteredSegments.filter(s => s.week_ending === latestWeek);

  // Prepare chart data by type
  const tierSegments = latestSegments.filter(s => s.segment_type === 'tier');
  const locationSegments = latestSegments.filter(s => s.segment_type === 'location');
  const deviceSegments = latestSegments.filter(s => s.segment_type === 'device');

  // Engagement comparison chart data
  const engagementComparisonData = latestSegments.map((segment, index) => ({
    name: segment.segment_name,
    score: segment.engagement_score,
    retention: segment.retention_rate,
    fill: COLORS[index % COLORS.length],
  }));

  // Radar chart data for top segments
  const radarData = latestSegments.slice(0, 5).map(segment => ({
    segment: segment.segment_name,
    engagement: segment.engagement_score,
    retention: segment.retention_rate,
    conversion: segment.conversion_rate,
    session: Math.min(segment.avg_session_length * 5, 100), // Normalize to 100
  }));

  const getSegmentTypeIcon = (type: string) => {
    switch (type) {
      case 'tier': return '💎';
      case 'location': return '🌍';
      case 'device': return '📱';
      default: return '📊';
    }
  };

  const getEngagementColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-xl font-semibold">User Segmentation</h2>
        <div className="flex gap-2 items-center">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="tier">Tier</SelectItem>
              <SelectItem value="location">Location</SelectItem>
              <SelectItem value="device">Device</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={() => onExport(filteredSegments, 'user_segments')}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Segment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add User Segment</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Segment Name</Label>
                  <Input
                    value={formData.segment_name}
                    onChange={(e) => setFormData({ ...formData, segment_name: e.target.value })}
                    placeholder="e.g., Premium, United States, Mobile iOS"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Segment Type</Label>
                    <Select 
                      value={formData.segment_type} 
                      onValueChange={(value) => setFormData({ ...formData, segment_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tier">Tier</SelectItem>
                        <SelectItem value="location">Location</SelectItem>
                        <SelectItem value="device">Device</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Week Ending</Label>
                    <Input
                      type="date"
                      value={formData.week_ending}
                      onChange={(e) => setFormData({ ...formData, week_ending: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>User Count</Label>
                    <Input
                      type="number"
                      value={formData.user_count}
                      onChange={(e) => setFormData({ ...formData, user_count: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label>DAU</Label>
                    <Input
                      type="number"
                      value={formData.dau}
                      onChange={(e) => setFormData({ ...formData, dau: parseInt(e.target.value) || 0 })}
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
                    <Label>Engagement Score</Label>
                    <Input
                      type="number"
                      step="0.1"
                      max="100"
                      value={formData.engagement_score}
                      onChange={(e) => setFormData({ ...formData, engagement_score: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label>Avg Session (min)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.avg_session_length}
                      onChange={(e) => setFormData({ ...formData, avg_session_length: parseFloat(e.target.value) || 0 })}
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
                </div>
                <div>
                  <Label>Notes</Label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Observations about this segment..."
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Segment</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Segment Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tier Segments */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              💎 Tier Segments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tierSegments.map(segment => (
              <div key={segment.id} className="flex justify-between items-center py-2 border-b last:border-0">
                <span className="text-sm">{segment.segment_name}</span>
                <div className="text-right">
                  <span className="text-sm font-medium">{segment.user_count} users</span>
                  <Badge className="ml-2" variant={segment.engagement_score >= 80 ? 'default' : 'secondary'}>
                    {segment.engagement_score}
                  </Badge>
                </div>
              </div>
            ))}
            {tierSegments.length === 0 && (
              <p className="text-sm text-muted-foreground">No tier segments</p>
            )}
          </CardContent>
        </Card>

        {/* Location Segments */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              🌍 Location Segments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {locationSegments.map(segment => (
              <div key={segment.id} className="flex justify-between items-center py-2 border-b last:border-0">
                <span className="text-sm">{segment.segment_name}</span>
                <div className="text-right">
                  <span className="text-sm font-medium">{segment.user_count} users</span>
                  <Badge className="ml-2" variant={segment.engagement_score >= 80 ? 'default' : 'secondary'}>
                    {segment.engagement_score}
                  </Badge>
                </div>
              </div>
            ))}
            {locationSegments.length === 0 && (
              <p className="text-sm text-muted-foreground">No location segments</p>
            )}
          </CardContent>
        </Card>

        {/* Device Segments */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              📱 Device Segments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {deviceSegments.map(segment => (
              <div key={segment.id} className="flex justify-between items-center py-2 border-b last:border-0">
                <span className="text-sm">{segment.segment_name}</span>
                <div className="text-right">
                  <span className="text-sm font-medium">{segment.user_count} users</span>
                  <Badge className="ml-2" variant={segment.engagement_score >= 80 ? 'default' : 'secondary'}>
                    {segment.engagement_score}
                  </Badge>
                </div>
              </div>
            ))}
            {deviceSegments.length === 0 && (
              <p className="text-sm text-muted-foreground">No device segments</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Engagement Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Segment Engagement Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementComparisonData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} domain={[0, 100]} />
                <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="score" name="Engagement Score" radius={[0, 4, 4, 0]}>
                  {engagementComparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Segment</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Users</TableHead>
                  <TableHead className="text-right">DAU</TableHead>
                  <TableHead className="text-right">Retention</TableHead>
                  <TableHead className="text-right">Engagement</TableHead>
                  <TableHead className="text-right">Conversion</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestSegments.map((segment) => (
                  <TableRow key={segment.id}>
                    <TableCell className="font-medium">
                      {getSegmentTypeIcon(segment.segment_type)} {segment.segment_name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">{segment.segment_type}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{segment.user_count.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{segment.dau}</TableCell>
                    <TableCell className="text-right text-green-500">{segment.retention_rate}%</TableCell>
                    <TableCell className={`text-right ${getEngagementColor(segment.engagement_score)}`}>
                      {segment.engagement_score}
                    </TableCell>
                    <TableCell className="text-right">{segment.conversion_rate}%</TableCell>
                    <TableCell className="max-w-[150px] truncate" title={segment.notes || ''}>
                      {segment.notes || '-'}
                    </TableCell>
                  </TableRow>
                ))}
                {latestSegments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                      No segment data available.
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
