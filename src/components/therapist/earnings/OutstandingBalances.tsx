import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Clock, DollarSign, TrendingDown } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OutstandingBalancesProps {
  payments: any[];
}

export default function OutstandingBalances({ payments }: OutstandingBalancesProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter outstanding payments
  const outstandingPayments = payments
    .filter(p => p.status === "pending" || p.status === "failed")
    .filter(p => statusFilter === "all" || p.status === statusFilter)
    .map(p => ({
      ...p,
      daysOutstanding: differenceInDays(new Date(), new Date(p.date))
    }))
    .sort((a, b) => b.daysOutstanding - a.daysOutstanding);

  // Calculate totals
  const totalOutstanding = outstandingPayments.reduce((sum, p) => sum + p.amount, 0);
  const pendingTotal = outstandingPayments.filter(p => p.status === "pending").reduce((sum, p) => sum + p.amount, 0);
  const failedTotal = outstandingPayments.filter(p => p.status === "failed").reduce((sum, p) => sum + p.amount, 0);
  const oldestOutstanding = outstandingPayments[0];

  // Aging analysis
  const agingData = [
    { range: "0-30 days", count: outstandingPayments.filter(p => p.daysOutstanding <= 30).length, amount: outstandingPayments.filter(p => p.daysOutstanding <= 30).reduce((sum, p) => sum + p.amount, 0) },
    { range: "31-60 days", count: outstandingPayments.filter(p => p.daysOutstanding > 30 && p.daysOutstanding <= 60).length, amount: outstandingPayments.filter(p => p.daysOutstanding > 30 && p.daysOutstanding <= 60).reduce((sum, p) => sum + p.amount, 0) },
    { range: "61-90 days", count: outstandingPayments.filter(p => p.daysOutstanding > 60 && p.daysOutstanding <= 90).length, amount: outstandingPayments.filter(p => p.daysOutstanding > 60 && p.daysOutstanding <= 90).reduce((sum, p) => sum + p.amount, 0) },
    { range: "90+ days", count: outstandingPayments.filter(p => p.daysOutstanding > 90).length, amount: outstandingPayments.filter(p => p.daysOutstanding > 90).reduce((sum, p) => sum + p.amount, 0) }
  ];

  const getStatusColor = (status: string) => {
    return status === "pending" 
      ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      : "bg-red-500/10 text-red-500 border-red-500/20";
  };

  const getPriorityColor = (days: number) => {
    if (days > 90) return "text-red-600";
    if (days > 60) return "text-orange-600";
    if (days > 30) return "text-yellow-600";
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totalOutstanding.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{outstandingPayments.length} payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">${pendingTotal.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${failedTotal.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Requires action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Oldest Outstanding</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{oldestOutstanding?.daysOutstanding || 0}</div>
            <p className="text-xs text-muted-foreground">Days overdue</p>
          </CardContent>
        </Card>
      </div>

      {/* Aging Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Aging Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {agingData.map((aging) => (
              <div key={aging.range} className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">{aging.range}</h4>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">${aging.amount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{aging.count} payments</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Outstanding List */}
      <Card>
        <CardHeader>
          <CardTitle>Outstanding Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {outstandingPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{payment.client_name}</h4>
                    <Badge variant="outline" className={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{format(new Date(payment.date), "MMM d, yyyy")}</span>
                    <span>•</span>
                    <span className="capitalize">{payment.session_type}</span>
                    <span>•</span>
                    <span className={getPriorityColor(payment.daysOutstanding)}>
                      {payment.daysOutstanding} days outstanding
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">${payment.amount}</p>
                    {payment.payment_method && (
                      <p className="text-xs text-muted-foreground capitalize">{payment.payment_method}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Send Reminder</Button>
                    <Button variant="outline" size="sm">Mark Paid</Button>
                  </div>
                </div>
              </div>
            ))}

            {outstandingPayments.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No outstanding payments</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
