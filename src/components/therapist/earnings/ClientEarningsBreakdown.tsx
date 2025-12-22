import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

interface ClientEarning {
  client_id: string;
  client_name: string;
  client_avatar?: string;
  session_count: number;
  total_paid: number;
  total_pending: number;
  avg_session_value: number;
  last_payment_date: string | null;
  success_rate: number;
  sessions: any[];
}

interface ClientEarningsBreakdownProps {
  payments: any[];
  onClientClick: (clientId: string, clientName: string) => void;
}

export default function ClientEarningsBreakdown({ payments, onClientClick }: ClientEarningsBreakdownProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"total_paid" | "session_count" | "success_rate">("total_paid");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Aggregate data by client
  const clientEarnings: ClientEarning[] = Object.values(
    payments.reduce((acc: Record<string, ClientEarning>, payment) => {
      const clientId = payment.client_id;
      if (!acc[clientId]) {
        acc[clientId] = {
          client_id: clientId,
          client_name: payment.client_name,
          client_avatar: payment.client_avatar,
          session_count: 0,
          total_paid: 0,
          total_pending: 0,
          avg_session_value: 0,
          last_payment_date: null,
          success_rate: 0,
          sessions: []
        };
      }

      acc[clientId].session_count++;
      acc[clientId].sessions.push(payment);
      
      if (payment.status === "paid") {
        acc[clientId].total_paid += payment.amount;
        if (!acc[clientId].last_payment_date || new Date(payment.date) > new Date(acc[clientId].last_payment_date!)) {
          acc[clientId].last_payment_date = payment.date;
        }
      } else if (payment.status === "pending") {
        acc[clientId].total_pending += payment.amount;
      }

      return acc;
    }, {})
  );

  // Calculate derived values
  clientEarnings.forEach(client => {
    client.avg_session_value = (client.total_paid + client.total_pending) / client.session_count;
    const paidCount = client.sessions.filter(s => s.status === "paid").length;
    client.success_rate = (paidCount / client.session_count) * 100;
  });

  // Filter and sort
  const filteredClients = clientEarnings
    .filter(client => 
      client.client_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const multiplier = sortOrder === "asc" ? 1 : -1;
      return (a[sortBy] - b[sortBy]) * multiplier;
    });

  const toggleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Client List */}
      <Card>
        <CardHeader>
          <CardTitle>Earnings by Client</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredClients.map((client) => (
              <div
                key={client.client_id}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted/70 transition-colors"
                onClick={() => onClientClick(client.client_id, client.client_name)}
              >
                <div className="flex items-center gap-4 flex-1">
                  <Avatar>
                    <AvatarImage src={client.client_avatar} />
                    <AvatarFallback>{client.client_name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{client.client_name}</h4>
                    <p className="text-sm text-muted-foreground">{client.session_count} sessions</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-6 text-right">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Paid</p>
                    <p className="text-lg font-bold text-green-600">${client.total_paid.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-lg font-bold text-yellow-600">${client.total_pending.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Session</p>
                    <p className="text-lg font-bold">${client.avg_session_value.toFixed(0)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="text-lg font-bold">{client.success_rate.toFixed(0)}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredClients.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No clients found</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
