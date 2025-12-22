import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, Calendar, CreditCard, Users, PieChart, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import ClientEarningsBreakdown from "./earnings/ClientEarningsBreakdown";
import SessionTypeBreakdown from "./earnings/SessionTypeBreakdown";
import PaymentMethodAnalysis from "./earnings/PaymentMethodAnalysis";
import OutstandingBalances from "./earnings/OutstandingBalances";
import PaymentDrillDownDialog from "./earnings/PaymentDrillDownDialog";
import { useState } from "react";

interface Payment {
  id: string;
  date: string;
  client_id: string;
  client_name: string;
  client_avatar?: string;
  session_type: string;
  session_status: string;
  duration_minutes: number;
  amount: number;
  status: string;
  payment_method: string;
  created_at: string;
}

interface EarningsTabProps {
  payments: Payment[];
  monthlyData: { month: string; earnings: number }[];
}

export default function EarningsTab({ payments, monthlyData }: EarningsTabProps) {
  const [drillDownOpen, setDrillDownOpen] = useState(false);
  const [drillDownType, setDrillDownType] = useState<"client" | "method" | null>(null);
  const [drillDownData, setDrillDownData] = useState<any>(null);

  // Calculate earnings from paid payments only
  const paidPayments = payments.filter(p => p.status === "paid");
  const totalEarnings = paidPayments.reduce((sum, p) => sum + p.amount, 0);
  const thisMonthEarnings = paidPayments
    .filter(p => new Date(p.date).getMonth() === new Date().getMonth())
    .reduce((sum, p) => sum + p.amount, 0);
  const avgSessionValue = totalEarnings / paidPayments.length || 0;
  const pendingEarnings = payments
    .filter(p => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);
  const outstandingBalance = payments
    .filter(p => p.status === "pending" || p.status === "failed")
    .reduce((sum, p) => sum + p.amount, 0);
  const outstandingCount = payments.filter(p => p.status === "pending" || p.status === "failed").length;
  
  // Additional stats
  const uniqueClients = new Set(payments.map(p => p.client_id)).size;
  const successRate = paidPayments.length / payments.length * 100 || 0;
  
  // Most profitable client
  const clientEarnings = payments.reduce((acc: Record<string, any>, p) => {
    if (!acc[p.client_id]) {
      acc[p.client_id] = { name: p.client_name, total: 0 };
    }
    if (p.status === "paid") {
      acc[p.client_id].total += p.amount;
    }
    return acc;
  }, {});
  const topClient = Object.values(clientEarnings).sort((a: any, b: any) => b.total - a.total)[0] as any;

  // Most common session type
  const sessionTypes = payments.reduce((acc: Record<string, number>, p) => {
    acc[p.session_type] = (acc[p.session_type] || 0) + 1;
    return acc;
  }, {});
  const mostCommonType = Object.entries(sessionTypes).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  const handleClientClick = (clientId: string, clientName: string) => {
    setDrillDownType("client");
    setDrillDownData({ id: clientId, name: clientName, avatar: payments.find(p => p.client_id === clientId)?.client_avatar });
    setDrillDownOpen(true);
  };

  const handleMethodClick = (method: string) => {
    setDrillDownType("method");
    setDrillDownData({ method });
    setDrillDownOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "failed":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="clients">
            <Users className="h-4 w-4 mr-2" />
            By Client ({uniqueClients})
          </TabsTrigger>
          <TabsTrigger value="session-types">
            <PieChart className="h-4 w-4 mr-2" />
            Session Types
          </TabsTrigger>
          <TabsTrigger value="payment-methods">
            <CreditCard className="h-4 w-4 mr-2" />
            Payment Methods
          </TabsTrigger>
          <TabsTrigger value="outstanding">
            <AlertCircle className="h-4 w-4 mr-2" />
            Outstanding ({outstandingCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEarnings.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${thisMonthEarnings.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Session</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgSessionValue.toFixed(0)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${outstandingBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{outstandingCount} payments</p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueClients}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate.toFixed(0)}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Client</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold truncate">{topClient?.name || "N/A"}</div>
            <p className="text-xs text-muted-foreground">${topClient?.total.toLocaleString() || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Common Type</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold capitalize">{mostCommonType}</div>
            <p className="text-xs text-muted-foreground">{sessionTypes[mostCommonType]} sessions</p>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Earnings Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: any) => [`$${value}`, "Earnings"]}
              />
              <Line 
                type="monotone" 
                dataKey="earnings" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.slice(0, 20).map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-semibold">{payment.client_name}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span>{format(new Date(payment.date), "MMM d, yyyy")}</span>
                    <span>•</span>
                    <span className="capitalize">{payment.session_type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className={getStatusColor(payment.status)}>
                    {payment.status}
                  </Badge>
                  <div className="text-right">
                    <p className="text-lg font-bold">${payment.amount}</p>
                    {payment.payment_method && payment.payment_method !== 'not_specified' && (
                      <p className="text-xs text-muted-foreground capitalize">{payment.payment_method.replace('_', ' ')}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
        </TabsContent>

        <TabsContent value="clients">
          <ClientEarningsBreakdown payments={payments} onClientClick={handleClientClick} />
        </TabsContent>

        <TabsContent value="session-types">
          <SessionTypeBreakdown payments={payments} />
        </TabsContent>

        <TabsContent value="payment-methods">
          <PaymentMethodAnalysis payments={payments} onMethodClick={handleMethodClick} />
        </TabsContent>

        <TabsContent value="outstanding">
          <OutstandingBalances payments={payments} />
        </TabsContent>
      </Tabs>

      {/* Drill-Down Dialog */}
      <PaymentDrillDownDialog
        open={drillDownOpen}
        onOpenChange={setDrillDownOpen}
        type={drillDownType}
        data={drillDownData}
        payments={payments}
      />
    </div>
  );
}
