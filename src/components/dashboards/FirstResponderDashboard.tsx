
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Activity, Users, Calendar, AlertTriangle, Phone } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

const FirstResponderDashboard: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-800 to-yellow-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user?.email?.split('@')[0] || 'Hero'}
          </h1>
          <p className="text-orange-200 text-lg">
            🚨 You serve others every day. Let us serve you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-red-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <CardTitle className="text-white ml-2">Critical Incident Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-4">
                Processing difficult calls and traumatic events.
              </p>
              <Button variant="destructive" className="w-full bg-red-600 hover:bg-red-700">
                Get Immediate Support
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Shield className="h-6 w-6 text-blue-400" />
              <CardTitle className="text-white ml-2">Peer Support Network</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-4">
                Connect with fellow first responders who understand.
              </p>
              <Button variant="outline" className="w-full border-blue-500 text-blue-400 hover:bg-blue-500/10">
                Join Network
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-green-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Activity className="h-6 w-6 text-green-400" />
              <CardTitle className="text-white ml-2">Stress Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-4">
                Tools to manage job-related stress and burnout.
              </p>
              <Button variant="outline" className="w-full border-green-500 text-green-400 hover:bg-green-500/10">
                Access Tools
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calendar className="h-5 w-5 text-purple-400 mr-2" />
                Shift Wellness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">
                Pre and post-shift mental health check-ins and decompression.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full text-purple-400 border-purple-500 hover:bg-purple-500/10">
                  Pre-Shift Check-in
                </Button>
                <Button variant="outline" className="w-full text-purple-400 border-purple-500 hover:bg-purple-500/10">
                  Post-Shift Debrief
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-yellow-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Phone className="h-5 w-5 text-yellow-400 mr-2" />
                24/7 First Responder Helpline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">
                Confidential support specifically for first responders.
              </p>
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-semibold">
                Call Now: 1-800-RESPOND
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FirstResponderDashboard;
