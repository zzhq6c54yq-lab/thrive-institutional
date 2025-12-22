
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bell, Lock, Eye, Activity, CreditCard, User, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import HomeButton from "@/components/HomeButton";

const UserSettings = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef1f5]">
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#212124] text-white py-12 relative">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">Account Settings</h1>
          <p className="text-xl text-gray-300 max-w-3xl">Manage your account preferences and settings.</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="space-y-4 sticky top-4">
              <Card>
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button variant="ghost" className="w-full justify-start bg-muted">
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Lock className="mr-2 h-4 w-4" />
                      Privacy & Security
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Billing
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Activity className="mr-2 h-4 w-4" />
                      Activity
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Globe className="mr-2 h-4 w-4" />
                      Language & Region
                    </Button>
                  </nav>
                </CardContent>
              </Card>
              
              <Card className="bg-[#B87333]/10 border-[#B87333]/30">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you have any questions about your account settings, our support team is here to help.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-[#B87333]" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Appointment Reminders</p>
                      <p className="text-sm text-muted-foreground">Receive reminders about upcoming appointments</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Messages</p>
                      <p className="text-sm text-muted-foreground">Get notified when you receive new messages</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Workshop Announcements</p>
                      <p className="text-sm text-muted-foreground">Learn about new workshops and events</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Product Updates</p>
                      <p className="text-sm text-muted-foreground">Stay informed about new features and improvements</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Mobile Push Notifications</h3>
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Daily Reminders</p>
                      <p className="text-sm text-muted-foreground">Get daily reminders to check in with your mental health</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Progress Milestones</p>
                      <p className="text-sm text-muted-foreground">Celebrate your mental health journey milestones</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Notification Frequency</h3>
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Digest</p>
                      <p className="text-sm text-muted-foreground">How often would you like to receive email updates?</p>
                    </div>
                    <Select defaultValue="daily">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button className="bg-[#B87333] hover:bg-[#B87333]/90">
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
