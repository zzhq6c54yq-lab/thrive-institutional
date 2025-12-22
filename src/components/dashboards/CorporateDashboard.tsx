
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, TrendingUp, Users, Clock, Target, Coffee } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

const CorporateDashboard: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user?.email?.split('@')[0] || 'Professional'} 💼
          </h1>
          <p className="text-blue-200 text-lg">
            Peak performance starts with mental wellness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-blue-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Target className="h-6 w-6 text-blue-400" />
              <CardTitle className="text-white ml-2">Performance Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-4">
                Mental health tools to enhance your professional performance.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Productivity Assessment
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-green-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <TrendingUp className="h-6 w-6 text-green-400" />
              <CardTitle className="text-white ml-2">Stress Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-4">
                Executive-level stress management and burnout prevention.
              </p>
              <Button variant="outline" className="w-full border-green-500 text-green-400 hover:bg-green-500/10">
                Stress Analysis
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Users className="h-6 w-6 text-purple-400" />
              <CardTitle className="text-white ml-2">Leadership Wellness</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-4">
                Mental health resources for leaders and managers.
              </p>
              <Button variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/10">
                Leadership Tools
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-800/50 border-orange-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="h-5 w-5 text-orange-400 mr-2" />
                Work-Life Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">
                Strategies for maintaining mental wellness in high-pressure environments.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full text-orange-400 border-orange-500 hover:bg-orange-500/10">
                  Time Management
                </Button>
                <Button variant="outline" className="w-full text-orange-400 border-orange-500 hover:bg-orange-500/10">
                  Boundary Setting
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-yellow-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Coffee className="h-5 w-5 text-yellow-400 mr-2" />
                Executive Coaching
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">
                One-on-one mental wellness coaching for high-achievers.
              </p>
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-semibold">
                Schedule Session
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CorporateDashboard;
