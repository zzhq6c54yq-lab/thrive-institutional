
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Users, Calendar, BookOpen, Heart, Phone } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

const VeteranDashboard: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-slate-800 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user?.email?.split('@')[0] || 'Warrior'}
          </h1>
          <p className="text-blue-200 text-lg">
            🎖️ Your service matters. Your wellbeing matters more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-blue-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Shield className="h-6 w-6 text-blue-400" />
              <CardTitle className="text-white ml-2">Crisis Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-4">
                24/7 support when you need it most. You're never alone.
              </p>
              <Button variant="destructive" className="w-full bg-red-600 hover:bg-red-700">
                Emergency Support
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-green-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Users className="h-6 w-6 text-green-400" />
              <CardTitle className="text-white ml-2">Veteran Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-4">
                Connect with fellow veterans who understand your journey.
              </p>
              <Button variant="outline" className="w-full border-green-500 text-green-400 hover:bg-green-500/10">
                Join Community
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Calendar className="h-6 w-6 text-purple-400" />
              <CardTitle className="text-white ml-2">VA Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-4">
                Access VA benefits, healthcare, and support services.
              </p>
              <Button variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/10">
                View Resources
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-800/50 border-amber-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BookOpen className="h-5 w-5 text-amber-400 mr-2" />
                Mission Journal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">
                Process your experiences with AI-powered insights and peer support.
              </p>
              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-black font-semibold">
                Start Writing
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-pink-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Heart className="h-5 w-5 text-pink-400 mr-2" />
                Wellness Check-in
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">
                Track your mental health progress with tools designed for veterans.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full text-pink-400 border-pink-500 hover:bg-pink-500/10">
                  PTSD Assessment
                </Button>
                <Button variant="outline" className="w-full text-pink-400 border-pink-500 hover:bg-pink-500/10">
                  Sleep Quality Check
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-6 border border-blue-500/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Veterans Crisis Line
              </h3>
              <p className="text-blue-200">
                Free, confidential support 24/7/365. Press 1 after dialing.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="destructive" size="lg" className="bg-red-600 hover:bg-red-700">
                <Phone className="h-4 w-4 mr-2" />
                988
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VeteranDashboard;
