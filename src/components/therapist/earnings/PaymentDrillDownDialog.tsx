import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface PaymentDrillDownDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "client" | "method" | null;
  data: any;
  payments: any[];
}

export default function PaymentDrillDownDialog({
  open,
  onOpenChange,
  type,
  data,
  payments
}: PaymentDrillDownDialogProps) {
  if (!data || !type) return null;

  // Filter payments based on drill-down type
  const filteredPayments = type === "client"
    ? payments.filter(p => p.client_id === data.id)
    : payments.filter(p => p.payment_method === data.method);

  // Calculate stats
  const totalPaid = filteredPayments.filter(p => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
  const totalPending = filteredPayments.filter(p => p.status === "pending").reduce((sum, p) => sum + p.amount, 0);
  const successRate = (filteredPayments.filter(p => p.status === "paid").length / filteredPayments.length) * 100;

  // Session type distribution for client
  const sessionTypeData = Object.values(
    filteredPayments.reduce((acc: Record<string, any>, p) => {
      if (!acc[p.session_type]) {
        acc[p.session_type] = { name: p.session_type, value: 0 };
      }
      acc[p.session_type].value++;
      return acc;
    }, {})
  );

  // Monthly trend
  const monthlyTrend = filteredPayments
    .filter(p => p.status === "paid")
    .reduce((acc: Record<string, any>, p) => {
      const month = format(new Date(p.date), "MMM yyyy");
      if (!acc[month]) {
        acc[month] = { month, amount: 0 };
      }
      acc[month].amount += p.amount;
      return acc;
    }, {});
  
  const trendData = Object.values(monthlyTrend).slice(-6);

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))'];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {type === "client" && (
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={data.avatar} />
                  <AvatarFallback>{data.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3>{data.name}</h3>
                  <p className="text-sm font-normal text-muted-foreground">Payment History</p>
                </div>
              </div>
            )}
            {type === "method" && (
              <div>
                <h3 className="capitalize">{data.method}</h3>
                <p className="text-sm font-normal text-muted-foreground">Transaction Details</p>
              </div>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Paid</p>
              <p className="text-2xl font-bold text-green-600">${totalPaid.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Pending</p>
              <p className="text-2xl font-bold text-yellow-600">${totalPending.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-2xl font-bold">{successRate.toFixed(0)}%</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Payment Trend */}
            {trendData.length > 0 && (
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-4">Payment Trend</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={trendData}>
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
                      formatter={(value: any) => [`$${value}`, "Amount"]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Session Type Distribution (for client) */}
            {type === "client" && sessionTypeData.length > 0 && (
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-4">Session Types</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={sessionTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sessionTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Transaction List */}
          <div>
            <h4 className="font-semibold mb-4">All Transactions</h4>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {filteredPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{format(new Date(payment.date), "MMM d, yyyy")}</span>
                      <Badge variant="outline" className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground capitalize">
                      {payment.session_type} • {payment.duration_minutes || 0} min
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">${payment.amount}</p>
                    {payment.payment_method && (
                      <p className="text-xs text-muted-foreground capitalize">{payment.payment_method}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
