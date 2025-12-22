import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Download, Search, FileText, Database, AlertCircle } from 'lucide-react';
import { ChangeLogEntry } from '@/hooks/useEngagementMetrics';
import { useState } from 'react';

interface EngagementChangeLogSectionProps {
  changeLog: ChangeLogEntry[];
  onExport: (data: unknown[], filename: string) => void;
}

export default function EngagementChangeLogSection({
  changeLog,
  onExport,
}: EngagementChangeLogSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = changeLog.filter(log =>
    log.change_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.editor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.affected_table?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getTableIcon = (table: string | null) => {
    if (!table) return <FileText className="h-4 w-4" />;
    switch (table) {
      case 'engagement_weekly_logs':
        return <Database className="h-4 w-4 text-blue-500" />;
      case 'engagement_feature_adoption':
        return <Database className="h-4 w-4 text-green-500" />;
      case 'engagement_cohort_retention':
        return <Database className="h-4 w-4 text-yellow-500" />;
      case 'engagement_user_segments':
        return <Database className="h-4 w-4 text-purple-500" />;
      default:
        return <Database className="h-4 w-4" />;
    }
  };

  const formatTableName = (table: string | null) => {
    if (!table) return 'General';
    return table
      .replace('engagement_', '')
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-xl font-semibold">Change Log</h2>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search changes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-[250px]"
            />
          </div>
          <Button variant="outline" size="sm" onClick={() => onExport(changeLog, 'engagement_change_log')}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Date & Time</TableHead>
                  <TableHead>Editor</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Table</TableHead>
                  <TableHead>Compliance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(log.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell className="font-medium">{log.editor_name}</TableCell>
                    <TableCell className="max-w-[300px]">
                      <p className="truncate" title={log.change_description}>
                        {log.change_description}
                      </p>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {log.reason || '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTableIcon(log.affected_table)}
                        <span className="text-sm">{formatTableName(log.affected_table)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {log.compliance_note ? (
                        <Badge variant="outline" className="flex items-center gap-1 w-fit">
                          <AlertCircle className="h-3 w-3" />
                          {log.compliance_note}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {filteredLogs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      {searchTerm ? 'No matching changes found.' : 'No changes recorded yet.'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Change Statistics */}
      {changeLog.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Changes</p>
              <p className="text-2xl font-bold">{changeLog.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Unique Editors</p>
              <p className="text-2xl font-bold">
                {new Set(changeLog.map(l => l.editor_name)).size}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">This Week</p>
              <p className="text-2xl font-bold">
                {changeLog.filter(l => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return new Date(l.created_at) > weekAgo;
                }).length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Compliance Notes</p>
              <p className="text-2xl font-bold">
                {changeLog.filter(l => l.compliance_note).length}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
