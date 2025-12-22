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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Download, Search, Info } from 'lucide-react';
import { MetricDefinition } from '@/hooks/useEngagementMetrics';
import { useState } from 'react';

interface MetricsDefinitionsSectionProps {
  definitions: MetricDefinition[];
  onExport: (data: unknown[], filename: string) => void;
}

export default function MetricsDefinitionsSection({
  definitions,
  onExport,
}: MetricsDefinitionsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDefinitions = definitions.filter(def =>
    def.metric_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    def.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    def.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group by category
  const groupedDefinitions = filteredDefinitions.reduce((acc, def) => {
    if (!acc[def.category]) {
      acc[def.category] = [];
    }
    acc[def.category].push(def);
    return acc;
  }, {} as Record<string, MetricDefinition[]>);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Core': 'bg-primary/20 text-primary',
      'Engagement': 'bg-blue-500/20 text-blue-500',
      'Retention': 'bg-green-500/20 text-green-500',
      'Feature': 'bg-purple-500/20 text-purple-500',
      'Growth': 'bg-yellow-500/20 text-yellow-500',
      'Monetization': 'bg-emerald-500/20 text-emerald-500',
      'Behavior': 'bg-orange-500/20 text-orange-500',
      'UX': 'bg-pink-500/20 text-pink-500',
      'Value': 'bg-indigo-500/20 text-indigo-500',
      'Platform': 'bg-cyan-500/20 text-cyan-500',
      'Marketing': 'bg-rose-500/20 text-rose-500',
      'Segmentation': 'bg-violet-500/20 text-violet-500',
      'Satisfaction': 'bg-amber-500/20 text-amber-500',
      'Tech Health': 'bg-red-500/20 text-red-500',
      'Compliance': 'bg-teal-500/20 text-teal-500',
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  const getFrequencyBadge = (frequency: string) => {
    switch (frequency) {
      case 'Daily':
        return <Badge variant="default" className="text-xs">Daily</Badge>;
      case 'Weekly':
        return <Badge variant="secondary" className="text-xs">Weekly</Badge>;
      case 'Monthly':
        return <Badge variant="outline" className="text-xs">Monthly</Badge>;
      case 'Quarterly':
        return <Badge variant="outline" className="text-xs">Quarterly</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">{frequency}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-semibold">Metrics Definitions</h2>
          <p className="text-sm text-muted-foreground">Reference guide for all engagement metrics</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search metrics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-[250px]"
            />
          </div>
          <Button variant="outline" size="sm" onClick={() => onExport(definitions, 'metrics_definitions')}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Category Summary */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(groupedDefinitions).map(category => (
          <Badge key={category} className={getCategoryColor(category)}>
            {category} ({groupedDefinitions[category].length})
          </Badge>
        ))}
      </div>

      {/* Accordion View by Category */}
      <Accordion type="multiple" className="space-y-2" defaultValue={Object.keys(groupedDefinitions)}>
        {Object.entries(groupedDefinitions).map(([category, metrics]) => (
          <AccordionItem key={category} value={category} className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Badge className={getCategoryColor(category)}>{category}</Badge>
                <span className="text-muted-foreground text-sm">({metrics.length} metrics)</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                {metrics.map(metric => (
                  <Card key={metric.id} className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{metric.metric_name}</h4>
                        {getFrequencyBadge(metric.frequency)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{metric.definition}</p>
                      {metric.formula && (
                        <div className="bg-background/50 rounded p-2 text-sm font-mono">
                          📐 {metric.formula}
                        </div>
                      )}
                      {metric.notes && (
                        <div className="flex items-start gap-2 mt-2 text-xs text-muted-foreground">
                          <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          {metric.notes}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Full Table View */}
      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead>Definition</TableHead>
                  <TableHead>Formula</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDefinitions.map((def) => (
                  <TableRow key={def.id}>
                    <TableCell className="font-medium">{def.metric_name}</TableCell>
                    <TableCell className="max-w-[200px]">{def.definition}</TableCell>
                    <TableCell className="font-mono text-xs max-w-[150px] truncate" title={def.formula || ''}>
                      {def.formula || '-'}
                    </TableCell>
                    <TableCell>{getFrequencyBadge(def.frequency)}</TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(def.category)}>{def.category}</Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] text-xs text-muted-foreground truncate" title={def.notes || ''}>
                      {def.notes || '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
