import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

interface SessionTypeBreakdownProps {
  payments: any[];
}

export default function SessionTypeBreakdown({ payments }: SessionTypeBreakdownProps) {
  // Aggregate by session type
  const sessionStats = payments.reduce((acc: Record<string, any>, payment) => {
    const type = payment.session_type;
    if (!acc[type]) {
      acc[type] = {
        name: type,
        count: 0,
        revenue: 0,
        totalDuration: 0,
        paidCount: 0,
        paymentMethods: {} as Record<string, number>
      };
    }

    acc[type].count++;
    acc[type].totalDuration += payment.duration_minutes || 0;
    
    if (payment.status === "paid") {
      acc[type].revenue += payment.amount;
      acc[type].paidCount++;
    }

    const method = payment.payment_method || "Not specified";
    acc[type].paymentMethods[method] = (acc[type].paymentMethods[method] || 0) + 1;

    return acc;
  }, {});

  const sessionData = Object.values(sessionStats).map((stat: any) => ({
    ...stat,
    avgRate: stat.revenue / (stat.paidCount || 1),
    avgDuration: stat.totalDuration / stat.count,
    successRate: (stat.paidCount / stat.count) * 100,
    mostCommonMethod: Object.entries(stat.paymentMethods).sort((a: any, b: any) => b[1] - a[1])[0]?.[0] || "N/A"
  }));

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', '#10b981', '#f59e0b'];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sessionData.map((stat, index) => (
          <Card key={stat.name}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium capitalize">{stat.name} Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Sessions</span>
                  <span className="font-semibold">{stat.count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Revenue</span>
                  <span className="font-semibold text-green-600">${stat.revenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Avg Rate</span>
                  <span className="font-semibold">${stat.avgRate.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Success Rate</span>
                  <span className="font-semibold">{stat.successRate.toFixed(0)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Session Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sessionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="revenue"
                >
                  {sessionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Session Count Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sessions by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sessionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Session Type</th>
                  <th className="text-right p-3">Count</th>
                  <th className="text-right p-3">Revenue</th>
                  <th className="text-right p-3">Avg Duration</th>
                  <th className="text-right p-3">Avg Rate</th>
                  <th className="text-right p-3">Success Rate</th>
                  <th className="text-right p-3">Common Method</th>
                </tr>
              </thead>
              <tbody>
                {sessionData.map((stat) => (
                  <tr key={stat.name} className="border-b hover:bg-muted/50">
                    <td className="p-3 capitalize font-medium">{stat.name}</td>
                    <td className="text-right p-3">{stat.count}</td>
                    <td className="text-right p-3 text-green-600 font-semibold">${stat.revenue.toLocaleString()}</td>
                    <td className="text-right p-3">{stat.avgDuration.toFixed(0)} min</td>
                    <td className="text-right p-3">${stat.avgRate.toFixed(0)}</td>
                    <td className="text-right p-3">{stat.successRate.toFixed(0)}%</td>
                    <td className="text-right p-3 capitalize">{stat.mostCommonMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
