import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle,
  RefreshCw,
  Shield,
  FileCheck,
  Clock,
  Plus,
  Search,
} from "lucide-react";
import { useComplianceAlerts, useCAQHVerification, useLicenseHistory } from "@/hooks/useComplianceAlerts";
import { useTherapists } from "@/hooks/useTherapists";
import { format } from "date-fns";

const LicenseComplianceTab: React.FC = () => {
  const { alerts, isLoading, unresolvedCount, resolveAlert, runLicenseCheck, isRunningCheck } = useComplianceAlerts();
  const { data: therapists } = useTherapists();
  const { addVerification, isAdding: isAddingCAQH } = useCAQHVerification();
  const { addLicense, isAdding: isAddingLicense } = useLicenseHistory();

  const [searchQuery, setSearchQuery] = useState("");
  const [caqhDialogOpen, setCaqhDialogOpen] = useState(false);
  const [licenseDialogOpen, setLicenseDialogOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState("alerts");

  // CAQH form state
  const [caqhForm, setCaqhForm] = useState({
    therapist_id: "",
    verification_status: "pending",
    insurance_panel: "",
    expiry_date: "",
    notes: "",
  });

  // License form state
  const [licenseForm, setLicenseForm] = useState({
    therapist_id: "",
    license_number: "",
    license_state: "",
    license_type: "",
    issue_date: "",
    expiry_date: "",
    verification_url: "",
  });

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "info":
        return <Info className="w-4 h-4 text-blue-500" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Critical</Badge>;
      case "warning":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Warning</Badge>;
      case "info":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Info</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const filteredAlerts = alerts.filter(
    (alert) =>
      alert.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const criticalCount = alerts.filter((a) => a.severity === "critical" && !a.is_resolved).length;
  const warningCount = alerts.filter((a) => a.severity === "warning" && !a.is_resolved).length;
  const infoCount = alerts.filter((a) => a.severity === "info" && !a.is_resolved).length;

  const handleAddCAQH = () => {
    if (!caqhForm.therapist_id) return;
    addVerification({
      therapist_id: caqhForm.therapist_id,
      verification_status: caqhForm.verification_status,
      insurance_panel: caqhForm.insurance_panel || null,
      verification_date: new Date().toISOString(),
      expiry_date: caqhForm.expiry_date || null,
      notes: caqhForm.notes || null,
      verified_by: null,
    });
    setCaqhDialogOpen(false);
    setCaqhForm({
      therapist_id: "",
      verification_status: "pending",
      insurance_panel: "",
      expiry_date: "",
      notes: "",
    });
  };

  const handleAddLicense = () => {
    if (!licenseForm.therapist_id || !licenseForm.license_number || !licenseForm.license_state || !licenseForm.expiry_date) return;
    addLicense({
      therapist_id: licenseForm.therapist_id,
      license_number: licenseForm.license_number,
      license_state: licenseForm.license_state,
      license_type: licenseForm.license_type || null,
      issue_date: licenseForm.issue_date || null,
      expiry_date: licenseForm.expiry_date,
      verification_status: "pending",
      verification_url: licenseForm.verification_url || null,
    });
    setLicenseDialogOpen(false);
    setLicenseForm({
      therapist_id: "",
      license_number: "",
      license_state: "",
      license_type: "",
      issue_date: "",
      expiry_date: "",
      verification_url: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">License & CAQH Management</h2>
          <p className="text-muted-foreground">Monitor license expiry, CAQH verification, and compliance alerts</p>
        </div>
        <Button
          onClick={() => runLicenseCheck()}
          disabled={isRunningCheck}
          className="bg-primary hover:bg-primary/90"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRunningCheck ? "animate-spin" : ""}`} />
          Run License Check
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Critical
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-400">{criticalCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              Warnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">{warningCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500" />
              Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">{infoCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Resolved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">
              {alerts.filter((a) => a.is_resolved).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sub Tabs */}
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <TabsList className="bg-card/50 border border-border">
          <TabsTrigger value="alerts" className="data-[state=active]:bg-primary">
            <Shield className="w-4 h-4 mr-2" />
            Alerts ({unresolvedCount})
          </TabsTrigger>
          <TabsTrigger value="caqh" className="data-[state=active]:bg-primary">
            <FileCheck className="w-4 h-4 mr-2" />
            CAQH
          </TabsTrigger>
          <TabsTrigger value="licenses" className="data-[state=active]:bg-primary">
            <Clock className="w-4 h-4 mr-2" />
            Licenses
          </TabsTrigger>
        </TabsList>

        {/* Alerts Sub-Tab */}
        <TabsContent value="alerts" className="mt-6">
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">Compliance Alerts</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Review and resolve compliance issues
                  </CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search alerts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background border-border"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">Loading alerts...</div>
              ) : filteredAlerts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
                  <p>No compliance alerts at this time</p>
                </div>
              ) : (
                <div className="rounded-md border border-border">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-muted/50">
                        <TableHead className="text-muted-foreground">Severity</TableHead>
                        <TableHead className="text-muted-foreground">Alert</TableHead>
                        <TableHead className="text-muted-foreground">Type</TableHead>
                        <TableHead className="text-muted-foreground">Expiry</TableHead>
                        <TableHead className="text-muted-foreground">Days Left</TableHead>
                        <TableHead className="text-muted-foreground">Status</TableHead>
                        <TableHead className="text-muted-foreground">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAlerts.map((alert) => (
                        <TableRow key={alert.id} className="border-border hover:bg-muted/30">
                          <TableCell>{getSeverityBadge(alert.severity)}</TableCell>
                          <TableCell>
                            <div className="flex items-start gap-2">
                              {getSeverityIcon(alert.severity)}
                              <div>
                                <div className="font-medium text-foreground">{alert.title}</div>
                                <div className="text-sm text-muted-foreground">{alert.message}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-muted-foreground border-border">
                              {alert.alert_type.replace("_", " ")}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {alert.expiry_date ? format(new Date(alert.expiry_date), "MMM d, yyyy") : "-"}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`font-medium ${
                                (alert.days_until_expiry || 0) <= 0
                                  ? "text-red-400"
                                  : (alert.days_until_expiry || 0) <= 30
                                  ? "text-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {alert.days_until_expiry !== null ? alert.days_until_expiry : "-"}
                            </span>
                          </TableCell>
                          <TableCell>
                            {alert.is_resolved ? (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                Resolved
                              </Badge>
                            ) : (
                              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                                Open
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {!alert.is_resolved && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => resolveAlert(alert.id)}
                                className="text-green-400 hover:text-green-300"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Resolve
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* CAQH Sub-Tab */}
        <TabsContent value="caqh" className="mt-6">
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">CAQH Verification</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Manage therapist CAQH credentials and insurance panel verification
                  </CardDescription>
                </div>
                <Dialog open={caqhDialogOpen} onOpenChange={setCaqhDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Verification
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Add CAQH Verification</DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        Record a new CAQH verification for a therapist
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label className="text-muted-foreground">Therapist</Label>
                        <Select
                          value={caqhForm.therapist_id}
                          onValueChange={(v) => setCaqhForm({ ...caqhForm, therapist_id: v })}
                        >
                          <SelectTrigger className="bg-background border-border text-foreground">
                            <SelectValue placeholder="Select therapist" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            {therapists?.map((t) => (
                              <SelectItem key={t.id} value={t.id} className="text-foreground">
                                {t.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Verification Status</Label>
                        <Select
                          value={caqhForm.verification_status}
                          onValueChange={(v) => setCaqhForm({ ...caqhForm, verification_status: v })}
                        >
                          <SelectTrigger className="bg-background border-border text-foreground">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            <SelectItem value="pending" className="text-foreground">Pending</SelectItem>
                            <SelectItem value="verified" className="text-foreground">Verified</SelectItem>
                            <SelectItem value="failed" className="text-foreground">Failed</SelectItem>
                            <SelectItem value="expired" className="text-foreground">Expired</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Insurance Panel</Label>
                        <Input
                          value={caqhForm.insurance_panel}
                          onChange={(e) => setCaqhForm({ ...caqhForm, insurance_panel: e.target.value })}
                          placeholder="e.g., Cigna, UHC, Aetna"
                          className="bg-background border-border text-foreground"
                        />
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Expiry Date</Label>
                        <Input
                          type="date"
                          value={caqhForm.expiry_date}
                          onChange={(e) => setCaqhForm({ ...caqhForm, expiry_date: e.target.value })}
                          className="bg-background border-border text-foreground"
                        />
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Notes</Label>
                        <Textarea
                          value={caqhForm.notes}
                          onChange={(e) => setCaqhForm({ ...caqhForm, notes: e.target.value })}
                          placeholder="Additional notes..."
                          className="bg-background border-border text-foreground"
                        />
                      </div>
                      <Button
                        onClick={handleAddCAQH}
                        disabled={isAddingCAQH || !caqhForm.therapist_id}
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        {isAddingCAQH ? "Adding..." : "Add Verification"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FileCheck className="w-12 h-12 mx-auto mb-4 text-primary" />
                <p>Select a therapist to view their CAQH verification history</p>
                <p className="text-sm mt-2">Use the "Add Verification" button to record new verifications</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Licenses Sub-Tab */}
        <TabsContent value="licenses" className="mt-6">
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">License Management</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Track and manage therapist professional licenses
                  </CardDescription>
                </div>
                <Dialog open={licenseDialogOpen} onOpenChange={setLicenseDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Add License
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Add License Record</DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        Add a new license record for a therapist
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label className="text-muted-foreground">Therapist</Label>
                        <Select
                          value={licenseForm.therapist_id}
                          onValueChange={(v) => setLicenseForm({ ...licenseForm, therapist_id: v })}
                        >
                          <SelectTrigger className="bg-background border-border text-foreground">
                            <SelectValue placeholder="Select therapist" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            {therapists?.map((t) => (
                              <SelectItem key={t.id} value={t.id} className="text-foreground">
                                {t.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-muted-foreground">License Number</Label>
                          <Input
                            value={licenseForm.license_number}
                            onChange={(e) => setLicenseForm({ ...licenseForm, license_number: e.target.value })}
                            placeholder="e.g., PSY12345"
                            className="bg-background border-border text-foreground"
                          />
                        </div>
                        <div>
                          <Label className="text-muted-foreground">State</Label>
                          <Input
                            value={licenseForm.license_state}
                            onChange={(e) => setLicenseForm({ ...licenseForm, license_state: e.target.value })}
                            placeholder="e.g., CA, NY, TX"
                            className="bg-background border-border text-foreground"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">License Type</Label>
                        <Input
                          value={licenseForm.license_type}
                          onChange={(e) => setLicenseForm({ ...licenseForm, license_type: e.target.value })}
                          placeholder="e.g., LCSW, LMFT, PsyD"
                          className="bg-background border-border text-foreground"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-muted-foreground">Issue Date</Label>
                          <Input
                            type="date"
                            value={licenseForm.issue_date}
                            onChange={(e) => setLicenseForm({ ...licenseForm, issue_date: e.target.value })}
                            className="bg-background border-border text-foreground"
                          />
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Expiry Date *</Label>
                          <Input
                            type="date"
                            value={licenseForm.expiry_date}
                            onChange={(e) => setLicenseForm({ ...licenseForm, expiry_date: e.target.value })}
                            className="bg-background border-border text-foreground"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Verification URL</Label>
                        <Input
                          value={licenseForm.verification_url}
                          onChange={(e) => setLicenseForm({ ...licenseForm, verification_url: e.target.value })}
                          placeholder="https://..."
                          className="bg-background border-border text-foreground"
                        />
                      </div>
                      <Button
                        onClick={handleAddLicense}
                        disabled={
                          isAddingLicense ||
                          !licenseForm.therapist_id ||
                          !licenseForm.license_number ||
                          !licenseForm.license_state ||
                          !licenseForm.expiry_date
                        }
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        {isAddingLicense ? "Adding..." : "Add License"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="w-12 h-12 mx-auto mb-4 text-primary" />
                <p>Track therapist licenses across multiple states</p>
                <p className="text-sm mt-2">Use the "Add License" button to record new licenses</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LicenseComplianceTab;
