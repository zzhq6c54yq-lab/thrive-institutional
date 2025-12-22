
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, Search, Filter, Download, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeButton from "@/components/HomeButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LeadBank = () => {
  const leads = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "(555) 123-4567", source: "Website", status: "New", date: "2023-06-15" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "(555) 987-6543", source: "Referral", status: "Contacted", date: "2023-06-14" },
    { id: 3, name: "Robert Johnson", email: "robert.j@example.com", phone: "(555) 456-7890", source: "Social Media", status: "Qualified", date: "2023-06-13" },
    { id: 4, name: "Sarah Williams", email: "sarah.w@example.com", phone: "(555) 234-5678", source: "Website", status: "New", date: "2023-06-12" },
    { id: 5, name: "Michael Brown", email: "michael.b@example.com", phone: "(555) 876-5432", source: "Partner", status: "Contacted", date: "2023-06-11" },
    { id: 6, name: "Emily Davis", email: "emily.d@example.com", phone: "(555) 345-6789", source: "Event", status: "Qualified", date: "2023-06-10" },
    { id: 7, name: "David Miller", email: "david.m@example.com", phone: "(555) 765-4321", source: "Website", status: "New", date: "2023-06-09" },
    { id: 8, name: "Lisa Wilson", email: "lisa.w@example.com", phone: "(555) 543-2109", source: "Referral", status: "Contacted", date: "2023-06-08" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800";
      case "Contacted":
        return "bg-yellow-100 text-yellow-800";
      case "Qualified":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef1f5]">
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#212124] text-white py-12 relative">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">Lead Bank</h1>
          <p className="text-xl text-gray-300 max-w-3xl">Manage and organize potential client leads.</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span>Lead Management</span>
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Lead
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search leads..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>
                        <div>{lead.email}</div>
                        <div className="text-sm text-gray-500">{lead.phone}</div>
                      </TableCell>
                      <TableCell>{lead.source}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(lead.status)}>
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(lead.date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lead Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Website</span>
                  <span className="font-medium">38%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "38%" }}></div>
                </div>
                
                <div className="flex justify-between">
                  <span>Referrals</span>
                  <span className="font-medium">25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                </div>
                
                <div className="flex justify-between">
                  <span>Social Media</span>
                  <span className="font-medium">18%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "18%" }}></div>
                </div>
                
                <div className="flex justify-between">
                  <span>Partners</span>
                  <span className="font-medium">12%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "12%" }}></div>
                </div>
                
                <div className="flex justify-between">
                  <span>Events</span>
                  <span className="font-medium">7%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "7%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Conversion Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="inline-flex items-center justify-center p-6 mb-4 bg-blue-50 rounded-full">
                  <div className="text-5xl font-bold text-blue-600">24%</div>
                </div>
                <p className="text-gray-700 mb-6">Overall lead to client conversion rate</p>
                <Button className="w-full">View Full Analytics</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full">Run Lead Campaign</Button>
                <Button className="w-full" variant="outline">Import Leads</Button>
                <Button className="w-full" variant="outline">Setup Automation</Button>
                <Button className="w-full" variant="outline">Lead Scoring</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeadBank;
