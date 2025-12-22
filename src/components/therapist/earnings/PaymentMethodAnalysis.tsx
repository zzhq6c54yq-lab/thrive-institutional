import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { CreditCard, DollarSign, TrendingUp } from "lucide-react";

interface PaymentMethodAnalysisProps {
  payments: any[];
  onMethodClick: (method: string) => void;
}

export default function PaymentMethodAnalysis({ payments, onMethodClick }: PaymentMethodAnalysisProps) {
  // Aggregate by payment method
  const methodStats = payments.reduce((acc: Record<string, any>, payment) => {
    const method = payment.payment_method || "Not specified";
    if (!acc[method]) {
      acc[method] = {
        name: method,
        totalTransactions: 0,
        successfulTransactions: 0,
        failedTransactions: 0,
        totalAmount: 0,
        failedAmount: 0
      };
    }

    acc[method].totalTransactions++;
    acc[method].totalAmount += payment.amount;

    if (payment.status === "paid") {
      acc[method].successfulTransactions++;
    } else if (payment.status === "failed") {
      acc[method].failedTransactions++;
      acc[method].failedAmount += payment.amount;
    }

    return acc;
  }, {});

  const methodData = Object.values(methodStats).map((stat: any) => ({
    ...stat,
    successRate: (stat.successfulTransactions / stat.totalTransactions) * 100,
    avgTransactionValue: stat.totalAmount / stat.totalTransactions
  })).sort((a: any, b: any) => b.totalAmount - a.totalAmount);

  // Find best performing method
  const mostUsedMethod = methodData.reduce((prev: any, curr: any) => 
    curr.totalTransactions > prev.totalTransactions ? curr : prev
  , methodData[0] || {});

  const highestSuccessRate = methodData.reduce((prev: any, curr: any) => 
    curr.successRate > prev.successRate ? curr : prev
  , methodData[0] || {});

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Used Method</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{mostUsedMethod?.name || "N/A"}</div>
            <p className="text-xs text-muted-foreground">
              {mostUsedMethod?.totalTransactions || 0} transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{highestSuccessRate?.name || "N/A"}</div>
            <p className="text-xs text-muted-foreground">
              {highestSuccessRate?.successRate?.toFixed(0) || 0}% success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Methods</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{methodData.length}</div>
            <p className="text-xs text-muted-foreground">
              Payment methods in use
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Usage by Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={methodData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="totalTransactions"
                >
                  {methodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue by Method */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={methodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
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
                  formatter={(value: any) => [`$${value.toLocaleString()}`, "Revenue"]}
                />
                <Bar dataKey="totalAmount" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {methodData.map((method: any) => (
              <div
                key={method.name}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-semibold capitalize">{method.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {method.totalTransactions} transactions
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-6 text-right">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="text-lg font-bold">${method.totalAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="text-lg font-bold text-green-600">{method.successRate.toFixed(0)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Transaction</p>
                    <p className="text-lg font-bold">${method.avgTransactionValue.toFixed(0)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Failed Amount</p>
                    <p className="text-lg font-bold text-red-600">${method.failedAmount.toLocaleString()}</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="ml-4"
                  onClick={() => onMethodClick(method.name)}
                >
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
